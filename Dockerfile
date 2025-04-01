# Install dependencies only when needed
FROM node:lts-buster AS deps
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* ./
RUN yarn --frozen-lockfile;

# Rebuild the source code only when needed
FROM node:lts-buster AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_GITLAB_DATA_TOKEN
ARG NEXT_PUBLIC_GITLAB_UI_TOKEN
ENV NEXT_PUBLIC_GITLAB_DATA_TOKEN=$NEXT_PUBLIC_GITLAB_DATA_TOKEN
ENV NEXT_PUBLIC_GITLAB_UI_TOKEN=$NEXT_PUBLIC_GITLAB_UI_TOKEN

RUN yarn build

# Production image, copy all the files and run next
FROM node:lts-buster AS runner
WORKDIR /app

ENV NODE_ENV=production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

CMD ["node", "server.js"]