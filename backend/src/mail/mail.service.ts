import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendPasswordResetCode(email: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Código para recuperar tu contraseña - Tu Oficio',
      html: `
        <h2>Recuperación de contraseña</h2>
        <p>Tu código de recuperación es:</p>
        <h1>${code}</h1>
        <p>Este código expirará en 3 minutos.</p>
        <p>Si no solicitaste este cambio, ignora este correo.</p>
      `,
    });
  }

  async sendEmailVerificationCode(email: string, code: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Verifica tu correo - Tu Oficio',
      html: `
        <h2>Verificación de correo</h2>
        <p>Tu código de verificación es:</p>
        <h1>${code}</h1>
        <p>Este código expirará en 3 minutos.</p>
        `,
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
      html: `
        <h2>Hola ${data.providerName}</h2>
        <p>Tienes una nueva solicitud de servicio.</p>
        <p><strong>Cliente:</strong> ${data.clientName}</p>
        <p><strong>Servicio:</strong> ${data.title}</p>
        <p><strong>Fecha solicitada:</strong> ${new Date(data.requestedDate).toLocaleString()}</p>
        <p>Entra a Tu Oficio para aceptar o rechazar la solicitud.</p>
      `,
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
      html: `
        <h2>Hola ${data.clientName}</h2>
        <p>Tu solicitud fue aceptada por ${data.providerName}.</p>
        <p><strong>Servicio:</strong> ${data.title}</p>
        <p><strong>Fecha solicitada:</strong> ${new Date(data.requestedDate).toLocaleString()}</p>
        <p>Ahora puedes continuar con el pago para confirmar la cita.</p>
      `,
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
      html: `
        <h2>Hola ${data.clientName}</h2>
        <p>${data.providerName} rechazó tu solicitud.</p>
        <p><strong>Servicio:</strong> ${data.title}</p>
        ${
          data.reason
            ? `<p><strong>Motivo:</strong> ${data.reason}</p>`
            : ''
        }
        <p>Puedes buscar otro proveedor en Tu Oficio.</p>
      `,
    });
  }
}
