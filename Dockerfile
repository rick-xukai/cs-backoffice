FROM public.ecr.aws/docker/library/node:16-alpine

ARG NODE_ENV=production
ARG VERSION=backoffice

RUN apk add --no-cache ca-certificates tzdata curl && \
    update-ca-certificates && \
    cp /usr/share/zoneinfo/Asia/Singapore /etc/localtime

COPY . /app

RUN cd /app && \
    yarn install --prod --frozen-lockfile --cache-folder /mnt/ycache --network-timeout 300000 && \
    rm -f index.js && cp server/index.js . && rm -rf server

WORKDIR /app

ENV TZ=Asia/Singapore \
    NODE_ENV=$NODE_ENV \
    HOST=0.0.0.0 \
    PORT=8081 \
    VERSION=$VERSION

EXPOSE 8081

HEALTHCHECK --interval=30s --timeout=10s \
  CMD curl -fs http://localhost:8081/status/index.html || exit 1

CMD ["node", "index.js"]
