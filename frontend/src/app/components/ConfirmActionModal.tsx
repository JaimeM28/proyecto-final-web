import { Button } from './Button';
import { Card } from './Card';
import { AlertCircle, X } from 'lucide-react';

interface ConfirmActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary';
  isLoading?: boolean;
}

export const ConfirmActionModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'primary',
  isLoading = false,
}: ConfirmActionModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <Card className="relative w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  variant === 'danger' ? 'bg-red-100' : 'bg-blue-100'
                }`}
              >
                <AlertCircle
                  className={`w-5 h-5 ${variant === 'danger' ? 'text-red-600' : 'text-blue-600'}`}
                />
              </div>
              <div>
                <h3 className="mb-2">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
            </div>
            <button onClick={onClose} className="hover:opacity-70">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" onClick={onClose} className="w-full" disabled={isLoading}>
              {cancelText}
            </Button>
            <Button
              variant={variant === 'danger' ? 'destructive' : 'primary'}
              onClick={onConfirm}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : confirmText}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
