import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isProtectedRoute } from "@/lib/auth-config";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Proteger rutas que requieren autenticación
  if (isProtectedRoute(pathname)) {
    if (!isLoggedIn) {
      // Redirigir a la página de error de autorización
      return NextResponse.redirect(new URL("/not-authorized", req.nextUrl));
    }
  }

  // Permitir acceso a todas las demás rutas
  return NextResponse.next();
});

// Configurar las rutas que queremos proteger
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};