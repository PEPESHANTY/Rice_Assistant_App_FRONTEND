# 🧪 Suggested Questions - Mobile Testing Guide

## ✅ Quick Test Checklist

Test these scenarios on mobile (primary) and desktop (secondary):

---

## 📱 Test 1: Initial Load (Welcome Screen)

### **What to Check:**
1. Open assistant (fresh chat or reload)
2. Should see welcome message from AI
3. Below it: "Choose a topic:" heading
4. 5 colorful topic cards in horizontal scroll

### **Expected Behavior:**
- ✅ Topic cards display: 🌾 Land, 💧 Water, 🐛 Pests, 🌾 Harvest, ♻️ Straw
- ✅ Cards are scrollable horizontally (swipe left/right)
- ✅ Each card shows icon + title + "5 questions" badge
- ✅ Cards snap to position when scrolling
- ✅ Subtitle says "Or type your own question below 👇"
- ✅ No scrollbar visible (hidden)

### **Languages:**
- Switch to English: Check titles in English
- Switch to Vietnamese: Check titles in Vietnamese (Làm đất & gieo sạ, etc.)

### **Touch Test:**
- Tap any topic card → Should show 5 questions for that topic
- Cards should have hover effect on desktop
- Active/pressed state on mobile (slight scale down)

---

## 📱 Test 2: Topic Selected (Questions List)

### **What to Check:**
1. From initial view, tap "💧 Water & fertilizer"
2. Should see "⬅️ Back to topics" button at top
3. Topic icon and title centered
4. 5 question buttons below

### **Expected Behavior:**
- ✅ Back button appears at top-left
- ✅ Topic icon (💧) shows centered
- ✅ Topic title displays in current language
- ✅ 5 large question buttons (full text, no truncation)
- ✅ Questions are readable (2-3 lines if needed)
- ✅ Each button min 56px height
- ✅ Hover/press states work

### **Touch Test:**
- Tap back button → Returns to topic cards
- Tap any question → Question appears in input field
- Question auto-sends after brief delay
- Topic list disappears after sending

### **Vietnamese Test:**
- Switch to Vietnamese
- Questions should display full Vietnamese text
- No "..." truncation
- Text wraps to 2-3 lines if needed
- Still readable on small screens

---

## 📱 Test 3: After Conversation Starts (Pill Button)

### **What to Check:**
1. Continue from Test 2 (question sent, AI responded)
2. Chat now has 3+ messages
3. Should see floating pill button at bottom-center

### **Expected Behavior:**
- ✅ Pill button appears: "💡 Example questions" or "💡 Câu hỏi mẫu"
- ✅ Positioned above bottom navigation (if logged in)
- ✅ Positioned above input area (if guest)
- ✅ Fixed position (doesn't scroll with chat)
- ✅ Small, non-intrusive
- ✅ Shadow for visibility
- ✅ z-index correct (above content, below nav)

### **Position Test:**
- Scroll chat up/down → Pill button stays fixed
- Type in input → Pill button visible above keyboard
- Bottom nav visible (logged in) → Pill clears it
- No overlap with input field or navigation

### **Touch Test:**
- Tap pill button → Bottom sheet opens
- Smooth animation
- Sheet has drag handle at top

---

## 📱 Test 4: Bottom Sheet (Tabbed Topics)

### **What to Check:**
1. Tap pill button from Test 3
2. Bottom sheet slides up from bottom
3. Shows "📚 Popular topics" header
4. 5 icon tabs below header
5. Questions for first topic (Land) displayed

### **Expected Behavior:**
- ✅ Sheet opens to 70% viewport height
- ✅ Drag handle visible at top
- ✅ Header centered: "Popular topics" or "Chủ đề phổ biến"
- ✅ 5 tabs: 🌾 💧 🐛 🌾 ♻️
- ✅ First tab (Land) is active (highlighted)
- ✅ 5 questions for Land topic shown below
- ✅ Questions scrollable (scroll area)
- ✅ Each question button min 56px height

### **Tab Switching Test:**
- Tap 💧 Water tab → Shows water questions
- Tap 🐛 Pest tab → Shows pest questions
- Tap 🌾 Harvest tab → Shows harvest questions
- Tap ♻️ Straw tab → Shows straw questions
- Active tab highlighted with bg-accent
- Tab icon scales up slightly when active
- Smooth transition between tabs

### **Question Selection Test:**
- Tap any question → Sheet closes
- Question appears in input field
- Question auto-sends
- Sheet dismisses smoothly

### **Drag Test:**
- Drag handle down → Sheet closes
- Tap outside sheet → Sheet closes
- Swipe down on sheet → Sheet closes (native behavior)

### **Scroll Test:**
- Questions area scrolls independently
- Tabs stay fixed at top
- Smooth scrolling
- No layout breaks

---

## 📱 Test 5: Responsive Sizing (Screen Sizes)

### **iPhone SE (375px):**
- ✅ Topic cards: 140×120px (should show ~2.5 cards)
- ✅ Questions: Full text, 2-3 lines
- ✅ Pill button: Fits above nav
- ✅ Bottom sheet: 70vh height
- ✅ Touch targets: 56px minimum

### **iPhone 14 Pro (393px):**
- ✅ Topic cards: Comfortable spacing
- ✅ Questions: Readable text
- ✅ Pill button: Centered properly
- ✅ Bottom sheet: Good proportions

### **iPad (768px):**
- ✅ Topic cards: Still horizontal scroll
- ✅ Questions: Centered, not stretched
- ✅ Pill button: Centered
- ✅ Bottom sheet: Max width reasonable

### **Desktop (1024px+):**
- ✅ Topic cards: Horizontal scroll works
- ✅ Questions: Centered, not full width
- ✅ Pill button: Centered
- ✅ Bottom sheet: Centered overlay
- ✅ Hover effects work

---

## 📱 Test 6: Language Switching

### **English → Vietnamese:**
1. Start in English
2. Select topic → Questions in English
3. Switch to Vietnamese (top-right toggle)
4. Questions update to Vietnamese
5. All UI text in Vietnamese

### **Vietnamese → English:**
1. Start in Vietnamese
2. Select topic → Questions in Vietnamese
3. Switch to English
4. Questions update to English
5. All UI text in English

### **Layout Stability:**
- ✅ No layout shift when switching
- ✅ Vietnamese questions (longer) still fit
- ✅ Question buttons auto-height
- ✅ No horizontal overflow

---

## 📱 Test 7: Integration with Chat

### **Question Selection Flow:**
1. Tap suggested question
2. Question appears in input field
3. Input type set to 'text' (not voice/image)
4. Question auto-sends after 100ms
5. User message appears in chat
6. AI responds (IRRI knowledge or ChatGPT)

### **After Selection:**
- ✅ Topic list disappears (if initial view)
- ✅ Bottom sheet closes (if opened)
- ✅ Chat updates normally
- ✅ Pill button remains visible
- ✅ Can select another question later

### **Multiple Questions:**
- Send 1st question → AI responds
- Tap pill button → Open sheet
- Send 2nd question → AI responds
- Repeat → Works consistently

---

## 📱 Test 8: Edge Cases

### **Very Long Vietnamese Questions:**
- ✅ Text wraps to 2-3 lines
- ✅ No horizontal scroll in button
- ✅ Still readable
- ✅ Button height auto-adjusts

### **Small Screens (320px):**
- ✅ Topic cards still show (~2 cards)
- ✅ Questions wrap properly
- ✅ Pill button fits
- ✅ Bottom sheet usable

### **Landscape Orientation:**
- ✅ Bottom sheet height reasonable
- ✅ Questions still scrollable
- ✅ Pill button visible

### **Rapid Interactions:**
- Tap topic quickly → Responds
- Switch tabs quickly → Updates
- Tap question quickly → Sends
- No crashes or delays

---

## 🐛 Known Issues to Check

### **Issue 1: Pill Button Overlap**
- **Check:** Pill button doesn't overlap input field
- **Fix:** Position: bottom-20 (clears bottom nav)

### **Issue 2: Sheet Not Closing**
- **Check:** Sheet closes after question selection
- **Fix:** setSheetOpen(false) in handleQuestionClick

### **Issue 3: Vietnamese Truncation**
- **Check:** Full Vietnamese text visible
- **Fix:** Auto-height with leading-relaxed

### **Issue 4: Horizontal Scroll Visible**
- **Check:** Scrollbar hidden on topic cards
- **Fix:** scrollbar-hide class in globals.css

### **Issue 5: Tab Not Switching**
- **Check:** Tabs respond to touch
- **Fix:** Button with proper onClick handler

---

## ✅ Success Criteria

All tests should pass with:
- ✅ No console errors
- ✅ Smooth animations
- ✅ Responsive on all screen sizes
- ✅ Touch targets 48-56px minimum
- ✅ Bilingual (EN/VI) working
- ✅ No horizontal overflow
- ✅ No layout breaks
- ✅ Questions selectable
- ✅ Chat integration works
- ✅ Native mobile feel

---

## 🎯 Quick Mobile Test (5 Minutes)

1. **Open assistant** → See topic cards ✅
2. **Tap Water topic** → See 5 questions ✅
3. **Tap 1st question** → Sends to AI ✅
4. **See pill button** → Tap to open sheet ✅
5. **Switch to Pest tab** → See pest questions ✅
6. **Tap pest question** → Sends, sheet closes ✅
7. **Switch to Vietnamese** → All text updates ✅
8. **Tap pill again** → Opens, all working ✅

**If all 8 steps work: ✅ READY FOR PRODUCTION!**

---

## 📞 Troubleshooting

### **Problem: Topic cards not scrolling**
- Check: `overflow-x-auto` on container
- Check: `flex gap-3` for spacing
- Check: Cards have fixed width (140px)

### **Problem: Bottom sheet not opening**
- Check: Sheet component imported
- Check: sheetOpen state working
- Check: SheetTrigger wrapping button

### **Problem: Questions truncated**
- Check: No `truncate` or `text-ellipsis` classes
- Check: `whitespace-normal` on buttons
- Check: `leading-relaxed` for line height

### **Problem: Pill button hidden**
- Check: z-index 40 set
- Check: Position fixed bottom-20
- Check: Not covered by bottom nav

### **Problem: Language not switching**
- Check: language prop from useApp()
- Check: Ternary for EN/VI text
- Check: Messages update on language change

---

## 🚀 Deploy Checklist

Before deploying:
- ✅ All 8 tests passing
- ✅ No console errors
- ✅ Mobile tested (iPhone, Android)
- ✅ Desktop tested (Chrome, Safari)
- ✅ Vietnamese tested (all questions)
- ✅ English tested (all questions)
- ✅ Integration with SimpleAssistant working
- ✅ No performance issues
- ✅ Animations smooth
- ✅ Touch targets large enough

**Ready to deploy!** 🌾✨
