import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Card } from '../components/Card';
import { ShieldCheck } from 'lucide-react';

export const ResetPassword = () => {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <ShieldCheck className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h2 className="text-center mb-2">Restablecer contraseña</h2>
          <p className="text-center text-muted-foreground mb-6">
            Ingresa el código y tu nueva contraseña
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="code">Código de verificación</Label>
              <Input id="code" placeholder="Ingresa el código de 6 dígitos" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Nueva contraseña</Label>
              <Input id="password" type="password" placeholder="Mínimo 8 caracteres" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">Confirmar contraseña</Label>
              <Input id="confirm" type="password" placeholder="Repite tu nueva contraseña" required />
            </div>

            <Button type="submit" className="w-full" size="lg">
              Actualizar contraseña
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};
