/* Still & Steady — vanilla JavaScript */
(() => {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => Array.from(document.querySelectorAll(selector));

  const STORAGE = {
    theme: 'still-steady-theme',
    key: 'still-steady-bible-key',
    audioTracks: 'still-steady-audio-tracks',
    spotify: 'still-steady-spotify-url',
    preferences: 'still-steady-preferences'
  };

  // 40 built-in King James Version Bible verses.
  const VERSES = [
    { ref: 'Psalm 23:1', id: 'PSA.23.1-PSA.23.1', text: 'The LORD is my shepherd; I shall not want.' },
    { ref: 'Psalm 46:10', id: 'PSA.46.10-PSA.46.10', text: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.' },
    { ref: 'Psalm 119:105', id: 'PSA.119.105-PSA.119.105', text: 'Thy word is a lamp unto my feet, and a light unto my path.' },
    { ref: 'Psalm 34:8', id: 'PSA.34.8-PSA.34.8', text: 'O taste and see that the LORD is good: blessed is the man that trusteth in him.' },
    { ref: 'Proverbs 3:5–6', id: 'PRO.3.5-PRO.3.6', text: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.' },
    { ref: 'Isaiah 40:31', id: 'ISA.40.31-ISA.40.31', text: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.' },
    { ref: 'Isaiah 41:10', id: 'ISA.41.10-ISA.41.10', text: 'Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.' },
    { ref: 'Jeremiah 29:11', id: 'JER.29.11-JER.29.11', text: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.' },
    { ref: 'Matthew 5:16', id: 'MAT.5.16-MAT.5.16', text: 'Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven.' },
    { ref: 'Matthew 6:33', id: 'MAT.6.33-MAT.6.33', text: 'But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.' },
    { ref: 'Matthew 11:28', id: 'MAT.11.28-MAT.11.28', text: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.' },
    { ref: 'Matthew 28:20', id: 'MAT.28.20-MAT.28.20', text: 'Teaching them to observe all things whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.' },
    { ref: 'John 3:16', id: 'JHN.3.16-JHN.3.16', text: 'For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.' },
    { ref: 'John 14:27', id: 'JHN.14.27-JHN.14.27', text: 'Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.' },
    { ref: 'John 15:5', id: 'JHN.15.5-JHN.15.5', text: 'I am the vine, ye are the branches: He that abideth in me, and I in him, the same bringeth forth much fruit: for without me ye can do nothing.' },
    { ref: 'Romans 8:28', id: 'ROM.8.28-ROM.8.28', text: 'And we know that all things work together for good to them that love God, to them who are the called according to his purpose.' },
    { ref: 'Romans 12:12', id: 'ROM.12.12-ROM.12.12', text: 'Rejoicing in hope; patient in tribulation; continuing instant in prayer;' },
    { ref: 'Romans 15:13', id: 'ROM.15.13-ROM.15.13', text: 'Now the God of hope fill you with all joy and peace in believing, that ye may abound in hope, through the power of the Holy Ghost.' },
    { ref: '1 Corinthians 13:4–7', id: '1CO.13.4-1CO.13.7', text: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil; Rejoiceth not in iniquity, but rejoiceth in the truth; Beareth all things, believeth all things, hopeth all things, endureth all things.' },
    { ref: '1 Corinthians 16:14', id: '1CO.16.14-1CO.16.14', text: 'Let all your things be done with charity.' },
    { ref: '2 Corinthians 5:7', id: '2CO.5.7-2CO.5.7', text: 'For we walk by faith, not by sight:' },
    { ref: 'Galatians 5:22–23', id: 'GAL.5.22-GAL.5.23', text: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.' },
    { ref: 'Ephesians 2:10', id: 'EPH.2.10-EPH.2.10', text: 'For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them.' },
    { ref: 'Ephesians 3:20', id: 'EPH.3.20-EPH.3.20', text: 'Now unto him that is able to do exceeding abundantly above all that we ask or think, according to the power that worketh in us,' },
    { ref: 'Ephesians 6:10', id: 'EPH.6.10-EPH.6.10', text: 'Finally, my brethren, be strong in the Lord, and in the power of his might.' },
    { ref: 'Philippians 4:6–7', id: 'PHP.4.6-PHP.4.7', text: 'Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.' },
    { ref: 'Philippians 4:13', id: 'PHP.4.13-PHP.4.13', text: 'I can do all things through Christ which strengtheneth me.' },
    { ref: 'Colossians 3:23', id: 'COL.3.23-COL.3.23', text: 'And whatsoever ye do, do it heartily, as to the Lord, and not unto men;' },
    { ref: '2 Timothy 1:7', id: '2TI.1.7-2TI.1.7', text: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.' },
    { ref: 'Hebrews 11:1', id: 'HEB.11.1-HEB.11.1', text: 'Now faith is the substance of things hoped for, the evidence of things not seen.' },
    { ref: 'Hebrews 12:1–2', id: 'HEB.12.1-HEB.12.2', text: 'Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us, Looking unto Jesus the author and finisher of our faith;' },
    { ref: 'James 1:5', id: 'JAS.1.5-JAS.1.5', text: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.' },
    { ref: '1 Peter 5:7', id: '1PE.5.7-1PE.5.7', text: 'Casting all your care upon him; for he careth for you.' },
    { ref: '1 John 4:18', id: '1JN.4.18-1JN.4.18', text: 'There is no fear in love; but perfect love casteth out fear: because fear hath torment. He that feareth is not made perfect in love.' },
    { ref: 'Psalm 27:1', id: 'PSA.27.1-PSA.27.1', text: 'The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?' },
    { ref: 'Psalm 37:4', id: 'PSA.37.4-PSA.37.4', text: 'Delight thyself also in the LORD; and he shall give thee the desires of thine heart.' },
    { ref: 'Psalm 91:1', id: 'PSA.91.1-PSA.91.1', text: 'He that dwelleth in the secret place of the most High shall abide under the shadow of the Almighty.' },
    { ref: 'Psalm 121:1–2', id: 'PSA.121.1-PSA.121.2', text: 'I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.' },
    { ref: 'Lamentations 3:22–23', id: 'LAM.3.22-LAM.3.23', text: 'It is of the LORD\'S mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.' },
    { ref: 'Micah 6:8', id: 'MIC.6.8-MIC.6.8', text: 'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?' }
  ];

  // Application state.
  const state = {
    theme: localStorage.getItem(STORAGE.theme) || 'dusk',
    clockStyle: 'digital',
    version: 'KJV',
    verseIndex: 2,
    verseIntervalMs: 120000,
    verseElapsedMs: 0,

    apiKey: localStorage.getItem(STORAGE.key) || '',
    bibleListPromise: null,
    bibleIds: {},
    bibleCache: new Map(),
    currentRequest: 0,

    totalMs: 60 * 60 * 1000,
    remainingMs: 60 * 60 * 1000,
    plan: [],
    phaseIndex: 0,
    phaseRemainingMs: 0,
    lastTickAt: 0,

    running: false,
    started: false,
    timerId: null,

    playlist: [],
    trackIndex: -1,
    fileObjectUrls: [],

    // This flag prevents music from restarting after the session ends.
    musicAllowed: false,

    spotifyUrl: localStorage.getItem(STORAGE.spotify) || '',
    spotifyEmbedUrl: ''
  };

  // Connect the JavaScript to the HTML elements.
  const el = {
    home: $('#home'),
    session: $('#session'),
    navLinks: $$('.nav-link'),

    sessionMinutes: $('#sessionMinutes'),
    breakMinutes: $('#breakMinutes'),
    suggestedBreaks: $('#suggestedBreaks'),
    scheduleSummary: $('#scheduleSummary'),
    scheduleEquation: $('#scheduleEquation'),

    verseInterval: $('#verseInterval'),
    bibleVersion: $('#bibleVersion'),
    versionHint: $('#versionHint'),

    startSession: $('#startSession'),
    pauseSession: $('#pauseSession'),
    resetSession: $('#resetSession'),

    topClock: $('#clockCycle'),
    topClockValue: $('#topClockValue'),
    topClockCaption: $('#topClockCaption'),
    breakClockCard: $('#breakClockCard'),
    breakClockValue: $('#breakClockValue'),
    breakStageTime: $('#breakStageTime'),

    progressFill: $('#progressFill'),
    progressPercent: $('#progressPercent'),
    phaseLabel: $('#phaseLabel'),
    blockInfo: $('#blockInfo'),
    remainingPlan: $('#remainingPlan'),

    verseCard: $('#verseCard'),
    breakStage: $('#breakStage'),
    verseText: $('#verseText'),
    verseReference: $('#verseReference'),
    verseKicker: $('#verseKicker'),
    verseCopyright: $('#verseCopyright'),
    previousVerse: $('#previousVerse'),
    nextVerse: $('#nextVerse'),
    breakProgressLabel: $('#breakProgressLabel'),

    clockStyleSelect: $('#clockStyleSelect'),
    settingsDialog: $('#settingsDialog'),
    apiBibleKey: $('#apiBibleKey'),
    apiKeyStatus: $('#apiKeyStatus'),

    audio: $('#audioElement'),
    playlist: $('#audioPlaylist'),
    trackTitle: $('#trackTitle'),
    musicDock: $('.music-dock'),
    musicStatus: $('#musicStatus'),
    toggleMusic: $('#toggleMusic'),

    musicOptions: $('#musicOptions'),
    audioUrl: $('#audioUrl'),
    audioFiles: $('#audioFiles'),
    spotifyUrl: $('#spotifyUrl'),
    spotifyEmbedWrap: $('#spotifyEmbedWrap'),
    spotifyEmbed: $('#spotifyEmbed'),

    toast: $('#toast')
  };

  // General utilities.
  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function formatTime(ms) {
    const seconds = Math.max(0, Math.ceil(ms / 1000));
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return hours > 0
      ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`
      : `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function showToast(message) {
    el.toast.textContent = message;
    el.toast.classList.add('show');

    window.clearTimeout(showToast.timeout);

    showToast.timeout = window.setTimeout(() => {
      el.toast.classList.remove('show');
    }, 3000);
  }

  function persistPreferences() {
    const preferences = {
      sessionMinutes: Number(el.sessionMinutes.value) || 60,
      breakMinutes: Number(el.breakMinutes.value) || 5,
      verseInterval: el.verseInterval.value,
      version: el.bibleVersion.value,
      theme: state.theme,
      clockStyle: state.clockStyle
    };

    localStorage.setItem(STORAGE.preferences, JSON.stringify(preferences));
  }

  // ----------------------------------------------------
  // THEME, NAVIGATION AND CLOCK
  // ----------------------------------------------------

  function setTheme(theme) {
    const safeTheme = ['dusk', 'cream', 'sky'].includes(theme)
      ? theme
      : 'dusk';

    state.theme = safeTheme;

    document.body.classList.remove(
      'theme-dusk',
      'theme-cream',
      'theme-sky'
    );

    document.body.classList.add(`theme-${safeTheme}`);

    $$('.theme-choice').forEach(button => {
      button.classList.toggle(
        'active',
        button.dataset.theme === safeTheme
      );
    });

    localStorage.setItem(STORAGE.theme, safeTheme);

    if (state.spotifyUrl) {
      const embed = normalizeSpotifyEmbed(state.spotifyUrl);

      if (embed) {
        state.spotifyEmbedUrl = embed;

        // Never reload an embed that has been stopped.
        if (el.spotifyEmbed.getAttribute('src') !== 'about:blank') {
          el.spotifyEmbed.src = embed;
        }
      }
    }

    persistPreferences();
  }

  function showView(name) {
    const focus = name === 'session';

    el.home.classList.toggle('is-visible', !focus);
    el.session.classList.toggle('is-visible', focus);

    el.navLinks.forEach(link => {
      link.classList.toggle(
        'active',
        link.dataset.nav === (focus ? 'session' : 'home')
      );
    });

    document.body.classList.toggle('in-session', focus);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  function setClockStyle(style) {
    const styles = ['digital', 'minimal', 'analog'];

    const next = styles.includes(style)
      ? style
      : 'digital';

    state.clockStyle = next;

    el.topClock.classList.remove(
      'clock-digital',
      'clock-minimal',
      'clock-analog'
    );

    el.topClock.classList.add(`clock-${next}`);
    el.clockStyleSelect.value = next;

    persistPreferences();
  }

  function cycleClockStyle() {
    const styles = ['digital', 'minimal', 'analog'];

    const currentIndex = styles.indexOf(state.clockStyle);
    const nextIndex = (currentIndex + 1) % styles.length;

    setClockStyle(styles[nextIndex]);

    showToast(`Clock style: ${state.clockStyle}`);
  }

  // ----------------------------------------------------
  // BREAK SUGGESTIONS AND SESSION PLANNING
  // ----------------------------------------------------

  function scheduleSuggestion() {
    const total = clamp(
      Number(el.sessionMinutes.value) || 60,
      10,
      240
    );

    const breakLength = clamp(
      Number(el.breakMinutes.value) || 5,
      1,
      20
    );

    const maxUsefulBreaks = Math.max(
      0,
      Math.floor((total - 5) / (breakLength + 5))
    );

    const breaks = Math.min(
      Math.floor(total / 20),
      maxUsefulBreaks
    );

    const focusMinutes = total - breaks * breakLength;
    const blocks = breaks + 1;
    const eachFocus = focusMinutes / blocks;

    el.suggestedBreaks.textContent = String(breaks);

    el.scheduleSummary.textContent = breaks
      ? `About ${Math.round(focusMinutes)} minutes of focus, divided into ${blocks} blocks, plus ${breaks * breakLength} minutes of rest.`
      : `A single ${total}-minute focus block, with no scheduled breaks.`;

    el.scheduleEquation.textContent =
      `${blocks} focus block${blocks === 1 ? '' : 's'} · ` +
      `${breaks} gentle break${breaks === 1 ? '' : 's'} · ` +
      `${total} minutes total`;

    return {
      total,
      breakLength,
      breaks,
      focusMinutes,
      blocks,
      eachFocus
    };
  }

  function buildPlan() {
    const schedule = scheduleSuggestion();

    const totalMs = schedule.total * 60 * 1000;
    const breakMs = schedule.breakLength * 60 * 1000;

    const focusCount = schedule.breaks + 1;

    const focusTotalMs =
      totalMs - schedule.breaks * breakMs;

    const focusBase = Math.floor(
      focusTotalMs / focusCount
    );

    let focusRemainder =
      focusTotalMs - focusBase * focusCount;

    const plan = [];

    for (let i = 0; i < focusCount; i += 1) {
      const duration =
        focusBase + (focusRemainder > 0 ? 1 : 0);

      if (focusRemainder > 0) {
        focusRemainder -= 1;
      }

      plan.push({
        type: 'focus',
        duration,
        focusNumber: i + 1
      });

      if (i < schedule.breaks) {
        plan.push({
          type: 'break',
          duration: breakMs,
          breakNumber: i + 1
        });
      }
    }

    state.totalMs = totalMs;
    state.remainingMs = totalMs;
    state.plan = plan;
    state.phaseIndex = 0;
    state.phaseRemainingMs = plan[0].duration;
    state.verseElapsedMs = 0;
    state.version = el.bibleVersion.value;
    state.verseIntervalMs =
      Number(el.verseInterval.value) * 60 * 1000;

    return schedule;
  }

  // ----------------------------------------------------
  // BIBLE VERSES AND TRANSLATIONS
  // ----------------------------------------------------

  function getCurrentVerse() {
    return VERSES[state.verseIndex];
  }

  function renderLocalVerse(note = '') {
    const verse = getCurrentVerse();

    el.verseText.textContent = `“${verse.text}”`;
    el.verseReference.textContent = `${verse.ref} · KJV`;
    el.verseCopyright.textContent = note;

    el.verseCard.classList.remove('is-loading');
  }

  function cleanApiText(content) {
    if (typeof content !== 'string') {
      return '';
    }

    const parsed = new DOMParser().parseFromString(
      content,
      'text/html'
    );

    return (parsed.body.textContent || content)
      .replace(/\s+/g, ' ')
      .trim();
  }

  function getBibleList() {
    if (state.bibleListPromise) {
      return state.bibleListPromise;
    }

    state.bibleListPromise = fetch(
      'https://rest.api.bible/v1/bibles?language=eng',
      {
        headers: {
          'api-key': state.apiKey
        }
      }
    )
      .then(async response => {
        if (!response.ok) {
          throw new Error(
            `Bible list request failed (${response.status}).`
          );
        }

        const result = await response.json();

        return result.data || [];
      })
      .catch(error => {
        state.bibleListPromise = null;
        throw error;
      });

    return state.bibleListPromise;
  }

  async function findBibleId(version) {
    if (state.bibleIds[version]) {
      return state.bibleIds[version];
    }

    const versions = {
      NIV: ['NIV', 'NEW INTERNATIONAL VERSION'],
      NKJV: ['NKJV', 'NEW KING JAMES VERSION'],
      NLT: ['NLT', 'NEW LIVING TRANSLATION']
    };

    const candidates = versions[version] || [];
    const bibles = await getBibleList();

    const exact = bibles.find(bible => {
      const abbreviation =
        `${bible.abbreviationLocal || ''} ${bible.abbreviation || ''}`
          .toUpperCase();

      return candidates.some(candidate =>
        abbreviation.split(/\s+/).includes(candidate)
      );
    });

    const named = exact || bibles.find(bible => {
      const name =
        `${bible.nameLocal || ''} ${bible.name || ''}`
          .toUpperCase();

      return candidates.some(candidate =>
        name.includes(candidate)
      );
    });

    if (!named) {
      throw new Error(
        `${version} is not available for this API.Bible account.`
      );
    }

    state.bibleIds[version] = named.id;

    return named.id;
  }

  async function loadSelectedTranslation() {
    const version = state.version;
    const verse = getCurrentVerse();

    if (version === 'KJV') {
      renderLocalVerse();
      return;
    }

    if (!state.apiKey) {
      renderLocalVerse(
        'Add an API.Bible key in Settings to display this translation. The built-in KJV remains available.'
      );
      return;
    }

    const cacheKey = `${version}:${verse.id}`;

    if (state.bibleCache.has(cacheKey)) {
      const cached = state.bibleCache.get(cacheKey);

      applyApiVerse(
        verse,
        version,
        cached.text,
        cached.copyright
      );

      return;
    }

    const requestId = ++state.currentRequest;

    el.verseCopyright.textContent =
      'Loading selected translation…';

    try {
      const bibleId = await findBibleId(version);

      const url =
        `https://rest.api.bible/v1/bibles/${encodeURIComponent(bibleId)}` +
        `/passages/${encodeURIComponent(verse.id)}` +
        '?content-type=text&include-titles=false&include-verse-numbers=false';

      const response = await fetch(url, {
        headers: {
          'api-key': state.apiKey
        }
      });

      if (!response.ok) {
        throw new Error(
          `The ${version} passage could not be loaded (${response.status}).`
        );
      }

      const result = await response.json();

      const text = cleanApiText(
        result?.data?.content || ''
      );

      if (!text) {
        throw new Error(
          `No text was returned for ${verse.ref}.`
        );
      }

      const payload = {
        text,
        copyright: result.data.copyright || ''
      };

      state.bibleCache.set(cacheKey, payload);

      if (
        requestId === state.currentRequest &&
        version === state.version &&
        verse === getCurrentVerse()
      ) {
        applyApiVerse(
          verse,
          version,
          payload.text,
          payload.copyright
        );
      }

    } catch (error) {
      if (requestId === state.currentRequest) {
        renderLocalVerse(
          `${error.message} Showing the KJV fallback instead.`
        );

        showToast(error.message);
      }
    }
  }

  function applyApiVerse(
    verse,
    version,
    text,
    copyright
  ) {
    el.verseText.textContent = `“${text}”`;
    el.verseReference.textContent =
      `${verse.ref} · ${version}`;
    el.verseCopyright.textContent = copyright;
  }

  function setVersion(version) {
    state.version = version;
    el.bibleVersion.value = version;

    if (version === 'KJV') {
      el.versionHint.textContent =
        'KJV verses are included and ready to use.';

      renderLocalVerse();

    } else if (!state.apiKey) {
      el.versionHint.textContent =
        `Add an API.Bible key in Settings to fetch ${version}.`;

      renderLocalVerse(
        `Add an API.Bible key in Settings to display ${version}. Showing KJV fallback.`
      );

    } else {
      el.versionHint.textContent =
        `${version} will load from the translations available to your API.Bible key.`;

      loadSelectedTranslation();
    }

    persistPreferences();
  }

  function advanceVerse(direction = 1, resetInterval = true) {
    state.verseIndex =
      (state.verseIndex + direction + VERSES.length) %
      VERSES.length;

    renderLocalVerse();

    if (state.version !== 'KJV') {
      loadSelectedTranslation();
    }

    if (resetInterval) {
      state.verseElapsedMs = 0;
    }
  }

  // ----------------------------------------------------
  // SESSION CLOCK AND BREAK SCHEDULER
  // ----------------------------------------------------

  function currentPhase() {
    return state.plan[state.phaseIndex] || null;
  }

  function renderPhase() {
    const phase = currentPhase();
    const isBreak = phase?.type === 'break';

    el.verseCard.hidden = isBreak;
    el.breakStage.hidden = !isBreak;
    el.topClock.hidden = isBreak;
    el.breakClockCard.hidden = true;

    el.topClockCaption.textContent = 'SESSION LEFT';

    if (!phase) {
      return;
    }

    if (isBreak) {
      el.phaseLabel.textContent = 'A MOMENT TO REST';

      el.breakProgressLabel.textContent =
        `BREAK ${phase.breakNumber} OF ${state.plan.filter(item => item.type === 'break').length}`;

      el.blockInfo.textContent =
        `Break ${phase.breakNumber} of ${state.plan.filter(item => item.type === 'break').length}`;

    } else {
      el.phaseLabel.textContent = 'A MOMENT TO FOCUS';

      el.blockInfo.textContent =
        `Focus block ${phase.focusNumber} of ${state.plan.filter(item => item.type === 'focus').length}`;
    }

    updateClockAndProgress();
  }

  function updateClockAndProgress() {
    el.topClockValue.textContent =
      formatTime(state.remainingMs);

    el.breakClockValue.textContent =
      formatTime(state.phaseRemainingMs);

    el.breakStageTime.textContent =
      formatTime(state.phaseRemainingMs);

    const progress = state.totalMs > 0
      ? clamp(
          (1 - state.remainingMs / state.totalMs) * 100,
          0,
          100
        )
      : 0;

    el.progressFill.style.width = `${progress}%`;
    el.progressPercent.textContent =
      `${Math.floor(progress)}%`;

    const clockSeconds = Math.max(
      0,
      Math.ceil(state.remainingMs / 1000)
    );

    const clockMinutes =
      Math.floor((clockSeconds % 3600) / 60);

    const clockHours =
      Math.floor(clockSeconds / 3600);

    el.topClock.style.setProperty(
      '--clock-minute-angle',
      `${clockMinutes * 6}deg`
    );

    el.topClock.style.setProperty(
      '--clock-hour-angle',
      `${(clockHours % 12) * 30 + clockMinutes / 2}deg`
    );

    const phase = currentPhase();

    if (phase?.type === 'focus') {
      const minutes = Math.ceil(
        state.remainingMs / 60000
      );

      el.remainingPlan.textContent =
        `${minutes} minute${minutes === 1 ? '' : 's'} remaining`;

    } else if (phase?.type === 'break') {
      el.remainingPlan.textContent =
        `${Math.ceil(state.remainingMs / 60000)} minutes remaining`;
    }
  }

  function stepToNextPhase() {
    state.phaseIndex += 1;

    if (state.phaseIndex >= state.plan.length) {
      finishSession();
      return;
    }

    state.phaseRemainingMs =
      state.plan[state.phaseIndex].duration;

    renderPhase();
  }

  function tick() {
    if (!state.running) {
      return;
    }

    const now = Date.now();

    let delta = Math.max(
      0,
      now - state.lastTickAt
    );

    state.lastTickAt = now;

    while (delta > 0 && state.running) {
      const phase = currentPhase();

      if (!phase) {
        finishSession();
        break;
      }

      const consumed = Math.min(
        delta,
        state.phaseRemainingMs,
        state.remainingMs
      );

      state.phaseRemainingMs -= consumed;
      state.remainingMs -= consumed;
      delta -= consumed;

      if (phase.type === 'focus') {
        state.verseElapsedMs += consumed;

        while (
          state.verseElapsedMs >= state.verseIntervalMs &&
          state.running
        ) {
          state.verseElapsedMs -= state.verseIntervalMs;
          advanceVerse(1, false);
        }
      }

      if (state.remainingMs <= 0) {
        finishSession();
        break;
      }

      if (state.phaseRemainingMs <= 0) {
        stepToNextPhase();
      }
    }

    updateClockAndProgress();
  }

  // ----------------------------------------------------
  // MUSIC CONTROL — SESSION START AND STOP
  // ----------------------------------------------------

  function stopMusicPlayback() {
    // Disable automatic restarts BEFORE pausing the audio.
    // This prevents queued "ended" events from starting music again.
    state.musicAllowed = false;

    // Stop local audio.
    el.audio.pause();

    // Disable loop until another session is started.
    el.audio.loop = false;

    // Rewind the current track.
    try {
      el.audio.currentTime = 0;
    } catch (_) {
      // The audio metadata might not have loaded yet.
    }

    setMusicPlaying(false);

    // Spotify is cross-origin. We cannot directly call pause()
    // inside its player, so unload the embedded player instead.
    if (state.spotifyEmbedUrl) {
      el.spotifyEmbed.src = 'about:blank';
    }
  }

  function restoreSpotifyEmbed() {
    if (state.spotifyEmbedUrl) {
      el.spotifyEmbedWrap.hidden = false;

      if (
        el.spotifyEmbed.getAttribute('src') === 'about:blank'
      ) {
        el.spotifyEmbed.src = state.spotifyEmbedUrl;
      }
    }
  }

  function finishSession() {
    // This stops both the local audio and the Spotify iframe.
    stopMusicPlayback();

    state.running = false;
    state.started = false;

    window.clearInterval(state.timerId);
    state.timerId = null;

    state.remainingMs = 0;
    state.phaseRemainingMs = 0;

    el.progressFill.style.width = '100%';
    el.progressPercent.textContent = '100%';

    el.topClock.hidden = false;
    el.breakClockCard.hidden = true;
    el.breakStage.hidden = true;
    el.verseCard.hidden = false;

    el.topClockValue.textContent = '00:00';

    el.phaseLabel.textContent = 'SESSION COMPLETE';

    el.blockInfo.textContent =
      'You made space for what matters';

    el.remainingPlan.textContent =
      'Well done. Take this peace with you.';

    el.pauseSession.innerHTML =
      'Completed <span aria-hidden="true">✓</span>';

    el.pauseSession.disabled = true;

    el.verseKicker.textContent =
      'A MOMENT TO GIVE THANKS';

    el.verseText.textContent =
      '“Well done, thou good and faithful servant.”';

    el.verseReference.textContent =
      'MATTHEW 25:21 · KJV';

    el.verseCopyright.textContent =
      'Your focus session is complete.';

    showToast(
      'Your session is complete. Grace for the next small step.'
    );
  }

  function startSession() {
    buildPlan();

    // Music is only allowed while a session is active.
    state.musicAllowed = true;

    state.started = true;
    state.running = true;
    state.lastTickAt = Date.now();

    el.pauseSession.disabled = false;

    el.pauseSession.innerHTML =
      'Pause session <span aria-hidden="true">Ⅱ</span>';

    renderPhase();
    renderLocalVerse();

    if (state.version !== 'KJV') {
      loadSelectedTranslation();
    }

    showView('session');

    restoreSpotifyEmbed();

    if (state.timerId) {
      window.clearInterval(state.timerId);
    }

    state.timerId = window.setInterval(tick, 250);

    updateClockAndProgress();

    // Play the selected local track when the browser permits it.
    if (el.audio.src && el.audio.paused) {
      el.audio.play().catch(() => {
        // The user can tap the play button manually if required.
      });
    }

    persistPreferences();
  }

  function togglePause() {
    if (!state.started) {
      return;
    }

    if (state.running) {
      state.running = false;

      el.pauseSession.innerHTML =
        'Resume session <span aria-hidden="true">▶</span>';

      showToast('Session paused. Take your time.');

    } else {
      state.running = true;
      state.lastTickAt = Date.now();

      el.pauseSession.innerHTML =
        'Pause session <span aria-hidden="true">Ⅱ</span>';

      showToast('Your focus session has resumed.');
    }
  }

  function endSession() {
    if (
      state.started &&
      !window.confirm(
        'End this focus session and return to your setup?'
      )
    ) {
      return;
    }

    // Stop all music before resetting the timer.
    stopMusicPlayback();

    state.running = false;
    state.started = false;

    if (state.timerId) {
      window.clearInterval(state.timerId);
    }

    state.timerId = null;

    el.pauseSession.disabled = false;

    el.pauseSession.innerHTML =
      'Pause session <span aria-hidden="true">Ⅱ</span>';

    el.topClock.hidden = false;
    el.breakStage.hidden = true;
    el.breakClockCard.hidden = true;
    el.verseCard.hidden = false;

    state.remainingMs = state.totalMs;
    state.phaseIndex = 0;

    state.phaseRemainingMs =
      state.plan[0]?.duration || state.totalMs;

    el.topClockValue.textContent =
      formatTime(state.remainingMs);

    el.progressFill.style.width = '0%';
    el.progressPercent.textContent = '0%';

    el.phaseLabel.textContent = 'A MOMENT TO FOCUS';

    el.verseKicker.textContent =
      'A WORD FOR THIS MOMENT';

    renderLocalVerse();

    showView('home');
  }

  // ----------------------------------------------------
  // MUSIC PLAYLIST
  // ----------------------------------------------------

  function saveAudioLinks() {
    // Only URL tracks can survive a page reload.
    // Device file object URLs are temporary.
    const durableTracks = state.playlist
      .filter(track => track.kind === 'url')
      .map(track => ({
        title: track.title,
        url: track.url,
        kind: 'url'
      }));

    localStorage.setItem(
      STORAGE.audioTracks,
      JSON.stringify(durableTracks)
    );
  }

  function populatePlaylist() {
    el.playlist.innerHTML = '';

    if (!state.playlist.length) {
      const option = document.createElement('option');

      option.value = '';
      option.textContent = 'Choose an audio track';

      el.playlist.append(option);

      state.trackIndex = -1;
      el.trackTitle.textContent = 'Your quiet playlist';

      return;
    }

    state.playlist.forEach((track, index) => {
      const option = document.createElement('option');

      option.value = String(index);
      option.textContent = track.title;

      el.playlist.append(option);
    });

    if (
      state.trackIndex >= 0 &&
      state.trackIndex < state.playlist.length
    ) {
      el.playlist.value = String(state.trackIndex);
    }
  }

  function loadTrack(index, autoplay = false) {
    if (!state.playlist.length) {
      showToast('Add an audio URL or choose a file first.');
      el.musicOptions.hidden = false;
      return;
    }

    // Wrap around the playlist.
    const safeIndex =
      (index + state.playlist.length) %
      state.playlist.length;

    state.trackIndex = safeIndex;

    const track = state.playlist[safeIndex];

    el.audio.pause();

    // THE REPEAT FIX:
    // One song uses the browser's native loop property.
    // Multiple songs use the ended event to move to the next song.
    el.audio.loop = state.playlist.length === 1;

    el.audio.src = track.url;
    el.audio.load();

    el.trackTitle.textContent = track.title;
    el.playlist.value = String(safeIndex);

    if (autoplay) {
      if (!state.musicAllowed) {
        showToast(
          'Start a focus session before playing your music.'
        );
        return;
      }

      el.audio.play().catch(() => {
        showToast(
          'Tap play to allow audio in this browser.'
        );
      });
    }
  }

  function setMusicPlaying(playing) {
    el.musicDock.classList.toggle('playing', playing);

    el.toggleMusic.textContent =
      playing ? 'Ⅱ' : '▶';

    el.toggleMusic.setAttribute(
      'aria-label',
      playing ? 'Pause music' : 'Play music'
    );

    if (playing) {
      el.musicStatus.textContent =
        'Now playing from your audio playlist';

    } else if (state.playlist.length) {
      el.musicStatus.textContent =
        'Your audio playlist is ready';

    } else if (state.spotifyUrl) {
      el.musicStatus.textContent =
        'Spotify playlist loaded — use its player controls';

    } else {
      el.musicStatus.textContent =
        'Add your own audio or a Spotify playlist';
    }
  }

  function addTrack(url, title, kind = 'url') {
    if (!url) {
      return;
    }

    state.playlist.push({
      url,
      title: title || `Track ${state.playlist.length + 1}`,
      kind
    });

    state.trackIndex = state.playlist.length - 1;

    populatePlaylist();

    loadTrack(state.trackIndex, false);

    if (kind === 'url') {
      saveAudioLinks();
    }

    showToast(`Added: ${title || 'audio track'}`);
  }

  function toggleMusic() {
    if (!state.musicAllowed) {
      showToast(
        'Start a focus session before playing your music.'
      );
      return;
    }

    if (!el.audio.src) {
      if (state.playlist.length) {
        loadTrack(
          state.trackIndex < 0 ? 0 : state.trackIndex,
          true
        );
      } else {
        el.musicOptions.hidden = false;

        showToast(
          'Add an audio track or connect a Spotify playlist.'
        );
      }

      return;
    }

    if (el.audio.paused) {
      el.audio.play().catch(() => {
        showToast('This audio source could not be played.');
      });
    } else {
      el.audio.pause();
    }
  }

  // ----------------------------------------------------
  // SPOTIFY EMBED
  // ----------------------------------------------------

  function normalizeSpotifyEmbed(value) {
    const raw = value.trim();

    if (!raw) {
      return null;
    }

    const uriMatch = raw.match(
      /^spotify:(playlist|album|track|artist|show|episode):([A-Za-z0-9]+)$/
    );

    const embedTheme =
      state.theme === 'dusk' ? 0 : 1;

    if (uriMatch) {
      return (
        `https://open.spotify.com/embed/${uriMatch[1]}/${uriMatch[2]}` +
        `?utm_source=generator&theme=${embedTheme}`
      );
    }

    try {
      const parsed = new URL(raw);

      if (
        ![
          'open.spotify.com',
          'spotify.com',
          'www.spotify.com'
        ].includes(parsed.hostname)
      ) {
        return null;
      }

      const match = parsed.pathname.match(
        /^\/(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]+)/
      );

      if (!match) {
        return null;
      }

      return (
        `https://open.spotify.com/embed/${match[1]}/${match[2]}` +
        `?utm_source=generator&theme=${embedTheme}`
      );

    } catch (_) {
      return null;
    }
  }

  // ----------------------------------------------------
  // SETTINGS AND API.BIBLE
  // ----------------------------------------------------

  function openSettings() {
    el.apiBibleKey.value = state.apiKey;

    el.apiKeyStatus.textContent = state.apiKey
      ? 'An API.Bible key is saved in this browser.'
      : 'No API key added. KJV will work without one.';

    if (typeof el.settingsDialog.showModal === 'function') {
      el.settingsDialog.showModal();
    } else {
      showToast(
        'Your browser does not support the settings dialog.'
      );
    }
  }

  function saveApiKey() {
    const key = el.apiBibleKey.value.trim();

    state.apiKey = key;
    state.bibleListPromise = null;
    state.bibleIds = {};
    state.bibleCache.clear();

    if (key) {
      localStorage.setItem(STORAGE.key, key);

      el.apiKeyStatus.textContent =
        'Key saved in this browser. Choose a translation to test access.';

      showToast('API.Bible key saved on this device.');

      if (state.version !== 'KJV') {
        loadSelectedTranslation();
      }

    } else {
      localStorage.removeItem(STORAGE.key);

      el.apiKeyStatus.textContent =
        'No API key added. KJV will work without one.';

      renderLocalVerse(
        'API key removed. Showing the built-in KJV text.'
      );
    }
  }

  // ----------------------------------------------------
  // RESTORE SAVED SETTINGS
  // ----------------------------------------------------

  function restorePreferences() {
    try {
      const saved = JSON.parse(
        localStorage.getItem(STORAGE.preferences) || '{}'
      );

      if (saved.sessionMinutes) {
        el.sessionMinutes.value = clamp(
          Number(saved.sessionMinutes),
          10,
          240
        );
      }

      if (saved.breakMinutes) {
        el.breakMinutes.value = clamp(
          Number(saved.breakMinutes),
          1,
          20
        );
      }

      if (saved.verseInterval) {
        el.verseInterval.value = saved.verseInterval;
      }

      if (
        ['KJV', 'NIV', 'NKJV', 'NLT'].includes(saved.version)
      ) {
        el.bibleVersion.value = saved.version;
      }

      if (saved.clockStyle) {
        state.clockStyle = saved.clockStyle;
      }

    } catch (_) {
      // Ignore malformed saved settings.
    }

    setTheme(state.theme);
    setClockStyle(state.clockStyle);

    scheduleSuggestion();

    setVersion(el.bibleVersion.value);
  }

  // ----------------------------------------------------
  // EVENT LISTENERS
  // ----------------------------------------------------

  function wireEvents() {

    // Home navigation.
    $('#beginSetup').addEventListener('click', () => {
      $('#setupTitle').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    });

    $('#exploreSession').addEventListener('click', event => {
      event.preventDefault();
      showView('session');
    });

    el.navLinks.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();

        showView(
          link.dataset.nav === 'session'
            ? 'session'
            : 'home'
        );
      });
    });

    // Settings.
    $('#openSettings').addEventListener(
      'click',
      openSettings
    );

    $('#closeSettings').addEventListener('click', () => {
      el.settingsDialog.close();
    });

    $('#saveBibleKey').addEventListener(
      'click',
      saveApiKey
    );

    $('#clearBibleKey').addEventListener('click', () => {
      el.apiBibleKey.value = '';
      saveApiKey();
    });

    // Session length and breaks.
    el.sessionMinutes.addEventListener('input', () => {
      scheduleSuggestion();
      persistPreferences();

      $$('.preset-chip').forEach(button => {
        button.classList.toggle(
          'selected',
          Number(button.dataset.minutes) ===
            Number(el.sessionMinutes.value)
        );
      });
    });

    el.breakMinutes.addEventListener('input', () => {
      scheduleSuggestion();
      persistPreferences();
    });

    $$('.preset-chip').forEach(button => {
      button.addEventListener('click', () => {
        el.sessionMinutes.value =
          button.dataset.minutes;

        $$('.preset-chip').forEach(item => {
          item.classList.toggle(
            'selected',
            item === button
          );
        });

        scheduleSuggestion();
        persistPreferences();
      });
    });

    // Bible settings.
    el.verseInterval.addEventListener('change', () => {
      state.verseIntervalMs =
        Number(el.verseInterval.value) * 60000;

      state.verseElapsedMs = 0;

      persistPreferences();
    });

    el.bibleVersion.addEventListener('change', () => {
      setVersion(el.bibleVersion.value);
    });

    // Colour themes.
    $$('.theme-choice').forEach(button => {
      button.addEventListener('click', () => {
        setTheme(button.dataset.theme);
      });
    });

    // Focus session controls.
    el.startSession.addEventListener(
      'click',
      startSession
    );

    el.pauseSession.addEventListener(
      'click',
      togglePause
    );

    el.resetSession.addEventListener(
      'click',
      endSession
    );

    // Scripture navigation.
    el.nextVerse.addEventListener('click', () => {
      advanceVerse(1);
    });

    el.previousVerse.addEventListener('click', () => {
      advanceVerse(-1);
    });

    // Clock styles.
    el.topClock.addEventListener(
      'click',
      cycleClockStyle
    );

    el.clockStyleSelect.addEventListener('change', () => {
      setClockStyle(el.clockStyleSelect.value);
    });

    // Full-screen mode.
    $('#fullscreenButton').addEventListener(
      'click',
      async () => {
        try {
          if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
          } else {
            await document.exitFullscreen();
          }
        } catch (_) {
          showToast(
            'Full screen is not available in this browser.'
          );
        }
      }
    );

    // Music options panel.
    $('#openMusicOptions').addEventListener('click', () => {
      el.musicOptions.hidden = !el.musicOptions.hidden;
    });

    // Add music through a direct audio URL.
    $('#addAudioUrl').addEventListener('click', () => {
      const url = el.audioUrl.value.trim();

      if (!/^https?:\/\//i.test(url)) {
        showToast(
          'Enter a direct http(s) audio file URL.'
        );
        return;
      }

      let title = url.split('/').pop().split('?')[0] ||
        'Audio track';

      try {
        title = decodeURIComponent(title);
      } catch (_) {
        // Keep the original title if it is not valid encoded text.
      }

      addTrack(url, title, 'url');

      el.audioUrl.value = '';
      el.musicOptions.hidden = false;
    });

    // Add audio files from the device.
    el.audioFiles.addEventListener('change', event => {
      Array.from(event.target.files || []).forEach(file => {
        const url = URL.createObjectURL(file);

        state.fileObjectUrls.push(url);

        addTrack(url, file.name, 'file');
      });

      event.target.value = '';
    });

    // Previous and next music tracks.
    $('#previousTrack').addEventListener('click', () => {
      loadTrack(state.trackIndex - 1, true);
    });

    $('#nextTrack').addEventListener('click', () => {
      loadTrack(state.trackIndex + 1, true);
    });

    el.toggleMusic.addEventListener(
      'click',
      toggleMusic
    );

    // Choosing a track from the playlist.
    el.playlist.addEventListener('change', () => {
      if (el.playlist.value !== '') {
        loadTrack(
          Number(el.playlist.value),
          false
        );
      }
    });

    // Update the circular music player when audio starts or pauses.
    el.audio.addEventListener('play', () => {
      setMusicPlaying(true);
    });

    el.audio.addEventListener('pause', () => {
      setMusicPlaying(false);
    });

    // IMPORTANT MUSIC REPEAT FIX.
    //
    // One song: native audio.loop repeats it continuously.
    //
    // Multiple songs: when a track ends, move to the next one.
    // When the last track ends, loadTrack wraps back to track one.
    //
    // If the session has ended, do not restart anything.

    el.audio.addEventListener('ended', () => {

      if (!state.musicAllowed || !state.started) {
        setMusicPlaying(false);
        return;
      }

      if (state.playlist.length > 1) {

        // Advance to the next song and wrap around.
        loadTrack(state.trackIndex + 1, true);

      } else if (state.playlist.length === 1) {

        // Backup loop for browsers that don't honour native looping.
        el.audio.currentTime = 0;

        el.audio.play().catch(() => {
          setMusicPlaying(false);
        });

      } else {
        setMusicPlaying(false);
      }

    });

    // Spotify player.
    $('#loadSpotify').addEventListener('click', () => {
      const raw = el.spotifyUrl.value.trim();

      const embedUrl =
        normalizeSpotifyEmbed(raw);

      if (!embedUrl) {
        showToast(
          'Paste a valid Spotify playlist, album, track or artist link.'
        );
        return;
      }

      state.spotifyEmbedUrl = embedUrl;

      el.spotifyEmbed.src = embedUrl;
      el.spotifyEmbedWrap.hidden = false;

      state.spotifyUrl = raw;

      localStorage.setItem(
        STORAGE.spotify,
        raw
      );

      showToast(
        'Spotify player loaded. Start playback inside the player.'
      );
    });

    // Close settings by clicking outside the dialog.
    el.settingsDialog.addEventListener('click', event => {
      if (event.target === el.settingsDialog) {
        el.settingsDialog.close();
      }
    });
  }

  // ----------------------------------------------------
  // INITIALISE MUSIC AND RESTORE PLAYLIST
  // ----------------------------------------------------

  function initMusic() {
    try {
      const savedTracks = JSON.parse(
        localStorage.getItem(STORAGE.audioTracks) || '[]'
      );

      if (Array.isArray(savedTracks)) {
        savedTracks
          .filter(track =>
            track && /^https?:\/\//i.test(track.url)
          )
          .forEach(track => {
            state.playlist.push(track);
          });
      }

    } catch (_) {
      // Ignore malformed saved playlists.
    }

    populatePlaylist();

    if (state.playlist.length) {
      loadTrack(0, false);

      el.musicStatus.textContent =
        'Your saved audio playlist is ready';
    }

    if (state.spotifyUrl) {
      el.spotifyUrl.value = state.spotifyUrl;

      const embed =
        normalizeSpotifyEmbed(state.spotifyUrl);

      if (embed) {
        state.spotifyEmbedUrl = embed;

        el.spotifyEmbed.src = embed;
        el.spotifyEmbedWrap.hidden = false;
      }
    }

    setMusicPlaying(false);
  }

  // ----------------------------------------------------
  // START THE WEBSITE
  // ----------------------------------------------------

  restorePreferences();

  wireEvents();

  initMusic();

  renderLocalVerse();

  el.topClockValue.textContent = '60:00';

  showView('home');

})();