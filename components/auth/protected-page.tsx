"use client";

import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

interface ProtectedPageProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ProtectedPage({ children, fallback }: ProtectedPageProps) {
  const { isAuthenticated, isLoading } = useAuth(true);

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Verificando autenticación...</p>
        </div>
      </div>
    );
  }

  // Si no está autenticado, mostrar fallback o null
  if (!isAuthenticated) {
    return fallback || null;
  }

  // Si está autenticado, renderizar los children
  return <>{children}</>;
} 