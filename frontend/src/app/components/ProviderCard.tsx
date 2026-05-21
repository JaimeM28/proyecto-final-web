import { Link } from 'react-router';
import { Card } from './Card';
import { Button } from './Button';
import { Star, MapPin, Briefcase, CheckCircle } from 'lucide-react';

interface ProviderCardProps {
  id: string;
  name: string;
  trade: string;
  rating: number;
  reviewCount: number;
  pricePerHour: number;
  location: string;
  verified: boolean;
  imageUrl?: string;
  experience?: string;
}

export const ProviderCard = ({
  id,
  name,
  trade,
  rating,
  reviewCount,
  pricePerHour,
  location,
  verified,
  imageUrl,
  experience,
}: ProviderCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600 relative">
        {imageUrl && (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        )}
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4>{name}</h4>
              {verified && (
                <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Briefcase className="w-4 h-4" />
              <span>{trade}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{rating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">({reviewCount} reseñas)</span>
        </div>

        {experience && (
          <div className="text-sm text-muted-foreground mb-3">
            {experience} de experiencia
          </div>
        )}

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <MapPin className="w-4 h-4" />
          {location}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <div>
            <span className="text-sm text-muted-foreground">Desde</span>
            <p className="font-semibold text-primary text-lg">
              ${pricePerHour}/hr
            </p>
          </div>
          <Link to={`/providers/${id}`}>
            <Button size="sm">Ver perfil</Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};
