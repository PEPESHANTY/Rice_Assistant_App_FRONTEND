# 🇻🇳 Default Language: Vietnamese

## Summary

The application now defaults to **Vietnamese (VI)** language when it loads.

## Changes Made

### 1. Initial Language State
The app starts with Vietnamese as the default language:
```typescript
const [language, setLanguage] = useState<'EN' | 'VI'>('VI');
```

### 2. User Login Default
When users log in, their language preference is set to Vietnamese:
```typescript
language: 'VI',
```

Mock user farm data is now in Vietnamese:
- Farm name: **"Trang Trại Chính"** (Main Farm)
- Location: **"Tỉnh An Giang, Việt Nam"** (An Giang Province, Vietnam)
- Plot A: **"Lô A"** with **"Đất Sét Pha"** (Clay Loam) and **"Tưới Ngập"** (Flood Irrigation)
- Plot B: **"Lô B"** with **"Đất Phù Sa"** (Alluvial) and **"Tưới Nhỏ Giọt"** (Drip Irrigation)

### 3. User Signup Default
New users are created with Vietnamese as default language:
```typescript
language: userData.language || 'VI',
```

### 4. localStorage Fallback
If no language is stored in localStorage, defaults to Vietnamese:
```typescript
setLanguage(userData.language || 'VI');
```

## User Experience

### First Time Visitors
- ✅ See the app in Vietnamese immediately
- ✅ All UI text, buttons, and labels in Vietnamese
- ✅ Weather data displays in Vietnamese format
- ✅ Date and time formatted for Vietnamese locale

### Returning Users
- If they previously selected English, they'll see English (localStorage preserved)
- If they never changed language, they'll see Vietnamese (default)
- Can switch to English anytime via the language toggle in Profile

### After Login/Signup
- User account created with Vietnamese as default
- Mock farm data appears in Vietnamese
- All system content in Vietnamese

## Language Switching

Users can still switch to English by:
1. Going to **Profile** (Hồ Sơ)
2. Using the **Language toggle** (Ngôn Ngữ)
3. Selecting **English**

The preference is saved to localStorage and persists across sessions.

## Benefits

✅ **Better for Target Users**: Vietnamese rice farmers see their native language first
✅ **Culturally Appropriate**: Aligns with the primary user base in Vietnam
✅ **Easier Onboarding**: No need to change language settings for Vietnamese users
✅ **Still Flexible**: English speakers can easily switch languages
✅ **Persistent Choice**: Selected language is remembered across visits

## Technical Details

### Files Modified
- `components/AppContext.tsx`:
  - Changed initial language state to 'VI'
  - Updated login mock user language to 'VI'
  - Updated signup default language to 'VI'
  - Changed mock farm data to Vietnamese strings

### Language Loading Priority
1. **User's saved preference** (from localStorage)
2. **User object language** (from login/signup)
3. **Default**: Vietnamese ('VI')

## Testing

### Clear Storage and Test
To see the default language on a fresh load:
```javascript
// In browser console
localStorage.clear();
location.reload();
```

Result: App should load in Vietnamese

### Login Test
1. Clear localStorage
2. Login with any credentials
3. Check that all farm data appears in Vietnamese

### Signup Test
1. Clear localStorage
2. Create a new account
3. Check that user language is set to Vietnamese

## Related Features

- **Bilingual Support**: Full Vietnamese/English translation throughout app
- **Language Toggle**: Easy switching between languages in Profile
- **Persistent Preferences**: Language choice saved to localStorage
- **Locale Formatting**: Dates, times, and numbers formatted for selected language

---

**Status**: ✅ Implemented - Vietnamese is now the default language
**Date**: Sunday, October 12, 2025
