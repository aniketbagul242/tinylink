# TinyLink — URL Shortener Assignment

### 📹 Video Walkthrough
I have recorded a full explanation video covering the code walkthrough, and demo.

🔗 **Video Link:**  https://drive.google.com/file/d/1dLtgx_qUfe_Y6PgwkjceB8F0o1zUAOs5/view?usp=drive_link

A clean, production-ready URL shortener built for the TinyLink take‑home assignment.
The app allows users to create short URLs, view click statistics, and manage links.
Built using **React + Tailwind (frontend)** and **Node.js + Express + PostgreSQL (backend)**, and deployed using **Vercel + Render + Neon**.

---

## 🚀 Live Demo

**Frontend:** https://tinylink-psi-three.vercel.app/
**Backend API:** https://tinylink-dfb6.onrender.com


---

## 📦 Features

### 🔗 Create Short Links

* Enter a long URL and optionally a custom code (`[A-Za-z0-9]{6,8}`).
* Validates the URL.
* Rejects duplicate codes (`409 Conflict`).

### 🚀 Redirect

* Visiting `/<code>` performs **HTTP 302 redirect** to the original URL.
* Every redirect increments the click counter.
* Updates `last_clicked` timestamp.

### 🗑️ Delete Links

* Users can delete links from the dashboard.


### 📊 Stats Page

* Visit `/code/:code` to view details:

  * Code
  * Target URL
  * Total clicks
  * Last clicked time
  * Created time

### 📋 Dashboard

* Displays all links in a responsive table.
* Actions include: **Open**, **Stats**, **Delete**.
* Long URLs are truncated with hover tooltip.
* Fully responsive layout.

### ❤️ Healthcheck

* `GET /healthz` returns system status.

---

## 🧪 API Endpoints

### **POST /api/links** — Create Link

Request:

```json
{
  "target_url": "https://example.com",
  "code": "abd445"
}
```

Responses:

* `201 Created` → success
* `409 Conflict` → code exists

### **GET /api/links** — List All Links

Returns an array of link objects.

### **GET /api/links/:code** — Get Stats for One Link

Returns full details for the given code.

### **DELETE /api/links/:code** — Delete Link

Deletes the link and returns success JSON.

### **GET /:code** — Redirect

302 redirect to the target URL.

### **GET /healthz** — Health Check

Example response:

```json
{
  "ok": true,
  "version": "1.0"
}
```

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* TailwindCSS
* React Router
* Axios

### Backend

* Node.js + Express
* PostgreSQL (Neon)
* pg / pg-pool
* CORS + helmet

### Hosting

* Frontend: Vercel
* Backend: Render
* Database: Neon Postgres

---

## 📁 Project Structure

```
TinyLink/
│
├── frontend/   # React + Tailwind app
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Stats.jsx
│   │   ├── components/
│   │   │   ├── LinkRow.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   ├── public/
│
├── backend/    # Express server
│   ├── controllers/
│   ├── routes/
│   ├── utils/
│   ├── connectdb/
│   ├── server.js
│   ├── package.json
│
└── README.md
```

---

## 🧰 Environment Variables

### **backend/.env.example**

```
DATABASE_URL=your_neon_database_url
PORT=3000
```


## ▶️ Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/aniketbagul242/tinylink.git
cd tinylink
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
npm run dev
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
npm run dev
```

Backend runs at: `http://localhost:3000`
Frontend runs at: `http://localhost:5173`

---

## 🌍 Deployment

### Backend (Render)

* Connect GitHub repo
* Select backend folder
* Set build & start commands:

```
Build: npm install
Start: npm start
```

* Add environment variables from `.env.example`


## 🧪 Testing Instructions (same as automated tests)

```bash
# Health
curl -i  https://tinylink-dfb6.onrender.com/healthz


# List
curl https://tinylink-dfb6.onrender.com/api/links

---

## 🎥 Submission Requirements

### Include the following in your submission:

1. **Public URL** https://tinylink-psi-three.vercel.app/
2. **Backend URL** https://tinylink-dfb6.onrender.com
3. **GitHub repository** https://github.com/aniketbagul242/tinylink
4. **Video walkthrough**  https://drive.google.com/file/d/1dLtgx_qUfe_Y6PgwkjceB8F0o1zUAOs5/view?usp=drive_link


---

## 🤝 Credits

Developed by **Aniket Bagul** as part of a take‑home assignment.

---

