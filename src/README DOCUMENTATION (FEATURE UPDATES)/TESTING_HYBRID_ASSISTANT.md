# Testing the Hybrid AI Assistant

## Quick Test Guide

### ✅ Test 1: IRRI Perfect Match
**Question to ask:** `What is AWD method?`

**Expected Result:**
- Response contains IRRI definition of AWD
- Toast notification: "📚 Found in IRRI Knowledge Base" (EN) or "📚 Tìm thấy trong Cơ sở Kiến thức IRRI" (VI)
- Citation shows: "(Source: IRRI Water Management Guidelines, 2024)"

---

### ✅ Test 2: IRRI Perfect Match (Vietnamese)
**Question to ask:** `Phương pháp AWD là gì?`

**Expected Result:**
- Response in Vietnamese from IRRI knowledge
- Toast notification: "📚 Tìm thấy trong Cơ sở Kiến thức IRRI"
- Citation in Vietnamese

---

### ✅ Test 3: Near Match - ChatGPT
**Question to ask:** `Can you explain the AWD irrigation technique?`

**Expected Result:**
- Response from ChatGPT (similar content but AI-generated)
- Indicator at end: "💡 _AI-powered response using ChatGPT_"
- NO IRRI citation

---

### ✅ Test 4: Completely New Question - ChatGPT
**Question to ask:** `How do I protect my rice from birds?`

**Expected Result:**
- Intelligent response from ChatGPT
- Practical farming advice
- Indicator: "💡 _AI-powered response using ChatGPT_"

---

### ✅ Test 5: Pest Control Perfect Match
**Question to ask:** `How do I control brown planthoppers?`

**Expected Result:**
- IRRI knowledge response
- Toast: "📚 Found in IRRI Knowledge Base"
- Citation: "(Source: Handbook on Technical Guidelines for Rice Integrated Pest Management...)"

---

### ✅ Test 6: Multi-Turn Conversation Flow
**Question to ask:** `When should I apply fertilizer?`

**Expected Result:**
- Triggers IRRI conversation flow
- Multiple exchange conversation
- Follow-up questions prompted
- All from IRRI expert guidance

---

### ✅ Test 7: Language Switching
**Steps:**
1. Ask in English: `What is AWD method?`
2. Switch language to Vietnamese
3. Check that the response updates to Vietnamese

**Expected Result:**
- Same message content
- Text changes to Vietnamese
- Citation also changes to Vietnamese

---

### ✅ Test 8: Voice Input (Demo)
**Steps:**
1. Click microphone icon
2. Wait for recording simulation
3. Default question: "What is AWD method?"

**Expected Result:**
- Auto-fills with demo question
- Works same as text input
- Gets IRRI knowledge response

---

### ✅ Test 9: Image Analysis (Demo)
**Steps:**
1. Click camera icon
2. Upload any image

**Expected Result:**
- Shows mock analysis
- Displays uploaded image
- Provides pest/disease guidance

---

## Questions in IRRI Knowledge Base

### Exact Match Questions (English):
1. `What is AWD method?`
2. `How do I control brown planthoppers?`
3. `When should I apply fertilizer?`

### Exact Match Questions (Vietnamese):
1. `Phương pháp AWD là gì?`
2. `Làm thế nào để kiểm soát rầy nâu?`
3. `Khi nào tôi nên bón phân?`

---

## Questions That Will Use ChatGPT

### Similar but Not Exact:
- "Tell me about AWD"
- "What's the alternate wetting and drying method?"
- "How does AWD work?"
- "Explain AWD irrigation"

### Completely New Topics:
- "How to deal with rats in rice fields?"
- "Best time to plant rice in Vietnam?"
- "How much water does rice need daily?"
- "What causes yellow leaves in rice?"
- "Rice harvesting equipment recommendations"

---

## Expected Behavior Summary

| Scenario | Source | Indicator | Citation |
|----------|--------|-----------|----------|
| Perfect match (>95%) | IRRI | Toast: 📚 Found in IRRI KB | ✅ Yes |
| Exact match | IRRI | Toast: 📚 Found in IRRI KB | ✅ Yes |
| Similar (85-94%) | ChatGPT | 💡 AI-powered response | ❌ No |
| New question | ChatGPT | 💡 AI-powered response | ❌ No |
| Multi-turn flow | IRRI Flow | (Flow indicator) | ✅ Yes |

---

## Troubleshooting

### If IRRI Match Not Working:
1. Check exact wording (must match >95%)
2. Try exact questions from list above
3. Check language setting

### If ChatGPT Not Working:
1. Check browser console for errors
2. Verify OPENAI_API_KEY is set
3. Check network tab for API call
4. Look for error messages in chat

### If Nothing Works:
1. Refresh the page
2. Check browser console for errors
3. Verify you're on the `/assistant` route

---

## Success Criteria

✅ Perfect matches show IRRI knowledge + toast  
✅ Non-matches show ChatGPT + AI indicator  
✅ No "I don't know" messages  
✅ Language switching works  
✅ Conversation flows work  
✅ Citations appear for IRRI responses  
✅ Error handling works gracefully  

---

## Next Steps After Testing

1. **Add More IRRI Questions**: Expand the knowledge base
2. **Fine-tune Similarity Threshold**: Adjust if needed (currently 0.95)
3. **Monitor Usage**: Track which source is used more
4. **Improve ChatGPT Prompts**: Enhance system prompts for better responses
