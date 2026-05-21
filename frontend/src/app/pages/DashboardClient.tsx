import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import {
  Briefcase,
  Search,
  Home,
  Clock,
  User,
  LogOut,
  Star,
  MapPin,
  Wrench,
  Zap,
  Menu,
  X,
} from 'lucide-react';

export const DashboardClient = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { icon: Wrench, name: 'Plomería', color: 'bg-blue-100 text-blue-600' },
    { icon: Zap, name: 'Electricidad', color: 'bg-yellow-100 text-yellow-600' },
    { icon: '🎨', name: 'Pintura', color: 'bg-purple-100 text-purple-600' },
    { icon: '🔧', name: 'Carpintería', color: 'bg-orange-100 text-orange-600' },
  ];

  const professionals = [
    {
      id: '1',
      name: 'Juan Pérez',
      trade: 'Plomería',
      rating: 4.8,
      reviews: 124,
      price: '$350/hr',
      location: 'Polanco, CDMX',
      verified: true,
    },
    {
      id: '2',
      name: 'María García',
      trade: 'Electricidad',
      rating: 4.9,
      reviews: 98,
      price: '$400/hr',
      location: 'Roma Norte, CDMX',
      verified: true,
    },
    {
      id: '3',
      name: 'Carlos Ruiz',
      trade: 'Pintura',
      rating: 4.7,
      reviews: 156,
      price: '$300/hr',
      location: 'Condesa, CDMX',
      verified: true,
    },
  ];

  const recentRequests = [
    {
      id: '1',
      service: 'Reparación de fuga',
      provider: 'Juan Pérez',
      status: 'Completado',
      date: '10 May 2026',
    },
    {
      id: '2',
      service: 'Instalación eléctrica',
      provider: 'María García',
      status: 'En progreso',
      date: '14 May 2026',
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const handleSearch = () => {
    navigate('/marketplace', {
      state: {
        search: searchTerm,
      },
    });
  };

  const handleCategoryClick = (category: string) => {
    navigate('/marketplace', {
      state: {
        category,
      },
    });
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
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => navigate('/dashboard-client')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-primary font-medium"
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

          <button
            onClick={() => navigate('/my-requests')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground"
          >
            <Clock className="w-5 h-5" />
            Mis solicitudes
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

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-border px-4 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="ml-12 lg:ml-0">Bienvenido de nuevo</h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Search Bar */}
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar profesionales o servicios..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSearch();
                    }
                  }}
                />
              </div>
              <Button onClick={handleSearch}>Buscar</Button>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/marketplace')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4>Buscar profesionales</h4>
                  <p className="text-sm text-muted-foreground">
                    Encuentra el mejor proveedor para tu proyecto
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate('/my-requests')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h4>Mis solicitudes</h4>
                  <p className="text-sm text-muted-foreground">
                    Revisa el estado de tus servicios
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="mb-4">Categorías populares</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((cat, idx) => (
                <Card
                  key={idx}
                  onClick={() => handleCategoryClick(cat.name)}
                  className="p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div
                    className={`w-12 h-12 rounded-lg ${cat.color} flex items-center justify-center mb-3`}
                  >
                    {typeof cat.icon === 'string' ? (
                      <span className="text-2xl">{cat.icon}</span>
                    ) : (
                      <cat.icon className="w-6 h-6" />
                    )}
                  </div>
                  <p className="font-medium">{cat.name}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Professionals */}
          <div className="mb-8">
            <h3 className="mb-4">Profesionales destacados</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionals.map((pro) => (
                <Card
                  key={pro.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="h-32 bg-gradient-to-br from-blue-400 to-blue-600" />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="mb-1">{pro.name}</h4>
                        <p className="text-sm text-muted-foreground">{pro.trade}</p>
                      </div>
                      {pro.verified && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{pro.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({pro.reviews} reseñas)
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      {pro.location}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-border">
                      <span className="font-semibold text-primary">{pro.price}</span>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/providers/${pro.id}`)}
                      >
                        Ver perfil
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Requests */}
          <div>
            <h3 className="mb-4">Solicitudes recientes</h3>
            <Card>
              <div className="divide-y divide-border">
                {recentRequests.map((req) => (
                  <div
                    key={req.id}
                    onClick={() => navigate(`/requests/${req.id}`)}
                    className="p-6 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="mb-1">{req.service}</h4>
                        <p className="text-sm text-muted-foreground">
                          {req.provider}
                        </p>
                      </div>

                      <div className="text-right">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-2 ${
                            req.status === 'Completado'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {req.status}
                        </span>
                        <p className="text-sm text-muted-foreground">{req.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};