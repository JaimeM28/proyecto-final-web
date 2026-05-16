import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Select } from '../components/Select';
import { Textarea } from '../components/Textarea';
import { Card } from '../components/Card';
import { Briefcase, MapPin, Phone, DollarSign, Award } from 'lucide-react';

export const OnboardingProvider = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard-provider');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <div className="p-8">
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3].map((s) => (
                <>
                  <div
                    key={s}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      step >= s ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {s}
                  </div>
                  {s < 3 && <div className={`h-1 w-16 ${step > s ? 'bg-primary' : 'bg-muted'}`} />}
                </>
              ))}
            </div>

            <h2 className="text-center mb-2">Completa tu perfil profesional</h2>
            <p className="text-center text-muted-foreground">
              {step === 1 && 'Información de tu oficio'}
              {step === 2 && 'Ubicación y contacto'}
              {step === 3 && 'Experiencia y tarifas'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trade">Oficio principal</Label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
                    <Select id="trade" className="pl-10" required>
                      <option value="">Selecciona tu oficio</option>
                      <option>Plomería</option>
                      <option>Electricidad</option>
                      <option>Pintura</option>
                      <option>Carpintería</option>
                      <option>Refrigeración</option>
                      <option>Construcción</option>
                      <option>Jardinería</option>
                      <option>Limpieza</option>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción de servicios</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe los servicios que ofreces, tu experiencia y especialidades..."
                    rows={5}
                    required
                  />
                  <p className="text-sm text-muted-foreground">Mínimo 50 caracteres</p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="city">Ciudad</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="city" placeholder="Ej: Ciudad de México" className="pl-10" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverage">Zona de cobertura</Label>
                  <Input id="coverage" placeholder="Ej: Todo CDMX y área metropolitana" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono de contacto</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input id="phone" type="tel" placeholder="55 1234 5678" className="pl-10" required />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="experience">Años de experiencia</Label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Select id="experience" className="pl-10" required>
                      <option value="">Selecciona tu experiencia</option>
                      <option>Menos de 1 año</option>
                      <option>1-3 años</option>
                      <option>3-5 años</option>
                      <option>5-10 años</option>
                      <option>Más de 10 años</option>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rate">Tarifa base por hora</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="rate"
                      type="number"
                      placeholder="300"
                      className="pl-10"
                      required
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">En pesos mexicanos (MXN)</p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-900 mb-2 font-medium">
                    ¡Último paso!
                  </p>
                  <p className="text-sm text-blue-800">
                    Tu perfil será revisado por nuestro equipo antes de ser publicado. Te notificaremos por correo cuando esté activo.
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3">
              {step > 1 && (
                <Button type="button" variant="outline" className="w-full" onClick={() => setStep(step - 1)}>
                  Atrás
                </Button>
              )}
              {step < 3 ? (
                <Button type="button" className="w-full" onClick={() => setStep(step + 1)}>
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
