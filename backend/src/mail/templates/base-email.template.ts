export function baseEmailTemplate(params: {
  title: string;
  previewText?: string;
  content: string;
}) {
  const { title, previewText, content } = params;

  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>${title}</title>
    </head>

    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif; color:#1f2937;">
      <span style="display:none; visibility:hidden; opacity:0; height:0; width:0;">
        ${previewText ?? title}
      </span>

      <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:32px 16px;">
        <tr>
          <td align="center">
            <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 8px 24px rgba(0,0,0,0.08);">
              
              <tr>
                <td style="background-color:#2563eb; padding:28px 32px; text-align:center;">
                  <h1 style="margin:0; color:#ffffff; font-size:26px; font-weight:700;">
                    Tu Oficio
                  </h1>
                  <p style="margin:8px 0 0; color:#dbeafe; font-size:14px;">
                    Servicios confiables cerca de ti
                  </p>
                </td>
              </tr>

              <tr>
                <td style="padding:32px;">
                  <h2 style="margin:0 0 16px; font-size:22px; color:#111827;">
                    ${title}
                  </h2>

                  <div style="font-size:15px; line-height:1.7; color:#374151;">
                    ${content}
                  </div>
                </td>
              </tr>

              <tr>
                <td style="background-color:#f9fafb; padding:20px 32px; text-align:center; border-top:1px solid #e5e7eb;">
                  <p style="margin:0; font-size:13px; color:#6b7280;">
                    Este correo fue enviado automáticamente por Tu Oficio.
                  </p>
                  <p style="margin:8px 0 0; font-size:12px; color:#9ca3af;">
                    Si no reconoces esta actividad, puedes ignorar este mensaje.
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}