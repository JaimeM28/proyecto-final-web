import { cn } from '../lib/utils';

type RequestStatus = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';

interface RequestStatusBadgeProps {
  status: RequestStatus;
  className?: string;
}

const statusConfig = {
  PENDING: {
    label: 'Pendiente',
    className: 'bg-orange-100 text-orange-700 border-orange-200',
  },
  ACCEPTED: {
    label: 'Aceptada',
    className: 'bg-blue-100 text-blue-700 border-blue-200',
  },
  REJECTED: {
    label: 'Rechazada',
    className: 'bg-red-100 text-red-700 border-red-200',
  },
  CANCELLED: {
    label: 'Cancelada',
    className: 'bg-gray-100 text-gray-700 border-gray-200',
  },
  COMPLETED: {
    label: 'Completada',
    className: 'bg-green-100 text-green-700 border-green-200',
  },
};

export const RequestStatusBadge = ({ status, className }: RequestStatusBadgeProps) => {
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
