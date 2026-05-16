import { Link } from 'react-router';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Wrench, Zap, Search, Shield, Clock, Star, ChevronRight, Briefcase } from 'lucide-react';

export const Landing = () => {
  const categories = [
    { icon: Wrench, name: 'Plomería', count: '120+ profesionales' },
    { icon: Zap, name: 'Electricidad', count: '95+ profesionales' },
    { icon: '🎨', name: 'Pintura', count: '80+ profesionales' },
    { icon: '🔧', name: 'Carpintería', count: '65+ profesionales' },
    { icon: '❄️', name: 'Refrigeración', count: '45+ profesionales' },
    { icon: '🏠', name: 'Construcción', count: '110+ profesionales' },
  ];

  const features = [
    {
      icon: Search,
      title: '1. Busca el servicio',
      description: 'Explora nuestra red de profesionales verificados por categoría o ubicación',
    },
    {
      icon: Shield,
      title: '2. Elige con confianza',
      description: 'Revisa perfiles, calificaciones y reseñas de otros clientes',
    },
    {
      icon: Clock,
      title: '3. Agenda tu cita',
      description: 'Contacta directamente y coordina el servicio que necesitas',
    },
  ];

  const testimonials = [
    { name: 'María González', rating: 5, comment: 'Encontré un plomero excelente en minutos. Muy profesional.' },
    { name: 'Carlos Ruiz', rating: 5, comment: 'La plataforma es muy fácil de usar. Totalmente recomendada.' },
    { name: 'Ana López', rating: 5, comment: 'Profesionales verificados y de calidad. ¡Perfecta!' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 text-foreground max-w-4xl mx-auto">
            Encuentra profesionales confiables para cualquier trabajo del hogar o negocio
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Conectamos clientes con los mejores profesionales verificados en tu zona. Rápido, seguro y confiable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Comenzar ahora
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/register?type=provider">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Soy profesional
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div>
              <div className="text-3xl font-semibold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Profesionales</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-primary">10k+</div>
              <div className="text-sm text-muted-foreground">Trabajos completados</div>
            </div>
            <div>
              <div className="text-3xl font-semibold text-primary">4.8</div>
              <div className="text-sm text-muted-foreground">Calificación promedio</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12 text-foreground">Cómo funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <Card key={idx} className="p-8 text-center hover:shadow-lg transition-shadow">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12 text-foreground">Categorías populares</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, idx) => (
              <Card key={idx} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl">
                    {typeof category.icon === 'string' ? category.icon : <category.icon className="w-6 h-6 text-primary" />}
                  </div>
                  <div>
                    <h4>{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.count}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl text-center mb-12 text-foreground">Lo que dicen nuestros usuarios</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.comment}"</p>
                <p className="font-medium">{testimonial.name}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">Tu Oficio</span>
            </div>
            <p className="text-gray-400 text-sm">Conectando profesionales con clientes desde 2024</p>
          </div>
          <div>
            <h4 className="mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Cómo funciona</a></li>
              <li><a href="#" className="hover:text-white">Categorías</a></li>
              <li><a href="#" className="hover:text-white">Precios</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-white">Términos de uso</a></li>
              <li><a href="#" className="hover:text-white">Privacidad</a></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white">Sobre nosotros</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          © 2026 Tu Oficio. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
};
