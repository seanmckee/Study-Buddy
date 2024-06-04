import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

// import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
// import { NextResponse } from "next/server";

// export async function middleware(req: any) {
//   const res = NextResponse.next();
//   const supabase = createMiddlewareClient({ req, res });
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   if (user && req.pathname === "/") {
//     return NextResponse.redirect(new URL("/dashboard", req.url));
//   }

//   if (!user && req.nextUrl.pathname !== "/") {
//     return NextResponse.redirect(new URL("/", req.url));
//   }

//   return res;
// }

// export const config = {
//   matcher: ["/dashboard", "/"]
// }
