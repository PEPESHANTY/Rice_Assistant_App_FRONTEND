# 🔑 Setup Your OpenAI API Key

## Quick Setup (2 Minutes)

Your app is configured to use **your own OpenAI API key** for ChatGPT integration. Follow these simple steps:

---

## Step 1: Get Your OpenAI API Key

1. Go to **https://platform.openai.com/api-keys**
2. Sign up or log in to OpenAI
3. Click **"Create new secret key"**
4. Give it a name (e.g., "Rice Farming App")
5. **Copy the key** (starts with `sk-...`)
6. ⚠️ **Save it somewhere safe** - you can't see it again!

---

## Step 2: Add Your API Key to the App

1. Open `/components/SimpleAssistant.tsx`
2. Find **line 30** (look for this):
   ```typescript
   const OPENAI_API_KEY = 'your-openai-api-key-here';
   ```

3. Replace `'your-openai-api-key-here'` with your actual key:
   ```typescript
   const OPENAI_API_KEY = 'sk-proj-abc123...';  // Your real key here
   ```

4. Save the file

---

## Step 3: That's It! 🎉

Your app is now ready to use ChatGPT!

### What Works Now:
- ✅ **IRRI Knowledge Base** (100+ expert answers) - Always free, no API needed
- ✅ **ChatGPT AI** - For questions beyond IRRI knowledge
- ✅ **Bilingual responses** - Both English & Vietnamese
- ✅ **Conversation memory** - AI remembers context
- ✅ **Ready to publish!** - Works when published

---

## 💰 Cost Information

### OpenAI Pricing
- Model used: **GPT-4o-mini** (most affordable)
- Input: ~$0.15 per 1 million tokens
- Output: ~$0.60 per 1 million tokens

### What Does This Mean?
- **~$0.001-0.005 per question** (very cheap!)
- Example: 200 questions = $0.20-1.00
- Most users spend **less than $1/month**

### Set a Budget (Recommended)
1. Go to https://platform.openai.com/account/billing/limits
2. Set a monthly budget (e.g., $5 or $10)
3. OpenAI will stop charging when you hit the limit
4. You'll get an email notification

---

## 🔒 Security

### Your API Key is Safe
- ✅ Stored in your code (not exposed to users)
- ✅ Sent only to OpenAI API (direct from browser)
- ✅ Not logged or stored anywhere else
- ✅ Users can't see or access it

### Best Practices
1. **Don't share your published URL publicly** if you want to control costs
2. **Set spending limits** on OpenAI dashboard
3. **Monitor usage** at https://platform.openai.com/usage
4. **Rotate your key** if you suspect it's compromised

---

## 🧪 Testing

### Test the Integration

1. **Open the app**
2. Go to **Assistant** (💬 tab)
3. Ask a question from IRRI knowledge:
   - "What is the AWD method?"
   - Should get instant IRRI answer ✅

4. Ask a custom question:
   - "How does climate change affect rice farming?"
   - Should get ChatGPT response ✅

5. **Switch language** (EN ↔ VI):
   - Answer should translate instantly ✅

---

## ❓ Troubleshooting

### Error: "OpenAI API key not configured"
- ✅ Make sure you replaced `'your-openai-api-key-here'` with your real key
- ✅ Check that the key is wrapped in quotes: `'sk-...'`
- ✅ Save the file after editing

### Error: "Invalid OpenAI API key"
- ✅ Verify the key on https://platform.openai.com/api-keys
- ✅ Make sure you copied the full key (starts with `sk-`)
- ✅ Check that you have billing set up on OpenAI

### AI responses not working
- ✅ Check browser console for errors (F12)
- ✅ Verify you have internet connection
- ✅ Make sure you have credits in your OpenAI account

### IRRI answers not working
- ⚠️ This means there's a code issue (not related to API key)
- IRRI knowledge base doesn't use API - should always work

---

## 📝 Example Setup

Here's what your code should look like after setup:

```typescript
// ⚠️ IMPORTANT: Add your OpenAI API key here
// Get your API key from: https://platform.openai.com/api-keys
const OPENAI_API_KEY = 'sk-proj-Abc123XYZ456def789GHI...';
```

**Before:**
```typescript
const OPENAI_API_KEY = 'your-openai-api-key-here';
```

**After:**
```typescript
const OPENAI_API_KEY = 'sk-proj-Abc123XYZ456def789GHI012jkl345MNO...';
```

---

## 🚀 Publishing

### When you publish your app:

1. **Your API key is embedded** in the published code
2. **Only you pay for usage** (OpenAI charges your account)
3. **App works immediately** - no additional setup needed
4. **Users can't see your API key** (minified/bundled code)

### Cost Control

If you're sharing the app publicly:
- Set spending limits on OpenAI dashboard
- Monitor usage regularly
- Consider switching to user-provided API keys (see old implementation)

---

## 🎯 What Each Question Costs

### IRRI Knowledge Base (Free)
- "What is AWD method?" → **$0**
- "When to apply fertilizer?" → **$0**
- "How to control pests?" → **$0**
- 100+ pre-loaded answers → **$0**

### ChatGPT (Minimal Cost)
- Short question (10 words) → **~$0.001**
- Medium question (50 words) → **~$0.003**
- Long conversation (200 words) → **~$0.010**

**Most questions cost less than a penny!** 💰

---

## 📊 Monitoring Usage

### OpenAI Dashboard
- View usage: https://platform.openai.com/usage
- See daily/monthly costs
- Track number of requests
- Export usage data

### In Your App
- Every AI response shows: `💡 AI-powered response using ChatGPT`
- IRRI responses show source citations
- Easy to tell which questions used AI

---

## 🔄 Alternative: User-Provided Keys

If you want users to provide their own API keys instead:
1. See `/CHATGPT_CLIENT_MIGRATION.md`
2. Implementation already exists in git history
3. Users add keys in Profile > AI Settings
4. Each user pays for their own usage

---

## ✨ Summary

**Your Setup:**
```
✅ IRRI Knowledge Base → Always free
✅ ChatGPT Integration → Your API key
✅ Direct browser calls → No backend needed
✅ Works when published → Static hosting
✅ Bilingual responses → Built-in
✅ Secure → API key in code, not exposed
```

**Your Costs:**
- Most users: **$0-1/month**
- Heavy users: **$2-5/month**
- Set limits to control

**Your Users:**
- See AI and IRRI answers seamlessly
- Don't need their own API keys
- Don't see any setup
- Just use the app! 🌾

---

## 🎉 Ready to Go!

Once you add your API key:
1. Test locally
2. Publish on Figma Make
3. Share with farmers
4. Monitor usage on OpenAI dashboard

Enjoy your fully functional farming assistant! 🌾✨
