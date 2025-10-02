# syntax=docker/dockerfile:1.7

FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
RUN apk add --no-cache libc6-compat openssl
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS builder
COPY . .
RUN npx prisma generate && npm run build

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

RUN npx prisma generate

EXPOSE 3000
ENV PORT=3000
CMD ["npm", "run", "start"]


