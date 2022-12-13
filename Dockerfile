# Install dependencies only when needed
FROM public.ecr.aws/docker/library/node:16-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* /app/

RUN \
  if [ -f yarn.lock ]; then yarn install --network-timeout 300000 --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM public.ecr.aws/docker/library/node:16-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY . /app/

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM public.ecr.aws/docker/library/node:16-alpine AS runner

ARG NODE_ENV=production
ARG VERSION=backoffice

WORKDIR /app

RUN apk add --no-cache tzdata curl && \
    cp /usr/share/zoneinfo/Asia/Singapore /etc/localtime

# Uncomment the following line in case you want to disable telemetry during runtime.

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 backoffice

COPY --from=builder --chown=backoffice:nodejs /app/build /app/build
COPY --from=builder --chown=backoffice:nodejs /app/node_modules /app/node_modules
COPY --from=builder --chown=backoffice:nodejs /app/server /app/server

USER backoffice

ENV TZ=Asia/Singapore \
    NODE_ENV=$NODE_ENV \
    HOST=0.0.0.0 \
    PORT=8081 \
    VERSION=$VERSION

EXPOSE 8081

HEALTHCHECK --interval=30s --timeout=10s \
  CMD curl -fs http://localhost:8081/ || exit 1

CMD ["node", "server"]
