import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Mail } from 'lucide-react';

export const VerifyEmail = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación: redirigir a login
    navigate('/login');
  };

  const handleResend = () => {
    setTimer(60);
    setCode(['', '', '', '', '', '']);
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
          <p className="text-center text-muted-foreground mb-8">
            Ingresa el código de 6 dígitos que enviamos a tu correo
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex gap-2 justify-center">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
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
                  Reenviar código en <span className="font-semibold text-primary">{timer}s</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  Reenviar código
                </button>
              )}
            </div>

            <Button type="submit" className="w-full" size="lg">
              Verificar
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              ¿No recibiste el código? Revisa tu carpeta de spam o correo no deseado
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
