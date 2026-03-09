import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION,
} from "@opentelemetry/semantic-conventions";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { BatchSpanProcessor } from "@opentelemetry/sdk-trace-node";

const JAEGER_ENDPOINT =
  process.env.OTEL_EXPORTER_OTLP_ENDPOINT || "http://localhost:4318";

const traceExporter = new OTLPTraceExporter({
  url: `${JAEGER_ENDPOINT}/v1/traces`,
});

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || "mini-portfolio",
  [ATTR_SERVICE_VERSION]: process.env.npm_package_version || "0.1.0",
  "deployment.environment": process.env.NODE_ENV || "development",
});

const sdk = new NodeSDK({
  resource,
  spanProcessors: [
    new BatchSpanProcessor(traceExporter),
    // Uncomment the line below for debug logging of spans to console:
    // new SimpleSpanProcessor(new ConsoleSpanExporter()),
  ],
  instrumentations: [
    getNodeAutoInstrumentations({
      // Disable fs instrumentation to reduce noise
      "@opentelemetry/instrumentation-fs": { enabled: false },
      "@opentelemetry/instrumentation-dns": { enabled: false },
      "@opentelemetry/instrumentation-net": { enabled: false },
    }),
  ],
});

export function startTracing() {
  sdk.start();
  console.log(
    `[Tracing] OpenTelemetry initialized — exporting to ${JAEGER_ENDPOINT}`
  );

  // Graceful shutdown
  const shutdown = async () => {
    try {
      await sdk.shutdown();
      console.log("[Tracing] OpenTelemetry shut down successfully");
    } catch (err) {
      console.error("[Tracing] Error shutting down OpenTelemetry:", err);
    }
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

export default sdk;
