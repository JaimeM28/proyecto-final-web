import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Textarea } from '../components/Textarea';
import { NotificationBanner } from '../components/NotificationBanner';
import {
  ArrowLeft,
  Star,
  MapPin,
  Briefcase,
  CheckCircle,
  Calendar,
  Clock,
  Award,
  Phone,
  Mail,
} from 'lucide-react';

export const ProviderDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const mockProvider = {
    id: '1',
    name: 'Juan Pérez',
    trade: 'Plomería',
    rating: 4.8,
    reviewCount: 124,
    pricePerHour: 350,
    location: 'Polanco, CDMX',
    verified: true,
    experience: '10+ años',
    description:
      'Plomero profesional con más de 10 años de experiencia en instalaciones residenciales y comerciales. Especializado en reparación de fugas, instalación de sistemas de agua caliente y trabajos de drenaje.',
    services: [
      'Reparación de fugas',
      'Instalación de calentadores',
      'Destapado de drenajes',
      'Instalación de baños completos',
      'Mantenimiento preventivo',
    ],
    availability: 'Lunes a Sábado, 8:00 AM - 6:00 PM',
    phone: '+52 55 1234 5678',
    email: 'juan.perez@ejemplo.com',
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setNotification({
      type: 'success',
      message: 'Solicitud enviada exitosamente. El proveedor recibirá tu solicitud y te contactará pronto.',
    });
    setShowRequestForm(false);
    setTimeout(() => {
      navigate('/my-requests');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-4 lg:p-8">
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
            <Card className="overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600" />
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h1>{mockProvider.name}</h1>
                      {mockProvider.verified && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <Briefcase className="w-5 h-5" />
                      <span className="text-lg">{mockProvider.trade}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Desde</p>
                    <p className="text-3xl font-semibold text-primary">
                      ${mockProvider.pricePerHour}/hr
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-lg">{mockProvider.rating}</span>
                    <span className="text-muted-foreground">({mockProvider.reviewCount} reseñas)</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-5 h-5" />
                    <span>{mockProvider.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Award className="w-5 h-5" />
                    <span>{mockProvider.experience}</span>
                  </div>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="mb-3">Sobre mí</h3>
                  <p className="text-muted-foreground leading-relaxed">{mockProvider.description}</p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="mb-4">Servicios ofrecidos</h3>
              <ul className="space-y-3">
                {mockProvider.services.map((service, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{service}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {showRequestForm && (
              <Card className="p-8">
                <h3 className="mb-6">Solicitar servicio</h3>
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="service">Tipo de servicio</Label>
                    <Input id="service" placeholder="Ej: Reparación de fuga en cocina" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Descripción del problema</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe detalladamente lo que necesitas..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Fecha preferida</Label>
                      <Input id="date" type="date" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Hora preferida</Label>
                      <Input id="time" type="time" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Dirección</Label>
                    <Input id="location" placeholder="Dirección completa donde se requiere el servicio" required />
                  </div>

                  <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => setShowRequestForm(false)} className="w-full">
                      Cancelar
                    </Button>
                    <Button type="submit" className="w-full">
                      Enviar solicitud
                    </Button>
                  </div>
                </form>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h4 className="mb-4">Información de contacto</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Teléfono</p>
                    <p className="font-medium">{mockProvider.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-sm">{mockProvider.email}</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h4 className="mb-4">Disponibilidad</h4>
              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Horario</p>
                  <p className="font-medium">{mockProvider.availability}</p>
                </div>
              </div>
            </Card>

            {!showRequestForm && (
              <Button onClick={() => setShowRequestForm(true)} className="w-full" size="lg">
                Solicitar servicio
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
