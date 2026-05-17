type InfoCardVariant = 'default' | 'success' | 'danger';

const variantStyles: Record<InfoCardVariant, string> = {
  default: 'background-color:#f9fafb; border:1px solid #e5e7eb;',
  success: 'background-color:#f0fdf4; border:1px solid #bbf7d0;',
  danger: 'background-color:#fef2f2; border:1px solid #fecaca;',
};

export function infoCardTemplate(params: {
  items: {
    label: string;
    value?: string;
  }[];
  variant?: InfoCardVariant;
}) {
  const { items, variant = 'default' } = params;

  return `
    <div style="${variantStyles[variant]} border-radius:14px; padding:18px; margin:24px 0;">
      ${items
        .filter((item) => item.value)
        .map(
          (item) => `
            <p style="margin:0 0 10px;">
              <strong>${item.label}:</strong> ${item.value}
            </p>
          `,
        )
        .join('')}
    </div>
  `;
}