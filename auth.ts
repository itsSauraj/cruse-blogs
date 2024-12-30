import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user: User = {
          id: "089a7dslkj12j3asdluwqienasdoiqw123",
          name: "John Doe",
          email: credentials.email as string,
        };

        return user as User;
      },
    }),
  ],
});
