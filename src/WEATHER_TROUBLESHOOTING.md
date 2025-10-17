# 🔧 Weather API Troubleshooting Guide

## 🌍 Location Detection (NEW: IP-Based)

The app now uses **IP-based geolocation** to automatically detect your location instead of GPS. This means:
- ✅ No permission prompts
- ✅ Works instantly (< 1 second)
- ✅ City-level accuracy (sufficient for weather)
- ✅ Works on all devices without GPS

See `/IP_GEOLOCATION_INFO.md` for detailed information about IP-based geolocation.

---

## Common Errors & Solutions

### ❌ Error: "Failed to fetch weather data: TypeError: Load failed"

This error typically means the browser cannot connect to the Open-Meteo API. Here are the solutions:

---

## ✅ Solution 1: Check Internet Connection

**Problem**: No internet or unstable connection  
**Solution**:
1. Check your internet connection is working
2. Try loading other websites
3. Refresh the page
4. The app will automatically fall back to mock data if offline

---

## ✅ Solution 2: CORS / Browser Security

**Problem**: Browser blocking cross-origin requests  
**Solution**:

### For Development (localhost):
Open-Meteo allows CORS from all origins, so this should work. If it doesn't:

1. **Clear browser cache**:
   - Chrome: Settings → Privacy → Clear browsing data
   - Firefox: Settings → Privacy → Clear Data
   - Safari: Safari → Clear History

2. **Try incognito/private mode**:
   - Chrome: Ctrl+Shift+N (Cmd+Shift+N on Mac)
   - Firefox: Ctrl+Shift+P (Cmd+Shift+P on Mac)
   - Safari: File → New Private Window

3. **Disable browser extensions**:
   - Ad blockers or privacy extensions might block API calls
   - Try disabling them temporarily

---

## ✅ Solution 3: Firewall / Network Restrictions

**Problem**: Corporate firewall or network blocking API  
**Solution**:

1. **Check if Open-Meteo is accessible**:
   - Open this URL in your browser:
   ```
   https://api.open-meteo.com/v1/forecast?latitude=10.0452&longitude=105.4340&current=temperature_2m
   ```
   - You should see JSON data
   - If you get an error, your network is blocking it

2. **Solutions**:
   - Try a different network (mobile hotspot, home wifi)
   - Contact your IT department to whitelist:
     - `api.open-meteo.com`
     - `geocoding-api.open-meteo.com`
   - Use VPN if allowed

---

## ✅ Solution 4: DNS Issues

**Problem**: DNS cannot resolve open-meteo.com  
**Solution**:

1. **Flush DNS cache**:
   - Windows: `ipconfig /flushdns`
   - Mac: `sudo dscacheutil -flushcache`
   - Linux: `sudo systemd-resolve --flush-caches`

2. **Try different DNS**:
   - Switch to Google DNS (8.8.8.8)
   - Or Cloudflare DNS (1.1.1.1)

---

## ✅ Solution 5: API is Down (Rare)

**Problem**: Open-Meteo API temporarily unavailable  
**Solution**:

1. **Check API status**:
   - Visit: https://open-meteo.com
   - Test the API directly (URL from Solution 3)

2. **The app handles this**:
   - Automatically falls back to mock data
   - Shows weather from cache
   - Try refreshing in a few minutes

---

## 🧪 Debug Steps

### Step 1: Open Browser Console
1. Press **F12** (or Right-click → Inspect)
2. Click **Console** tab
3. Look for error messages

### Step 2: Check Network Tab
1. In DevTools, click **Network** tab
2. Refresh the page
3. Look for requests to `api.open-meteo.com`
4. Check their status:
   - ✅ **200 OK** = Success
   - ❌ **Failed** = Network issue
   - ❌ **CORS error** = Browser security
   - ❌ **404** = Wrong URL (shouldn't happen)

### Step 3: Test API Directly
1. Open new tab
2. Paste this URL:
   ```
   https://api.open-meteo.com/v1/forecast?latitude=10.0452&longitude=105.4340&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto&forecast_days=7
   ```
3. You should see JSON data
4. If not, the API is blocked or down

### Step 4: Check Console Logs
Look for these messages:

**Success**:
```
🚀 Real-time weather enabled! Using IP-based location detection + Open-Meteo API
🌍 Detecting location from IP address...
📍 IP geolocation data: {country: "Vietnam", city: "Ho Chi Minh City", ...}
✅ Location detected from IP: Ho Chi Minh City, Vietnam (10.8231, 106.6297)
🌦️ Fetching real-time weather data from Open-Meteo...
📍 Using IP-based location: Ho Chi Minh City, Vietnam
✅ Weather data loaded successfully for Ho Chi Minh City
```

**Failure**:
```
❌ Failed to fetch weather data: TypeError: Load failed
🔄 Falling back to mock weather data
Network error - check internet connection or CORS policy
```

---

## 🔄 Fallback Behavior

**Good News**: The app never breaks! If weather API fails:

1. ✅ Shows **mock weather data**
2. ✅ All features still work
3. ✅ Forecasts still display
4. ✅ You can continue using the app
5. ✅ Try refresh button later

**Mock Data Shows**:
- Location: "Mekong Delta, Vietnam"
- Temperature: 28°C
- Humidity: 78%
- 5-day forecast
- Weather alerts (if conditions met)

---

## 🌐 Network Requirements

For weather to work, your environment needs:

| Requirement | Details |
|-------------|---------|
| **Internet** | Active connection |
| **Protocols** | HTTPS enabled |
| **Ports** | Port 443 (HTTPS) open |
| **DNS** | Can resolve `.com` domains |
| **CORS** | No restrictions on API calls |
| **Firewall** | Allows `api.open-meteo.com` |

---

## 💻 Environment-Specific Issues

### Local Development
✅ Should work fine on `localhost`  
✅ No SSL/HTTPS required locally  
⚠️ Some browsers restrict geolocation on HTTP

### Production (Deployed)
✅ **Must use HTTPS** for geolocation  
✅ Domain must have valid SSL certificate  
✅ Open-Meteo works from any domain

### Mobile Browsers
✅ Works on iOS Safari  
✅ Works on Android Chrome  
✅ No location permission needed (uses IP geolocation)  
✅ Works on HTTP and HTTPS

---

## 📍 IP Geolocation Troubleshooting

### Location showing wrong city?
**This is normal**. IP-based geolocation:
- Provides city-level accuracy (not street-level)
- Depends on your ISP's routing
- Shows approximate location (5-50 km radius)
- **Weather data is still accurate** for your region

**If you're using VPN**:
- Location will show your VPN server's city
- Disable VPN for local weather
- Or app will use default An Giang location

**Corporate networks**:
- May show company headquarters location
- This is expected with proxy/firewall
- Weather will still be relevant for that region

### IP geolocation API blocked?
The app uses multiple HTTPS IP geolocation services for reliability:
1. **Primary**: ipapi.co (HTTPS)
2. **Fallback**: geojs.io (HTTPS)
3. **Final fallback**: An Giang, Vietnam (default)

If both services fail:
1. Check browser console for errors
2. Try accessing `https://ipapi.co/json/` directly in browser
3. Try accessing `https://get.geojs.io/v1/ip/geo.json` directly
4. Check if firewall blocks these domains
5. App will automatically use default An Giang, Vietnam location

**Fallback behavior**:
- If IP detection fails → Uses default An Giang coordinates
- Weather data still loads successfully
- You can manually refresh to retry

---

## 🔍 Common Console Errors

### "TypeError: Load failed"
**Cause**: Network cannot reach API  
**Fix**: Check internet, firewall, DNS

### "Network request failed"
**Cause**: Connection interrupted  
**Fix**: Retry, check connection stability

### "CORS policy: No 'Access-Control-Allow-Origin'"
**Cause**: Browser blocking (shouldn't happen with Open-Meteo)  
**Fix**: Clear cache, try incognito mode

### "Failed to fetch"
**Cause**: Generic network error  
**Fix**: Check network tab in DevTools

---

## 🧰 Advanced Debugging

### Test with cURL
```bash
curl "https://api.open-meteo.com/v1/forecast?latitude=10.0452&longitude=105.4340&current=temperature_2m"
```

Should return JSON. If not, network issue.

### Test with Postman
1. Install Postman
2. Create GET request to weather URL
3. Should return 200 OK with data

### Check DNS Resolution
```bash
nslookup api.open-meteo.com
ping api.open-meteo.com
```

Should resolve to an IP address.

---

## 🆘 Still Not Working?

### Option 1: Use Mock Data
The app works perfectly with mock data. Just ignore the error!

### Option 2: Check Your Setup
1. ✅ Internet connected?
2. ✅ Browser up to date?
3. ✅ No ad blockers blocking APIs?
4. ✅ Corporate firewall not too strict?

### Option 3: Try Different Environment
- Different browser
- Different network
- Different device
- Mobile hotspot

### Option 4: Wait and Retry
- API might be temporarily down
- Network issue might resolve
- Try again in 5-10 minutes

---

## 📊 Expected Behavior

### When It Works ✅
```
1. App loads
2. Requests location permission
3. Fetches weather from API
4. Shows real weather data
5. Green banner: "Real-Time Weather Active"
```

### When It Fails ❌
```
1. App loads
2. Tries to fetch weather
3. Gets network error
4. Falls back to mock data
5. Still fully functional!
```

---

## 🎯 Prevention Tips

1. **Stable Internet**: Use reliable connection
2. **Modern Browser**: Keep browser updated
3. **HTTPS**: Deploy on HTTPS domain
4. **Whitelist APIs**: If corporate network, whitelist domains
5. **Monitor Console**: Check for errors regularly

---

## 📞 Get Help

### Check Documentation
- [`README.md`](./README.md) - Main docs
- [`OPEN_METEO_INFO.md`](./OPEN_METEO_INFO.md) - API details
- [`WEATHER_READY_TO_USE.md`](./WEATHER_READY_TO_USE.md) - Usage guide

### Debug Checklist
- [ ] Internet connected?
- [ ] Browser console shows errors?
- [ ] Network tab shows failed requests?
- [ ] API URL works in browser?
- [ ] Tried incognito mode?
- [ ] Tried different network?
- [ ] Cleared cache?
- [ ] Mock data working?

---

## 💡 Remember

**The app always works!** Even if weather API fails, you get:
- ✅ Mock weather data
- ✅ Full app functionality
- ✅ All features available
- ✅ Can retry anytime

**Don't worry!** The error is just informational. Your app is working fine! 🎉

---

*Last updated: October 12, 2025*
