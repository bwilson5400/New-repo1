import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { z } from "zod";

const schema = z.object({ email: z.string().email(), password: z.string().min(8) });

export const { auth, handlers: { GET, POST } } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: { email: { label: "Email", type: "email" }, password: { label: "Password", type: "password" } },
      async authorize(creds) {
        const parsed = schema.safeParse(creds);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return null;
        return { id: String(user.id), email: user.email, name: user.name, role: user.role };
      }
    })
  ],
  pages: { signIn: "/sign-in" },
  callbacks: {
    async jwt({ token, user }) { if (user) token.role = (user as any).role || "client"; return token; },
    async session({ session, token }) { (session as any).role = (token as any).role || "client"; return session; }
  }
});
