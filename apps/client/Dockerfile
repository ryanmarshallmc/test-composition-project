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

FROM nginx:1.27-alpine

COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/apps/client/dist /usr/share/nginx/html

EXPOSE 80
