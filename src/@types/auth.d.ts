// override lib types, in this case User from next-auth
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    avatar_url: string;
  }
}
