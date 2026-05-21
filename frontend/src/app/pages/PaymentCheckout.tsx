import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { NotificationBanner } from '../components/NotificationBanner';
import { ArrowLeft, CreditCard, Shield, CheckCircle } from 'lucide-react';

export const PaymentCheckout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const mockRequest = {
    id: '1',
    service: 'Reparación de fuga en cocina',
    providerName: 'Juan Pérez',
    estimatedCost: 700,
    estimatedHours: 2,
    date: '20 May 2026',
  };

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setNotification({
        type: 'success',
        message: 'Pago procesado exitosamente. Serás redirigido a Mercado Pago...',
      });
      setTimeout(() => {
        navigate('/my-requests');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 lg:p-8">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver
        </Button>

        {notification && (
          <div className="mb-6">
            <NotificationBanner
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          </div>
        )}

        <h1 className="mb-8">Checkout de pago</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Method */}
          <div className="lg:col-span-2">
            <Card className="p-8 mb-6">
              <h3 className="mb-6">Método de pago</h3>

              <div className="space-y-4">
                <button className="w-full p-6 border-2 border-primary bg-blue-50 rounded-lg flex items-center gap-4 hover:bg-blue-100 transition-colors">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">Mercado Pago</p>
                    <p className="text-sm text-muted-foreground">
                      Tarjeta de crédito, débito o saldo en cuenta
                    </p>
                  </div>
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                </button>
              </div>
            </Card>

            <Card className="p-6 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <Shield className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-blue-900 mb-2">Pago 100% seguro</h4>
                  <ul className="space-y-1 text-sm text-blue-800">
                    <li>✓ Protección al comprador de Mercado Pago</li>
                    <li>✓ Tus datos están encriptados</li>
                    <li>✓ No compartimos tu información financiera</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-8">
              <h4 className="mb-4">Resumen del pedido</h4>

              <div className="space-y-3 mb-6">
                <div>
                  <p className="font-medium">{mockRequest.service}</p>
                  <p className="text-sm text-muted-foreground">Proveedor: {mockRequest.providerName}</p>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Fecha</span>
                  <span>{mockRequest.date}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duración estimada</span>
                  <span>{mockRequest.estimatedHours} horas</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tarifa por hora</span>
                  <span>${mockRequest.estimatedCost / mockRequest.estimatedHours}/hr</span>
                </div>
              </div>

              <div className="border-t border-border pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="text-2xl font-semibold text-primary">
                    ${mockRequest.estimatedCost.toLocaleString('es-MX')}
                  </span>
                </div>
              </div>

              <Button
                onClick={handlePayment}
                disabled={isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? 'Procesando...' : 'Pagar con Mercado Pago'}
              </Button>

              <p className="text-xs text-center text-muted-foreground mt-4">
                Al confirmar el pago, aceptas nuestros términos y condiciones
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
