// מנוע השמעה קולית מתקדם המבוסס על קובצי MP3 מקומיים מ-Google Translate, עם גיבוי Google TTS API ישיר ו-Web Speech
import * as googleTTS from 'google-tts-api';

let activeAudioStream = null;

// יצירת שם קובץ (Slug) אחיד עבור כל מילה או משפט
export function getAudioSlug(text) {
  if (!text) return '';
  const clean = text.toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/[\u0590-\u05FF]/g, '')
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  return clean || 'audio';
}

/**
 * מעבד פונטי מתקדם לשפה הפיליפינית (Tagalog Phonetic Normalizer)
 */
export const preprocessTagalogAudioText = (text) => {
  if (!text) return '';

  let clean = text
    .replace(/\(.*?\)/g, '')
    .replace(/[\u0590-\u05FF]/g, '')
    .replace(/'t\b/gi, ' at ') // המרת מקף 't לחיבור at בהגייה
    .replace(/[^\w\s-]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  if (!clean) return text.trim().replace(/[^\w\s]/gi, '');

  clean = clean
    .replace(/\b1000\b/g, 'isang libong')
    .replace(/\b500\b/g, 'limang daang')
    .replace(/\b400\b/g, 'apat na daang')
    .replace(/\b300\b/g, 'tatlong daang')
    .replace(/\b250\b/g, 'dalawang daan at limangpong')
    .replace(/\b200\b/g, 'dalawang daang')
    .replace(/\b100\b/g, 'isang daang')
    .replace(/\b50\b/g, 'limangpong')
    .replace(/\b40\b/g, 'apatnapong')
    .replace(/\b30\b/g, 'tatlumpong')
    .replace(/\b20\b/g, 'dalawampong')
    .replace(/\b10\b/g, 'sampong')
    .replace(/\b5\b/g, 'limang')
    .replace(/\b4\b/g, 'apat na')
    .replace(/\b3\b/g, 'tatlong')
    .replace(/\b2\b/g, 'dalawang')
    .replace(/\b1\b/g, 'isang');

  clean = clean.replace(/\bng\b/gi, 'nang');
  clean = clean.replace(/\bmga\b/gi, 'manga');

  const phoneticReplacements = [
    { pattern: /\bsampu\b/gi, replacement: 'sampo' },
    { pattern: /\bdalawampu\b/gi, replacement: 'dalawampo' },
    { pattern: /\btatlumpu\b/gi, replacement: 'tatlumpo' },
    { pattern: /\bapatnapu\b/gi, replacement: 'apatnapo' },
    { pattern: /\blimangpu\b/gi, replacement: 'limangpo' },
    { pattern: /\banimnapu\b/gi, replacement: 'animnapo' },
    { pattern: /\bpitumpu\b/gi, replacement: 'pitungpo' },
    { pattern: /\bwalumpu\b/gi, replacement: 'walumpo' },
    { pattern: /\bsiyamnapu\b/gi, replacement: 'siyamnapo' },
    { pattern: /\blabing-isa\b/gi, replacement: 'labing eesa' },
    { pattern: /\blabindalawa\b/gi, replacement: 'labin dalawa' },
    { pattern: /\blabintatlo\b/gi, replacement: 'labin tatlo' },
    { pattern: /\blabing-apat\b/gi, replacement: 'labing apat' },
    { pattern: /\blabing-lima\b/gi, replacement: 'labing lima' },
    { pattern: /\blabing-anim\b/gi, replacement: 'labing anim' },
    { pattern: /\blabimpito\b/gi, replacement: 'labim pito' },
    { pattern: /\blabingwalo\b/gi, replacement: 'labing walo' },
    { pattern: /\blabinsiyam\b/gi, replacement: 'labin syam' },
    { pattern: /\bkuwatro\b/gi, replacement: 'kwatro' },
    { pattern: /\bsingko\b/gi, replacement: 'singko' },
    { pattern: /\bsais\b/gi, replacement: 'sa-ees' },
    { pattern: /\bsiyete\b/gi, replacement: 'syete' },
    { pattern: /\botsyo\b/gi, replacement: 'otsho' },
    { pattern: /\bniyebe\b/gi, replacement: 'nwebe' },
    { pattern: /\bnuwebe\b/gi, replacement: 'nwebe' },
    { pattern: /\bdiyes\b/gi, replacement: 'dyes' },
    { pattern: /\bbente\b/gi, replacement: 'bente' },
    { pattern: /\bsingkuwenta\b/gi, replacement: 'singkwenta' },
    { pattern: /\bciento\b/gi, replacement: 'syento' }
  ];

  phoneticReplacements.forEach(({ pattern, replacement }) => {
    clean = clean.replace(pattern, replacement);
  });

  return clean;
};

export const getGoogleTTSUrl = (text) => {
  const slug = getAudioSlug(text);
  return `/audio/words/${slug}.mp3`;
};

export const setVoiceProfile = () => {};
export const getVoiceProfile = () => 'google_translate';

/**
 * פונקציית גיבוי ב-Web Speech API
 */
const speakWebSpeechFallback = (cleanText, onEnd) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      window.speechSynthesis.resume();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      const voices = window.speechSynthesis.getVoices() || [];
      
      // חיפוש קול מתאים
      const tagalogVoice = voices.find(v => v.lang.includes('fil') || v.lang.includes('tl') || v.name.toLowerCase().includes('filipino'));
      const SpanishVoice = voices.find(v => v.lang.includes('es'));
      const englishVoice = voices.find(v => v.lang.includes('en'));

      if (tagalogVoice) {
        utterance.voice = tagalogVoice;
        utterance.lang = tagalogVoice.lang;
      } else if (SpanishVoice) {
        utterance.voice = SpanishVoice;
        utterance.lang = 'es-ES';
      } else if (englishVoice) {
        utterance.voice = englishVoice;
        utterance.lang = 'en-US';
      } else {
        utterance.lang = 'en-US';
      }

      utterance.rate = 0.9;
      utterance.onend = () => {
        activeAudioStream = null;
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        activeAudioStream = null;
        if (onEnd) onEnd();
      };
      window.speechSynthesis.speak(utterance);
      return;
    } catch (e) {
      if (onEnd) onEnd();
    }
  } else if (onEnd) {
    onEnd();
  }
};

/**
 * פונקציית גיבוי ב-Google Translate TTS ישיר / Base64 במידה וקובץ MP3 מקומי חסר
 */
async function fallbackPlay(cleanText, onEnd) {
  // 1. ניסיון השמעה ישירה דרך Google Translate TTS URL
  try {
    const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=tl&client=tw-ob`;
    const audio = new Audio(ttsUrl);
    activeAudioStream = audio;

    audio.onended = () => {
      activeAudioStream = null;
      if (onEnd) onEnd();
    };

    audio.onerror = async () => {
      // 2. ניסיון Base64
      try {
        const base64Data = await googleTTS.getAudioBase64(cleanText, {
          lang: 'tl',
          slow: false,
          host: 'https://translate.google.com',
          timeout: 4000,
        });
        if (base64Data) {
          const dataUri = `data:audio/mp3;base64,${base64Data}`;
          const bAudio = new Audio(dataUri);
          activeAudioStream = bAudio;
          bAudio.onended = () => { activeAudioStream = null; if (onEnd) onEnd(); };
          await bAudio.play();
          return;
        }
      } catch (err) {}

      speakWebSpeechFallback(cleanText, onEnd);
    };

    const promise = audio.play();
    if (promise !== undefined) {
      promise.catch(async () => {
        speakWebSpeechFallback(cleanText, onEnd);
      });
    }
    return;
  } catch (err) {}

  speakWebSpeechFallback(cleanText, onEnd);
}

/**
 * פונקציית ההשמעה הראשית:
 */
export const speakTagalog = async (text, options = {}) => {
  const { onStart, onEnd } = options;
  if (!text) return;

  if (activeAudioStream) {
    try {
      activeAudioStream.pause();
      activeAudioStream.currentTime = 0;
    } catch (e) {}
    activeAudioStream = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try { window.speechSynthesis.cancel(); } catch (e) {}
  }

  const cleanText = preprocessTagalogAudioText(text);
  if (!cleanText) return;

  if (onStart) onStart();

  const slug = getAudioSlug(text);
  const localMp3Url = `/audio/words/${slug}.mp3`;

  // 1. ניסיון קובץ MP3 מקומי במידה וקיים
  try {
    const audio = new Audio(localMp3Url);
    activeAudioStream = audio;

    audio.onended = () => {
      activeAudioStream = null;
      if (onEnd) onEnd();
    };

    audio.onerror = async () => {
      await fallbackPlay(cleanText, onEnd);
    };

    const promise = audio.play();
    if (promise !== undefined) {
      promise.catch(async () => {
        await fallbackPlay(cleanText, onEnd);
      });
    }
  } catch (e) {
    await fallbackPlay(cleanText, onEnd);
  }
};
