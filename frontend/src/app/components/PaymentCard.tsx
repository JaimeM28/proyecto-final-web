import { Card } from './Card';
import { PaymentStatusBadge } from './PaymentStatusBadge';
import { CreditCard, Calendar, DollarSign } from 'lucide-react';

type PaymentStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'REFUNDED';

interface PaymentCardProps {
  id: string;
  amount: number;
  status: PaymentStatus;
  date: string;
  serviceName: string;
  paymentMethod?: string;
  transactionId?: string;
}

export const PaymentCard = ({
  amount,
  status,
  date,
  serviceName,
  paymentMethod,
  transactionId,
}: PaymentCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h4 className="mb-1">{serviceName}</h4>
            <p className="text-sm text-muted-foreground">ID: {transactionId || 'N/A'}</p>
          </div>
          <PaymentStatusBadge status={status} />
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4" />
              <span className="text-sm">Monto</span>
            </div>
            <span className="font-semibold text-lg text-primary">
              ${amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Fecha</span>
            </div>
            <span className="text-sm">{date}</span>
          </div>

          {paymentMethod && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm">Método</span>
              </div>
              <span className="text-sm">{paymentMethod}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
