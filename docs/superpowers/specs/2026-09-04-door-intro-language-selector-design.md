# Door-Intro Language Selector — Design Spec

**Date:** 2026-09-04  
**Status:** Approved  
**Replaces:** Previous door-intro plan (single shared image split via background-position)

---

## Summary

Redesign the door-intro screen so the two door panels are visually distinct and double as the language selector. The left panel (mandala-carved) selects English; the right panel (kolam-carved) selects Telugu. A center monogram button defaults to English. There is no persistent language toggle and no session persistence — every page load shows the door-intro from scratch.

---

## Scope

### Files Modified

| File | Changes |
|------|---------|
| `index.html` | Move door images to shared path; add door-label elements; update monogram hint structure; remove `lang-toggle-container` aside |
| `style.css` | Replace CSS gradient doors with image-based doors + fallback color; add 3D perspective container; replace translateX slide with rotateY swing; add `.door-label` pill styles; remove all `.lang-toggle-*` styles |
| `script.js` | Add left/right panel click handlers; remove langToggleBtn listener; render config-driven door labels/hints; remove `doorGradient` CSS variable assignment |
| `config.js` | Add `doorLabels`, `doorHint`, `doorSubHint` under `ui`; remove `doorSealText`; remove `doorGradient` from both color sets; keep `sealGold` |
| File system | Create `assets/images/shared/decorative/`; move `door-left-english.jpg` and `door-right-telugu.jpg` into it |

### Files NOT Modified

- `sealGold` in `config.js` — kept. Used by `.door-seal-btn` background (style.css:250), which stays as the center tap target.

---

## Visual Setup

### Door Panels

- **Left panel:** `background-image: url('assets/images/shared/decorative/door-left-english.jpg')` (mandala-carved panel), `background-size: cover; background-position: center;`, fills full left half of screen.
- **Right panel:** `background-image: url('assets/images/shared/decorative/door-right-telugu.jpg')` (kolam-carved panel), same sizing, fills full right half.
- **Fallback:** Each panel has a solid `background-color` layer underneath the image. Left panel: `#78350F` (maroon-brown). Right panel: `#581C87` (deep purple). If the image fails to load, visitors see a colored panel instead of blank white.

### Language Labels

Positioned roughly a third of the way down from the top of each panel. Small pill/badge background behind the text for legibility against the busy carving texture.

- Left panel label: "ENGLISH" in the English display font stack
- Right panel label: "తెలుగు" (Telugu script) in the Telugu font stack

These are **live HTML text**, rendered by `script.js` from `config.js` values, not baked into images. `renderText()` is called during page init (before the door opens) so the labels appear on first paint — the door screen is not language-neutral by omission, it's language-neutral by design (labels name the languages, they don't translate).

### Monogram Seal Button

Centered on top of both panels (highest z-index). Shows couple's initials (`cfg.couple.monogram`). Two-line hint below: "✦ Tap to open" + "or choose a door" — language-neutral strings from config.

---

## Interaction — Three Tap Targets

All three lead to the **same swing-open animation**. The choice only affects which language the revealed site renders in.

| Target | Action | `currentLang` set to |
|--------|--------|---------------------|
| Left door panel (outside monogram hit area) | Set lang, swing open, render site | `'en'` |
| Right door panel | Set lang, swing open, render site | `'te'` |
| Center monogram button | Set lang, swing open, render site | `'en'` (fast path) |

**In all three cases, both door panels always swing open together.** The choice only affects `currentLang`, not which panel physically moves.

### Click Handler Logic

```
onDoorTap(chosenLang):
  currentLang = chosenLang
  doorsWrap.classList.add('door-opened')
  // monogram fades/scales partway through
  setTimeout(1100ms):
    doorsWrap.classList.add('doors-hidden')
    body.classList.remove('doors-locked')
    renderText()  // renders entire site in chosen language
```

The `currentLang` variable is module-level (`let currentLang = 'en'` at script.js:11). Setting it before `renderText()` ensures all downstream reads (RSVP WhatsApp messages, calendar event text, countdown labels, event modals, etc.) see the correct value. This is the same pattern the existing toggle uses.

---

## Animation — 3D Swing (Not Slide)

### Container

- `perspective: 1600px` on `.doors-wrap` (the wrapping container)
- On narrow mobile viewports: reduce to ~900px via media query, tuned to avoid warping

### Door Panels

- **Left panel:** `transform-origin: left center;` → `rotateY(-100deg)` on open
- **Right panel:** `transform-origin: right center;` → `rotateY(100deg)` on open
- Duration: ~1.1s, `cubic-bezier(0.77, 0, 0.175, 1)` (ease-in-out)

### Monogram

- Fades and scales down partway through the swing rather than vanishing instantly
- CSS transition on opacity + transform triggered by `.door-opened`

### Shadow/Light-Bloom

- Subtle shadow transition as the gap widens, revealing the hero section beneath
- Achieved via a pseudo-element or box-shadow on the panels

### Completion

After animation completes (1100ms timeout):
1. Add `.doors-hidden` class (opacity → 0, pointer-events none)
2. Remove `doors-locked` from body (re-enables page scroll)
3. Door-intro container remains in DOM but is invisible and non-interactive

---

## Config Changes

### Added to `config.js` `ui` section:

```js
doorLabels: { english: "ENGLISH", telugu: "తెలుగు" },
doorHint: "✦ Tap to open",
doorSubHint: "or choose a door"
```

### Removed from `config.js`:

- `ui.doorSealText` (bilingual `{en, te}` pair — replaced by language-neutral `doorHint`/`doorSubHint`)
- `colors.en.doorGradient` (replaced by image + fallback color)
- `colors.te.doorGradient` (same)

### Kept in `config.js`:

- `colors.en.sealGold` and `colors.te.sealGold` — still used by `.door-seal-btn` background

---

## Removals

### Language Toggle Pill

Remove entirely:
- `index.html`: the `<aside class="lang-toggle-container">` block (lines 19-26)
- `style.css`: all `.lang-toggle-container`, `.lang-toggle-btn`, `.lang-option`, `.lang-divider` rules (lines 109-159)
- `script.js`: the `langToggleBtn` click listener (lines 886-891) and any references to `langToggleBtn`, `langEnText`, `langTeText` DOM elements

### No Persistence

Do NOT add localStorage, sessionStorage, or cookie-based language persistence. Every fresh page load or refresh must show the door-intro screen again.

---

## Scoping & Clipping

- `overflow: hidden` must be scoped **only** to the door-intro's own outer wrapper (`.doors-wrap`), not any ancestor that could clip the monogram's glow or the door-panel text labels.
- This is the same clipping-bug category fixed elsewhere on the site — verify it doesn't reappear here.

---

## Downstream Language Threading

`currentLang` is a module-level `let` variable. After the door sets it and calls `renderText()`, all downstream consumers read the correct language. Key consumers to verify:

| Consumer | Location | What it uses |
|----------|----------|-------------|
| RSVP WhatsApp message | script.js:454 | `cfg.ui.rsvpWhatsAppMessage[currentLang]` |
| Calendar event text | script.js:314 | `cfg.ui.addToCalendar[currentLang]` |
| Countdown labels | script.js:222-227 | `cfg.countdown.labels.*[currentLang]` |
| Event modal content | script.js:556-586 | `ev.name[currentLang]`, `ev.revealSecret[currentLang]` |
| Timeline cards | script.js:263-284 | `ev.name[currentLang]`, `ev.dressCode[currentLang]` |
| Copied hashtag toast | script.js:485 | `cfg.ui.copiedHashtag[currentLang]` |

All of these already work correctly with the existing toggle pattern (set `currentLang` → call `renderText()`). The door-intro uses the same pattern. **Verification task during implementation:** spot-check that RSVP submission, calendar generation, and event reveal all render in the chosen language.

---

## Mobile vs Desktop

Same technique on both — pure CSS `background-image` + 3D transform. No viewport-dependent branching aside from the `perspective` value media query (1600px desktop → ~900px narrow mobile).

---

## Non-Goals

- Animated/revealing text on the door panels (not in scope)
- Door panel hover effects (not in scope — touch-first interface)
- Sound effects on door open (not in scope)
