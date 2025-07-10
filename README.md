# TodoME - Gestión de Tareas Impulsada por IA

<div align="center">

![TodoME Logo](https://img.shields.io/badge/TodoME-AI%20Powered%20Todo-blue?style=for-the-badge&logo=react)

**Potencia tu productividad con inteligencia artificial**

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Convex](https://img.shields.io/badge/Convex-Database-orange?style=flat-square)](https://convex.dev/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4-green?style=flat-square)](https://openai.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

</div>

## 🚀 Descripción

TodoME es una aplicación web moderna de gestión de tareas que combina funcionalidades tradicionales con capacidades avanzadas de inteligencia artificial. Diseñada para optimizar tu productividad personal y profesional.

### ✨ Características Principales

- 🤖 **Sugerencias Inteligentes**: IA analiza tus proyectos y sugiere tareas faltantes
- 🔍 **Búsqueda Semántica**: Encuentra tareas usando lenguaje natural
- 📅 **Gestión Temporal**: Organiza tareas por hoy, próximas y completadas
- 🏷️ **Categorización Avanzada**: Proyectos y etiquetas para organización flexible
- 📱 **Diseño Responsivo**: Experiencia optimizada en todos los dispositivos
- ⚡ **Tiempo Real**: Actualizaciones instantáneas sin recargar la página

## 📸 Capturas de Pantalla

<div align="center">

### Landing Page - Interfaz Principal
![TodoME Landing Page](https://res.cloudinary.com/aridev21/image/upload/v1752115035/p2_g9t2bd.png)

### Dashboard - Gestión de Tareas
![TodoME Dashboard](https://res.cloudinary.com/aridev21/image/upload/v1752115031/p2.1_g2ee9m.png)

</div>

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático para mayor seguridad
- **Tailwind CSS** - Framework CSS utility-first
- **Radix UI** - Componentes de interfaz accesibles
- **React Hook Form** - Gestión de formularios
- **Zod** - Validación de esquemas

### Backend & Base de Datos
- **Convex** - Base de datos serverless con sincronización en tiempo real
- **NextAuth.js** - Autenticación con Google OAuth
- **OpenAI API** - Integración con GPT-4 y embeddings

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **PostCSS** - Procesamiento de CSS
- **Lucide React** - Iconografía moderna

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun
- Cuenta de Google para OAuth
- Cuenta de OpenAI para funcionalidades de IA
- Cuenta de Convex para la base de datos

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/todome.git
cd todome
```

### 2. Instalar Dependencias
```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Configurar Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```env
# Convex
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_AUTH_PRIVATE_KEY=your_convex_auth_private_key
JWKS=your_jwks_url

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# OpenAI
OPEN_AI_KEY=your_openai_api_key

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

### 4. Configurar Convex
```bash
# Inicializar Convex (si es necesario)
npx convex dev
```

### 5. Ejecutar el Proyecto
```bash
# Terminal 1: Servidor de desarrollo Next.js
npm run dev

# Terminal 2: Servidor de desarrollo Convex
npm run back
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🏗️ Estructura del Proyecto

```
todome/
├── app/                    # App Router de Next.js
│   ├── api/               # API routes
│   ├── loggedin/          # Rutas protegidas
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes React
│   ├── add-task/         # Componentes de agregar tareas
│   ├── nav/              # Navegación
│   ├── todos/            # Componentes de tareas
│   └── ui/               # Componentes de UI base
├── convex/               # Backend Convex
│   ├── auth.ts           # Autenticación
│   ├── schema.ts         # Esquema de base de datos
│   ├── todos.ts          # Lógica de tareas
│   ├── projects.ts       # Lógica de proyectos
│   ├── labels.ts         # Lógica de etiquetas
│   ├── openai.ts         # Integración con OpenAI
│   └── search.ts         # Búsqueda semántica
├── hooks/                # Custom hooks
├── lib/                  # Utilidades
└── utils/                # Funciones auxiliares
```

## 🎯 Funcionalidades

### Gestión de Tareas
- ✅ Crear, editar y eliminar tareas
- 📅 Fechas límite con recordatorios
- 🎯 Sistema de prioridades (1-3)
- 📝 Descripciones detalladas
- 🔄 Subtareas anidadas

### Organización Inteligente
- 📁 **Proyectos**: Agrupa tareas relacionadas
- 🏷️ **Etiquetas**: Categorización flexible
- 📅 **Vistas Temporales**: Hoy, Próximas, Completadas
- 🔍 **Búsqueda Avanzada**: Por texto y semántica

### Funcionalidades de IA
- 🤖 **Sugerencias Automáticas**: IA identifica tareas faltantes
- 🔍 **Búsqueda Semántica**: Encuentra tareas por significado
- 📝 **Entrada Natural**: Describe tareas en lenguaje natural
- 🎯 **Priorización Inteligente**: Sugerencias de prioridad

## 🔐 Autenticación

El proyecto utiliza **NextAuth.js** con **Google OAuth**:

1. Configura una aplicación en [Google Cloud Console](https://console.cloud.google.com/)
2. Obtén las credenciales OAuth
3. Configura las variables de entorno correspondientes
4. Los usuarios pueden iniciar sesión con sus cuentas de Google

## 🤖 Integración con IA

### OpenAI GPT-4
- **Sugerencias de Tareas**: Analiza proyectos existentes para sugerir tareas faltantes
- **Sugerencias de Subtareas**: Identifica subtareas necesarias para tareas complejas
- **Análisis de Contexto**: Comprende el contexto del proyecto para generar sugerencias relevantes

### Embeddings Vectoriales
- **Búsqueda Semántica**: Vectorización de texto para búsqueda por significado
- **Similitud de Tareas**: Encuentra tareas relacionadas automáticamente
- **Indexación Inteligente**: Optimización para búsquedas rápidas

## 📱 Interfaz de Usuario

### Diseño Responsivo
- **Desktop**: Sidebar de navegación completa
- **Mobile**: Navegación adaptativa con menú hamburguesa
- **Tablet**: Diseño híbrido optimizado

### Componentes UI
- **Radix UI**: Componentes accesibles y personalizables
- **Tailwind CSS**: Estilos consistentes y responsive
- **Lucide Icons**: Iconografía moderna y coherente

## 🚀 Despliegue

### Vercel (Recomendado)
```bash
npm run build
```

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en CONVEX
3. Configura las variables de entorno de VERCEL
4. Despliega automáticamente

### Otros Proveedores
- **Netlify**: Compatible con Next.js
- **Railway**: Soporte para Convex
- **Heroku**: Configuración manual requerida

## 🧪 Desarrollo

### Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting de código
npm run back         # Servidor de desarrollo Convex
```

### Convenciones de Código
- **TypeScript**: Tipado estricto en todo el proyecto
- **ESLint**: Reglas de linting configuradas
- **Prettier**: Formateo automático de código
- **Conventional Commits**: Estándar de commits

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

### Guías de Contribución
- Sigue las convenciones de código existentes
- Añade tests para nuevas funcionalidades
- Documenta cambios importantes
- Mantén la compatibilidad con TypeScript

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Convex** por la excelente plataforma de base de datos
- **Next.js** por el framework React increíble
- **OpenAI** por las capacidades de IA
- **Radix UI** por los componentes accesibles
- **Tailwind CSS** por el framework de estilos

## 📞 Soporte

- 📧 Email: soporte@todome.com
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/todome/issues)
- 📖 Documentación: [Wiki del Proyecto](https://github.com/tu-usuario/todome/wiki)

---

<div align="center">

**Hecho con ❤️ y IA**

[![GitHub stars](https://img.shields.io/github/stars/tu-usuario/todome?style=social)](https://github.com/tu-usuario/todome)
[![GitHub forks](https://img.shields.io/github/forks/tu-usuario/todome?style=social)](https://github.com/tu-usuario/todome)

</div>
