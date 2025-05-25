# ---------- STAGE 1: Build ----------
FROM node:18 AS builder

WORKDIR /app
    
# Install deps first (uses cache if package files don’t change)
COPY package*.json ./
RUN npm ci
    
# Copy rest of the code
COPY . .
    
# Build Next.js app
RUN npm run build
    
# ---------- STAGE 2: Run ----------
FROM node:18-alpine AS runner
    
WORKDIR /app
    
# Only copy necessary build artifacts
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.ts ./next.config.ts
    
# Install only production deps
RUN npm ci --omit=dev
    
EXPOSE 3000
    
ENV NODE_ENV=production
    
CMD ["npm", "start"]
    