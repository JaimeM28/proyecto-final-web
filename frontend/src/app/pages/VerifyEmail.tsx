import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Mail } from 'lucide-react';
import {
  verifyEmail,
  resendVerificationEmail,
} from '../lib/auth.service';

export const VerifyEmail = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(180);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = localStorage.getItem('pendingVerificationEmail');

  useEffect(() => {
    if (!email) {
      navigate('/register');
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [email, navigate]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const verificationCode = code.join('');

    if (verificationCode.length !== 6) {
      alert('Ingresa el código completo');
      return;
    }

    if (!email) {
      alert('Correo no encontrado');
      navigate('/register');
      return;
    }

    try {
      setLoading(true);

      await verifyEmail({
        email,
        code: verificationCode,
      });

      localStorage.removeItem('pendingVerificationEmail');
      localStorage.removeItem('verificationExpiresAt');

      alert('Correo verificado correctamente');
      navigate('/login');
    } catch (error) {
      console.error('Verify email error:', error);
      alert('Código inválido o expirado');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return;

    try {
      setResending(true);

      await resendVerificationEmail(email);

      setTimer(180);
      setCode(['', '', '', '', '', '']);

      alert('Código reenviado');
    } catch (error) {
      console.error('Resend code error:', error);
      alert('No se pudo reenviar el código');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="w-8 h-8 text-primary" />
            </div>
          </div>

          <h2 className="text-center mb-2">Verifica tu correo</h2>

          <p className="text-center text-muted-foreground mb-2">
            Ingresa el código de 6 dígitos enviado a:
          </p>

          <p className="text-center font-medium mb-8 break-all">
            {email}
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2 justify-center">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-14 text-center text-xl font-semibold border-2 border-border rounded-lg focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              ))}
            </div>

            <div className="text-center">
              {timer > 0 ? (
                <p className="text-sm text-muted-foreground">
                  Reenviar código en{' '}
                  <span className="font-semibold text-primary">
                    {timer}s
                  </span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={resending}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {resending ? 'Reenviando...' : 'Reenviar código'}
                </button>
              )}
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={loading}
            >
              {loading ? 'Verificando...' : 'Verificar'}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              ¿No recibiste el código? Revisa spam o correo no deseado
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};