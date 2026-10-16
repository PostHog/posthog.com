FROM node:22-bookworm-slim

ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
ENV CI=true
ENV HUSKY=0
ENV NODE_TLS_REJECT_UNAUTHORIZED=0
ENV TAILWIND_MODE=watch
ENV NODE_OPTIONS=--max_old_space_size=4096
ENV GATSBY_TELEMETRY_DISABLED=1

RUN apt-get update \
    && apt-get install -y --no-install-recommends git ca-certificates python3 make g++ \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches ./patches
COPY plugins ./plugins

RUN pnpm install --frozen-lockfile --ignore-scripts && pnpm exec patch-package

COPY . .

RUN mkdir -p /app/.cache /app/public

EXPOSE 6464

CMD ["bash", "-c", "mkdir -p .cache public && pnpm exec patch-package && pnpm exec gatsby develop -H 0.0.0.0 -p 6464"]