# TicketLive – Fullstack Event Booking Platform

A production-ready event management platform built with Next.js and NestJS.  
Implements secure cookie-based authentication, role-based access control, and full frontend/backend deployment.

## 🚀 Live Demo

- Frontend: https://ticket-live-front.vercel.app/
- Backend API: https://ticketlive-back.onrender.com

---

## 🛠 Tech Stack

### Frontend
- Next.js
- TypeScript
- TailwindCSS
- Axios
- Context API

### Backend
- NestJS
- PostgreSQL
- TypeORM
- Cookie-based JWT authentication
- CORS configuration for secure cross-origin requests

---

## ✨ Features

- Secure authentication using HTTP-only cookies
- Role-based access control (Admin/User)
- Protected routes and middleware validation
- Event creation and management dashboard
- Centralized API layer with interceptors
- Persistent login state across refresh
- Fully deployed frontend and backend

---

## 🧠 Technical Highlights

- Implemented cookie-based authentication instead of localStorage for improved security
- Configured CORS to support credentials across different domains
- Designed modular backend architecture using NestJS controllers and services
- Structured scalable frontend folder architecture
- Managed global auth state using React Context
