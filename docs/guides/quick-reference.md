# StudentFocus - Quick Reference

## 🚀 Quick Start
```bash
cd student-focus
npm run dev
```
Open: http://localhost:3000

---

## 📱 Pages

| Page | URL | Purpose |
|------|-----|---------|
| Dashboard | `/dashboard` | Overview & stats |
| Tasks | `/tasks` | Manage tasks |
| Calendar | `/calendar` | Weekly schedule |
| Study Plan | `/studyplan` | AI plan generator |
| Settings | `/settings` | Theme, notifications, data |

---

## 💾 Data Persistence

### Auto-Save
✅ Every action saves automatically to localStorage

### Storage Keys
```
studentfocus_tasks
studentfocus_exams
studentfocus_studyplans
studentfocus_studysessions
```

---

## ⚙️ Settings Features

### Theme & Appearance
```
Settings → Theme Mode
→ Light / Dark / System

Settings → Accent Color
→ Choose from 8 colors
```

### Notifications
```
Settings → Task Reminders
→ Toggle on/off

Settings → Exam Reminders
→ Toggle on/off

Settings → Reminder Schedule
→ Set daily time & weekly day
```

### Export Data
```
Settings → Export All Data
→ Downloads JSON backup
```

### Import Data
```
Settings → Choose File
→ Select JSON backup
→ Data restored
```

### Clear Data
```
Settings → Clear All Data
→ Confirm
→ All data deleted
```

---

## 🎯 Common Tasks

### Create Task
```
Tasks → Add Task
→ Fill form
→ Create Task
→ Auto-saved ✓
```

### Log Study Session
```
Calendar → Log Session
→ Fill details
→ Log Session
→ Auto-saved ✓
```

### Generate Study Plan
```
Study Plan → Add Exams
→ Configure Settings
→ Generate Plan
→ Auto-saved ✓
```

### Backup Data
```
Settings → Export All Data
→ Save to cloud storage
```

### Restore Data
```
Settings → Choose File
→ Select backup
→ Data imported ✓
```

---

## 🔧 Developer Tools

### View Data
```javascript
// In browser console
localStorage.getItem('studentfocus_tasks')
localStorage.getItem('studentfocus_exams')
```

### Clear Storage
```javascript
// In browser console
localStorage.clear()
// Or use Settings → Clear All Data
```

### Export Programmatically
```javascript
// In browser console
const data = {
  tasks: JSON.parse(localStorage.getItem('studentfocus_tasks') || '[]'),
  exams: JSON.parse(localStorage.getItem('studentfocus_exams') || '[]'),
  studyPlans: JSON.parse(localStorage.getItem('studentfocus_studyplans') || '[]'),
  studySessions: JSON.parse(localStorage.getItem('studentfocus_studysessions') || '[]')
};
console.log(JSON.stringify(data, null, 2));
```

---

## 📦 Data Format

### Task
```typescript
{
  id: string
  title: string
  description?: string
  completed: boolean
  dueDate: Date
  priority: 'low' | 'medium' | 'high'
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  estimatedTime?: number
}
```

### Exam
```typescript
{
  id: string
  subject: string
  date: Date
  topics: string[]
  importance: 'low' | 'medium' | 'high'
}
```

### Study Plan
```typescript
{
  id: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  goals: string[]
  hoursPerDay: number
  exams: Exam[]
  generatedPlan?: string
}
```

### Study Session
```typescript
{
  id: string
  subject: string
  duration: number
  date: Date
  startTime?: string
  notes?: string
  category: string
}
```

---

## 🎨 UI Components

### Cards
- `rounded-2xl` corners
- `shadow-sm` elevation
- Hover effects

### Buttons
- Primary: Solid color
- Secondary: Outline
- Destructive: Red

### Badges
- Priority: High (red), Medium (gray), Low (gray)
- Categories: Color-coded

---

## 🔐 Privacy

✅ Data stored locally only  
✅ No server communication  
✅ No tracking  
✅ Complete privacy  
✅ You own your data  

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| README.md | Project overview |
| START-HERE.md | Getting started |
| STORAGE-GUIDE.md | Storage details |
| PERSISTENCE-UPDATE.md | New features |
| FEATURES.md | Feature list |
| COMPLETE.md | Full overview |
| QUICK-REFERENCE.md | This file |

---

## 🆘 Troubleshooting

### Data not saving?
- Check localStorage enabled
- Check browser storage space
- Try export/import

### Import fails?
- Validate JSON format
- Check file encoding (UTF-8)
- Ensure dates are ISO format

### App not loading?
- Clear browser cache
- Check console for errors
- Try incognito mode

---

## 💡 Tips

### Backup Strategy
- Export weekly
- Store in cloud
- Keep multiple versions

### Best Practices
- Use consistent categories
- Set realistic time estimates
- Review dashboard daily
- Log sessions regularly

### Keyboard Shortcuts
- None yet (future feature)

---

## 🔮 Coming Soon

Potential features:
- Dark mode
- Keyboard shortcuts
- Notifications
- Charts & analytics
- PDF export
- Cloud sync (optional)

---

**Quick, simple, effective. Happy studying! 📚✨**
