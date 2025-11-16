# StudentFocus UI Guide

## Design System

### Visual Style
- **Rounded corners**: `rounded-2xl` (1rem) for cards and major elements
- **Soft shadows**: Subtle elevation with `shadow-sm` and custom soft shadows
- **Clean spacing**: Consistent padding and gaps using Tailwind's spacing scale
- **Modern student theme**: Bright, friendly colors with good contrast

### Color Coding
Categories are auto-colored for easy visual identification:
- **Mathematics**: Blue (`bg-blue-500`)
- **Physics**: Purple (`bg-purple-500`)
- **Chemistry**: Green (`bg-green-500`)
- **History**: Orange (`bg-orange-500`)
- **Spanish**: Pink (`bg-pink-500`)
- **Biology**: Teal (`bg-teal-500`)
- **English**: Indigo (`bg-indigo-500`)
- **Computer**: Cyan (`bg-cyan-500`)

## Pages Overview

### 1. Dashboard (`/dashboard`)
**Features:**
- 4 stat cards showing key metrics
- Today's tasks with quick checkbox toggle
- Upcoming exams list with importance badges
- Mini weekly calendar with task indicators
- AI Study Planner quick action card

**Key Components:**
- Stats cards with icons
- Task list with priority badges
- Exam cards with date and topics
- Week view with task dots
- Gradient CTA card for AI planner

### 2. Tasks (`/tasks`)
**Features:**
- Full CRUD operations via modals
- Advanced filtering (category, priority, due date)
- Sorting options
- Rich task cards with all metadata
- Calendar date picker for due dates

**Task Properties:**
- Title & description
- Due date (calendar picker)
- Priority (low/medium/high)
- Difficulty (easy/medium/hard)
- Category (auto-suggest from existing)
- Estimated time in minutes

**Filters:**
- By category
- By priority
- Sort by due date or priority
- Clear filters button

### 3. Calendar (`/calendar`)
**Features:**
- Weekly calendar view (8 AM - 9 PM)
- Study sessions displayed as colored blocks
- Tasks shown at top of each day
- Week navigation (previous/next)
- Time-based session placement
- Category color coding
- Recent sessions list

**Session Properties:**
- Subject & category
- Duration (minutes)
- Start time
- Date
- Notes

**Visual Elements:**
- Time slots (hourly grid)
- Color-coded session blocks
- Task indicators at day top
- Category legend
- Today highlighting

### 4. Study Plan (`/studyplan`)
**Features:**
- Multi-step form for plan generation
- Add multiple exams with topics
- Configure study hours per day
- Set date range
- AI-generated study plan (simulated)
- Previous plans history

**Exam Properties:**
- Subject
- Exam date (calendar picker)
- Topics (comma-separated)
- Importance level

**Plan Settings:**
- Hours available per day
- Start date
- End date
- Personal goals (optional)

**Generated Plan:**
- Week-by-week breakdown
- Daily schedule template
- Study tips
- Exam timeline
- Summary stats

## UI Components Used

### shadcn/ui Components
- `Card` - Main container for content sections
- `Button` - Actions and navigation
- `Input` - Text fields
- `Textarea` - Multi-line text
- `Select` - Dropdowns
- `Dialog` - Modals for create/edit
- `Badge` - Labels and tags
- `Calendar` - Date picker
- `Sidebar` - Navigation

### Icons (lucide-react)
- `CheckSquare` - Tasks
- `Calendar` - Dates and calendar
- `Clock` - Time and duration
- `Sparkles` - AI features
- `Plus` - Add actions
- `Edit` - Edit actions
- `Trash2` - Delete actions
- `Filter` - Filtering
- `Target` - Goals
- `TrendingUp` - Progress

## Responsive Design
- Mobile-first approach
- Grid layouts adapt to screen size
- Sidebar collapses on mobile
- Cards stack vertically on small screens
- Touch-friendly button sizes

## Interaction Patterns
- Hover effects on cards and buttons
- Smooth transitions
- Loading states (spinner on AI generation)
- Form validation
- Confirmation for destructive actions
- Toast notifications (can be added)

## Data Flow
- Zustand store for global state
- Mock data loaded on first render
- Real-time updates across pages
- Persistent state during session

## Future Enhancements
- Dark mode toggle
- Export study plans to PDF
- Notifications and reminders
- Progress tracking charts
- Study streak counter
- Pomodoro timer integration
- Collaboration features
- Mobile app version
