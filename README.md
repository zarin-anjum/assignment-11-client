# ContestHub 🏆

A modern, full-stack contest management platform where users can discover, participate in, and manage creative contests across categories like design, writing, gaming, and more.

## 🌐 Live Site

https://contesthub-zarin.netlify.app

## ✨ Features

- **Three Role System** — Separate dashboards and permissions for Normal Users, Contest Creators, and Admins. Each role sees only what's relevant to them.

- **Secure Authentication** — Email/password and Google Sign-in powered by Firebase Auth, with JWT tokens securing all private API routes on the backend.

- **Stripe Payment Integration** — Users pay a contest entry fee via Stripe's hosted checkout page. Participant count increases automatically after successful payment.

- **Live Countdown Timer** — Each contest detail page shows a real-time countdown to the deadline. Once the deadline passes, registration closes and the timer switches to "Contest Ended".

- **Role-Based Dashboards** — Creators can add, edit, and delete their contests (before approval), view all submissions, and declare a winner after the deadline. Admins can approve/reject contests and manage all user roles.

- **Contest Search & Filter** — Users can search contests by name or type from the home page hero or the All Contests page. Filter tabs by category (Image Design, Article Writing, Business Ideas, Gaming Review, Movie Review) update results instantly.

- **Leaderboard** — A dynamic leaderboard ranks all users by number of contest wins, with a top-3 podium display and a full ranked list below.

- **Winner Declaration System** — After a contest deadline, the creator can view all submitted tasks and declare one winner. The winner's name and photo then appear publicly on the contest details page.

- **Task Submission Modal** — Registered participants can submit their work via a modal with a textarea for submission links, available only after successful payment registration.

- **Dark / Light Theme** — A theme toggle in the navbar switches between dark and light mode. The user's preference is saved in localStorage and persists across page refreshes.

- **Pagination** — The Admin's Manage Contests table is paginated with 10 items per page, including smart page number display and previous/next navigation.

- **Fully Responsive** — The entire platform including all dashboards is fully responsive across mobile, tablet, and desktop screen sizes.

## 🛠️ Tech Stack

**Frontend:**
- React + Vite
- Tailwind CSS v4 + DaisyUI
- TanStack Query (data fetching)
- React Router DOM
- Firebase Authentication
- Framer Motion (animations)
- React Hook Form
- React Hot Toast
- Recharts (win percentage chart)
- Axios + Interceptors
- Stripe.js

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Stripe (payment)
- dotenv

## 📦 NPM Packages Used

- `@tanstack/react-query`
- `axios`
- `firebase`
- `framer-motion`
- `react-hook-form`
- `react-datepicker`
- `react-hot-toast`
- `recharts`
- `lucide-react`
- `stripe`
- `jsonwebtoken`
- `mongoose`
- `cors`
- `dotenv`


```
