# Bilingual Animated Indian Wedding Invitation Website (English & తెలుగు)

An animated, single-page bilingual Indian wedding invitation website built as a static site using vanilla HTML5, CSS3, and JavaScript. Zero external frameworks, zero build step required, deployable directly to Vercel or any static host, or runnable simply by double-clicking `index.html`.

---

## 🌟 Highlights & Features

1. **Ceremonial Door Entrance Screen**:
   - Fullscreen animated doors with rich gold gradients, delicate beading, and a centered wax seal monogram (`R & V`).
   - Tapping the seal smoothly opens the doors with realistic slide transitions, revealing the invitation with page scrolling re-enabled.

2. **Bilingual Support (English & Telugu)**:
   - Floating language toggle pill (`EN | తె`) fixed in the top corner.
   - Flips `currentLang` and re-renders **all** content dynamically in real-time with zero page reload.
   - **Genuine Telugu Script**: Authentic Telugu Unicode text for all ceremonies and labels:
     - Sumuhurtham: **సుముహూర్తం**
     - Reception: **రిసెప్షన్**

3. **Distinct Tradition-Aware Visual Modes**:
   - **English Mode**: Warm festive palette (turmeric gold, royal maroon, cream background), Samarkan calligraphic display font for couple names and monogram, gold mandala vector motifs.
   - **Telugu Mode**: Bapu-inspired minimalist watercolor aesthetic (soft ochre, warm ivory, muted temple maroon), organic hand-lettered font stack (`Tillana`, `Mallanna`, `Noto Sans Telugu`), authentic geometrical **Kolam** (rangoli dot-and-loop) threshold strip, corner motifs, and watermarks.

4. **Falling Flower Petals**:
   - Lightweight CSS keyframe particle animation using dynamic colors tuned to the active palette.

5. **Festivities Timeline**:
   - Ceremony details with dates, times, venues, maps links, and quotes.
   - Google Calendar one-click add links for every event.
   - Non-interactive decorative thumbnails keep the focus on the ceremony details.

6. **Interactive Features**:
   - **Pick Your Side**: Ram Mohan vs Vaibhavi selection cards that seamlessly append the choice to the RSVP.
   - **Live 3D Flip Countdown**: Exact minute calculation (ISO 8601 with timezone offset) with perspective tile flip animations and milestone status messages.
   - **RSVP Form with Direct WhatsApp Integration**: Name input, attending toggle, multi-event chip selector, guest count stepper. Generates a pre-filled WhatsApp message opening `https://wa.me/<number>?text=...`.
   - **Wedding Hashtag**: One-click copy with toast notification (`#RamMohanWedsVaibhavi`).

---

## 📁 Architecture (4 Core Files)

The site is built with a strictly centralized architecture:

| File | Purpose |
|------|---------|
| `config.js` | **Single Source of Truth**. Every name, date, venue, maps link, quote, color, phone number, and image path is configured here. |
| `index.html` | Semantic structural skeleton. All text is injected dynamically at runtime from `config.js`. |
| `style.css` | Styling, layout, animations, and CSS variables driven by `config.js`. |
| `script.js` | All interactions, language switching, and flip countdown. |
| `vercel.json` | Vercel static deployment configuration with clean URLs. |

---

## 🎨 Swapping Placeholder Images (Zero Code Changes)

Placeholder images have been generated locally at the exact paths below. To customize with real photos or illustrations, simply drop your files into these folders using the **exact filenames**:

### English Mode Images:
- `assets/images/english/hero.jpg` — Couple portrait or main illustration
- `assets/images/english/wedding.jpg` — Sumuhurtham illustration
- `assets/images/english/reception.jpg` — Reception illustration

### Telugu Mode Images:
- `assets/images/telugu/hero.jpg` — Bapu-style couple art or portrait
- `assets/images/telugu/wedding.jpg` — Sumuhurtham illustration (also used for the Reception card)

---

## ✏️ How to Reskin & Edit Content

Open `config.js` in any text editor. Non-technical users can change:
- **Couple Details**: Names, parents' names, monogram, hashtag, WhatsApp number.
- **Countdown Target**: Set `countdown.targetIso` to your wedding's ISO 8601 datetime with timezone (e.g., `"2026-12-11T10:24:00+05:30"`).
- **Events**: Modify dates, times, venues, `mapsLink`, taglines, and `revealType` (keep `"none"` for non-interactive cards).
- **Colors**: Customize hex codes for English and Telugu modes.

---

## 🔤 Font Licensing Notice

- **Samarkan Font**: Self-hosted in `assets/fonts/samarkan.woff2` and `assets/fonts/samarkan.ttf`. Original design by Titivillus Foundry / Ethel Enterprises (FontSpace). It is licensed as **Free for Personal Use**. If you plan to sell this website as a commercial template or for a commercial product, please purchase a commercial license from the designer.
- **Google Fonts**: `Playfair Display`, `Cormorant Garamond`, `Tillana`, `Mallanna`, `Noto Sans Telugu`, and `Plus Jakarta Sans` are open source under the SIL Open Font License (OFL).

---

## 🚀 Deployment

### Deploying to Vercel (Zero Config):
1. Install Vercel CLI: `npm i -g vercel` or link your GitHub repo in the Vercel dashboard.
2. Run `vercel` in the project root directory.
3. Vercel automatically detects the static project and deploys it instantly.

### Running Locally:
- Simply double-click `index.html` in any browser, or
- Serve using any static server:
  ```bash
  npx serve .
  ```
  or with Vite:
  ```bash
  npm run dev
  ```
