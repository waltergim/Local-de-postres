import { NextResponse, type NextRequest } from "next/server";

/**
 * Chequeo optimista de sesión para /admin.
 * Si no hay cookie de sesión, redirige a /login antes de renderizar.
 * La verificación real del token se hace igual en el layout (lib/dal.ts).
 */
export function proxy(request: NextRequest) {
  if (!request.cookies.has("admin_session")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
