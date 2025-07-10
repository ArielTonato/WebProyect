import { redirect } from "next/navigation";
import { Providers } from "../providers";
import { auth } from "@/auth";
import { AuthGuard } from "@/components/auth/auth-guard";

export default async function LoggedInLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const session = await auth();
    
    // Redirigir a la página principal si no hay sesión
    if (!session) {
      redirect("/");
    }

    return (
      <Providers session={session}>
        <AuthGuard>
          {children}
        </AuthGuard>
      </Providers>
    );
  }