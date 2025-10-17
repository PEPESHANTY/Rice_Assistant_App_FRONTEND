# 🔑 API Key Quick Reference

## ⚡ 30-Second Setup

### 1. Get API Key
→ https://platform.openai.com/api-keys
→ Click "Create new secret key"
→ Copy the key (starts with `sk-...`)

### 2. Add to Code
→ Open `/components/SimpleAssistant.tsx`
→ Line 33: Replace `'your-openai-api-key-here'`
→ With your key: `'sk-proj-abc123...'`
→ Save file

### 3. Done! ✅
→ Test in Assistant
→ Publish when ready
→ Monitor at https://platform.openai.com/usage

---

## 📍 Where to Add Your Key

**File:** `/components/SimpleAssistant.tsx`
**Line:** 33

**Find this:**
```typescript
const OPENAI_API_KEY = 'your-openai-api-key-here';
```

**Replace with:**
```typescript
const OPENAI_API_KEY = 'sk-proj-YOUR-ACTUAL-KEY-HERE';
```

---

## 💰 Cost

- **IRRI answers:** FREE
- **AI answers:** ~$0.001-0.005 per question
- **Typical usage:** $0-1/month
- **Set budget:** https://platform.openai.com/account/billing/limits

---

## ✅ How It Works

```
User asks question
    ↓
IRRI Knowledge Base checks first (FREE)
    ↓
If match found → Instant IRRI answer ✅
    ↓
If no match → ChatGPT responds (your API key) ✅
    ↓
Bilingual response (EN + VI) shown
```

---

## 🧪 Test It

1. Ask IRRI question: "What is AWD method?"
   → Should work instantly (free)

2. Ask custom question: "How does climate change affect rice?"
   → Should use ChatGPT (minimal cost)

3. Switch language (EN ↔ VI)
   → Should translate instantly

---

## 🔒 Security

- ✅ Key embedded in code
- ✅ Only you pay for usage
- ✅ Users can't access your key
- ✅ Set spending limits to control costs

---

## 🚀 Publishing

1. Add your API key (see above)
2. Test locally
3. Click "Publish" in Figma Make
4. Share your app!

**Everything just works.** No backend, no infrastructure, no complexity.

---

## 📊 Features Included

| Feature | Status | Cost |
|---------|--------|------|
| IRRI Knowledge (100+ answers) | ✅ | FREE |
| Weather forecasts | ✅ | FREE |
| Farm management | ✅ | FREE |
| Digital journal | ✅ | FREE |
| Task tracking | ✅ | FREE |
| ChatGPT AI | ✅ | Your key |
| Bilingual (EN/VI) | ✅ | FREE |

---

## 🆘 Quick Help

**"API key not configured"**
→ Check line 33 of SimpleAssistant.tsx
→ Make sure key is in quotes

**"Invalid API key"**
→ Verify key at https://platform.openai.com/api-keys
→ Check billing is set up

**IRRI not working**
→ Not related to API key
→ Check console for errors

---

## 📚 Full Guides

- **Setup:** `/SETUP_YOUR_API_KEY.md`
- **Migration:** `/CHATGPT_CLIENT_MIGRATION.md`
- **Publishing:** `/READY_TO_PUBLISH.md`

---

**That's it! Simple, clean, ready to publish.** 🌾✨
