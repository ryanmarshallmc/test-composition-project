# test-composition-project

Minimal ping/pong test app for Composition git-sync deploy testing.

## Local dev

```bash
bun install
bun run --filter server dev   # http://localhost:3000/ping
bun run --filter client dev   # http://localhost:5173
```

## Docker (local)

```bash
docker compose up --build
```

- Server: http://localhost:3000/ping
- Client: http://localhost:8080

## Composition

Platform environments are registered in **project settings** (not in compose). For this repo:

| Environment | Branch    | Client hostname               | Server hostname                   |
|-------------|-----------|-------------------------------|-----------------------------------|
| `staging`   | `staging` | `staging.test.composition.sh` | `api.staging.test.composition.sh` |
| `production`| `main`    | `test.composition.sh`         | `api.test.composition.sh`         |

### What goes where

| Concern | Where it belongs | This repo |
|---------|------------------|-----------|
| Public URLs / TLS / domain mapping | `x-composition.environments.<env>.hostname` on each service | ✓ set on `client` and `server` |
| Git-sync watch paths | `x-composition.watch` | ✓ `apps/client/**`, `apps/server/**` |
| Scale / CPU / memory | `x-composition.environments.<env>.scale` | ✓ per env |
| Container port | Compose `ports` (first mapping) | ✓ `3000`, `80` (client published as `8080:80` locally) |
| Vite API base URL (build-time) | `build.args.VITE_API_URL` on `client` only | ✓ branch-specific (see below) |
| Server runtime port | Cloud Run sets `PORT`; server reads `process.env.PORT` | ✓ |

**Hostnames do not belong in `build.args`.** Composition validates deploy hostnames from `x-composition` against verified workspace domains. The server service does not need its hostname as a build arg.

**`VITE_API_URL` is required for the client** because Vite inlines `import.meta.env.VITE_*` at build time. The browser calls the API on a different subdomain, so the client image must be built with the correct API origin.

Composition does **not** support per-environment `build.args` — args are service-level in compose. This repo uses **branch-specific values**:

- **`main`** → `VITE_API_URL: https://api.test.composition.sh`
- **`staging`** → `VITE_API_URL: https://api.staging.test.composition.sh`

Each environment must be linked to the matching branch in project settings so deploys build with the right arg.

### Prerequisites

- `test.composition.sh` connected and verified as a subdomain zone in the Composition workspace
- Project linked to this GitHub repo
- Environments registered: `staging` → `staging`, `production` → `main`

### Validate compose

From the Composition repo:

```bash
cd ../composition
bun apps/cli/src/main.ts plan --env production --branch main --file ../test-composition-project/docker-compose.yml
bun apps/cli/src/main.ts plan --env staging --branch staging --file ../test-composition-project/docker-compose.yml
```

Both should list two active `web` services with the hostnames above.
