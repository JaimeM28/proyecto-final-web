import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Card } from '../components/Card';
import { resetPassword } from '../lib/auth.service';

export const ResetPassword = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem('resetPasswordEmail');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      alert('No se encontró correo para recuperación');
      navigate('/forgot-password');
      return;
    }

    try {
      setLoading(true);

      await resetPassword({
        email,
        code,
        newPassword,
      });

      localStorage.removeItem('resetPasswordEmail');

      alert('Contraseña actualizada correctamente');
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Código inválido o expirado');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <h2 className="text-center mb-2">Restablecer contraseña</h2>
          <p className="text-center text-muted-foreground mb-8">
            Ingresa el código recibido y tu nueva contraseña
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="code">Código</Label>
              <Input
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="123456"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Nueva contraseña</Label>
              <Input
                id="password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña"
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Actualizando...' : 'Actualizar contraseña'}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};