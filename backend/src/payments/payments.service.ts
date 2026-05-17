// src/payments/payments.service.ts

import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MercadoPagoConfig, Preference, Payment as MercadoPagoPayment } from 'mercadopago';

import { Payment } from './entities/payment.entity';
import { PaymentStatus } from './enums/payment-status.enum';
import { CreatePaymentDto } from './dto/create-payment.dto';

import { ServiceRequest } from '../service-requests/entities/service-request.entity';
import { ServiceRequestStatus } from '../service-requests/enums/service-request-status.enum';

@Injectable()
export class PaymentsService {
  private readonly mercadoPagoClient: MercadoPagoConfig;

  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,

    @InjectRepository(ServiceRequest)
    private readonly serviceRequestRepository: Repository<ServiceRequest>,
  ) {
    this.mercadoPagoClient = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN!,
    });
  }

  async create(clientId: string, dto: CreatePaymentDto) {
    const serviceRequest = await this.serviceRequestRepository.findOne({
      where: { id: dto.serviceRequestId },
      relations: {
        client: true,
        provider: {
          user: true,
        },
      },
    });

    if (!serviceRequest) {
      throw new NotFoundException('Solicitud no encontrada');
    }

    if (serviceRequest.client.id !== clientId) {
      throw new ForbiddenException('No puedes pagar esta solicitud');
    }

    if (serviceRequest.status !== ServiceRequestStatus.ACCEPTED) {
      throw new BadRequestException(
        'Solo puedes pagar solicitudes aceptadas',
      );
    }

    const existingPayment = await this.paymentRepository.findOne({
      where: {
        serviceRequest: {
          id: serviceRequest.id,
        },
      },
    });

    if (existingPayment) {
      return {
        message: 'Ya existe un pago para esta solicitud',
        payment: this.toResponse(existingPayment),
      };
    }

    const amount = Number(serviceRequest.provider.price);

    if (!amount || amount <= 0) {
      throw new BadRequestException(
        'El proveedor no tiene un precio válido configurado',
      );
    }

   
    const backendUrl = process.env.BACKEND_URL;
    const frontendUrl = process.env.FRONTEND_URL;

    if (!backendUrl || !frontendUrl) {
        throw new BadRequestException(
        'BACKEND_URL y FRONTEND_URL deben estar configuradas',
         );
    }


    const payment = this.paymentRepository.create({
      client: serviceRequest.client,
      serviceRequest,
      amount,
      status: PaymentStatus.PENDING,
      mercadoPagoPreferenceId: null,
      mercadoPagoPaymentId: null,
      checkoutUrl: null,
    });

    const savedPayment = await this.paymentRepository.save(payment);

    const preferenceClient = new Preference(this.mercadoPagoClient);

    const preference = await preferenceClient.create({
      body: {
        items: [
          {
            id: savedPayment.id,
            title: serviceRequest.title,
            description: serviceRequest.description,
            quantity: 1,
            currency_id: 'MXN',
            unit_price: amount,
          },
        ],
        payer: {
          email: serviceRequest.client.email,
          name: serviceRequest.client.name,
        },
        external_reference: savedPayment.id,
        notification_url: `${process.env.BACKEND_URL}/payments/webhook`,
        back_urls: {
          success: `${process.env.FRONTEND_URL}/payments/success`,
          failure: `${process.env.FRONTEND_URL}/payments/failure`,
          pending: `${process.env.FRONTEND_URL}/payments/pending`,
        },
        auto_return: 'approved',
      },
    });

    savedPayment.mercadoPagoPreferenceId = preference.id ?? null;
    savedPayment.checkoutUrl =
      preference.init_point ?? preference.sandbox_init_point ?? null;

    const finalPayment = await this.paymentRepository.save(savedPayment);

    return {
      message: 'Pago creado correctamente',
      payment: this.toResponse(finalPayment),
    };
  }

  async handleWebhook(body: any, query: any, headers: any) {
    console.log('Webhook recibido body:', body);
    console.log('Webhook recibido query:', query);
    const paymentIdFromMp =
      body?.data?.id ||
      query?.['data.id'] ||
      query?.id;

    const topic =
      body?.type ||
      query?.type ||
      query?.topic;

    if (!paymentIdFromMp || topic !== 'payment') {
      return { received: true };
    }

    const mpPaymentClient = new MercadoPagoPayment(this.mercadoPagoClient);

    const mpPayment = await mpPaymentClient.get({
      id: paymentIdFromMp,
    });

    const localPaymentId = mpPayment.external_reference;

    if (!localPaymentId) {
      return { received: true };
    }

    const payment = await this.paymentRepository.findOne({
      where: { id: localPaymentId },
      relations: {
        client: true,
        serviceRequest: true,
      },
    });

    if (!payment) {
      return { received: true };
    }

    payment.mercadoPagoPaymentId = String(mpPayment.id);

    console.log('Estado del pago en Mercado Pago:', mpPayment.status);

    if (mpPayment.status === 'approved') {
      payment.status = PaymentStatus.PAID;
      payment.serviceRequest.status = ServiceRequestStatus.PAID;

      await this.serviceRequestRepository.save(payment.serviceRequest);
      await this.paymentRepository.save(payment);
    }

    if (mpPayment.status === 'rejected') {
      payment.status = PaymentStatus.FAILED;
      await this.paymentRepository.save(payment);
    }

    if (mpPayment.status === 'cancelled') {
      payment.status = PaymentStatus.CANCELLED;
      await this.paymentRepository.save(payment);
    }

    return { received: true };
  }

  async findMine(clientId: string) {
    const payments = await this.paymentRepository.find({
      where: {
        client: {
          id: clientId,
        },
      },
      relations: {
        serviceRequest: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    return payments.map((payment) => this.toResponse(payment));
  }

  async findOne(clientId: string, id: string) {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: {
        client: true,
        serviceRequest: true,
      },
    });

    if (!payment) {
      throw new NotFoundException('Pago no encontrado');
    }

    if (payment.client.id !== clientId) {
      throw new ForbiddenException('No puedes ver este pago');
    }

    return this.toResponse(payment);
  }

  private toResponse(payment: Payment) {
    return {
      id: payment.id,
      amount: Number(payment.amount),
      status: payment.status,
      checkoutUrl: payment.checkoutUrl,
      mercadoPagoPreferenceId: payment.mercadoPagoPreferenceId,
      mercadoPagoPaymentId: payment.mercadoPagoPaymentId,
      createdAt: payment.createdAt,
      serviceRequest: payment.serviceRequest
        ? {
            id: payment.serviceRequest.id,
            title: payment.serviceRequest.title,
            status: payment.serviceRequest.status,
          }
        : undefined,
    };
  }
}