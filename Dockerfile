FROM node:20-alpine

WORKDIR /app

# Prisma's query engine needs OpenSSL on Alpine (classic "libssl.so.1.1:
# No such file or directory" otherwise).
RUN apk add --no-cache openssl

# Install deps first for better layer caching — only re-runs npm install
# when package.json/lock actually change, not on every source edit.
# `npm ci` would be stricter, but package-lock.json is Windows-generated
# and doesn't pin every Linux-only optional dependency (e.g. @emnapi/*),
# which makes `npm ci` fail here even though the lockfile is otherwise
# fine — `npm install` resolves those for the current (Linux) platform.
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm install

COPY . .

# Baked into the client bundle at build time by Vite (import.meta.env.VITE_*
# is resolved when `vite build` runs, not at container start). Empty
# VITE_API_URL means same-origin relative fetches (/properties,
# /site-settings) since this same container serves the built frontend and
# the API together — see server/index.ts's production static-file block.
# Override via Dokploy build args if either value ever changes.
ARG VITE_API_URL=""
ARG VITE_CHATWOOT_BASE_URL="https://chat.imobnode.com.br"
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_CHATWOOT_BASE_URL=$VITE_CHATWOOT_BASE_URL

# Generates the Prisma Client for this exact container's platform
# (linux-musl) — must run here, not be copied in from a different OS.
RUN npx prisma generate
RUN npm run build

ENV NODE_ENV=production
EXPOSE 3001

# The backend runs straight from TS via tsx (same as npm run dev:backend) —
# this project has no separate backend build step. Runtime env vars
# (DATABASE_URL, PORT, FRONTEND_URL, ERP_SYNC_URL, ERP_SYNC_INTERVAL_MS)
# come from Dokploy's environment configuration, not from this image.
#
# The Prisma schema is NOT pushed automatically on boot — run
# `npx prisma db push` yourself against the production DATABASE_URL once
# before the first deploy (and again after any future schema change),
# same manual-review convention already used for the ERP's own migrations.
CMD ["npx", "tsx", "server/index.ts"]
