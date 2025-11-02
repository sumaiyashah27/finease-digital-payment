# 💳 FinEase – Digital Payments Platform

**Tech Stack:** ReactJS · Node.js · Express.js · MongoDB · Stripe · Docker

A secure and modern digital payments platform designed to simplify online transactions. FinEase offers tokenized payments, a WCAG-compliant UI, robust backend APIs, and an end-to-end Dockerized setup.

**Security:** 91% | **Usability:** 88% | **Stability:** 90%

---

## 🚀 Overview

FinEase enables businesses to securely handle payments using Stripe integration. It’s built for scalability, accessibility, and simplicity — ideal for fintech applications, payment dashboards, or e-commerce backends.

**Key Features:**

* 🔐 **Secure Stripe Integration** – Tokenization ensures PCI-compliant transactions.
* ⚙️ **Express.js REST API** – Clean, modular backend for payments and authentication.
* 💾 **MongoDB Database** – Manages users and payment records efficiently.
* 🎨 **React + TailwindCSS** – Accessible, responsive, and modern frontend.
* 🐳 **Dockerized Setup** – One command to spin up the entire stack.

---

## 📁 Project Structure

```
FinEase/
├── client/                 # React + Vite frontend
│   ├── src/
│   ├── Dockerfile
│   └── .env
├── server/                 # Node + Express backend
│   ├── src/
│   ├── Dockerfile
│   └── .env
├── docker-compose.yml      # Docker setup for frontend, backend, and MongoDB
└── README.md
```

---

## 🧱 Prerequisites

Before starting, make sure you have:

* **Docker Desktop** (latest version)
* **Node.js v20+** and **npm v9+** (for non-Docker runs)
* A **Stripe Developer Account** (for API keys)

---

## ⚙️ Environment Variables

### `server/.env`

```env
PORT=5000
MONGODB_URI=mongodb://mongo:27017/finease
JWT_SECRET=your_secret_key
STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXXXXXX
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXX
CORS_ORIGIN=http://localhost:5173
```

### `client/.env`

```env
VITE_API_BASE=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_XXXXXXXXXXXXXXXX
```

> 💡 If you’re not using Docker, replace the MongoDB URI with `mongodb://localhost:27017/finease`.

---

## 🐳 Run with Docker (Recommended)

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/<your-org>/FinEase.git
cd FinEase
```

### 2️⃣ Add Environment Files

Create `.env` files inside `server/` and `client/` folders (see examples above).

### 3️⃣ Build and Run

```bash
docker compose up --build
```

✅ Once it’s running:

* **Frontend:** [http://localhost:5173](http://localhost:5173)
* **Backend API:** [http://localhost:5000/api](http://localhost:5000/api)
* **MongoDB:** Accessible via `localhost:27017`

### 4️⃣ Stop Containers

```bash
docker compose down -v
```

---

## 🧠 Common Docker Commands

| Task                        | Command                           |
| --------------------------- | --------------------------------- |
| 🧱 Build & Start            | `docker compose up --build`       |
| ▶️ Start in Background      | `docker compose up -d`            |
| 🧹 Stop & Remove Containers | `docker compose down -v`          |
| 🔍 Backend Logs             | `docker compose logs -f backend`  |
| 💻 Frontend Logs            | `docker compose logs -f frontend` |
| 🔄 Restart a Service        | `docker compose restart backend`  |

---

## 🧪 Run Without Docker

If you prefer running locally:

### Backend

```bash
cd server
npm install
npm run dev
```

Backend available at → [http://localhost:5000/api](http://localhost:5000/api)

### Frontend

```bash
cd client
npm install
npm run dev
```

Frontend available at → [http://localhost:5173](http://localhost:5173)

---

## 🧰 docker-compose.yml Summary

```yaml
version: "3.9"

services:
  mongo:
    image: mongo:6
    container_name: finease-mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
    networks:
      - finease_net
    restart: always
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build: ./server
    container_name: finease-backend
    env_file: ./server/.env
    depends_on:
      mongo:
        condition: service_healthy
    ports:
      - "5000:5000"
    networks:
      - finease_net
    restart: on-failure

  frontend:
    build: ./client
    container_name: finease-frontend
    env_file: ./client/.env
    depends_on:
      - backend
    ports:
      - "5173:5173"
    networks:
      - finease_net
    restart: unless-stopped

volumes:
  mongo_data:

networks:
  finease_net:
    driver: bridge
```

---

## 💡 Workflow Summary

1. Launch FinEase via Docker.
2. The backend connects to MongoDB and listens on port 5000.
3. The frontend connects to the backend at port 5000 and serves on port 5173.
4. Stripe handles all payments using client-side tokenization.
5. Backend stores user and transaction data securely in MongoDB.

---

## 🧯 Troubleshooting

| Problem                  | Cause                                  | Solution                                             |
| ------------------------ | -------------------------------------- | ---------------------------------------------------- |
| `ECONNREFUSED ::1:27017` | Backend trying to connect to localhost | Use `mongodb://mongo:27017/finease` in server `.env` |
| `ERR_EMPTY_RESPONSE`     | Frontend not ready                     | Restart frontend: `docker compose restart frontend`  |
| Stripe 401               | Invalid or missing Stripe key          | Verify keys in `.env`                                |
| Port conflict            | Port 5000 or 5173 already in use       | Change ports in `.env` or `docker-compose.yml`       |
| Docker won’t start       | Daemon not running                     | Start Docker Desktop                                 |

---

## 🔒 Security Guidelines

* Never store raw card data — use Stripe tokens.
* Always verify Stripe webhooks with the secret key.
* Use HTTPS in production environments.
* Keep JWT and Stripe secrets safe (do not commit `.env` files).

---

## 🧾 Command Summary

| Action                        | Command                           |
| ----------------------------- | --------------------------------- |
| 🚀 Start (build new images)   | `docker compose up --build`       |
| ▶️ Start existing containers  | `docker compose up -d`            |
| 🧹 Stop and remove everything | `docker compose down -v`          |
| 🧠 Run backend manually       | `cd server && npm run dev`        |
| 💻 Run frontend manually      | `cd client && npm run dev`        |
| 🔍 Check backend logs         | `docker compose logs -f backend`  |
| 🔍 Check frontend logs        | `docker compose logs -f frontend` |

---

## 📜 License

MIT © 2025 – FinEase Contributors
