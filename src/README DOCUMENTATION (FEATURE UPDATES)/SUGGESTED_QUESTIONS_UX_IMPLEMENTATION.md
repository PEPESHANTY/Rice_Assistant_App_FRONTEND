# 🎯 Suggested Questions UX - Mobile-First Implementation

## ✅ What Was Implemented

A **progressive disclosure** suggested questions system optimized for mobile farmers, featuring:

1. **Empty Chat (First Load):** 5 topic cards with horizontal scroll
2. **Topic Selected:** 5 questions displayed as large buttons
3. **After Conversation:** Floating pill button with bottom sheet
4. **Bottom Sheet:** Tabbed interface showing all 25 questions by topic

---

## 📱 User Experience Flow

### **Phase 1: Initial Welcome (1 Message)**

```
┌─────────────────────────────────┐
│ 👋 Welcome message from AI      │
└─────────────────────────────────┘

📚 Choose a topic:
Or type your own question below 👇

┌──────────┬──────────┬──────────┐
│ 🌾      │ 💧      │ 🐛      │  ← Horizontal
│ Land     │ Water   │ Pests   │    scroll
│ (5 Qs)   │ (5 Qs)  │ (5 Qs)  │
└──────────┴──────────┴──────────┘
       ↓ Scroll more ↓
```

**Features:**
- ✅ Horizontal scroll with snap points
- ✅ Touch-friendly 140×120px cards
- ✅ Clear visual hierarchy
- ✅ Bilingual titles (EN/VI)
- ✅ Icon + text + badge (5 questions)

---

### **Phase 2: Topic Selected**

```
⬅️ Back to topics      💧 Water & Fert.

┌─────────────────────────────────┐
│ When do I start AWD and how do │
│ I know when to irrigate?       │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ In the first week after sowing,│
│ should the field be flooded?   │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│ What total N-P-K do I target   │
│ on alluvial soil?              │
└─────────────────────────────────┘

[+2 more questions...]
```

**Features:**
- ✅ Back button to return to topics
- ✅ Large topic icon at top
- ✅ 56px minimum height buttons
- ✅ Full Vietnamese text (no truncation)
- ✅ 2-line text with auto-height
- ✅ Hover and active states

---

### **Phase 3: After Conversation Starts (2+ Messages)**

```
[Chat messages continue...]

┌─────────────────────────────────┐
│ 💡 Example questions (Tap)      │ ← Floating pill
└─────────────────────────────────┘

[Input field]
[Bottom Nav]
```

**Features:**
- ✅ Floating pill button (bottom-center)
- ✅ Fixed position above bottom nav (z-40)
- ✅ Shadow for visibility
- ✅ Small, non-intrusive
- ✅ Opens bottom sheet on tap

---

### **Phase 4: Bottom Sheet (Tabbed Topics)**

```
┌─────────────────────────────────┐
│  ═══  [Drag handle]             │
│                                 │
│  📚 Popular topics              │
│                                 │
│ 🌾 | 💧 | 🐛 | 🌾 | ♻️          │ ← Icon tabs
│ Land Water Pest Harv Straw      │
│ ─────                           │ ← Active: Land
│                                 │
│ Land preparation & seeding:     │
│                                 │
│ • Laser leveling benefit?       │
│ • Drain before seeding?         │
│ • Max seed rate?                │
│ • Pneumatic seeder capacity?    │
│ • Wide-narrow row better?       │
│                                 │
│ [Scrollable area]               │
└─────────────────────────────────┘
```

**Features:**
- ✅ 70vh height bottom sheet
- ✅ Drag handle for native feel
- ✅ 5 icon tabs (one per topic)
- ✅ Active tab highlighted
- ✅ Scrollable questions area
- ✅ Large touch targets (56px)
- ✅ Auto-closes on question selection

---

## 🎨 Design Specifications

### **Topic Cards (Phase 1)**

```css
Size: 140px × 120px
Icon: 32px emoji (🌾💧🐛)
Title: 14px font
Badge: "5 questions" label
Gap: 12px between cards
Scroll: Horizontal snap
Colors:
  - Land: Green (bg-green-50)
  - Water: Blue (bg-blue-50)
  - Pest: Orange (bg-orange-50)
  - Harvest: Yellow (bg-yellow-50)
  - Straw: Emerald (bg-emerald-50)
```

### **Question Buttons**

```css
Min Height: 56px (touch-friendly)
Padding: 16px horizontal, auto vertical
Font: 15px responsive
Border: 2px solid
Radius: 12px rounded
Text: 2-3 lines with leading-relaxed
Hover: Border changes to primary
Active: Scale 0.98 animation
```

### **Floating Pill Button**

```css
Position: Fixed bottom-20 left-1/2
Transform: -translate-x-1/2
Z-index: 40 (above content, below nav)
Shadow: Large for visibility
Gap: 8px between icon and text
Size: Small with padding
```

### **Bottom Sheet**

```css
Height: 70vh
Radius: Rounded top (2xl)
Header: Centered "Popular topics"
Tabs: 5 icons with labels
Active: Highlighted with scale
Scroll: 50vh area for questions
```

---

## 📊 The 5 Topics × 5 Questions Structure

### **1. 🌾 Land prep & seeding**
1. Do I really need laser land leveling?
2. How long before direct seeding should I drain water?
3. What's the maximum seed rate with mechanized seeding?
4. What capacity can a 6-row pneumatic seeder cover?
5. Is wide-narrow row pattern better than even spacing?

### **2. 💧 Water & fertilizer**
1. When do I start AWD and how do I know when to irrigate?
2. In the first week after sowing, should the field be flooded?
3. What total N-P-K do I target on alluvial soil?
4. How should I adjust N in Summer-Autumn vs Winter-Spring?
5. If I use a seeder with fertilizer, can I reduce nitrogen?

### **3. 🐛 Pest management (IPM)**
1. I see brown planthoppers—should I spray now?
2. What does IPM mean for my farm?
3. If I must spray, what are the '4 Rights'?
4. Should I spray on a fixed schedule to prevent pests?
5. Any safety/timing tips if spraying is needed?

### **4. 🌾 Harvest & storage**
1. When is the optimal harvest time?
2. Why use a combine instead of hand harvesting?
3. How soon must I dry paddy after harvest?
4. What are safe moisture targets for storage?
5. If it rains during harvest, what should I do?

### **5. ♻️ Straw handling**
1. How long can straw stay on dry fields after harvest?
2. What should I do with straw on wet fields?
3. Which baler suits wet fields better?
4. Is burning straw a problem? What nutrients are lost?
5. How does straw fit a circular pathway back to the field?

---

## 🔧 Technical Implementation

### **Component Structure**

```
/components/SuggestedQuestions.tsx
├── TOPICS[] (5 topics with questions)
├── SuggestedQuestions (main component)
│   ├── TopicCards (horizontal scroll view)
│   ├── QuestionsList (selected topic view)
│   ├── BottomSheetView (tabbed topics)
│   └── Logic (state management)
└── ContextualSuggestions (future: related Qs)
```

### **Integration in SimpleAssistant**

```typescript
// Added inside messages ScrollArea, after typing indicator
<SuggestedQuestions 
  onSelectQuestion={(question) => {
    setInput(question);
    setActiveInputType('text');
    setTimeout(() => handleSendMessage(), 100);
  }}
  messagesCount={messages.length}
/>
```

### **State Management**

```typescript
const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
const [sheetOpen, setSheetOpen] = useState(false);

// Phase logic
const showInitialView = messagesCount === 1;

// If initial view (1 message) → Show topic cards or questions
// If conversation started (2+ messages) → Show floating pill
```

---

## 📱 Mobile Optimizations

### **Touch Targets**
- ✅ All buttons: 56px minimum height
- ✅ Topic cards: 140×120px (large)
- ✅ Pill button: 48px minimum (touch-target-large)
- ✅ Tab icons: 48px hit area

### **Responsive Text**
- ✅ Uses `text-responsive-*` classes
- ✅ Clamp for Vietnamese long questions
- ✅ 2-3 lines with ellipsis where needed
- ✅ Leading-relaxed for readability

### **Scrolling**
- ✅ Horizontal scroll with snap points
- ✅ Hidden scrollbar (scrollbar-hide class)
- ✅ Smooth momentum scrolling
- ✅ Native feel on iOS/Android

### **Animations**
- ✅ Active state: scale-[0.98]
- ✅ Transition: duration-200
- ✅ Hover effects on desktop
- ✅ Tab switching animation

### **Bottom Nav Safe Area**
- ✅ Pill button positioned at bottom-20
- ✅ Clears bottom navigation (z-index)
- ✅ Works with env(safe-area-inset-bottom)

---

## 🌾 Vietnamese Language Support

### **All Questions Bilingual**

```typescript
questions: Array<{
  en: string;
  vi: string;
}>

// Display logic
{language === 'EN' ? question.en : question.vi}
```

### **No Truncation**
- Vietnamese questions are long (15-25 words)
- Full text displayed (2-3 lines, auto-height)
- No "..." truncation that causes confusion

### **Topic Titles**
```typescript
title: {
  en: 'Land prep & seeding',
  vi: 'Làm đất & gieo sạ'
}
```

---

## ✅ Benefits for Farmers

### **Progressive Disclosure**
1. Start simple (5 topics, not 25 questions)
2. Drill down to specific questions
3. Hide after conversation starts (clean chat)
4. Always retrievable (pill button)

### **Mobile-First**
- Large touch targets (no missed taps)
- Horizontal scroll (natural mobile gesture)
- Bottom sheet (familiar iOS/Android pattern)
- Emoji icons (visual, language-agnostic)

### **Farmer-Friendly**
- Clear categories (by farming stage)
- Practical questions (real farming problems)
- IRRI expert answers (trusted source)
- Vietnamese default (local language)

### **Low Cognitive Load**
- Not overwhelming (5 at a time)
- Visual hierarchy (icons + text)
- Familiar patterns (bottom sheets, tabs)
- One action = one result

---

## 🔄 User Flow Examples

### **Example 1: New User**
1. Opens assistant → Sees welcome + 5 topic cards
2. Taps "💧 Water & fertilizer"
3. Sees 5 questions about water/fertilizer
4. Taps "When do I start AWD?"
5. Question sent, AI responds with IRRI guidance
6. Topic cards disappear, chat continues
7. Can tap pill button to see more questions

### **Example 2: Returning User**
1. Opens assistant → Sees previous chat
2. Pill button visible at bottom-center
3. Taps pill → Bottom sheet opens
4. Swipes to "🐛 Pest" tab
5. Taps question about planthoppers
6. Sheet closes, question sent
7. AI responds with IPM guidance

### **Example 3: Quick Question**
1. Opens assistant → Sees topic cards
2. Taps "🌾 Harvest" directly
3. Taps first question ("optimal harvest time")
4. AI responds immediately
5. User continues chatting naturally
6. Topic system hidden (clean UX)

---

## 🎯 Success Metrics

### **Discoverability**
- ✅ Visible on first load (topic cards)
- ✅ Always accessible (pill button)
- ✅ Clear labels (example questions)

### **Usability**
- ✅ Large touch targets (56px+)
- ✅ Simple hierarchy (topics → questions)
- ✅ Native patterns (bottom sheet, tabs)

### **Accessibility**
- ✅ Bilingual (EN/VI)
- ✅ Icons + text labels
- ✅ High contrast colors
- ✅ Responsive text sizing

### **Performance**
- ✅ No network calls (local data)
- ✅ Instant display
- ✅ Smooth animations
- ✅ Small component size

---

## 🚀 Future Enhancements (Optional)

### **Phase 2: Context-Aware Suggestions**
```typescript
// Show 2-3 related questions after assistant response
<ContextualSuggestions 
  suggestions={getRelatedQuestions(lastMessage)}
  onSelectQuestion={handleQuestion}
/>
```

### **Phase 3: Analytics**
```typescript
// Track which questions are most popular
trackQuestionClick(topic, question);

// Show "Popular" badge on top questions
{isPopular && <Badge>Popular</Badge>}
```

### **Phase 4: Seasonal Suggestions**
```typescript
// Show planting questions in planting season
const seasonalTopics = getSeasonalTopics(currentMonth);
```

### **Phase 5: Personalization**
```typescript
// Remember which topics user asked about
const frequentTopics = getUserTopicHistory();
// Show those first
```

---

## 📚 Related Files

### **Main Component**
- `/components/SuggestedQuestions.tsx` - Full implementation

### **Data Source**
- `/data/irriChatFlows.ts` - IRRI chat flows (not used directly)
- Topics and questions are hardcoded in SuggestedQuestions.tsx

### **Integration**
- `/components/SimpleAssistant.tsx` - Integrated here

### **Styling**
- `/styles/globals.css` - Added scrollbar-hide class

### **UI Components Used**
- `/components/ui/sheet.tsx` - Bottom sheet
- `/components/ui/button.tsx` - All buttons
- `/components/ui/badge.tsx` - "5 questions" badges
- `/components/ui/scroll-area.tsx` - Scrollable areas

---

## 🧪 Testing Checklist

### **Mobile (Primary)**
- ✅ Topic cards scroll horizontally
- ✅ Snap points work correctly
- ✅ Questions are fully readable (no truncation)
- ✅ Pill button doesn't block input
- ✅ Bottom sheet opens/closes smoothly
- ✅ Tabs switch correctly
- ✅ Touch targets are large enough
- ✅ Works on small screens (320px+)

### **Desktop (Secondary)**
- ✅ Topic cards display nicely
- ✅ Hover effects work
- ✅ Bottom sheet centers properly
- ✅ No overflow issues

### **Languages**
- ✅ English displays correctly
- ✅ Vietnamese displays correctly (longer text)
- ✅ Switching languages updates questions
- ✅ No layout breaks with long Vietnamese

### **Edge Cases**
- ✅ Works with 1 message (initial state)
- ✅ Works with 2+ messages (conversation)
- ✅ Pill button clears bottom nav
- ✅ Back button returns to topics
- ✅ Sheet closes after question selection

---

## 🎉 Summary

**Implemented:** Full progressive disclosure suggested questions system with:
- 5 topic categories (land, water, pests, harvest, straw)
- 25 total questions (5 per topic)
- Mobile-first UX with large touch targets
- Bottom sheet with tabbed navigation
- Bilingual support (EN/VI)
- Clean, unobtrusive interface

**Result:** Farmers can easily discover example questions without being overwhelmed, then continue natural conversation. The system progressively discloses complexity:
1. First: 5 simple topics
2. Then: 5 questions per topic
3. Finally: Clean chat with retrievable suggestions

**Mobile-optimized:** All touch targets 48-56px minimum, responsive text, smooth animations, native patterns (bottom sheets, horizontal scroll).

**Ready for production!** 🚀🌾
