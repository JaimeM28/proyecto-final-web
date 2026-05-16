import { Link, useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Card } from '../components/Card';
import { Briefcase } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación: redirigir a onboarding cliente
    navigate('/onboarding-client');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Briefcase className="w-7 h-7 text-white" />
              </div>
            </Link>
          </div>

          <h2 className="text-center mb-2">Bienvenido de nuevo</h2>
          <p className="text-center text-muted-foreground mb-6">
            Inicia sesión en tu cuenta
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="tu@email.com" required />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Contraseña</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <Input id="password" type="password" placeholder="Ingresa tu contraseña" required />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Iniciar sesión
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿No tienes cuenta?{' '}
              <Link to="/register" className="text-primary hover:underline font-medium">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
