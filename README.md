# 💍 Luxury Digital Wedding Invitation & Admin Suite

A digital wedding invitation web application built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS**, **Three.js / React Three Fiber**, **Framer Motion**, and **Prisma ORM**.

---

## ✨ Features

### 💌 Public Invitation Experience
- **Interactive Cover Gate**: Calligraphic script wedding title, personalized recipient badge (`?to=Guest+Name` or `/invite/[slug]`), and confetti open transition with background audio playback.
- **3D Wedding Visual Background**: Dual-hue 3D floating rose & silk ivory petals, interlocking golden wedding rings, and champagne gold dust with smooth mouse parallax.
- **Bidirectional Scroll Animations (AOS)**: Seamless entrance animations re-triggered smoothly on both scroll-down and scroll-up.
- **Bride & Groom Profile**: Arch portrait frames, gold ring accents, and biblical blessing.
- **Event Schedule & Calendar Integration**: Holy Matrimony, Reception, and Blessing schedule with 1-click **Add to Google Calendar** and **Google Maps** venue routing.
- **Love Story Timeline**: Interactive milestone chronology.
- **Bento Photo Gallery**: Pre-wedding album with category filter tabs and fullscreen Lightbox modal.
- **Interactive RSVP System**: Confirmation of attendance, event session choice, guest pax selector, instant celebratory confetti, and anti-duplicate collision protection.
- **Wishes & Blessings Guestbook**: Live message wall (capped at 6 comments by default with *Show All / Show Less* toggle) and heart reactions.
- **Digital Envelope & Gift Registry**: Bank account copy with toast feedback and QRIS barcode zoom modal.

### 🛡️ Admin Management Portal (`/admin`)
- **Protected Authentication**: Cookie-based session token with brute-force rate limiter.
- **Guest Link Generator**: Custom link generator with instant WhatsApp invitation template sharing.
- **Real-Time RSVP Analytics**: Attendance statistics breakdown with Recharts pie charts.
- **Guestbook Wishes Moderation**: Approve or delete guest prayers and blessings.

### 🔒 Security & Performance
- **Sliding Window Rate Limiter**: Brute-force login protection (5 attempts / 15 min), RSVP protection (10 submissions / 5 min), and wishes protection (5 wishes / 5 min).
- **Anti-XSS Input Sanitization**: Script stripping, length truncation, and data sanitization.
- **Race Condition & Collision Handling**: Safe upsert handling for RSVPs and unique slugs.
- **HTTP Security Headers**: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `X-XSS-Protection`, and `Permissions-Policy`.

---

## 🚀 Quick Start

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/RivaldiYN/wedding-web.git
cd wedding-web
npm install
```

### 2. Environment Variables
Copy `.env.example` to `.env`:
```env
DATABASE_URL="file:./wedding.db"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```

### 3. Initialize Database
```bash
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the wedding invitation or [http://localhost:3000/admin](http://localhost:3000/admin) to access the admin portal.

---

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (Turbopack) & React 19
- **3D Graphics**: Three.js & `@react-three/fiber`
- **Animations**: Framer Motion & Canvas Confetti
- **Styling**: Tailwind CSS & Vanilla CSS Design Tokens
- **Database & ORM**: Prisma (SQLite / PostgreSQL / Appwrite compatible)
- **Icons**: Lucide Icons
- **Analytics Charts**: Recharts
