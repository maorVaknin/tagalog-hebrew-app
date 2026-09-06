import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import * as googleTTS from 'google-tts-api';
import { courseData } from '../src/data/courseData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.join(__dirname, '../public/audio/words');

// 1. יצירת תיקיית public/audio/words אם אינה קיימת
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// מעבד פונטי לטקסט פיליפיני
function preprocessTagalogAudioText(text) {
  if (!text) return '';
  let clean = text
    .replace(/\(.*?\)/g, '')
    .replace(/[\u0590-\u05FF]/g, '')
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
    { pattern: /\bciento\b/gi, replacement: 'syento' },
    { pattern: /\bopo\b/gi, replacement: 'o-po' },
    { pattern: /\bpaalam\b/gi, replacement: 'pa-alam' },
    { pattern: /\bsaan\b/gi, replacement: 'sa-an' },
    { pattern: /\bkailan\b/gi, replacement: 'ka-ilan' },
    { pattern: /\bpaano\b/gi, replacement: 'pa-ano' },
    { pattern: /\boo\b/gi, replacement: 'o-o' },
    { pattern: /\bpakiusap\b/gi, replacement: 'paki-usap' },
    { pattern: /\bpahingi\b/gi, replacement: 'pa-hingi' }
  ];

  phoneticReplacements.forEach(({ pattern, replacement }) => {
    clean = clean.replace(pattern, replacement);
  });

  return clean;
}

// יצירת שם קובץ תקני (Slug)
export function getAudioSlug(text) {
  if (!text) return 'empty';
  const clean = text.toLowerCase()
    .replace(/\(.*?\)/g, '')
    .replace(/[\u0590-\u05FF]/g, '')
    .replace(/[^a-z0-9]/gi, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  return clean || 'audio';
}

// 2. איסוף כל הטקסטים שצריך להוריד
const textSet = new Set();

// איסוף אוצר מילים
courseData.units.forEach(unit => {
  unit.lessons.forEach(lesson => {
    lesson.vocabulary.forEach(vocab => {
      if (vocab.tagalog) textSet.add(vocab.tagalog);
      if (vocab.exampleSentence && vocab.exampleSentence.tagalog) {
        textSet.add(vocab.exampleSentence.tagalog);
      }
    });
    if (lesson.grammarNote && lesson.grammarNote.examples) {
      lesson.grammarNote.examples.forEach(ex => {
        if (ex.tagalog) textSet.add(ex.tagalog);
      });
    }
  });
});

// איסוף תרחישי שיחה
courseData.scenarios.forEach(sc => {
  if (sc.initialMessageTagalog) textSet.add(sc.initialMessageTagalog);
  if (sc.userOptions) {
    sc.userOptions.forEach(opt => {
      if (opt.textTagalog) textSet.add(opt.textTagalog);
      if (opt.botResponseTagalog) textSet.add(opt.botResponseTagalog);
    });
  }
});

// איסוף מספרים
const extraNumbers = [
  "Isa", "Dalawa", "Tatlo", "Apat", "Lima", "Anim", "Pito", "Walo", "Siyam", "Sampu", "Dalawampu", "Limangpu", "Isang daan", "Isang libo",
  "Uno", "Dos", "Tres", "Kuwatro", "Singko", "Sais", "Siyete", "Otsyo", "Niyebe", "Nuwebe", "Diyes", "Bente", "Singkuwenta", "Ciento",
  "Diyes piso", "Bente piso", "Singkuwenta piso", "Isang daang piso", "Dalawang daan at limangpung piso", "Limang daang piso", "Isang libong piso",
  "Salamat", "Maraming salamat po", "Kumusta ka", "Walang anuman", "Masarap", "Tubig", "Opo", "Paalam", "Magandang umaga", "Magandang hapon", "Magandang gabi"
];

extraNumbers.forEach(t => textSet.add(t));

const itemsToDownload = Array.from(textSet);
console.log(`🚀 מתחיל בהורדת ${itemsToDownload.length} קובצי MP3 משרתי Google Translate...`);

// 3. לולאת הורדה עם השהיה קלה למניעת חסימת Rate Limit
async function downloadAll() {
  let count = 0;
  for (const rawText of itemsToDownload) {
    const slug = getAudioSlug(rawText);
    const filePath = path.join(outputDir, `${slug}.mp3`);
    
    if (fs.existsSync(filePath)) {
      console.log(`⏩ [${++count}/${itemsToDownload.length}] קיים כבר: ${slug}.mp3`);
      continue;
    }

    const cleanText = preprocessTagalogAudioText(rawText);
    try {
      const base64Data = await googleTTS.getAudioBase64(cleanText, {
        lang: 'tl',
        slow: false,
        host: 'https://translate.google.com',
        timeout: 10000,
      });

      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(filePath, buffer);
      console.log(`✅ [${++count}/${itemsToDownload.length}] הורד בהצלחה: ${slug}.mp3 ("${rawText}")`);

      // השהייה קלה של 150ms
      await new Promise(r => setTimeout(r, 150));
    } catch (err) {
      console.error(`❌ שגיאה בהורדת "${rawText}":`, err.message);
    }
  }

  console.log(`\n🎉 סיום הורדת כל ${count} קובצי MP3 לתיקייה: public/audio/words/`);
}

downloadAll();
