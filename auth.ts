import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials: { email: string; password: string }) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = { id: 1, name: "John Doe", email: credentials.email };
        return user;
      },
    }),
  ],
});
