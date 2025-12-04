# Alva Replication Demo

This project demonstrates a **Redis-based trade replication system** built with Next.js.  
It allows a **master dashboard** to publish trades into a Redis channel, and **copier dashboards** to subscribe and automatically execute those trades in real time.

---

## 🚀 Features
- Master publishes trades via `/api/master`
- Copiers subscribe via `/api/copier` and receive trades instantly
- Redis pub/sub integration using `ioredis`
- Tested locally with Docker Redis
- Ready for cloud deployment with Upstash Redis (works seamlessly on Vercel)

---

## 🛠️ Setup

### 1. Install dependencies
```bash
npm install
