# Production image for the NARA storefront. Built by .github/workflows/deploy.yml.

FROM node:24-bookworm-slim AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# NEXT_PUBLIC_* values are compiled into the site at build time. A value that
# is not passed stays unset, so the code's own defaults apply.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_WHATSAPP_NUMBER
RUN for name in NEXT_PUBLIC_SITE_URL NEXT_PUBLIC_API_BASE_URL NEXT_PUBLIC_WHATSAPP_NUMBER; do \
      eval "value=\${$name:-}"; [ -n "$value" ] || unset "$name"; \
    done \
  && npm run build

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    HOSTNAME=0.0.0.0 \
    PORT=3000
COPY --from=build --chown=node:node /app/.next/standalone ./
COPY --from=build --chown=node:node /app/.next/static ./.next/static
COPY --from=build --chown=node:node /app/public ./public
USER node
EXPOSE 3000
CMD ["node", "server.js"]
