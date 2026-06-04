export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/leads/:path*",
    "/analytics/:path*",
    "/site-visits/:path*",
    "/settings/:path*",
  ],
};