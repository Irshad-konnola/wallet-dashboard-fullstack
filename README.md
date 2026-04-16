# 🏦 Wallet Dashboard App

A pixel-perfect, full-stack financial dashboard designed to manage multiple wallets, track bank accounts, and visualize cash flow in real-time. Built with a modern, high-performance tech stack emphasizing type safety, robust state management, and a premium dark-theme UI.

![Dashboard Preview](./frontend/public/preview.png)

## ✨ Key Features

- **Multi-Wallet Management:** Create, manage, and delete multiple localized wallets (e.g., Trading Wallet, Savings).
- **Secure Transactions:** Deposit and withdraw funds with atomic database transactions to ensure data integrity.
- **Bank Account Integration:** Link external bank accounts with real-time balance displays and dynamic formatting.
- **Interactive Analytics:** Visualize cash flow over time with responsive, custom-styled bar charts.
- **Real-time History:** Detailed transaction ledger featuring status indicators and precise timestamping.
- **Pixel-Perfect UI:** Built with Tailwind CSS v4 and Shadcn, featuring complex CSS Grid layouts, interactive hover states, and smooth modal transitions.

## 🛠️ Tech Stack

**Frontend**
- Next.js 15 (App Router & Turbopack)
- React 19
- Tailwind CSS v4
- Shadcn UI & Radix UI (Headless components)
- TanStack Query v5 (React Query for state management & caching)
- Axios (API Client)
- React Hook Form + Zod (Strict client-side validation)
- Recharts (Data visualization)

**Backend**
- Node.js & Express.js
- TypeScript
- Prisma ORM
- PostgreSQL (Relational database)
- Zod (Strict server-side payload validation)

## 🚀 Getting Started

### Prerequisites
Ensure you have the following installed:
- Node.js (v18+)
- PostgreSQL (Running locally or via a cloud provider like Neon/Supabase)

### 1. Backend Setup

Navigate to the backend directory:
\`\`\`bash
cd backend
\`\`\`

Install dependencies:
\`\`\`bash
npm install
\`\`\`

Create a `.env` file in the `backend` root and add your database connection string:
\`\`\`env
PORT=5000
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/wallet_db?schema=public"
\`\`\`

Run Prisma migrations to generate the database schema:
\`\`\`bash
npx prisma generate
npx prisma db push
\`\`\`

Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### 2. Frontend Setup

Open a new terminal and navigate to the frontend directory:
\`\`\`bash
cd frontend
\`\`\`

Install dependencies:
\`\`\`bash
npm install
\`\`\`

Create a `.env.local` file in the `frontend` root to connect to the backend:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
\`\`\`

Start the Next.js development server:
\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## 🏗️ Architecture Highlights

- **Optimistic UI Updates:** TanStack Query is configured to instantly invalidate and refetch wallet, transaction, and chart data upon successful mutations, ensuring the UI is never out of sync with the database.
- **Type-Safe Pipeline:** Data is validated using Zod at the frontend form level, passed through TypeScript interfaces via Axios, re-validated by Zod at the Express router level, and finally enforced by Prisma's schema before hitting the database.
- **Atomic Money Movement:** Deposit and withdrawal endpoints utilize Prisma transactions to guarantee that wallet balances and transaction ledgers are updated simultaneously, preventing phantom money generation on failure.