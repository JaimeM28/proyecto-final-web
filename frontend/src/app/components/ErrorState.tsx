import { AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ message = 'Algo salió mal', onRetry }: ErrorStateProps) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h2 className="mb-2">Error</h2>
        <p className="text-muted-foreground mb-6">{message}</p>
        {onRetry && (
          <Button onClick={onRetry}>
            Intentar de nuevo
          </Button>
        )}
      </div>
    </div>
  );
};
