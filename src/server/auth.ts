import type { GetServerSidePropsContext } from "next";
import {
    getServerSession,
    type NextAuthOptions,
    type DefaultSession,
} from "next-auth";
// import EmailProvider from "next-auth/providers/email";
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}
export const authOptions: NextAuthOptions = {
    callbacks: {
        signIn({ account, profile }): boolean {
            if (account?.provider === "google") {
                return profile?.email?.endsWith("@genflix.co.id") || false;
            }
            return true
        },
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_SECRET || '',
        }),
    ],
};

export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
}) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
};
