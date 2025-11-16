# StudentFocus - Project Structure

```
student-focus/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with sidebar
│   ├── page.tsx                 # Redirects to /dashboard
│   ├── globals.css              # Global styles + Tailwind
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard with stats & overview
│   ├── tasks/
│   │   └── page.tsx            # Task management with CRUD
│   ├── calendar/
│   │   └── page.tsx            # Weekly calendar view
│   └── studyplan/
│       └── page.tsx            # AI study plan generator
│
├── components/
│   ├── ui/                      # shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── badge.tsx
│   │   ├── textarea.tsx
│   │   ├── calendar.tsx
│   │   ├── sidebar.tsx
│   │   ├── scroll-area.tsx
│   │   ├── separator.tsx
│   │   ├── sheet.tsx
│   │   ├── skeleton.tsx
│   │   └── tooltip.tsx
│   └── layout/
│       └── app-sidebar.tsx      # Main navigation sidebar
│
├── lib/
│   ├── store.ts                 # Zustand state management
│   └── utils.ts                 # Utility functions (cn, etc.)
│
├── types/
│   └── index.ts                 # TypeScript type definitions
│                                # - Task, Exam, StudySession, StudyPlan
│
├── data/
│   └── mockData.ts              # Mock data for development
│                                # - Sample tasks, exams, sessions
│                                # - Category color mapping
│
├── hooks/
│   └── use-mobile.ts            # Mobile detection hook
│
├── public/                      # Static assets
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── node_modules/                # Dependencies
│
├── .next/                       # Next.js build output
│
├── .git/                        # Git repository
│
├── components.json              # shadcn/ui configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── postcss.config.mjs           # PostCSS configuration
├── eslint.config.mjs            # ESLint configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── package.json                 # Dependencies & scripts
├── package-lock.json            # Locked dependencies
├── .gitignore                   # Git ignore rules
│
├── README.md                    # Project overview
├── QUICKSTART.md                # Quick start guide
├── FEATURES.md                  # Feature summary
├── UI-GUIDE.md                  # UI design guide
└── PROJECT-STRUCTURE.md         # This file
```

## Key Files Explained

### App Router Pages
- **`app/layout.tsx`**: Root layout with sidebar navigation
- **`app/dashboard/page.tsx`**: Main dashboard with stats and overview
- **`app/tasks/page.tsx`**: Task management with full CRUD operations
- **`app/calendar/page.tsx`**: Weekly calendar with study sessions
- **`app/studyplan/page.tsx`**: AI study plan generator

### State Management
- **`lib/store.ts`**: Zustand store with actions for tasks, exams, sessions, and plans

### Type Definitions
- **`types/index.ts`**: TypeScript interfaces for all data models

### Mock Data
- **`data/mockData.ts`**: Sample data for development and testing

### Components
- **`components/ui/`**: Pre-built shadcn/ui components
- **`components/layout/app-sidebar.tsx`**: Navigation sidebar

## Dependencies

### Core
- `next@16.0.3` - React framework
- `react@19.2.0` - UI library
- `typescript@^5` - Type safety

### State & Data
- `zustand@^5.0.8` - State management
- `date-fns@^4.1.0` - Date utilities

### Forms & Validation
- `react-hook-form@^7.66.0` - Form handling
- `zod@^4.1.12` - Schema validation
- `@hookform/resolvers@^5.2.2` - Form resolvers

### UI Components
- `@radix-ui/*` - Headless UI primitives
- `lucide-react@^0.553.0` - Icons
- `tailwindcss@^4` - Styling
- `class-variance-authority@^0.7.1` - Component variants
- `tailwind-merge@^3.4.0` - Class merging

### Dev Dependencies
- `@types/*` - TypeScript types
- `eslint` - Code linting
- `@tailwindcss/postcss` - PostCSS plugin

## Scripts

```json
{
  "dev": "next dev",           // Start development server
  "build": "next build",       // Build for production
  "start": "next start",       // Start production server
  "lint": "eslint"            // Run linter
}
```

## Environment

- **Node.js**: v18+ recommended
- **Package Manager**: npm
- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS v4
- **TypeScript**: v5

## Build Output

Production build creates:
- Static pages for all routes
- Optimized JavaScript bundles
- CSS with Tailwind utilities
- Type-checked code

All pages are pre-rendered as static content for optimal performance.
