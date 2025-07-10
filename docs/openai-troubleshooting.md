# Solución de Problemas - OpenAI API

## Error: "Incorrect API key provided"

Este error indica que la clave de API de OpenAI no es válida o no está configurada correctamente.

### 🔍 **Diagnóstico del Problema**

El error específico:
```
OpenAI Error, {
    "error": {
        "message": "Incorrect API key provided: sk-proj-********************************************************************************************************************************************************X-wA. You can find your API key at https://platform.openai.com/account/api-keys.",
        "type": "invalid_request_error",
        "param": null,
        "code": "invalid_api_key"
    }
}
```

### 🛠️ **Soluciones**

#### **1. Verificar la Variable de Entorno**

Asegúrate de que la variable `OPEN_AI_KEY` esté configurada correctamente en tu archivo `.env.local`:

```env
# .env.local
OPEN_AI_KEY=sk-tu_clave_real_aqui
```

#### **2. Obtener una Nueva Clave de API**

1. Ve a [OpenAI Platform](https://platform.openai.com/api-keys)
2. Inicia sesión en tu cuenta
3. Haz clic en "Create new secret key"
4. Copia la nueva clave (empieza con `sk-`)
5. Agrega la clave a tu archivo `.env.local`

#### **3. Verificar el Formato de la Clave**

- ✅ **Correcto**: `sk-1234567890abcdef...`
- ❌ **Incorrecto**: `sk-proj-...` (claves de proyecto)
- ❌ **Incorrecto**: `pk-...` (claves públicas)

#### **4. Reiniciar el Servidor**

Después de cambiar la variable de entorno:

```bash
# Detener el servidor (Ctrl+C)
# Luego reiniciar
npm run dev
npm run back
```

#### **5. Verificar la Configuración**

Visita `/settings/ai-config` en tu aplicación para verificar el estado de la configuración.

### 🔧 **Verificaciones Adicionales**

#### **Verificar Saldo de la Cuenta**
1. Ve a [OpenAI Billing](https://platform.openai.com/account/billing)
2. Verifica que tengas saldo disponible
3. Si no tienes saldo, agrega fondos a tu cuenta

#### **Verificar Límites de Uso**
1. Ve a [OpenAI Usage](https://platform.openai.com/account/usage)
2. Verifica que no hayas excedido los límites de uso
3. Si es necesario, actualiza tu plan

#### **Verificar Permisos de la Clave**
1. Ve a [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Verifica que la clave tenga los permisos necesarios
3. Si es necesario, crea una nueva clave con permisos completos

### 🚨 **Errores Comunes**

#### **Error 401: Unauthorized**
- La clave de API no es válida
- La clave ha expirado
- La clave no tiene permisos suficientes

#### **Error 429: Rate Limit Exceeded**
- Has excedido el límite de requests por minuto
- Espera unos minutos antes de intentar nuevamente

#### **Error 500: Internal Server Error**
- Error temporal del servidor de OpenAI
- Intenta nuevamente en unos minutos

### 📋 **Lista de Verificación**

- [ ] Variable `OPEN_AI_KEY` configurada en `.env.local`
- [ ] Clave de API válida (empieza con `sk-`)
- [ ] Servidor reiniciado después de cambios
- [ ] Saldo disponible en la cuenta de OpenAI
- [ ] Límites de uso no excedidos
- [ ] Permisos correctos en la clave de API

### 🆘 **Si el Problema Persiste**

1. **Verifica los logs del servidor** para más detalles del error
2. **Prueba la clave de API** directamente en la consola de OpenAI
3. **Crea una nueva clave de API** si la actual no funciona
4. **Contacta al soporte** si el problema persiste

### 📞 **Recursos de Ayuda**

- [OpenAI API Documentation](https://platform.openai.com/docs)
- [OpenAI API Keys](https://platform.openai.com/api-keys)
- [OpenAI Billing](https://platform.openai.com/account/billing)
- [OpenAI Usage](https://platform.openai.com/account/usage)

### 🔄 **Configuración Temporal**

Si necesitas que la aplicación funcione sin IA temporalmente, el sistema devolverá vectores vacíos en lugar de fallar completamente. Esto permite que las funciones básicas sigan funcionando mientras resuelves el problema de OpenAI. 