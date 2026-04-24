# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Knowledge is a full-stack application for storing and managing knowledge "nuggets" (short knowledge entries). It consists of a React frontend and an Express backend with Supabase as the database.

## Commands

### Frontend (./frontend)
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production (`tsc -b && vite build`)
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Backend (./backend)
- `npm run dev` - Start Express server with nodemon (runs on port 8080)

## Architecture

### Frontend Architecture
- **Framework**: React 19 + TypeScript + Vite
- **State Management**: React Query (@tanstack/react-query) for server state
- **UI Library**: Radix UI Themes
- **Routing**: React Router v7
- **Styling**: SCSS modules

**Feature-based structure** (`frontend/src/features/`):
- `nugget/` - Core feature with sub-features: `createNugget`, `editNugget`, `deleteNugget`, plus `components`, `api`, `models`
- `ui/` - Reusable UI components (Modal, Toast, Tooltip, etc.)
- `pagination/` - Pagination utilities

**Data flow**: Components → React Query hooks (in feature/api/) → Axios → Backend API

### Backend Architecture
- **Framework**: Express 5 + TypeScript
- **Database**: Supabase (PostgreSQL)
- **AI Integration**: OpenRouter API for nugget verification and explanations

**Layered architecture** (`backend/src/`):
```
Routes → Controllers → Services → DAO
```

- `routes/nuggets-routes.ts` - Express router with endpoint definitions
- `controllers/nuggets-controllers.ts` - Request handling, validation, response formatting
- `services/nuggets-service.ts` - Business logic
- `dao/nuggets-dao.ts` - Supabase database operations
- `services/ai-verification-service.ts` - OpenRouter AI integration

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/nuggets?page=&limit=` | Paginated nuggets list |
| GET | `/api/nuggets/:id` | Single nugget by ID |
| POST | `/api/nuggets` | Create new nugget |
| POST | `/api/nuggets/verify` | AI verification of nugget content |
| POST | `/api/nuggets/explain` | AI explanation of nugget |
| PUT | `/api/nuggets/:id` | Update nugget |
| DELETE | `/api/nuggets/:id` | Delete nugget |

## Environment Variables

**Backend** (`.env` - not committed):
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `OPENROUTER_API_KEY` - OpenRouter API key for AI features
- `OPENROUTER_MODEL` - AI model identifier (e.g., `x-ai/grok-4.1-fast`)

## Type Definitions

Note: There's a mismatch between frontend and backend type definitions:
- Frontend `Nugget` uses: `id: string, title, content, tags[]`
- Backend `Nugget` uses: `id: number, name, description, price` (legacy schema)

The backend DAO queries Supabase directly, so the actual database schema should be verified in Supabase.
