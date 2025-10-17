
  # Website Page Layouts

  This is a code bundle for Website Page Layouts. The original project is available at https://www.figma.com/design/Lt4eSHqlkArtZ2Cwiql4fB/Website-Page-Layouts.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.


  # 🌾 Rice Farming Assistant

A comprehensive farming assistant web application for rice farmers with bilingual support (English ↔ Vietnamese), AI-powered assistance, weather monitoring, and farm management.

---

## ⚡ Quick Start

### 1. Add Your OpenAI API Key (Required for AI Features)

**File:** `/components/SimpleAssistant.tsx` (Line 33)

```typescript
// ⚠️ IMPORTANT: Add your OpenAI API key here
const OPENAI_API_KEY = 'sk-proj-YOUR-KEY-HERE';
```

**Get your key:** https://platform.openai.com/api-keys

### 2. Test Locally

```bash
npm install
npm run dev
```

### 3. Publish

Click "Publish" in Figma Make - that's it! ✨

---

## ✨ Features

### 🤖 AI Assistant
- **IRRI Knowledge Base:** 100+ expert farming answers (FREE)
- **ChatGPT Integration:** Advanced AI for custom questions (your API key)
- **Bilingual:** All responses in English & Vietnamese
- **Multi-modal:** Text, voice, and image support

### ☀️ Weather Monitoring
- **Real-time weather** via Open-Meteo API (FREE, no API key needed)
- **7-day forecast** with temperature, humidity, rainfall
- **Location-based:** Automatic IP geolocation
- **Vietnamese time & date** with lunar calendar

### 🌾 Farm Management
- **Multiple farms & plots** with Vietnamese location data
- **Plot tracking:** Soil type, rice variety, sowing/harvest dates
- **Local units:** Area in sào, yield in kg/sào
- **Vietnamese provinces:** Full dropdown with districts & communes

### 📝 Digital Journal
- **Daily entries** with rich text and photos
- **Weather integration:** Auto-record weather conditions
- **Plot-specific:** Tag entries to specific plots
- **Search & filter:** Find past entries easily

### ✅ Task Management
- **Smart tasks:** Planting, fertilizer, irrigation, pest control, harvest
- **Automated calendar:** Based on rice variety and sowing date
- **Reminders:** Get notified before due dates
- **Overdue tracking:** Visual badges for late tasks

### 🎨 Accessibility
- **Font scaling:** Small, Default, Large (for elderly farmers)
- **Mobile-first:** Optimized for phones with large touch targets
- **Bilingual UI:** Complete Vietnamese & English translation
- **Farmer-friendly:** Simple, clear interface

---

## 💰 Cost

### Free Forever
- ✅ IRRI Knowledge Base (100+ answers)
- ✅ Weather forecasts (Open-Meteo)
- ✅ All app features (farms, journal, tasks)
- ✅ Bilingual support

### Your API Key (Optional for Advanced AI)
- 🤖 ChatGPT AI responses: ~$0.001-0.005 per question
- 📊 Typical usage: $0-5/month
- 💡 Recommendation: Set $5-10 spending limit

**Get API key:** https://platform.openai.com/api-keys
**Set budget:** https://platform.openai.com/account/billing/limits

---

## 🔑 Setup Your API Key

### Method 1: Quick (30 seconds)
See [`/API_KEY_QUICK_REFERENCE.md`](/API_KEY_QUICK_REFERENCE.md)

### Method 2: Detailed (5 minutes)
See [`/SETUP_YOUR_API_KEY.md`](/SETUP_YOUR_API_KEY.md)

### TL;DR:
1. Get key from OpenAI
2. Open `/components/SimpleAssistant.tsx`
3. Replace `'your-openai-api-key-here'` on line 33
4. Save and test!

---

## 🏗️ Tech Stack

- **Frontend:** React + TypeScript
- **Styling:** Tailwind CSS v4
- **Routing:** React Router
- **State:** Context API + localStorage
- **UI Components:** Shadcn/ui
- **Icons:** Lucide React
- **Weather:** Open-Meteo API (free, no key needed)
- **AI:** OpenAI GPT-4o-mini (your API key)
- **Data:** IRRI knowledge base + Vietnamese locations

---

## 📱 Features Detail

### AI Assistant Intelligence
```
User asks question
    ↓
Check IRRI Knowledge Base (100+ answers)
    ↓ YES
Return expert IRRI answer (FREE, instant)
    ↓ NO
Use ChatGPT for custom answer (your API key, bilingual)
    ↓
Display in both English & Vietnamese
```

### Weather System
- **API:** Open-Meteo (free, reliable)
- **Geolocation:** IP-based automatic detection
- **Data:** Temperature, humidity, wind, rainfall
- **Forecast:** 7-day hourly predictions
- **Local time:** Vietnamese timezone with lunar calendar

### Farm Management
- **Vietnamese locations:** All 63 provinces with districts
- **Plot details:** Soil, variety, irrigation, area
- **Local units:** sào (Vietnamese land unit)
- **Multiple farms:** Track different locations
- **Photos:** Upload field images

### Task Automation
- **Auto-schedule:** Based on rice variety growth cycle
- **Types:** Planting, weeding, fertilizer, irrigation, pest control, harvest
- **Reminders:** Bell icon to set notifications
- **Status:** Overdue badges, completion tracking

---

## 🎯 Use Cases

### For Farmers
- ✅ Ask farming questions in Vietnamese
- ✅ Get instant expert answers from IRRI
- ✅ Check weather before field work
- ✅ Track multiple plots and crops
- ✅ Remember when to fertilize/harvest
- ✅ Keep farming journal

### For Extension Workers
- ✅ Provide expert guidance quickly
- ✅ Show IRRI best practices
- ✅ Track farmer plots
- ✅ Monitor weather impacts
- ✅ Share knowledge

### For Researchers
- ✅ IRRI knowledge base integration
- ✅ Local Vietnamese units
- ✅ Real farming data tracking
- ✅ Weather correlation

---

## 🔒 Security & Privacy

### Data Storage
- ✅ **localStorage only** - all data stays on user's device
- ✅ **No backend** - no server to hack
- ✅ **No accounts** - no password databases
- ✅ **Private** - data never leaves user's browser

### API Key
- ✅ **Your control** - you manage the key
- ✅ **Embedded** - in published code (minified)
- ✅ **Direct calls** - browser → OpenAI only
- ✅ **Budget limits** - set on OpenAI dashboard

---

## 📂 Project Structure

```
├── components/
│   ├── SimpleAssistant.tsx    ⭐ Add your API key here (line 33)
│   ├── Weather.tsx             ☀️ Weather monitoring
│   ├── Profile.tsx             👤 User & farm management
│   ├── Tasks.tsx               ✅ Task tracking
│   ├── Journal.tsx             📝 Digital journal
│   ├── AppContext.tsx          🔄 Global state
│   └── ui/                     🎨 Shadcn components
├── data/
│   ├── AIRRVie_QA.ts          📚 IRRI knowledge (100+ Q&A)
│   ├── irriChatFlows.ts       💬 Conversation templates
│   ├── vietnamLocations.ts    🗺️ Vietnamese provinces/districts
│   └── imageAnalysisResponses.ts 📷 Image recognition
├── config/
│   └── weather.ts             ⚙️ Weather API config
└── styles/
    └── globals.css            🎨 Tailwind + responsive utilities
```

---

## 🧪 Testing

### Test IRRI Knowledge (Free)
1. Open Assistant
2. Ask: "What is the AWD method?"
3. Should get instant IRRI answer ✅

### Test ChatGPT AI (Requires Key)
1. Add your API key (see above)
2. Ask: "How does climate change affect rice farming in Vietnam?"
3. Should get bilingual ChatGPT response ✅

### Test Weather
1. Go to Weather tab
2. Should auto-detect location ✅
3. Shows 7-day forecast ✅

### Test Bilingual
1. Switch language (EN ↔ VI)
2. All UI translates ✅
3. Ask question in either language ✅
4. Response available in both languages ✅

---

## 📖 Documentation

### Getting Started
- **Quick Reference:** [`/API_KEY_QUICK_REFERENCE.md`](/API_KEY_QUICK_REFERENCE.md) - 30-second setup
- **Full Setup:** [`/SETUP_YOUR_API_KEY.md`](/SETUP_YOUR_API_KEY.md) - Complete guide
- **User Guide:** [`/QUICK_START_GUIDE.md`](/QUICK_START_GUIDE.md) - For farmers

### Technical Docs
- **Implementation:** [`/FINAL_IMPLEMENTATION.md`](/FINAL_IMPLEMENTATION.md) - What was built
- **Publishing:** [`/READY_TO_PUBLISH.md`](/READY_TO_PUBLISH.md) - Deployment guide
- **Migration:** [`/CHATGPT_CLIENT_MIGRATION.md`](/CHATGPT_CLIENT_MIGRATION.md) - How it works

---

## 🚀 Publishing on Figma Make

### Pre-Publish Checklist
- [ ] Added your OpenAI API key
- [ ] Tested locally (all features work)
- [ ] Set spending limit on OpenAI
- [ ] Ready to share!

### Publishing Steps
1. Click **"Publish"** in Figma Make
2. Choose hosting option
3. Done! ✨

### Post-Publish
- ✅ App works immediately
- ✅ No backend setup needed
- ✅ No environment variables
- ✅ Just share the URL

---

## 💡 Tips & Best Practices

### Cost Optimization
- IRRI answers most common questions (free!)
- AI only used for unique questions
- Set $5-10 monthly limit initially
- Monitor usage first month

### API Key Security
- Set spending limits on OpenAI dashboard
- Monitor usage weekly
- Rotate key every 3-6 months
- Don't share published URL publicly if concerned about costs

### User Experience
- Start users with IRRI questions
- Show them AI capabilities gradually
- Bilingual support helps adoption
- Font scaling helps elderly farmers

---

## 🎯 Key Differentiators

### vs Other Farming Apps
- ✅ **IRRI-backed** expert knowledge
- ✅ **Bilingual** Vietnamese + English
- ✅ **Offline-capable** (after first load)
- ✅ **Local units** (sào, Vietnamese locations)
- ✅ **AI-enhanced** but works without it
- ✅ **Mobile-first** for farmers in field
- ✅ **Free** core features

### vs ChatGPT Alone
- ✅ **Expert IRRI answers** prioritized
- ✅ **Rice farming specialized** context
- ✅ **Vietnamese language** native support
- ✅ **Farm management** integrated
- ✅ **Weather** connected
- ✅ **Tasks & journal** built-in

---

## 📊 Stats

- **IRRI Knowledge:** 100+ Q&A pairs
- **Languages:** English + Vietnamese (full translation)
- **Weather:** 7-day forecast, hourly data
- **Locations:** 63 Vietnamese provinces
- **Task types:** 6 categories
- **Rice varieties:** Pre-loaded common varieties
- **Soil types:** 11 Vietnamese soil types

---

## 🙏 Acknowledgments

### Data Sources
- **IRRI** (International Rice Research Institute) - Expert knowledge
- **Open-Meteo** - Free weather API
- **OpenAI** - GPT-4o-mini for AI responses

### Technologies
- **React** + **TypeScript** - UI framework
- **Tailwind CSS** - Styling
- **Shadcn/ui** - Component library
- **Lucide** - Icons

---

## 📞 Quick Links

- **OpenAI API Keys:** https://platform.openai.com/api-keys
- **Set Budget:** https://platform.openai.com/account/billing/limits
- **Monitor Usage:** https://platform.openai.com/usage
- **IRRI Website:** https://www.irri.org
- **Open-Meteo:** https://open-meteo.com

---

## 🎉 Ready to Go!

1. ⚡ **Add your API key** ([Quick Guide](/API_KEY_QUICK_REFERENCE.md))
2. 🧪 **Test locally** (30 seconds)
3. 🚀 **Publish** (click button)
4. 🌾 **Share with farmers!**

**Your comprehensive farming assistant is ready to help rice farmers succeed!** ✨

---

## 📄 License

This project uses:
- IRRI knowledge (educational use)
- Open-Meteo API (free tier)
- OpenAI API (your key, your usage)

---

**Built with ❤️ for rice farmers everywhere** 🌾
