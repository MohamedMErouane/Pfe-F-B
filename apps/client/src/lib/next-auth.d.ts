import { Tokens, User } from "./types";

declare module "next-auth" {
  interface Session {
    user: User
    backendTokens : Tokens
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
    backendTokens : Tokens
  }
}

declare module NodeJS {
  interface ProcessEnv {
    SMPT_EMAIL: string;
    SMTP_GMAIL_PASS: string;
  }
}
