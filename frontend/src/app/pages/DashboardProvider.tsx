import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import {
  Briefcase,
  Home,
  Calendar,
  DollarSign,
  User,
  LogOut,
  Clock,
  CheckCircle,
  TrendingUp,
  Menu,
  X,
  Bell,
} from 'lucide-react';

export const DashboardProvider = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const stats = [
    {
      label: 'Solicitudes pendientes',
      value: '3',
      icon: Clock,
      color: 'text-orange-600',
      bg: 'bg-orange-100',
    },
    {
      label: 'Trabajos activos',
      value: '2',
      icon: Briefcase,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      label: 'Completados este mes',
      value: '12',
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      label: 'Ingresos estimados',
      value: '$8,400',
      icon: DollarSign,
      color: 'text-primary',
      bg: 'bg-blue-50',
    },
  ];

  const pendingRequests = [
    {
      id: '1',
      client: 'Ana Martínez',
      service: 'Instalación de lavabo',
      location: 'Polanco',
      time: 'Hace 2 horas',
    },
    {
      id: '2',
      client: 'Roberto Silva',
      service: 'Reparación de tubería',
      location: 'Roma Norte',
      time: 'Hace 4 horas',
    },
    {
      id: '3',
      client: 'Laura Gómez',
      service: 'Cambio de llaves',
      location: 'Condesa',
      time: 'Hace 1 día',
    },
  ];

  const activeJobs = [
    {
      id: '1',
      client: 'Carlos Ramírez',
      service: 'Instalación de calentador',
      status: 'En progreso',
      date: '15 May',
    },
    {
      id: '2',
      client: 'Patricia López',
      service: 'Reparación de fuga',
      status: 'Programado',
      date: '16 May',
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
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

          <div className="mt-4 px-3 py-2 bg-blue-50 rounded-lg">
            <p className="text-xs text-muted-foreground">Panel de</p>
            <p className="font-medium text-primary">Proveedor</p>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => navigate('/dashboard-provider')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-primary font-medium"
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
            <span className="ml-auto bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
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

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        <header className="bg-white border-b border-border px-4 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="ml-12 lg:ml-0">
              <h1>Panel de control</h1>
              <p className="text-sm text-muted-foreground">
                Jueves, 15 de Mayo de 2026
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                JP
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div
                    className={`w-12 h-12 rounded-lg ${stat.bg} flex items-center justify-center`}
                  >
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>

                <div className="text-3xl font-semibold mb-1">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>

          {/* Pending Requests */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3>Solicitudes pendientes</h3>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/provider/requests')}
              >
                Ver todas
              </Button>
            </div>

            <Card>
              <div className="divide-y divide-border">
                {pendingRequests.map((req) => (
                  <div
                    key={req.id}
                    className="p-6 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="mb-1">{req.client}</h4>
                        <p className="text-sm text-muted-foreground">
                          {req.service}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          📍 {req.location}
                        </p>
                      </div>

                      <span className="text-xs text-muted-foreground">
                        {req.time}
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => navigate(`/provider/requests/${req.id}`)}
                      >
                        Aceptar
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/provider/requests/${req.id}`)}
                      >
                        Declinar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Active Jobs */}
          <div className="mb-8">
            <h3 className="mb-4">Trabajos activos</h3>

            <div className="grid md:grid-cols-2 gap-6">
              {activeJobs.map((job) => (
                <Card key={job.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="mb-1">{job.client}</h4>
                      <p className="text-sm text-muted-foreground">
                        {job.service}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.status === 'En progreso'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="w-4 h-4" />
                    {job.date}
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/provider/active-services')}
                  >
                    Ver detalles
                  </Button>
                </Card>
              ))}
            </div>
          </div>

          {/* Monthly Performance */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>

              <div className="flex-1">
                <h4 className="mb-2">Rendimiento de Mayo</h4>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Trabajos completados
                    </p>
                    <p className="text-2xl font-semibold">12</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Calificación promedio
                    </p>
                    <p className="text-2xl font-semibold">4.9 ⭐</p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Ingresos</p>
                    <p className="text-2xl font-semibold text-green-600">
                      $8,400
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};