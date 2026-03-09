/**
 * Next.js Instrumentation Hook
 *
 * This file is automatically loaded by Next.js when the
 * `instrumentation` config is enabled. It runs once when
 * the server starts, making it the ideal place to initialize
 * OpenTelemetry tracing and Prometheus metrics.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  // Only initialize on the server (Node.js runtime)
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Initialize OpenTelemetry tracing (exports to Jaeger via OTLP)
    const { startTracing } = await import("./lib/tracing");
    startTracing();

    // Pre-load Prometheus metrics registry so it's ready
    await import("./lib/metrics");

    console.log("[Instrumentation] Prometheus metrics & Jaeger tracing ready");
  }
}
