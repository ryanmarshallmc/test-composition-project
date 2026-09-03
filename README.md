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
- Client: http://localhost:5173

## Composition

Platform environments are registered in **project settings** (not in compose). For this repo:

| Environment | Branch       |
|-------------|--------------|
| `staging`   | `staging`    |
| `production`| `main`       |

Each service declares per-env settings under `x-composition.environments.<name>`:

- **`server`** — public API (`hostname` per env)
- **`client`** — public web UI (`hostname` per env)
- **`watch`** — globs for git-sync skip when pushes don't touch those paths

Hostnames must match a **verified workspace domain** (update the FQDNs in `docker-compose.yml` if yours differ).

`VITE_API_URL` is a build arg on `client` and must match the server hostname for the environment being deployed. Staging builds use the staging API URL today; adjust before production deploys or split build args per branch.

Preview the manifest locally from the Composition repo:

```bash
cd ../composition
bun apps/cli/src/main.ts plan --env staging --branch staging --file ../test-composition-project/docker-compose.yml
```
