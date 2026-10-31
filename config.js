/**
 * WEDDING INVITATION CONFIGURATION
 * Single Source of Truth for all text, dates, venues, links, and styling.
 * 
 * Non-technical users can edit this file to reskin and update the entire wedding site.
 * Bilingual fields are stored as { en: "...", te: "..." }.
 */

window.CONFIG = {
  // Couple Information (Global display values)
  couple: {
    groom: "Ram Mohan",
    groomTelugu: "రామ్ మోహన్",
    groomFullName: {
      en: "Dr. Ram Mohan",
      te: "డా. రామ్ మోహన్"
    },
    groomParents: {
      en: "Son of Smt. Bogishetty Prabhavathi & Sri Bogishetty Rama Bhupal",
      te: "శ్రీమతి బోగిశెట్టి ప్రభావతి & శ్రీ బోగిశెట్టి రామభూపాల్ గారల కనిష్ఠ పుత్రుడు"
    },
    bride: "Vaibhavi",
    brideTelugu: "వైభవి",
    brideFullName: {
      en: "Dr. Aaradhya (Vaibhavi)",
      te: "డా. ఆరాధ్య (వైభవి)"
    },
    brideParents: {
      en: "Elder daughter of Smt. P. Lavanya & Sri P. Shivakumar, Vikarabad",
      te: "శ్రీమతి పట్లోళ్ళ లావణ్య & శ్రీ పట్లోళ్ళ శివకుమార్ గారల జ్యేష్ఠ పుత్రిక"
    },
    monogram: "R & V",
    hashtag: "#RamMohanWedsVaibhavi",
    venueMapsLink: "https://www.google.com/maps/search/?api=1&query=A.G.S.%20Convention%2C%20Kesaram%20Gate%2C%20Hyderabad%20Road%2C%20Chevella%2C%20Rangareddy%20District"
  },

  // Family Contact
  contact: {
    whatsappNumber: "919704827962",
    heading: {
      en: "Contact the family",
      te: "కుటుంబ సభ్యులను సంప్రదించండి"
    },
    phones: [
      { display: "97048 27962", tel: "+919704827962" },
      { display: "91482 82990", tel: "+919148282990" },
      { display: "75690 05718", tel: "+917569005718" }
    ],
    address: {
      en: "Smt. B. Prabhavathi & Sri B. Rama Bhupal, H.No. 77-190-2, Venkatachalapathi Nagar, Kallur Estate, Kurnool",
      te: "శ్రీమతి బి. ప్రభావతి & శ్రీ బి. రామభూపాల్, హెచ్.నెం. 77-190-2, వెంకటాచలపతి నగర్, కల్లూరు ఎస్టేట్, కర్నూలు"
    }
  },

  // Pick Your Side captions
  pickSide: {
    groomCaption: {
      en: "Ladke Wale",
      te: "పెళ్లికొడుకు తరపు"
    },
    brideCaption: {
      en: "Ladki Wale",
      te: "పెళ్లికూతురు తరపు"
    }
  },

  // Color Palettes
  colors: {
    en: {
      primary: '#D97706',      // Turmeric gold
      accent: '#881337',       // Deep festive maroon
      bg: '#FFFDF9',           // Warm cream
      cardBg: '#FFFFFF',
      text: '#3D2817',         // Dark warm brown
      textMuted: '#785D48',
      goldLight: '#FBBF24',
      goldDark: '#B45309',
      border: '#FDE68A',
      sealGold: 'linear-gradient(135deg, #FDE68A 0%, #D97706 50%, #92400E 100%)',
      countdownBg: 'linear-gradient(180deg, #450A0A 0%, #1A0505 100%)',
      petalColors: ['#F59E0B', '#F43F5E', '#E11D48', '#FBBF24', '#F472B6', '#D97706']
    },
    te: {
      primary: '#C27803',      // Soft ochre / turmeric
      accent: '#7F1D1D',       // Muted temple maroon
      bg: '#FAF8F2',           // Warm ivory
      cardBg: '#FFFDF7',
      text: '#2C1D11',         // Deep earthy brown
      textMuted: '#6B5441',
      goldLight: '#EAB308',
      goldDark: '#854D0E',
      border: '#E9D8A6',
      sealGold: 'linear-gradient(135deg, #F3E8C8 0%, #C27803 50%, #78350F 100%)',
      countdownBg: 'linear-gradient(180deg, #3A0C13 0%, #130407 100%)',
      petalColors: ['#D97706', '#991B1B', '#E11D48', '#C27803', '#FEF08A', '#B45309']
    }
  },

  // Image Paths (Must reference local swappable placeholders)
  images: {
    hero: {
      en: 'assets/images/english/hero.jpg',
      te: 'assets/images/telugu/hero.jpg'
    },
    wedding: {
      en: 'assets/images/english/wedding.jpg',
      te: 'assets/images/telugu/wedding.jpg'
    },
    reception: {
      en: 'assets/images/english/reception.jpg',
      te: 'assets/images/telugu/wedding.jpg'
    },

    // Natural pixel dimensions [width, height] of the artwork per language.
    // Used to reserve layout space (width/height attributes) so the tall
    // full-bleed posters never shift content while loading. Update these if
    // you swap in images with different dimensions.
    size: {
      en: [768, 1376],
      te: [896, 1200]
    }
  },

  // Live Countdown Muhurtham Target (ISO 8601 with timezone offset)
  countdown: {
    targetIso: "2026-11-20T09:48:00+05:30",
    muhurthamLabel: {
      en: "Friday, 20 November 2026 · 9:48 AM Muhurtham",
      te: "20 నవంబర్ 2026 • శుక్రవారం • ఉదయం 9:48 ముహూర్తం"
    },
    heading: {
      en: "Counting Down to the Sacred Union",
      te: "కళ్యాణ ఘడియల కోసం ఎదురుచూపులు"
    },
    subheading: {
      en: "Every second brings us closer to the auspicious moment",
      te: "ప్రతి క్షణం మంగళకరమైన సుముహూర్తానికి చేరువ చేస్తోంది"
    },
    labels: {
      days: { en: "Days", te: "రోజులు" },
      hours: { en: "Hours", te: "గంటలు" },
      mins: { en: "Mins", te: "నిమిషాలు" },
      secs: { en: "Secs", te: "సెకన్లు" }
    },
    status: {
      steady: {
        en: "The sacred celebration approaches...",
        te: "మంగళకరమైన వేడుక సమీపిస్తోంది..."
      },
      soon: {
        en: "✨ Less than an hour to the sacred muhurtham! The blessings begin! ✨",
        te: "✨ శుభ ముహూర్తానికి గంట కంటే తక్కువ సమయం మాత్రమే మిగిలింది! ✨"
      },
      celebration: {
        en: "🎊 The Wedding Ceremony is underway! May they be blessed forever! 🎊",
        te: "🎊 కళ్యాణ మహోత్సవం ప్రారంభమైంది! నూతన దంపతులను ఆశీర్వదించండి! 🎊"
      }
    }
  },

  // General Page Text & Section Headings
  ui: {
    doorLabels: { english: "ENGLISH", telugu: "తెలుగు" },
    doorHint: "✦ Tap to open",
    doorSubHint: "or choose a door",
    openingLine: {
      en: "Together with their families",
      te: "తమ కుటుంబ సభ్యులతో కలిసి"
    },
    heroSubtitle: {
      en: "request the honour of your presence at the celebration of their holy matrimony",
      te: "వారి వివాహ మహోత్సవానికి మిమ్మల్ని సాదరంగా ఆహ్వానిస్తున్నారు"
    },
    formalEyebrow: {
      en: "You are warmly invited",
      te: "సాదర సుస్వాగతం"
    },
    dateLabel: {
      en: "Auspicious Date",
      te: "శుభ ముహూర్త తేది"
    },
    venueLabel: {
      en: "Grand Venue",
      te: "కళ్యాణ వేదిక"
    },
    dateValue: {
      en: "Friday, 20 November 2026",
      te: "20 నవంబర్ 2026 • శుక్రవారం"
    },
    venueValue: {
      en: "A.G.S. Convention, Kesaram Gate, Hyderabad Road, Chevella, Rangareddy Dist.",
      te: "ఎ.జి.యస్. కన్వెన్షన్, కేసారం గేట్, హైదరాబాద్ రోడ్, చేవెళ్ల, రంగారెడ్డి జిల్లా"
    },
    copiedHashtag: {
      en: "Hashtag copied to clipboard!",
      te: "హ్యాష్‌ట్యాగ్ కాపీ చేయబడింది!"
    },
    timelineTitle: {
      en: "Festivities & Ceremonies",
      te: "శుభ కార్యముల వివరములు"
    },
    timelineSubtitle: {
      en: "Join us for the Sumuhurtham and Reception as we celebrate love, family, and new beginnings",
      te: "ప్రేమ, కుటుంబం మరియు నూతన ఆరంభాల సంబరంలో సుముహూర్తం మరియు రిసెప్షన్ వేడుకలకు మాతో చేరండి"
    },
addToCalendar: {
      en: "+ Add to Calendar",
      te: "+ క్యాలెండర్\u200cకు చేర్చండి"
    },
    locationBtn: {
      en: "📍 Location",
      te: "📍 లొకేషన్"
    },
    sidePickerTitle: {
      en: "Whose Side Are You On?",
      te: "మీరు ఎవరి పక్షం?"
    },
    sidePickerSubtitle: {
      en: "Choose your allegiance and represent your crew with joy!",
      te: "మీ బృందాన్ని ఎంచుకుని సంబరాల్లో పాల్గొనండి!"
    },
    teamBride: {
      en: "Vaibhavi",
      te: "వైభవి"
    },
    teamBrideTagline: {
      en: "Ladkiwale • Ready for music, elegance & sparkle!",
      te: "పెళ్లికూతురు తరఫు • అందం, ఆనందం & ఉత్సాహం!"
    },
    teamGroom: {
      en: "Ram Mohan",
      te: "రామ్ మోహన్"
    },
    teamGroomTagline: {
      en: "Ladkewale • Ready to dance, baraat & celebrate!",
      te: "పెళ్లికొడుకు తరఫు • బారాత్, డ్యాన్స్ & సందడి!"
    },
    rsvpTitle: {
      en: "Kindly RSVP",
      te: "మీ రాకను తెలియజేయండి"
    },
    rsvpSubtitle: {
      en: "Kindly RSVP by November 5, 2026 to help us welcome you warmly",
      te: "దయచేసి 5 నవంబర్ 2026 లోపు మీ రాకను తెలియజేసి మమ్మల్ని ఆనందింపజేయండి"
    },
    rsvpSubmitBtn: {
      en: "Send RSVP via WhatsApp ✦",
      te: "వాట్సాప్ ద్వారా RSVP పంపండి ✦"
    },
    addFullWeddingBtn: {
      en: "+ Add to Calendar",
      te: "+ క్యాలెండర్‌కు చేర్చండి"
    },
    directionsBtn: {
      en: "📍 Get Directions",
      te: "📍 దారిని చూడండి"
    },
    rsvpWhatsAppMessage: {
      en: "Hi! I'd love to RSVP for Ram Mohan & Vaibhavi's wedding 💛 #RamMohanWedsVaibhavi",
      te: "నమస్తే! రామ్ మోహన్ & వైభవిల వివాహ వేడుకకు సంబంధించి నా RSVP వివరాలు ఇక్కడ తెలియజేస్తున్నాను 💛 #RamMohanWedsVaibhavi"
    },
    callFamilyLabel: {
      en: "Need any assistance? Call the Family:",
      te: "ఏవైనా సందేహాలుంటే కుటుంబ సభ్యులను సంప్రదించండి:"
    },
    closingSymbol: {
      en: "॥ శ్రీరస్తు శుభమస్తు అవిఘ్నమస్తు ॥",
      te: "॥ శ్రీరస్తు శుభమస్తు అవిఘ్నమస్తు ॥"
    },
    closingBlessing: {
      en: "May their sacred bond be blessed with endless happiness, health, and prosperity through seven lifetimes.",
      te: "వారి పవిత్ర బంధం నూరేళ్ళూ సుఖసంతోషాలు, ఆయురారోగ్యాలు మరియు సంపదలతో కలకాలం వర్ధిల్లాలని నిండు మనసుతో ఆశీర్వదించండి."
    },
    closingNote: {
      en: "Hosted with love by Smt. B. Prabhavathi & Sri B. Rama Bhupal · H.No. 77-190-2, Venkatachalapathi Nagar, Kallur Estate, Kurnool. Out-of-town guests: please plan to arrive at Kallur Estate, Kurnool by Wednesday, 18 November 2026.",
      te: "శ్రీమతి బి. ప్రభావతి & శ్రీ బి. రామభూపాల్ గార్ల ఆత్మీయ ఆతిథ్యం · హెచ్.నెం. 77-190-2, వెంకటాచలపతి నగర్, కల్లూరు ఎస్టేట్, కర్నూలు. దూర ప్రాంతాల అతిథులు దయచేసి 18-11-2026 బుధవారం నాటికి కల్లూరు ఎస్టేట్, కర్నూలు చేరుకోవాలని కోరుతున్నాము."
    },
    modalCloseBtn: {
      en: "Close ✕",
      te: "మూసివేయి ✕"
    },
    minigameHints: {
      scratch: {
        en: "✦ Scratch here ✦",
        te: "✦ ఇక్కడ గీరండి ✦"
      },
      trace: {
        en: "✦ Trace the heart ✦",
        te: "✦ హృదయాన్ని గీయండి ✦"
      }
    }
  },

  // Festivities Events Array (2 events)
  events: [
    {
      id: "sumuhurtham",
      imageKey: "wedding",
      name: {
        en: "Sumuhurtham",
        te: "సుముహూర్తం"
      },
      subtitle: {
        en: "Uttarabhadra Nakshatra · Dhanur Lagnam · Pushya Rashi",
        te: "ఉత్తరాభాద్ర నక్షత్రయుక్త ధనుర్ లగ్న శుభ పుష్య రాశి"
      },
      date: "Friday, 20 November 2026",
      dateTelugu: "20 నవంబర్ 2026 • శుక్రవారం",
      time: "9:48 AM",
      timeTelugu: "ఉదయం 9:48",
      venue: "A.G.S. Convention, Kesaram Gate, Hyderabad Road, Chevella, Rangareddy Dist.",
      venueTelugu: "ఎ.జి.యస్. కన్వెన్షన్, కేసారం గేట్, హైదరాబాద్ రోడ్, చేవెళ్ల, రంగారెడ్డి జిల్లా",
      mapsLink: "https://www.google.com/maps/search/?api=1&query=A.G.S.%20Convention%2C%20Kesaram%20Gate%2C%20Hyderabad%20Road%2C%20Chevella%2C%20Rangareddy%20District",
      tagline: {
        en: "“Tied by sacred mantras, united across seven births.”",
        te: "“వేద మంత్రాల సాక్షిగా, అగ్నిహోత్రం సమక్షంలో ఏడడుగుల బంధం.”"
      },
      revealType: "none",
      calendarStart: "20261120T041800Z",
      calendarEnd: "20261120T070000Z"
    },
    {
      id: "reception",
      imageKey: "reception",
      name: {
        en: "Reception",
        te: "రిసెప్షన్"
      },
      subtitle: {
        en: "An afternoon of warm wishes, lunch and celebration with family and friends",
        te: "ఆత్మీయ ఆశీర్వాదాలు, భోజనం మరియు సంబరాలతో ఆనందదాయక మధ్యాహ్నం"
      },
      date: "Sunday, 22 November 2026",
      dateTelugu: "22 నవంబర్ 2026 • ఆదివారం",
      time: "1:00 PM",
      timeTelugu: "మధ్యాహ్నం 1:00",
      venue: "Somisetty Tanish Convention, Kappal Nagar, Venkataramana Colony, Kurnool",
      venueTelugu: "సోమిశెట్టి తనీష్ కన్వెన్షన్, కప్పల్ నగర్, వెంకటరమణ కాలనీ, కర్నూలు",
      mapsLink: "https://share.google/UBZSRAhkrMy6VpuPV",
      tagline: {
        en: "“A celebration of love, laughter and togetherness.”",
        te: "“ప్రేమ, నవ్వు మరియు కలిసి ఉండే ఆనందం.”"
      },
      revealType: "none",
      calendarStart: "20261122T073000Z",
      calendarEnd: "20261122T103000Z"
    }
  ]
};
