# ---------- BUILD STAGE ----------
FROM node:20-alpine AS build

WORKDIR /app

# Copy dependency files (safe even if some don't exist)
COPY package.json ./
COPY package-lock.json* ./
COPY yarn.lock* ./
COPY pnpm-lock.yaml* ./

# Install dependencies
RUN \
  if [ -f package-lock.json ]; then npm ci; \
  elif [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable && pnpm install --frozen-lockfile; \
  else npm install; \
  fi

# Copy the rest of the project
COPY . .

# Build for production
RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:20-alpine AS production

WORKDIR /app

RUN npm install -g serve

# Copy built assets from the previous stage
COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000

CMD ["sh", "-c", "serve -s dist -l 0.0.0.0:${PORT:-3000}"]
