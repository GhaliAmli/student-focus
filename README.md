<div align="center">

# 🎓 StudentFocus

### Your Ultimate Study Companion

A modern, feature-rich productivity platform designed specifically for students to manage tasks, track progress, and achieve academic excellence.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black)](https://vercel.com)

[Demo](#-demo) • [Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## 📖 About

StudentFocus is a comprehensive study management platform that helps students organize their academic life with ease. Built with modern web technologies, it offers an intuitive interface for task management, progress tracking, and productivity enhancement.

Whether you're managing assignments, preparing for exams, or planning your study schedule, StudentFocus provides all the tools you need in one beautiful, responsive application.

---

## ✨ Features

### 📊 **Dashboard**
- Real-time overview of tasks, progress, and achievements
- Visual analytics with interactive charts
- Quick access to upcoming deadlines
- Gamification with points, badges, and streaks

### ✅ **Task Management**
- Create, edit, and organize tasks with ease
- Priority levels (Low, Medium, High)
- Due date tracking with calendar integration
- Task filtering and sorting
- Drag-and-drop support

### 📋 **Kanban Board**
- Visual task organization with 3 columns (To Do, In Progress, Completed)
- Smooth drag-and-drop functionality
- Real-time status updates
- Task counters per column
- Fully synchronized with task manager

### 📅 **Calendar View**
- Monthly calendar with task visualization
- Color-coded events by subject
- Quick task creation from calendar
- Deadline tracking

### 📈 **Analytics**
- Detailed productivity statistics
- Progress tracking over time
- Subject-wise performance analysis
- Interactive charts and graphs

### 🎯 **Study Planner**
- AI-powered study plan generation
- Customizable study schedules
- Exam preparation tracking
- Goal setting and monitoring

### 🎮 **Gamification**
- Earn points for completing tasks
- Unlock achievement badges
- Maintain study streaks
- Level progression system

### ⌨️ **Keyboard Shortcuts**
- Customizable shortcuts for quick navigation
- Speed up your workflow
- Visual shortcut editor
- Persistent preferences

### 🎓 **Interactive Tutorial**
- Step-by-step onboarding guide
- Element highlighting
- Smart positioning
- Skip and replay options

### 💬 **Feedback System**
- Built-in feedback form
- Bug reporting
- Feature suggestions
- Direct communication channel

### 🎨 **Customization**
- Light and dark themes
- Accent color selection
- Notification preferences
- Personalized settings

### 🎮 **Easter Eggs**
- Konami Code surprise (↑↑↓↓←→←→BA)
- Confetti animations
- Spooky Halloween theme
- Fun discoveries throughout the app

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Animations:** Framer Motion, canvas-confetti

### **State Management**
- **Global State:** Zustand
- **Local Storage:** Browser localStorage
- **Form Handling:** React Hook Form

### **Data Visualization**
- **Charts:** Recharts
- **Calendar:** React Calendar
- **Date Handling:** date-fns

### **Drag & Drop**
- **Library:** @dnd-kit
- **Features:** Sortable, Draggable, Droppable

### **Development Tools**
- **Package Manager:** npm
- **Linting:** ESLint
- **Formatting:** Prettier
- **Build Tool:** Turbopack

---

## 🎬 Demo

### Live Demo
🔗 [View Live Demo](https://your-demo-link.vercel.app)

### Screenshots

<div align="center">

#### Dashboard
![Dashboard](./docs/screenshots/dashboard.png)

#### Task Manager
![Tasks](./docs/screenshots/tasks.png)

#### Kanban Board
![Kanban](./docs/screenshots/kanban.png)

#### Analytics
![Analytics](./docs/screenshots/analytics.png)

</div>

---

## 🚀 Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Steps

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/studentfocus.git
cd studentfocus
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Run the development server**
```bash
npm run dev
# or
yarn dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
student-focus/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Dashboard page
│   ├── tasks/                   # Task management page
│   ├── kanban/                  # Kanban board page
│   ├── calendar/                # Calendar view page
│   ├── analytics/               # Analytics page
│   ├── studyplan/               # Study planner page
│   ├── settings/                # Settings pages
│   │   ├── developers/          # Keyboard shortcuts
│   │   └── help/                # Help & tutorial
│   ├── credits/                 # Credits page
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── layout/                  # Layout components
│   │   └── app-sidebar.tsx      # Navigation sidebar
│   ├── ui/                      # UI components (shadcn/ui)
│   ├── task-form.tsx            # Task creation form
│   ├── tutorial-overlay.tsx     # Interactive tutorial
│   ├── keyboard-shortcuts-manager.tsx
│   ├── feedback-button.tsx      # Feedback form
│   ├── konami-easter-egg.tsx    # Easter egg component
│   └── clear-data-dialog.tsx    # Data management
│
├── hooks/                        # Custom React hooks
│   ├── use-keyboard-shortcuts.ts
│   ├── use-tutorial.ts
│   └── use-konami-code.ts
│
├── lib/                          # Utilities and libraries
│   ├── store.ts                 # Zustand store
│   └── utils.ts                 # Helper functions
│
├── types/                        # TypeScript type definitions
│   ├── index.ts                 # Main types
│   ├── shortcuts.ts             # Shortcut types
│   ├── tutorial.ts              # Tutorial types
│   └── feedback.ts              # Feedback types
│
├── public/                       # Static assets
│
└── docs/                         # Documentation
    ├── FEATURES-SUMMARY.md
    ├── KANBAN-BOARD-FEATURE.md
    ├── TUTORIAL-POSITIONING-GUIDE.md
    └── IMPLEMENTATION-COMPLETE.md
```

---

## 📚 Usage

### Dashboard

The dashboard is your central hub for all activities:

1. **Overview Cards** - View task counts, study hours, and achievements
2. **Progress Charts** - Track your productivity over time
3. **Recent Tasks** - Quick access to your latest tasks
4. **Upcoming Deadlines** - Never miss an important date
5. **Gamification Stats** - See your points, badges, and streaks

### Task Manager

Efficiently manage all your academic tasks:

1. **Create Tasks** - Click "Add Task" or press `Ctrl + N`
2. **Set Priority** - Choose Low, Medium, or High
3. **Add Details** - Subject, due date, difficulty, and tags
4. **Filter & Sort** - Find tasks quickly with smart filters
5. **Complete Tasks** - Check off completed items
6. **Edit/Delete** - Modify or remove tasks as needed

### Kanban Board

Visual task organization made simple:

1. **Navigate** - Click "Kanban" in the sidebar
2. **View Columns** - To Do, In Progress, Completed
3. **Drag & Drop** - Move tasks between columns to update status
4. **Add Tasks** - Click "Add Task" to create new items
5. **Track Progress** - See task counts per column

### Keyboard Shortcuts

Speed up your workflow with custom shortcuts:

**Default Shortcuts:**
- `Ctrl + D` - Go to Dashboard
- `Ctrl + T` - Go to Tasks
- `Ctrl + C` - Go to Calendar
- `Ctrl + A` - Go to Analytics
- `Ctrl + N` - Create New Task
- `Ctrl + K` - Search
- `Ctrl + H` - Show Help/Tutorial
- `Ctrl + ,` - Open Settings

**Customize:**
1. Go to Settings > Developers > Keyboard Shortcuts
2. Click edit icon next to any shortcut
3. Press your desired key combination
4. Changes save automatically

### Settings

Personalize your experience:

1. **Theme** - Choose Light, Dark, or System theme
2. **Accent Color** - Select from 8 color options
3. **Notifications** - Configure task and exam reminders
4. **Data Management** - Export, import, or clear data
5. **Keyboard Shortcuts** - Customize shortcuts
6. **Help** - Access tutorial and documentation

### Feedback

Help us improve StudentFocus:

1. Click the "Feedback" button (bottom-left)
2. Fill in your name and email
3. Describe your feedback, bug report, or feature request
4. Submit - we read every message!

### Tutorial

Learn the app with our interactive guide:

1. Press `Ctrl + H` or go to Settings > Help
2. Click "Start Tutorial"
3. Follow the step-by-step guide
4. Navigate with Next/Back buttons
5. Skip anytime or replay later

### Easter Eggs

Discover hidden surprises:

1. **Konami Code** - Type `↑↑↓↓←→←→BA` for a surprise
2. **Spooky Mode** - Activate Halloween theme
3. **Confetti** - Celebrate your achievements
4. More secrets to discover...

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

1. **Report Bugs** - Use the feedback form or create an issue
2. **Suggest Features** - Share your ideas for improvements
3. **Submit Pull Requests** - Fix bugs or add features
4. **Improve Documentation** - Help others understand the project
5. **Share Feedback** - Tell us what you think

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add comments for complex logic
- Ensure all tests pass
- Format code with Prettier

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 StudentFocus

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

### Built With Love For
- **Student HackPad** - Thank you for the opportunity to build this project
- **Students Everywhere** - This is for you

### Special Thanks
- [Next.js](https://nextjs.org/) - The React Framework
- [Vercel](https://vercel.com/) - Deployment platform
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Lucide](https://lucide.dev/) - Icon library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- All open-source contributors

---

## 📞 Contact

**Developer:** Ghali Amli

- GitHub: [@GhaliAmli](https://github.com/GhaliAmli)
- LinkedIn: [Ghali Amli](https://www.linkedin.com/in/ghali-amli-315557398/)
- Twitter: [@GhaliAmli](https://x.com/GhaliAmli)
- Email: g@obelus.cloud

---

## 🌟 Show Your Support

If you find StudentFocus helpful, please consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 📢 Sharing with fellow students
- 🤝 Contributing to the project

---

<div align="center">

### Made with ❤️ for Students

**StudentFocus** - Study Smarter, Not Harder

[⬆ Back to Top](#-studentfocus)

</div>
