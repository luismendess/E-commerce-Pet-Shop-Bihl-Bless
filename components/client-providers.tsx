// app/components/client-providers.tsx
"use client";

import { CartProvider } from "@/contexts/cart-context";
import { SessionProvider } from "next-auth/react";
import { UserProvider } from "@/contexts/user-context"; // Importando o UserProvider

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <UserProvider>
        {" "}
        {/* Envolvendo tudo com UserProvider */}
        <CartProvider>{children}</CartProvider>
      </UserProvider>
    </SessionProvider>
  );
}
