import { Keypair } from "@solana/web3.js";
import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "./db";

export const authOptions: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },

    async session({ session, token }) {
      session.id_token = token.id_token as string;
      return session;
    },
    async signIn({ user, account, profile, email, credentials }: any) {
      if (account?.provider === "google") {
        const email = user.email;
        if (!email) {
          return false;
        }

        const userDb = await db.user.findFirst({
          where: {
            username: email,
          },
        });

        if (userDb) {
          return true;
        }

        const keypair = Keypair.generate();
        const publicKey = keypair.publicKey.toBase58();
        const privateKey = keypair.secretKey;

        await db.user.create({
          data: {
            username: email,
            name: profile?.name,
            userId: "",
            //@ts-ignore
            profilePicture: profile?.picture,
            provider: "Google",
            sub: account.providerAccountId,
            solWallet: {
              create: {
                publicKey: publicKey,
                privateKey: privateKey.toString(),
              },
            },
            inrWallet: {
              create: {
                balance: 0,
              },
            },
          },
        });

        console.log("User created", email);
        return true;
      }

      return false;
    },
  },
};
