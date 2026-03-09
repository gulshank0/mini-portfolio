import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to track HTTP request metrics.
 *
 * Note: Next.js Edge middleware runs in the Edge Runtime where
 * prom-client isn't available. We record timing via headers and
 * let the metrics API route collect them. For full server-side
 * metric recording we use the API route + instrumentation approach.
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Attach timing header for observability
  response.headers.set("X-Request-Start", Date.now().toString());
  response.headers.set("Server-Timing", `middleware;dur=0`);

  return response;
}

export const config = {
  // Match all routes except static files, _next internals, and the metrics endpoint itself
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|api/metrics).*)",
  ],
};
