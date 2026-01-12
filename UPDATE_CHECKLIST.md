# Update Checklist - FOLLOW THIS BEFORE UPDATING!

## Before Running Any npm Updates

### 1. Commit Your Working Code to Git
```bash
git add .
git commit -m "Working version before updates"
git push
```

### 2. Backup Your Firebase Config (Just in Case)
- Copy `src/lib/firebase.ts` to a safe location
- Screenshot your Firestore Rules (in Firebase Console)
- Screenshot your Storage Rules

### 3. Safe Update Commands

#### ✅ SAFE - Minor/Patch Updates Only
```bash
npm update
```
This updates packages within the same major version (e.g., 5.0.1 → 5.0.2)

#### ⚠️ RISKY - Major Version Updates
```bash
npm install react@latest  # DON'T do this without testing!
```

### 4. After Updates - Test Everything

Before deploying or assuming it works:

- [ ] Does `npm run dev` start without errors?
- [ ] Can you log in to the admin dashboard?
- [ ] Can you create a new event?
- [ ] Can you see existing events?
- [ ] Can you delete an event?
- [ ] Can you upload images?
- [ ] Check browser console for errors (F12)

### 5. If Something Breaks

#### Rollback Method 1: Git
```bash
git checkout package.json package-lock.json
npm install
```

#### Rollback Method 2: Restore from Backup
- Copy your backup files back
- Run `npm install` again

## What Updates Are SAFE

### These won't affect Firebase data:
- ✅ Updating dev dependencies (like eslint, prettier)
- ✅ Updating patch versions (5.0.1 → 5.0.2)
- ✅ Updating minor versions (5.0.0 → 5.1.0) - usually safe
- ✅ Updating build tools (webpack, babel)

### These MIGHT break things:
- ⚠️ Major version updates (5.x.x → 6.x.x)
- ⚠️ Updating firebase package
- ⚠️ Updating react, react-router-dom
- ⚠️ Updating react-scripts

## Firebase Data Safety

### Your data is ALWAYS safe because:
1. Firebase data lives in Google's cloud, not on your computer
2. npm updates only change code, not cloud data
3. Even if you delete all code, Firebase data stays intact
4. You can access data directly in Firebase Console

### To verify data is safe after updates:
1. Go to Firebase Console → Firestore Database → Data
2. Check that your events/users are still there
3. They will be - cloud storage is separate from code!

## Emergency Contact Info

If you break something and need to restore:
- Firebase Console: https://console.firebase.google.com/project/onekey-c16be
- GitHub Repository: https://github.com/smiles0527/Onekey
- Project Location: C:\Users\iscur\OneDrive\my surface docs\desktop\code\Onekey

## Best Practice: Version Pinning

Your `package.json` currently uses `^` (caret) which allows minor updates.

To lock versions completely (safest):
1. Change `^5.0.1` to `5.0.1` (remove the ^)
2. Run `npm install` to update package-lock.json
3. Now `npm install` will always use exact versions

## Summary

🟢 **Firebase Data**: Always safe, stored in cloud
🟡 **npm updates**: Test before deploying
🔴 **Code changes**: Can break things, use git!

**Golden Rule**: If it works, commit to git before changing anything!
