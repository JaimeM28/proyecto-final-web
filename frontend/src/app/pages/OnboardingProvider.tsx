import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Label } from '../components/Label';
import { Card } from '../components/Card';
import { completeProviderOnboarding } from '../lib/onboarding.service';

export const OnboardingProvider = () => {
  const navigate = useNavigate();

  const [trade, setTrade] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      await completeProviderOnboarding({
        trade,
        location,
        description,
        price: Number(price),
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

      navigate('/dashboard-provider');
    } catch (error) {
      console.error(error);
      alert('Error al completar onboarding');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <div className="p-8">
          <h2 className="text-center mb-2">Completa tu perfil</h2>
          <p className="text-center text-muted-foreground mb-8">
            Cuéntanos sobre tus servicios
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="trade">Oficio</Label>
              <Input
                id="trade"
                value={trade}
                onChange={(e) => setTrade(e.target.value)}
                placeholder="Ej: Plomero"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Ubicación</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Ej: Monterrey"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe tus servicios"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Precio base</Label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="500"
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