import { baseEmailTemplate } from './base-email.template';
import { infoCardTemplate } from './info-card.template';

export function serviceRequestAcceptedTemplate(data: {
  clientName: string;
  providerName: string;
  title: string;
  requestedDate: string;
}) {
  return baseEmailTemplate({
    title: 'Tu solicitud fue aceptada',
    previewText: `${data.providerName} aceptó tu solicitud.`,
    content: `
      <p>Hola <strong>${data.clientName}</strong>,</p>

      <p>
        Buenas noticias. <strong>${data.providerName}</strong> aceptó tu solicitud de servicio.
      </p>

      ${infoCardTemplate({
        variant: 'success',
        items: [
          { label: 'Servicio', value: data.title },
          { label: 'Fecha solicitada', value: data.requestedDate },
        ],
      })}

      <p>
        Ahora puedes continuar con el pago para confirmar tu cita.
      </p>
    `,
  });
}