import { cn } from '../lib/utils';

type PaymentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REFUNDED';

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
  className?: string;
}

const statusConfig = {
  PENDING: {
    label: 'Pendiente',
    className: 'bg-orange-100 text-orange-700 border-orange-200',
  },
  APPROVED: {
    label: 'Aprobado',
    className: 'bg-green-100 text-green-700 border-green-200',
  },
  REJECTED: {
    label: 'Rechazado',
    className: 'bg-red-100 text-red-700 border-red-200',
  },
  REFUNDED: {
    label: 'Reembolsado',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
  },
};

export const PaymentStatusBadge = ({ status, className }: PaymentStatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
};
