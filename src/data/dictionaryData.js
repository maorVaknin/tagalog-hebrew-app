/**
 * מסד נתוני מילון Tagalingo המקיף (Tagalog-Hebrew Master Dictionary Data)
 * כולל פירושים מלאים בעברית, תעתיק פונטי מנוקד, קטגוריות ומשפטי דוגמה.
 */
export const comprehensiveDictionaryData = [
  // --- ברכות (Greetings) ---
  {
    id: "dict_101",
    tagalog: "Magandang umaga",
    hebrew: "בוקר טוב",
    phoneticHebrew: "מַגַאנְדַאנְג אוּמָאגָה",
    category: "ברכות",
    exampleSentence: {
      tagalog: "Magandang umaga po sa inyo!",
      hebrew: "בוקר טוב לכם! (בנימוס)",
      phoneticHebrew: "מַגַאנְדַאנְג אוּמָאגָה פּוֹ סָא אִין-יוֹ!"
    }
  },
  {
    id: "dict_102",
    tagalog: "Magandang hapon",
    hebrew: "צהריים טובים / אחה\"צ טובים",
    phoneticHebrew: "מַגַאנְדַאנְג הָאפּוֹן",
    category: "ברכות",
    exampleSentence: {
      tagalog: "Magandang hapon po!",
      hebrew: "אחר צהריים טובים!",
      phoneticHebrew: "מַגַאנְדַאנְג הָאפּוֹן פּוֹ!"
    }
  },
  {
    id: "dict_103",
    tagalog: "Magandang gabi",
    hebrew: "ערב טוב / לילה טוב",
    phoneticHebrew: "מַגַאנְדַאנְג גָאבִֿי",
    category: "ברכות",
    exampleSentence: {
      tagalog: "Magandang gabi sa inyong lahat!",
      hebrew: "ערב טוב לכולכם!",
      phoneticHebrew: "מַגַאנְדַאנְג גָאבִֿי סָא אִין-יוֹנְג לָאהָאט!"
    }
  },
  {
    id: "dict_104",
    tagalog: "Kumusta ka?",
    hebrew: "מה שלומך?",
    phoneticHebrew: "קוּמוּסְטָה כָּה?",
    category: "ברכות",
    exampleSentence: {
      tagalog: "Mabuti naman ako, kumusta ka?",
      hebrew: "שלומי טוב, מה שלומך?",
      phoneticHebrew: "מָאבוּטִי נָאמָאן אָקוֹ, קוּמוּסְטָה כָּה?"
    }
  },
  {
    id: "dict_105",
    tagalog: "Paalam",
    hebrew: "להתראות / שלום",
    phoneticHebrew: "פָּאָאָלָאם",
    category: "ברכות",
    exampleSentence: {
      tagalog: "Paalam na po, hanggang sa muli!",
      hebrew: "להתראות, עד הפעם הבאה!",
      phoneticHebrew: "פָּאָאָלָאם נָא פּוֹ, הָאנְג-גָאנְג סָא מוּלִי!"
    }
  },
  {
    id: "dict_106",
    tagalog: "Ingat",
    hebrew: "שמור על עצמך / נסיעה טובה",
    phoneticHebrew: "אִין-גָאט",
    category: "ברכות",
    exampleSentence: {
      tagalog: "Ingat ka laging bumiyahe!",
      hebrew: "שמור על עצמך תמיד בדרכים!",
      phoneticHebrew: "אִין-גָאט כָּה לָאגִילְג בּוּמִיאָהֶה!"
    }
  },

  // --- נימוסים (Etiquette) ---
  {
    id: "dict_201",
    tagalog: "Salamat",
    hebrew: "תודה",
    phoneticHebrew: "סָלָמָאט",
    category: "נימוסים",
    exampleSentence: {
      tagalog: "Maraming salamat po!",
      hebrew: "תודה רבה מאוד! (בנימוס)",
      phoneticHebrew: "מָארָאמִינְג סָלָמָאט פּוֹ!"
    }
  },
  {
    id: "dict_202",
    tagalog: "Walang anuman",
    hebrew: "בבקשה / בכיף (בתגובה לתודה)",
    phoneticHebrew: "וָואלָאנְג אָנוּמָאן",
    category: "נימוסים",
    exampleSentence: {
      tagalog: "Walang anuman po!",
      hebrew: "אין על מה! / בכיף!",
      phoneticHebrew: "וָואלָאנְג אָנוּמָאן פּוֹ!"
    }
  },
  {
    id: "dict_203",
    tagalog: "Opo / Po",
    hebrew: "כן (בכבוד) / מילת נימוס",
    phoneticHebrew: "אוֹפּוֹ / פּוֹ",
    category: "נימוסים",
    exampleSentence: {
      tagalog: "Opo, salamat po.",
      hebrew: "כן, תודה רבה (בכבוד).",
      phoneticHebrew: "אוֹפּוֹ, סָלָמָאט פּוֹ."
    }
  },
  {
    id: "dict_204",
    tagalog: "Pasensya na",
    hebrew: "סליחה / מפתח סליחה",
    phoneticHebrew: "פָּאסֶנְשָׁיָה נָא",
    category: "נימוסים",
    exampleSentence: {
      tagalog: "Pasensya na po sa abala.",
      hebrew: "סליחה על ההפרעה.",
      phoneticHebrew: "פָּאסֶנְשָׁיָה נָא פּוֹ סָא אָבָאלָה."
    }
  },
  {
    id: "dict_205",
    tagalog: "Makikidaan po",
    hebrew: "סליחה, אפשר לעבור?",
    phoneticHebrew: "מָאכִֿיכִֿידָאאָן פּוֹ",
    category: "נימוסים",
    exampleSentence: {
      tagalog: "Makikidaan po muna.",
      hebrew: "סליחה, אעבור רגע.",
      phoneticHebrew: "מָאכִֿיכִֿידָאאָן פּוֹ מוּנָה."
    }
  },

  // --- אוכל ומסעדות (Food & Dining) ---
  {
    id: "dict_301",
    tagalog: "Kain tayo",
    hebrew: "בואו נאכל! / בתיאבון",
    phoneticHebrew: "כָּאִין תָּאיוֹ",
    category: "אוכל ומסעדות",
    exampleSentence: {
      tagalog: "Masarap ang pagkain, kain tayo!",
      hebrew: "האוכל טעים, בואו נאכל!",
      phoneticHebrew: "מָאסָארָאפּ אָנְג פָּאגְכָּאִין, כָּאִין תָּאיוֹ!"
    }
  },
  {
    id: "dict_302",
    tagalog: "Masarap",
    hebrew: "טעים",
    phoneticHebrew: "מָאסָארָאפּ",
    category: "אוכל ומסעדות",
    exampleSentence: {
      tagalog: "Masarap talaga ang Adobo!",
      hebrew: "האדובו ממש טעים!",
      phoneticHebrew: "מָאסָארָאפּ תָּאלָאגָה אָנְג אָדוֹבּוֹ!"
    }
  },
  {
    id: "dict_303",
    tagalog: "Tubig",
    hebrew: "מים",
    phoneticHebrew: "תוּבִֿיג",
    category: "אוכל ומסעדות",
    exampleSentence: {
      tagalog: "Pahingi ng cold tubig po.",
      hebrew: "אפשר לקבל מים קרים בבקשה?",
      phoneticHebrew: "פָּאהִין-גִי נְג כּוֹלְד תוּבִֿיג פּוֹ."
    }
  },
  {
    id: "dict_304",
    tagalog: "Kanin",
    hebrew: "אורז מבושל",
    phoneticHebrew: "כָּאנִין",
    category: "אוכל ומסעדות",
    exampleSentence: {
      tagalog: "Extra kanin po, paki-dagdag.",
      hebrew: "עוד מנת אורז בבקשה.",
      phoneticHebrew: "אֶכְסְטְרָה כָּאנִין פּוֹ."
    }
  },
  {
    id: "dict_305",
    tagalog: "Bill po",
    hebrew: "חשבון בבקשה",
    phoneticHebrew: "בִּיל פּוֹ",
    category: "אוכל ומסעדות",
    exampleSentence: {
      tagalog: "Kuya, bill po sa mesa dos.",
      hebrew: "אחי, חשבון בבקשה לשולחן 2.",
      phoneticHebrew: "קוּיָה, בִּיל פּוֹ סָא מֶסָה דוֹס."
    }
  },
  {
    id: "dict_306",
    tagalog: "Buko juice",
    hebrew: "מיץ קוקוס טרי",
    phoneticHebrew: "בּוּכּוֹ ג'וּס",
    category: "אוכל ומסעדות",
    exampleSentence: {
      tagalog: "Masarap uminom ng buko juice sa dalampasigan.",
      hebrew: "כיף לשתות מיץ קוקוס בחוף הים.",
      phoneticHebrew: "מָאסָארָאפּ אוּמִינוֹם נְג בּוּכּוֹ ג'וּס."
    }
  },

  // --- מספרים וכסף (Numbers & Money) ---
  {
    id: "dict_401",
    tagalog: "Magkano ito?",
    hebrew: "כמה זה עולה?",
    phoneticHebrew: "מָאגְכָּאנוֹ אִיתוֹ?",
    category: "מספרים וכסף",
    exampleSentence: {
      tagalog: "Magkano ito po bawat isa?",
      hebrew: "כמה זה עולה ליחידה?",
      phoneticHebrew: "מָאגְכָּאנוֹ אִיתוֹ פּוֹ בָּאוָואט אִיסָה?"
    }
  },
  {
    id: "dict_402",
    tagalog: "Piso / Pesos",
    hebrew: "פסו פיליפיני (מטבע)",
    phoneticHebrew: "פִּיסוֹ / פֶּסוֹס",
    category: "מספרים וכסף",
    exampleSentence: {
      tagalog: "Isang daang piso lang.",
      hebrew: "רק 100 פסו.",
      phoneticHebrew: "אִיסָאנְג דָאאַנְג פִּיסוֹ לָאנְג."
    }
  },
  {
    id: "dict_403",
    tagalog: "Mura",
    hebrew: "זול",
    phoneticHebrew: "מוּרָה",
    category: "מספרים וכסף",
    exampleSentence: {
      tagalog: "Mura lang ang pagkain dito.",
      hebrew: "האוכל פה ממש זול.",
      phoneticHebrew: "מוּרָה לָאנְג אָנְג פָּאגְכָּאִין דִיתוֹ."
    }
  },
  {
    id: "dict_404",
    tagalog: "Mahal",
    hebrew: "יקר (גם פירוש: אהוב/יקר ללב)",
    phoneticHebrew: "מָאהָאל",
    category: "מספרים וכסף",
    exampleSentence: {
      tagalog: "Medyo mahal po, bawas kaunti?",
      hebrew: "קצת יקר, אפשר הנחה קטנה?",
      phoneticHebrew: "מֶדְיוֹ מָאהָאל פּוֹ, בָּאוָואס כָּאוּתִי?"
    }
  },
  {
    id: "dict_405",
    tagalog: "Sukli",
    hebrew: "עודף (כסף בחזרה)",
    phoneticHebrew: "סוּכְלִי",
    category: "מספרים וכסף",
    exampleSentence: {
      tagalog: "Akin na po ang sukli.",
      hebrew: "הנה העודף שלי בבקשה.",
      phoneticHebrew: "אָכִֿין נָא פּוֹ אָנְג סוּכְלִי."
    }
  },

  // --- תחבורה ונסיעות (Transport) ---
  {
    id: "dict_501",
    tagalog: "Para po",
    hebrew: "עצור בצד בבקשה! (בג'יפני / טרייסיקל)",
    phoneticHebrew: "פָּארָה פּוֹ",
    category: "תחבורה ונסיעות",
    exampleSentence: {
      tagalog: "Para po sa kanto!",
      hebrew: "עצור בצד בפינה בבקשה!",
      phoneticHebrew: "פָּארָה פּוֹ סָא כָּאנְתוֹ!"
    }
  },
  {
    id: "dict_502",
    tagalog: "Bayad po",
    hebrew: "הנה התשלום למסע (בג'יפני)",
    phoneticHebrew: "בָּאיָאד פּוֹ",
    category: "תחבורה ונסיעות",
    exampleSentence: {
      tagalog: "Bayad po, isa lang paki-abot.",
      hebrew: "הנה תשלום עבור נוסע אחד, תעבירו בבקשה.",
      phoneticHebrew: "בָּאיָאד פּוֹ, אִיסָה לָאנְג."
    }
  },
  {
    id: "dict_503",
    tagalog: "Saan ang...",
    hebrew: "איפה ה...",
    phoneticHebrew: "סָאָאן אָנְג...",
    category: "תחבורה ונסיעות",
    exampleSentence: {
      tagalog: "Saan ang terminal ng bus?",
      hebrew: "איפה תחנת האוטובוס המרכזית?",
      phoneticHebrew: "סָאָאן אָנְג תֶרְמִינָאל נְג בּוּס?"
    }
  },
  {
    id: "dict_504",
    tagalog: "Tricycle",
    hebrew: "טרייסיקל (אופנוע עם סירה פיליפיני)",
    phoneticHebrew: "תְרָאי-סִיכֶּל",
    category: "תחבורה ונסיעות",
    exampleSentence: {
      tagalog: "Sasakay tayo ng tricycle papuntang bayan.",
      hebrew: "ניסע בטרייסיקל למרכז העיר.",
      phoneticHebrew: "סָאסָאכָּאי תָּאיוֹ נְג תְרָאי-סִיכֶּל."
    }
  },
  {
    id: "dict_505",
    tagalog: "Jeepney",
    hebrew: "ג'יפני (מונית שירות פיליפינית צבעונית)",
    phoneticHebrew: "גִ'יפְּנִי",
    category: "תחבורה ונסיעות",
    exampleSentence: {
      tagalog: "Masaya sumakay sa Jeepney!",
      hebrew: "כיף לנסוע בג'יפני!",
      phoneticHebrew: "מָאסָאיָה סוּמָאכָּאי סָא גִ'יפְּנִי!"
    }
  },

  // --- איים, ים ונופש (Islands & Beaches) ---
  {
    id: "dict_601",
    tagalog: "Dagat",
    hebrew: "ים / אוקיינוס",
    phoneticHebrew: "דָאגָאת",
    category: "איים, ים ונופש",
    exampleSentence: {
      tagalog: "Napakaganda ng dagat sa El Nido!",
      hebrew: "הים באל נידו מדהים ביופיו!",
      phoneticHebrew: "נָאָפָּאכָּאגָאנְדָה נְג דָאגָאת סָא אל נידו!"
    }
  },
  {
    id: "dict_602",
    tagalog: "Island hopping",
    hebrew: "שייט בין איים וחוף לחוף",
    phoneticHebrew: "אָאיְלֶנְד הוֹפִּינְג",
    category: "איים, ים ונופש",
    exampleSentence: {
      tagalog: "Mag-island hopping tayo bukas!",
      hebrew: "נעשה שייט איים מחר!",
      phoneticHebrew: "מָאג-אָאיְלֶנְד הוֹפִּינְג תָּאיוֹ בּוּכָּאס!"
    }
  },
  {
    id: "dict_603",
    tagalog: "Bangka",
    hebrew: "סירת קטמרן פיליפינית מסורתית",
    phoneticHebrew: "בָּאנְג-כָּה",
    category: "איים, ים ונופש",
    exampleSentence: {
      tagalog: "Sasakay tayo sa bangka papuntang island.",
      hebrew: "ניסע בסירת בנגקה לאי.",
      phoneticHebrew: "סָאסָאכָּאי תָּאיוֹ סָא בָּאנְג-כָּה."
    }
  },
  {
    id: "dict_604",
    tagalog: "Araw",
    hebrew: "שמש / יום",
    phoneticHebrew: "אָרָאוּ",
    category: "איים, ים ונופש",
    exampleSentence: {
      tagalog: "Mainit ang araw sa dalampasigan.",
      hebrew: "השמש חמה בחוף הים.",
      phoneticHebrew: "מָאאִינִית אָנְג אָרָאוּ."
    }
  },

  // --- מלונות ואירוח (Hotels) ---
  {
    id: "dict_701",
    tagalog: "Kwarto",
    hebrew: "חֶדֶר במלון",
    phoneticHebrew: "כְּוָוארְתוֹ",
    category: "מלונות ואירוח",
    exampleSentence: {
      tagalog: "Malinis ang kwarto namin.",
      hebrew: "החדר שלנו נקי מאוד.",
      phoneticHebrew: "מָאלִינִיס אָנְג כְּוָוארְתוֹ נָאמִין."
    }
  },
  {
    id: "dict_702",
    tagalog: "Susi",
    hebrew: "מפתח",
    phoneticHebrew: "סוּסִי",
    category: "מלונות ואירוח",
    exampleSentence: {
      tagalog: "Nasaan ang susi ng kwarto?",
      hebrew: "איפה המפתח לחדר?",
      phoneticHebrew: "נָאסָאָאן אָנְג סוּסִי נְג כְּוָוארְתוֹ?"
    }
  },
  {
    id: "dict_703",
    tagalog: "Aircon",
    hebrew: "מזגן",
    phoneticHebrew: "אֶר-כּוֹן",
    category: "מלונות ואירוח",
    exampleSentence: {
      tagalog: "Malamig ang aircon sa kwarto.",
      hebrew: "המזגן בחדר קר ונעים.",
      phoneticHebrew: "מָאלָאמִיג אָנְג אֶר-כּוֹן."
    }
  },

  // --- בריאות וחירום (Health & Emergency) ---
  {
    id: "dict_801",
    tagalog: "Tulong!",
    hebrew: "עזרה! הצילו!",
    phoneticHebrew: "תוּלוֹנְג!",
    category: "בריאות וחירום",
    exampleSentence: {
      tagalog: "Tulong po! Kailangan ko ng doktor!",
      hebrew: "הצילו! אני צריך רופא!",
      phoneticHebrew: "תוּלוֹנְג פּוֹ! כָּאאִילָאנְגָאן כּוֹ נְג דּוֹכְתוֹר!"
    }
  },
  {
    id: "dict_802",
    tagalog: "Masakit",
    hebrew: "כואב",
    phoneticHebrew: "מָאסָאכִֿית",
    category: "בריאות וחירום",
    exampleSentence: {
      tagalog: "Masakit ang tiyan ko.",
      hebrew: "כואבת לי הבטן.",
      phoneticHebrew: "מָאסָאכִֿית אָנְג תִיאַן כּוֹ."
    }
  },
  {
    id: "dict_803",
    tagalog: "Ospital / Doktor",
    hebrew: "בית חולים / רופא",
    phoneticHebrew: "אוֹסְפִּינָאל / דּוֹכְתוֹר",
    category: "בריאות וחירום",
    exampleSentence: {
      tagalog: "Nasaan ang pinakamalapit na ospital?",
      hebrew: "איפה בית החולים הקרוב ביותר?",
      phoneticHebrew: "נָאסָאָאן אָנְג פִּינָאכָּאמָאלָאפִּית נָא אוֹסְפִּינָאל?"
    }
  },

  // --- רגשות ושיחה (Social & Romance) ---
  {
    id: "dict_901",
    tagalog: "Mahal kita",
    hebrew: "אני אוהב/ת אותך",
    phoneticHebrew: "מָאהָאל כִּיתָה",
    category: "רגשות ושיחה",
    exampleSentence: {
      tagalog: "Mahal kita sobra!",
      hebrew: "אני אוהב אותך מאוד מאוד!",
      phoneticHebrew: "מָאהָאל כִּיתָה סוֹבְרָה!"
    }
  },
  {
    id: "dict_902",
    tagalog: "Pogi",
    hebrew: "חתיך / יפה תואר",
    phoneticHebrew: "פּוֹגִי",
    category: "רגשות ושיחה",
    exampleSentence: {
      tagalog: "Ang pogi mo naman!",
      hebrew: "אתה ממש חתיך!",
      phoneticHebrew: "אָנְג פּוֹגִי מוֹ נָאמָאן!"
    }
  },
  {
    id: "dict_903",
    tagalog: "Maganda",
    hebrew: "יפה / יפהפייה",
    phoneticHebrew: "מָאגָאנְדָה",
    category: "רגשות ושיחה",
    exampleSentence: {
      tagalog: "Napakaganda mo talaga!",
      hebrew: "את באמת יפהפייה!",
      phoneticHebrew: "נָאָפָּאגָאנְדָה מוֹ תָּאלָאגָה!"
    }
  },
  {
    id: "dict_904",
    tagalog: "Kaibigan",
    hebrew: "חבר / חברה",
    phoneticHebrew: "כָּאאִיבִֿיגָאן",
    category: "רגשות ושיחה",
    exampleSentence: {
      tagalog: "Ikaw ang aking mabuting kaibigan.",
      hebrew: "אתה החבר הטוב שלי.",
      phoneticHebrew: "אִיכָּאוּ אָנְג אָכִֿינְג מָאבוּטִילְג כָּאאִיבִֿיגָאן."
    }
  }
];
