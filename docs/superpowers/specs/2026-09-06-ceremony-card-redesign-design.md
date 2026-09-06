# Text-Dominant Ceremony Cards with Peeking Photo Thumbnail

Date: 2026-09-06
Status: Approved
Scope: Replace the full-bleed poster-card design for the Festivities timeline (Haldi, Mehndi, Sangeet) with a text-dominant card + small tilted photo thumbnail. Wedding card stays text-only. Applies uniformly across both languages and both viewports.

## Background

The timeline ceremony cards currently render as a tall full-bleed illustration (768x1376 poster) with the ceremony details overlaid in a frosted-glass panel and a footer strip of action buttons. The reference video shows a different composition: a text-dominant card with a small tilted image thumbnail peeking from the trailing edge, like a physical photo tucked beside the text — not a background image, not full-bleed, not overlaid behind text.

The video was recorded on a phone, so this text-dominant + side-thumbnail composition IS the mobile-correct layout, not a desktop pattern that needs adapting down.

## Design

### Event data — new bilingual `revealLabel`

Add `revealLabel: { en, te }` to each revealable event in `config.js` (haldi, mehndi, sangeet). This is the single source for both the visible thumbnail overlay text AND the thumbnail button's `aria-label`. Existing `revealPrompt` is NOT used on the thumbnail (it is long instructional text for the modal); the short label is a new field.

- haldi: "Rub to Reveal" / "గీరి చూడండి"
- mehndi: "Trace the Heart" / "హృదయాన్ని గీయండి" (matches existing trace hint)
- sangeet: "Tap the Dhol" / "డోలు తట్టండి" (matches existing dhol prompt)

### Card structure (rebuilt in `renderTimelineCards()`)

Each `.timeline-entry` (relative positioned container) emits:

1. `.timeline-node` (unchanged)
2. `.event-card` — text-dominant, light background, small radius, right-side padding reserve (`--thumb-reserve`) so text never slides under the thumbnail:
   - `.event-date` (small uppercase, `✦` prefix)
   - `.event-title` (large heading, accent color)
   - `.event-subtitle` (muted)
   - `.event-details-list` (⏰/📍/👔 icon + label + value rows)
   - `.event-tagline` (italic serif quote)
   - `.event-actions` (add-to-calendar + reveal)
3. `.event-thumb` — ONLY for the 3 revealable events; a **sibling element** of `.event-card`, absolutely positioned, so no `overflow`/`border-radius` on the card can ever clip it (clipping-safety rule).

**Wedding** (revealType `none`): no thumb, no reveal button; text-only card with a lone centered add-to-calendar button — unchanged in spirit.

### The thumbnail

- A real `<button type="button">` (keyboard-accessible, focusable) containing:
  - the event's existing full illustration as an `<img>` forced into a small photo box via `object-fit: cover` (intentionally cropped corner/detail — a hint, not the full artwork)
  - a small bold uppercase label overlaid at its base: `ev.revealLabel[currentLang]`
  - subtle white photo border + drop shadow, reading as a physical print
- `--thumb-rotate` per card (~-5deg to +6deg, varied per event so they don't look mechanically identical)
- Sits at the card's trailing edge, `right: -12px` (peeks past the card edge), `top: calc(50% - 14px)` + `transform: translateY(-50%) rotate(var(--thumb-rotate))`, `z-index` above card
- Both `.event-thumb` and the reveal text-link carry `data-event-id` and call the existing `openRevealModal()` — the modal itself is unchanged.

### Vertical position (verified against reference frame)

From the actual video frame (both Haldi and Mehndi cards):

- NOT aligned with the header/date
- NOT aligned with/overlapping the button row
- Centered on the card's **text body** — midpoint between the ceremony name and the tagline, weighted toward the details/tagline region
- Bottom edge clears the add-to-calendar button

Concrete: thumb vertically centered against the middle of the card's text body, tuned in-browser against rendered card heights (card body length varies per event by tagline length). If a single static offset drifts visibly across cards, fall back to anchoring as a percentage of the text-body height (measured via JS or a per-card CSS custom property).

### Idle animation (moved from teaser tab)

`@keyframes thumbSway` oscillates `calc(var(--thumb-rotate) +/- 2deg)` over 3s with a soft `drop-shadow` pulse, `transform-origin` at the thumb's base. Disabled (`animation: none`) under `prefers-reduced-motion`.

### Layout / responsiveness

- Text takes the bulk of the card width on desktop and mobile.
- Mobile: thumb shrinks (~80-92px), `--thumb-reserve` adjusts proportionally; same side composition.
- Cards sit on the existing cream page background — the card paper is light (`--color-card-bg`), so timeline text classes get recolored from cream-on-image to the light-card palette (primary/accent/muted). The hero is unaffected: it uses `.event-poster`/`.event-overlay` base + `.hero-*` overrides, and its text classes are `.hero-*`-, so recoloring `.event-*` timeline text is safe.

### CSS cleanup

- Remove `.event-teaser-tab`, `.teaser-star`, `@keyframes teaserSway` (the old concept is replaced by the thumb).
- Timeline stops using `.event-poster`/`.event-poster-img`/`.event-overlay`; those base classes REMAIN for the hero, but `.event-card .event-poster-img` transition/hover-zoom rules and `.event-poster.img-missing .event-overlay` are removed (timeline-only).
- `.btn-reveal` restyled from filled gold pill to a ghost text-link ("Reveal ✦"), since a filled button no longer fits a light text card.
- Keep existing scroll-reveal fade + stagger + reduced-motion handling on `.event-card` intact.

## Files Changed

- `config.js` — add `revealLabel` for haldi/mehndi/sangeet
- `script.js` — rewrite `renderTimelineCards()` (text-dominant card + thumb; remove teaser tab & poster markup; bind thumb click to existing `openRevealModal`)
- `style.css` — restyle timeline card text/actions; add `.event-thumb` + `thumbSway`; remove teaser-tab rules; update reduced-motion block

## Verification

- `node --check script.js`
- Static HTML/CSS review (timeline cards, modal still opens from both thumb and text link)
- Manual browser: both languages, mobile + desktop, reduced-motion; thumb peeks (not clipped), sits on text-body in both Haldi and Mehndi, bottom clears button row, sway + shadow pulse animate, label readable
- Adjust thumb `top` offset in-browser if drift appears between cards (per-card percentage fallback if needed)