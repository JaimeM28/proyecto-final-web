import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { RequestStatusBadge } from '../components/RequestStatusBadge';
import { NotificationBanner } from '../components/NotificationBanner';
import { ConfirmActionModal } from '../components/ConfirmActionModal';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  FileText,
  CreditCard,
  Phone,
  Mail,
} from 'lucide-react';

export const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const mockRequest = {
    id: '1',
    service: 'Reparación de fuga en cocina',
    description:
      'Reparación urgente de fuga en tubería bajo el fregadero de la cocina. La fuga ha aumentado en los últimos días y necesita atención inmediata.',
    status: 'ACCEPTED' as const,
    date: '20 May 2026',
    time: '10:00 AM',
    location: 'Polanco, CDMX',
    fullAddress: 'Calle Emilio Castelar 123, Polanco, CDMX',
    estimatedHours: 2,
    estimatedCost: 700,
    provider: {
      name: 'Juan Pérez',
      phone: '+52 55 1234 5678',
      email: 'juan.perez@ejemplo.com',
      rating: 4.8,
    },
    createdAt: '15 May 2026',
    canPay: true,
  };

  const handleCancelRequest = () => {
    setNotification({
      type: 'success',
      message: 'Solicitud cancelada exitosamente',
    });

    setShowCancelModal(false);

    setTimeout(() => {
      navigate('/my-requests');
    }, 2000);
  };

  const handlePayment = () => {
    navigate(`/checkout/${id}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto p-4 lg:p-8">
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

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="mb-2">{mockRequest.service}</h1>
                  <p className="text-sm text-muted-foreground">
                    Solicitud creada el {mockRequest.createdAt}
                  </p>
                </div>
                <RequestStatusBadge status={mockRequest.status} />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3>Descripción</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {mockRequest.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h4>Fecha y hora</h4>
                    </div>
                    <p className="text-muted-foreground">
                      {mockRequest.date} a las {mockRequest.time}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-primary" />
                      <h4>Duración estimada</h4>
                    </div>
                    <p className="text-muted-foreground">
                      {mockRequest.estimatedHours} horas
                    </p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h4>Ubicación</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {mockRequest.fullAddress}
                  </p>
                </div>
              </div>
            </Card>

            {mockRequest.status === 'ACCEPTED' && (
              <Card className="p-6 bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h4 className="text-blue-900 mb-1">Solicitud aceptada</h4>
                    <p className="text-sm text-blue-800 mb-4">
                      El proveedor ha aceptado tu solicitud. Puedes proceder con
                      el pago para confirmar el servicio.
                    </p>

                    <p className="text-lg font-semibold text-blue-900 mb-3">
                      Total estimado: $
                      {mockRequest.estimatedCost.toLocaleString('es-MX')}
                    </p>

                    {mockRequest.canPay && (
                      <Button onClick={handlePayment}>
                        Proceder al pago
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {mockRequest.status === 'PENDING' && (
              <Card className="p-6 bg-orange-50 border-orange-200">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-orange-900 mb-1">
                      Solicitud pendiente
                    </h4>
                    <p className="text-sm text-orange-800">
                      Tu solicitud ha sido enviada al proveedor. Te notificaremos
                      cuando responda.
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {mockRequest.status === 'REJECTED' && (
              <Card className="p-6 bg-red-50 border-red-200">
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-red-900 mb-1">
                      Solicitud rechazada
                    </h4>
                    <p className="text-sm text-red-800">
                      Lo sentimos, el proveedor no pudo aceptar tu solicitud.
                      Puedes buscar otros profesionales disponibles.
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="mb-4">Proveedor</h4>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                    {mockRequest.provider.name.charAt(0)}
                  </div>

                  <div>
                    <p className="font-medium">{mockRequest.provider.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ⭐ {mockRequest.provider.rating}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="text-sm font-medium">
                      {mockRequest.provider.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-sm font-medium break-all">
                      {mockRequest.provider.email}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {(mockRequest.status === 'PENDING' ||
              mockRequest.status === 'ACCEPTED') && (
              <Button
                variant="destructive"
                onClick={() => setShowCancelModal(true)}
                className="w-full"
              >
                Cancelar solicitud
              </Button>
            )}
          </div>
        </div>
      </div>

      <ConfirmActionModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleCancelRequest}
        title="Cancelar solicitud"
        description="¿Estás seguro de que deseas cancelar esta solicitud? Esta acción no se puede deshacer."
        confirmText="Sí, cancelar"
        cancelText="No, mantener"
        variant="danger"
      />
    </div>
  );
};