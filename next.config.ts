import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Packages that must stay server-side only.
   * This prevents prom-client and OTel from being bundled into client JS.
   */
  serverExternalPackages: [
    "prom-client",
    "@opentelemetry/sdk-node",
    "@opentelemetry/sdk-trace-node",
    "@opentelemetry/exporter-trace-otlp-http",
    "@opentelemetry/exporter-prometheus",
    "@opentelemetry/auto-instrumentations-node",
  ],
};

export default nextConfig;
