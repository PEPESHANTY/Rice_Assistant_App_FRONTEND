import React, { createContext, useContext, useState, useEffect } from 'react';
import { WEATHER_CONFIG } from '../config/weather';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  language: 'EN' | 'VI';
  fontSize?: 'small' | 'default' | 'large';
  farms: Farm[];
}

interface Farm {
  id: string;
  name: string;
  location: string;
  plots: Plot[];
}

interface Plot {
  id: string;
  name: string;
  soilType: string;
  riceVariety: string;
  sowingDate: string;
  harvestDate: string;
  irrigation: string;
  area: number;
  areaUnit: string;
  photos: string[];
}

interface JournalEntry {
  id: string;
  plotId: string;
  date: string;
  type: string;
  title: string;
  content: string;
  photos: string[];
  audioNote?: string;
}

interface Task {
  id: string;
  plotId: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  reminder?: boolean;
  type: 'planting' | 'weeding' | 'fertilizer' | 'irrigation' | 'pest' | 'harvest' | 'other';
}

interface WeatherData {
  location: string;
  timezone: string; // IANA timezone identifier (e.g., 'Asia/Ho_Chi_Minh', 'America/New_York')
  current: {
    temperature: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    condition: string;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    rainfall: number;
    condition: string;
  }>;
  alerts: Array<{
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

interface AppContextType {
  user: User | null;
  language: 'EN' | 'VI';
  fontSize: 'small' | 'default' | 'large';
  journalEntries: JournalEntry[];
  tasks: Task[];
  weather: WeatherData | null;
  isLoadingWeather: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: Partial<User>) => Promise<boolean>;
  updateUser: (userData: Partial<User>) => void;
  setFontSize: (size: 'small' | 'default' | 'large') => void;
  updateFarm: (farmId: string, farmData: Partial<Farm>) => void;
  updatePlot: (farmId: string, plotId: string, plotData: Partial<Plot>) => void;
  addJournalEntry: (entry: Omit<JournalEntry, 'id'>) => void;
  updateJournalEntry: (id: string, entry: Partial<JournalEntry>) => void;
  deleteJournalEntry: (id: string) => void;
  addTask: (task: Omit<Task, 'id'>) => void;
  updateTask: (id: string, task: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleLanguage: () => void;
  refreshWeather: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [language, setLanguage] = useState<'EN' | 'VI'>('VI');
  const [fontSize, setFontSizeState] = useState<'small' | 'default' | 'large'>('default');
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true); // Start as true to show loading on initial load

  useEffect(() => {
    // Load mock data and user from localStorage
    const savedUser = localStorage.getItem('farmAssistantUser');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setLanguage(userData.language || 'VI');
      setFontSizeState(userData.fontSize || 'default');
      loadMockJournalAndTasks(); // Only load journal and tasks, not weather
    }
    
    // Load font size from localStorage
    const savedFontSize = localStorage.getItem('farmAssistantFontSize');
    if (savedFontSize) {
      setFontSizeState(savedFontSize as 'small' | 'default' | 'large');
    }
    
    // Try to fetch real-time weather data immediately using IP-based location
    console.log('🚀 Real-time weather enabled! Using IP-based location detection + Open-Meteo API (no API key needed)');
    
    // Fetch real weather immediately without showing mock data first
    const fetchWithTimeout = async () => {
      try {
        await fetchWeatherWithGeolocation();
      } catch (err) {
        console.error('Initial weather fetch failed:', err);
        console.log('💡 Falling back to mock weather data (demo mode)');
        console.log('📖 See WEATHER_TROUBLESHOOTING.md for help');
        // Only load mock weather if real weather fetch fails
        loadMockWeather(language);
        setIsLoadingWeather(false); // Ensure loading state is cleared
      }
    };
    
    fetchWithTimeout();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Apply font size to document root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  // Update weather data, tasks, and journal when language changes (without refetching)
  useEffect(() => {
    if (weather) {
      // Extract location name from current weather location (remove country part)
      const locationParts = weather.location.split(',');
      const locationName = locationParts[0].trim();
      
      // Update location with new language
      const updatedLocation = language === 'EN' 
        ? `${locationName}, Vietnam` 
        : `${locationName}, Việt Nam`;
      
      // Update alerts with new language
      const updatedAlerts = [
        {
          type: language === 'EN' ? 'Monsoon Season Advisory' : 'Thông Báo Mùa Mưa',
          message: language === 'EN'
            ? 'Monitor drainage systems and prepare for potential heavy rainfall during monsoon season.'
            : 'Theo dõi hệ thống thoát nước và chuẩn bị cho mưa lớn trong mùa mưa.',
          severity: 'medium' as const
        },
        {
          type: language === 'EN' ? 'Irrigation Reminder' : 'Nhắc Nhở Tưới Nước',
          message: language === 'EN'
            ? 'Maintain water levels 5-10cm during vegetative stage. Adjust based on weather conditions.'
            : 'Duy trì mực nước 5-10cm trong giai đoạn sinh trưởng. Điều chỉnh theo điều kiện thời tiết.',
          severity: 'low' as const
        }
      ];
      
      // Update weather without changing actual data
      setWeather({
        ...weather,
        location: updatedLocation,
        alerts: updatedAlerts
      });
    }

    // Update journal entries language
    if (journalEntries.length > 0) {
      setJournalEntries(prevEntries => 
        prevEntries.map(entry => {
          // Only update demo entries (id '1' and '2')
          if (entry.id === '1') {
            return {
              ...entry,
              title: language === 'EN' ? 'Sowing Season Begins' : 'Bắt Đầu Mùa Gieo Sạ',
              content: language === 'EN' 
                ? 'Started sowing IR64 variety in Plot A. Weather conditions are favorable with adequate moisture.'
                : 'Bắt đầu gieo giống IR64 tại Lô A. Điều kiện thời tiết thuận lợi với độ ẩm đầy đủ.'
            };
          }
          if (entry.id === '2') {
            return {
              ...entry,
              title: language === 'EN' ? 'First Fertilizer Application' : 'Bón Phân Lần Đầu',
              content: language === 'EN'
                ? 'Applied NPK fertilizer as per recommended dosage. Will monitor plant response over next week.'
                : 'Đã bón phân NPK theo liều lượng khuyến nghị. Sẽ theo dõi phản ứng của cây trong tuần tới.'
            };
          }
          return entry;
        })
      );
    }

    // Update tasks language
    if (tasks.length > 0) {
      setTasks(prevTasks =>
        prevTasks.map(task => {
          // Only update demo tasks (id '1', '2', and '3')
          if (task.id === '1') {
            return {
              ...task,
              title: language === 'EN' ? 'Weeding Required' : 'Cần Làm Cỏ',
              description: language === 'EN'
                ? 'Remove weeds from Plot A, focus on areas near irrigation channels'
                : 'Dọn cỏ dại ở Lô A, tập trung vào khu vực gần kênh tưới'
            };
          }
          if (task.id === '2') {
            return {
              ...task,
              title: language === 'EN' ? 'Check Irrigation System' : 'Kiểm Tra Hệ Thống Tưới',
              description: language === 'EN'
                ? 'Inspect and clean irrigation channels for Plot B'
                : 'Kiểm tra và làm sạch kênh tưới cho Lô B'
            };
          }
          if (task.id === '3') {
            return {
              ...task,
              title: language === 'EN' ? 'Apply Fertilizer' : 'Bón Phân',
              description: language === 'EN'
                ? 'Apply NPK fertilizer to Plot A - second application of the season'
                : 'Bón phân NPK cho Lô A - lần bón thứ hai trong mùa'
            };
          }
          return task;
        })
      );
    }
  }, [language]);

  const loadMockJournalAndTasks = (lang: 'EN' | 'VI' = language) => {
    // Get current date and calculate relative dates
    const today = new Date();
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() - 5);
    const twoDaysAgo = new Date(today);
    twoDaysAgo.setDate(today.getDate() - 2);
    
    // Mock journal entries - bilingual
    setJournalEntries([
      {
        id: '1',
        plotId: 'plot1',
        date: fiveDaysAgo.toISOString().split('T')[0],
        type: 'planting',
        title: lang === 'EN' ? 'Sowing Season Begins' : 'Bắt Đầu Mùa Gieo Sạ',
        content: lang === 'EN' 
          ? 'Started sowing IR64 variety in Plot A. Weather conditions are favorable with adequate moisture.'
          : 'Bắt đầu gieo giống IR64 tại Lô A. Điều kiện thời tiết thuận lợi với độ ẩm đầy đủ.',
        photos: []
      },
      {
        id: '2',
        plotId: 'plot1',
        date: twoDaysAgo.toISOString().split('T')[0],
        type: 'fertilizer',
        title: lang === 'EN' ? 'First Fertilizer Application' : 'Bón Phân Lần Đầu',
        content: lang === 'EN'
          ? 'Applied NPK fertilizer as per recommended dosage. Will monitor plant response over next week.'
          : 'Đã bón phân NPK theo liều lượng khuyến nghị. Sẽ theo dõi phản ứng của cây trong tuần tới.',
        photos: []
      }
    ]);

    // Calculate task dates
    const threeDaysFromNow = new Date(today);
    threeDaysFromNow.setDate(today.getDate() + 3);
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3);
    
    // Mock tasks - bilingual
    setTasks([
      {
        id: '1',
        plotId: 'plot1',
        title: lang === 'EN' ? 'Weeding Required' : 'Cần Làm Cỏ',
        description: lang === 'EN'
          ? 'Remove weeds from Plot A, focus on areas near irrigation channels'
          : 'Dọn cỏ dại ở Lô A, tập trung vào khu vực gần kênh tưới',
        dueDate: threeDaysFromNow.toISOString().split('T')[0],
        completed: false,
        type: 'weeding'
      },
      {
        id: '2',
        plotId: 'plot2',
        title: lang === 'EN' ? 'Check Irrigation System' : 'Kiểm Tra Hệ Thống Tưới',
        description: lang === 'EN'
          ? 'Inspect and clean irrigation channels for Plot B'
          : 'Kiểm tra và làm sạch kênh tưới cho Lô B',
        dueDate: yesterday.toISOString().split('T')[0],
        completed: true,
        type: 'irrigation'
      },
      {
        id: '3',
        plotId: 'plot1',
        title: lang === 'EN' ? 'Apply Fertilizer' : 'Bón Phân',
        description: lang === 'EN'
          ? 'Apply NPK fertilizer to Plot A - second application of the season'
          : 'Bón phân NPK cho Lô A - lần bón thứ hai trong mùa',
        dueDate: threeDaysAgo.toISOString().split('T')[0],
        completed: false,
        reminder: true,
        type: 'fertilizer'
      }
    ]);
  };

  const loadMockWeather = (lang: 'EN' | 'VI' = language) => {
    const today = new Date();
    // Calculate weather forecast dates (next 5 days)
    const forecastDates = Array.from({ length: 5 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i + 1);
      return date.toISOString().split('T')[0];
    });
    
    // Mock weather data
    setWeather({
      location: lang === 'EN' ? 'Mekong Delta, Vietnam' : 'Đồng Bằng Sông Cửu Long, Việt Nam',
      timezone: 'Asia/Ho_Chi_Minh', // Default Vietnam timezone for mock data
      current: {
        temperature: 28,
        humidity: 78,
        rainfall: 0,
        windSpeed: 12,
        condition: 'Partly Cloudy'
      },
      forecast: [
        { date: forecastDates[0], high: 32, low: 24, rainfall: 0, condition: 'Sunny' },
        { date: forecastDates[1], high: 30, low: 23, rainfall: 5, condition: 'Light Rain' },
        { date: forecastDates[2], high: 29, low: 22, rainfall: 15, condition: 'Rain' },
        { date: forecastDates[3], high: 31, low: 25, rainfall: 0, condition: 'Partly Cloudy' },
        { date: forecastDates[4], high: 33, low: 26, rainfall: 0, condition: 'Sunny' }
      ],
      alerts: [
        {
          type: lang === 'EN' ? 'Monsoon Season Advisory' : 'Thông Báo Mùa Mưa',
          message: lang === 'EN'
            ? 'Monitor drainage systems and prepare for potential heavy rainfall during monsoon season.'
            : 'Theo dõi hệ thống thoát nước và chuẩn bị cho mưa lớn trong mùa mưa.',
          severity: 'medium'
        },
        {
          type: lang === 'EN' ? 'Irrigation Reminder' : 'Nhắc Nhở Tưới Nước',
          message: lang === 'EN'
            ? 'Maintain water levels 5-10cm during vegetative stage. Adjust based on weather conditions.'
            : 'Duy trì mực nước 5-10cm trong giai đoạn sinh trưởng. Điều chỉnh theo điều kiện thời tiết.',
          severity: 'low'
        }
      ]
    });
  };

  // Fetch real-time weather data using Open-Meteo API
  const fetchRealTimeWeather = async (
    latitude?: number, 
    longitude?: number,
    cityName?: string,
    countryName?: string
  ) => {
    setIsLoadingWeather(true);
    
    try {
      console.log('🌦️ Fetching real-time weather data from Open-Meteo...');
      
      // Use provided coordinates or default to Mekong Delta region
      const lat = latitude || WEATHER_CONFIG.DEFAULT_LOCATION.latitude;
      const lon = longitude || WEATHER_CONFIG.DEFAULT_LOCATION.longitude;
      
      console.log(`📍 Coordinates: ${lat}, ${lon}`);
      
      // Open-Meteo API - no API key needed!
      // Fetch weather data with current conditions and 7-day forecast
      const weatherUrl = `${WEATHER_CONFIG.ENDPOINTS.OPEN_METEO.FORECAST}?` +
        `latitude=${lat}&longitude=${lon}` +
        `&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,weather_code` +
        `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum` +
        `&timezone=auto` +
        `&forecast_days=7`;
      
      console.log(`🌐 Fetching from: ${weatherUrl}`);
      
      // Fetch weather data first
      const weatherResponse = await fetch(weatherUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      
      if (!weatherResponse.ok) {
        const errorText = await weatherResponse.text();
        console.error('Weather API error:', weatherResponse.status, errorText);
        throw new Error(`Weather API request failed: ${weatherResponse.status}`);
      }
      
      const weatherData = await weatherResponse.json();
      console.log('✅ Weather data received:', weatherData);
      
      // Extract timezone from API response (Open-Meteo returns IANA timezone)
      const detectedTimezone = weatherData.timezone || 'UTC';
      console.log(`🕐 Detected timezone: ${detectedTimezone}`);
      
      // Get location name from IP geolocation or reverse geocoding
      let locationName = WEATHER_CONFIG.DEFAULT_LOCATION.name;
      let displayCountry = language === 'EN' ? 'Vietnam' : 'Việt Nam';
      
      // If city and country were provided from IP geolocation, use them directly
      if (cityName && countryName) {
        locationName = cityName;
        displayCountry = countryName;
        console.log(`📍 Using IP-based location: ${locationName}, ${displayCountry}`);
      } else {
        // Fallback: Try to fetch location name from reverse geocoding
        try {
          const geocodingUrl = `${WEATHER_CONFIG.ENDPOINTS.OPEN_METEO.GEOCODING}?` +
            `latitude=${lat}&longitude=${lon}&count=1`;
          
          const geocodingResponse = await fetch(geocodingUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
            },
          });
          
          if (geocodingResponse.ok) {
            const geocodingData = await geocodingResponse.json();
            if (geocodingData && geocodingData.results && geocodingData.results.length > 0) {
              const result = geocodingData.results[0];
              locationName = result.name || result.admin1 || result.admin2 || locationName;
            }
          }
        } catch (geoError) {
          console.log('ℹ️ Could not fetch location name, using default');
        }
      }
      
      // Map weather codes to conditions
      const getWeatherCondition = (code: number): string => {
        if (!code && code !== 0) return 'Unknown';
        if (code === 0) return 'Clear';
        if (code <= 3) return 'Partly Cloudy';
        if (code <= 49) return 'Cloudy';
        if (code <= 67) return 'Light Rain';
        if (code <= 77) return 'Rain';
        if (code <= 86) return 'Heavy Rain';
        return 'Rain';
      };
      
      // Validate weather data structure
      if (!weatherData.current || !weatherData.daily) {
        console.error('Invalid weather data structure:', weatherData);
        throw new Error('Invalid weather data format');
      }
      
      // Process current weather with safe fallbacks
      const current = {
        temperature: Math.round(weatherData.current.temperature_2m || 0),
        humidity: Math.round(weatherData.current.relative_humidity_2m || 0),
        rainfall: Math.round((weatherData.current.precipitation || 0) * 10) / 10,
        windSpeed: Math.round(weatherData.current.wind_speed_10m || 0),
        condition: getWeatherCondition(weatherData.current.weather_code)
      };
      
      // Process daily forecast (take first 5 days, skip today which is index 0)
      const dailyForecasts: Array<{
        date: string;
        high: number;
        low: number;
        rainfall: number;
        condition: string;
      }> = [];
      
      const forecastDays = Math.min(6, weatherData.daily.time?.length || 0);
      for (let i = 1; i < forecastDays; i++) {
        dailyForecasts.push({
          date: weatherData.daily.time[i],
          high: Math.round(weatherData.daily.temperature_2m_max?.[i] || 0),
          low: Math.round(weatherData.daily.temperature_2m_min?.[i] || 0),
          rainfall: Math.round((weatherData.daily.precipitation_sum?.[i] || 0) * 10) / 10,
          condition: getWeatherCondition(weatherData.daily.weather_code?.[i])
        });
      }
      
      // Constant weather alerts for rice farming (always shown)
      const alerts: Array<{
        type: string;
        message: string;
        severity: 'low' | 'medium' | 'high';
      }> = [
        {
          type: language === 'EN' ? 'Monsoon Season Advisory' : 'Thông Báo Mùa Mưa',
          message: language === 'EN'
            ? 'Monitor drainage systems and prepare for potential heavy rainfall during monsoon season.'
            : 'Theo dõi hệ thống thoát nước và chuẩn bị cho mưa lớn trong mùa mưa.',
          severity: 'medium'
        },
        {
          type: language === 'EN' ? 'Irrigation Reminder' : 'Nhắc Nhở Tưới Nước',
          message: language === 'EN'
            ? 'Maintain water levels 5-10cm during vegetative stage. Adjust based on weather conditions.'
            : 'Duy trì mực nước 5-10cm trong giai đoạn sinh trưởng. Điều chỉnh theo điều kiện thời tiết.',
          severity: 'low'
        }
      ];
      
      // Set weather data
      setWeather({
        location: `${locationName}, ${displayCountry}`,
        timezone: detectedTimezone,
        current,
        forecast: dailyForecasts,
        alerts
      });
      
      console.log(`✅ Weather data loaded successfully for ${locationName} (${detectedTimezone})`);
      
    } catch (error) {
      console.error('❌ Failed to fetch weather data:', error);
      console.log('🔄 Falling back to mock weather data');
      
      // Log more details for debugging
      if (error instanceof TypeError) {
        console.error('Network error - check internet connection or CORS policy');
      }
      
      // Fall back to mock weather if API fails
      loadMockWeather(language);
    } finally {
      setIsLoadingWeather(false);
    }
  };

  // Get user's location from IP address and fetch weather
  const fetchWeatherWithGeolocation = async () => {
    try {
      console.log('🌍 Detecting location from IP address...');
      
      // Try multiple IP geolocation services (all free, HTTPS, no API key)
      let ipData = null;
      
      // Option 1: Try ipapi.co (HTTPS, free, 1000 requests/day)
      try {
        const ipApiUrl = 'https://ipapi.co/json/';
        const ipResponse = await fetch(ipApiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (ipResponse.ok) {
          ipData = await ipResponse.json();
          if (ipData && ipData.city && ipData.latitude && ipData.longitude) {
            const { latitude, longitude, city, region, country_name } = ipData;
            console.log(`✅ Location detected from IP (ipapi.co): ${city}, ${country_name} (${latitude}, ${longitude})`);
            await fetchRealTimeWeather(latitude, longitude, city || region, country_name);
            return;
          }
        }
      } catch (err) {
        console.log('⚠️ ipapi.co failed, trying alternative...');
      }
      
      // Option 2: Try geojs.io (HTTPS, free, no rate limit)
      try {
        const geoJsUrl = 'https://get.geojs.io/v1/ip/geo.json';
        const geoResponse = await fetch(geoJsUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        if (geoResponse.ok) {
          ipData = await geoResponse.json();
          if (ipData && ipData.city && ipData.latitude && ipData.longitude) {
            const { latitude, longitude, city, region, country } = ipData;
            console.log(`✅ Location detected from IP (geojs.io): ${city}, ${country} (${latitude}, ${longitude})`);
            await fetchRealTimeWeather(parseFloat(latitude), parseFloat(longitude), city || region, country);
            return;
          }
        }
      } catch (err) {
        console.log('⚠️ geojs.io failed');
      }
      
      // If all IP geolocation services fail, use default location
      throw new Error('All IP geolocation services failed');
      
    } catch (error) {
      console.log('📍 IP-based location detection failed. Using default location (An Giang, Vietnam)');
      console.error('IP geolocation error:', error);
      // Use default Mekong Delta location
      await fetchRealTimeWeather();
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app this would call Supabase
    if (email && password) {
      const mockUser: User = {
        id: '1',
        name: 'Nguyen Van Duc',
        email: email,
        phone: '+84123456789',
        language: 'VI',
        farms: [
          {
            id: 'farm1',
            name: 'Trang Trại Chính',
            location: 'Tỉnh An Giang, Việt Nam',
            plots: [
              {
                id: 'plot1',
                name: 'Lô A',
                soilType: 'Đất Sét Pha',
                riceVariety: 'IR64',
                sowingDate: (() => { const d = new Date(); d.setDate(d.getDate() - 5); return d.toISOString().split('T')[0]; })(),
                harvestDate: (() => { const d = new Date(); d.setDate(d.getDate() - 5); d.setMonth(d.getMonth() + 4); return d.toISOString().split('T')[0]; })(),
                irrigation: 'Tưới Ngập',
                area: 2.5,
                areaUnit: 'Sào (500 m²)',
                photos: []
              },
              {
                id: 'plot2',
                name: 'Lô B',
                soilType: 'Đất Phù Sa',
                riceVariety: 'Lúa Thơm Jasmine',
                sowingDate: (() => { const d = new Date(); d.setDate(d.getDate() - 2); return d.toISOString().split('T')[0]; })(),
                harvestDate: (() => { const d = new Date(); d.setDate(d.getDate() - 2); d.setMonth(d.getMonth() + 4); return d.toISOString().split('T')[0]; })(),
                irrigation: 'Tưới Nhỏ Giọt',
                area: 1.8,
                areaUnit: 'Sào (500 m²)',
                photos: []
              }
            ]
          }
        ]
      };
      setUser(mockUser);
      localStorage.setItem('farmAssistantUser', JSON.stringify(mockUser));
      loadMockJournalAndTasks(); // Only load journal and tasks on login
      return true;
    }
    return false;
  };

  const signup = async (userData: Partial<User>): Promise<boolean> => {
    // Mock signup
    if (userData.email && userData.name) {
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone || '',
        language: userData.language || 'VI',
        farms: []
      };
      setUser(newUser);
      localStorage.setItem('farmAssistantUser', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmAssistantUser');
    setJournalEntries([]);
    setTasks([]);
    setWeather(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('farmAssistantUser', JSON.stringify(updatedUser));
      if (userData.language) {
        setLanguage(userData.language);
      }
      if (userData.fontSize) {
        setFontSizeState(userData.fontSize);
        localStorage.setItem('farmAssistantFontSize', userData.fontSize);
      }
    }
  };

  const setFontSize = (size: 'small' | 'default' | 'large') => {
    setFontSizeState(size);
    localStorage.setItem('farmAssistantFontSize', size);
    if (user) {
      updateUser({ fontSize: size });
    }
  };

  const updateFarm = (farmId: string, farmData: Partial<Farm>) => {
    if (user) {
      const updatedUser = {
        ...user,
        farms: user.farms.map(farm => 
          farm.id === farmId ? { ...farm, ...farmData } : farm
        )
      };
      setUser(updatedUser);
      localStorage.setItem('farmAssistantUser', JSON.stringify(updatedUser));
    }
  };

  const updatePlot = (farmId: string, plotId: string, plotData: Partial<Plot>) => {
    if (user) {
      const updatedUser = {
        ...user,
        farms: user.farms.map(farm => 
          farm.id === farmId 
            ? {
                ...farm,
                plots: farm.plots.map(plot => 
                  plot.id === plotId ? { ...plot, ...plotData } : plot
                )
              }
            : farm
        )
      };
      setUser(updatedUser);
      localStorage.setItem('farmAssistantUser', JSON.stringify(updatedUser));
    }
  };

  const addJournalEntry = (entry: Omit<JournalEntry, 'id'>) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    setJournalEntries(prev => [newEntry, ...prev]);
  };

  const updateJournalEntry = (id: string, entry: Partial<JournalEntry>) => {
    setJournalEntries(prev => prev.map(e => e.id === id ? { ...e, ...entry } : e));
  };

  const deleteJournalEntry = (id: string) => {
    setJournalEntries(prev => prev.filter(e => e.id !== id));
  };

  const addTask = (task: Omit<Task, 'id'>) => {
    const newTask = { ...task, id: Date.now().toString() };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, task: Partial<Task>) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...task } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Translation mapping function
  const translateValue = (value: string, lang: 'EN' | 'VI'): string => {
    if (!value) return value;
    
    const translations: { [key: string]: { EN: string; VI: string } } = {
      // Farm names
      'Main Farm': { EN: 'Main Farm', VI: 'Trang Trại Chính' },
      'Trang Tr��i Chính': { EN: 'Main Farm', VI: 'Trang Trại Chính' },
      'North Farm': { EN: 'North Farm', VI: 'Trang Trại Bắc' },
      'Trang Trại Bắc': { EN: 'North Farm', VI: 'Trang Trại Bắc' },
      'South Farm': { EN: 'South Farm', VI: 'Trang Trại Nam' },
      'Trang Trại Nam': { EN: 'South Farm', VI: 'Trang Trại Nam' },
      
      // Locations
      'An Giang Province, Vietnam': { EN: 'An Giang Province, Vietnam', VI: 'Tỉnh An Giang, Việt Nam' },
      'Tỉnh An Giang, Việt Nam': { EN: 'An Giang Province, Vietnam', VI: 'Tỉnh An Giang, Việt Nam' },
      
      // Plot names
      'Plot A': { EN: 'Plot A', VI: 'Lô A' },
      'Lô A': { EN: 'Plot A', VI: 'Lô A' },
      'Plot B': { EN: 'Plot B', VI: 'Lô B' },
      'Lô B': { EN: 'Plot B', VI: 'Lô B' },
      'Plot C': { EN: 'Plot C', VI: 'Lô C' },
      'Lô C': { EN: 'Plot C', VI: 'Lô C' },
      'Plot D': { EN: 'Plot D', VI: 'Lô D' },
      'Lô D': { EN: 'Plot D', VI: 'Lô D' },
      
      // Soil types
      'Clay Loam': { EN: 'Clay Loam', VI: 'Đất Sét Pha' },
      'Đất Sét Pha': { EN: 'Clay Loam', VI: 'Đất Sét Pha' },
      'Alluvial': { EN: 'Alluvial', VI: 'Đất Phù Sa' },
      'Đất Phù Sa': { EN: 'Alluvial', VI: 'Đất Phù Sa' },
      'Sandy': { EN: 'Sandy', VI: 'Đất Cát' },
      'Đất Cát': { EN: 'Sandy', VI: 'Đất Cát' },
      
      // Irrigation methods
      'Flood Irrigation': { EN: 'Flood Irrigation', VI: 'Tưới Ngập' },
      'Tưới Ngập': { EN: 'Flood Irrigation', VI: 'Tưới Ngập' },
      'Drip Irrigation': { EN: 'Drip Irrigation', VI: 'Tưới Nhỏ Giọt' },
      'Tưới Nhỏ Giọt': { EN: 'Drip Irrigation', VI: 'Tưới Nhỏ Giọt' },
      'Sprinkler': { EN: 'Sprinkler', VI: 'Tưới Phun' },
      'Tưới Phun': { EN: 'Sprinkler', VI: 'Tưới Phun' },
      
      // Rice varieties
      'Jasmine Rice': { EN: 'Jasmine Rice', VI: 'Lúa Thơm Jasmine' },
      'Lúa Thơm Jasmine': { EN: 'Jasmine Rice', VI: 'Lúa Thơm Jasmine' },
      'IR64': { EN: 'IR64', VI: 'IR64' },
      'OM 5451': { EN: 'OM 5451', VI: 'OM 5451' },
    };
    
    return translations[value]?.[lang] || value;
  };

  // Helper function to translate user data
  const translateUserData = (userData: User, lang: 'EN' | 'VI'): User => {
    return {
      ...userData,
      language: lang,
      farms: userData.farms.map(farm => ({
        ...farm,
        name: translateValue(farm.name, lang),
        location: translateValue(farm.location, lang),
        plots: farm.plots.map(plot => ({
          ...plot,
          name: translateValue(plot.name, lang),
          soilType: translateValue(plot.soilType, lang),
          riceVariety: translateValue(plot.riceVariety, lang),
          irrigation: translateValue(plot.irrigation, lang)
        }))
      }))
    };
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'EN' ? 'VI' : 'EN';
    setLanguage(newLanguage);
    if (user) {
      // Translate all user data to new language
      const translatedUser = translateUserData(user, newLanguage);
      setUser(translatedUser);
      localStorage.setItem('farmAssistantUser', JSON.stringify(translatedUser));
    }
    // Don't reload mock data - weather will update via useEffect watching language changes
    // This prevents replacing real weather data with mock data
  };

  const value: AppContextType = {
    user,
    language,
    fontSize,
    journalEntries,
    tasks,
    weather,
    isLoadingWeather,
    login,
    logout,
    signup,
    updateUser,
    setFontSize,
    updateFarm,
    updatePlot,
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry,
    addTask,
    updateTask,
    deleteTask,
    toggleLanguage,
    refreshWeather: fetchWeatherWithGeolocation
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}