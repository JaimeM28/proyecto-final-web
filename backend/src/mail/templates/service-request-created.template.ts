import { baseEmailTemplate } from './base-email.template';
import { infoCardTemplate } from './info-card.template';

export function serviceRequestCreatedTemplate(data: {
  providerName: string;
  clientName: string;
  title: string;
  requestedDate: string;
}) {
  return baseEmailTemplate({
    title: 'Nueva solicitud de servicio',
    previewText: `Tienes una nueva solicitud de ${data.clientName}.`,
    content: `
      <p>Hola <strong>${data.providerName}</strong>,</p>

      <p>Tienes una nueva solicitud de servicio pendiente por revisar.</p>

      ${infoCardTemplate({
        variant: 'default',
        items: [
          { label: 'Cliente', value: data.clientName },
          { label: 'Servicio', value: data.title },
          { label: 'Fecha solicitada', value: data.requestedDate },
        ],
      })}

      <p>Entra a Tu Oficio para aceptar o rechazar la solicitud.</p>
    `,
  });
}