import { signInAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedGradient, FloatingGradient } from "@/components/ui/animated-gradient";
import { 
  BrainCircuit, 
  CheckCircle, 
  Sparkles, 
  Zap, 
  Search, 
  Calendar, 
  Users, 
  ArrowRight, 
  Star,
  Play,
  Shield,
  Clock,
  Target,
  BarChart3,
  MessageSquare,
  Globe
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <BrainCircuit className="h-8 w-8 text-primary" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-primary rounded-full animate-pulse"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                TodoME
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Características
              </a>
              <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Precios
              </a>
              <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                Acerca de
              </a>
              <form action={signInAction} className="inline-block">
                <Button size="sm" className="bg-primary hover:bg-primary/90">
                  Comenzar Gratis
                </Button>
              </form>
            </div>
            <div className="md:hidden">
              <form action={signInAction} className="inline-block">
                <Button size="sm">Ingresar</Button>
              </form>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <FloatingGradient />
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 animate-fade-in">
              <Sparkles className="w-3 h-3 mr-1" />
              Impulsado por IA
            </Badge>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up">
              Organiza tu vida con
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Inteligencia Artificial
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
              TodoME combina la simplicidad de una lista de tareas tradicional con el poder de la IA para 
              ayudarte a ser más productivo, organizado y eficiente en todo lo que hagas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up delay-300">
              <form action={signInAction} className="inline-block">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
                  Comenzar Gratis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg transition-all duration-300 hover:scale-105">
                <Play className="mr-2 h-5 w-5" />
                Ver Demo
              </Button>
            </div>
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground animate-fade-in-up delay-400">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                Sin tarjeta de crédito
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1 text-blue-500" />
                Configuración en 2 minutos
              </div>
              <div className="flex items-center">
                <Shield className="w-4 h-4 mr-1 text-purple-500" />
                100% seguro
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Características que te harán más productivo
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre cómo la IA puede transformar tu forma de trabajar y organizar tu vida diaria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:scale-110">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Sugerencias Inteligentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Nuestra IA analiza tus patrones de trabajo y sugiere tareas que podrías haber olvidado, 
                  optimizando tu flujo de trabajo diario.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors group-hover:scale-110">
                  <Target className="h-6 w-6 text-green-500" />
                </div>
                <CardTitle className="text-xl">Priorización Automatizada</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  La IA prioriza automáticamente tus tareas basándose en fechas límite, importancia 
                  y tus hábitos de productividad.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors group-hover:scale-110">
                  <MessageSquare className="h-6 w-6 text-blue-500" />
                </div>
                <CardTitle className="text-xl">Lenguaje Natural</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Escribe tareas en lenguaje natural como "Reunión con el equipo mañana a las 10" 
                  y la IA las interpretará automáticamente.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors group-hover:scale-110">
                  <Search className="h-6 w-6 text-purple-500" />
                </div>
                <CardTitle className="text-xl">Búsqueda Semántica</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Encuentra tareas usando términos relacionados, no solo palabras exactas. 
                  La IA entiende el contexto de tus búsquedas.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500/20 transition-colors group-hover:scale-110">
                  <Calendar className="h-6 w-6 text-orange-500" />
                </div>
                <CardTitle className="text-xl">Vistas Inteligentes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Organiza tus tareas por hoy, próximas, proyectos o etiquetas. 
                  Cada vista se adapta a tu forma de trabajar.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-background/50 backdrop-blur hover-lift">
              <CardHeader>
                <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors group-hover:scale-110">
                  <BarChart3 className="h-6 w-6 text-red-500" />
                </div>
                <CardTitle className="text-xl">Análisis de Productividad</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Obtén insights sobre tus patrones de productividad y recibe recomendaciones 
                  para mejorar tu eficiencia.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Zap className="w-3 h-3 mr-1" />
                Demo Interactivo
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Ve cómo funciona TodoME
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Descubre la interfaz intuitiva y las funcionalidades avanzadas que hacen de TodoME 
                la herramienta perfecta para organizar tu vida.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Interfaz Limpia y Moderna</h4>
                    <p className="text-muted-foreground">Diseño minimalista que se enfoca en lo importante</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Sincronización en Tiempo Real</h4>
                    <p className="text-muted-foreground">Cambios instantáneos en todos tus dispositivos</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Accesible desde Cualquier Lugar</h4>
                    <p className="text-muted-foreground">Web, móvil y desktop sincronizados</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 backdrop-blur">
                <div className="bg-background rounded-xl p-6 shadow-lg border">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <BrainCircuit className="h-6 w-6 text-primary" />
                      <span className="font-semibold">TodoME</span>
                    </div>
                    <Badge variant="outline">Demo</Badge>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Completar presentación del proyecto</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-sm">Reunión con el equipo a las 15:00</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-5 h-5 border-2 border-muted-foreground rounded-full"></div>
                      <span className="text-sm">Revisar propuesta de cliente</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <div className="w-5 h-5 border-2 border-muted-foreground rounded-full"></div>
                      <span className="text-sm">Preparar informe mensual</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-lg text-muted-foreground">
              Descubre cómo TodoME está transformando la productividad de miles de personas
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-background/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "TodoME ha revolucionado mi forma de trabajar. Las sugerencias de IA me han ayudado 
                  a no olvidar tareas importantes y ser más productivo."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Carlos M.</p>
                    <p className="text-sm text-muted-foreground">Desarrollador Senior</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-background/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "La búsqueda semántica es increíble. Puedo encontrar tareas usando términos relacionados 
                  sin recordar las palabras exactas que usé."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-500/10 rounded-full flex items-center justify-center mr-3">
                    <Target className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-semibold">Ana L.</p>
                    <p className="text-sm text-muted-foreground">Project Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-background/50 backdrop-blur">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  "La interfaz es tan intuitiva que mi equipo se adaptó en minutos. 
                  Las vistas por proyecto nos han ayudado a organizar mejor el trabajo."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center mr-3">
                    <Globe className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="font-semibold">Miguel R.</p>
                    <p className="text-sm text-muted-foreground">CEO Startup</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              ¿Listo para transformar tu productividad?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Únete a miles de personas que ya están organizando su vida con la ayuda de la IA. 
              Comienza gratis y sin compromisos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <form action={signInAction} className="inline-block">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg">
                  Comenzar Gratis Ahora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                Ver Más Características
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              No se requiere tarjeta de crédito • Configuración en 2 minutos • 100% gratuito
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <BrainCircuit className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">TodoME</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Potencia tu productividad con inteligencia artificial.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Producto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Características</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Precios</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Integraciones</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Soporte</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Centro de Ayuda</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contacto</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Estado del Servicio</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Comunidad</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Acerca de</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Carreras</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Privacidad</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 TodoME. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}