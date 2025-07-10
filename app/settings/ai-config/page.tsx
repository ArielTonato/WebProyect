import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  BrainCircuit, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Settings,
  RefreshCw,
  Key,
  Info
} from "lucide-react";
import { checkOpenAIConfig } from "@/lib/openai-config";

export default function AIConfigPage() {
  // En un entorno real, esto debería ser una función del servidor
  const config = checkOpenAIConfig();

  const getStatusIcon = () => {
    if (!config.isConfigured) {
      return <XCircle className="w-6 h-6 text-red-500" />;
    }
    if (!config.isValidFormat) {
      return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    }
    return <CheckCircle className="w-6 h-6 text-green-500" />;
  };

  const getStatusText = () => {
    if (!config.isConfigured) {
      return "No Configurado";
    }
    if (!config.isValidFormat) {
      return "Formato Inválido";
    }
    return "Configurado Correctamente";
  };

  const getStatusColor = () => {
    if (!config.isConfigured) {
      return "bg-red-100 text-red-800";
    }
    if (!config.isValidFormat) {
      return "bg-yellow-100 text-yellow-800";
    }
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center space-x-2 mb-8">
          <BrainCircuit className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold">Configuración de IA</h1>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Key className="w-5 h-5" />
              Estado de OpenAI
            </CardTitle>
            <CardDescription>
              Verifica la configuración de tu clave de API de OpenAI
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon()}
                <div>
                  <p className="font-medium">Estado de la API</p>
                  <p className="text-sm text-muted-foreground">
                    {config.error || "Configuración verificada"}
                  </p>
                </div>
              </div>
              <Badge className={getStatusColor()}>
                {getStatusText()}
              </Badge>
            </div>

            {config.error && (
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error de Configuración</AlertTitle>
                <AlertDescription>
                  {config.error}
                </AlertDescription>
              </Alert>
            )}

            {config.isConfigured && config.isValidFormat && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Configuración Correcta</AlertTitle>
                <AlertDescription>
                  Tu clave de API de OpenAI está configurada correctamente y las funciones de IA están disponibles.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Info className="w-5 h-5" />
              Información de Configuración
            </CardTitle>
            <CardDescription>
              Cómo configurar OpenAI para TodoME
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-primary">1</span>
                </div>
                <div>
                  <p className="font-medium">Obtén una clave de API</p>
                  <p className="text-sm text-muted-foreground">
                    Ve a <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">OpenAI Platform</a> y crea una nueva clave de API.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-primary">2</span>
                </div>
                <div>
                  <p className="font-medium">Configura la variable de entorno</p>
                  <p className="text-sm text-muted-foreground">
                    Agrega <code className="bg-muted px-1 rounded">OPEN_AI_KEY=tu_clave_aqui</code> a tu archivo <code className="bg-muted px-1 rounded">.env.local</code>
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-bold text-primary">3</span>
                </div>
                <div>
                  <p className="font-medium">Reinicia el servidor</p>
                  <p className="text-sm text-muted-foreground">
                    Detén y vuelve a iniciar tu servidor de desarrollo para que los cambios surtan efecto.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              Funciones de IA
            </CardTitle>
            <CardDescription>
              Funciones disponibles cuando OpenAI está configurado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Sugerencias inteligentes de tareas</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Búsqueda semántica</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Interpretación de lenguaje natural</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm">Generación de embeddings</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 