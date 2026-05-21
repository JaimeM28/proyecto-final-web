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
  User,
  FileText,
  Phone,
  Mail,
  CheckCircle,
} from 'lucide-react';

export const ProviderRequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const mockRequest = {
    id: '1',
    service: 'Reparación de fuga en cocina',
    description:
      'Reparación urgente de fuga en tubería bajo el fregadero de la cocina. La fuga ha aumentado en los últimos días y necesita atención inmediata.',
    status: 'PENDING' as const,
    date: '20 May 2026',
    time: '10:00 AM',
    location: 'Polanco, CDMX',
    fullAddress: 'Calle Emilio Castelar 123, Polanco, CDMX',
    estimatedHours: 2,
    client: {
      name: 'Ana Martínez',
      phone: '+52 55 9876 5432',
      email: 'ana.martinez@ejemplo.com',
    },
    createdAt: '15 May 2026',
  };

  const handleAcceptRequest = () => {
    setNotification({
      type: 'success',
      message: 'Solicitud aceptada. El cliente ha sido notificado y puede proceder con el pago.',
    });
    setShowAcceptModal(false);
    setTimeout(() => {
      navigate('/provider/requests');
    }, 2000);
  };

  const handleRejectRequest = () => {
    setNotification({
      type: 'success',
      message: 'Solicitud rechazada. El cliente ha sido notificado.',
    });
    setShowRejectModal(false);
    setTimeout(() => {
      navigate('/provider/requests');
    }, 2000);
  };

  const handleCompleteService = () => {
    setNotification({
      type: 'success',
      message: 'Servicio marcado como completado. El cliente ha sido notificado.',
    });

    setShowCompleteModal(false);

    setTimeout(() => {
      navigate('/provider/completed-jobs');
    }, 2000);
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="mb-2">{mockRequest.service}</h1>
                  <p className="text-sm text-muted-foreground">
                    Solicitud recibida el {mockRequest.createdAt}
                  </p>
                </div>
                <RequestStatusBadge status={mockRequest.status} />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3>Descripción del servicio</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{mockRequest.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h4>Fecha y hora solicitada</h4>
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
                    <p className="text-muted-foreground">{mockRequest.estimatedHours} horas</p>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <h4>Ubicación del servicio</h4>
                  </div>
                  <p className="text-muted-foreground">{mockRequest.fullAddress}</p>
                </div>
              </div>
            </Card>

            {mockRequest.status === 'PENDING' && (
              <Card className="p-6 bg-orange-50 border-orange-200">
                <div className="flex items-start gap-3 mb-4">
                  <Clock className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-orange-900 mb-1">Acción requerida</h4>
                    <p className="text-sm text-orange-800">
                      Revisa los detalles y decide si puedes aceptar esta solicitud.
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={() => setShowAcceptModal(true)} className="flex-1">
                    Aceptar solicitud
                  </Button>
                  <Button variant="outline" onClick={() => setShowRejectModal(true)} className="flex-1">
                    Rechazar
                  </Button>
                </div>
              </Card>
            )}

            {mockRequest.status === 'ACCEPTED' && (
              <Card className="p-6 bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3 mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="text-blue-900 mb-1">Solicitud aceptada</h4>
                    <p className="text-sm text-blue-800 mb-3">
                      Has aceptado esta solicitud. El cliente puede proceder con el pago.
                    </p>
                  </div>
                </div>
                <Button onClick={() => setShowCompleteModal(true)} className="w-full">
                  Marcar como completado
                </Button>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="mb-4">Información del cliente</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                    {mockRequest.client.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{mockRequest.client.name}</p>
                    <p className="text-sm text-muted-foreground">Cliente</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="text-sm font-medium">{mockRequest.client.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-sm font-medium break-all">{mockRequest.client.email}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="mb-4">Detalles de servicio</h4>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Tipo de servicio</p>
                  <p className="font-medium">{mockRequest.service}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Horas estimadas</p>
                  <p className="font-medium">{mockRequest.estimatedHours} horas</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <ConfirmActionModal
        isOpen={showAcceptModal}
        onClose={() => setShowAcceptModal(false)}
        onConfirm={handleAcceptRequest}
        title="Aceptar solicitud"
        description="¿Confirmas que puedes realizar este servicio? El cliente podrá proceder con el pago una vez aceptes."
        confirmText="Sí, aceptar"
        cancelText="Cancelar"
        variant="primary"
      />

      <ConfirmActionModal
        isOpen={showRejectModal}
        onClose={() => setShowRejectModal(false)}
        onConfirm={handleRejectRequest}
        title="Rechazar solicitud"
        description="¿Estás seguro de que deseas rechazar esta solicitud? El cliente será notificado."
        confirmText="Sí, rechazar"
        cancelText="Cancelar"
        variant="danger"
      />

      <ConfirmActionModal
        isOpen={showCompleteModal}
        onClose={() => setShowCompleteModal(false)}
        onConfirm={handleCompleteService}
        title="Marcar como completado"
        description="¿Confirmas que has completado este servicio satisfactoriamente?"
        confirmText="Sí, completar"
        cancelText="Cancelar"
        variant="primary"
      />
    </div>
  );
};
