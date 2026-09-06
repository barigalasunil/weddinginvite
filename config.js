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
    groomParents: {
      en: "Son of Smt. Lakshmi & Sri Venkateshwar Rao",
      te: "శ్రీమతి లక్ష్మి మరియు శ్రీ వేంకటేశ్వర రావు గార్ల సుపుత్రుడు"
    },
    bride: "Vaibhavi",
    brideTelugu: "వైభవి",
    brideParents: {
      en: "Daughter of Smt. Padmavati & Sri Satyanarayana Sharma",
      te: "శ్రీమతి పద్మావతి మరియు శ్రీ సత్యనారాయణ శర్మ గార్ల సుపుత్రిక"
    },
    monogram: "R & V",
    hashtag: "#RamMohanWedsVaibhavi",
    familyPhone: "+919876543210",
    familyPhoneFormatted: "+91 98765 43210",
    whatsappNumber: "919876543210",
    mapsUrl: "https://maps.google.com/?q=Sri+Venkateshwara+Kalyana+Vedika+Hyderabad"
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
    haldi: {
      en: 'assets/images/english/haldi.jpg',
      te: 'assets/images/telugu/haldi.jpg'
    },
    mehndi: {
      en: 'assets/images/english/mehndi.jpg',
      te: 'assets/images/telugu/mehndi.jpg'
    },
    sangeet: {
      en: 'assets/images/english/sangeet.jpg',
      te: 'assets/images/telugu/sangeet.jpg'
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
    targetIso: "2026-11-20T09:30:00+05:30",
    muhurthamLabel: {
      en: "Auspicious Sumuhurtham: Friday, November 20, 2026 at 09:30 AM IST",
      te: "శుభ సుముహూర్తం: శుక్రవారం, 20 నవంబర్ 2026 ఉదయం 09:30 ని.లకు"
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
      en: "November 20, 2026 • Friday",
      te: "20 నవంబర్ 2026 • శుక్రవారం"
    },
    venueValue: {
      en: "Sri Venkateshwara Kalyana Vedika, Jubilee Hills, Hyderabad",
      te: "శ్రీ వేంకటేశ్వర కళ్యాణ వేదిక, జూబ్లీహిల్స్, హైదరాబాద్"
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
      en: "Join us in each joyful celebration of love, music, and traditions",
      te: "ప్రేమ, సంగీతం మరియు సంప్రదాయాల వేడుకలలో మాతో పాల్గొనండి"
    },
addToCalendar: {
      en: "+ Add to Calendar",
      te: "+ క్యాలెండర్\u200cకు చేర్చండి"
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
      en: "Team Bride",
      te: "వధువు పక్షం"
    },
    teamBrideTagline: {
      en: "Ladkiwale • Ready for music, elegance & sparkle!",
      te: "పెళ్లికూతురు తరఫు • అందం, ఆనందం & ఉత్సాహం!"
    },
    teamGroom: {
      en: "Team Groom",
      te: "వరుడి పక్షం"
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
      en: "With best compliments and love from the Barigala & Sharma Families.",
      te: "బరిగల & శర్మ కుటుంబ సభ్యుల ఆత్మీయ శుభాకాంక్షలు మరియు ఆహ్వానం."
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

  // Festivities Events Array (4+ events)
  // CEREMONY NAMES EXACT MATCH REQUIRED:
  // Haldi    → పసుపు వేడుక
  // Mehndi   → గోరింటాకు వేడుక
  // Sangeet  → సంగీత రాత్రి
  // Wedding  → వివాహం
  events: [
    {
      id: "haldi",
      imageKey: "haldi",
      name: {
        en: "Haldi Ceremony",
        te: "పసుపు వేడుక"
      },
      subtitle: {
        en: "The golden splash of turmeric, laughter, and auspicious beginnings",
        te: "పసుపు కుంకుమల శోభ, ఆత్మీయుల నవ్వులు మరియు మంగళకరమైన ఆరంభం"
      },
      date: "December 9, 2026",
      dateTelugu: "9 డిసెంబర్ 2026",
      time: "09:00 AM IST onwards",
      timeTelugu: "ఉదయం 09:00 ని.ల నుండి",
      venue: "Royal Mango Grove Lawn, Jubilee Hills, Hyderabad",
      venueTelugu: "రాయల్ మ్యాంగో గ్రోవ్, జూబ్లీహిల్స్, హైదరాబాద్",
      dressCode: {
        en: "Sunny Yellows, Mustard & Florals",
        te: "పసుపు రంగు, పీతాంబరం & పూల అలంకరణ దుస్తులు"
      },
      tagline: {
        en: "“Drenched in golden turmeric, wrapped in timeless love.”",
        te: "“పసుపు వర్ణపు మెరుపులతో మొదలయ్యే ప్రేమ ప్రయాణం.”"
      },
      revealType: "scratch", // scratch | trace | dhol | none
      revealPrompt: {
        en: "Scratch with your finger or mouse to unveil the Haldi blessing!",
        te: "పసుపు వేడుక ఆశీర్వాదం చూడటానికి కార్డ్‌ను స్క్రాచ్ చేయండి!"
      },
      revealLabel: {
        en: "Rub to Reveal",
        te: "గీరి చూడండి"
      },
      revealSecret: {
        en: "✨ Blessings revealed: Golden turmeric glows with health, joy & laughter! ✨",
        te: "✨ పసుపు శోభతో జీవితం నిత్య కల్యాణమై వెలగాలని ఆశీస్సులు! ✨"
      },
      calendarStart: "20261209T033000Z",
      calendarEnd: "20261209T063000Z"
    },
    {
      id: "mehndi",
      imageKey: "mehndi",
      name: {
        en: "Mehndi Celebration",
        te: "గోరింటాకు వేడుక"
      },
      subtitle: {
        en: "Intricate henna patterns singing tales of devotion and joy",
        te: "చేతులపై గోరింటాకు పూత, పాటల సందడి మరియు అనురాగపు వర్ణాలు"
      },
      date: "December 9, 2026",
      dateTelugu: "9 డిసెంబర్ 2026",
      time: "04:30 PM IST onwards",
      timeTelugu: "సాయంత్రం 04:30 ని.ల నుండి",
      venue: "The Marigold Courtyard, Jubilee Hills, Hyderabad",
      venueTelugu: "బంతిపూల ప్రాంగణం, జూబ్లీహిల్స్, హైదరాబాద్",
      dressCode: {
        en: "Tender Green, Olive & Festive Pastels",
        te: "ఆకుపచ్చ, గోరింట వర్ణం & సాంప్రదాయ దుస్తులు"
      },
      tagline: {
        en: "“As the henna deepens its hue, eternal love shines through.”",
        te: "“గోరింటాకు పండిన కొద్దీ అనురాగం మరింతగా చిగురిస్తుంది.”"
      },
      revealType: "trace", // trace the heart
      revealPrompt: {
        en: "Trace along the sacred heart to complete the Mehendi pattern!",
        te: "గోరింటాకు హృదయ ఆకారాన్ని గీసి వేడుకను ఆవిష్కరించండి!"
      },
      revealLabel: {
        en: "Trace the Heart",
        te: "హృదయాన్ని గీయండి"
      },
      revealSecret: {
        en: "🌿 Beautiful henna etched forever: Two loving hearts united as one! 🌿",
        te: "🌿 అనురాగపు గోరింటాకుతో రెండు మనసులు ఒక్కటయ్యాయి! 🌿"
      },
      calendarStart: "20261209T110000Z",
      calendarEnd: "20261209T153000Z"
    },
    {
      id: "sangeet",
      imageKey: "sangeet",
      name: {
        en: "Sangeet Night",
        te: "సంగీత రాత్రి"
      },
      subtitle: {
        en: "An electrifying evening of beats, bhangra, and musical celebration",
        te: "సంగీత లయలు, నృత్యాల సందడి మరియు సంతోషాల సునామీ"
      },
      date: "December 10, 2026",
      dateTelugu: "10 డిసెంబర్ 2026",
      time: "07:00 PM IST onwards",
      timeTelugu: "సాయంత్రం 07:00 ని.ల నుండి",
      venue: "Grand Crystal Ballroom, Taj Krishna, Banjara Hills, Hyderabad",
      venueTelugu: "గ్రాండ్ క్రిస్టల్ వేదిక, తాజ్ కృష్ణ, బంజారాహిల్స్, హైదరాబాద్",
      dressCode: {
        en: "Indo-Western Glitz, Glamour & Sparkling Lehengas",
        te: "రాయల్ గ్లిట్జ్, మెరిసే లెహంగాలు & గ్రాండ్ సూట్స్"
      },
      tagline: {
        en: "“When hearts celebrate in rhythm, the night sings with joy.”",
        te: "“అడుగులు కలిసే వేళ... పాటలు పలికే వేళ... సంగీత సంతోషం!”"
      },
      revealType: "dhol", // tap the dhol drum
      revealPrompt: {
        en: "Tap the traditional Dhol drum to unlock the festive sangeet rhythm!",
        te: "సంగీత లయను మేల్కొలపడానికి డోలుపై తట్టండి!"
      },
      revealLabel: {
        en: "Tap the Dhol",
        te: "డోలు తట్టండి"
      },
      revealSecret: {
        en: "🥁 Dhol beats rock the dance floor! Put on your dancing shoes! 🥁",
        te: "🥁 డోలు మోగింది! డ్యాన్స్ ఫ్లోర్‌పై సందడి చేయడానికి సిద్ధం కండి! 🥁"
      },
      calendarStart: "20261210T133000Z",
      calendarEnd: "20261210T183000Z"
    },
    {
      id: "wedding",
      imageKey: "wedding",
      name: {
        en: "Auspicious Wedding",
        te: "వివాహం"
      },
      subtitle: {
        en: "The sacred saat phere and jeelakarra bellam ceremony",
        te: "జీలకర్ర బెల్లం, మంగళసూత్ర ధారణ మరియు సప్తపది పవిత్ర వివాహ ఘట్టం"
      },
      date: "November 20, 2026",
      dateTelugu: "20 నవంబర్ 2026",
      time: "Sumuhurtham: 09:30 AM IST",
      timeTelugu: "సుముహూర్తం: ఉదయం 09:30 ని.లకు",
      venue: "Sri Venkateshwara Kalyana Vedika, Jubilee Hills, Hyderabad",
      venueTelugu: "శ్రీ వేంకటేశ్వర కళ్యాణ వేదిక, జూబ్లీహిల్స్, హైదరాబాద్",
      dressCode: {
        en: "Traditional Kanjeevaram Silk & Dhoti Kurta",
        te: "సంప్రదాయ కాంచీపురం పట్టుచీర & ధోవతి కుర్తా"
      },
      tagline: {
        en: "“Tied by sacred mantras, united across seven births.”",
        te: "“వేద మంత్రాల సాక్షిగా, అగ్నిహోత్రం సమక్షంలో ఏడడుగుల బంధం.”"
      },
      revealType: "none",
      calendarStart: "20261120T040000Z",
      calendarEnd: "20261120T090000Z"
    }
  ]
};
