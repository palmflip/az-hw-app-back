FROM node:alpine AS build-stage

WORKDIR /app
COPY package.json .
COPY yarn.lock .

RUN yarn install

COPY . .
RUN yarn run tsc

FROM node:alpine AS prod-stage

WORKDIR /app

COPY --from=build-stage /app/build .
COPY --from=build-stage /app/yarn.lock .
COPY --from=build-stage /app/package.json .

RUN yarn install --production

CMD ["node", "/app/index.js"]