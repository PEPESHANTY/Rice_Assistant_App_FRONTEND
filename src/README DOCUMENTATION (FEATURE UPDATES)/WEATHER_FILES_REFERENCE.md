# 🗂️ Weather Feature - File Reference

Quick reference for all files related to the weather feature.

---

## 📁 Core Files

### `/config/weather.ts`
**Purpose**: Weather API configuration  
**What to do**: Add your OpenWeatherMap API key here  
**Line to edit**: Line 44 - `API_KEY: 'YOUR_API_KEY_HERE'`

```typescript
export const WEATHER_CONFIG = {
  API_KEY: 'your-key-here',  // 👈 EDIT THIS
  DEFAULT_LOCATION: { ... },
  ENDPOINTS: { ... }
}
```

---

### `/components/AppContext.tsx`
**Purpose**: Global state management + weather fetching logic  
**Key functions**:
- `fetchRealTimeWeather()` - Fetches weather from API
- `fetchWeatherWithGeolocation()` - Gets user location + fetches weather
- `refreshWeather()` - Exposed to UI for manual refresh

**What it does**:
- On app load: Checks if API key configured
- If YES: Requests location → Fetches real weather
- If NO: Uses mock data
- On error: Falls back to mock data

**Lines of interest**:
- Line 257-379: Weather fetching functions
- Line 381-401: Geolocation handling
- Line 139-148: Auto-fetch on load

---

### `/components/Weather.tsx`
**Purpose**: Weather dashboard UI  
**What it displays**:
- Current weather card
- 5-day forecast
- Weather alerts
- Farming recommendations
- Refresh button

**Key features**:
- Line 24: Gets weather data from context
- Line 31: Handles refresh button click
- Line 276-285: Refresh button UI
- Line 288-297: API configuration banner

---

## 📚 Documentation Files

### `/README.md`
**Purpose**: Main project documentation  
**Contains**: Overview, quick start, features, deployment

### `/WEATHER_API_SETUP.md`
**Purpose**: Detailed setup guide (10+ pages)  
**Contains**: Step-by-step instructions, troubleshooting, security, FAQ

### `/QUICK_WEATHER_SETUP.md`
**Purpose**: Ultra-fast setup (1 page)  
**Contains**: Just the essential steps (2 minutes)

### `/WEATHER_FEATURE_OVERVIEW.md`
**Purpose**: Technical overview  
**Contains**: Architecture, flow diagrams, debugging, customization

### `/WEATHER_FILES_REFERENCE.md` ← You are here!
**Purpose**: File structure reference  
**Contains**: What each file does and where to find things

---

## 🔄 Data Flow

```
User opens app
    ↓
main.tsx loads
    ↓
AppProvider (AppContext.tsx) initializes
    ↓
Checks WEATHER_CONFIG.isConfigured() (config/weather.ts)
    ↓
├─ API Key EXISTS
│   ↓
│   fetchWeatherWithGeolocation()
│   ↓
│   navigator.geolocation.getCurrentPosition()
│   ↓
│   ├─ Permission GRANTED → Use GPS coordinates
│   └─ Permission DENIED → Use DEFAULT_LOCATION
│   ↓
│   fetchRealTimeWeather(lat, lon)
│   ↓
│   Fetch from OpenWeatherMap API
│   ↓
│   setWeather(data) → Updates state
│   ↓
│   Weather.tsx displays data ✅
│
└─ API Key NOT CONFIGURED
    ↓
    loadMockData()
    ↓
    Weather.tsx shows demo data + blue banner 📋
```

---

## 🎨 UI Components

### Refresh Button
**File**: `/components/Weather.tsx` (Line 276-285)
```tsx
<Button onClick={handleRefresh} ... >
  <RefreshCw className={isLoadingWeather ? 'animate-spin' : ''} />
</Button>
```

### API Config Banner
**File**: `/components/Weather.tsx` (Line 288-297)
```tsx
{!WEATHER_CONFIG.isConfigured() && (
  <Alert>Demo Mode: Using mock weather data</Alert>
)}
```

### Loading State
**File**: `/components/Weather.tsx` (Line 253-263)
```tsx
if (!weather || isLoadingWeather) {
  return <Cloud className="animate-pulse" />
}
```

---

## 🔧 Key Functions

### `fetchRealTimeWeather(lat?, lon?)`
**Location**: `/components/AppContext.tsx` (Line 257-379)  
**Purpose**: Main weather fetching function  
**Parameters**:
- `lat` (optional): Latitude
- `lon` (optional): Longitude
- Defaults to An Giang if not provided

**What it does**:
1. Checks API key configured
2. Fetches current weather + 5-day forecast
3. Processes data (temperatures, conditions, alerts)
4. Sets weather state
5. Falls back to mock data on error

---

### `fetchWeatherWithGeolocation()`
**Location**: `/components/AppContext.tsx` (Line 381-401)  
**Purpose**: Get user location then fetch weather  
**What it does**:
1. Checks if geolocation available
2. Requests location permission
3. On success: Calls `fetchRealTimeWeather(lat, lon)`
4. On error: Calls `fetchRealTimeWeather()` (default location)

---

### `refreshWeather()`
**Location**: Exported from AppContext, used in Weather.tsx  
**Purpose**: Manual refresh triggered by button  
**What it does**: Same as `fetchWeatherWithGeolocation()`

---

## 📊 Mock Data

### Where Mock Data Lives
**File**: `/components/AppContext.tsx`  
**Function**: `loadMockData(lang)` (Line 142-242)

**Mock Data Includes**:
- Current weather (28°C, 78% humidity, etc.)
- 5-day forecast
- Weather alerts
- Location: "Mekong Delta, Vietnam"

**When Used**:
- API key not configured
- API request fails
- For development/demo

---

## 🌍 Location Data

### Default Location
**File**: `/config/weather.ts`  
**Setting**: `DEFAULT_LOCATION`

```typescript
DEFAULT_LOCATION: {
  latitude: 10.0452,   // An Giang Province
  longitude: 105.4340, // Mekong Delta
  name: 'An Giang'
}
```

**Used when**:
- User denies location permission
- Geolocation not available
- Browser doesn't support geolocation

---

## 🔐 API Configuration

### Where API Key Is Used
1. **Storage**: `/config/weather.ts` (Line 44)
2. **Check**: `/config/weather.ts` `isConfigured()` (Line 46-48)
3. **Used**: `/components/AppContext.tsx` `fetchRealTimeWeather()` (Line 268)

### Security Notes
- **Current**: Frontend code (OK for demos)
- **Production**: Move to environment variables
- **Alternative**: Backend proxy (Supabase, serverless)

---

## 🐛 Debugging

### Where to Look for Errors

**Console Logs** (F12 → Console):
```
// Success messages (green ✅)
✅ Location detected: ...
✅ Weather data loaded successfully

// Errors (red ❌)
❌ Failed to fetch weather data
⚠️ Weather API key not configured

// Info (blue ℹ️)
📋 Using mock weather data
🌍 Requesting location permission
```

**Check These Files**:
1. `/config/weather.ts` - API key correct?
2. Browser console - Any error messages?
3. Network tab (F12) - API requests failing?
4. `/components/AppContext.tsx` (Line 360-377) - Check error handling

---

## 📝 Quick Edits

### Change Default City
**File**: `/config/weather.ts`  
**Lines**: 27-31
```typescript
DEFAULT_LOCATION: {
  latitude: 10.7769,    // Your city
  longitude: 106.7009,  // Your city
  name: 'Your City'
}
```

### Change Temperature Units
**File**: `/components/AppContext.tsx`  
**Line**: 273 and 274
```typescript
// Change 'metric' to 'imperial' for Fahrenheit
?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}
```

### Add More Weather Data
**File**: `/components/AppContext.tsx`  
**Function**: `fetchRealTimeWeather()`  
**Lines**: 283-361

Add more fields from OpenWeatherMap API:
- UV index: `currentData.uvi`
- Sunrise: `currentData.sys.sunrise`
- Sunset: `currentData.sys.sunset`
- Pressure: `currentData.main.pressure`
- Clouds: `currentData.clouds.all`

---

## 📦 Dependencies

### NPM Packages Used
- None! Uses native browser APIs:
  - `fetch()` - For API calls
  - `navigator.geolocation` - For location

### Browser Requirements
- **Modern browser** (Chrome, Firefox, Safari, Edge)
- **HTTPS** (for geolocation, or use localhost)
- **JavaScript enabled**

---

## ✅ Testing Checklist

### Files to Check
- [ ] `/config/weather.ts` - API key added?
- [ ] `/components/AppContext.tsx` - No TypeScript errors?
- [ ] `/components/Weather.tsx` - UI displays correctly?
- [ ] Browser console - No errors?
- [ ] Network tab - API calls successful?

### Features to Test
- [ ] Page loads without errors
- [ ] Weather section shows data (mock or real)
- [ ] Refresh button works
- [ ] Loading animation shows
- [ ] Banner appears/disappears based on config
- [ ] Location permission prompt (if API configured)
- [ ] Falls back gracefully on errors

---

## 🎯 Common Tasks

### Task: Enable Real Weather
1. Edit `/config/weather.ts` (Line 44)
2. Add API key from openweathermap.org
3. Refresh browser
4. Click refresh button in Weather section
5. Grant location permission
6. See real weather ✅

### Task: Disable Real Weather (Use Mock)
1. Edit `/config/weather.ts` (Line 44)
2. Change API key back to `'YOUR_API_KEY_HERE'`
3. Refresh browser
4. Mock data loads automatically ✅

### Task: Change Default Location
1. Edit `/config/weather.ts` (Lines 27-31)
2. Update latitude, longitude, name
3. Refresh browser ✅

### Task: Customize Weather UI
1. Edit `/components/Weather.tsx`
2. Modify JSX (Line 265+)
3. Change cards, colors, layout
4. Save and see changes ✅

---

## 📞 Need Help?

### Quick Checks
1. **API key**: Is it correct in `/config/weather.ts`?
2. **Console**: Any errors in browser console (F12)?
3. **Network**: Check API calls in Network tab (F12)
4. **Permissions**: Did you grant location permission?

### Still Not Working?
1. Try mock data first (remove API key)
2. Check OpenWeatherMap API status
3. Verify API key is active (check their dashboard)
4. Test in incognito mode (clear cache)

---

## 🎨 File Tree

```
├── config/
│   └── weather.ts              ⚙️ Configuration
│
├── components/
│   ├── AppContext.tsx          🧠 Logic + State
│   └── Weather.tsx             🎨 UI
│
├── QUICK_WEATHER_SETUP.md      ⚡ Quick guide
├── WEATHER_API_SETUP.md        📖 Full guide
├── WEATHER_FEATURE_OVERVIEW.md 🎯 Technical
└── WEATHER_FILES_REFERENCE.md  📂 This file
```

---

**Now you know where everything is! Happy coding! 🚀**
