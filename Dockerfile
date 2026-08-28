FROM node:24-slim AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG API_URL
RUN API_URL=$API_URL npm run build

FROM node:24-slim

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist/pymigrate-web/browser ./browser

EXPOSE 3000

CMD ["sh", "-c", "serve -s browser -l ${PORT:-3000}"]
