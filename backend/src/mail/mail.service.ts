import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { passwordResetTemplate } from './templates/password-reset.template';
import { emailVerificationTemplate } from './templates/email-verification.template';
import { serviceRequestCreatedTemplate } from './templates/service-request-created.template';
import { serviceRequestAcceptedTemplate } from './templates/service-request-accepted.template';
import { serviceRequestRejectedTemplate } from './templates/service-request-rejected.template';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  private formatDate(date: Date) {
    return new Date(date).toLocaleString('es-MX', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  }

  async sendPasswordResetCode(email: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Código para recuperar tu contraseña - Tu Oficio',
      html: passwordResetTemplate({ code }),
    });
  }

  async sendEmailVerificationCode(email: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verifica tu correo - Tu Oficio',
      html: emailVerificationTemplate({ code }),
    });
  }

  async sendServiceRequestCreatedEmail(data: {
    providerEmail: string;
    providerName: string;
    clientName: string;
    title: string;
    requestedDate: Date;
  }) {
    await this.mailerService.sendMail({
      to: data.providerEmail,
      subject: 'Nueva solicitud de servicio - Tu Oficio',
      html: serviceRequestCreatedTemplate({
        providerName: data.providerName,
        clientName: data.clientName,
        title: data.title,
        requestedDate: this.formatDate(data.requestedDate),
      }),
    });
  }

  async sendServiceRequestAcceptedEmail(data: {
    clientEmail: string;
    clientName: string;
    providerName: string;
    title: string;
    requestedDate: Date;
  }) {
    await this.mailerService.sendMail({
      to: data.clientEmail,
      subject: 'Tu solicitud fue aceptada - Tu Oficio',
      html: serviceRequestAcceptedTemplate({
        clientName: data.clientName,
        providerName: data.providerName,
        title: data.title,
        requestedDate: this.formatDate(data.requestedDate),
      }),
    });
  }

  async sendServiceRequestRejectedEmail(data: {
    clientEmail: string;
    clientName: string;
    providerName: string;
    title: string;
    reason?: string;
  }) {
    await this.mailerService.sendMail({
      to: data.clientEmail,
      subject: 'Tu solicitud fue rechazada - Tu Oficio',
      html: serviceRequestRejectedTemplate({
        clientName: data.clientName,
        providerName: data.providerName,
        title: data.title,
        reason: data.reason,
      }),
    });
  }
}