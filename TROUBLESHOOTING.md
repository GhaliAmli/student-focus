# StudentFocus - Troubleshooting Guide

## Common Issues & Solutions

### 404 Errors on Pages

**Symptoms:**
- Pages show 404 errors
- Routes not found
- Blank pages

**Solutions:**
1. **Clear Next.js cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

2. **Verify page structure:**
   - Each route should have a `page.tsx` file
   - Check `app/[route]/page.tsx` exists

3. **Check for build errors:**
   ```bash
   npm run build
   ```

### Duplicate Key Errors

**Symptoms:**
- Console warning: "Encountered two children with the same key"
- React errors about duplicate keys

**Solutions:**
✅ **Fixed in latest version:**
- Store now checks for duplicate IDs before adding
- Mock data only loads once per session
- SessionStorage prevents duplicate loading

**Manual fix if needed:**
1. Clear localStorage:
   ```javascript
   localStorage.clear()
   ```

2. Refresh the page

3. Mock data will reload cleanly

### Data Not Persisting

**Symptoms:**
- Tasks disappear on refresh
- Settings reset
- Data not saving

**Solutions:**
1. **Check localStorage is enabled:**
   - Open DevTools → Application → Local Storage
   - Verify `studentfocus_*` keys exist

2. **Check browser storage space:**
   - Clear old data if needed
   - Export important data first

3. **Verify store initialization:**
   - Check console for errors
   - Ensure `initializeFromStorage()` is called

### Confetti Not Showing

**Symptoms:**
- No animation when completing tasks
- Console errors about canvas-confetti

**Solutions:**
1. **Verify dependency installed:**
   ```bash
   npm install canvas-confetti @types/canvas-confetti
   ```

2. **Check browser compatibility:**
   - Modern browsers only
   - Canvas support required

3. **Check console for errors:**
   - Look for import errors
   - Verify module loading

### Drag & Drop Not Working

**Symptoms:**
- Can't drag tasks
- Tasks don't reorder
- Drag handle not working

**Solutions:**
1. **Ensure "Manual Order" is selected:**
   - Check sort dropdown
   - Must be on "Manual Order" mode

2. **Verify @dnd-kit installed:**
   ```bash
   npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
   ```

3. **Check for console errors:**
   - Look for DnD-related errors
   - Verify sensors initialized

### Floating Action Button Not Appearing

**Symptoms:**
- FAB not visible
- Can't see + button

**Solutions:**
1. **Scroll down the page:**
   - FAB appears after scrolling
   - Hidden at page top

2. **Check z-index conflicts:**
   - FAB has `z-50`
   - Verify no overlapping elements

3. **Verify component imported:**
   - Check `app/layout.tsx`
   - Ensure `<FloatingActionButton />` included

### Keyboard Shortcut Not Working

**Symptoms:**
- Pressing 'n' doesn't open Quick Add
- Shortcut not responding

**Solutions:**
1. **Check focus:**
   - Must not be in input field
   - Must not be in textarea
   - Click outside form fields first

2. **Verify no modifier keys:**
   - Don't hold Ctrl/Cmd/Alt
   - Just press 'n' alone

3. **Check browser extensions:**
   - Some extensions intercept keys
   - Try in incognito mode

### Theme Not Changing

**Symptoms:**
- Theme toggle doesn't work
- Stuck in light/dark mode

**Solutions:**
1. **Clear browser cache:**
   ```bash
   Ctrl+Shift+Delete (Windows)
   Cmd+Shift+Delete (Mac)
   ```

2. **Check localStorage:**
   ```javascript
   localStorage.getItem('studentfocus_settings')
   ```

3. **Verify CSS loaded:**
   - Check for `dark` class on `<html>`
   - Inspect element in DevTools

### Build Errors

**Symptoms:**
- `npm run build` fails
- TypeScript errors
- Module not found errors

**Solutions:**
1. **Clean install:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Check Node version:**
   ```bash
   node --version
   # Should be v18 or higher
   ```

3. **Verify all dependencies:**
   ```bash
   npm install
   ```

### Performance Issues

**Symptoms:**
- Slow page loads
- Laggy animations
- High memory usage

**Solutions:**
1. **Clear localStorage:**
   - Too much data can slow down
   - Export and clear old data

2. **Reduce task count:**
   - Archive completed tasks
   - Delete old data

3. **Check browser extensions:**
   - Disable unnecessary extensions
   - Try in incognito mode

### Import/Export Issues

**Symptoms:**
- Can't import JSON
- Export doesn't download
- Invalid data format

**Solutions:**
1. **Verify JSON format:**
   ```json
   {
     "tasks": [...],
     "exams": [...],
     "studyPlans": [...],
     "studySessions": [...]
   }
   ```

2. **Check file encoding:**
   - Must be UTF-8
   - No BOM (Byte Order Mark)

3. **Validate JSON:**
   - Use JSONLint.com
   - Check for syntax errors

---

## Development Issues

### Hot Reload Not Working

**Solutions:**
```bash
# Kill the dev server
Ctrl+C

# Clear cache
rm -rf .next

# Restart
npm run dev
```

### Port Already in Use

**Solutions:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### TypeScript Errors

**Solutions:**
```bash
# Check for errors
npm run build

# Verify types
npx tsc --noEmit
```

---

## Browser-Specific Issues

### Safari

**Issues:**
- localStorage limits
- CSS compatibility

**Solutions:**
- Enable localStorage in settings
- Update to latest Safari version

### Firefox

**Issues:**
- Private browsing restrictions
- localStorage disabled

**Solutions:**
- Check privacy settings
- Allow localStorage for site

### Chrome

**Issues:**
- Extension conflicts
- Memory limits

**Solutions:**
- Disable extensions
- Clear site data

---

## Data Recovery

### Lost Data

**If you lost data:**

1. **Check localStorage:**
   ```javascript
   // In browser console
   Object.keys(localStorage).filter(k => k.startsWith('studentfocus'))
   ```

2. **Check browser history:**
   - Look for exported JSON files
   - Check Downloads folder

3. **Check cloud backups:**
   - Google Drive
   - Dropbox
   - OneDrive

### Corrupted Data

**If data is corrupted:**

1. **Export what you can:**
   ```javascript
   // In console
   console.log(localStorage.getItem('studentfocus_tasks'))
   ```

2. **Clear and restart:**
   ```javascript
   localStorage.clear()
   location.reload()
   ```

3. **Import from backup:**
   - Use Settings → Import Data
   - Select valid backup file

---

## Getting Help

### Check Console

1. Open DevTools (F12)
2. Go to Console tab
3. Look for errors (red text)
4. Copy error messages

### Check Network

1. Open DevTools (F12)
2. Go to Network tab
3. Look for failed requests
4. Check status codes

### Check Application

1. Open DevTools (F12)
2. Go to Application tab
3. Check Local Storage
4. Verify data structure

---

## Prevention Tips

### Regular Backups

```bash
# Export data weekly
Settings → Export All Data
```

### Monitor Storage

```javascript
// Check storage size
let total = 0;
for (let key in localStorage) {
  if (key.startsWith('studentfocus')) {
    total += localStorage[key].length;
  }
}
console.log(`Storage used: ${(total / 1024).toFixed(2)} KB`);
```

### Keep Updated

```bash
# Update dependencies
npm update

# Check for updates
npm outdated
```

---

## Still Having Issues?

1. **Clear everything and start fresh:**
   ```bash
   # Clear cache
   rm -rf .next node_modules
   
   # Reinstall
   npm install
   
   # Clear browser data
   localStorage.clear()
   
   # Restart
   npm run dev
   ```

2. **Check documentation:**
   - README.md
   - STORAGE-GUIDE.md
   - ADVANCED-FEATURES.md

3. **Verify environment:**
   - Node.js v18+
   - Modern browser
   - JavaScript enabled

---

**Most issues can be resolved by clearing cache and restarting! 🔄**
