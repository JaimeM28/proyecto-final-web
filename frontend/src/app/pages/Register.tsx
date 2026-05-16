import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Card } from '../components/Card';
import { Briefcase } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [userType, setUserType] = useState<'client' | 'provider'>(
    searchParams.get('type') === 'provider' ? 'provider' : 'client'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/verify-email');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
          </div>

          <h2 className="text-center mb-2">Crear cuenta</h2>
          <p className="text-center text-muted-foreground mb-6">
            Únete a Tu Oficio y comienza hoy
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="Juan Pérez" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" placeholder="tu@email.com" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" placeholder="Mínimo 8 caracteres" required />
            </div>

            <div className="space-y-2">
              <Label>Me registro como:</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType('client')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userType === 'client'
                      ? 'border-primary bg-blue-50'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">👤</div>
                  <div className="font-medium">Cliente</div>
                  <div className="text-xs text-muted-foreground">Busco servicios</div>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('provider')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userType === 'provider'
                      ? 'border-primary bg-blue-50'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="text-2xl mb-1">🔧</div>
                  <div className="font-medium">Proveedor</div>
                  <div className="text-xs text-muted-foreground">Ofrezco servicios</div>
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                Al registrarte deberás verificar tu correo electrónico.
              </p>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Registrarse
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Inicia sesión
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
