import { NextRequest } from "next/server";

export { default } from "next-auth/middleware";

// export function middleware(request : NextRequest) {

// }

export const config = {
  matcher: ["/profile",
    "/chat",
    "/home",
    "/leaderboard",
    "/states",
    "/study",
    "/todo",
  ],
};
