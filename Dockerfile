FROM node:16-alpine3.14 as build

WORKDIR /app

COPY package.json .
RUN yarn

COPY src ./src
COPY tsconfig.json .
RUN yarn prisma generate
RUN yarn build


FROM node:16-alpine3.14
WORKDIR /app

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist  ./dist

COPY package.json .

EXPOSE 3000


CMD ["yarn", "start"]         