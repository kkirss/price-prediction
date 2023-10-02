FROM node:20-slim AS base

ARG APP_NAME_PREFIX=@price-prediction/
ARG APP_NAME=api
ARG ENTRY_FILE_NAME=server.mjs

ENV APP_NAME_PREFIX=${APP_NAME_PREFIX}
ENV APP_NAME=${APP_NAME}
ENV ENTRY_FILE_NAME=${ENTRY_FILE_NAME}

# Use corepack for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Install curl for healthcheck
RUN apt-get update
RUN apt-get install curl -y

WORKDIR /app

FROM base AS pruned
# Prune the monorepo to only include the packages needed for this app
# See https://turbo.build/repo/docs/handbook/deploying-with-docker#the-solution
RUN pnpm add turbo --global
COPY . .
RUN pnpm turbo prune --scope="${APP_NAME_PREFIX}${APP_NAME}" --docker --out-dir=./pruned
COPY ./pnpm-lock.yaml ./pruned/full/pnpm-lock.yaml

FROM base AS prod-deps
# Install production dependencies
COPY --from=pruned /app/pruned/json/ .
RUN --mount=type=cache,id=pnpm-prod,target=/pnpm/store-prod pnpm install --prod --no-optional --frozen-lockfile

FROM base AS build
# Install development dependencies and build the app
COPY --from=pruned /app/pruned/full/ .
RUN --mount=type=cache,id=pnpm-dev,target=/pnpm/store-dev pnpm install --frozen-lockfile
RUN pnpm run build --scope="${APP_NAME_PREFIX}${APP_NAME}"

FROM base AS runner
# Copy the production dependencies and the built app
COPY --from=prod-deps /app/ .
COPY --from=build /app/apps/${APP_NAME}/dist ./apps/${APP_NAME}/dist

ENV PORT=8080
EXPOSE 8080

# Don't run production as root
USER node

HEALTHCHECK CMD curl --fail http://localhost:$PORT || exit 1

CMD node ./apps/${APP_NAME}/dist/$ENTRY_FILE_NAME
