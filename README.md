# EventSphere: Campus Event Registration Platform

![EventSphere Banner](https://img.shields.io/badge/EventSphere-Production_Deployment-blue?style=for-the-badge)

### 🔴 [Live Demo:http://43.205.239.145/]
*(Note: Because this is deployed on an AWS EC2 instance, the IP address may change if the instance is stopped/started).*

**EventSphere** is a centralized, full-stack event registration platform designed specifically for college institutions. It allows students to browse and register for campus events, while providing administrators and event organizers a comprehensive dashboard to securely create, manage, and monitor event registrations.

This project focuses heavily on **production-ready DevOps practices**, including Docker containerization, Nginx reverse proxying, Secure Remote MongoDB Atlas connections, and automated CI/CD deployment via GitHub Actions to an AWS EC2 instances.

---

## 📋 Features

### 🎓 **Student User Module**
- **Browse Events:** View a complete, real-time list of all upcoming campus events.
- **Event Details:** Seamlessly view in-depth details (schedule, description, capacity) for individual events.
- **Event Registration:** Register for open events with just one click.
- **Campus Announcements:** View dynamic, dedicated public announcements posted directly by admin organizers.

### 🛡️ **Admin Module**
- **Manage Events:** Create new events, edit details of existing ones, or cancel/delete them entirely.
- **View Registrations:** Track the attendance capability by viewing exactly which users are registered for which events.
- **Manage Announcements:** Broadcast new public campus announcements or delete outdated ones.

---

## 🛠️ Technology Stack (MERN)

- **Frontend:** React.js, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas (Remote Cloud Database)
- **Deployment & Architecture:**
  - **Docker:** Multi-stage production builds minimizing image payload sizes.
  - **Nginx:** Secured internal routing and reverse proxying logic.
  - **AWS EC2:** Amazon Linux 2023 remote host.
  - **GitHub Actions:** Automated CI/CD deployment pipeline.

---

## 🚀 Running the Project Locally (Using Docker)

If you'd like to spin up the entire application architecture locally without installing Node or NPM on your host machine, you can leverage the included `docker-compose.yml` file.

### Prerequisites
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop)
- Prepare your MongoDB Atlas connection URL.

### Local Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/kss-max/aws.git
   cd aws
   ```
2. **Configure your Database Secrets**
   Create the `.env` file for the backend container.
   ```bash
   cp backend/.env.example backend/.env
   ```
   Open `backend/.env` and replace the placeholder `MONGO_URI` with your actual MongoDB Atlas connection string (or a local Docker MongoDB instance if preferred).

3. **Start the architecture**
   ```bash
   docker-compose up --build
   ```
   *(Docker will build the React assets, launch the Nginx static server, mount the Node backend, and map the internal ports).*

4. **View your site**
   Navigate to `http://localhost:80` in your web browser.

---

## 🏗️ Production Deployment Architecture

The production branch utilizes a highly-optimized container layout to securely isolate the Node.js backend entirely inside the internal Docker network. Our single internet-facing reverse-proxy (`nginx:alpine`) acts as a secure traffic director—serving static `.js`/`.css` assets via a multi-stage frontend build directly to the client, while transparently passing dynamic API requests (`/api/*`) safely backward to the Express runtime environment.

This means **Port 80 is the ONLY port exposed** to incoming internet traffic via AWS Security Group ingress rules, fulfilling strict administrative safety criteria. 

---

*Project developed for the Containerized Campus Event Platform curriculum module.*
