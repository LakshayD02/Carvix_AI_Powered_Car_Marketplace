# Carvix - AI-Powered Car Marketplace

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)
![Clerk](https://img.shields.io/badge/Clerk-Auth-8A2BE2?style=for-the-badge)
![Gemini AI](https://img.shields.io/badge/Gemini-AI-FF6B00?style=for-the-badge)

A modern, full-stack SaaS platform revolutionizing car buying with AI-powered image search, automated data extraction, and seamless test drive booking.

## 🚀 Project Purpose

Carvix aims to build a modern, full-stack SaaS platform for car buyers and dealerships that leverages cutting-edge AI technologies, secure and scalable architecture, and an intuitive user interface. The platform enhances the car buying experience by enabling AI-powered image search, detailed car information extraction, real-time test drive booking, and comprehensive admin management — all wrapped in a highly secure and scalable solution.

Deployed Link - https://carvix-ai-lakshay.vercel.app/

## Features of Carvix

- The platform includes an AI car search feature that allows users to upload images of cars to find similar vehicles available in the marketplace.
- Advanced filtering options are available by make, model, price range, and detailed car specifications are provided on individual car pages.
- Additional functionalities include high-quality image galleries and an interactive EMI calculator to assist buyers in making informed financial decisions.
- Users can book test drives with real-time availability slots from dealerships, along with automated confirmations to streamline the process.
- The admin dashboard features powerful analytics, full car inventory management, user test drive management, and an AI-powered car detail extractor that minimizes manual data entry by automatically populating car details from uploaded images.

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn UI** - Beautifully designed components

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Relational database

### APIs & Services
- **Gemini API** - AI-powered image recognition and car detail extraction
- **Clerk Authentication** - User authentication and management
- **Arcjet** - Bot protection and rate limiting

## ✨ Detailed Key Features

### 🤖 AI Car Search
- Upload car images to find visually similar cars in the inventory
- Dynamic URL updates enable sharing specific search results
- Advanced filtering by make, model, price, and detailed specifications

### 📋 Detailed Car Pages & Financial Tools
- High-quality image galleries and comprehensive car specs
- Interactive EMI calculator for financing insights
- Seamless booking of test drives with real-time availability

### 📅 Test Drive Booking & Management
- Real-time test drive slot booking with automated confirmations
- Admin dashboard to manage bookings, confirm, or cancel reservations

### 📊 Admin Dashboard & Analytics
- Overview of sales, conversion rates, test drive statistics
- Full inventory management with AI-powered car detail extraction
- User management and role-based access controls

### 🔐 User Authentication & Security
- Secure sign-up/sign-in via Clerk
- Middleware protects private routes
- Rate limiting, email validation, and bot protection via Arcjet

### 🎨 Modern UI/UX
- Built with Next.js and Shadcn UI for responsive, customizable interface
- Professional landing page with AI image search, text search, FAQs, and CTAs

### 🗄️ Robust Backend & Database
- Supabase provides scalable, realtime backend
- Prisma ORM manages relational data models

## 🎯 Uses and Real-Time Applications

- **For Buyers:** Easily find cars by image or detailed search, calculate financing, and book test drives instantly
- **For Dealerships:** Quickly upload and manage inventory with AI-powered data extraction, monitor sales and bookings via analytics
- **For Admins:** Efficiently oversee operations, manage users and bookings, and scale the platform
- **Security & Scalability:** Reliable platform with protection against abuse and capacity to handle growing users

## 📊 Comparison With Existing Solutions

| Feature / Aspect | Carvix Solution | Existing Solutions |
| ---------------- | --------------- | ------------------ |
| **AI Image Search** | Gemini API-powered advanced car image recognition | Basic or no AI image search |
| **AI Car Detail Extraction** | Automatic extraction of car details from uploaded images | Mostly manual data entry |
| **Security & Rate Limiting** | Arcjet integration for bot protection and rate limiting | Limited or no dedicated security layers |
| **Frontend Framework** | Next.js + Shadcn UI for modern, customizable UI | Proprietary or less flexible UI frameworks |
| **Backend & Database** | Supabase + Prisma for realtime, scalable backend | Legacy or closed-source backends |
| **Admin Dashboard Features** | Real-time analytics, AI data extraction, test drive management | Basic inventory and booking management |
| **User Interaction & Tools** | EMI calculator, real-time test drive booking | Often manual or external tools |
| **User Authentication & Security** | Clerk integration with middleware for route protection | Custom or less secure authentication |
| **Scalability & Multi-Tenancy** | Designed for multiple dealerships, extensible SaaS model | Usually single dealership focus |

## 💡 Why Build This Website?

- **Modernize the car buying experience** with AI-driven search, automation, and seamless user flows
- **Empower dealerships** with tools that reduce manual work and improve customer engagement
- **Demonstrate a full-stack, scalable SaaS application** with modern technologies
- **Offer a scalable platform** capable of supporting multiple dealerships
- **Differentiate from competitors** by combining AI, security, and user experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account
- Clerk account
- Gemini API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/carvix.git
cd carvix
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
```

4. Configure environment variables
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_url
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
ARCJET_KEY=your_arcjet_key
GEMINI_API_KEY=your_gemini_api_key
```

5. Set up the database
```bash
npx prisma generate
npx prisma migrate dev
```

6. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

```
carvix/
├── actions/                 # Server actions
├── app/                    # Next.js app router pages
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility libraries and configurations
├── prisma/                 # Database schema and migrations
├── public/                 # Static assets
├── .gitattributes          # Git attributes configuration
├── .gitignore             # Git ignore rules
├── README.md              # Project documentation
├── components.json        # UI components configuration
├── eslint.config.mjs      # ESLint configuration
├── jsconfig.json          # JavaScript configuration
├── middleware.js          # Next.js middleware
├── next.config.mjs        # Next.js configuration
├── package-lock.json      # NPM package lock
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── postcss.config.mjs     # PostCSS configuration (ES modules)
└── tailwind.config.mjs    # Tailwind CSS configuration
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx prisma studio` - Open Prisma Studio for database management

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed on any platform that supports Next.js:
- Netlify
- AWS Amplify
- Railway
- Render
- DigitalOcean App Platform
