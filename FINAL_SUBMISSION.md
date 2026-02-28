# EventSphere: Final Project Walkthrough

This document serves as a step-by-step walkthrough of the deployed EventSphere application, demonstrating how the system architecture, containerization, and networking fulfill the production requirements.

## Step 1: Accessing the Live System
To verify the working deployed system, navigate to the live application URL:
👉 **Live Application URL:** [http://13.232.61.24/](http://13.232.61.24/)

The application sits on an AWS EC2 instance accessed over standard HTTP.

## Step 2: Architecture & Request Routing

![Architecture Diagram](architecture_diagram.png) 
*(Note: Please drag and drop the diagram image you provided into this spot when submitting your final Word/PDF document!)*

As illustrated in the diagram, our system handles traffic efficiently and securely:
1. **Client Request:** A user makes an `HTTP Request :80` from their Client Browser to the EC2 Instance (our Docker Host).
2. **Nginx Reverse Proxy:** The incoming traffic hits the Nginx Reverse Proxy first.
3. **Routing Logic (Nginx Explanation):**
   - **Static Frontend (`location /`):** Standard web page traffic is routed to serve React Static Files from the Frontend Container (running `nginx:alpine`).
   - **API Reverse Proxy (`location /api/`):** API data requests are intercepted and proxy-passed to the Backend Container (running `Node.js :5000`).
4. **Database Connection:** The Backend Container establishes a Secure Connection outward to the MongoDB Atlas Cloud Database.

## Step 3: Verifying the Containers
To prove the execution of the containers on the host, we log into the EC2 terminal via SSH and run `docker ps`.

*(Please insert your screenshot of the EC2 terminal running `docker ps` showing aws_frontend and aws_backend containers as "Up" right here)*

## Step 4: Docker & Containerization Configuration
We utilized `docker-compose.yml` to orchestrate two primary services securely:
- **Frontend Container:** We used a highly efficient **multi-stage build**. The first stage uses a Node.js image to install dependencies and compile the React application. The second stage takes only the compiled static assets and serves them via a minimal `nginx:alpine` image. This dramatically limits the final image size.
- **Backend Container:** A lightweight Node.js image is used to serve the Express API.
- **Resilience:** Both services incorporate a `restart: always` policy to guarantee high availability, and they rely on local `.env` variables to connect to MongoDB Atlas securely.

## Step 5: Port Mapping Documentation
To adhere to strict networking security practices, we utilize Docker container networking to isolate internal services from the public:
- **Host Port `80` -> Frontend Container Port `80`**: This maps the EC2 server's standard incoming HTTP traffic to the Nginx reverse proxy. This is the **only port exposed** to the public internet via our AWS Security Groups.
- **Backend Container Port `5000` (Internal)**: The Node.js Express API runs on port 5000 inside its container. This port is completely isolated and **not mapped to the host EC2 machine**. Nginx forwards API requests to it over the internal Docker network, shielding the backend from any direct exterior access.

## Step 6: Serverful vs. Serverless Cost Comparison
Our current architecture is **Serverful**. 
- We provisioned a dedicated AWS EC2 virtual machine (Amazon Linux 2023). 
- **Pros:** We have complete environmental control, and the persistent, always-on server makes local file caching and persistent database connections incredibly fast.
- **Cons:** We pay for the server 24/7 even when nobody is using it, and we are responsible for performing manual OS-level maintenance patches.

In contrast, a **Serverless** architecture (like AWS Lambda or Vercel) involves deploying individual functions to ephemeral, scalable cloud-managed containers.
- **Pros:** Scales infinitely and instantly to zero. This means zero cost when idle (e.g., during school holidays), with zero OS-level maintenance required.
- **Cons:** Susceptible to "cold starts" (latency delays on the first execution after being idle). Furthermore, maintaining persistent connections (such as long-lived sockets to our MongoDB Atlas cluster) can be more complex and resource-intensive to implement.
