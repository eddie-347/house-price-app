ARG VITE_API_BASE
FROM node:18-bullseye-slim AS build
WORKDIR /app

# Set the Vite API base at build time
ENV VITE_API_BASE=${VITE_API_BASE}

# Install dependencies and build
COPY frontend/package*.json ./
COPY frontend/package-lock.json* ./
RUN npm ci --legacy-peer-deps || npm install
COPY frontend/ ./
RUN npm run build

FROM nginx:stable-alpine

# Copy built application
COPY --from=build /app/dist /usr/share/nginx/html

# Create nginx config for SPA routing
RUN cat > /etc/nginx/conf.d/default.conf <<EOF
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Cache static assets with long expiry
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Serve index.html for all non-file routes (SPA routing)
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
