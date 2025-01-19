
# **VAIA Chat – Final PRD**

## **1. Introduction**

**Product Name**: VAIA Core Chat  
**Platform**: Responsive Mobile Webapp  
**Tech Stack**:  
- **Frontend**: React.js, TypeScript, Vite, TailwindCSS (with possible daisyUI/shadcn)  
- **LLM Service**: GPT-4o (text + GPT-4o-Vision) for translations, cultural tips, and image-based analysis  
- **Brand Aesthetics**: Twilight/dawn gradients, #1e3a8a (vai’s signature indigo), layered depth, subtle animations  
- **Key Goal**: Provide travelers & language learners quick translations plus cultural insights, TTS on demand, and organized chat threads.

---

## **2. Objectives**

1. **Real-Time Language Help**  
   - Users input text or images → GPT-4o returns translations, transliterations, and cultural tips.  
2. **Organized Conversations**  
   - Automatically group chats into context-labeled threads based on time or location.  
3. **TTS on Demand**  
   - Generate audio only when the user taps a play button (saving cost and reducing clutter).  
4. **Vision Support**  
   - GPT-4o-Vision to parse menu images, street signs, etc. Summarize the text for the user with cultural tips.  
5. **Brand Alignment**  
   - Use VAIA’s signature gradients (e.g., `bg-gradient-to-br from-indigo-50 to-purple-50` for backgrounds, `from-indigo-700 to-purple-600` for AI elements) and an airy, layered UI reminiscent of twilight cityscapes.

---

## **3. Core Features & Flows**

### 3.1 Basic Text Chat

1. **User Input**  
   - In a single-page React interface, a text field at the bottom. The user types queries like “How do I say ‘no sugar, please’ in Thai?”  
2. **GPT-4o Response**  
   - The assistant returns a structured message with translation, transliteration (if needed), and cultural tip.  
3. **Display**  
   - The UI renders two bubble types:  
     - **User bubble**: White background (`bg-white` or `border-indigo-100`).  
     - **AI bubble**: Indigo/purple gradient (`bg-gradient-to-r from-indigo-700 to-purple-600 text-white`).  
   - For each message, store data in a database (`messages` table).  
4. **Thread Context**  
   - If the user crosses a time or location boundary, auto-create a new thread, linking messages to it. Threads are labeled by day/location or an emoji tag.

### 3.2 Vision Flow

1. **User Uploads Image**  
   - Possibly a camera button with a brand gradient (e.g., `bg-gradient-to-r from-indigo-700 to-purple-600`) to open an image picker.  
2. **GPT-4o-Vision Analysis**  
   - The model returns a structured JSON with recognized text plus context.  
3. **Summarize & Display**  
   - Summarize the recognized text to avoid clutter. Example: “Detected: Premium Tuna (特選マグロ).”  
   - The AI bubble includes a short snippet: “It’s a specially selected fish item. Want to learn how to order it?”  
4. **Quick Actions**  
   - GPT-4o might propose next steps (e.g., “Read Full Menu,” “Save Phrase”).  
5. **Storage**  
   - Save the image URL in `messages.metadata`. The raw GPT-4o output can also live in metadata for reference.

### 3.3 TTS on Demand

1. **User Taps Play**  
   - If `audio_url` doesn’t exist in the `phrases` table, call Azure TTS to generate it.  
2. **Store Audio**  
   - In Supabase or external storage, then update `phrases.audio_url`.  
3. **Playback**  
   - The UI shows a “Play” icon or small button in the bubble. Tapping it streams the audio.  
4. **Multi-Language**  
   - `language_code` in `phrases` ensures we pick the correct TTS voice (e.g., `fr-FR`, `ja-JP`, `th-TH`).

### 3.4 Thread/Context Management

1. **Auto-Creation**  
   - Create or switch threads if it’s a new day or the user’s location changed significantly.  
2. **Tagging**  
   - Use an array field (like `threads.tags`) to store context keywords or emojis (e.g., `["food","🍲"]`).  
3. **UI**  
   - Optionally show a thread list or rely on time-based separation. Each thread can have an associated location or date label.

### 3.5 Phrase Reusability

1. **Normalized Storage**  
   - Each GPT-4o-generated phrase is stored in `phrases`: original text, translation, transliteration, audio URL, tip, language code, etc.  
2. **Linking**  
   - `message_phrases` table references which messages contain which phrases.  
3. **Future**  
   - Allows advanced features like a phrasebook or quiz mode, where repeated usage data is easily queried.

### 3.6 Quick Actions

1. **GPT-4o Suggestions**  
   - e.g., [Practice Now], [Save Phrase], [Learn More].  
2. **Implementation**  
   - Tapping a quick action sends a new “user message.” The AI can refine or continue the conversation.  
3. **UI**  
   - Typically rendered as small Tailwind/daisyUI buttons with brand color outlines or backgrounds.

---

## **4. Brand & UX Guidelines**

### 4.1 Color Palette & Gradients

- **Foreground** (AI-bubble, vai avatar):  
  - `bg-gradient-to-r from-indigo-700 to-purple-600 text-white`
- **Background** (Page Shell):  
  - `bg-gradient-to-br from-indigo-50 to-purple-50`
- **Accents** (Hover/Focus, special transitions):  
  - Could use a “dawn gradient” like `from-blue-300 to-purple-500` or subtle color shifts.  

### 4.2 Typography

- **Sans-Serif** (Inter, Sora, etc.) for a clean, modern feel.  
- **Headings**: `text-indigo-700` or `text-purple-700` for brand pop.  
- **Bubbles**: Contrasting text color to ensure readability (white on dark gradient, dark grey on white).

### 4.3 Layout & Interactions

- **Single-page layout** with a scrolling chat container, pinned input at the bottom.  
- **Transitions**:  
  - Gentle fade or slide for new messages (`animate-bounce` for typing dots).  
  - Subtle color shifts on hover states for buttons (`transition-colors`, `duration-200`).  
- **Thread** list or top bar can display location + date in a smaller “status bar” style, as in your code snippet.

---

## **5. Technical Implementation**

### 5.1 Frontend

- **React + TypeScript + Vite**  
  - Quick dev environment, typed safety.  
- **TailwindCSS**  
  - Utility-first styling with brand-themed classes.  
- **daisyUI** (Optional)  
  - If you want prebuilt components that you can further brand with custom themes.  
- **lucide-react**  
  - For icons (e.g., `<Camera />`, `<Play />`, `<Send />`, `<Globe />`).

### 5.2 Backend

- **GPT-4o**  
  - Text-based queries for translations, tips, quick actions.  
- **GPT-4o-Vision**  
  - Image-based analysis (menus, signs).  
- **Azure TTS**  
  - On-demand audio generation, store URL in `phrases.audio_url`.  
- **Supabase**  
  - Postgres for tables (`users`, `threads`, `messages`, `phrases`), plus storage buckets for images/audio.  

---

## **6. Data Model**

### **users**

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  telegram_id BIGINT UNIQUE NOT NULL,
  name VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **threads**

```sql
CREATE TABLE threads (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),         
  location VARCHAR(255),      
  tags TEXT[] DEFAULT '{}',   -- e.g. ["food","🍲"]
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **messages**

```sql
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  thread_id INT REFERENCES threads(id) ON DELETE CASCADE,
  sender VARCHAR(50) CHECK (sender IN ('user','vai')),
  content TEXT,
  metadata JSONB,       -- store image URLs, GPT-4o partial data, quick actions
  type VARCHAR(50) CHECK (type IN ('text','image','vision_result')),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **phrases**

```sql
CREATE TABLE phrases (
  id SERIAL PRIMARY KEY,
  original_text VARCHAR(500) NOT NULL,
  transliteration VARCHAR(500),
  translation VARCHAR(500),
  language_code VARCHAR(10),  -- e.g. "ja-JP"
  cultural_tip TEXT,
  audio_url TEXT,             -- once TTS is generated
  version INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### **message_phrases**

```sql
CREATE TABLE message_phrases (
  message_id INT REFERENCES messages(id) ON DELETE CASCADE,
  phrase_id INT REFERENCES phrases(id) ON DELETE CASCADE,
  PRIMARY KEY (message_id, phrase_id)
);
```

**Indexes**  
- `CREATE INDEX idx_messages_thread_id ON messages(thread_id);`  
- `CREATE INDEX idx_messages_created_at ON messages(created_at);`

---

## **7. Telemetree & Analytics**

- **Log**  
  - # of user messages, TTS button clicks, Vision uploads, quick actions used, etc.  
- **Privacy**  
  - Possibly anonymize location data.  
- **Feedback**  
  - Optionally prompt for user rating on translations or cultural tips to refine GPT-4o prompts.

---

## **8. Success Metrics**

1. **Engagement**  
   - ~2 queries per session on average.  
2. **Thread Navigation**  
   - 20% of users revisit older threads within 24-48 hours.  
3. **TTS Usage**  
   - 30% of phrases get audio generation requests.  
4. **Vision Adoption**  
   - 15-20% of sessions try at least one image-based query.  
5. **Retention**  
   - 30% of users return multiple days in a row (especially travelers).

---

## **9. Implementation Roadmap**

1. **MVP: Text Chat**  
   - Build core React page, hooking up GPT-4o for translations.  
   - Auto-create threads by date, store messages.  
2. **Normalized Phrases**  
   - Any GPT-4o output gets saved in `phrases` for potential reusability.  
3. **On-Demand TTS**  
   - Integrate Azure TTS. Provide a “Play” button in the AI bubble.  
4. **Vision Feature**  
   - Implement GPT-4o-Vision for menus/signs. Summarize detection. Possibly propose follow-up actions.  
5. **Thread Tagging & UI**  
   - Add location-based or time-based tagging with emojis. Provide a minimal thread list or daily separation.  
6. **Analytics & Telemetree**  
   - Track user flows, phrase usage, quick action clicks. Use data to refine prompts.  
7. **UI Polish & Brand Emphasis**  
   - Tweak gradients, animations, micro-interactions to reflect the VAIA brand (twilight/dawn, fluid layering).  
8. **Expansion**  
   - Potential future features: user favorites, phrasebook, local references, or recommended dialogues.

---

## **10. Final Remarks**

- **Brand Experience**: Aim for a calm, layered twilight aesthetic. Keep vai’s signature indigo #1e3a8a in key elements (bubbles, buttons) for recognition.  
- **Performance & Cost**: GPT-4o calls only when needed. TTS generated on user request. Summarize Vision outputs to avoid token blowouts.  
- **Schema Flexibility**: The combination of normalized `phrases` + JSONB `metadata` in `messages` keeps you agile for future expansions.  
- **Ship Iteratively**: Start with text queries + minimal UI. Test user feedback. Gradually add TTS, vision, and advanced tagging.  