# StudentFocus - Advanced Features Guide

## 🎮 Gamification & Motivation

### **Points System**

Earn points for completing tasks:

**Base Points:** 10 points per task

**Priority Bonus:**
- High priority: +15 points
- Medium priority: +10 points
- Low priority: +5 points

**Difficulty Bonus:**
- Hard difficulty: +15 points
- Medium difficulty: +10 points
- Easy difficulty: +5 points

**Total Range:** 20-40 points per task

### **Badges**

Unlock badges as you progress:

| Badge | Requirement | Icon |
|-------|-------------|------|
| 🌟 First Steps | Complete 1 task | Star |
| 🏆 Task Master | Complete 10 tasks | Award |
| 👑 Task Legend | Complete 50 tasks | Trophy |
| 🔥 Week Warrior | 7-day streak | Flame |

### **Streak System**

Build your daily completion streak:
- Complete at least one task per day
- Streak increases by 1 each consecutive day
- Breaks if you miss a day
- Displayed with flame icon 🔥

### **Confetti Celebration**

When you complete a task:
- ✨ Confetti animation triggers
- 🎉 Visual celebration
- 💯 Instant gratification
- 🎊 Motivational boost

### **Stats Tracking**

Monitor your progress:
- Total points earned
- Current streak
- Tasks completed
- Study minutes logged

---

## 🎯 Smart Sorting & Prioritization

### **Automatic Sorting**

Four sorting options:

#### **1. Manual Order** (Default)
- Drag and drop to reorder
- Custom arrangement
- Persists in localStorage
- Full control

#### **2. Due Date**
- Earliest deadline first
- Helps prioritize urgent tasks
- Time-sensitive organization
- Never miss a deadline

#### **3. Priority**
- High → Medium → Low
- Focus on important tasks
- Clear priority hierarchy
- Efficient workflow

#### **4. Difficulty**
- Hard → Medium → Easy
- Tackle challenging tasks first
- Build momentum
- Strategic approach

### **Visual Indicators**

**Priority Colors:**
- 🔴 High: Red background, AlertCircle icon
- 🟡 Medium: Yellow background, Clock icon
- 🟢 Low: Green background, Zap icon

**Priority Badges:**
- Color-coded backgrounds
- Icon indicators
- Easy visual scanning
- Quick identification

### **Filter Options**

**By Category:**
- Mathematics, Physics, Chemistry, etc.
- Focus on specific subjects
- Organized workflow

**By Priority:**
- High, Medium, Low
- Filter urgent tasks
- Manage workload

**Combined Filters:**
- Category + Priority
- Precise task selection
- Flexible organization

---

## ⚡ Quick Add & Quick Actions

### **Floating Action Button (FAB)**

**Features:**
- Appears after scrolling down
- Fixed bottom-right position
- Always accessible
- Smooth animations
- Plus icon indicator

**Behavior:**
- Hidden at page top
- Fades in on scroll
- Stays visible while scrolling
- Doesn't obstruct content

### **Keyboard Shortcut**

**Press 'n' to Quick Add:**
- Works from any page
- Opens Quick Add dialog
- Fast task/exam creation
- No mouse needed

**Requirements:**
- Not in input field
- Not in textarea
- No modifier keys (Ctrl/Cmd/Alt)

### **Quick Add Dialog**

**Two Tabs:**

#### **Task Tab**
- Full task form
- All task properties
- Calendar date picker
- Category auto-suggest
- Priority & difficulty selectors

#### **Exam Tab**
- Subject input
- Topics (comma-separated)
- Importance level
- Date picker
- Quick creation

**Features:**
- Modal overlay
- Responsive design
- Form validation
- Instant save
- Auto-close on create

---

## 🎨 Drag & Drop

### **Task Reordering**

**How to Use:**
1. Set sort to "Manual Order"
2. Click and hold drag handle (⋮⋮)
3. Drag task up or down
4. Drop in new position
5. Order saves automatically

**Features:**
- Smooth animations
- Visual feedback
- Snap to position
- Touch support
- Keyboard accessible

**Drag Handle:**
- Six-dot icon (⋮⋮)
- Left side of task
- Cursor changes to grab
- Active state feedback

**Visual Feedback:**
- Dragging task becomes semi-transparent
- Other tasks shift to make space
- Drop zone highlighted
- Smooth transitions

### **Persistence**

**Auto-Save:**
- New order saved to localStorage
- Persists across sessions
- No manual save needed
- Instant updates

**State Management:**
- Zustand store updated
- UI reacts immediately
- No page reload
- Seamless experience

### **Accessibility**

**Keyboard Support:**
- Tab to drag handle
- Space to grab
- Arrow keys to move
- Space to drop

**Screen Readers:**
- Proper ARIA labels
- Announced actions
- Accessible controls

---

## 🔧 Technical Implementation

### **Dependencies**

```json
{
  "canvas-confetti": "^1.9.3",
  "@dnd-kit/core": "^6.1.0",
  "@dnd-kit/sortable": "^8.0.0",
  "@dnd-kit/utilities": "^3.2.2"
}
```

### **Store Updates**

**New State:**
```typescript
gamification: {
  points: number;
  badges: string[];
  streak: number;
  lastCompletionDate: string | null;
  tasksCompleted: number;
  studyMinutes: number;
}
```

**New Actions:**
```typescript
reorderTasks(tasks: Task[]): void
```

**Enhanced Actions:**
```typescript
toggleTask(id: string): void
// Now includes gamification logic
// Triggers confetti on completion
// Updates points, badges, streak
```

### **Components**

**FloatingActionButton:**
- Global component
- Keyboard listener
- Scroll detection
- Modal management

**GamificationDisplay:**
- Points display
- Streak counter
- Badge showcase
- Stats overview

**SortableTask:**
- Drag & drop wrapper
- Visual indicators
- Priority colors
- Action buttons

---

## 💾 Data Persistence

### **localStorage Keys**

```
studentfocus_gamification
```

### **Gamification Structure**

```json
{
  "points": 150,
  "badges": ["first-task", "task-master"],
  "streak": 5,
  "lastCompletionDate": "2025-11-15",
  "tasksCompleted": 12,
  "studyMinutes": 450
}
```

### **Task Order**

- Stored in `studentfocus_tasks`
- Array order preserved
- Drag & drop updates array
- Manual sort maintains order

---

## 🎯 User Experience

### **Motivation**

**Immediate Feedback:**
- Confetti on completion
- Points awarded instantly
- Badge unlocks celebrated
- Streak updates shown

**Progress Tracking:**
- Visual stats display
- Badge collection
- Streak counter
- Points accumulation

**Gamification Psychology:**
- Reward system
- Achievement unlocks
- Progress visualization
- Positive reinforcement

### **Efficiency**

**Quick Actions:**
- FAB always accessible
- Keyboard shortcuts
- Fast task creation
- Minimal clicks

**Smart Organization:**
- Auto-sorting options
- Visual priorities
- Easy filtering
- Drag & drop reorder

**Workflow Optimization:**
- Focus on important tasks
- Clear visual hierarchy
- Flexible organization
- Personalized order

---

## 🚀 Usage Tips

### **Maximize Points**

1. Complete high-priority tasks
2. Tackle hard difficulty items
3. Maintain daily streak
4. Complete tasks consistently

### **Stay Organized**

1. Use smart sorting for planning
2. Switch to manual for custom order
3. Filter by category for focus
4. Drag & drop for fine-tuning

### **Quick Workflow**

1. Press 'n' to add task
2. Fill essential fields
3. Create and continue
4. Repeat as needed

### **Build Streaks**

1. Complete at least one task daily
2. Check dashboard for streak
3. Aim for Week Warrior badge
4. Stay consistent

---

## 📊 Statistics

### **Dashboard Display**

**Gamification Card:**
- Points (trophy icon)
- Streak (flame icon)
- Tasks completed
- Badges earned

**Visual Design:**
- Clean card layout
- Icon indicators
- Large numbers
- Badge showcase

### **Progress Tracking**

**Metrics:**
- Total points
- Current streak
- Tasks completed
- Study minutes

**Badges:**
- Visual display
- Color-coded
- Icon representation
- Achievement showcase

---

## 🎨 Visual Design

### **Priority Colors**

**High Priority:**
- Red background
- AlertCircle icon
- Urgent indicator
- Attention-grabbing

**Medium Priority:**
- Yellow background
- Clock icon
- Moderate urgency
- Balanced attention

**Low Priority:**
- Green background
- Zap icon
- Low urgency
- Calm indicator

### **Drag Handle**

**Design:**
- Six-dot icon (⋮⋮)
- Muted color
- Hover effect
- Cursor change

**States:**
- Default: Gray
- Hover: Darker
- Active: Grabbing cursor
- Dragging: Semi-transparent

---

## ⌨️ Keyboard Shortcuts

| Key | Action | Context |
|-----|--------|---------|
| `n` | Quick Add | Any page (not in input) |
| `Tab` | Navigate | Form fields |
| `Space` | Grab/Drop | Drag & drop |
| `↑↓` | Move | Drag & drop |
| `Esc` | Close | Dialogs |

---

## 🔮 Future Enhancements

Potential additions:
- More badges (100 tasks, 30-day streak, etc.)
- Leaderboards (optional)
- Custom point values
- Achievement notifications
- Progress charts
- Weekly/monthly reports
- Export gamification stats
- Social sharing (optional)

---

## 📚 Related Documentation

- **README.md** - Project overview
- **STORAGE-GUIDE.md** - Data persistence
- **SETTINGS-GUIDE.md** - Settings features
- **QUICK-REFERENCE.md** - Quick commands

---

**Level up your productivity with gamification! 🎮✨**
