# 🎓 StudentFocus - Start Here

Welcome to StudentFocus! Your complete study management application is ready to use.

## 🚀 Quick Start

### 1. Start the Development Server
```bash
cd student-focus
npm run dev
```

### 2. Open Your Browser
Navigate to: **http://localhost:3000**

You'll be automatically redirected to the Dashboard!

## 📱 What You'll See

### Dashboard (Home Page)
- **4 Stat Cards**: Today's tasks, upcoming exams, study time, completion rate
- **Today's Tasks**: Quick view with checkbox toggles
- **Upcoming Exams**: Next 3 exams with dates and importance
- **Mini Calendar**: This week's overview with task indicators
- **AI Study Planner**: Quick access button to generate study plans

### Tasks Page
Click "Tasks" in the sidebar to:
- ✅ View all your tasks
- ➕ Add new tasks (click "Add Task" button)
- ✏️ Edit existing tasks (click edit icon)
- 🗑️ Delete tasks (click trash icon)
- 🔍 Filter by category or priority
- 📊 Sort by due date or priority

**Try it**: Click "Add Task" and create your first task!

### Calendar Page
Click "Calendar" in the sidebar to:
- 📅 View weekly schedule (8 AM - 9 PM)
- 📝 See study sessions as colored blocks
- ✅ View tasks at the top of each day
- ⏮️ Navigate between weeks
- ➕ Log new study sessions

**Try it**: Click "Log Session" to record a study session!

### Study Plan Page
Click "Study Plan" in the sidebar to:
- 📚 Add your upcoming exams
- ⏰ Set your available study hours per day
- 📆 Choose your study period
- ✨ Generate an AI-powered study plan
- 📋 View previous plans

**Try it**: Add an exam and click "Generate My Study Plan"!

## 🎨 Design Features

### Visual Style
- **Rounded corners**: Everything uses `rounded-2xl` for a modern look
- **Soft shadows**: Subtle elevation effects
- **Clean spacing**: Consistent padding and gaps
- **Color coding**: Each subject has its own color

### Category Colors
- 🔵 Mathematics - Blue
- 🟣 Physics - Purple
- 🟢 Chemistry - Green
- 🟠 History - Orange
- 🩷 Spanish - Pink
- 🔷 Biology - Teal
- 🟦 English - Indigo
- 🔵 Computer - Cyan

### Responsive Design
- Works on desktop, tablet, and mobile
- Sidebar collapses on small screens
- Touch-friendly buttons
- Adaptive layouts

## 📊 Sample Data

The app comes pre-loaded with sample data:
- **5 tasks** across different subjects
- **3 upcoming exams**
- **3 study sessions**

You can:
- ✅ Toggle task completion
- ✏️ Edit any item
- 🗑️ Delete items
- ➕ Add new items

All changes are stored in memory (Zustand state) during your session.

## 🎯 Key Features

### Task Management
- Create tasks with title, description, due date
- Set priority (low/medium/high)
- Set difficulty (easy/medium/hard)
- Categorize by subject
- Estimate time needed
- Filter and sort

### Calendar View
- Weekly time-based view
- Color-coded sessions
- Task indicators
- Easy navigation
- Session logging

### AI Study Planner
- Add multiple exams
- Configure study hours
- Set date ranges
- Generate personalized plans
- Week-by-week breakdown
- Study tips included

## 🔧 Technical Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **UI Components**: shadcn/ui
- **State Management**: Zustand
- **Date Handling**: date-fns
- **Icons**: lucide-react

## 📁 Project Structure

```
student-focus/
├── app/              # Pages (Dashboard, Tasks, Calendar, Study Plan)
├── components/       # UI components and layout
├── lib/             # Store and utilities
├── types/           # TypeScript definitions
├── data/            # Mock data
└── public/          # Static assets
```

## 🎓 Usage Tips

### For Best Results:
1. **Start with Tasks**: Add your assignments and deadlines
2. **Log Sessions**: Track your study time in the calendar
3. **Plan Ahead**: Use the AI planner for exam preparation
4. **Stay Organized**: Use categories consistently
5. **Check Dashboard**: Review your progress daily

### Workflow Example:
1. Open Dashboard to see today's tasks
2. Complete tasks and check them off
3. Log study sessions in Calendar
4. When exams approach, create a Study Plan
5. Follow the generated plan
6. Track progress on Dashboard

## 🚀 Next Steps

### Immediate:
- Explore all pages
- Add your real tasks
- Try the AI study planner
- Customize categories

### Future Enhancements:
- Add backend database
- Implement authentication
- Real AI integration
- Export to PDF
- Mobile app
- Notifications
- Dark mode

## 📚 Documentation

- **README.md**: Project overview
- **QUICKSTART.md**: Quick start guide
- **FEATURES.md**: Complete feature list
- **UI-GUIDE.md**: Design system details
- **PROJECT-STRUCTURE.md**: File organization

## 🆘 Need Help?

### Common Issues:

**Port already in use?**
```bash
# Kill the process on port 3000
npx kill-port 3000
# Then restart
npm run dev
```

**Dependencies issue?**
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Build errors?**
```bash
# Clean build
rm -rf .next
npm run build
```

## ✨ Enjoy StudentFocus!

You now have a fully functional study management application. Start organizing your studies and boost your productivity!

**Happy Studying! 📚✨**
