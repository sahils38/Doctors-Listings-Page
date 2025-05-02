# 🏥 Doctor Listing Platform

A full-stack **Doctor Listing Platform** built with **Next.js** (frontend) and **Express.js + Prisma + PostgreSQL** (backend).
Users can filter and view doctors with pagination and filter options.

---

## 🚀 Tech Stack

* **Frontend**: Next.js 14/15 (App Router, TypeScript)
* **Backend**: Express.js with Prisma ORM
* **Database**: PostgreSQL (hosted on Railway)
* **Hosting**:

  * Frontend: Vercel
  * Backend: Railway

---

## 📂 Project Structure

```
/doctor-listing   → Frontend (Next.js Application)
/doctor-backend   → Backend (Express.js API with Prisma)
```

---

## 🌐 Frontend Setup (`doctor-listing`)

```bash
# Navigate to the frontend folder
cd doctor-listing

# Install dependencies
npm install

# Run the development server
npm run dev

# Frontend will be running at http://localhost:3000 (or another available port)
```

---

## 🖥️ Backend Setup (`doctor-backend`)

```bash
# Navigate to the backend folder
cd doctor-backend

# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run migrations (only if needed)
npx prisma migrate dev

# Start the backend server
npm run dev

# Backend will be running at http://localhost:5000 (or as specified in your environment variables)
```

---

## 📦 Environment Variables

### Backend (`doctor-backend/.env`)

Create a `.env` file inside `doctor-backend/` with the following:

```bash
DATABASE_URL=your_postgresql_database_url
PORT=5000
```

* Replace `your_postgresql_database_url` with your actual PostgreSQL URL from Railway.

---

## ✨ Features

* ✅ Doctor listing page with filters
* ✅ Filters by Speciality, Gender, and Experience
* ✅ Pagination with Next and Previous buttons
* ✅ Scroll to top when changing pages
* ✅ Loading spinner ("Loading Doctors...") while filters apply
* ✅ Responsive and clean UI

---

## 🚀 Deployment Instructions

### Backend Deployment (Railway)

1. Create a new project on [Railway](https://railway.app/).
2. Set **Root Directory** to `/doctor-backend`.
3. Set **Build Command**:

```bash
npm install
```

4. Set **Start Command**:

```bash
npm run start
```

5. Add Environment Variables:

   * `DATABASE_URL`
   * `PORT` (optional if using 5000)

6. (Optional) Set **Watch Paths** to `doctor-backend/`.

7. Deploy 🚀.

---

### Frontend Deployment (Vercel)

1. Create a new project on [Vercel](https://vercel.com/).
2. Import the GitHub repository.
3. Set the **Root Directory** to `/doctor-listing`.
4. Add environment variables if needed (for example, backend API URL).
5. Deploy 🚀.

---



## ✍️ Author

* **Sahil Saraswat**



# ⚡ Quick Commands

| Command                  | Description                             |
| ------------------------ | --------------------------------------- |
| `npm install`            | Install dependencies                    |
| `npm run dev`            | Run the development server              |
| `npx prisma generate`    | Generate Prisma Client                  |
| `npx prisma migrate dev` | Apply migrations to PostgreSQL database |
| `npm run start`          | Start production server (backend)       |

---

# ✅ Status: Completed

---
