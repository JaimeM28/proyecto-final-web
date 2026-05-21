import { useMemo, useState } from 'react';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { ProviderCard } from '../components/ProviderCard';
import { EmptyState } from '../components/EmptyState';
import {
  Briefcase,
  Search,
  Home,
  Clock,
  User,
  LogOut,
  Filter,
  Menu,
  X,
} from 'lucide-react';
import { useNavigate } from 'react-router';

export const Marketplace = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'plomeria', name: 'Plomería' },
    { id: 'electricidad', name: 'Electricidad' },
    { id: 'pintura', name: 'Pintura' },
    { id: 'carpinteria', name: 'Carpintería' },
    { id: 'refrigeracion', name: 'Refrigeración' },
  ];

  const mockProviders = [
    {
      id: '1',
      name: 'Juan Pérez',
      trade: 'Plomería',
      rating: 4.8,
      reviewCount: 124,
      pricePerHour: 350,
      location: 'Polanco, CDMX',
      verified: true,
      experience: '10+ años',
    },
    {
      id: '2',
      name: 'María García',
      trade: 'Electricidad',
      rating: 4.9,
      reviewCount: 98,
      pricePerHour: 400,
      location: 'Roma Norte, CDMX',
      verified: true,
      experience: '8 años',
    },
    {
      id: '3',
      name: 'Carlos Ruiz',
      trade: 'Pintura',
      rating: 4.7,
      reviewCount: 156,
      pricePerHour: 300,
      location: 'Condesa, CDMX',
      verified: true,
      experience: '5 años',
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const filteredProviders = useMemo(() => {
    return mockProviders.filter((provider) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.trade.toLowerCase().includes(searchQuery.toLowerCase()) ||
        provider.location.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' ||
        provider.trade.toLowerCase() === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

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
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground"
          >
            <Home className="w-5 h-5" />
            Inicio
          </button>

          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-primary font-medium">
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
        <header className="bg-white border-b border-border px-4 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="ml-12 lg:ml-0">Buscar profesionales</h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Card className="p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, oficio o ubicación..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Button variant="outline" disabled>
                <Filter className="w-5 h-5 mr-2" />
                Filtros
              </Button>
            </div>

            <div className="flex gap-2 mt-4 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === cat.id
                      ? 'bg-primary text-white'
                      : 'bg-muted text-foreground hover:bg-muted/80'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </Card>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredProviders.length} profesionales encontrados
            </p>
          </div>

          {filteredProviders.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProviders.map((provider) => (
                <ProviderCard key={provider.id} {...provider} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No se encontraron profesionales"
              description="Intenta ajustar tus filtros de búsqueda para ver más resultados"
              icon={<Search className="w-8 h-8 text-muted-foreground" />}
            />
          )}
        </main>
      </div>
    </div>
  );
};