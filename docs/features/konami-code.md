# 🎮 Konami Code Easter Egg

A fun easter egg feature that detects the classic Konami Code sequence and triggers delightful animations!

## ✨ Features

### Sequence Detection
- **Classic Code**: ↑↑↓↓←→←→BA (Arrow Up, Arrow Up, Arrow Down, Arrow Down, Left, Right, Left, Right, B, A)
- **Smart Reset**: Automatically resets if wrong key pressed or 3-second timeout
- **TypeScript Safe**: Fully typed implementation with proper event handling

### Dual Effects System

**First Activation:**
- 🎉 **Confetti Explosion** - Multi-colored confetti shoots from both sides
- 🔊 **Sound Effect** - Retro beep sound using Web Audio API
- 📢 **Success Message** - "Konami Code Activated!" with bounce animation

**Second Activation:**
- 👻 **Spooky Halloween Theme** - Dark mode with orange accents
- 🎃 **Floating Ghosts** - 5 animated ghost emojis floating around
- 🎃 **Pumpkin Decorations** - Corner pumpkins with pulse animation
- 🕸️ **Spooky Background** - Subtle orange grid pattern
- 🟠 **Status Indicator** - "Spooky Mode Active" badge

**Third Activation:**
- 🔄 **Deactivates Spooky Mode** - Returns to normal theme

## 📁 File Structure

```
hooks/
└── use-konami-code.ts          # Custom React hook for sequence detection

components/
├── konami-easter-egg.tsx       # Main easter egg component with effects
└── konami-demo.tsx             # Demo component with instructions

app/
├── layout.tsx                  # Integrated KonamiEasterEgg component
├── credits/page.tsx            # Added KonamiDemo component
└── globals.css                 # Spooky mode CSS styles
```

## 🧪 Testing Methods

### 1. Manual Keyboard Entry
Simply type the sequence on your keyboard:
```
↑ ↑ ↓ ↓ ← → ← → B A
```

### 2. Demo Button
1. Navigate to the **Credits** page
2. Find the "Konami Code Easter Egg" card
3. Click the **"Demo Konami Code"** button
4. Watch the automated sequence trigger

### 3. Browser Console
Open your browser console (F12) and type:
```javascript
triggerKonamiCode()
```

This will simulate the entire sequence with console logs showing progress.

## 🎨 Visual Design

### Confetti Animation
- Multi-colored particles (blue, purple, pink, green, orange)
- Shoots from left and right sides simultaneously
- 3-second duration with smooth animation
- Uses `canvas-confetti` library

### Spooky Mode Theme
- **Dark Background**: Deep dark theme with orange accents
- **Floating Ghosts**: 5 ghost emojis with random positions and float animations
- **Corner Pumpkins**: Large pumpkins in top corners with pulse effect
- **Grid Pattern**: Subtle orange vertical lines in background
- **Status Badge**: Bottom-right indicator showing "Spooky Mode Active"

### Success Messages
- Fixed overlay with gradient background (purple to pink)
- Bounce animation for attention
- Auto-disappears after 3 seconds
- Non-intrusive (pointer-events: none)

## 🔧 Technical Implementation

### Hook: `useKonamiCode`
```typescript
useKonamiCode({
  onComplete: () => console.log('Konami Code!'),
  enabled: true,
})
```

**Features:**
- Tracks sequence progress with `useRef`
- Handles timeout reset (3 seconds)
- Provides callback on completion
- Can be enabled/disabled
- Returns reset function

### Component: `KonamiEasterEgg`
- Manages state for spooky mode and messages
- Triggers confetti using `canvas-confetti`
- Plays sound using Web Audio API
- Applies CSS class to document for theme switching

### Component: `KonamiDemo`
- Visual instructions with badge sequence
- Demo button for easy testing
- Effect descriptions
- Developer console tip

## 🎵 Audio Effects

Uses Web Audio API to generate a retro beep sound:
- **Frequency**: 800Hz sine wave
- **Duration**: 0.5 seconds
- **Volume**: Exponential decay for smooth fade-out
- **No external files**: Generated programmatically

## 📱 Responsive Design

### Desktop
- Full keyboard support with arrow keys and letter keys
- All animations work smoothly
- Hover effects on demo button

### Mobile
- Limited keyboard support (physical keyboards only)
- Demo button works for testing
- All visual effects responsive

### Tablet
- External keyboard support
- Touch-friendly demo button
- Responsive animations

## ⚙️ Configuration

### Enable/Disable Feature
To disable the easter egg, remove from `app/layout.tsx`:
```typescript
// Comment out or remove this line:
<KonamiEasterEgg />
```

### Customize Sequence
Edit `hooks/use-konami-code.ts`:
```typescript
const KONAMI_CODE = [
  'KeyH', 'KeyE', 'KeyL', 'KeyL', 'KeyO' // Custom sequence
];
```

### Adjust Timeout
Change the timeout duration:
```typescript
const SEQUENCE_TIMEOUT = 5000; // 5 seconds instead of 3
```

## 🚀 Performance

- **Lightweight**: ~3KB additional JavaScript
- **Efficient**: Simple event handling with cleanup
- **No Memory Leaks**: Proper cleanup on unmount
- **GPU Accelerated**: CSS animations use transform/opacity
- **Minimal State**: Only 2 boolean state variables

## 🎯 Browser Support

- Modern browsers with ES6+ support
- Canvas API for confetti
- Web Audio API for sound (graceful fallback)
- CSS animations and transforms
- KeyboardEvent API

## 🐛 Troubleshooting

**Sequence not detected?**
- Keys must be pressed within 3 seconds
- Ensure no input fields are focused
- Check browser console for errors

**Confetti not showing?**
- Verify `canvas-confetti` is installed
- Check browser canvas support

**Spooky mode not activating?**
- Check CSS class application in DevTools
- Verify CSS variables are supported

**Sound not playing?**
- Browser may require user interaction first
- Check Web Audio API support

## 📚 Dependencies

- `react` - Core React library
- `canvas-confetti` - Confetti animation
- `lucide-react` - Icons for demo component
- `@/components/ui/*` - shadcn/ui components

## ✅ Summary

The Konami Code Easter Egg is fully implemented with:

✅ Classic sequence detection (↑↑↓↓←→←→BA)  
✅ Dual effects (confetti + spooky theme)  
✅ TypeScript type-safe implementation  
✅ Modular and easy to disable  
✅ Comprehensive comments explaining logic  
✅ Responsive design (desktop keyboards)  
✅ Tailwind CSS styling  
✅ Demo function for easy testing  
✅ Sound effects with Web Audio API  
✅ Visual polish with smooth animations  

**Try it now: ↑↑↓↓←→←→BA** 🎮✨
