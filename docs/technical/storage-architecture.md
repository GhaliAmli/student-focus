# StudentFocus - Storage & Data Management Guide

## 🗄️ Data Persistence

StudentFocus now includes **full localStorage persistence** for all your data. Everything you create is automatically saved to your browser and persists across sessions.

---

## ✨ Features

### 1. **Automatic Persistence**
- ✅ All tasks, exams, study plans, and sessions are saved automatically
- ✅ Data persists across browser sessions
- ✅ No manual save required
- ✅ Works completely offline

### 2. **localStorage Keys**
Data is stored in your browser under these keys:
- `studentfocus_tasks` - All your tasks
- `studentfocus_exams` - All your exams
- `studentfocus_studyplans` - All your study plans
- `studentfocus_studysessions` - All your study sessions

### 3. **Data Initialization**
- On first load, the app checks localStorage
- If empty, sample data is loaded automatically
- Subsequent visits load your saved data

---

## ⚙️ Settings Page

Access the Settings page from the sidebar to manage your data.

### **Data Overview**
View statistics about your stored data:
- Total tasks
- Total exams
- Total study plans
- Total sessions

### **Developer Tools**

#### 📥 **Export Data**
- Downloads all your data as a JSON file
- Filename format: `studentfocus-backup-YYYY-MM-DD.json`
- Use for:
  - Creating backups
  - Transferring data between devices
  - Archiving old data

**How to Export:**
1. Go to Settings → Developer Tools
2. Click "Export All Data"
3. JSON file downloads automatically

#### 📤 **Import Data**
- Upload a JSON file to restore data
- Merges with existing data
- Duplicate IDs are overwritten

**How to Import:**
1. Go to Settings → Developer Tools
2. Click "Choose File"
3. Select your JSON backup file
4. Data is imported and saved automatically

**⚠️ Important Notes:**
- Importing merges with existing data
- Duplicate IDs will be overwritten
- Export current data first as backup
- Validate JSON format before importing

#### 🗑️ **Clear All Data**
- Permanently deletes all data
- Requires confirmation
- Cannot be undone (unless you have a backup)

**How to Clear:**
1. Go to Settings → Developer Tools
2. Click "Clear All Data"
3. Confirm the action
4. All data is removed from localStorage

---

## 📦 Data Format

### Export JSON Structure
```json
{
  "tasks": [
    {
      "id": "1",
      "title": "Complete Math Assignment",
      "description": "Chapter 5 exercises",
      "completed": false,
      "dueDate": "2025-11-20T00:00:00.000Z",
      "priority": "high",
      "difficulty": "hard",
      "category": "Mathematics",
      "estimatedTime": 120
    }
  ],
  "exams": [
    {
      "id": "1",
      "subject": "Mathematics",
      "date": "2025-11-25T00:00:00.000Z",
      "topics": ["Calculus", "Linear Algebra"],
      "importance": "high"
    }
  ],
  "studyPlans": [
    {
      "id": "1",
      "title": "Final Exam Preparation",
      "description": "Comprehensive study plan",
      "startDate": "2025-11-15T00:00:00.000Z",
      "endDate": "2025-12-15T00:00:00.000Z",
      "goals": ["Review all chapters"],
      "hoursPerDay": 3,
      "exams": [],
      "generatedPlan": "..."
    }
  ],
  "studySessions": [
    {
      "id": "1",
      "subject": "Mathematics",
      "duration": 90,
      "date": "2025-11-15T14:00:00.000Z",
      "startTime": "14:00",
      "notes": "Focused on integration",
      "category": "Mathematics"
    }
  ]
}
```

---

## 🔄 Data Flow

### **Create/Update Flow**
1. User creates/updates item in UI
2. Zustand store updates state
3. Store automatically saves to localStorage
4. UI updates reactively

### **Load Flow**
1. App initializes
2. StorageInitializer checks localStorage
3. Data is loaded and parsed (dates converted)
4. Zustand store is populated
5. UI renders with loaded data

### **Import Flow**
1. User selects JSON file
2. File is read and parsed
3. Data is validated
4. Zustand store is updated
5. localStorage is updated
6. UI updates automatically

---

## 🛡️ Data Safety

### **Best Practices**
✅ **Export regularly** - Create backups weekly or before major changes  
✅ **Validate imports** - Check JSON format before importing  
✅ **Test on sample data** - Try import/export with test data first  
✅ **Keep backups** - Store exports in multiple locations  

### **What Happens If...**

**Browser data is cleared?**
- All localStorage data is lost
- Restore from your last export

**I switch browsers?**
- Data doesn't transfer automatically
- Export from old browser, import to new one

**I use incognito mode?**
- Data is stored temporarily
- Lost when incognito session ends
- Export before closing

**localStorage is full?**
- Browser limits vary (5-10MB typically)
- Export and clear old data
- StudentFocus data is very small

---

## 🔧 Technical Details

### **Storage Implementation**
- Uses browser's localStorage API
- Data serialized as JSON
- Dates stored as ISO strings
- Automatically parsed on load

### **Type Safety**
- Full TypeScript types for all data
- Validation on import
- Type-safe store operations

### **Performance**
- Instant save/load operations
- No network latency
- Efficient JSON serialization
- Minimal storage footprint

---

## 📱 Offline-First

StudentFocus is **fully offline-first**:
- ✅ No internet required
- ✅ All features work offline
- ✅ Data stored locally
- ✅ No server dependencies
- ✅ Complete privacy

---

## 🔐 Privacy & Security

### **Your Data is Private**
- ✅ Stored only in your browser
- ✅ Never sent to any server
- ✅ No tracking or analytics
- ✅ You have full control

### **Data Ownership**
- ✅ You own all your data
- ✅ Export anytime
- ✅ Delete anytime
- ✅ No vendor lock-in

---

## 🚀 Use Cases

### **Backup & Restore**
1. Export data regularly
2. Store backups safely
3. Restore if needed

### **Device Transfer**
1. Export from Device A
2. Import to Device B
3. Continue working

### **Data Archiving**
1. Export old semester data
2. Clear current data
3. Start fresh for new semester

### **Sharing (Manual)**
1. Export your data
2. Share JSON file
3. Others can import

---

## 💡 Tips & Tricks

### **Regular Backups**
Set a reminder to export data weekly:
- Every Sunday evening
- Before exam periods
- At semester end

### **Naming Convention**
Use descriptive export filenames:
- `studentfocus-fall-2025.json`
- `studentfocus-finals-backup.json`
- `studentfocus-pre-cleanup.json`

### **Version Control**
Keep multiple backup versions:
- Weekly backups
- Monthly archives
- Semester snapshots

### **Cloud Storage**
Store exports in cloud services:
- Google Drive
- Dropbox
- OneDrive
- iCloud

---

## 🆘 Troubleshooting

### **Data Not Saving**
- Check browser localStorage is enabled
- Check available storage space
- Try clearing browser cache
- Export data first, then reimport

### **Import Fails**
- Validate JSON format
- Check file encoding (UTF-8)
- Ensure dates are ISO format
- Check for syntax errors

### **Data Lost**
- Check browser history for exports
- Look in Downloads folder
- Check cloud storage backups
- Contact support if needed

---

## 📚 Related Documentation

- **START-HERE.md** - Getting started guide
- **FEATURES.md** - Complete feature list
- **COMPLETE.md** - Project overview

---

**Your data, your control. Export, backup, and manage with confidence! 🎓✨**
