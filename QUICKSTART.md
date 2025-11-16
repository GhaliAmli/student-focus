# Quick Start Guide

## Run the Project

```bash
cd student-focus
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you'll be redirected to the dashboard.

## Project Overview

### Pages

1. **Dashboard** (`/dashboard`)
   - Overview of all your study activities
   - Stats cards showing tasks, sessions, study time, and plans
   - Quick view of recent tasks

2. **Tasks** (`/tasks`)
   - Create and manage study tasks
   - Set priorities (low, medium, high)
   - Mark tasks as complete
   - Delete tasks

3. **Calendar** (`/calendar`)
   - Log study sessions with subject and duration
   - View monthly calendar with session indicators
   - Track recent study sessions

4. **Study Plan** (`/studyplan`)
   - Create comprehensive study plans
   - Set goals for each plan
   - Track start and end dates

### Key Technologies

- **Zustand**: Global state management (see `lib/store.ts`)
- **date-fns**: Date formatting and manipulation
- **shadcn/ui**: Pre-built, accessible UI components
- **TailwindCSS**: Utility-first styling
- **TypeScript**: Type safety throughout

### Folder Structure

```
app/              → Pages (Next.js App Router)
components/
  ├── ui/         → shadcn/ui components
  └── layout/     → Layout components (sidebar)
lib/
  ├── store.ts    → Zustand state management
  └── utils.ts    → Utility functions
types/            → TypeScript type definitions
data/             → Mock data for development
```

### State Management

The app uses Zustand for state management. Check `lib/store.ts` to see:
- Task management (add, toggle, delete)
- Study session tracking
- Study plan creation

### Customization

- **Colors**: Edit `app/globals.css` for theme colors
- **Components**: All UI components are in `components/ui/`
- **Types**: Add new types in `types/index.ts`
- **Store**: Extend state in `lib/store.ts`

## Next Steps

1. Add authentication (NextAuth.js)
2. Connect to a database (Prisma + PostgreSQL)
3. Add more features (notes, reminders, analytics)
4. Deploy to Vercel

Enjoy building with StudentFocus! 🎓
