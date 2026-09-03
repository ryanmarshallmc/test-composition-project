FROM oven/bun:1.2 AS build

WORKDIR /app

ARG VITE_API_URL=http://localhost:3000
ENV VITE_API_URL=$VITE_API_URL

COPY package.json ./
COPY apps/client/package.json ./apps/client/
RUN bun install

COPY apps/client ./apps/client

WORKDIR /app/apps/client
RUN bun run build

FROM oven/bun:1.2

WORKDIR /app/apps/client
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/apps/client ./

EXPOSE 5173
CMD ["bun", "run", "preview"]
