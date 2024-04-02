
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import NextAuth from "next-auth/next";

import { BACKEND_URL } from "@/lib/Constants";
import { JWT } from "next-auth/jwt";

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(BACKEND_URL + "/auth/refresh", {
    method: "POST",
    headers: {
      authorization: `Refresh ${token.backendTokens.refreshToken}`,
    },
  });

  const response = await res.json();

  return {
    ...token,
    backendTokens: response,
  };
}

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          firstName : profile.given_name,
          lastName : profile.family_name,
          email: profile.email,
          image: profile.picture,
          phone : profile.phone ?? '',
        };
      },
      idToken: true,

      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Your username",
          type: "username",
          placeholder: "Your username",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        // if (!credentials?.password) throw new Error("Please Provide Your Password");

        const res = await fetch( BACKEND_URL + "/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            email : credentials?.username,
            password : credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const user = await res.json()

        if (res.status == 401) {
          throw new Error(user.message);
        }

        console.log(user)
        return user;
      },
    }),
  ],

  callbacks: {

    async signIn({account,profile}){

      console.log('from the sign with google')
      if(!profile?.email){
        await fetch( BACKEND_URL + "/auth/signup", {
          method: "POST",
          body: JSON.stringify({
            email : profile?.email,
            firstName : profile?.name,
            lastName : profile?.name,
          }),
         
        });
        const res = await fetch( BACKEND_URL + "/auth/signin", {
          method: "POST",
          body: JSON.stringify({
            email: profile?.email,
            firstName: profile?.name,
            lastName: profile?.name,
            phone: "", 
            password: "",
            image: profile?.image ?? "",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      
        return true
      },

    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn)
        return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
