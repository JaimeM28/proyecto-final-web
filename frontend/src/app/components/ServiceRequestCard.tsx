import { Link } from 'react-router';
import { Card } from './Card';
import { Button } from './Button';
import { RequestStatusBadge } from './RequestStatusBadge';
import { Calendar, MapPin, Clock } from 'lucide-react';

type RequestStatus =
  | 'PENDING'
  | 'ACCEPTED'
  | 'REJECTED'
  | 'CANCELLED'
  | 'COMPLETED';

interface ServiceRequestCardProps {
  id: string;
  service: string;
  providerName?: string;
  clientName?: string;
  status: RequestStatus;
  date: string;
  location: string;
  estimatedHours?: number;
  description: string;
  viewType: 'client' | 'provider';
}

export const ServiceRequestCard = ({
  id,
  service,
  providerName,
  clientName,
  status,
  date,
  location,
  estimatedHours,
  description,
  viewType,
}: ServiceRequestCardProps) => {
  const detailRoute =
    viewType === 'client'
      ? `/requests/${id}`
      : `/provider/requests/${id}`;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-2">
              <h4 className="flex-1">{service}</h4>
              <RequestStatusBadge status={status} />
            </div>

            <p className="text-sm text-muted-foreground">
              {viewType === 'client' &&
                providerName &&
                `Proveedor: ${providerName}`}

              {viewType === 'provider' &&
                clientName &&
                `Cliente: ${clientName}`}
            </p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>

          {estimatedHours && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{estimatedHours} horas estimadas</span>
            </div>
          )}
        </div>

        <Link to={detailRoute}>
          <Button variant="outline" className="w-full">
            Ver detalles
          </Button>
        </Link>
      </div>
    </Card>
  );
};