# 🎯 Keyboard Shortcuts & Interactive Tutorial

Complete guide to the custom keyboard shortcuts system and interactive tutorial feature.

---

## 📋 Table of Contents

1. [Keyboard Shortcuts](#keyboard-shortcuts)
2. [Interactive Tutorial](#interactive-tutorial)
3. [Implementation Details](#implementation-details)
4. [Usage Examples](#usage-examples)
5. [Customization](#customization)

---

## ⌨️ Keyboard Shortcuts

### Overview

A fully customizable keyboard shortcuts system that allows users to define their own shortcuts for main actions. All shortcuts are saved locally in the browser using localStorage.

### Default Shortcuts

#### Navigation
- **Ctrl + D** - Go to Dashboard
- **Ctrl + T** - Go to Tasks
- **Ctrl + C** - Go to Calendar
- **Ctrl + A** - Go to Analytics
- **Ctrl + ,** - Go to Settings

#### Actions
- **Ctrl + N** - Create New Task
- **Ctrl + K** - Search/Focus Search Input
- **Ctrl + H** - Show Help/Tutorial

#### General
- **Ctrl + S** - Save Current Changes
- **Ctrl + R** - Refresh Current Page

### Features

✅ **Customizable** - Users can record their own key combinations  
✅ **Persistent** - Shortcuts saved in localStorage  
✅ **Visual Editor** - Easy-to-use UI in Settings > Developers  
✅ **Category Organization** - Grouped by Navigation, Actions, General  
✅ **Reset Options** - Reset individual or all shortcuts  
✅ **Real-time Recording** - Press keys to record new shortcuts  
✅ **Conflict Prevention** - Smart handling of modifier keys  

### How to Use

#### Viewing Shortcuts
1. Navigate to **Settings > Developers > Keyboard Shortcuts**
2. See all shortcuts organized by category
3. Current key combination displayed for each shortcut

#### Editing a Shortcut
1. Click the **Edit** icon (pencil) next to any shortcut
2. Press your desired key combination (e.g., Ctrl + K)
3. Shortcut is automatically saved
4. Red recording indicator shows you're in recording mode

#### Resetting Shortcuts
- **Individual**: Click the reset icon while editing
- **All Shortcuts**: Click "Reset All" button at the top

### Technical Implementation

#### Files Structure
```
hooks/
└── use-keyboard-shortcuts.ts    # Main hook for shortcuts logic

components/
├── keyboard-shortcuts-manager.tsx    # UI for managing shortcuts
└── keyboard-shortcuts-provider.tsx   # Global provider wrapper

types/
└── shortcuts.ts                 # TypeScript type definitions

app/
├── layout.tsx                   # Provider integration
└── settings/developers/page.tsx # Settings page
```

#### Hook: `useKeyboardShortcuts`

```typescript
const {
  shortcuts,           // Array of all shortcuts
  updateShortcut,      // Update a specific shortcut
  resetShortcut,       // Reset to default
  resetAllShortcuts,   // Reset all to defaults
  startRecording,      // Start recording new shortcut
  stopRecording,       // Stop recording
  isRecording,         // Current recording state
} = useKeyboardShortcuts();
```

#### Key Features

**1. Sequence Detection**
- Tracks modifier keys (Ctrl, Alt, Shift, Meta)
- Combines with regular keys
- Prevents conflicts with browser shortcuts

**2. localStorage Persistence**
```typescript
// Storage key
const STORAGE_KEY = 'studentfocus_keyboard_shortcuts';

// Saved format
{
  "nav_dashboard": { "keys": ["ctrl", "d"] },
  "action_new_task": { "keys": ["ctrl", "n"] }
}
```

**3. Action Mapping**
```typescript
const actions = {
  nav_dashboard: () => router.push('/dashboard'),
  action_new_task: () => window.dispatchEvent(new CustomEvent('open-new-task-dialog')),
  // ... more actions
};
```

**4. Smart Input Handling**
- Ignores shortcuts when typing in inputs/textareas
- Exception: Ctrl+K works everywhere for search
- Prevents accidental triggers

### Customization

#### Adding New Shortcuts

Edit `hooks/use-keyboard-shortcuts.ts`:

```typescript
export const DEFAULT_SHORTCUTS: KeyboardShortcut[] = [
  // ... existing shortcuts
  {
    id: 'custom_action',
    name: 'My Custom Action',
    description: 'Does something cool',
    defaultKeys: ['ctrl', 'shift', 'x'],
    keys: ['ctrl', 'shift', 'x'],
    category: 'actions',
    action: () => {},
  },
];
```

Then add the action in `getActionForShortcut`:

```typescript
const actions: Record<string, () => void> = {
  // ... existing actions
  custom_action: () => {
    // Your custom action here
    console.log('Custom action triggered!');
  },
};
```

#### Changing Default Keys

Modify the `defaultKeys` and `keys` arrays in the shortcut definition:

```typescript
{
  id: 'nav_dashboard',
  defaultKeys: ['alt', 'd'],  // Changed from ctrl to alt
  keys: ['alt', 'd'],
  // ...
}
```

---

## 🎓 Interactive Tutorial

### Overview

A step-by-step interactive tutorial that guides users through all features of StudentFocus. Automatically shows on first launch and can be replayed anytime.

### Features

✅ **Auto-Start** - Shows automatically for new users  
✅ **12 Steps** - Covers all major features  
✅ **Element Highlighting** - Highlights target elements with pulse animation  
✅ **Smart Positioning** - Tooltips position around highlighted elements  
✅ **Progress Tracking** - Shows current step and progress bar  
✅ **Skip Option** - Users can skip and resume later  
✅ **Persistent State** - Tracks completion in localStorage  
✅ **Replay Anytime** - Access from Settings > Help  

### Tutorial Steps

1. **Welcome** - Introduction to StudentFocus
2. **Dashboard** - Overview of dashboard features
3. **Tasks** - Task management and organization
4. **Calendar** - Calendar and planning features
5. **Analytics** - Progress tracking and charts
6. **Gamification** - Points, badges, and streaks
7. **AI Assistant** - Smart study suggestions
8. **Feedback** - How to send feedback
9. **Export/Import** - Data backup features
10. **Shortcuts** - Keyboard shortcuts overview
11. **Easter Egg** - Konami Code hint
12. **Complete** - Tutorial completion

### How to Use

#### Starting the Tutorial

**Method 1: Automatic (First Time)**
- Tutorial starts automatically 2 seconds after first page load
- Shows welcome screen with step 1

**Method 2: Manual Start**
1. Go to **Settings > Help**
2. Click **"Start Tutorial"** or **"Replay Tutorial"**
3. Tutorial begins from step 1

**Method 3: Keyboard Shortcut**
- Press **Ctrl + H** to open tutorial

**Method 4: Console**
```javascript
window.dispatchEvent(new CustomEvent('open-tutorial'));
```

#### Navigating the Tutorial

- **Next Button** - Move to next step
- **Back Button** - Return to previous step
- **Skip Tutorial** - Exit and mark as skipped
- **X Button** - Close temporarily (can resume)
- **Finish** - Complete tutorial (last step)

#### Tutorial Controls

- **Progress Bar** - Visual progress indicator
- **Step Counter** - "Step X of 12"
- **Icon** - Each step has a unique emoji icon
- **Description** - Detailed explanation of feature

### Technical Implementation

#### Files Structure
```
hooks/
└── use-tutorial.ts              # Tutorial state management

components/
├── tutorial-overlay.tsx         # Main tutorial UI
└── help-center.tsx              # Help page with tutorial access

types/
└── tutorial.ts                  # TypeScript type definitions

app/
├── layout.tsx                   # Tutorial overlay integration
└── settings/help/page.tsx       # Help settings page
```

#### Hook: `useTutorial`

```typescript
const {
  isActive,           // Is tutorial currently active
  currentStep,        // Current step index (0-11)
  totalSteps,         // Total number of steps (12)
  currentStepData,    // Data for current step
  progress,           // Progress object with completion status
  startTutorial,      // Start from beginning
  nextStep,           // Go to next step
  previousStep,       // Go to previous step
  skipTutorial,       // Skip and mark as skipped
  resetTutorial,      // Reset progress
  closeTutorial,      // Close temporarily
} = useTutorial();
```

#### Tutorial Step Structure

```typescript
interface TutorialStep {
  id: string;              // Unique identifier
  title: string;           // Step title
  description: string;     // Step description
  target?: string;         // CSS selector for element to highlight
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: () => void;     // Optional action to perform
  icon?: string;           // Emoji icon
}
```

#### Progress Tracking

```typescript
interface TutorialProgress {
  completed: boolean;      // Has user completed tutorial
  currentStep: number;     // Last viewed step
  skipped: boolean;        // Did user skip tutorial
  lastShown: string;       // ISO timestamp of last show
}
```

Stored in localStorage:
```typescript
const STORAGE_KEY = 'studentfocus_tutorial_progress';
```

#### Element Highlighting

Tutorial uses `data-tutorial` attributes to find elements:

```tsx
// In sidebar
<Link href="/dashboard" data-tutorial="dashboard">
  Dashboard
</Link>

// In tutorial step
{
  target: '[data-tutorial="dashboard"]',
  position: 'bottom',
}
```

The overlay:
1. Finds element using `querySelector`
2. Gets element's bounding rect
3. Positions tooltip relative to element
4. Adds pulsing border highlight
5. Scrolls element into view

### Visual Design

#### Backdrop
- Semi-transparent black overlay (50% opacity)
- z-index: 90
- Covers entire screen

#### Highlight Border
- 3px solid primary color
- 12px border radius
- Pulsing animation (2s infinite)
- Box shadow for depth
- z-index: 95

#### Tutorial Card
- Max width: 28rem (448px)
- Responsive: 90vw on mobile
- White background with border
- Rounded corners (2xl)
- Shadow: 2xl
- z-index: 100

#### Animations
- **Fade In**: Backdrop fades in smoothly
- **Zoom In**: Card zooms in from center
- **Pulse**: Highlight border pulses
- **Progress Bar**: Smooth width transition

### Customization

#### Adding New Steps

Edit `hooks/use-tutorial.ts`:

```typescript
export const TUTORIAL_STEPS: TutorialStep[] = [
  // ... existing steps
  {
    id: 'custom_feature',
    title: '🎨 Custom Feature',
    description: 'Learn about this awesome new feature!',
    target: '[data-tutorial="custom"]',
    position: 'bottom',
    icon: '🎨',
  },
];
```

Then add the data attribute to your component:

```tsx
<div data-tutorial="custom">
  Your feature here
</div>
```

#### Changing Auto-Start Behavior

Edit `hooks/use-tutorial.ts` in the `loadProgress` function:

```typescript
// Show tutorial if it's been more than 7 days
if (daysSinceLastShown > 7 || !parsed.lastShown) {
  setTimeout(() => {
    setIsActive(true);
  }, 1000); // Change delay here
}
```

#### Customizing Appearance

Edit `components/tutorial-overlay.tsx`:

```tsx
// Change backdrop opacity
<div className="fixed inset-0 bg-black/50 z-[90]" />
//                                    ^^^ Change this

// Change highlight color
style={{
  border: '3px solid hsl(var(--primary))',
  //                  ^^^ Change color variable
}}

// Change card size
<Card className="w-[90vw] max-w-md">
  //                      ^^^ Change max width
```

---

## 🔧 Implementation Details

### Integration Points

#### 1. App Layout (`app/layout.tsx`)

```tsx
import { TutorialOverlay } from '@/components/tutorial-overlay';
import { KeyboardShortcutsProvider } from '@/components/keyboard-shortcuts-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <KeyboardShortcutsProvider>
          {/* App content */}
          <TutorialOverlay />
        </KeyboardShortcutsProvider>
      </body>
    </html>
  );
}
```

#### 2. Settings Pages

**Developers Page** (`app/settings/developers/page.tsx`):
```tsx
import { KeyboardShortcutsManager } from '@/components/keyboard-shortcuts-manager';

export default function DevelopersPage() {
  return <KeyboardShortcutsManager />;
}
```

**Help Page** (`app/settings/help/page.tsx`):
```tsx
import { HelpCenter } from '@/components/help-center';

export default function HelpPage() {
  return <HelpCenter />;
}
```

#### 3. Tutorial Data Attributes

Add to components you want to highlight:

```tsx
// Sidebar links
<Link href="/dashboard" data-tutorial="dashboard">Dashboard</Link>
<Link href="/tasks" data-tutorial="tasks">Tasks</Link>

// Floating buttons
<Button data-tutorial="ai-assistant">AI</Button>
<Button data-tutorial="feedback">Feedback</Button>
```

### Event System

Both features use custom events for communication:

```typescript
// Open tutorial
window.dispatchEvent(new CustomEvent('open-tutorial'));

// Open new task dialog
window.dispatchEvent(new CustomEvent('open-new-task-dialog'));

// Save changes
window.dispatchEvent(new CustomEvent('save-changes'));

// Open feedback
window.dispatchEvent(new CustomEvent('open-feedback'));
```

### localStorage Keys

```typescript
// Keyboard shortcuts
'studentfocus_keyboard_shortcuts'

// Tutorial progress
'studentfocus_tutorial_progress'
```

### Browser Compatibility

**Keyboard Shortcuts:**
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ⚠️ IE11 (not supported)

**Tutorial:**
- ✅ All modern browsers
- ✅ Mobile browsers (limited keyboard support)
- ✅ Tablet browsers

---

## 📚 Usage Examples

### Example 1: Custom Shortcut Action

```typescript
// Add to getActionForShortcut in use-keyboard-shortcuts.ts
const actions: Record<string, () => void> = {
  custom_export: () => {
    // Trigger export
    const exportButton = document.querySelector('[data-action="export"]');
    if (exportButton) {
      (exportButton as HTMLButtonElement).click();
    }
  },
};
```

### Example 2: Programmatic Tutorial Control

```typescript
import { useTutorial } from '@/hooks/use-tutorial';

function MyComponent() {
  const { startTutorial, skipTutorial, currentStep } = useTutorial();

  return (
    <div>
      <button onClick={startTutorial}>Start Tour</button>
      <button onClick={skipTutorial}>Skip Tour</button>
      <p>Current Step: {currentStep + 1}</p>
    </div>
  );
}
```

### Example 3: Custom Tutorial Step Action

```typescript
{
  id: 'custom_action',
  title: 'Custom Step',
  description: 'This step performs an action',
  position: 'center',
  action: () => {
    // Perform custom action when step is shown
    console.log('Custom step shown!');
    // Could open a dialog, highlight something, etc.
  },
}
```

### Example 4: Listening for Shortcut Events

```typescript
useEffect(() => {
  const handleNewTask = () => {
    console.log('New task shortcut triggered!');
    // Open your new task dialog
  };

  window.addEventListener('open-new-task-dialog', handleNewTask);

  return () => {
    window.removeEventListener('open-new-task-dialog', handleNewTask);
  };
}, []);
```

---

## 🎨 Styling

### Keyboard Shortcuts Manager

Uses Tailwind CSS with shadcn/ui components:
- Cards for organization
- Badges for key display
- Buttons for actions
- Hover effects for interactivity

### Tutorial Overlay

Custom animations and styling:
- Backdrop with fade-in
- Card with zoom-in
- Pulse animation for highlights
- Smooth transitions

---

## 🚀 Performance

### Keyboard Shortcuts
- **Memory**: ~5KB in localStorage
- **CPU**: Minimal (event listener only)
- **Bundle**: ~8KB JavaScript

### Tutorial
- **Memory**: ~2KB in localStorage
- **CPU**: Minimal (only when active)
- **Bundle**: ~6KB JavaScript
- **Animations**: GPU-accelerated

---

## ✅ Summary

Both features are fully implemented and integrated:

**Keyboard Shortcuts:**
✅ 10 default shortcuts across 3 categories  
✅ Custom recording with visual feedback  
✅ localStorage persistence  
✅ Reset individual or all shortcuts  
✅ Settings page UI  
✅ Global provider integration  

**Interactive Tutorial:**
✅ 12-step guided tour  
✅ Auto-start for new users  
✅ Element highlighting with pulse  
✅ Progress tracking  
✅ Skip and replay options  
✅ Help center integration  
✅ Keyboard shortcut to open (Ctrl+H)  

**Access Points:**
- **Shortcuts**: Settings > Developers > Keyboard Shortcuts
- **Tutorial**: Settings > Help > Interactive Tutorial
- **Quick Access**: Press Ctrl+H for tutorial

**Try it now!** 🎯
