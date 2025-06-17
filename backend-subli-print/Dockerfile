FROM node:22-alpine AS base

ENV DIR /subli-print
WORKDIR $DIR

FROM base AS dev

RUN apk update && apk add --no-cache dumb-init

COPY package.json $DIR
COPY pnpm-lock.yaml $DIR

RUN pnpm install

COPY . $DIR

RUN pnpm run build 

EXPOSE $PORT
CMD [ "dumb-init", "pnpm", "run", "start:dev" ]

FROM base AS build

RUN apk update && apk add --no-cache dumb-init

COPY package.json $DIR
COPY pnpm-lock.yaml $DIR

RUN pnpm ci

COPY tsconfig*.json $DIR
COPY src $DIR/src

RUN pnpm run build && \
    pnpm prune --production

FROM base AS prod

ENV USER node

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --from=build $DIR/node_modules $DIR/node_modules
COPY --from=build $DIR/dist $DIR/dist

ENV NODE_ENV production
EXPOSE $PORT
USER $USER

CMD [ "dumb-init", "node", "dist/main.js" ]