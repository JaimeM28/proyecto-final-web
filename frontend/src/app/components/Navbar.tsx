import { Link } from 'react-router';
import { Button } from './Button';
import { Briefcase } from 'lucide-react';

export const Navbar = () => {
  return (
    <nav className="border-b border-border bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-semibold text-foreground">Tu Oficio</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost">Iniciar sesión</Button>
            </Link>
            <Link to="/register">
              <Button>Registrarse</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
