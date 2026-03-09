import { NextResponse } from "next/server";
import {
  httpRequestsTotal,
  httpRequestDuration,
  pageViewsTotal,
  apiErrorsTotal,
} from "@/lib/metrics";

/**
 * POST /api/track
 *
 * Lightweight tracking endpoint. The middleware and client-side
 * code can POST here to record page views and request metrics.
 * This runs in the Node.js runtime where prom-client is available.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, page, method, route, statusCode, duration, errorType } = body;

    switch (type) {
      case "pageview":
        if (page) pageViewsTotal.inc({ page });
        break;

      case "request":
        if (method && route) {
          httpRequestsTotal.inc({
            method,
            route,
            status_code: String(statusCode || 200),
          });
          if (duration) {
            httpRequestDuration.observe(
              { method, route, status_code: String(statusCode || 200) },
              duration / 1000 // convert ms to seconds
            );
          }
        }
        break;

      case "error":
        if (method && route) {
          apiErrorsTotal.inc({
            method,
            route,
            error_type: errorType || "unknown",
          });
        }
        break;

      default:
        return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
}

export const dynamic = "force-dynamic";
