"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { LogoutButton } from "../auth/logout-button";
import { User, Settings, LogOut } from "lucide-react";

export default function UserProfile() {
  const { data: session } = useSession();

  const imageUrl = session?.user?.image;
  const name = session?.user?.name;
  const email = session?.user?.email;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="hover:cursor-pointer">
        <Button
          variant="ghost"
          className="flex items-center justify-start gap-2 w-full h-auto p-2 hover:bg-muted/50"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              width={32}
              height={32}
              alt={`${name || 'Usuario'} profile picture`}
              className="rounded-full"
            />
          ) : (
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
          )}
          <div className="flex flex-col items-start">
            <p className="text-sm font-medium truncate">{name || 'Usuario'}</p>
            <p className="text-xs text-muted-foreground truncate">{email}</p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="w-4 h-4 mr-2" />
          Perfil
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Settings className="w-4 h-4 mr-2" />
          Configuración
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutButton variant="ghost" size="sm" className="w-full justify-start">
            Cerrar Sesión
          </LogoutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}