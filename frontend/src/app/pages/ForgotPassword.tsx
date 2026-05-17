import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Card } from '../components/Card';
import { forgotPassword } from '../lib/auth.service';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await forgotPassword({ email });

      localStorage.setItem('resetPasswordEmail', email);

      alert('Se envió el código de recuperación a tu correo');
      navigate('/reset-password');
    } catch (error) {
      console.error(error);
      alert('Error al solicitar recuperación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <h2 className="text-center mb-2">Recuperar contraseña</h2>
          <p className="text-center text-muted-foreground mb-8">
            Ingresa tu correo para recibir un código de recuperación
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar código'}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};