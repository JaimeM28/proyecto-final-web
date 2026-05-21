import { AlertCircle, CheckCircle, Info, XCircle, X } from 'lucide-react';
import { cn } from '../lib/utils';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationBannerProps {
  type: NotificationType;
  message: string;
  onClose?: () => void;
}

const typeConfig = {
  success: {
    icon: CheckCircle,
    className: 'bg-green-50 border-green-200 text-green-900',
    iconClassName: 'text-green-600',
  },
  error: {
    icon: XCircle,
    className: 'bg-red-50 border-red-200 text-red-900',
    iconClassName: 'text-red-600',
  },
  warning: {
    icon: AlertCircle,
    className: 'bg-orange-50 border-orange-200 text-orange-900',
    iconClassName: 'text-orange-600',
  },
  info: {
    icon: Info,
    className: 'bg-blue-50 border-blue-200 text-blue-900',
    iconClassName: 'text-blue-600',
  },
};

export const NotificationBanner = ({ type, message, onClose }: NotificationBannerProps) => {
  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div className={cn('flex items-start gap-3 p-4 border rounded-lg', config.className)}>
      <Icon className={cn('w-5 h-5 flex-shrink-0 mt-0.5', config.iconClassName)} />
      <p className="flex-1 text-sm">{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="flex-shrink-0 hover:opacity-70 transition-opacity"
        >
          <X className="w-5 h-5" />
        </button>
      )}
    </div>
  );
};
