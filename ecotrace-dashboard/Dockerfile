
FROM node:20-alpine AS build


WORKDIR /app


COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./


RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
  else npm install; \
  fi

COPY . .


RUN npm run build

FROM node:20-alpine AS production

WORKDIR /app


RUN npm install -g serve

COPY --from=build /app/dist ./build


ENV NODE_ENV=production

EXPOSE 3000

CMD ["sh", "-c", "serve -s build -l 0.0.0.0:${PORT:-3000}"]
