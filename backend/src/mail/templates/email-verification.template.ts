import { baseEmailTemplate } from './base-email.template';
import { codeBoxTemplate } from './code-box.template';

export function emailVerificationTemplate(params: {
  code: string;
}) {
  return baseEmailTemplate({
    title: 'Verificación de correo',
    previewText: 'Usa este código para verificar tu cuenta.',
    content: `
      <p>Gracias por registrarte en <strong>Tu Oficio</strong>.</p>
      <p>Para verificar tu correo electrónico, usa el siguiente código:</p>

      ${codeBoxTemplate(params.code)}

      <p style="margin-top:24px;">
        Este código expirará en <strong>3 minutos</strong>.
      </p>
    `,
  });
}