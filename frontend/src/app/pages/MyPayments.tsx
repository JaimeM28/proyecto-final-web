import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/Button';
import { PaymentCard } from '../components/PaymentCard';
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
  CreditCard,
} from 'lucide-react';

export const MyPayments = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const mockPayments = [
    {
      id: '1',
      amount: 700,
      status: 'APPROVED' as const,
      date: '20 May 2026',
      serviceName: 'Reparación de fuga en cocina',
      paymentMethod: 'Mercado Pago - Tarjeta de crédito',
      transactionId: 'MP-123456789',
    },
    {
      id: '2',
      amount: 2400,
      status: 'APPROVED' as const,
      date: '15 May 2026',
      serviceName: 'Pintura de sala',
      paymentMethod: 'Mercado Pago - Tarjeta de débito',
      transactionId: 'MP-987654321',
    },
    {
      id: '3',
      amount: 1600,
      status: 'PENDING' as const,
      date: '22 May 2026',
      serviceName: 'Instalación eléctrica',
      paymentMethod: 'Mercado Pago',
      transactionId: 'MP-555666777',
    },
  ];

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
          <button
            onClick={() => navigate('/my-requests')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted text-foreground"
          >
            <Clock className="w-5 h-5" />
            Mis solicitudes
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-primary font-medium">
            <CreditCard className="w-5 h-5" />
            Mis pagos
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
            <h1 className="ml-12 lg:ml-0">Historial de pagos</h1>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-medium">
                JD
              </div>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          {mockPayments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPayments.map((payment) => (
                <PaymentCard key={payment.id} {...payment} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No hay pagos registrados"
              description="Aquí verás el historial de todos tus pagos realizados"
              icon={<CreditCard className="w-8 h-8 text-muted-foreground" />}
            />
          )}
        </main>
      </div>
    </div>
  );
};
