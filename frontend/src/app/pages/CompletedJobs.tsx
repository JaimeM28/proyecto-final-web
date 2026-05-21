import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ServiceRequestCard } from '../components/ServiceRequestCard';
import { EmptyState } from '../components/EmptyState';
import {
  Briefcase,
  Home,
  Calendar,
  DollarSign,
  User,
  LogOut,
  Menu,
  X,
  Bell,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

export const CompletedJobs = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mockCompletedJobs = [
    {
      id: '1',
      service: 'Reparación de tubería',
      clientName: 'Laura Gómez',
      status: 'COMPLETED' as const,
      date: '15 May 2026',
      location: 'Condesa, CDMX',
      estimatedHours: 2,
      description: 'Reparación de tubería rota en baño.',
      earnings: 700,
    },
    {
      id: '2',
      service: 'Instalación de lavabo',
      clientName: 'Patricia López',
      status: 'COMPLETED' as const,
      date: '10 May 2026',
      location: 'Polanco, CDMX',
      estimatedHours: 3,
      description: 'Instalación completa de lavabo en baño principal.',
      earnings: 1050,
    },
    {
      id: '3',
      service: 'Mantenimiento de calentador',
      clientName: 'José Hernández',
      status: 'COMPLETED' as const,
      date: '5 May 2026',
      location: 'Roma Sur, CDMX',
      estimatedHours: 1,
      description: 'Mantenimiento preventivo de calentador de agua.',
      earnings: 350,
    },
  ];

  const totalEarnings = mockCompletedJobs.reduce(
    (sum, job) => sum + job.earnings,
    0
  );

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-border w-64 z-40 transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="font-semibold text-foreground">Tu Oficio</span>
          </div>

          <div className="mt-4 px-3 py-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-muted-foreground">Panel de</p>
            <p className="font-medium text-primary">Proveedor</p>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => navigate('/dashboard-provider')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground"
          >
            <Home className="w-5 h-5" />
            Inicio
          </button>

          <button
            onClick={() => navigate('/provider/requests')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground"
          >
            <Bell className="w-5 h-5" />
            Solicitudes
          </button>

          <button
            onClick={() => navigate('/provider/active-services')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground"
          >
            <Calendar className="w-5 h-5" />
            Servicios activos
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-primary font-medium">
            <DollarSign className="w-5 h-5" />
            Trabajos completados
          </button>

          <button
            disabled
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground cursor-not-allowed opacity-50"
          >
            <User className="w-5 h-5" />
            Mi perfil
          </button>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-destructive"
          >
            <LogOut className="w-5 h-5" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="lg:ml-64 min-h-screen">
        <header className="bg-white border-b border-border px-4 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="ml-12 lg:ml-0">Trabajos completados</h1>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                JP
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Ingresos totales
                  </p>
                  <p className="text-2xl font-semibold text-green-600">
                    ${totalEarnings.toLocaleString('es-MX')}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Trabajos completados
                  </p>
                  <p className="text-2xl font-semibold">
                    {mockCompletedJobs.length}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Promedio por trabajo
                  </p>
                  <p className="text-2xl font-semibold">
                    $
                    {Math.round(
                      totalEarnings / mockCompletedJobs.length
                    ).toLocaleString('es-MX')}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Jobs */}
          {mockCompletedJobs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCompletedJobs.map((job) => (
                <ServiceRequestCard
                  key={job.id}
                  {...job}
                  viewType="provider"
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No hay trabajos completados"
              description="Aún no has completado ningún trabajo"
              icon={<CheckCircle className="w-8 h-8 text-muted-foreground" />}
            />
          )}
        </main>
      </div>
    </div>
  );
};