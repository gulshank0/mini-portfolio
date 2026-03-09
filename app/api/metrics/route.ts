import { NextResponse } from "next/server";
import { register } from "@/lib/metrics";

/**
 * GET /api/metrics
 *
 * Prometheus-compatible metrics endpoint.
 * Prometheus scrapes this endpoint at a configured interval
 * to collect application metrics.
 *
 * Content-Type is set to the OpenMetrics format that Prometheus expects.
 */
export async function GET() {
  try {
    const metrics = await register.metrics();

    return new NextResponse(metrics, {
      status: 200,
      headers: {
        "Content-Type": register.contentType,
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("[Metrics] Error collecting metrics:", error);
    return NextResponse.json(
      { error: "Failed to collect metrics" },
      { status: 500 }
    );
  }
}

/**
 * Disable static optimization for this route.
 * Metrics must always be computed dynamically.
 */
export const dynamic = "force-dynamic";
