import client from "prom-client";

// Create a dedicated registry (avoids conflicts with default global registry)
const register = new client.Registry();

// Add default metrics (CPU, memory, event loop lag, GC, etc.)
client.collectDefaultMetrics({
  register,
  prefix: "nextjs_",
});

// ─── Custom Application Metrics ──────────────────────────────────────────────

/** Total HTTP requests counter, labeled by method, route, and status code */
export const httpRequestsTotal = new client.Counter({
  name: "nextjs_http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"] as const,
  registers: [register],
});

/** HTTP request duration histogram in seconds */
export const httpRequestDuration = new client.Histogram({
  name: "nextjs_http_request_duration_seconds",
  help: "Duration of HTTP requests in seconds",
  labelNames: ["method", "route", "status_code"] as const,
  buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5, 10],
  registers: [register],
});

/** Number of requests currently being processed */
export const httpRequestsInFlight = new client.Gauge({
  name: "nextjs_http_requests_in_flight",
  help: "Number of HTTP requests currently being processed",
  registers: [register],
});

/** Page view counter by page path */
export const pageViewsTotal = new client.Counter({
  name: "nextjs_page_views_total",
  help: "Total number of page views",
  labelNames: ["page"] as const,
  registers: [register],
});

/** Server-side rendering duration */
export const ssrDuration = new client.Histogram({
  name: "nextjs_ssr_duration_seconds",
  help: "Duration of server-side rendering in seconds",
  labelNames: ["page"] as const,
  buckets: [0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2, 5],
  registers: [register],
});

/** API endpoint error counter */
export const apiErrorsTotal = new client.Counter({
  name: "nextjs_api_errors_total",
  help: "Total number of API errors",
  labelNames: ["method", "route", "error_type"] as const,
  registers: [register],
});

/** Build info gauge for version tracking */
export const buildInfo = new client.Gauge({
  name: "nextjs_build_info",
  help: "Build information",
  labelNames: ["version", "node_version"] as const,
  registers: [register],
});

// Set build info once
buildInfo
  .labels({
    version: process.env.npm_package_version || "0.1.0",
    node_version: process.version,
  })
  .set(1);

export { register };
export default register;
