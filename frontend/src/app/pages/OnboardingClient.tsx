import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Card } from '../components/Card';
import { completeClientOnboarding } from '../lib/onboarding.service';

export const OnboardingClient = () => {
  const navigate = useNavigate();

  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await completeClientOnboarding({
        location,
      });

      const userRaw = localStorage.getItem('user');

      if (userRaw) {
        const user = JSON.parse(userRaw);

        localStorage.setItem(
          'user',
          JSON.stringify({
            ...user,
            isOnboardingCompleted: true,
          })
        );
      }

      navigate('/dashboard-client');
    } catch (error) {
      console.error(error);
      alert('Error al completar onboarding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <div className="p-8">
          <h2 className="text-center mb-2">Completa tu perfil</h2>
          <p className="text-center text-muted-foreground mb-8">
            Cuéntanos dónde te encuentras
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej: Ciudad de México"
                required
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? 'Guardando...' : 'Completar onboarding'}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
};