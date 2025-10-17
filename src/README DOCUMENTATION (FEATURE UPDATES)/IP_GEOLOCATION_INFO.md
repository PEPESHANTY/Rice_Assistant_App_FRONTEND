# IP-Based Geolocation

## Overview

The farming assistant app now uses **IP-based geolocation** to automatically detect your location instead of requesting GPS permissions. This provides a seamless experience with no user intervention required.

## How It Works

1. **IP Detection**: When you open the app, it automatically detects your approximate location based on your IP address using the free ip-api.com service.

2. **Weather Fetching**: The detected coordinates are used to fetch real-time weather data from Open-Meteo API.

3. **Location Display**: Your city/region name is displayed at the top of the weather screen.

## Benefits

✅ **No Permissions Required**: Works immediately without asking for GPS access  
✅ **Faster Loading**: IP-based detection is instant, no waiting for GPS signal  
✅ **Battery Friendly**: Doesn't drain battery like GPS  
✅ **Privacy Conscious**: Uses approximate location (city-level), not precise GPS  
✅ **Completely Free**: Both ip-api.com and Open-Meteo are free with no API keys needed  
✅ **Reliable**: Works on all devices and browsers  

## Accuracy

- **IP-based geolocation** provides city-level accuracy (typically 5-50 km radius)
- This is sufficient for weather forecasting purposes
- More accurate than asking users to manually select their location
- Less precise than GPS, but adequate for farming weather information

## API Services Used

### 1. IP Geolocation: Multiple Services (with Fallback)
The app tries multiple free HTTPS IP geolocation services:

#### Primary: ipapi.co
- **Purpose**: Detect user's location from IP address
- **Cost**: Completely free
- **API Key**: Not required
- **Protocol**: HTTPS (secure)
- **Limits**: 1,000 requests/day (more than enough for this app)
- **Data Provided**: City, region, country, latitude, longitude, timezone

#### Fallback: geojs.io
- **Purpose**: Backup IP geolocation service
- **Cost**: Completely free
- **API Key**: Not required
- **Protocol**: HTTPS (secure)
- **Limits**: No rate limit
- **Data Provided**: City, region, country, latitude, longitude

### 2. Weather Data: Open-Meteo
- **Purpose**: Fetch real-time weather and 5-day forecast
- **Cost**: Completely free
- **API Key**: Not required
- **Data Provided**: Temperature, humidity, rainfall, wind speed, weather conditions

## Privacy & Security

- No personal data is collected or stored
- IP address is only used transiently to detect location
- Location data is city-level, not precise GPS coordinates
- All API calls are made directly from the user's browser
- No tracking or analytics

## Fallback Behavior

If IP-based geolocation fails (e.g., network issues, API down):
- App automatically falls back to **An Giang, Vietnam** (Mekong Delta)
- Weather data will still load and display
- User experience is not interrupted

## Technical Details

### IP Geolocation Request
```javascript
// Example API call
fetch('http://ip-api.com/json/?fields=status,country,city,lat,lon')
```

### Response Format
```json
{
  "status": "success",
  "country": "Vietnam",
  "city": "Ho Chi Minh City",
  "lat": 10.8231,
  "lon": 106.6297
}
```

## Troubleshooting

### Location showing wrong city?
This is normal with IP-based geolocation. The location is approximate based on your internet service provider's routing. Weather data will still be accurate for your general region.

### Weather not loading?
1. Check your internet connection
2. Disable any VPN or proxy (they can affect IP geolocation)
3. Try refreshing the weather using the refresh button
4. Check browser console for detailed error messages

### Using VPN?
When using a VPN, the detected location will be based on your VPN server's location, not your actual location. For accurate local weather, disable VPN or the app will use the default An Giang location.

## Future Enhancements

Potential improvements:
- Add manual location selector for users who want to override IP-based detection
- Cache detected location for faster subsequent loads
- Allow users to save multiple farm locations
- Add location search functionality

## Related Files

- `/components/AppContext.tsx` - Contains IP geolocation and weather fetching logic
- `/components/Weather.tsx` - Weather display component
- `/config/weather.ts` - Weather configuration and constants
- `/WEATHER_TROUBLESHOOTING.md` - General weather troubleshooting guide
