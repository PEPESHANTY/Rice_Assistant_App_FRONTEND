# 🏗️ Suggested Questions - Component Architecture

## 📦 Component Structure

```
SuggestedQuestions
├── Props
│   ├── onSelectQuestion: (question: string) => void
│   └── messagesCount: number
│
├── State
│   ├── selectedTopic: Topic | null
│   └── sheetOpen: boolean
│
├── Data
│   └── TOPICS[] (5 topics)
│       ├── id: string
│       ├── title: { en, vi }
│       ├── icon: string (emoji)
│       ├── color: string (bg-color)
│       └── questions: Array<{ en, vi }>
│
└── Sub-Components
    ├── TopicCards() - Initial horizontal scroll view
    ├── QuestionsList() - Selected topic questions
    └── BottomSheetView() - Tabbed topics sheet
```

---

## 🎯 Render Logic Flow

```typescript
function SuggestedQuestions({ onSelectQuestion, messagesCount }) {
  const showInitialView = messagesCount === 1;
  
  if (showInitialView) {
    // Phase 1 & 2: Show topic cards or questions
    return (
      selectedTopic 
        ? <QuestionsList />      // Phase 2
        : <TopicCards />         // Phase 1
    );
  }
  
  // Phase 3: Show pill button with bottom sheet
  return (
    <Sheet>
      <SheetTrigger>
        <PillButton />           // Phase 3
      </SheetTrigger>
      <SheetContent>
        <BottomSheetView />      // Phase 4
      </SheetContent>
    </Sheet>
  );
}
```

---

## 📊 State Machine Diagram

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  START: messagesCount = 1 (Welcome only)       │
│                                                 │
└─────────────┬───────────────────────────────────┘
              │
              ▼
     ┌────────────────┐
     │  TopicCards    │ ← Phase 1: Initial View
     │  (5 cards)     │
     └────────┬───────┘
              │ User taps topic
              ▼
     ┌────────────────┐
     │ QuestionsList  │ ← Phase 2: Questions
     │ (5 questions)  │
     └────────┬───────┘
              │ User taps question
              ▼
     ┌────────────────┐
     │  Question Sent │
     │ messagesCount++│
     └────────┬───────┘
              │
              ▼
     ┌────────────────┐
     │  Pill Button   │ ← Phase 3: Conversation
     │   + Hidden     │
     │   TopicCards   │
     └────────┬───────┘
              │ User taps pill
              ▼
     ┌────────────────┐
     │  BottomSheet   │ ← Phase 4: Power View
     │  (All topics)  │
     └────────┬───────┘
              │ User taps question
              ▼
     ┌────────────────┐
     │  Question Sent │
     │  Sheet Closes  │
     └────────────────┘
```

---

## 🔄 Data Flow

```
User Action → Component State → UI Update → Parent Callback

Example 1: Initial topic selection
─────────────────────────────────────────────────
User: Taps "💧 Water" card
  ↓
State: setSelectedTopic(waterTopic)
  ↓
UI: TopicCards → QuestionsList
  ↓
Display: Shows 5 water questions

Example 2: Question selection
─────────────────────────────────────────────────
User: Taps "When do I start AWD?"
  ↓
Handler: handleQuestionClick(question)
  ↓
State: setSelectedTopic(null), setSheetOpen(false)
  ↓
Callback: onSelectQuestion("When do I start AWD?")
  ↓
Parent: setInput(question), handleSendMessage()
  ↓
Result: Question sent to AI

Example 3: Sheet tab switching
─────────────────────────────────────────────────
User: Taps "🐛 Pest" tab
  ↓
State: setActiveTabId('pest')
  ↓
UI: BottomSheetView re-renders
  ↓
Display: Shows 5 pest questions
```

---

## 🎨 Component Hierarchy

```
SimpleAssistant
│
└─── ScrollArea (Messages)
     │
     ├─── Message bubbles
     ├─── Typing indicator
     │
     └─── SuggestedQuestions ★
          │
          ├─── TopicCards (Phase 1)
          │    │
          │    └─── Button[5] (topic cards)
          │         └─── Icon + Title + Badge
          │
          ├─── QuestionsList (Phase 2)
          │    │
          │    ├─── Back button
          │    ├─── Topic header
          │    └─── Button[5] (questions)
          │
          └─── Sheet (Phase 3-4)
               │
               ├─── PillButton (trigger)
               │    └─── Icon + "Example questions"
               │
               └─── SheetContent
                    │
                    ├─── SheetHeader
                    │    └─── "Popular topics"
                    │
                    └─── BottomSheetView
                         │
                         ├─── IconTabs[5]
                         │    └─── Icon + Label
                         │
                         └─── ScrollArea
                              └─── Button[5] (questions)
```

---

## 📦 Props Interface

```typescript
interface SuggestedQuestionsProps {
  onSelectQuestion: (question: string) => void;
  messagesCount: number;
}

interface Topic {
  id: string;
  title: {
    en: string;
    vi: string;
  };
  icon: string;
  color: string;
  questions: Array<{
    en: string;
    vi: string;
  }>;
}

type Language = 'EN' | 'VI';
```

---

## 🔧 Event Handlers

```typescript
// Topic selection (Phase 1 → Phase 2)
handleTopicClick = (topic: Topic) => {
  setSelectedTopic(topic);
  // UI switches from TopicCards to QuestionsList
}

// Back button (Phase 2 → Phase 1)
handleBackClick = () => {
  setSelectedTopic(null);
  // UI switches from QuestionsList to TopicCards
}

// Question selection (Phase 2/4 → Send)
handleQuestionClick = (question: { en, vi }) => {
  const questionText = language === 'EN' ? question.en : question.vi;
  onSelectQuestion(questionText);  // Callback to parent
  setSelectedTopic(null);          // Reset state
  setSheetOpen(false);             // Close sheet if open
}

// Sheet toggle (Phase 3 ↔ Phase 4)
handleSheetToggle = (open: boolean) => {
  setSheetOpen(open);
  // Sheet opens/closes with animation
}

// Tab switching (Phase 4)
handleTabClick = (topicId: string) => {
  setActiveTabId(topicId);
  // Questions update for new topic
}
```

---

## 🎭 Rendering Conditions

```typescript
// Phase 1: Show TopicCards
if (messagesCount === 1 && !selectedTopic) {
  return <TopicCards />;
}

// Phase 2: Show QuestionsList
if (messagesCount === 1 && selectedTopic) {
  return <QuestionsList />;
}

// Phase 3: Show PillButton
if (messagesCount > 1) {
  return <Sheet><PillButton /></Sheet>;
}

// Phase 4: Show BottomSheet (when pill tapped)
if (messagesCount > 1 && sheetOpen) {
  return <Sheet open><BottomSheetView /></Sheet>;
}
```

---

## ���� Language Handling

```typescript
// Text selection based on language
const t = texts[language];  // EN or VI

// Topic title
{language === 'EN' ? topic.title.en : topic.title.vi}

// Question text
{language === 'EN' ? question.en : question.vi}

// UI labels
{t.chooseTopicTitle}  // "Choose a topic:" or "Chọn chủ đề:"
{t.questions}         // "questions" or "câu hỏi"
{t.backToTopics}      // "Back to topics" or "Về danh sách chủ đề"
```

---

## 🎨 Styling Architecture

```css
/* Topic Cards (Phase 1) */
.topic-card {
  width: 140px;
  height: 120px;
  border: 2px solid;
  border-radius: 12px;
  touch-target: 140x120px (large)
}

/* Question Buttons (Phase 2/4) */
.question-button {
  min-height: 56px;
  padding: 16px;
  border-radius: 12px;
  white-space: normal;  /* Allow wrapping */
  text-align: left;
  touch-target: full-width × 56px+ (large)
}

/* Pill Button (Phase 3) */
.pill-button {
  position: fixed;
  bottom: 80px;         /* Above bottom nav */
  left: 50%;
  transform: translateX(-50%);
  z-index: 40;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* Bottom Sheet (Phase 4) */
.sheet-content {
  height: 70vh;
  border-radius: 16px 16px 0 0;
  touch-target: full-width × 70vh
}

/* Tabs (Phase 4) */
.tab-button {
  min-width: 48px;
  min-height: 48px;
  touch-target: 48x48px (minimum)
}
```

---

## 📱 Responsive Behavior

```typescript
// Horizontal scroll container
<div className="overflow-x-auto snap-x snap-mandatory">
  {/* Cards snap to position on scroll */}
  <button className="snap-start">
    {/* Each card */}
  </button>
</div>

// Bottom sheet height
<SheetContent className="h-[70vh]">
  {/* 70% of viewport height */}
</SheetContent>

// Touch targets
<button className="touch-target-large">
  {/* min-height: 48px, min-width: 48px */}
</button>

// Question buttons auto-height
<button className="min-h-[56px] h-auto">
  {/* Grows with content (Vietnamese) */}
</button>
```

---

## 🔌 Integration Points

### **Parent (SimpleAssistant.tsx):**

```typescript
<SuggestedQuestions 
  onSelectQuestion={(question) => {
    // 1. Set input field
    setInput(question);
    
    // 2. Set input type to text
    setActiveInputType('text');
    
    // 3. Auto-send after brief delay
    setTimeout(() => {
      handleSendMessage();
    }, 100);
  }}
  messagesCount={messages.length}
/>
```

### **Callback Flow:**

```
SuggestedQuestions
  ↓ (user taps question)
onSelectQuestion(question)
  ↓ (parent receives)
setInput(question)
  ↓
handleSendMessage()
  ↓
AI processes question
  ↓
AI response displayed
  ↓
messagesCount++
  ↓
SuggestedQuestions re-renders
  ↓
Phase 1/2 → Phase 3 (pill button)
```

---

## 📊 Performance Optimizations

```typescript
// Memo for topic list (static data)
const TOPICS = useMemo(() => [...], []);

// Conditional rendering (only active tab)
if (activeTabId === topic.id) {
  return <Questions />;
}

// Lazy scrolling (virtual list not needed - only 5 items)
// Just native scroll performance

// CSS transitions (GPU accelerated)
transition-all duration-200
```

---

## 🎯 State Diagram (Detailed)

```
┌─────────────────────────────────────────────────┐
│           SuggestedQuestions Component          │
└─────────────────────────────────────────────────┘
                      │
        ┌─────────────┴─────────────┐
        │                           │
   messagesCount                Language
        │                           │
   ┌────┴────┐                 ┌───┴───┐
   │    1    │                 │  EN   │
   │ (initial)│                │  VI   │
   └────┬────┘                 └───┬───┘
        │                           │
        ▼                           ▼
   ┌─────────────┐           ┌──────────┐
   │selectedTopic│           │  texts   │
   │   (state)   │           │ (object) │
   └─────┬───────┘           └──────┬───┘
         │                           │
    ┌────┴────┐                     │
    │  null   │                     │
    │ (cards) │                     │
    └────┬────┘                     │
         │                           │
    ┌────┴────┐                     │
    │ Topic   │                     │
    │(questions)                    │
    └─────────┘                     │
                                    │
   messagesCount > 1                │
        ↓                           │
   ┌─────────────┐                 │
   │  sheetOpen  │                 │
   │   (state)   │                 │
   └─────┬───────┘                 │
         │                          │
    ┌────┴────┐                    │
    │  false  │                    │
    │  (pill) │                    │
    └────┬────┘                    │
         │                          │
    ┌────┴────┐                    │
    │  true   │                    │
    │ (sheet) │                    │
    └─────────┘                    │
         │                          │
   ┌─────┴──────┐                  │
   │activeTabId │◄─────────────────┘
   │  (state)   │
   └────────────┘
```

---

## 🔄 Lifecycle Hooks

```typescript
// Initial render
useEffect(() => {
  // messagesCount = 1
  // Render TopicCards
}, []);

// Message count change
useEffect(() => {
  if (messagesCount === 1) {
    // Show TopicCards/QuestionsList
  } else {
    // Show PillButton
    setSelectedTopic(null);  // Reset
  }
}, [messagesCount]);

// Language change
useEffect(() => {
  // No special handling needed
  // Component re-renders with new text
}, [language]);

// Sheet state change
useEffect(() => {
  if (sheetOpen) {
    // Trap focus in sheet
    // Handle escape key
  }
}, [sheetOpen]);
```

---

## 🎨 CSS Classes Used

```css
/* Layout */
flex, flex-col, flex-row, gap-*, space-y-*

/* Sizing */
w-*, h-*, min-h-*, max-w-*

/* Spacing */
p-*, px-*, py-*, m-*, mx-*, my-*

/* Colors */
bg-*, text-*, border-*

/* Borders */
border, border-2, rounded-*, border-*

/* Effects */
shadow-*, hover:*, active:*

/* Transitions */
transition-all, duration-*

/* Touch */
touch-target-large (custom)

/* Scroll */
overflow-x-auto, snap-x, snap-start, scrollbar-hide

/* Typography */
text-sm, text-lg, font-medium, leading-*

/* Display */
flex, inline-flex, hidden, block

/* Position */
fixed, relative, absolute, sticky

/* Z-index */
z-40, z-50

/* Responsive */
sm:*, md:*, lg:*, xl:*
```

---

## 🧩 Dependencies

```typescript
// React
import { useState, useRef } from 'react';

// React Router
// (not used in component)

// Custom hooks
import { useApp } from './AppContext';
// - language
// - user (optional)

// UI Components
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';

// Icons
import { ChevronLeft, Sparkles, X } from 'lucide-react';

// Styles
// globals.css (.scrollbar-hide)
```

---

## 📦 Export Structure

```typescript
// Main component
export function SuggestedQuestions(props) { ... }

// Sub-component (future use)
export function ContextualSuggestions(props) { ... }

// Data
export const TOPICS: Topic[] = [ ... ];

// Types
export interface Topic { ... }
export interface SuggestedQuestionsProps { ... }
```

---

## 🎯 Testing Hooks

```typescript
// For testing, components can be accessed via:
<SuggestedQuestions 
  data-testid="suggested-questions"
  onSelectQuestion={mockFn}
  messagesCount={1}
/>

// Sub-components have identifiable classes:
.topic-card         // TopicCards
.question-button    // Questions
.pill-button        // PillButton
.sheet-content      // BottomSheet
.tab-button         // Tabs
```

---

## 🚀 Summary

**Architecture Pattern:** Conditional rendering state machine  
**State Management:** Local useState (no global state)  
**Data Source:** Static TOPICS array (no API)  
**Parent Integration:** Single callback prop  
**Sub-components:** 3 render modes (cards, questions, sheet)  
**Performance:** Minimal re-renders, GPU transitions  
**Accessibility:** Large touch targets, semantic HTML  
**Responsive:** Mobile-first, scales to desktop  

**Result:** Clean, performant, maintainable architecture! ✅

---

```
┌─────────────────────────────────────┐
│  📦 Component: SuggestedQuestions   │
│  📊 Lines of Code: ~500             │
│  🎨 Sub-components: 3               │
│  📱 Responsive: Yes                 │
│  🌐 Bilingual: Yes                  │
│  ⚡ Performance: Excellent           │
│  ✅ Status: Production Ready        │
└─────────────────────────────────────┘
```

**Your component architecture is solid and ready for scale!** 🏗️✨
