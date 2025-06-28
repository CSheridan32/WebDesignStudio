# Overview

This is a full-stack web application built for a freelance web designer named Conall Sheridan. The application serves as a portfolio and business website targeting small businesses like cafés, salons, tradespeople, and small firms. It features a modern, accessible design with a contact form for lead generation.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **Styling**: Tailwind CSS with custom design tokens
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth animations and transitions

## Backend Architecture  
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API endpoints
- **Development**: Hot module replacement with Vite in development

## Build System
- **Frontend Build**: Vite for fast development and optimized production builds
- **Backend Build**: esbuild for server-side bundling
- **TypeScript**: Shared types and schemas across frontend/backend

# Key Components

## Database Schema
Located in `shared/schema.ts`:
- **Users table**: Basic user authentication (id, username, password)
- **Contact submissions table**: Stores form submissions (id, name, email, business, message, created_at)
- **Validation**: Zod schemas for type-safe data validation

## API Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact-submissions` - Retrieve all contact submissions (admin)

## Frontend Pages
- **Home page**: Single-page application with multiple sections
- **Navigation**: Smooth scrolling between sections
- **Sections**: Hero, Industries, Values, Services, Portfolio, About, Contact, Footer

## UI Components
- Custom design system with warm/neutral color palette
- Responsive design with mobile-first approach
- Accessible components using Radix UI primitives
- Form components with validation feedback

# Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on frontend
   - Form validation using React Hook Form + Zod
   - Data sent to `/api/contact` endpoint
   - Server validates and stores in PostgreSQL
   - Success/error feedback via toast notifications

2. **Admin Data Access**:
   - Contact submissions retrievable via `/api/contact-submissions`
   - Data fetched using TanStack Query for caching and error handling

3. **Development Workflow**:
   - Vite dev server serves frontend with HMR
   - Express server handles API requests
   - Shared TypeScript types ensure type safety

# External Dependencies

## Frontend Dependencies
- **UI Framework**: React, React DOM
- **Routing**: wouter
- **Styling**: Tailwind CSS, class-variance-authority, clsx
- **UI Components**: Multiple Radix UI packages, shadcn/ui components
- **Forms**: react-hook-form, @hookform/resolvers
- **State Management**: @tanstack/react-query
- **Validation**: zod, drizzle-zod
- **Animations**: framer-motion
- **Carousel**: embla-carousel-react
- **Utilities**: date-fns, cmdk

## Backend Dependencies
- **Server**: express, tsx (for TypeScript execution)
- **Database**: drizzle-orm, @neondatabase/serverless
- **Session**: express-session, connect-pg-simple
- **Build**: esbuild
- **Development**: vite, @replit/vite-plugin-runtime-error-modal

## Database
- **PostgreSQL**: Required for production (referenced in drizzle config)
- **Connection**: Uses DATABASE_URL environment variable
- **Migrations**: Managed through Drizzle Kit

# Deployment Strategy

## Production Build
- Frontend: `vite build` creates optimized static assets
- Backend: `esbuild` bundles server code into `dist/index.js`
- Static files served from `dist/public`

## Environment Setup
- **Development**: `npm run dev` starts both frontend and backend
- **Production**: `npm run start` runs the built application
- **Database**: Requires PostgreSQL connection via DATABASE_URL

## Replit Configuration
- Configured for Node.js 20, web, and PostgreSQL 16 modules
- Auto-deployment on push with build commands
- Port 5000 exposed as port 80 externally

## Storage Implementation
- **Development**: In-memory storage class for rapid development
- **Production**: PostgreSQL via Drizzle ORM
- Interface-based design allows easy switching between storage backends

# Deployment Issues and Solutions

## Static Deployment Configuration
The application is configured for static deployment in `.replit` but the current build process creates both frontend and backend outputs, causing deployment failures.

**Issue**: 
- Build creates both static files (dist/public) and Node.js server file (dist/index.js)
- Static deployment expects only static HTML/CSS/JS files in the dist directory
- No index.html found at dist root (files are in dist/public subdirectory)

**Solution Applied**:
- Created custom build scripts (build-frontend.js, quick-build.sh) that only build the frontend
- Scripts move static files from dist/public to dist root for proper static deployment
- Original build command in package.json builds both frontend and backend (kept for development)

# Changelog

Changelog:
- June 28, 2025: Fixed static deployment configuration and build process
- June 25, 2025: Initial setup

# User Preferences

Preferred communication style: Simple, everyday language.