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
}
