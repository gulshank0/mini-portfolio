# Observability Setup: Prometheus + Grafana + Jaeger

This project includes a full observability stack powered by **OpenTelemetry**, **Prometheus**, **Grafana**, and **Jaeger**.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js Application                       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐ │
│  │ prom-client   │  │ OTel SDK     │  │ instrumentation.ts │ │
│  │ (metrics)     │  │ (tracing)    │  │ (bootstrap)        │ │
│  └──────┬───────┘  └──────┬───────┘  └────────────────────┘ │
│         │                  │                                  │
│   GET /api/metrics    OTLP/HTTP                              │
└─────────┼──────────────────┼────────────────────────────────┘
          │                  │
          ▼                  ▼
   ┌────────────┐    ┌────────────┐
   │ Prometheus  │    │   Jaeger   │
   │  :9090      │    │  :16686    │
   └──────┬─────┘    └────────────┘
          │
          ▼
   ┌────────────┐
   │  Grafana   │
   │  :3001     │
   └────────────┘
```

## Quick Start

### 1. Start the observability stack

```bash
docker compose -f docker-compose.observability.yml up -d
```

This starts:
| Service    | URL                        | Purpose              |
|------------|----------------------------|----------------------|
| Prometheus | http://localhost:9090       | Metrics storage      |
| Grafana    | http://localhost:3001       | Dashboards & alerts  |
| Jaeger     | http://localhost:16686      | Distributed tracing  |

### 2. Start the Next.js app

```bash
npm run dev
```

The app automatically initializes:
- **Prometheus metrics** via `prom-client` — exposed at `/api/metrics`
- **OpenTelemetry tracing** — exported to Jaeger via OTLP/HTTP

### 3. View dashboards

1. Open **Grafana** at http://localhost:3001
2. Login with `admin` / `admin`
3. Navigate to **Dashboards → Next.js Portfolio**

The pre-provisioned dashboard includes:
- Request rate & total requests
- Response time percentiles (p50/p90/p99)
- Error rates
- Page views by path
- Node.js heap memory & CPU usage
- Event loop lag
- Active handles & requests

### 4. View traces

1. Open **Jaeger** at http://localhost:16686
2. Select service **mini-portfolio**
3. Click **Find Traces**

## Available Metrics

### Custom Application Metrics

| Metric | Type | Labels | Description |
|--------|------|--------|-------------|
| `nextjs_http_requests_total` | Counter | method, route, status_code | Total HTTP requests |
| `nextjs_http_request_duration_seconds` | Histogram | method, route, status_code | Request duration |
| `nextjs_http_requests_in_flight` | Gauge | — | Currently processing requests |
| `nextjs_page_views_total` | Counter | page | Page views by path |
| `nextjs_ssr_duration_seconds` | Histogram | page | SSR rendering duration |
| `nextjs_api_errors_total` | Counter | method, route, error_type | API errors |
| `nextjs_build_info` | Gauge | version, node_version | Build metadata |

### Default Node.js Metrics (auto-collected)

All prefixed with `nextjs_`:
- `nodejs_heap_size_*_bytes` — Heap memory
- `nodejs_eventloop_lag_*` — Event loop lag
- `process_cpu_*` — CPU usage
- `nodejs_active_handles_total` — Active handles
- `nodejs_active_requests_total` — Active libuv requests

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/metrics` | GET | Prometheus metrics (scrape target) |
| `/api/track` | POST | Record page views / request metrics |
| `/api/health` | GET | Health check |

### Tracking API Usage

```bash
# Record a page view
curl -X POST http://localhost:3000/api/track \
  -H "Content-Type: application/json" \
  -d '{"type":"pageview","page":"/"}'

# Record a request metric
curl -X POST http://localhost:3000/api/track \
  -H "Content-Type: application/json" \
  -d '{"type":"request","method":"GET","route":"/","statusCode":200,"duration":45}'
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `OTEL_EXPORTER_OTLP_ENDPOINT` | `http://localhost:4318` | Jaeger OTLP endpoint |
| `OTEL_SERVICE_NAME` | `mini-portfolio` | Service name in traces |
| `NODE_ENV` | `development` | Environment tag |

## File Structure

```
├── instrumentation.ts                     # Next.js instrumentation hook
├── middleware.ts                           # Request timing middleware
├── lib/
│   ├── metrics.ts                         # Prometheus metrics registry
│   └── tracing.ts                         # OpenTelemetry tracing setup
├── app/api/
│   ├── metrics/route.ts                   # GET /api/metrics
│   ├── track/route.ts                     # POST /api/track
│   └── health/route.ts                    # GET /api/health
├── docker-compose.observability.yml       # Observability stack
└── observability/
    ├── prometheus/
    │   └── prometheus.yml                 # Prometheus scrape config
    └── grafana/
        ├── provisioning/
        │   ├── datasources/datasources.yml
        │   └── dashboards/dashboards.yml
        └── dashboards/
            └── nextjs-portfolio.json      # Pre-built dashboard
```

## Stopping the Stack

```bash
docker compose -f docker-compose.observability.yml down

# To also remove stored data:
docker compose -f docker-compose.observability.yml down -v
```
