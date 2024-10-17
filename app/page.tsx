import { signInAction } from "@/actions/auth-action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BrainCircuit, CheckCircle, Sparkles } from "lucide-react";
import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Head>
        <title>AI-ToDo: Potencia tu Productividad</title>
        <meta name="description" content="Aplicación de lista de tareas impulsada por IA para una productividad mejorada" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="container mx-auto py-4 sm:py-8">
        <nav className="flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <BrainCircuit className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">TodoME</span>
          </div>
          <div className="flex flex-wrap justify-center sm:space-x-4">
            <Button variant="ghost" className="mb-2 sm:mb-0">Características</Button>
            <Button variant="ghost" className="mb-2 sm:mb-0">Precios</Button>
            <Button variant="ghost" className="mb-2 sm:mb-0">Conoce Más</Button>
            <form action={signInAction} className="inline-block">
              <Button>Ingresar</Button>
            </form>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-primary mb-4">
            Potencia tu Productividad con IA
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8">
            Experimenta el futuro de la gestión de tareas con nuestra aplicación de lista de tareas impulsada por IA.
          </p>
          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            Empieza Gratis
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-chart-4" />
                <span>Sugerencias Inteligentes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Nuestra IA analiza tus tareas y proporciona sugerencias inteligentes para optimizar tu flujo de trabajo.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-6 w-6 text-chart-2" />
                <span>Priorización Automatizada</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Deja que la IA priorice tus tareas en función de los plazos, la importancia y tus patrones de trabajo.</p>
            </CardContent>
          </Card>
          <Card className="sm:col-span-2 lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BrainCircuit className="h-6 w-6 text-chart-5" />
                <span>Entrada de Lenguaje Natural</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Añade tareas utilizando lenguaje natural, y nuestra IA las interpretará y categorizará por ti.</p>
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Mantente Actualizado</CardTitle>
            <CardDescription>Suscríbete a nuestro boletín para recibir los últimos consejos de productividad con IA.</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input
                  type="email"
                  placeholder="Introduce tu correo electrónico"
                  required
                  className="flex-grow"
                />
                <Button type="submit" className="w-full sm:w-auto">Suscribirse</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <footer className="container mx-auto py-8 text-center text-muted-foreground">
        <p>&copy; 2023 TodoME. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}