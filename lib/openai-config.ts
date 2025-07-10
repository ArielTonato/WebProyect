// Configuración y verificación de OpenAI

export interface OpenAIConfig {
  apiKey: string | undefined;
  isConfigured: boolean;
  isValidFormat: boolean;
  error?: string;
}

export function checkOpenAIConfig(): OpenAIConfig {
  const apiKey = process.env.OPEN_AI_KEY;
  
  if (!apiKey) {
    return {
      apiKey: undefined,
      isConfigured: false,
      isValidFormat: false,
      error: "OpenAI API key is not configured"
    };
  }

  if (!apiKey.startsWith('sk-')) {
    return {
      apiKey,
      isConfigured: true,
      isValidFormat: false,
      error: "Invalid OpenAI API key format. API keys should start with 'sk-'"
    };
  }

  return {
    apiKey,
    isConfigured: true,
    isValidFormat: true
  };
}

export function getOpenAIErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    const message = error.message;
    
    // Mensajes de error específicos de OpenAI
    if (message.includes("invalid_api_key")) {
      return "La clave de API de OpenAI no es válida. Por favor, verifica tu configuración.";
    }
    
    if (message.includes("rate_limit")) {
      return "Se ha excedido el límite de uso de OpenAI. Por favor, intenta más tarde.";
    }
    
    if (message.includes("quota_exceeded")) {
      return "Se ha agotado tu cuota de OpenAI. Por favor, actualiza tu plan.";
    }
    
    if (message.includes("model_not_found")) {
      return "El modelo de IA no está disponible. Por favor, contacta al soporte.";
    }
    
    return message;
  }

  return "Error desconocido con la API de OpenAI";
}

export function isOpenAIError(error: any): boolean {
  if (typeof error === 'string') {
    return error.toLowerCase().includes('openai') || 
           error.toLowerCase().includes('api key') ||
           error.toLowerCase().includes('sk-');
  }

  if (error instanceof Error) {
    return error.message.toLowerCase().includes('openai') ||
           error.message.toLowerCase().includes('api key') ||
           error.message.toLowerCase().includes('sk-');
  }

  return false;
} 