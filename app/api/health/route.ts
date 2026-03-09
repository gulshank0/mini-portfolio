import { NextResponse } from "next/server";

/**
 * GET /api/health
 *
 * Health check endpoint for Docker, Kubernetes, and monitoring tools.
 */
export async function GET() {
  return NextResponse.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || "0.1.0",
  });
}

export const dynamic = "force-dynamic";
