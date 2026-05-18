import { baseEmailTemplate } from './base-email.template';
import { infoCardTemplate } from './info-card.template';

export function serviceRequestRejectedTemplate(data: {
  clientName: string;
  providerName: string;
  title: string;
  reason?: string;
}) {
  return baseEmailTemplate({
    title: 'Tu solicitud fue rechazada',
    previewText: `${data.providerName} rechazó tu solicitud.`,
    content: `
      <p>Hola <strong>${data.clientName}</strong>,</p>

      <p>
        <strong>${data.providerName}</strong> rechazó tu solicitud de servicio.
      </p>

      ${infoCardTemplate({
        variant: 'danger',
        items: [
          { label: 'Servicio', value: data.title },
          {
            label: 'Motivo',
            value: data.reason ?? 'No se proporcionó un motivo específico.',
          },
        ],
      })}

      <p>
        Puedes buscar otro proveedor disponible en Tu Oficio.
      </p>
    `,
  });
}