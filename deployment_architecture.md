# EventSphere Deployment Architecture

## 1. Architecture Diagram
```mermaid
graph TD
    Client[Client Browser] -->|HTTP / Port 80| Nginx[Frontend + Nginx Container]
    
    subgraph "Docker Host (EC2 Instance)"
        Nginx -->|Serves Static Files| React[/var/share/nginx/html]
        Nginx -->|Reverse Proxy /api/*| Backend[Backend Container :5000]
    end

    Backend -->|MONGO_URI| Atlas[(MongoDB Atlas Cloud)]
```

## 2. Port Mapping Documentation
To adhere to strict security practices, we have utilized container networking to isolate internal services and only expose what is absolutely necessary:

- **Host Port `80` -> Frontend Container Port `80`**: This maps the EC2 server's standard HTTP port to the Nginx reverse proxy running inside the frontend container. This is the **only port exposed** to the public internet.
- **Backend Container Port `5000` (Internal)**: The Node.js Express API inside the backend container is running on port 5000. However, this port is **not mapped to the host EC2 machine**. It relies entirely on Docker's isolated internal network. Nginx forwards requests to it internally, completely shielding the backend from direct outside access.

## 3. Nginx Routing Explanation
The Nginx component is designed using a structured server block configuration (see `frontend/nginx.conf`) that handles two distinct routing paths:

1. **Static Frontend Routing (`location /`)**: Any traffic hitting the root path is served the pre-built, production-ready React assets from `/usr/share/nginx/html`. A `try_files` directive ensures that React Router's single-page application navigation works by falling back to `index.html`.
2. **API Reverse Proxy (`location /api/`)**: Any HTTP traffic starting with `/api/` is intercepted by Nginx and proxied to `http://backend:5000`. Standard proxy headers (`proxy_set_header`) are injected to maintain the original Host, IP, and handle WebSocket upgrades if necessary.

## 4. Docker Configuration Explanation
The application is containerized using `docker-compose.yml` to orchestrate two primary services:
1. **Frontend**: Utilizes a highly efficient "multi-stage build". Stage 1 uses a Node.js image to install dependencies and run `npm run build`. Stage 2 takes only the compiled static assets and drops them into a lightweight, production-ready `nginx:alpine` image.
2. **Backend**: Uses a lightweight `node:20-alpine` image to serve the Express API.
3. **Configuration**: Both services utilize `restart: always` to ensure they recover automatically if the EC2 instance restarts. Environment variables are securely injected using an `env_file` rather than hardcoding credentials into the Dockerfiles.

## 5. Serverful vs Serverless Comparison
**Serverful (Current Architecture on EC2)**:
- Consists of provisioning a dedicated virtual machine running an operating system 24/7.
- **Pros**: Complete control over the environment, predictable steady traffic costs, ability to run persistent Docker daemon and custom Nginx layers easily.
- **Cons**: We pay for the server even when no one is using it. Requires manual OS-level updates and instance management.

**Serverless (e.g., AWS Lambda, Vercel)**:
- Code executes on-demand in ephemeral containers managed invisibly by the cloud provider.
- **Pros**: Scales instantly to zero (no cost when idle) or to millions of requests. Zero server maintenance.
- **Cons**: Can fall victim to "cold starts" (delay on the first request). Persistent connections (like WebSockets) are harder to implement, and high sustained traffic can be more expensive than a dedicated EC2 machine.
