// Adicione em types/next-auth.d.ts:
import "next-auth";

declare module "next-auth" {
  interface User {
    isAdmin?: boolean;
  }

  interface Session {
    user?: {
      isAdmin?: boolean;
    } & DefaultSession["user"];
  }
}