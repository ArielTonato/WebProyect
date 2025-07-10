// Rutas que requieren autenticación
export const PROTECTED_ROUTES = [
  "/loggedin",
  "/loggedin/today",
  "/loggedin/upcoming",
  "/loggedin/projects",
  "/loggedin/search",
  "/loggedin/labels",
];

// Rutas públicas
export const PUBLIC_ROUTES = [
  "/",
  "/not-authorized",
  "/api/auth/signin",
  "/api/auth/signout",
  "/api/auth/callback",
];

// Función para verificar si una ruta está protegida
export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTES.some(route => pathname.startsWith(route));
}

// Función para verificar si una ruta es pública
export function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.some(route => pathname.startsWith(route));
}

// Función para obtener la URL de redirección después del login
export function getRedirectUrl(pathname: string): string {
  // Si el usuario intentaba acceder a una ruta protegida, redirigir ahí después del login
  if (isProtectedRoute(pathname)) {
    return pathname;
  }
  
  // Por defecto, redirigir al dashboard
  return "/loggedin";
} 