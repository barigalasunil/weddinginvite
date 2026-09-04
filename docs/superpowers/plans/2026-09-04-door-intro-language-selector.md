# Door-Intro Language Selector Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the door-intro screen so two distinct door panels (mandala/kolam) double as the language selector, remove the persistent toggle pill, and switch the door animation from 2D slide to 3D swing.

**Architecture:** The door-intro is shown on every page load. Two image-backed panels fill the left/right halves of the screen with language labels rendered by JS from config. Tapping left/center sets English, tapping right sets Telugu, then both panels swing open via 3D `rotateY` transforms. After entry, no toggle pill exists — refresh to change language.

**Tech Stack:** Vanilla HTML/CSS/JS, no frameworks. CSS custom properties for theming. `background-image` for door textures, CSS 3D transforms for swing animation.

## Global Constraints

- All user-facing text in `config.js` as plain values or `{en, te}` objects — never hardcoded in HTML
- No localStorage, sessionStorage, or cookies for language persistence
- `overflow: hidden` scoped only to `.doors-wrap`, never to ancestors
- `sealGold` stays in config (used by `.door-seal-btn`); only `doorGradient` removed
- Door images at `assets/images/english/decorative/door-left-english.jpg` and `assets/images/telugu/decorative/door-right-telugu.jpg` (current locations, not shared path)

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `assets/images/english/decorative/door-left-english.jpg` | **Move** → `assets/images/shared/decorative/door-left-english.jpg` | Relocate to shared path |
| `assets/images/telugu/decorative/door-right-telugu.jpg` | **Move** → `assets/images/shared/decorative/door-right-telugu.jpg` | Relocate to shared path |
| `config.js` | **Modify** | Add `doorLabels`, `doorHint`, `doorSubHint`; remove `doorSealText`, `doorGradient` |
| `index.html` | **Modify** | Add `.door-label` elements to panels; update monogram hint structure; remove `lang-toggle-container` |
| `style.css` | **Modify** | Image-based doors + fallback color; 3D swing animation; `.door-label` styles; remove `.lang-toggle-*` |
| `script.js` | **Modify** | Left/right panel click handlers; remove toggle refs; render config door values; remove `doorGradient` CSS var |

---

### Task 1: Move Door Images to Shared Path

**Files:**
- Move: `assets/images/english/decorative/door-left-english.jpg` → `assets/images/shared/decorative/door-left-english.jpg`
- Move: `assets/images/telugu/decorative/door-right-telugu.jpg` → `assets/images/shared/decorative/door-right-telugu.jpg`

- [ ] **Step 1: Create shared directory**

```bash
mkdir -p "D:\Wedding-Invite\assets\images\shared\decorative"
```

- [ ] **Step 2: Move left door image**

```bash
move "D:\Wedding-Invite\assets\images\english\decorative\door-left-english.jpg" "D:\Wedding-Invite\assets\images\shared\decorative\door-left-english.jpg"
```

- [ ] **Step 3: Move right door image**

```bash
move "D:\Wedding-Invite\assets\images\telugu\decorative\door-right-telugu.jpg" "D:\Wedding-Invite\assets\images\shared\decorative\door-right-telugu.jpg"
```

- [ ] **Step 4: Verify both files exist at new paths**

```bash
dir "D:\Wedding-Invite\assets\images\shared\decorative\"
```

Expected: `door-left-english.jpg` and `door-right-telugu.jpg` listed.

---

### Task 2: Update config.js — Add Door Labels, Remove Old Entries

**Files:**
- Modify: `config.js:44-45` (colors.en), `config.js:59-60` (colors.te), `config.js:133-136` (ui.doorSealText)

- [ ] **Step 1: Remove `doorGradient` from `colors.en`**

In `config.js`, find lines 44-45:
```js
      sealGold: 'linear-gradient(135deg, #FDE68A 0%, #D97706 50%, #92400E 100%)',
      doorGradient: 'linear-gradient(135deg, #78350F 0%, #B45309 40%, #78350F 100%)',
```

Replace with:
```js
      sealGold: 'linear-gradient(135deg, #FDE68A 0%, #D97706 50%, #92400E 100%)',
```

- [ ] **Step 2: Remove `doorGradient` from `colors.te`**

In `config.js`, find lines 59-60:
```js
      sealGold: 'linear-gradient(135deg, #F3E8C8 0%, #C27803 50%, #78350F 100%)',
      doorGradient: 'linear-gradient(135deg, #581C87 0%, #7F1D1D 50%, #450A0A 100%)',
```

Replace with:
```js
      sealGold: 'linear-gradient(135deg, #F3E8C8 0%, #C27803 50%, #78350F 100%)',
```

- [ ] **Step 3: Replace `doorSealText` with new door config entries**

In `config.js`, find lines 133-136:
```js
    doorSealText: {
      en: "✦ Tap to Open ✦",
      te: "✦ తెరవడానికి నొక్కండి ✦"
    },
```

Replace with:
```js
    doorLabels: { english: "ENGLISH", telugu: "తెలుగు" },
    doorHint: "✦ Tap to open",
    doorSubHint: "or choose a door",
```

- [ ] **Step 4: Verify config.js has no syntax errors**

Open `config.js` in a JS linter or run:
```bash
node -e "require('D:/Wedding-Invite/config.js')" 2>&1 || node --check "D:/Wedding-Invite/config.js" 2>&1
```

Note: Since config.js assigns to `window.CONFIG`, a bare `node --check` may not work. Instead, visually verify that the `ui` object still has correct comma placement and the `colors` objects still have `sealGold` but no `doorGradient`.

---

### Task 3: Update index.html — Door Labels, Monogram Hint, Remove Toggle

**Files:**
- Modify: `index.html:19-26` (remove toggle), `index.html:32-46` (door structure)

- [ ] **Step 1: Remove the language toggle markup**

Delete lines 19-26 of `index.html`:
```html
  <!-- Persistent Floating Language Toggle Pill -->
  <aside class="lang-toggle-container" aria-label="Language Selector">
    <button type="button" id="langToggleBtn" class="lang-toggle-btn" title="Toggle Language (English / తెలుగు)">
      <span id="langEnText" class="lang-option active">EN</span>
      <span class="lang-divider">|</span>
      <span id="langTeText" class="lang-option">తె</span>
    </button>
  </aside>
```

- [ ] **Step 2: Update door panel HTML with labels and new monogram structure**

Replace lines 31-46 (the entire `<!-- 1. DOOR INTRO SCREEN -->` section):
```html
  <!-- 1. DOOR INTRO SCREEN -->
  <section id="doorsWrap" class="doors-wrap" aria-label="Ceremonial Entrance Doors">
    <!-- Left Door Panel (English / Mandala) -->
    <div class="door-panel door-left" id="doorPanelLeft">
      <span id="doorLabelLeft" class="door-label door-label-en"></span>
    </div>
    <!-- Right Door Panel (Telugu / Kolam) -->
    <div class="door-panel door-right" id="doorPanelRight">
      <span id="doorLabelRight" class="door-label door-label-te"></span>
    </div>
    <!-- Centered Wax Seal Monogram Button -->
    <button type="button" id="doorSealBtn" class="door-seal-btn" aria-label="Tap to open wedding invitation">
      <span id="sealMonogram" class="seal-monogram">R &amp; V</span>
      <span id="sealTagline" class="seal-tagline"></span>
      <span id="sealSubHint" class="seal-sub-hint"></span>
    </button>
  </section>
```

Key changes:
- Added `id="doorPanelLeft"` and `id="doorPanelRight"` to door panels for JS click handlers
- Added `.door-label` `<span>` elements inside each panel (content set by JS from config)
- Removed `.door-inner-beading` divs (no longer needed with image-based doors)
- Replaced hardcoded `sealTagline` text with empty spans rendered by JS
- Added `sealSubHint` span for the "or choose a door" text

---

### Task 4: Update style.css — Image Doors, 3D Swing, Labels, Remove Toggle

**Files:**
- Modify: `style.css:29` (`:root` door-gradient), `style.css:59` (`body.lang-te` door-gradient), `style.css:109-159` (toggle styles), `style.css:164-305` (door styles)

- [ ] **Step 1: Remove `--color-door-gradient` from `:root`**

In `style.css`, find line 29:
```css
  --color-door-gradient: linear-gradient(135deg, #78350F 0%, #B45309 40%, #78350F 100%);
```

Delete this line entirely.

- [ ] **Step 2: Remove `--color-door-gradient` from `body.lang-te`**

In `style.css`, find line 59:
```css
  --color-door-gradient: linear-gradient(135deg, #581C87 0%, #7F1D1D 50%, #450A0A 100%);
```

Delete this line entirely.

- [ ] **Step 3: Delete all language toggle styles**

Delete lines 109-159 of `style.css` (the entire `/* PERSISTENT LANGUAGE TOGGLE PILL */` section through `.lang-toggle-btn .lang-divider`):
```css
/* --------------------------------------------------------------------------
   PERSISTENT LANGUAGE TOGGLE PILL
   -------------------------------------------------------------------------- */
.lang-toggle-container {
  position: fixed;
  top: 18px;
  right: 18px;
  z-index: 900;
}

.lang-toggle-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.88);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--color-border);
  padding: 6px 14px;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  font-family: var(--font-body);
  font-weight: 600;
  font-size: 0.88rem;
  color: var(--color-text);
  transition: all 0.25s ease;
  user-select: none;
}

.lang-toggle-btn:hover {
  transform: translateY(-1px);
  border-color: var(--color-primary);
  box-shadow: 0 6px 18px rgba(217, 119, 6, 0.2);
}

.lang-toggle-btn .lang-option {
  opacity: 0.5;
  transition: opacity 0.2s, color 0.2s;
}

.lang-toggle-btn .lang-option.active {
  opacity: 1;
  color: var(--color-primary);
  font-weight: 700;
}

.lang-toggle-btn .lang-divider {
  opacity: 0.3;
  color: var(--color-text-muted);
}
```

- [ ] **Step 4: Add perspective to `.doors-wrap`**

Replace the `.doors-wrap` rule (lines 164-175). Find:
```css
.doors-wrap {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 0.8s ease 0.4s;
}
```

Replace with:
```css
.doors-wrap {
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: opacity 0.8s ease 0.4s;
  perspective: 1600px;
}
```

- [ ] **Step 5: Add mobile perspective media query**

After the `.doors-hidden` rule (after line 180), add:
```css
@media (max-width: 600px) {
  .doors-wrap {
    perspective: 900px;
  }
}
```

- [ ] **Step 6: Replace `.door-panel` with image-based styling and 3D transform**

Replace the `.door-panel` rule (lines 182-192). Find:
```css
.door-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  background: var(--color-door-gradient);
  box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.65);
  transition: transform 1.1s cubic-bezier(0.77, 0, 0.175, 1);
  overflow: hidden;
}
```

Replace with:
```css
.door-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  height: 100%;
  background-color: #78350F;
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.65);
  transition: transform 1.1s cubic-bezier(0.77, 0, 0.175, 1);
  overflow: hidden;
}
```

- [ ] **Step 7: Set individual door background images and fallback colors**

After the `.door-right` rule (after line 201), add:
```css
.door-left {
  background-image: url('assets/images/shared/decorative/door-left-english.jpg');
  background-color: #78350F;
}

.door-right {
  background-image: url('assets/images/shared/decorative/door-right-telugu.jpg');
  background-color: #581C87;
}
```

Note: The `.door-left` and `.door-right` rules already exist at lines 194-201 with `left:0`/`right:0` and border. You need to **merge** the new background properties into the existing rules. The existing rules are:

```css
.door-left {
  left: 0;
  border-right: 2px solid rgba(253, 230, 138, 0.4);
}

.door-right {
  right: 0;
  border-left: 2px solid rgba(253, 230, 138, 0.4);
}
```

Change them to:
```css
.door-left {
  left: 0;
  border-right: 2px solid rgba(253, 230, 138, 0.4);
  background-image: url('assets/images/shared/decorative/door-left-english.jpg');
  background-color: #78350F;
  transform-origin: left center;
}

.door-right {
  right: 0;
  border-left: 2px solid rgba(253, 230, 138, 0.4);
  background-image: url('assets/images/shared/decorative/door-right-telugu.jpg');
  background-color: #581C87;
  transform-origin: right center;
}
```

Note the `transform-origin` values — these are critical for the 3D swing. The left panel hinges from its left edge, the right panel from its right edge. Without these, `rotateY` would pivot around the panel center, which looks wrong.

- [ ] **Step 8: Remove the `.door-panel::before` decorative gradient pseudo-element**

Delete lines 204-212:
```css
.door-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 50% 50%, rgba(253, 230, 138, 0.15) 0%, transparent 60%),
    repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 0, transparent 24px);
  pointer-events: none;
}
```

- [ ] **Step 9: Remove `.door-inner-beading` styles**

Delete lines 214-230:
```css
/* Decorative Vertical Beading on Inner Edges */
.door-inner-beading {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 12px;
  background-image: repeating-linear-gradient(to bottom, #FDE68A 0, #FDE68A 4px, transparent 4px, transparent 12px);
  opacity: 0.55;
}

.door-left .door-inner-beading {
  right: 8px;
}

.door-right .door-inner-beading {
  left: 8px;
}
```

- [ ] **Step 10: Replace translateX door-open animation with 3D rotateY swing**

Replace lines 232-238:
```css
.door-opened .door-left {
  transform: translateX(-100%);
}

.door-opened .door-right {
  transform: translateX(100%);
}
```

With:
```css
.door-opened .door-left {
  transform: rotateY(-100deg);
}

.door-opened .door-right {
  transform: rotateY(100deg);
}
```

- [ ] **Step 11: Update `.door-seal-btn` transform-origin for proper 3D context**

The seal button currently uses `transform: translate(-50%, -50%)` for centering. Add `transform-style: preserve-3d` to `.doors-wrap` (already done in Step 4 via perspective). The seal button needs its own transition update — replace lines 270-274:

```css
.door-opened .door-seal-btn {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.6);
  pointer-events: none;
}
```

With:
```css
.door-opened .door-seal-btn {
  opacity: 0;
  transform: translate(-50%, -50%) scale(0.6);
  pointer-events: none;
  transition: opacity 0.6s ease, transform 0.6s ease;
}
```

- [ ] **Step 12: Add `.door-label` pill styles**

After the `.seal-tagline` rule (after line 305), add:
```css
/* Door Language Labels */
.door-label {
  position: absolute;
  top: 33%;
  left: 50%;
  transform: translateX(-50%);
  z-index: 5;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  color: #FFFDF9;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  padding: 6px 18px;
  border-radius: 9999px;
  border: 1px solid rgba(253, 230, 138, 0.25);
  pointer-events: none;
  white-space: nowrap;
}

.door-label-en {
  font-family: 'Playfair Display', Georgia, serif;
}

.door-label-te {
  font-family: 'Noto Sans Telugu', 'Tillana', sans-serif;
  text-transform: none;
  letter-spacing: 0.5px;
}
```

- [ ] **Step 13: Add `.seal-sub-hint` style**

After the `.seal-tagline` rule, add:
```css
.seal-sub-hint {
  display: block;
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 400;
  color: #92400E;
  letter-spacing: 0.5px;
  margin-top: 2px;
  opacity: 0.7;
}
```

---

### Task 5: Update script.js — Click Handlers, Remove Toggle, Render Config Values

**Files:**
- Modify: `script.js:18-26` (el cache), `script.js:163-180` (renderText CSS vars + door section), `script.js:336-346` (initDoorIntro), `script.js:886-891` (toggle listener)

- [ ] **Step 1: Remove toggle DOM references from `el` cache**

In `script.js`, find lines 20-22:
```js
    langToggleBtn: document.getElementById('langToggleBtn'),
    langEnText: document.getElementById('langEnText'),
    langTeText: document.getElementById('langTeText'),
```

Delete these three lines.

- [ ] **Step 2: Add door panel and label DOM references to `el` cache**

After the `sealTagline` line (line 26), add:
```js
    sealSubHint: document.getElementById('sealSubHint'),
    doorPanelLeft: document.getElementById('doorPanelLeft'),
    doorPanelRight: document.getElementById('doorPanelRight'),
    doorLabelLeft: document.getElementById('doorLabelLeft'),
    doorLabelRight: document.getElementById('doorLabelRight'),
```

- [ ] **Step 3: Remove toggle pill rendering from `renderText()`**

In `renderText()`, find and delete lines 163-165:
```js
    // Update language toggle pill active indicators
    el.langEnText.classList.toggle('active', !isTe);
    el.langTeText.classList.toggle('active', isTe);
```

- [ ] **Step 4: Remove `doorGradient` CSS variable assignment from `renderText()`**

In `renderText()`, find and delete line 178:
```js
    document.documentElement.style.setProperty('--color-door-gradient', colors.doorGradient);
```

- [ ] **Step 5: Update door intro rendering in `renderText()`**

Find lines 182-184:
```js
    // Door Intro
    el.sealMonogram.textContent = cfg.couple.monogram;
    el.sealTagline.textContent = cfg.ui.doorSealText[currentLang];
```

Replace with:
```js
    // Door Intro
    el.sealMonogram.textContent = cfg.couple.monogram;
    el.sealTagline.textContent = cfg.ui.doorHint;
    el.sealSubHint.textContent = cfg.ui.doorSubHint;
    el.doorLabelLeft.textContent = cfg.ui.doorLabels.english;
    el.doorLabelRight.textContent = cfg.ui.doorLabels.telugu;
```

- [ ] **Step 6: Rewrite `initDoorIntro()` with three tap targets and 3D swing**

Replace lines 336-346:
```js
  function initDoorIntro() {
    el.body.classList.add('doors-locked');

    el.doorSealBtn.addEventListener('click', () => {
      el.doorsWrap.classList.add('door-opened');
      setTimeout(() => {
        el.doorsWrap.classList.add('doors-hidden');
        el.body.classList.remove('doors-locked');
      }, 1050);
    });
  }
```

With:
```js
  function initDoorIntro() {
    el.body.classList.add('doors-locked');

    function openDoors(lang) {
      currentLang = lang;
      el.doorsWrap.classList.add('door-opened');
      setTimeout(() => {
        el.doorsWrap.classList.add('doors-hidden');
        el.body.classList.remove('doors-locked');
        renderText();
        initPetals();
      }, 1100);
    }

    // Left panel → English
    el.doorPanelLeft.addEventListener('click', () => openDoors('en'));

    // Right panel → Telugu
    el.doorPanelRight.addEventListener('click', () => openDoors('te'));

    // Center monogram → English (fast path)
    el.doorSealBtn.addEventListener('click', () => openDoors('en'));
  }
```

Key changes:
- Extracted `openDoors(lang)` helper that sets `currentLang`, plays animation, then calls `renderText()` + `initPetals()` after 1100ms
- Left panel click → English, right panel → Telugu, monogram → English
- Both panels always swing open together (CSS handles this via `.door-opened` class)

- [ ] **Step 7: Remove toggle click listener from `initListeners()`**

In `initListeners()`, find and delete lines 886-891:
```js
    // Language Toggle
    el.langToggleBtn.addEventListener('click', () => {
      currentLang = currentLang === 'en' ? 'te' : 'en';
      renderText();
      initPetals(); // update petal colors for theme
    });
```

---

### Task 6: Verify — No Stale References

**Files:**
- Search: `script.js`, `style.css`, `index.html`

- [ ] **Step 1: Grep for stale `langToggle` references**

```bash
rg -n "langToggle\|langEnText\|langTeText\|lang-toggle" "D:\Wedding-Invite\script.js" "D:\Wedding-Invite\style.css" "D:\Wedding-Invite\index.html"
```

Expected: Zero matches.

- [ ] **Step 2: Grep for stale `doorGradient` references**

```bash
rg -n "doorGradient\|door-gradient\|color-door-gradient" "D:\Wedding-Invite\script.js" "D:\Wedding-Invite\style.css" "D:\Wedding-Invite\config.js"
```

Expected: Zero matches.

- [ ] **Step 3: Grep for stale `doorSealText` references**

```bash
rg -n "doorSealText" "D:\Wedding-Invite\script.js" "D:\Wedding-Invite\config.js"
```

Expected: Zero matches.

- [ ] **Step 4: Grep for stale `door-inner-beading` references**

```bash
rg -n "door-inner-beading" "D:\Wedding-Invite\style.css" "D:\Wedding-Invite\index.html"
```

Expected: Zero matches.

- [ ] **Step 5: Verify `sealGold` is still present and used**

```bash
rg -n "sealGold\|seal-gold" "D:\Wedding-Invite\config.js" "D:\Wedding-Invite\style.css" "D:\Wedding-Invite\script.js"
```

Expected: `config.js` has both `sealGold` entries, `style.css` has `--seal-gold` variable and `background: var(--seal-gold)`, `script.js` has the CSS property setter.

- [ ] **Step 6: Verify door image paths are correct**

```bash
rg -n "door-left-english\|door-right-telugu" "D:\Wedding-Invite\style.css"
```

Expected: Two matches pointing to `assets/images/shared/decorative/`.

---

### Task 7: Manual Smoke Test

- [ ] **Step 1: Open `index.html` in browser**

Verify:
- Door intro fills the full screen
- Left panel shows the mandala texture with "ENGLISH" pill label at ~33% from top
- Right panel shows the kolam texture with "తెలుగు" pill label at ~33% from top
- Center monogram shows "R & V" with "✦ Tap to open" and "or choose a door" beneath it
- No language toggle pill visible in top-right corner

- [ ] **Step 2: Test left panel tap**

Click anywhere on the left door panel (not the monogram). Verify:
- Both panels swing open in 3D (left rotates left, right rotates right)
- Monogram fades and scales down during swing
- After ~1.1s, door-intro disappears, main site is visible in English
- All text is in English (hero, timeline, RSVP, countdown labels)
- No toggle pill visible

- [ ] **Step 3: Refresh and test right panel tap**

Refresh the page. Click the right door panel. Verify:
- Both panels swing open together
- Site renders in Telugu (all section text, countdown labels, RSVP button)
- Telugu fonts are active (Tillana/Mallanna/Noto Sans Telugu)

- [ ] **Step 4: Refresh and test monogram tap**

Refresh. Click the center monogram button. Verify:
- Same swing animation
- Site renders in English (monogram defaults to English)

- [ ] **Step 5: Verify RSVP WhatsApp message uses chosen language**

After entering via Telugu door, scroll to RSVP section and click "Send RSVP via WhatsApp". Verify the WhatsApp pre-filled message is in Telugu (check the URL or opened WhatsApp text).

- [ ] **Step 6: Verify calendar event text uses chosen language**

After entering via Telugu, click "+ Add to Calendar". Verify the `.ics` file summary/description fields contain Telugu text.

- [ ] **Step 7: Test page refresh clears language choice**

Enter via Telugu door, then refresh the page. Verify the door-intro appears again (not skipped), and tapping the left door or monogram returns to English.

- [ ] **Step 8: Test narrow mobile viewport**

Resize browser to < 600px width. Verify:
- Door panels still fill the screen correctly
- Labels are readable
- No warping or overflow from perspective change
- Monogram is not clipped
