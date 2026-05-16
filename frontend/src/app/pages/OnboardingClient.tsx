import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Card } from '../components/Card';
import { MapPin, Phone, CheckCircle } from 'lucide-react';

export const OnboardingClient = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard-client');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                1
              </div>
              <div className={`h-1 w-20 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>
                2
              </div>
            </div>

            <h2 className="text-center mb-2">Completa tu perfil</h2>
            <p className="text-center text-muted-foreground">
              {step === 1 ? 'Cuéntanos dónde te encuentras' : 'Información de contacto'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="city" placeholder="Ej: Ciudad de México" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="neighborhood">Colonia o delegación</Label>
                  <Input id="neighborhood" placeholder="Ej: Polanco" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postal">Código postal</Label>
                  <Input id="postal" placeholder="Ej: 11560" required />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900">
                    Usamos tu ubicación para mostrarte profesionales cercanos a ti
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="phone" type="tel" placeholder="55 1234 5678" className="pl-10" required />
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900 mb-1">¡Ya casi está!</p>
                    <p className="text-sm text-green-800">
                      Al completar tu perfil podrás contactar profesionales y solicitar servicios
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {step === 2 && (
                <Button type="button" variant="outline" className="w-full" onClick={() => setStep(1)}>
                  Atrás
                </Button>
              )}
              {step === 1 ? (
                <Button type="button" className="w-full" onClick={() => setStep(2)}>
                  Continuar
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Completar perfil
                </Button>
              )}
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};
