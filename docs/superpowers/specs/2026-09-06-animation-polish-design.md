# Animation Polish & Smoothness Pass — Design

Date: 2026-09-06
Status: Approved (2026-09-06)

## Purpose

A uniform motion-polish pass across both language modes (en/te) and both
viewports (mobile/desktop). No structure, text, or image content changes —
only how things move and transition. Shared implementations live once in
`style.css` / `script.js` and apply everywhere.

## Reference implementation

The user supplied a 9-item enhancement prompt. This document maps each item
to concrete changes.

## Design

### 1. Scroll-triggered section reveals (IntersectionObserver)

- Add a `reveal-section` class to six major sections in `index.html`:
  formal invite, festivities timeline, pick-your-side, countdown, RSVP,
  closing. Hero is deliberately excluded (visible immediately after doors).
- One shared `IntersectionObserver` in `script.js` observes all
  `.reveal-section` elements; first intersect → double-rAF → add `.is-visible`
  (same paint technique the ceremony cards already use).
- CSS: `.reveal-section { opacity: 0; translate: 0 20px; }` →
  `.is-visible { opacity: 1; translate: 0 0; }`, ~0.6s
  `cubic-bezier(0.22, 1, 0.36, 1)`, gated by `@supports (translate: 0 20px)`
  for safe fallback (mirrors the existing `.event-card` pattern).
- Timeline ceremony cards keep their per-card observer but gain a staggered
  entrance: index `i` gets `--reveal-delay: i * 100ms`, applied only to the
  opacity/translate transitions so hover motion is never delayed.

### 2. Reveal modal — smoother open/close

- Open (already present, retuned): backdrop fades in ~0.25s entrance curve;
  `.modal-box` scales `0.92 → 1.0` with `cubic-bezier(0.22, 1, 0.36, 1)`.
- Close: new `.modal-closing` state in `script.js`. `closeRevealModal()` adds
  the class (exit curve `cubic-bezier(0.64, 0, 0.78, 0)`, scale → 0.92,
  backdrop fades), then ~280ms later removes `active` + `closing`, restores
  background inert and trigger focus. Replaces the current instant unmount.
- Revealed artwork: replace the `contentPop` pop-in with a gentle
  preload-then-fade (opacity 0 → 1, ~0.5s) once the cover canvas clears.

### 3. Sparkle burst helper (shared completion flourish)

- One `sparkleBurst(anchorEl)` helper in `script.js`: appends a
  `.sparkle-burst` layer at the anchor's center, spawns ~14 small
  star/petal particles animating outward + fading (pure CSS keyframes, no
  assets), removes itself after the animation. Returns early when
  `prefers-reduced-motion: reduce`.
- Used at completion by all three mini-games (scratch, trace, dhol).

### 4. Scratch card completion

- On threshold reached: canvas fades out (~0.6s, existing), revealed content
  fades in, `sparkleBurst()` fires centered where the canvas was, coincident
  with the reveal. Erase motion itself is unchanged.

### 5. Trace-the-heart completion

- Same `sparkleBurst()` on completion.
- New brief `.heart-glow` pulse on the canvas (box-shadow/outline
  glow on the heart outline) right before it fades away, so completion feels
  rewarding rather than abrupt.

### 6. Tap-the-dhol — tactile feedback per tap

- Drum bounce easing switched to spring `cubic-bezier(0.34, 1.56, 0.64, 1)`.
- Per-tap ripple: a `.dhol-tap-ripple` ring is appended inside the drum at
  the tap coordinates (keyboard falls back to center), expands + fades,
  then is removed.
- Pitch variation in `playDholBeat()`: bass oscillator ±~5Hz and treble
  ±~12Hz random jitter around their base frequencies each tap.
- Completion: `sparkleBurst()`.

### 7. Peeking teaser tab (structure add, approved)

- The spec item 6 assumed a rotated teaser sliver that does not exist. With
  user approval, add a small rotated `✦ Reveal` corner tab to the poster area
  of the three revealable cards (Haldi / Mehndi / Sangeet only).
- Positioned as a **sibling** of `.event-card` inside the relative
  `.timeline-entry` (absolute, top-right, z-index above the card) so the
  poster's `overflow: hidden` and the card's `overflow: hidden` cannot clip
  it — the same class of clipping bug as the modal close button / corner
  ornaments. `pointer-events: none`, `aria-hidden`.
- Idle animation: gentle sway (CSS `rotate` ±2° around its base) on a ~3s
  loop plus a soft drop-shadow pulse. Reduced-motion disables the sway.

### 8. Button micro-interactions

- `:active { transform: scale(0.96) }` (~0.1s press) + release fallback on:
  `.btn-sm` (Add to Calendar, Reveal), `.btn-rsvp-primary` (WhatsApp),
  `.btn-rsvp-secondary` (Directions/Add), `.side-card`, `.replay-entrance-btn`,
  `.door-seal-btn`.
- Desktop hover lift (`translateY(-2px)` + shadow increase) kept for the
  existing button/group styles.

### 9. Standardized easing

- `:root` vars: `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` (entrances),
  `--ease-in: cubic-bezier(0.64, 0, 0.78, 0)` (exits).
- Replace remaining `ease`/overbounce curves on modal, message boxes, and
  card motion. The dhol drum keeps its spring feel
  (`cubic-bezier(0.34, 1.56, 0.64, 1)`).

### 10. Reduced motion

- Extend the existing `@media (prefers-reduced-motion: reduce)` block:
  force `.reveal-section`, `.event-card`, and delays to fully-visible /
  zero-delay; disable sparkle bursts, teaser sway, and heart glow. JS bursts
  are also gated via `matchMedia`.

## Files touched

- `style.css` — all shared styles above.
- `script.js` — section observer + stagger, modal closing state, sparkle
  burst helper, dhol ripple/pitch, teaser tab markup in
  `renderTimelineCards()`.
- `index.html` — `reveal-section` class additions only.

## Verification

No automated test framework exists (static site; `npm run dev` is
`live-server`). Verification is:
1. `node --check script.js`.
2. Static sanity pass on CSS/HTML changes.
3. `npm run dev` + manual browser pass (both languages, mobile + desktop,
   reduced-motion via devtools).