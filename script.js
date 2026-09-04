/**
 * BILINGUAL ANIMATED INDIAN WEDDING INVITATION — JAVASCRIPT
 * Drives all interactions, Web Audio synth, canvas mini-games,
 * live flip countdown, and instant language switching.
 */

(function () {
  'use strict';

  // State
  let currentLang = 'en';
  let selectedTeam = 'bride'; // 'bride' | 'groom'
  let countdownTimer = null;
  let prevCountdownValues = { days: -1, hours: -1, mins: -1, secs: -1 };
  let activeAudioCtx = null;
  let cardRevealObserver = null; // scroll-reveal for ceremony poster cards
  let lastFocusedElement = null; // trigger element, restored when the modal closes
  let replayingDoors = false;    // guards the door ceremony during a replay

  // Cache DOM elements
  const el = {
    body: document.body,
    doorsWrap: document.getElementById('doorsWrap'),
    doorSealBtn: document.getElementById('doorSealBtn'),
    sealMonogram: document.getElementById('sealMonogram'),
    sealTagline: document.getElementById('sealTagline'),
    sealSubHint: document.getElementById('sealSubHint'),
    doorPanelLeft: document.getElementById('doorPanelLeft'),
    doorPanelRight: document.getElementById('doorPanelRight'),
    doorLabelLeft: document.getElementById('doorLabelLeft'),
    doorLabelRight: document.getElementById('doorLabelRight'),
    petalsContainer: document.getElementById('petalsContainer'),
    bgWatermark: document.getElementById('bgWatermark'),

    // Hero
    heroPortraitImg: document.getElementById('heroPortraitImg'),
    heroOpeningLine: document.getElementById('heroOpeningLine'),
    coupleNameGroom: document.getElementById('coupleNameGroom'),
    coupleNameBride: document.getElementById('coupleNameBride'),
    heroSubtitle: document.getElementById('heroSubtitle'),

    // Formal Invite
    formalEyebrow: document.getElementById('formalEyebrow'),
    groomFullName: document.getElementById('groomFullName'),
    groomParentsText: document.getElementById('groomParentsText'),
    brideFullName: document.getElementById('brideFullName'),
    brideParentsText: document.getElementById('brideParentsText'),
    dateTileLabel: document.getElementById('dateTileLabel'),
    dateTileVal: document.getElementById('dateTileVal'),
    venueTileLabel: document.getElementById('venueTileLabel'),
    venueTileVal: document.getElementById('venueTileVal'),
    weddingHashtag: document.getElementById('weddingHashtag'),
    copyToast: document.getElementById('copyToast'),

    // Timeline
    timelineTitle: document.getElementById('timelineTitle'),
    timelineSubtitle: document.getElementById('timelineSubtitle'),
    timelineEntries: document.getElementById('timelineEntries'),

    // Side Picker
    sidePickerTitle: document.getElementById('sidePickerTitle'),
    sidePickerSubtitle: document.getElementById('sidePickerSubtitle'),
    cardTeamBride: document.getElementById('cardTeamBride'),
    cardTeamGroom: document.getElementById('cardTeamGroom'),
    teamBrideTitle: document.getElementById('teamBrideTitle'),
    teamBrideTagline: document.getElementById('teamBrideTagline'),
    teamGroomTitle: document.getElementById('teamGroomTitle'),
    teamGroomTagline: document.getElementById('teamGroomTagline'),

    // Countdown
    muhurthamExactLabel: document.getElementById('muhurthamExactLabel'),
    countdownTitle: document.getElementById('countdownTitle'),
    countdownStatusLine: document.getElementById('countdownStatusLine'),
    tileDays: document.getElementById('tileDays'),
    tileHours: document.getElementById('tileHours'),
    tileMins: document.getElementById('tileMins'),
    tileSecs: document.getElementById('tileSecs'),
    labelDays: document.getElementById('labelDays'),
    labelHours: document.getElementById('labelHours'),
    labelMins: document.getElementById('labelMins'),
    labelSecs: document.getElementById('labelSecs'),
    blockDays: document.getElementById('blockDays'),
    blockHours: document.getElementById('blockHours'),
    blockMins: document.getElementById('blockMins'),
    blockSecs: document.getElementById('blockSecs'),

    // RSVP Actions
    rsvpTitle: document.getElementById('rsvpTitle'),
    rsvpSubtitle: document.getElementById('rsvpSubtitle'),
    rsvpSubmitBtn: document.getElementById('rsvpSubmitBtn'),
    addFullWeddingBtn: document.getElementById('addFullWeddingBtn'),
    directionsBtn: document.getElementById('directionsBtn'),
    callFamilyLabel: document.getElementById('callFamilyLabel'),
    familyPhoneLink: document.getElementById('familyPhoneLink'),

    // Closing
    closingSymbol: document.getElementById('closingSymbol'),
    closingBlessing: document.getElementById('closingBlessing'),
    closingCoupleNames: document.getElementById('closingCoupleNames'),
    closingNote: document.getElementById('closingNote'),

    // Main scrollable content (background page behind the reveal modal)
    mainContent: document.querySelector('.main-content'),

    // Replay door entrance control
    replayBtn: document.getElementById('replayBtn'),
    replayLabel: document.getElementById('replayLabel'),

    // Reveal Modal
    revealModal: document.getElementById('revealModal'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    modalEventTitle: document.getElementById('modalEventTitle'),
    modalPromptText: document.getElementById('modalPromptText'),
    modalContentArea: document.getElementById('modalContentArea')
  };

  // --------------------------------------------------------------------------
  // IMAGE PRELOAD HELPER
  // --------------------------------------------------------------------------

  // Warm the current language's hero + ceremony artwork in the background so
  // the lazy full-bleed posters are cached by the time the visitor scrolls.
  function preloadLanguageImages() {
    const cfg = window.CONFIG;
    const imgs = cfg.images;
    const srcs = [];
    const push = (src) => { if (src && srcs.indexOf(src) === -1) srcs.push(src); };
    push(imgs.hero[currentLang]);
    (cfg.events || []).forEach((ev) => {
      const key = ev.imageKey || ev.id;
      const src = (imgs[key] && imgs[key][currentLang]) ||
        `assets/images/${currentLang === 'te' ? 'telugu' : 'english'}/${key}.jpg`;
      push(src);
    });

    document.querySelectorAll('link[data-rv-preload]').forEach((link) => link.remove());
    srcs.forEach((src, idx) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchPriority = idx === 0 ? 'high' : 'low';
      link.setAttribute('data-rv-preload', '1');
      document.head.appendChild(link);
    });
  }

  // --------------------------------------------------------------------------
  // SVG MOTIFS & WATERMARK GENERATORS
  // --------------------------------------------------------------------------
  function getMandalaSvg(color = '#D97706') {
    return `<svg viewBox="0 0 100 100" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round">
      <circle cx="50" cy="50" r="46" opacity="0.3"/>
      <circle cx="50" cy="50" r="34" opacity="0.5"/>
      <circle cx="50" cy="50" r="18" stroke-width="2"/>
      <circle cx="50" cy="50" r="6" fill="${color}"/>
      <path d="M50 4 L50 20 M50 80 L50 96 M4 50 L20 50 M80 50 L96 50"/>
      <path d="M17.5 17.5 L28.8 28.8 M71.2 71.2 L82.5 82.5 M17.5 82.5 L28.8 71.2 M71.2 28.8 L82.5 17.5" opacity="0.7"/>
      <path d="M50 20 Q56 34 50 48 Q44 34 50 20 Z" fill="${color}" fill-opacity="0.15"/>
      <path d="M50 52 Q56 66 50 80 Q44 66 50 52 Z" fill="${color}" fill-opacity="0.15"/>
      <path d="M20 50 Q34 56 48 50 Q34 44 20 50 Z" fill="${color}" fill-opacity="0.15"/>
      <path d="M52 50 Q66 56 80 50 Q66 44 52 50 Z" fill="${color}" fill-opacity="0.15"/>
    </svg>`;
  }

  function getKolamSvg(color = '#C27803') {
    return `<svg viewBox="0 0 100 100" fill="none" stroke="${color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
      <!-- Kolam Dots Matrix -->
      <circle cx="50" cy="50" r="2.2" fill="${color}"/>
      <circle cx="50" cy="30" r="2.2" fill="${color}"/>
      <circle cx="50" cy="70" r="2.2" fill="${color}"/>
      <circle cx="30" cy="50" r="2.2" fill="${color}"/>
      <circle cx="70" cy="50" r="2.2" fill="${color}"/>
      <circle cx="35" cy="35" r="2.2" fill="${color}"/>
      <circle cx="65" cy="35" r="2.2" fill="${color}"/>
      <circle cx="35" cy="65" r="2.2" fill="${color}"/>
      <circle cx="65" cy="65" r="2.2" fill="${color}"/>
      <!-- Interlaced Kolam Loops -->
      <path d="M50 16 C30 16, 16 30, 16 50 C16 70, 30 84, 50 84 C70 84, 84 70, 84 50 C84 30, 70 16, 50 16 Z" stroke-dasharray="2 3" opacity="0.4"/>
      <path d="M50 20 Q65 35 50 50 Q35 35 50 20 Z" stroke-width="2"/>
      <path d="M50 50 Q65 65 50 80 Q35 65 50 50 Z" stroke-width="2"/>
      <path d="M20 50 Q35 65 50 50 Q35 35 20 50 Z" stroke-width="2"/>
      <path d="M50 50 Q65 65 80 50 Q65 35 50 50 Z" stroke-width="2"/>
      <path d="M35 35 Q50 50 65 35 Q50 20 35 35 Z" opacity="0.6"/>
      <path d="M35 65 Q50 50 65 65 Q50 80 35 65 Z" opacity="0.6"/>
    </svg>`;
  }

  function updateWatermark() {
    const isTe = currentLang === 'te';
    const svgStr = isTe ? getKolamSvg('#854D0E') : getMandalaSvg('#D97706');
    const encoded = encodeURIComponent(svgStr);
    el.bgWatermark.style.backgroundImage = `url("data:image/svg+xml,${encoded}")`;
  }

  // --------------------------------------------------------------------------
  // CENTRALIZED TEXT & UI RENDERING
  // --------------------------------------------------------------------------
  function renderText() {
    const cfg = window.CONFIG;
    const isTe = currentLang === 'te';

    // Body class for Telugu font & styles; keep <html lang> in sync for AT
    el.body.classList.toggle('lang-te', isTe);
    document.documentElement.lang = currentLang;

    // CSS variables update
    const colors = cfg.colors[currentLang];
    document.documentElement.style.setProperty('--color-primary', colors.primary);
    document.documentElement.style.setProperty('--color-accent', colors.accent);
    document.documentElement.style.setProperty('--color-bg', colors.bg);
    document.documentElement.style.setProperty('--color-card-bg', colors.cardBg);
    document.documentElement.style.setProperty('--color-text', colors.text);
    document.documentElement.style.setProperty('--color-text-muted', colors.textMuted);
    document.documentElement.style.setProperty('--color-gold-light', colors.goldLight);
    document.documentElement.style.setProperty('--color-gold-dark', colors.goldDark);
    document.documentElement.style.setProperty('--color-border', colors.border);
    document.documentElement.style.setProperty('--color-countdown-bg', colors.countdownBg);
    document.documentElement.style.setProperty('--seal-gold', colors.sealGold);

    // Door Intro
    el.sealMonogram.textContent = cfg.couple.monogram;
    el.sealTagline.textContent = cfg.ui.doorHint;
    el.sealSubHint.textContent = cfg.ui.doorSubHint;
    el.doorLabelLeft.textContent = cfg.ui.doorLabels.english;
    el.doorLabelRight.textContent = cfg.ui.doorLabels.telugu;

    // Hero Section
    el.heroOpeningLine.textContent = cfg.ui.openingLine[currentLang];
    el.coupleNameGroom.textContent = isTe ? (cfg.couple.groomTelugu || cfg.couple.groom) : cfg.couple.groom;
    el.coupleNameBride.textContent = isTe ? (cfg.couple.brideTelugu || cfg.couple.bride) : cfg.couple.bride;
    el.heroSubtitle.textContent = cfg.ui.heroSubtitle[currentLang];
    
    // Switch images cleanly without reloading page (width/height reserve the
    // poster's intrinsic space so the full-bleed art never shifts the layout)
    const heroImgSrc = cfg.images.hero[currentLang] || cfg.images.hero.en;
    el.heroPortraitImg.src = heroImgSrc;
    const heroSize = (cfg.images.size && cfg.images.size[currentLang]) || null;
    if (heroSize) {
      el.heroPortraitImg.width = heroSize[0];
      el.heroPortraitImg.height = heroSize[1];
    }

    // Formal Invite
    el.formalEyebrow.textContent = cfg.ui.formalEyebrow[currentLang];
    el.groomFullName.textContent = isTe ? (cfg.couple.groomTelugu || cfg.couple.groom) : cfg.couple.groom;
    el.groomParentsText.textContent = cfg.couple.groomParents[currentLang];
    el.brideFullName.textContent = isTe ? (cfg.couple.brideTelugu || cfg.couple.bride) : cfg.couple.bride;
    el.brideParentsText.textContent = cfg.couple.brideParents[currentLang];
    el.dateTileLabel.textContent = cfg.ui.dateLabel[currentLang];
    el.dateTileVal.textContent = cfg.ui.dateValue[currentLang];
    el.venueTileLabel.textContent = cfg.ui.venueLabel[currentLang];
    el.venueTileVal.textContent = cfg.ui.venueValue[currentLang];
    el.weddingHashtag.textContent = cfg.couple.hashtag;

    // Festivities Timeline
    el.timelineTitle.textContent = cfg.ui.timelineTitle[currentLang];
    el.timelineSubtitle.textContent = cfg.ui.timelineSubtitle[currentLang];
    renderTimelineCards();

    // Pick Your Side
    el.sidePickerTitle.textContent = cfg.ui.sidePickerTitle[currentLang];
    el.sidePickerSubtitle.textContent = cfg.ui.sidePickerSubtitle[currentLang];
    el.teamBrideTitle.textContent = cfg.ui.teamBride[currentLang];
    el.teamBrideTagline.textContent = cfg.ui.teamBrideTagline[currentLang];
    el.teamGroomTitle.textContent = cfg.ui.teamGroom[currentLang];
    el.teamGroomTagline.textContent = cfg.ui.teamGroomTagline[currentLang];

    // Live Countdown
    el.muhurthamExactLabel.textContent = cfg.countdown.muhurthamLabel[currentLang];
    el.countdownTitle.textContent = cfg.countdown.heading[currentLang];
    el.labelDays.textContent = cfg.countdown.labels.days[currentLang];
    el.labelHours.textContent = cfg.countdown.labels.hours[currentLang];
    el.labelMins.textContent = cfg.countdown.labels.mins[currentLang];
    el.labelSecs.textContent = cfg.countdown.labels.secs[currentLang];

    // RSVP Actions
    el.rsvpTitle.textContent = cfg.ui.rsvpTitle[currentLang];
    el.rsvpSubtitle.textContent = cfg.ui.rsvpSubtitle[currentLang];
    el.rsvpSubmitBtn.innerHTML = `<span class="btn-rsvp-icon" aria-hidden="true">💬</span> <span>${cfg.ui.rsvpSubmitBtn[currentLang]}</span>`;
    el.addFullWeddingBtn.innerHTML = `<span class="btn-rsvp-icon" aria-hidden="true">📅</span> <span>${cfg.ui.addFullWeddingBtn[currentLang]}</span>`;
    el.directionsBtn.innerHTML = `<span class="btn-rsvp-icon" aria-hidden="true">📍</span> <span>${cfg.ui.directionsBtn[currentLang]}</span>`;
    el.callFamilyLabel.textContent = cfg.ui.callFamilyLabel[currentLang];
    el.familyPhoneLink.textContent = cfg.couple.familyPhoneFormatted;
    el.familyPhoneLink.href = `tel:${cfg.couple.familyPhone}`;

    // Closing Screen
    el.closingSymbol.textContent = cfg.ui.closingSymbol[currentLang];
    el.closingBlessing.textContent = cfg.ui.closingBlessing[currentLang];
    el.closingCoupleNames.textContent = isTe ? `${cfg.couple.groomTelugu} & ${cfg.couple.brideTelugu}` : `${cfg.couple.groom} & ${cfg.couple.bride}`;
    el.closingNote.textContent = cfg.ui.closingNote[currentLang];
    el.modalCloseBtn.textContent = cfg.ui.modalCloseBtn[currentLang];

    // Replay entrance control
    el.replayLabel.textContent = cfg.ui.replayEntrance[currentLang];
    el.replayBtn.setAttribute('aria-label', cfg.ui.replayEntrance[currentLang]);

    // Watermark update + warm the active language's artwork in the background
    updateWatermark();
    preloadLanguageImages();
  }

  // --------------------------------------------------------------------------
  // FESTIVITIES TIMELINE CARDS BUILDER
  // --------------------------------------------------------------------------
  function renderTimelineCards() {
    const cfg = window.CONFIG;
    const isTe = currentLang === 'te';
    el.timelineEntries.innerHTML = '';

    cfg.events.forEach((ev) => {
      const entryDiv = document.createElement('div');
      entryDiv.className = 'timeline-entry';
      entryDiv.id = `event-${ev.id}`;

      const eventName = ev.name[currentLang];
      const eventSubtitle = ev.subtitle[currentLang];
      const eventDate = isTe && ev.dateTelugu ? ev.dateTelugu : ev.date;
      const eventTime = isTe && ev.timeTelugu ? ev.timeTelugu : ev.time;
      const eventVenue = isTe && ev.venueTelugu ? ev.venueTelugu : ev.venue;
      const eventDressCode = ev.dressCode[currentLang];
      const eventTagline = ev.tagline ? ev.tagline[currentLang] : '';

      // Image path
      const imgKey = ev.imageKey || ev.id;
      const eventImgSrc = (cfg.images[imgKey] && cfg.images[imgKey][currentLang]) || `assets/images/${isTe ? 'telugu' : 'english'}/${imgKey}.jpg`;

      // Calendar button link builder
      const calTitle = encodeURIComponent(`${cfg.couple.groom} & ${cfg.couple.bride} - ${eventName}`);
      const calDetails = encodeURIComponent(`${eventSubtitle}\nDress Code: ${eventDressCode}\n${eventTagline}`);
      const calLocation = encodeURIComponent(eventVenue);
      const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=${ev.calendarStart}/${ev.calendarEnd}&details=${calDetails}&location=${calLocation}`;

      // Reserve the poster's intrinsic space (natural artwork dimensions per
      // language) so the tall lazy-loaded images never shift the layout while
      // loading. alt stays empty: the overlaid text conveys the content.
      const imgSize = (cfg.images.size && cfg.images.size[currentLang]) || null;
      const imgSizeAttrs = imgSize ? ` width="${imgSize[0]}" height="${imgSize[1]}"` : '';

      const hasReveal = ev.revealType && ev.revealType !== 'none';
      const revealBtnHtml = hasReveal
        ? `<button type="button" class="btn-sm btn-reveal" data-event-id="${ev.id}">
             ${cfg.ui.revealButton[currentLang]}
           </button>`
        : '';

      entryDiv.innerHTML = `
        <div class="timeline-node"></div>
        <div class="event-card">
          <div class="event-poster">
            <img class="event-poster-img" src="${eventImgSrc}" alt="" loading="lazy"${imgSizeAttrs} onerror="this.closest('.event-poster').classList.add('img-missing'); this.remove();">
            <div class="event-overlay">
              <div class="event-date"><span class="event-date-star" aria-hidden="true">✦</span> ${eventDate}</div>
              <h3 class="event-title">${eventName}</h3>
              <p class="event-subtitle">${eventSubtitle}</p>
              <div class="event-details-list">
                <div class="event-detail-item">
                  <span class="detail-ico" aria-hidden="true">⏰</span>
                  <span class="detail-label">${isTe ? 'సమయం:' : 'Time:'}</span>
                  <span class="detail-val">${eventTime}</span>
                </div>
                <div class="event-detail-item">
                  <span class="detail-ico" aria-hidden="true">📍</span>
                  <span class="detail-label">${isTe ? 'వేదిక:' : 'Venue:'}</span>
                  <span class="detail-val">${eventVenue}</span>
                </div>
                <div class="event-detail-item">
                  <span class="detail-ico" aria-hidden="true">👔</span>
                  <span class="detail-label">${isTe ? 'దుస్తులు:' : 'Attire:'}</span>
                  <span class="detail-val">${eventDressCode}</span>
                </div>
              </div>
              ${eventTagline ? `<div class="event-tagline">${eventTagline}</div>` : ''}
            </div>
          </div>
          <div class="event-actions">
            <a href="${calUrl}" target="_blank" rel="noopener noreferrer" class="btn-sm btn-calendar">
              ${cfg.ui.addToCalendar[currentLang]}
            </a>
            ${revealBtnHtml}
          </div>
        </div>
      `;

      el.timelineEntries.appendChild(entryDiv);
    });

    // Attach click listeners to Reveal buttons
    el.timelineEntries.querySelectorAll('.btn-reveal').forEach((btn) => {
      btn.addEventListener('click', () => {
        const evId = btn.getAttribute('data-event-id');
        openRevealModal(evId);
      });
    });

    // Scroll-reveal fade for the poster cards (re-attached after every render
    // so a language change rebuilds the cards with the animation intact)
    const cards = el.timelineEntries.querySelectorAll('.event-card');
    if (!('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-visible'));
      return;
    }
    if (!cardRevealObserver) {
      cardRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const card = entry.target;
          // Double rAF: let the hidden state paint once so the fade always animates
          requestAnimationFrame(() => {
            requestAnimationFrame(() => card.classList.add('is-visible'));
          });
          cardRevealObserver.unobserve(card);
        });
      }, { threshold: 0.05, rootMargin: '0px 0px -6% 0px' });
    }
    cards.forEach((card) => cardRevealObserver.observe(card));
  }

  // --------------------------------------------------------------------------
  // DOOR INTRO BEHAVIOR
  // --------------------------------------------------------------------------
  function initDoorIntro() {
    el.body.classList.add('doors-locked');

    // Preload door images, then fade panels in. The page always starts at the
    // closed doors — every load is a fresh ceremonial entrance.
    const doorImages = [
      { el: el.doorPanelLeft, src: 'assets/images/shared/decorative/door-left-english.jpg' },
      { el: el.doorPanelRight, src: 'assets/images/shared/decorative/door-right-telugu.jpg' }
    ];
    let loadedCount = 0;
    const totalImages = doorImages.length;

    function onImageReady() {
      loadedCount++;
      if (loadedCount >= totalImages) {
        doorImages.forEach(d => d.el.classList.add('loaded'));
      }
    }

    doorImages.forEach(d => {
      const img = new Image();
      img.onload = onImageReady;
      img.onerror = onImageReady;
      img.src = d.src;
    });

    // Fallback: ensure panels are visible even if images fail to load
    setTimeout(() => {
      doorImages.forEach(d => d.el.classList.add('loaded'));
    }, 5000);

    function openDoors(lang) {
      // Ignore door taps while a replay is running (panels are mid-swing)
      if (replayingDoors) return;
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

  // --------------------------------------------------------------------------
  // REPLAY DOOR ENTRANCE
  // --------------------------------------------------------------------------
  // Replays the ceremonial entrance over the current page: while hidden, the
  // panels swing shut; the closed doors fade in; after a beat they swing open
  // and settle away, revealing the page exactly where the visitor was.
  function replayDoorEntrance() {
    if (replayingDoors || el.body.classList.contains('doors-locked')) return;
    if (!el.doorsWrap || !el.doorsWrap.classList.contains('doors-hidden')) return;

    replayingDoors = true;
    el.body.classList.add('doors-locked');

    // Phase 1 (0–1.25s, hidden): swing the open panels shut behind the page
    el.doorsWrap.classList.remove('door-opened');

    // Phase 2 (1.25–2.6s): fade the closed doors in over the page
    setTimeout(() => {
      el.doorsWrap.classList.remove('doors-hidden');
    }, 1250);

    // Phase 3 (2.6–3.7s): swing the doors open once more
    setTimeout(() => {
      el.doorsWrap.classList.add('door-opened');
    }, 2600);

    // Phase 4 (4s): let the doors settle away and unlock the page
    setTimeout(() => {
      el.doorsWrap.classList.add('doors-hidden');
      el.body.classList.remove('doors-locked');
      replayingDoors = false;
    }, 4100);
  }

  // --------------------------------------------------------------------------
  // FALLING FLOWER PETALS (CSS Keyframe particles)
  // --------------------------------------------------------------------------
  function initPetals() {
    const cfg = window.CONFIG;
    const count = 18;
    el.petalsContainer.innerHTML = '';

    const colors = cfg.colors[currentLang].petalColors;

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'petal';

      const left = Math.random() * 100;
      const size = 12 + Math.random() * 14;
      const duration = 7 + Math.random() * 8;
      const delay = Math.random() * 8;
      const color = colors[Math.floor(Math.random() * colors.length)];

      petal.style.left = `${left}%`;
      petal.style.width = `${size}px`;
      petal.style.height = `${size * 1.35}px`;
      petal.style.animationDuration = `${duration}s`;
      petal.style.animationDelay = `${delay}s`;
      petal.style.backgroundColor = color;

      el.petalsContainer.appendChild(petal);
    }
  }

  // --------------------------------------------------------------------------
  // PICK YOUR SIDE
  // --------------------------------------------------------------------------
  function initSidePicker() {
    function selectTeam(team) {
      selectedTeam = team;
      const brideSelected = team === 'bride';
      el.cardTeamBride.classList.toggle('selected', brideSelected);
      el.cardTeamGroom.classList.toggle('selected', !brideSelected);
      el.cardTeamBride.setAttribute('aria-pressed', String(brideSelected));
      el.cardTeamGroom.setAttribute('aria-pressed', String(!brideSelected));
    }

    // Reflect the initial markup state (bride selected by default)
    selectTeam('bride');

    ['cardTeamBride', 'cardTeamGroom'].forEach((id) => {
      const card = el[id];
      card.addEventListener('click', () => selectTeam(id === 'cardTeamBride' ? 'bride' : 'groom'));
      // Keyboard parity for the role="button" side cards
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          card.click();
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // LIVE COUNTDOWN WITH 3D FLIP TILES
  // --------------------------------------------------------------------------
  function updateCountdown() {
    const cfg = window.CONFIG;
    const targetMs = new Date(cfg.countdown.targetIso).getTime();
    const nowMs = Date.now();
    const diff = Math.max(0, targetMs - nowMs);

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    // Helper to flip digit if changed
    function updateTile(val, prevVal, tileEl, digitEl) {
      const formatted = String(val).padStart(2, '0');
      if (prevVal !== val) {
        digitEl.textContent = formatted;
        tileEl.classList.remove('flipping');
        // Force reflow
        void tileEl.offsetWidth;
        tileEl.classList.add('flipping');
      }
    }

    updateTile(days, prevCountdownValues.days, el.blockDays.querySelector('.flip-tile'), el.tileDays);
    updateTile(hours, prevCountdownValues.hours, el.blockHours.querySelector('.flip-tile'), el.tileHours);
    updateTile(mins, prevCountdownValues.mins, el.blockMins.querySelector('.flip-tile'), el.tileMins);
    updateTile(secs, prevCountdownValues.secs, el.blockSecs.querySelector('.flip-tile'), el.tileSecs);

    prevCountdownValues = { days, hours, mins, secs };

    // Status Message
    if (diff === 0) {
      el.countdownStatusLine.textContent = cfg.countdown.status.celebration[currentLang];
      if (countdownTimer) clearInterval(countdownTimer);
    } else if (diff <= 3600 * 1000) {
      el.countdownStatusLine.textContent = cfg.countdown.status.soon[currentLang];
    } else {
      el.countdownStatusLine.textContent = cfg.countdown.status.steady[currentLang];
    }
  }

  function initCountdown() {
    updateCountdown();
    countdownTimer = setInterval(updateCountdown, 1000);
  }

  // --------------------------------------------------------------------------
  // RSVP ACTIONS (WhatsApp, Google Calendar, Google Maps Directions)
  // --------------------------------------------------------------------------
  function initRsvp() {
    // 1. WhatsApp RSVP Button (Direct friendly pre-filled message)
    el.rsvpSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const cfg = window.CONFIG;
      const msg = cfg.ui.rsvpWhatsAppMessage[currentLang] || cfg.ui.rsvpWhatsAppMessage.en;
      const waUrl = `https://wa.me/${cfg.couple.whatsappNumber}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
    });

    // 2. Add Whole Wedding to Google Calendar
    el.addFullWeddingBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const cfg = window.CONFIG;
      const weddingEv = cfg.events.find(ev => ev.id === 'wedding') || cfg.events[0];
      const calTitle = encodeURIComponent(`${cfg.couple.groom} & ${cfg.couple.bride} - Wedding Ceremony`);
      const calDetails = encodeURIComponent(`The Auspicious Wedding of ${cfg.couple.groom} & ${cfg.couple.bride}.\nHashtag: ${cfg.couple.hashtag}`);
      const calLocation = encodeURIComponent(weddingEv.venue);
      const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${calTitle}&dates=${weddingEv.calendarStart}/${weddingEv.calendarEnd}&details=${calDetails}&location=${calLocation}`;
      window.open(url, '_blank');
    });

    // 3. Directions (Google Maps)
    el.directionsBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open(window.CONFIG.couple.mapsUrl, '_blank');
    });
  }

  // --------------------------------------------------------------------------
  // WEDDING HASHTAG COPY TO CLIPBOARD
  // --------------------------------------------------------------------------
  function initHashtagCopy() {
    el.weddingHashtag.parentElement.addEventListener('click', () => {
      const tag = window.CONFIG.couple.hashtag;
      navigator.clipboard.writeText(tag).then(() => {
        el.copyToast.textContent = window.CONFIG.ui.copiedHashtag[currentLang];
        el.copyToast.style.display = 'inline-block';
        setTimeout(() => {
          el.copyToast.style.display = 'none';
        }, 2200);
      }).catch(() => {});
    });
  }

  // --------------------------------------------------------------------------
  // WEB AUDIO API SYNTHESIZER FOR DHOL BEATS (Zero External Audio Files)
  // --------------------------------------------------------------------------
  function playDholBeat() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!activeAudioCtx) {
        activeAudioCtx = new AudioContext();
      }
      if (activeAudioCtx.state === 'suspended') {
        activeAudioCtx.resume();
      }

      const now = activeAudioCtx.currentTime;

      // 1. Deep Bass Dhol Thump (dagga / bass membrane)
      const bassOsc = activeAudioCtx.createOscillator();
      const bassGain = activeAudioCtx.createGain();

      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(145, now);
      bassOsc.frequency.exponentialRampToValueAtTime(45, now + 0.22);

      bassGain.gain.setValueAtTime(0.9, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

      bassOsc.connect(bassGain);
      bassGain.connect(activeAudioCtx.destination);

      bassOsc.start(now);
      bassOsc.stop(now + 0.28);

      // 2. High Treble Slap / Ring (thappi membrane)
      const trebleOsc = activeAudioCtx.createOscillator();
      const trebleGain = activeAudioCtx.createGain();

      trebleOsc.type = 'triangle';
      trebleOsc.frequency.setValueAtTime(420, now);
      trebleOsc.frequency.exponentialRampToValueAtTime(190, now + 0.12);

      trebleGain.gain.setValueAtTime(0.4, now);
      trebleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      trebleOsc.connect(trebleGain);
      trebleGain.connect(activeAudioCtx.destination);

      trebleOsc.start(now);
      trebleOsc.stop(now + 0.15);

    } catch (err) {
      console.warn('Web Audio playback error:', err);
    }
  }

  // --------------------------------------------------------------------------
  // REVEAL MINI-GAMES MODAL (Scratch Card, Trace Heart, Tap Dhol)
  // --------------------------------------------------------------------------

  // Unified input binding: pointer events (mouse/touch/pen) with pointer
  // capture so a stroke continues even when the cursor leaves the canvas.
  // Falls back to classic mouse/touch listeners in browsers without pointers.
  function bindCanvasPointer(canvas, onAction) {
    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = (e.clientX != null) ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const cy = (e.clientY != null) ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
      return {
        x: (cx - rect.left) * (canvas.width / rect.width),
        y: (cy - rect.top) * (canvas.height / rect.height)
      };
    };
    // Mini-game handlers take (x, y) logical canvas coordinates
    const act = (e) => {
      const p = getPos(e);
      onAction(p.x, p.y);
    };
    let drawing = false;

    if ('PointerEvent' in window) {
      canvas.addEventListener('pointerdown', (e) => {
        drawing = true;
        try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* ignore */ }
        act(e);
      });
      canvas.addEventListener('pointermove', (e) => { if (drawing) act(e); });
      const stop = () => { drawing = false; };
      canvas.addEventListener('pointerup', stop);
      canvas.addEventListener('pointercancel', stop);
    } else {
      canvas.addEventListener('mousedown', (e) => { drawing = true; act(e); });
      window.addEventListener('mouseup', () => { drawing = false; });
      canvas.addEventListener('mousemove', (e) => { if (drawing) act(e); });
      canvas.addEventListener('touchstart', (e) => { drawing = true; act(e); }, { passive: true });
      window.addEventListener('touchend', () => { drawing = false; });
      canvas.addEventListener('touchmove', (e) => { if (drawing) act(e); }, { passive: true });
    }
  }

  // Hint pill + live percentage chip overlaid on a mini-game canvas (the hint
  // is a DOM element so bilingual web fonts render crisply instead of canvas
  // text). Both are aria-hidden — the modal prompt above already instructs.
  function addGameHud(container, hintText) {
    const hint = document.createElement('div');
    hint.className = 'game-hint-chip';
    hint.setAttribute('aria-hidden', 'true');
    hint.textContent = hintText;

    const pct = document.createElement('div');
    pct.className = 'game-progress-chip';
    pct.setAttribute('aria-hidden', 'true');
    pct.textContent = '0%';

    container.appendChild(hint);
    container.appendChild(pct);
    return {
      setPct(value) { pct.textContent = `${Math.round(value)}%`; },
      hide() { hint.style.display = 'none'; pct.style.display = 'none'; }
    };
  }

  // Announces a mini-game completion to screen readers via the modal live region
  function announceSecret(text) {
    const region = document.getElementById('modalAnnouncer');
    if (region) region.textContent = text;
  }

  function openRevealModal(eventId) {
    const cfg = window.CONFIG;
    const ev = cfg.events.find(e => e.id === eventId);
    if (!ev) return;

    el.modalEventTitle.textContent = ev.name[currentLang];
    el.modalPromptText.textContent = ev.revealPrompt ? ev.revealPrompt[currentLang] : '';
    el.modalContentArea.innerHTML = '';

    const type = ev.revealType || 'none';

    if (type === 'scratch') {
      setupScratchCard(ev);
    } else if (type === 'trace') {
      setupTraceHeart(ev);
    } else if (type === 'dhol') {
      setupDholTap(ev);
    } else {
      setupPlainReveal(ev);
    }

    // Screen-reader live region for mini-game completion (cleared each open)
    const announcer = document.createElement('p');
    announcer.id = 'modalAnnouncer';
    announcer.className = 'sr-only';
    announcer.setAttribute('aria-live', 'polite');
    el.modalContentArea.appendChild(announcer);

    // A11y: remember the trigger, lock the background page, focus the dialog
    lastFocusedElement = document.activeElement;
    setBackgroundInert(true);
    el.revealModal.classList.add('active');
    requestAnimationFrame(() => el.modalCloseBtn.focus());
  }

  function closeRevealModal() {
    if (!el.revealModal.classList.contains('active')) return;
    el.revealModal.classList.remove('active');
    setBackgroundInert(false);
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function' && document.contains(lastFocusedElement)) {
      lastFocusedElement.focus();
    }
  }

  // Keeps the background page out of the tab order & AT while the modal is open
  function setBackgroundInert(isInert) {
    [el.doorsWrap, el.mainContent].forEach((node) => {
      if (!node) return;
      node.inert = isInert;
      if (isInert) node.setAttribute('aria-hidden', 'true');
      else node.removeAttribute('aria-hidden');
    });
  }

  // Traps Tab focus inside the open dialog so keyboard users can't tab into
  // the background page behind the modal.
  function trapModalFocus(e) {
    const focusables = el.revealModal.querySelectorAll(
      'button, a[href], [tabindex]:not([tabindex="-1"]), input, select, textarea, [role="button"]'
    );
    if (focusables.length === 0) {
      e.preventDefault();
      return;
    }
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  // 1. Scratch Card Implementation
  function setupScratchCard(ev) {
    const cfg = window.CONFIG;
    const wrap = document.createElement('div');
    wrap.className = 'interactive-canvas-container';

    const under = document.createElement('div');
    under.className = 'revealed-content-under';
    under.innerHTML = `<div>${ev.revealSecret[currentLang]}</div>`;
    wrap.appendChild(under);

    const canvas = document.createElement('canvas');
    canvas.className = 'interactive-canvas';
    canvas.width = 300;
    canvas.height = 200;
    wrap.appendChild(canvas);

    el.modalContentArea.appendChild(wrap);

    const ctx = canvas.getContext('2d');
    // Cover art only (the bilingual "scratch here" cue is a DOM chip below so
    // regional web fonts render crisply instead of as canvas text)
    const grad = ctx.createLinearGradient(0, 0, 300, 200);
    grad.addColorStop(0, '#F59E0B');
    grad.addColorStop(0.5, '#D97706');
    grad.addColorStop(1, '#92400E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 300, 200);

    ctx.strokeStyle = '#FDE68A';
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, 280, 180);
    ctx.strokeStyle = 'rgba(253, 230, 138, 0.55)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 8]);
    ctx.strokeRect(16, 16, 268, 168);
    ctx.setLineDash([]);

    // Sparkle accents so the cover still reads as "scratch me"
    ctx.fillStyle = '#FEF3C7';
    ctx.font = '16px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    [[150, 66], [88, 92], [212, 92], [150, 124], [52, 150], [248, 150], [122, 58], [178, 148]].forEach(([sx, sy]) => {
      ctx.fillText('✦', sx, sy);
    });

    const hints = (cfg.ui.minigameHints && cfg.ui.minigameHints.scratch) ? cfg.ui.minigameHints.scratch[currentLang] : 'Scratch here';
    const hud = addGameHud(wrap, hints);

    let isCleared = false;

    function scratchAt(x, y) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      // Downsampled alpha scan is cheap (~1.5k samples) — update live
      checkCleared();
    }

    function checkCleared() {
      if (isCleared) return;
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imgData.data;
      let clearCount = 0;
      let totalSampled = 0;
      const step = 32; // downsample for performance

      for (let i = 3; i < data.length; i += step * 4) {
        totalSampled++;
        if (data[i] === 0) clearCount++;
      }
      const pct = totalSampled ? clearCount / totalSampled : 0;
      hud.setPct(pct * 100);

      if (pct > 0.48) {
        isCleared = true;
        hud.hide();
        wrap.classList.add('game-complete');
        announceSecret(ev.revealSecret[currentLang]);
        canvas.style.transition = 'opacity 0.6s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
          canvas.remove();
          under.classList.add('revealed');
        }, 650);
      }
    }

    bindCanvasPointer(canvas, scratchAt);
  }

  // 2. Trace The Heart Implementation
  function setupTraceHeart(ev) {
    const cfg = window.CONFIG;
    const wrap = document.createElement('div');
    wrap.className = 'interactive-canvas-container';

    const under = document.createElement('div');
    under.className = 'revealed-content-under';
    under.innerHTML = `<div>${ev.revealSecret[currentLang]}</div>`;
    wrap.appendChild(under);

    const canvas = document.createElement('canvas');
    canvas.className = 'interactive-canvas';
    canvas.width = 300;
    canvas.height = 200;
    wrap.appendChild(canvas);

    el.modalContentArea.appendChild(wrap);

    const ctx = canvas.getContext('2d');
    let completed = false;

    // Draw initial cover
    ctx.fillStyle = '#15803D';
    ctx.fillRect(0, 0, 300, 200);

    // The dashed guide and the trace targets share one parametric heart curve,
    // so drawing exactly on the dotted line is what completes the reveal.
    const HEART_STEPS = 48;
    const targetPoints = [];

    function heartPoint(t) {
      const cx = 150, cy = 95, s = 4.2;
      return {
        x: cx + (16 * Math.pow(Math.sin(t), 3)) * s,
        y: cy - (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * s
      };
    }

    for (let i = 0; i < HEART_STEPS; i++) {
      const p = heartPoint((i / HEART_STEPS) * 2 * Math.PI);
      targetPoints.push({ x: p.x, y: p.y, hit: false });
    }

    function drawHeartGuide() {
      ctx.save();
      ctx.strokeStyle = '#FEF08A';
      ctx.lineWidth = 3;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(targetPoints[0].x, targetPoints[0].y);
      targetPoints.forEach((pt, i) => { if (i) ctx.lineTo(pt.x, pt.y); });
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    }

    drawHeartGuide();

    const hints = (cfg.ui.minigameHints && cfg.ui.minigameHints.trace) ? cfg.ui.minigameHints.trace[currentLang] : 'Trace the heart';
    const hud = addGameHud(wrap, hints);

    // Punch the whole heart silhouette out of the cover so the blessing is
    // revealed inside the heart shape before the canvas fades away.
    function revealHeartShape() {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.moveTo(targetPoints[0].x, targetPoints[0].y);
      targetPoints.forEach((pt, i) => { if (i) ctx.lineTo(pt.x, pt.y); });
      ctx.closePath();
      ctx.fill();
      ctx.lineWidth = 28;
      ctx.lineJoin = 'round';
      ctx.stroke();
      ctx.restore();
    }

    function traceAt(x, y) {
      // Only erase close to the heart outline — scribbling elsewhere can't
      // cheat; the player genuinely traces the shape.
      const nearGuide = targetPoints.some((pt) => Math.hypot(pt.x - x, pt.y - y) < 42);
      if (!nearGuide) return;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.fill();

      let hits = 0;
      targetPoints.forEach((pt) => {
        if (!pt.hit && Math.hypot(pt.x - x, pt.y - y) < 30) pt.hit = true;
        if (pt.hit) hits++;
      });

      hud.setPct((hits / targetPoints.length) * 100);

      if (!completed && hits / targetPoints.length > 0.62) {
        completed = true;
        revealHeartShape();
        hud.hide();
        wrap.classList.add('game-complete');
        announceSecret(ev.revealSecret[currentLang]);
        canvas.style.transition = 'opacity 0.9s ease';
        canvas.style.opacity = '0';
        setTimeout(() => {
          canvas.remove();
          under.classList.add('revealed');
        }, 950);
      }
    }

    bindCanvasPointer(canvas, traceAt);
  }

  // 3. Tap The Dhol Implementation
  function setupDholTap(ev) {
    const wrap = document.createElement('div');
    wrap.className = 'dhol-interactive-wrap';

    const targetTaps = 5;
    let currentTaps = 0;
    let completed = false;

    // Real <button> so the drum is keyboard-operable and announced properly
    const drum = document.createElement('button');
    drum.type = 'button';
    drum.className = 'dhol-drum-graphic';
    drum.setAttribute('aria-label', ev.revealPrompt ? ev.revealPrompt[currentLang] : 'Play the dhol');
    drum.innerHTML = `
      <span class="dhol-ripple" aria-hidden="true"></span>
      <svg class="dhol-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="8" rx="8" ry="4"/>
        <path d="M4 8v8c0 2.21 3.58 4 8 4s8-1.79 8-4V8"/>
        <path d="M4 12c0 2.21 3.58 4 8 4s8-1.79 8-4"/>
      </svg>
    `;

    const dotsWrap = document.createElement('div');
    dotsWrap.className = 'dhol-progress-dots';
    dotsWrap.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < targetTaps; i++) {
      const dot = document.createElement('div');
      dot.className = 'dhol-dot';
      dot.id = `dhol-dot-${i}`;
      dotsWrap.appendChild(dot);
    }

    const secretBox = document.createElement('div');
    secretBox.className = 'reveal-message-box';
    secretBox.textContent = ev.revealSecret[currentLang];

    function handleDrumTap() {
      if (completed) return;
      playDholBeat();

      // Bounce & Ripple
      drum.classList.add('drum-bounce');
      const ripple = drum.querySelector('.dhol-ripple');
      ripple.classList.remove('ripple-active');
      void ripple.offsetWidth;
      ripple.classList.add('ripple-active');
      setTimeout(() => drum.classList.remove('drum-bounce'), 120);

      if (currentTaps < targetTaps) {
        document.getElementById(`dhol-dot-${currentTaps}`).classList.add('filled');
        currentTaps++;
      }

      if (currentTaps === targetTaps) {
        completed = true;
        drum.setAttribute('aria-disabled', 'true');
        wrap.classList.add('dhol-complete');
        secretBox.classList.add('show');
        announceSecret(ev.revealSecret[currentLang]);
        // Victory flourish: a double beat as the blessing lands
        setTimeout(() => playDholBeat(), 140);
        setTimeout(() => playDholBeat(), 300);
      }
    }

    drum.addEventListener('click', handleDrumTap);
    drum.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleDrumTap();
      }
    });

    wrap.appendChild(drum);
    wrap.appendChild(dotsWrap);
    wrap.appendChild(secretBox);
    el.modalContentArea.appendChild(wrap);
  }

  // 4. Plain Ceremony Info Reveal
  function setupPlainReveal(ev) {
    const box = document.createElement('div');
    box.className = 'reveal-message-box';
    box.textContent = ev.tagline ? ev.tagline[currentLang] : ev.subtitle[currentLang];
    box.classList.add('show');
    el.modalContentArea.appendChild(box);
  }

  // --------------------------------------------------------------------------
  // EVENT LISTENERS & BOOTSTRAP
  // --------------------------------------------------------------------------
  function initListeners() {
    // Replay the ceremonial entrance
    el.replayBtn.addEventListener('click', replayDoorEntrance);

    // Modal Close (button + backdrop click)
    el.modalCloseBtn.addEventListener('click', closeRevealModal);
    el.revealModal.addEventListener('click', (e) => {
      if (e.target === el.revealModal) closeRevealModal();
    });

    // Modal a11y: Escape closes; Tab is trapped inside the dialog
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && el.revealModal.classList.contains('active')) {
        closeRevealModal();
        return;
      }
      if (e.key === 'Tab' && el.revealModal.classList.contains('active')) {
        trapModalFocus(e);
      }
    });
  }

  function init() {
    initDoorIntro();
    renderText();
    initPetals();
    initSidePicker();
    initCountdown();
    initRsvp();
    initHashtagCopy();
    initListeners();
  }

  // Run on DOM load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
