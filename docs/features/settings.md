# StudentFocus - Settings Guide

## ⚙️ Settings Overview

The Settings page provides comprehensive control over your app's appearance, notifications, and data management.

---

## 🎨 Theme & Appearance

### **Theme Mode**

Choose from three theme options:

#### **Light Mode**
- Bright, clean interface
- Best for daytime use
- Easy on the eyes in well-lit environments

#### **Dark Mode**
- Dark background with light text
- Reduces eye strain in low light
- Saves battery on OLED screens

#### **System Mode** (Default)
- Automatically matches your device's theme
- Switches between light and dark based on system settings
- Seamless experience across all apps

**How to Change:**
1. Go to Settings → Theme & Appearance
2. Click on Light, Dark, or System
3. Theme changes instantly
4. Preference saved to localStorage

### **Accent Color**

Customize the primary color used throughout the app:

**Available Colors:**
- 🔵 **Blue** (Default) - Professional and calm
- 🟣 **Purple** - Creative and modern
- 🟢 **Green** - Fresh and energetic
- 🟠 **Orange** - Warm and friendly
- 🩷 **Pink** - Playful and vibrant
- 🔷 **Teal** - Balanced and soothing
- 🔴 **Red** - Bold and attention-grabbing
- 🟦 **Indigo** - Deep and sophisticated

**How to Change:**
1. Go to Settings → Theme & Appearance
2. Click on any color swatch
3. Color applies instantly across the app
4. Affects buttons, links, and highlights
5. Preference saved to localStorage

**Where Accent Color Appears:**
- Primary buttons
- Active navigation items
- Links and interactive elements
- Progress indicators
- Selected states
- Focus outlines

---

## 🔔 Notifications

### **Task Reminders**

Get notified about upcoming tasks and deadlines.

**Features:**
- Toggle on/off
- Customizable reminder time
- Daily notifications
- Browser alerts (demo mode)

**How to Enable:**
1. Go to Settings → Notifications
2. Toggle "Task Reminders" on
3. Confirmation alert appears
4. Set your preferred reminder time

**When You'll Be Notified:**
- Tasks due today
- Tasks due tomorrow
- Overdue tasks
- High-priority tasks

### **Exam Reminders**

Get notified about upcoming exams.

**Features:**
- Toggle on/off
- Customizable reminder schedule
- Weekly summaries
- Browser alerts (demo mode)

**How to Enable:**
1. Go to Settings → Notifications
2. Toggle "Exam Reminders" on
3. Confirmation alert appears
4. Set your preferred schedule

**When You'll Be Notified:**
- Exams within 7 days
- Exams within 3 days
- Exam day
- Weekly exam summary

### **Reminder Schedule**

Customize when you receive notifications:

#### **Daily Reminder Time**
Choose when to receive daily reminders:
- 6:00 AM - Early morning
- 7:00 AM - Morning routine
- 8:00 AM - Start of day
- 9:00 AM - Mid-morning (default)
- 10:00 AM - Late morning
- 12:00 PM - Lunch time
- 6:00 PM - Evening
- 8:00 PM - Night

#### **Weekly Summary Day**
Choose which day to receive weekly summaries:
- Monday (default) - Start of week
- Tuesday - Mid-week prep
- Wednesday - Hump day
- Thursday - End of week prep
- Friday - Weekend planning
- Saturday - Weekend review
- Sunday - Week ahead planning

**How to Configure:**
1. Enable task or exam reminders
2. Reminder Schedule section appears
3. Select daily time from dropdown
4. Select weekly day from dropdown
5. Settings saved automatically

### **Demo Mode**

For this hackathon demo, notifications use browser alerts:
- Simple alert() dialogs
- Instant feedback
- No permission required
- Works offline

**Production Implementation:**
In a production app, these would be:
- Native browser notifications
- Push notifications
- Email reminders
- SMS alerts (optional)

---

## 💾 Data Management

### **Data Overview**

Visual dashboard showing your stored data:
- Total tasks count
- Total exams count
- Total study plans count
- Total sessions count
- Combined total

### **Developer Tools**

#### **Export Data**
Download all your data as JSON:
- One-click export
- Timestamped filename
- Complete data backup
- Use for transfers or archiving

#### **Import Data**
Restore data from JSON backup:
- File picker interface
- Automatic validation
- Merge with existing data
- Success/error notifications

#### **Clear All Data**
Permanently delete everything:
- Requires confirmation
- Cannot be undone
- Useful for fresh start
- Export first recommended

---

## 🔧 Technical Details

### **localStorage Keys**

Settings are stored under:
```
studentfocus_settings
```

### **Settings Structure**
```typescript
{
  theme: 'light' | 'dark' | 'system',
  accentColor: '#3b82f6',
  notifications: {
    taskReminders: boolean,
    examReminders: boolean,
    dailyReminderTime: '09:00',
    weeklyReminderDay: 'monday'
  }
}
```

### **Persistence**
- All settings saved to localStorage
- Loaded on app initialization
- Applied before UI renders
- Survives page refreshes
- Synced with Zustand store

### **Theme Application**
- CSS class toggle on `<html>` element
- `dark` class added/removed dynamically
- System theme detected via media query
- Instant switching, no flicker

### **Accent Color Application**
- CSS custom property: `--accent-color`
- Applied to document root
- Cascades to all components
- Instant color changes

---

## 🎯 Use Cases

### **Personalization**
```
1. Choose your favorite color
2. Select preferred theme
3. Enjoy customized experience
```

### **Productivity**
```
1. Enable task reminders
2. Set morning notification time
3. Never miss a deadline
```

### **Study Planning**
```
1. Enable exam reminders
2. Set weekly summary day
3. Stay prepared for exams
```

### **Device Sync**
```
1. Export settings with data
2. Import on new device
3. Consistent experience everywhere
```

---

## 💡 Best Practices

### **Theme Selection**
- Use **System** for automatic switching
- Use **Dark** for night study sessions
- Use **Light** for daytime work

### **Accent Color**
- Choose colors that motivate you
- Match your study environment
- Consider color psychology:
  - Blue: Focus and calm
  - Green: Growth and balance
  - Purple: Creativity
  - Orange: Energy and enthusiasm

### **Notifications**
- Enable for important items only
- Choose realistic reminder times
- Adjust based on your schedule
- Don't over-notify yourself

### **Data Management**
- Export weekly as backup
- Clear old data periodically
- Import to restore or transfer
- Keep backups in cloud storage

---

## 🔐 Privacy & Security

### **Local Storage**
- All settings stored locally
- Never sent to any server
- Complete privacy
- You control everything

### **No Tracking**
- No analytics on settings
- No usage data collected
- No third-party access
- Fully private

---

## 🚀 Quick Actions

### Change Theme
```
Settings → Theme & Appearance → Click theme
```

### Change Color
```
Settings → Theme & Appearance → Click color swatch
```

### Enable Reminders
```
Settings → Notifications → Toggle on
```

### Set Reminder Time
```
Settings → Notifications → Select time/day
```

### Export Data
```
Settings → Developer Tools → Export All Data
```

---

## 🆘 Troubleshooting

### **Theme Not Changing**
- Check browser supports dark mode
- Clear browser cache
- Reload page
- Check localStorage enabled

### **Color Not Applying**
- Refresh the page
- Check browser CSS support
- Clear cache and reload

### **Notifications Not Working**
- This is demo mode (alerts only)
- Check browser allows alerts
- Production would use real notifications

### **Settings Not Saving**
- Check localStorage enabled
- Check available storage space
- Try export/import to reset

---

## 📱 Responsive Design

Settings page adapts to all screen sizes:
- **Desktop**: Multi-column layouts
- **Tablet**: Adjusted grids
- **Mobile**: Single column, full width

All controls remain accessible and touch-friendly.

---

## 🔮 Future Enhancements

Potential additions:
- More theme options
- Custom accent colors (color picker)
- Font size adjustment
- Compact/comfortable view modes
- Animation preferences
- Sound effects toggle
- Language selection
- Timezone settings

---

## 📚 Related Documentation

- **STORAGE-GUIDE.md** - Data persistence details
- **PERSISTENCE-UPDATE.md** - Storage features
- **QUICK-REFERENCE.md** - Quick commands

---

**Customize your experience, stay organized, and study smarter! 🎓✨**
