# Quick Update Reference - TL;DR Version

## Before EVERY Update
```bash
git add . && git commit -m "Working version before update" && git push
```

---

## Safe Updates (Do This Monthly)
```bash
npm update           # Safe patch/minor updates
npm run dev          # Test everything works
```

---

## Check What's Outdated
```bash
npm outdated
```

---

## Your 9 Vulnerabilities
**Status:** ✅ Safe to ignore
**Why:** All in build tools (react-scripts)
**Risk:** Low (not exploitable by users)
**Action:** Leave them alone for now

---

## If Something Breaks
```bash
git checkout package.json package-lock.json
npm install
npm run dev
```

---

## Red Flags - Don't Update These Without Testing

| Package | Current | Why Risky |
|---------|---------|-----------|
| firebase | 12.6.0 | Breaks login/storage |
| react | 18.2.0 | Breaks components |
| react-scripts | 5.0.1 | Breaks build |
| react-router-dom | 6.3.0 | Breaks navigation |

---

## Green Flags - Safe to Update

- tailwindcss
- autoprefixer
- date-fns
- framer-motion
- All @types/* packages

---

## Testing Checklist After Any Update

- [ ] `npm run dev` starts without errors
- [ ] Can log in (`admin@onekey.com`)
- [ ] Can create event
- [ ] Can upload photo
- [ ] Event persists after refresh
- [ ] No console errors (F12)

---

## Emergency Contacts

- **Rollback:** `git checkout package.json package-lock.json && npm install`
- **Firebase Console:** https://console.firebase.google.com/project/onekey-c16be
- **Full Guide:** Read `SAFE_UPDATE_GUIDE.md`

---

## Golden Rule

**If it works, don't fix it!**

Your app works perfectly right now. Only update when:
1. You need a new feature
2. Critical security fix (check severity first)
3. Every 3-6 months for safe updates
