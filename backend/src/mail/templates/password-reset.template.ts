import { baseEmailTemplate } from './base-email.template';
import { codeBoxTemplate } from './code-box.template';

export function passwordResetTemplate(params: {
  code: string;
}) {
  return baseEmailTemplate({
    title: 'Recuperación de contraseña',
    previewText: 'Usa este código para recuperar tu contraseña.',
    content: `
      <p>Recibimos una solicitud para restablecer tu contraseña.</p>
      <p>Tu código de recuperación es:</p>

      ${codeBoxTemplate(params.code)}

      <p style="margin-top:24px;">
        Este código expirará en <strong>3 minutos</strong>.
      </p>

      <p style="color:#6b7280;">
        Si no solicitaste este cambio, puedes ignorar este correo.
      </p>
    `,
  });
}