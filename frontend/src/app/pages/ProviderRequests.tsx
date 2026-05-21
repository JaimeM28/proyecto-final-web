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
  FileText,
} from 'lucide-react';

export const ProviderRequests = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'pending' | 'accepted' | 'completed'
  >('pending');

  const mockRequests = [
    {
      id: '1',
      service: 'Reparación de fuga en cocina',
      clientName: 'Ana Martínez',
      status: 'PENDING' as const,
      date: '20 May 2026',
      location: 'Polanco, CDMX',
      estimatedHours: 2,
      description:
        'Reparación urgente de fuga en tubería bajo el fregadero de la cocina.',
    },
    {
      id: '2',
      service: 'Instalación de calentador',
      clientName: 'Roberto Silva',
      status: 'ACCEPTED' as const,
      date: '22 May 2026',
      location: 'Roma Norte, CDMX',
      estimatedHours: 3,
      description:
        'Instalación de calentador de agua a gas para baño principal.',
    },
    {
      id: '3',
      service: 'Reparación de tubería',
      clientName: 'Laura Gómez',
      status: 'COMPLETED' as const,
      date: '15 May 2026',
      location: 'Condesa, CDMX',
      estimatedHours: 2,
      description: 'Reparación de tubería rota en baño.',
    },
  ];

  const filteredRequests = mockRequests.filter((req) => {
    if (activeTab === 'pending') return req.status === 'PENDING';
    if (activeTab === 'accepted') return req.status === 'ACCEPTED';
    if (activeTab === 'completed') return req.status === 'COMPLETED';
    return true;
  });

  const pendingCount = mockRequests.filter(
    (r) => r.status === 'PENDING'
  ).length;

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

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-primary font-medium">
            <Bell className="w-5 h-5" />
            Solicitudes

            {pendingCount > 0 && (
              <span className="ml-auto bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate('/provider/active-services')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground"
          >
            <Calendar className="w-5 h-5" />
            Servicios activos
          </button>

          <button
            onClick={() => navigate('/provider/completed-jobs')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground"
          >
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
            <h1 className="ml-12 lg:ml-0">Solicitudes de servicio</h1>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                JP
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Tabs */}
          <Card className="p-6 mb-8">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                Pendientes
                {pendingCount > 0 && (
                  <span className="ml-2 bg-white text-primary px-2 py-0.5 rounded-full text-xs">
                    {pendingCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('accepted')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'accepted'
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                Aceptadas
              </button>

              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'completed'
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                Completadas
              </button>
            </div>
          </Card>

          {/* Requests */}
          {filteredRequests.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((request) => (
                <ServiceRequestCard
                  key={request.id}
                  {...request}
                  viewType="provider"
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No hay solicitudes"
              description={`No tienes solicitudes ${
                activeTab === 'pending'
                  ? 'pendientes'
                  : activeTab === 'accepted'
                  ? 'aceptadas'
                  : 'completadas'
              } en este momento`}
              icon={<FileText className="w-8 h-8 text-muted-foreground" />}
            />
          )}
        </main>
      </div>
    </div>
  );
};