# 🎟️ [TicketLive — Frontend](https://ticket-live-front.vercel.app)

> A frontend application built with **Next.js** and **TypeScript** that serves as the user interface for **TicketLive**, an event ticketing platform. Built with modern React practices, a scalable architecture, and configured for deployment on Vercel.

---

<!-- TO BE UPDATED WITH SCREENSHOTS OF THE PROJECT
## 📸 Screenshots

> _Add screenshots of the platform here — e.g. the event listing page, ticket purchase flow, user dashboard, and admin panel._

---
-->

## ✨ Features

- **Event Browsing** — Explore available events with detailed ticket information
- **Authentication** — Sign up, log in, and manage user sessions
- **Shopping Cart** — Add tickets and proceed through the checkout flow
- **Payments** — Integrated payment processing with MercadoPago
- **Coupon & Discount System** — Apply promo codes at checkout
- **User Dashboard** — View purchased tickets, favorites, and profile settings
- **Admin Panel** — Manage events, users, and platform data
- **Favorites** — Save and revisit preferred events
- **Testimonials** — User reviews and social proof section
- **Help Center & Contact** — Support pages for users
- **Interactive Maps** — Event location maps powered by MapTiler
- **AI Chatbot** — Intelligent assistant powered by Groq to help users find events and get support
- **Responsive UI** — Mobile-first design with a consistent component library

---

## 🛠️ Tech Stack

| Layer        | Technology                              |
|--------------|-----------------------------------------|
| Framework    | Next.js (App Router), React, TypeScript |
| Styling      | Tailwind CSS, PostCSS                   |
| State        | React Context API                       |
| Validation   | Yup validators                          |
| Payments     | MercadoPago                             |
| Maps         | MapTiler                                |
| AI Chatbot   | Groq                                    |
| Deployment   | Vercel                                  |

---

## 📁 Project Structure

```
TicketLive-Front/
├── public/                      # Static assets
│   ├── icons/                   # Icon files
│   └── *.svg                    # SVG assets (globe, next, vercel, window)
│
├── src/
│   ├── app/                     # Next.js App Router — pages & layouts
│   │   ├── admin/               # Admin panel
│   │   ├── api/                 # API route handlers
│   │   ├── auth/                # Authentication pages
│   │   ├── cart/                # Shopping cart
│   │   ├── contact/             # Contact page
│   │   ├── dashboard/           # User dashboard
│   │   ├── events/              # Event listing & detail pages
│   │   ├── favoritos/           # Favorites
│   │   ├── help-center/         # Help & support
│   │   ├── login/               # Login page
│   │   ├── mis-boletos/         # My tickets
│   │   ├── payments/            # Payment flow
│   │   ├── privacy/             # Privacy policy
│   │   ├── profile/             # User profile
│   │   ├── promociones/         # Promotions & discounts
│   │   ├── register/            # Registration page
│   │   ├── security/            # Security settings
│   │   ├── success/             # Post-purchase success page
│   │   ├── terms/               # Terms & conditions
│   │   ├── testimonios/         # Testimonials
│   │   ├── tickets-info/        # Ticket information
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Home page
│   │
│   ├── components/              # Reusable UI components
│   │   ├── cart/
│   │   ├── coupons/
│   │   ├── favorites/
│   │   ├── forms/
│   │   ├── guards/              # Route protection components
│   │   ├── imageUpload/
│   │   ├── landing/
│   │   ├── layout/              # Header, footer, nav
│   │   ├── maps/
│   │   ├── profile/
│   │   ├── testimonials/
│   │   └── ui/                  # Base UI elements
│   │
│   ├── contexts/                # Global React context providers
│   │   ├── AuthContext.tsx
│   │   ├── CartContext.tsx
│   │   ├── FavoritesContext.tsx
│   │   └── TicketsContext.tsx
│   │
│   ├── data/                    # Static/mock data
│   ├── hooks/                   # Custom React hooks
│   ├── interfaces/              # TypeScript interfaces & types
│   ├── lib/                     # Third-party library setup
│   ├── services/                # API call functions
│   ├── utils/                   # Utility functions
│   └── validators/              # Form validation logic
│
├── next.config.ts
├── vercel.json
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/)

---

### 1. Clone the Repository

```bash
git clone https://github.com/1LuisVargas/TicketLive-Front.git
cd TicketLive-Front
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Configure Environment Variables

Create a `.env.local` file in the root of the project and fill in your values:

```env
# API Keys
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXT_PUBLIC_MAPTILER_API_KEY=your_maptiler_api_key
GROQ_API_KEY=your_groq_api_key

# Crons
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
```

---

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3005`.

> **Tip:** Make sure the TicketLive backend API is running so that all data fetching and authentication flows work correctly.

---

## 🔌 API

For available API endpoints, refer to the [TicketLive-Back](https://github.com/1LuisVargas/TicketLive-Back) repository or directly into the [swagger documentation](https://ticketlive-back.onrender.com/api).

---

## 🚀 Deployment

This project is configured for deployment on **Vercel**. Push to your connected branch and Vercel will handle the build automatically.

```bash
npm run build   # Build for production
npm start       # Start the production server locally
```

---

## 👤 Authors

**Luis Vargas**
- GitHub: [@1LuisVargas](https://github.com/1LuisVargas)
- LinkedIn: [@1LuisVargas](https://www.linkedin.com/in/1luisvargas/)

**Fabrizio Pascual**
- GitHub: [@Fabrizio-Pascual](https://github.com/Fabrizio-Pascual)

**Lenoardo Sadoux**
- GitHub: [@LSadoux](https://github.com/LSadoux)

**Day Torres**
- GitHub: [@day2555](https://github.com/day2555)
