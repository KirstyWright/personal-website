# Install stage — bun resolves bun.lock, writes node_modules
FROM oven/bun:1.3-alpine AS install
WORKDIR /app

RUN apk add --no-cache python3 make g++ gcc libc-dev vips-dev

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Build stage — Node runs the Nuxt build so the bundle is Node-clean
# (bun-driven Vite builds can leak `bun:*` imports the Node ESM loader rejects)
FROM node:22-alpine AS build
WORKDIR /app

RUN apk add --no-cache python3 make g++ gcc libc-dev vips-dev

COPY --from=install /app/node_modules ./node_modules
COPY . ./

# Native modules from the bun install stage were linked against bun's runtime;
# rebuild against Node before invoking the Node-driven Nuxt build.
RUN npm rebuild better-sqlite3

ENV NUXT_PUBLIC_SITE_URL=https://kirsty.dev
RUN node node_modules/nuxt/bin/nuxt.mjs build

# Runtime stage — slim Node, just the .output bundle
FROM node:22-alpine AS runtime
WORKDIR /app

RUN apk add --no-cache vips

COPY --from=build /app/.output ./.output

ENV PORT=8080
ENV HOST=0.0.0.0
ENV NODE_ENV=production
EXPOSE 8080

CMD ["node", ".output/server/index.mjs"]
