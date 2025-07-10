"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, RefreshCw, Settings } from "lucide-react";

interface AIErrorHandlerProps {
  error: Error | string;
  onRetry?: () => void;
  onDismiss?: () => void;
  showSettings?: boolean;
}

export function AIErrorHandler({ 
  error, 
  onRetry, 
  onDismiss, 
  showSettings = true 
}: AIErrorHandlerProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (onRetry) {
      setIsRetrying(true);
      try {
        await onRetry();
      } finally {
        setIsRetrying(false);
      }
    }
  };

  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error de IA</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-3">{errorMessage}</p>
        <div className="flex flex-wrap gap-2">
          {onRetry && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRetry}
              disabled={isRetrying}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isRetrying ? 'animate-spin' : ''}`} />
              {isRetrying ? 'Reintentando...' : 'Reintentar'}
            </Button>
          )}
          {showSettings && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                // Aquí podrías abrir un modal de configuración
                console.log("Open AI settings");
              }}
            >
              <Settings className="w-4 h-4 mr-2" />
              Configuración
            </Button>
          )}
          {onDismiss && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDismiss}
            >
              Cerrar
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}

export function AIErrorToast({ error }: { error: Error | string }) {
  const errorMessage = typeof error === 'string' ? error : error.message;
  
  return (
    <div className="flex items-center space-x-2">
      <AlertCircle className="h-4 w-4 text-red-500" />
      <span className="text-sm">
        {errorMessage.includes("API key") 
          ? "Error de configuración de IA" 
          : "Error de IA temporal"
        }
      </span>
    </div>
  );
} 