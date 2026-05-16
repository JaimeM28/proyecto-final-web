import { CheckCircle } from 'lucide-react';

interface SuccessMessageProps {
  message: string;
}

export const SuccessMessage = ({ message }: SuccessMessageProps) => {
  return (
    <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
      <p className="text-sm text-green-900">{message}</p>
    </div>
  );
};
