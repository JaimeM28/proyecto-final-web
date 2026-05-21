import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ServiceRequestCard } from '../components/ServiceRequestCard';
import { EmptyState } from '../components/EmptyState';
import {
  Briefcase,
  Search,
  Home,
  Clock,
  User,
  LogOut,
  Menu,
  X,
  FileText,
} from 'lucide-react';

export const MyRequests = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'active' | 'completed'>('all');

  const mockRequests = [
    {
      id: '1',
      service: 'Reparación de fuga en cocina',
      providerName: 'Juan Pérez',
      status: 'ACCEPTED' as const,
      date: '20 May 2026',
      location: 'Polanco, CDMX',
      estimatedHours: 2,
      description: 'Reparación urgente de fuga en tubería bajo el fregadero de la cocina.',
    },
    {
      id: '2',
      service: 'Instalación eléctrica',
      providerName: 'María García',
      status: 'PENDING' as const,
      date: '22 May 2026',
      location: 'Roma Norte, CDMX',
      estimatedHours: 4,
      description: 'Instalación de nuevos contactos y cableado para área de oficina.',
    },
    {
      id: '3',
      service: 'Pintura de sala',
      providerName: 'Carlos Ruiz',
      status: 'COMPLETED' as const,
      date: '15 May 2026',
      location: 'Condesa, CDMX',
      estimatedHours: 8,
      description: 'Pintura completa de sala y comedor, incluyendo preparación de superficies.',
    },
  ];

  const filteredRequests = mockRequests.filter((req) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return req.status === 'PENDING';
    if (activeTab === 'active') return req.status === 'ACCEPTED';
    if (activeTab === 'completed') return req.status === 'COMPLETED';
    return true;
  });

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="bg-white"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => navigate('/dashboard-client')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground"
          >
            <Home className="w-5 h-5" />
            Inicio
          </button>
          <button
            onClick={() => navigate('/marketplace')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground"
          >
            <Search className="w-5 h-5" />
            Buscar profesionales
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-primary font-medium">
            <Clock className="w-5 h-5" />
            Mis solicitudes
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground">
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

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-border px-4 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="ml-12 lg:ml-0">Mis solicitudes</h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Tabs */}
          <Card className="p-6 mb-8">
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'all'
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                Todas
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'pending'
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                Pendientes
              </button>
              <button
                onClick={() => setActiveTab('active')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'active'
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                Activas
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

          {/* Results */}
          {filteredRequests.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRequests.map((request) => (
                <ServiceRequestCard key={request.id} {...request} viewType="client" />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No hay solicitudes"
              description="Aún no has realizado ninguna solicitud de servicio"
              icon={<FileText className="w-8 h-8 text-muted-foreground" />}
            />
          )}
        </main>
      </div>
    </div>
  );
};
