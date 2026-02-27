# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first (better layer caching)
COPY package*.json ./
RUN npm install

# Copy the rest of the frontend source code
COPY . .

# Pass the backend URL at build time so Vite can bake it in
ARG VITE_API_URL=/api
ENV VITE_API_URL=$VITE_API_URL

# Build the production React app into the /app/dist folder
RUN npm run build

# ─── Stage 2: Serve with Nginx ────────────────────────────────────────────────
FROM nginx:alpine

# Copy the compiled React app from the builder stage into Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default Nginx configuration with our custom reverse-proxy config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
