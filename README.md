# test-composition-project

Minimal ping/pong test app for composition testing.

## Local dev

```bash
bun install
bun run --filter server dev   # http://localhost:3000/ping
bun run --filter client dev   # http://localhost:5173
```

## Docker

```bash
docker compose up --build
```

- Server: http://localhost:3000/ping
- Client: http://localhost:5173
