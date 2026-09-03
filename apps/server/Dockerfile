FROM oven/bun:1.2

WORKDIR /app

COPY package.json ./
COPY apps/server/package.json ./apps/server/
RUN bun install

COPY apps/server ./apps/server

WORKDIR /app/apps/server
EXPOSE 3000
CMD ["bun", "run", "start"]
