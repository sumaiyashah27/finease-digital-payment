# 💳 FinEase – Digital Payments Platform

**ReactJS · Node.js · Express.js · MongoDB · Stripe · Docker · AWS · GitHub Actions (CI/CD)**

FinEase is a modern **digital payments platform** engineered for secure, scalable, and real-world fintech environments. Built with enterprise-grade principles, it showcases full-stack development, containerization, CI/CD automation, and cloud deployment expertise.

---

## 📘 Overview

FinEase enables **secure online transactions**, user authentication, and real-time payment tracking through a responsive React frontend and a robust Node.js backend. Designed for reliability, it uses **Dockerized services**, **Stripe payment integration**, and **AWS-ready infrastructure** to simulate a true fintech production setup.

---

## ✨ Core Features

* 💳 **Payment Processing:** Secure payment flows powered by Stripe.
* 🔐 **JWT Authentication:** Safe, tokenized login and session management.
* ⚙️ **Microservice Architecture:** Independent containers for frontend, backend, and database.
* 🐳 **Dockerized Infrastructure:** Single-command setup for full stack.
* ☁️ **AWS Deployable:** Optimized for Elastic Beanstalk or ECS.
* 🧠 **Automated CI/CD:** GitHub Actions pipeline for testing and deployment.
* 💅 **Modern UI:** WCAG-compliant, responsive interface built with TailwindCSS.

---

## 🧰 Tech Stack

| Layer              | Technology                                    |
| ------------------ | --------------------------------------------- |
| **Frontend**       | ReactJS, Vite, TailwindCSS                    |
| **Backend**        | Node.js, Express.js                           |
| **Database**       | MongoDB (via Docker)                          |
| **Payments**       | Stripe API                                    |
| **Infrastructure** | Docker, Docker Compose, AWS Elastic Beanstalk |
| **CI/CD**          | GitHub Actions                                |

---

## 🧱 Architecture

```
[ React (Vite) ]  →  [ Express API (Node.js) ]  →  [ MongoDB + Stripe ]
      │                         │
      ▼                         ▼
     UI                 Auth + Payments
```

**Environments:**

* Local: Docker Compose
* CI/CD: GitHub Actions
* Production: AWS Elastic Beanstalk (Docker)

---

## 🗂️ Project Structure

```
FinEase/
├── client/               # React frontend (Vite)
├── server/               # Node + Express backend
├── aws-deploy/           # AWS deployment configs
├── .github/workflows/    # CI/CD pipeline
├── docker-compose.yml
├── Dockerfile
├── .gitignore
├── .dockerignore
└── README.md
```

---

## 🖥️ Screens

| Screen                  | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| **Login Page**          | Secure authentication using JWT and Stripe session validation |
| **Dashboard**           | Account balance, payment analytics, and recent transactions   |
| **Payments Page**       | Initiate and manage payment workflows securely                |
| **Transaction History** | Track and filter successful/failed payments                   |
| **Admin Panel**         | User and payment management for admin users                   |

---

## ⚙️ Environment Variables

### `server/.env`

```bash
PORT=5000
MONGO_URI=mongodb://mongo:27017/finease
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=sk_test_xxxxx
```

### `client/.env`

```bash
VITE_API_BASE=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxx
```

---

## ⚡ Local Development Setup

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

Then open:

* Frontend → [http://localhost:5173](http://localhost:5173)
* Backend → [http://localhost:5000/api](http://localhost:5000/api)

---

## 🐳 Run with Docker

Build and launch the entire stack:

```bash
docker-compose up --build
```

Access the application:

* Frontend → [http://localhost:5173](http://localhost:5173)
* Backend → [http://localhost:5000/api](http://localhost:5000/api)

> 🧩 Ensure your `server/.env` contains:
>
> ```bash
> MONGO_URI=mongodb://mongo:27017/finease
> ```
>
> before running Docker.


---

## ☁️ AWS Deployment – Elastic Beanstalk

### Files Required

* `aws-deploy/Dockerrun.aws.json` (deployment definition)
* `aws-deploy/deploy.sh` (automated deploy script)

### Steps

```bash
aws configure                  # Configure your AWS credentials
docker build -t finease .      # Build Docker image
./aws-deploy/deploy.sh         # Deploy to Elastic Beanstalk
```

Access your app:

```
http://finease-env.eba-xyz123.us-east-1.elasticbeanstalk.com
```

---

## Example: `Dockerrun.aws.json`

```json
{
  "AWSEBDockerrunVersion": 2,
  "containerDefinitions": [
    {
      "name": "finease",
      "image": "<your-aws-account-id>.dkr.ecr.us-east-1.amazonaws.com/finease:latest",
      "essential": true,
      "portMappings": [{ "containerPort": 5000, "hostPort": 5000 }],
      "memory": 512,
      "environment": [{ "name": "NODE_ENV", "value": "production" }]
    }
  ]
}
```

---

## 🔍 Troubleshooting

| Issue                | Cause                   | Solution                                |
| -------------------- | ----------------------- | --------------------------------------- |
| `Cannot GET /api`    | Missing route           | Verify Express routes                   |
| `ECONNREFUSED mongo` | Mongo not ready         | Use `depends_on` in Docker Compose      |
| Frontend not loading | Wrong API URL           | Update `VITE_API_BASE` in client `.env` |
| Port 5000 in use     | Process already running | Stop container or change port           |
| AWS deploy fails     | Missing credentials     | Add AWS access keys to GitHub or CLI    |

---

## 📜 License

**MIT License** © 2025 [Sumaiya Shah](https://github.com/sumaiyashah27)

---
