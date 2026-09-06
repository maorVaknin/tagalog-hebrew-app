export const courseData = {
  units: [
    {
      unitId: 1,
      titleHebrew: "שלב 1: יסודות והישרדות למטיילים",
      titleTagalog: "Mga Basiko at Survival sa Paglalakbay",
      descriptionHebrew: "ברכות, נימוסים, אוכל, מספרים, קניות ותחבורה בפיליפינים",
      icon: "🌴",
      color: "#059669",
      lessons: [
        {
          lessonId: "u1_l1",
          title: "ברכות ונימוסים בסיסיים",
          icon: "👋",
          description: "למדו לברך מקומיים ולהשתמש במילות נימוס חיוניות",
          vocabulary: [
            {
              id: "voc_101",
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
              id: "voc_102",
              tagalog: "Magandang hapon",
              hebrew: "צהריים טובים / אחה\"צ טובים",
              phoneticHebrew: "מַגַאנְדַאנְג הָאפּוֹן",
              category: "ברכות",
              exampleSentence: {
                tagalog: "Magandang hapon po, Kapamilya!",
                hebrew: "אחר צהריים טובים!",
                phoneticHebrew: "מַגַאנְדַאנְג הָאפּוֹן פּוֹ!"
              }
            },
            {
              id: "voc_103",
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
              id: "voc_104",
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
              id: "voc_105",
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
              id: "voc_106",
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
              id: "voc_107",
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
              id: "voc_108",
              tagalog: "Paalam",
              hebrew: "להתראות / שלום",
              phoneticHebrew: "פָּאָאָלָאם",
              category: "ברכות",
              exampleSentence: {
                tagalog: "Paalam na po, hanggang sa muli!",
                hebrew: "להתראות, עד הפעם הבאה!",
                phoneticHebrew: "פָּאָאָלָאם נָא פּוֹ, הָאנְג-גָאנְג סָא מוּלִי!"
              }
            }
          ],
          grammarNote: {
            titleHebrew: "מילת הנימוס Po / Opo",
            contentHebrew: "בטגלוג, הוספת המילה Po בסוף או במרכז משפט (ושימוש ב-Opo במקום Oo בשביל 'כן') היא דרך ארץ בסיסית וחשובה מאוד בפיליפינים. משתמשים בה עם מבוגרים, נותני שירות, וכל אדם שרוצים להביע כלפיו כבוד.",
            examples: [
              { tagalog: "Salamat po", hebrew: "תודה לך (בכבוד)", phonetic: "סָלָמָאט פּוֹ" },
              { tagalog: "Opo, kuya", hebrew: "כן, אדוני/אחי", phonetic: "אוֹפּוֹ, קוּיָה" }
            ]
          },
          quiz: [
            {
              id: "q1_1",
              type: "multiple-choice",
              questionHebrew: "איך מברכים 'בוקר טוב' בטגלוג?",
              options: ["Magandang hapon", "Magandang umaga", "Magandang gabi", "Salamat po"],
              correctAnswer: "Magandang umaga",
              explanationHebrew: "Magandang umaga מורכב מ-Maganda (יפה/טוב) ו-Umaga (בוקר)."
            },
            {
              id: "q1_2",
              type: "listening",
              questionHebrew: "הקשב לצליל ובחר את התרגום הנכון לעברית:",
              tagalogAudioText: "Maraming salamat po!",
              options: ["בוקר טוב לכם", "תודה רבה מאוד!", "מה שלומך?", "להתראות"],
              correctAnswer: "תודה רבה מאוד!",
              explanationHebrew: "Marami = הרבה, Salamat = תודה, Po = נימוס."
            },
            {
              id: "q1_3",
              type: "fill-in-blank",
              questionHebrew: "השלם את המילה החסרה: 'Kumusta ____?' (מה שלומך?)",
              options: ["ako", "ka", "siya", "po"],
              correctAnswer: "ka",
              explanationHebrew: "Ka פירושו 'אתה/את'. Kumusta ka = מה שלומך?"
            }
          ]
        },
        {
          lessonId: "u1_l2",
          title: "אוכל, מסעדה והזמנות",
          icon: "🥭",
          description: "למדו להזמין אוכל, להגיד שמשהו טעים ולבקש חשבון",
          vocabulary: [
            {
              id: "voc_109",
              tagalog: "Masarap",
              hebrew: "טעים",
              phoneticHebrew: "מַסָארָאפְּ",
              category: "אוכל",
              exampleSentence: {
                tagalog: "Masarap ang mangga!",
                hebrew: "המנגו טעים מאוד!",
                phoneticHebrew: "מַסָארָאפְּ אָנְג מַאנְג-גָא!"
              }
            },
            {
              id: "voc_110",
              tagalog: "Tubig",
              hebrew: "מים",
              phoneticHebrew: "טוּבִֿיג",
              category: "אוכל",
              exampleSentence: {
                tagalog: "Pahingi ng tubig, pakiusap.",
                hebrew: "אפשר מים, בבקשה.",
                phoneticHebrew: "פָּאהִין-גִי נְג טוּבִֿיג, פָּאכִּי-אוּסָאפּ."
              }
            },
            {
              id: "voc_111",
              tagalog: "Gusto ko ng...",
              hebrew: "אני רוצה / בא לי...",
              phoneticHebrew: "גוּסְטוֹ כּוֹ נְג...",
              category: "מסעדה",
              exampleSentence: {
                tagalog: "Gusto ko ng adobo at kanin.",
                hebrew: "אני רוצה אדובו ואורז.",
                phoneticHebrew: "גוּסְטוֹ כּוֹ נְג אָדוֹבּוֹ אָאת כָּאנִין."
              }
            },
            {
              id: "voc_112",
              tagalog: "Ang bill po",
              hebrew: "אפשר את החשבון בבקשה",
              phoneticHebrew: "אָנְג בִּיל פּוֹ",
              category: "מסעדה",
              exampleSentence: {
                tagalog: "Kuya, ang bill po!",
                hebrew: "אדוני, את החשבון בבקשה!",
                phoneticHebrew: "קוּיָה, אָנְג בִּיל פּוֹ!"
              }
            },
            {
              id: "voc_113",
              tagalog: "Kanin",
              hebrew: "אורז מבושל",
              phoneticHebrew: "כָּאנִין",
              category: "אוכל",
              exampleSentence: {
                tagalog: "Isa pang kanin, pakiusap.",
                hebrew: "עוד מנה אורז אחת, בבקשה.",
                phoneticHebrew: "אִיסָא פָּאנְג כָּאנִין, פָּאכִּי-אוּסָאפּ."
              }
            },
            {
              id: "voc_114",
              tagalog: "Busog na ako",
              hebrew: "אני שבע / מלא",
              phoneticHebrew: "בּוּסוֹג נָא אָקוֹ",
              category: "אוכל",
              exampleSentence: {
                tagalog: "Salamat po, busog na ako!",
                hebrew: "תודה, אני כבר שבע!",
                phoneticHebrew: "סָלָמָאט פּוֹ, בּוּסוֹג נָא אָקוֹ!"
              }
            }
          ],
          quiz: [
            {
              id: "q2_1",
              type: "multiple-choice",
              questionHebrew: "איך אומרים 'אני רוצה...' בטגלוג?",
              options: ["Ayaw ko ng...", "Gusto ko ng...", "Salamat po", "Masarap ako"],
              correctAnswer: "Gusto ko ng...",
              explanationHebrew: "Gusto = רוצה/אוהב, ko = שלי/אני, ng = מילת יחס לחפץ."
            },
            {
              id: "q2_2",
              type: "multiple-choice",
              questionHebrew: "מה פירוש המילה 'Masarap'?",
              options: ["מתוק", "טעים", "חריף", "יקר"],
              correctAnswer: "טעים",
              explanationHebrew: "Masarap הוא אחד המושגים הכי נפוצים בפיליפינים לאוכל טעים!"
            }
          ]
        },
        {
          lessonId: "u1_l3",
          title: "תחבורה והתמצאות בשטח",
          icon: "🛺",
          description: "איך לשאול איפה דברים נמצאים, לנסוע בטריקסי או ג'יפני",
          vocabulary: [
            {
              id: "voc_115",
              tagalog: "Saan ang...?",
              hebrew: "איפה נמצא ה...?",
              phoneticHebrew: "סָאַאן אָנְג...?",
              category: "התמצאות",
              exampleSentence: {
                tagalog: "Saan ang banyo?",
                hebrew: "איפה השירותים?",
                phoneticHebrew: "סָאַאן אָנְג בָּאן-יוֹ?"
              }
            },
            {
              id: "voc_116",
              tagalog: "Para po!",
              hebrew: "עצור כאן בבקשה! (בתחבורה ציבורית)",
              phoneticHebrew: "פָּארָא פּוֹ!",
              category: "תחבורה",
              exampleSentence: {
                tagalog: "Para po sa tabi lang!",
                hebrew: "עצור בצד בבקשה!",
                phoneticHebrew: "פָּארָא פּוֹ סָא טָאבִּי לָאנְג!"
              }
            },
            {
              id: "voc_117",
              tagalog: "Bayad po",
              hebrew: "הנה התשלום / קח דמי נסיעה",
              phoneticHebrew: "בָּאיָאד פּוֹ",
              category: "תחבורה",
              exampleSentence: {
                tagalog: "Bayad po, isa lang.",
                hebrew: "הנה התשלום, עבור אדם אחד.",
                phoneticHebrew: "בָּאיָאד פּוֹ, אִיסָא לָאנְג."
              }
            },
            {
              id: "voc_118",
              tagalog: "Kaliwa / Kanan",
              hebrew: "שמאלה / ימינה",
              phoneticHebrew: "כָּאלִיװָא / כָּאנָאן",
              category: "התמצאות",
              exampleSentence: {
                tagalog: "Pahiling sa kaliwa, kuya.",
                hebrew: "פנה שמאלה בבקשה, אדוני.",
                phoneticHebrew: "פָּאהִילִינְג סָא כָּאלִיװָא, קוּיָה."
              }
            }
          ],
          quiz: [
            {
              id: "q3_1",
              type: "multiple-choice",
              questionHebrew: "מה תצעק לנהג הג'יפני או הטרייסיקל כדי שיעצור לרדת?",
              options: ["Salamat po!", "Para po!", "Masarap!", "Magkano ito?"],
              correctAnswer: "Para po!",
              explanationHebrew: "Para po פירושו 'עצור בבקשה' - הביטוי הידוע ביותר לתחבורה פיליפינית!"
            }
          ]
        },
        {
          lessonId: "u1_l4",
          title: "מספרים וקניות בשוק",
          icon: "🔢",
          description: "מספרים בסיסיים, לשאול מחיר ולהתמקח",
          vocabulary: [
            {
              id: "voc_119",
              tagalog: "Isa, Dalawa, Tatlo",
              hebrew: "אחת, שתיים, שלוש",
              phoneticHebrew: "אִיסָא, דָאלָאוָוא, תָּאטְלוֹ",
              category: "מספרים",
              exampleSentence: {
                tagalog: "Dalawang mangga, pakiusap.",
                hebrew: "שני מנגו, בבקשה.",
                phoneticHebrew: "דָאלָאוָואנְג מַאנְג-גָא, פָּאכִּי-אוּסָאפּ."
              }
            },
            {
              id: "voc_120",
              tagalog: "Apat, Lima",
              hebrew: "ארבע, חמש",
              phoneticHebrew: "אָאָפָּאת, לִימָא",
              category: "מספרים",
              exampleSentence: {
                tagalog: "Limang piso lang.",
                hebrew: "חמישה פסו בלבד.",
                phoneticHebrew: "לִימָאנְג פִּיסוֹ לָאנְג."
              }
            },
            {
              id: "voc_121",
              tagalog: "Magkano ito?",
              hebrew: "כמה זה עולה?",
              phoneticHebrew: "מַגְקָאנוֹ אִיטוֹ?",
              category: "קניות",
              exampleSentence: {
                tagalog: "Magkano ito, ate?",
                hebrew: "כמה זה עולה, גברתי/אחותי?",
                phoneticHebrew: "מַגְקָאנוֹ אִיטוֹ, אָאתֶה?"
              }
            },
            {
              id: "voc_122",
              tagalog: "Mahal / Mura",
              hebrew: "יקר / זול",
              phoneticHebrew: "מָאהָאל / מוּרָא",
              category: "קניות",
              exampleSentence: {
                tagalog: "Ang mahal naman! Pwede tawad?",
                hebrew: "זה ממש יקר! אפשר הנחה?",
                phoneticHebrew: "אָנְג מָאהָאל נָאמָאן! פְּװֶדֶה תָּאוָואד?"
              }
            }
          ],
          quiz: [
            {
              id: "q4_1",
              type: "multiple-choice",
              questionHebrew: "איך שואלים 'כמה זה עולה?' בשוק?",
              options: ["Saan ang banyo?", "Magkano ito?", "Ano ang pangalan mo?", "Masarap ito"],
              correctAnswer: "Magkano ito?",
              explanationHebrew: "Magkano = כמה (מחיר), ito = זה."
            }
          ]
        }
      ]
    },
    {
      unitId: 2,
      titleHebrew: "שלב 2: בניית משפטים ותקשורת",
      titleTagalog: "Pagtatag ng Mga Pangungusap",
      descriptionHebrew: "כינויי גוף, מילות קישור, שאלות נפוצות וזמנים בסיסיים",
      icon: "💬",
      color: "#2563EB",
      lessons: [
        {
          lessonId: "u2_l1",
          title: "כינויי גוף ומילות קישור",
          icon: "👥",
          description: "אני, אתה, הוא/היא, אנחנו, וגם מילות קישור כמו 'ו-', 'אבל', 'כי'",
          vocabulary: [
            {
              id: "voc_201",
              tagalog: "Ako",
              hebrew: "אני",
              phoneticHebrew: "אָקוֹ",
              category: "כינויי גוף",
              exampleSentence: {
                tagalog: "Ako si Dan.",
                hebrew: "אני דן.",
                phoneticHebrew: "אָקוֹ סִי דָאן."
              }
            },
            {
              id: "voc_202",
              tagalog: "Ikaw / Ka",
              hebrew: "אתה / את",
              phoneticHebrew: "אִיכָּאוָוא / כָּה",
              category: "כינויי גוף",
              exampleSentence: {
                tagalog: "Mabait ka.",
                hebrew: "אתה נחמד.",
                phoneticHebrew: "מָאבָאאִית כָּה."
              }
            },
            {
              id: "voc_203",
              tagalog: "Siya",
              hebrew: "הוא / היא (אין הבדל מגדרי!)",
              phoneticHebrew: "שִׁיָה",
              category: "כינויי גוף",
              exampleSentence: {
                tagalog: "Maganda siya.",
                hebrew: "היא יפה / הוא יפה.",
                phoneticHebrew: "מָאגָאנְדָא שִׁיָה."
              }
            },
            {
              id: "voc_204",
              tagalog: "At / Pero / Kasi",
              hebrew: "ו- / אבל / כי (מפני ש-)",
              phoneticHebrew: "אָאת / פֶּרוֹ / כָּאסִי",
              category: "מילות קישור",
              exampleSentence: {
                tagalog: "Gusto ko nito kasi masarap!",
                hebrew: "אני רוצה את זה כי זה טעים!",
                phoneticHebrew: "גוּסְטוֹ כּוֹ נִיטוֹ כָּאסִי מַסָארָאפְּ!"
              }
            }
          ],
          grammarNote: {
            titleHebrew: "שיוויון מגדרי בכינויי גוף",
            contentHebrew: "בטגלוג אין הבדל בין 'הוא' ל'היא'! המילה Siya משמשת לשני המגדרים. בנוסף, המבנה הבסיסי של המשפט בטגלוג מתחיל לרוב בתואר או בפועל, ורק אחר כך מגיע הנושא (למשל: Masarap ako -> טעים לי / Masarap ang pagkain -> האוכל טעים).",
            examples: [
              { tagalog: "Masaya siya", hebrew: "הוא/היא שמח/ה", phonetic: "מָאסָאיָה שִׁיָה" }
            ]
          },
          quiz: [
            {
              id: "q2_1_1",
              type: "multiple-choice",
              questionHebrew: "מה מיוחד בכינוי הגוף 'Siya' בטגלוג?",
              options: ["משמש רק לגברים", "משמש רק לנשים", "משמש גם ל'הוא' וגם ל'היא'", "משמש לרבים בלבד"],
              correctAnswer: "משמש גם ל'הוא' וגם ל'היא'",
              explanationHebrew: "בטגלוג אין מגדר בכינויי גוף - Siya מתאים לשני המגדרים!"
            }
          ]
        },
        {
          lessonId: "u2_l2",
          title: "מילות שאלה וזמנים בסיסיים",
          icon: "❓",
          description: "מה, מי, למה, מתי, היום, מחר, אתמול",
          vocabulary: [
            {
              id: "voc_205",
              tagalog: "Ano?",
              hebrew: "מה?",
              phoneticHebrew: "אָנוֹ?",
              category: "שאלות",
              exampleSentence: {
                tagalog: "Ano ang pangalan mo?",
                hebrew: "מה שמך?",
                phoneticHebrew: "אָנוֹ אָנְג פָּאנְגָאלָאן מוֹ?"
              }
            },
            {
              id: "voc_206",
              tagalog: "Sino?",
              hebrew: "מי?",
              phoneticHebrew: "סִינוֹ?",
              category: "שאלות",
              exampleSentence: {
                tagalog: "Sino siya?",
                hebrew: "מי זה / מי זאת?",
                phoneticHebrew: "סִינוֹ שִׁיָה?"
              }
            },
            {
              id: "voc_207",
              tagalog: "Bakit?",
              hebrew: "למה?",
              phoneticHebrew: "בָּאכִּית?",
              category: "שאלות",
              exampleSentence: {
                tagalog: "Bakit ka masaya?",
                hebrew: "למה אתה שמח?",
                phoneticHebrew: "בָּאכִּית כָּה מָאסָאיָה?"
              }
            },
            {
              id: "voc_208",
              tagalog: "Ngayon / Bukas / Kahapon",
              hebrew: "עכשיו (היום) / מחר / אתמול",
              phoneticHebrew: "נְגָאיון / בּוּכָּאס / כָּאהָאפּוֹן",
              category: "זמנים",
              exampleSentence: {
                tagalog: "Pupunta ako bukas.",
                hebrew: "אני אלך מחר.",
                phoneticHebrew: "פּוּפּוּנְתָּה אָקוֹ בּוּכָּאס."
              }
            }
          ],
          quiz: [
            {
              id: "q2_2_1",
              type: "multiple-choice",
              questionHebrew: "איך שואלים 'מה שמך?' בטגלוג?",
              options: ["Sino ka?", "Ano ang pangalan mo?", "Saan ka pupunta?", "Bakit ka nandito?"],
              correctAnswer: "Ano ang pangalan mo?",
              explanationHebrew: "Ano = מה, pangalan = שם, mo = שלך."
            }
          ]
        }
      ]
    },
    {
      unitId: 3,
      titleHebrew: "שלב 3: דקדוק מתקדם ושיחה שוטפת",
      titleTagalog: "Gramatika at Malayang Pakikipag-usap",
      descriptionHebrew: "מערכת הפעלים (Focus/Trigger System), סלנג מקומי ושיחות חופשיות",
      icon: "🎯",
      color: "#7C3AED",
      lessons: [
        {
          lessonId: "u3_l1",
          title: "מערכת הפעלים (Actor Focus vs Object Focus)",
          icon: "⚡",
          description: "הלב של הדקדוק בטגלוג: פעלים המתמקדים במבצע הפעולה לעומת פעלים המתמקדים בחפץ",
          vocabulary: [
            {
              id: "voc_301",
              tagalog: "Kumain (Actor Focus)",
              hebrew: "לאכול (דגש על האוכל/מבצע הפעולה)",
              phoneticHebrew: "כּוּמָאאִין",
              category: "פעלים",
              exampleSentence: {
                tagalog: "Kumain ako ng mangga.",
                hebrew: "אכלתי מנגו (אני במרכז).",
                phoneticHebrew: "כּוּמָאאִין אָקוֹ נְג מַאנְג-גָא."
              }
            },
            {
              id: "voc_302",
              tagalog: "Kinain (Object Focus)",
              hebrew: "נאכל (דגש על המנגו/החפץ)",
              phoneticHebrew: "כִּינָאאִין",
              category: "פעלים",
              exampleSentence: {
                tagalog: "Kinain ko ang mangga.",
                hebrew: "המנגו נאכל על ידי (המנגו במרכז).",
                phoneticHebrew: "כִּינָאאִין כּוֹ אָנְג מַאנְג-גָא."
              }
            },
            {
              id: "voc_303",
              tagalog: "Bumili / Binili",
              hebrew: "לקנות (מי קנה vs מה נקנה)",
              phoneticHebrew: "בּוּמִילִי / בִּינִילִי",
              category: "פעלים",
              exampleSentence: {
                tagalog: "Binili ko ang damit.",
                hebrew: "קניתי את הבגד הזה (הבגד הוא הדגש).",
                phoneticHebrew: "בִּינִילִי כּוֹ אָנְג דָאמִית."
              }
            }
          ],
          grammarNote: {
            titleHebrew: "שיטת ה-Focus System (הטריגרים בטגלוג)",
            contentHebrew: "בטגלוג, כל פועל משנה את הסופית/תבנית שלו בהתאם למה שרוצים להדגיש במשפט:\n1. Actor Focus (-um-, mag-): כשרוצים להדגיש את המבצע (למשל: Kumain ako = אני אכלתי).\n2. Object Focus (-in, i-): כשרוצים להדגיש את החפץ הספציפי שנעשתה עליו הפעולה (למשל: Kinain ko ang mangga = אכלתי את המנגו הזה בדיוק).",
            examples: [
              { tagalog: "Kumain ako", hebrew: "אכלתי (אני במרכז)", phonetic: "כּוּמָאאִין אָקוֹ" },
              { tagalog: "Kinain ko ang adobo", hebrew: "אכלתי את האדובו הזה", phonetic: "כִּינָאאִין כּוֹ אָנְג אָדוֹבּוֹ" }
            ]
          },
          quiz: [
            {
              id: "q3_1_1",
              type: "multiple-choice",
              questionHebrew: "במשפט 'Kinain ko ang mangga', מה עומד במרכז ההדגשה?",
              options: ["המבצע (אני)", "המנגו (החפץ)", "הזמן (אתמול)", "המקום"],
              correctAnswer: "המנגו (החפץ)",
              explanationHebrew: "הפועל Kinain הוא ב-Object Focus ולכן הדגש הוא על המנגו הספציפי!"
            }
          ]
        },
        {
          lessonId: "u3_l2",
          title: "סלנג מקומי וביטויים תרבותיים",
          icon: "😎",
          description: "מילים פיליפיניות צעירות, סלנג רחוב ודיבור עם חברים",
          vocabulary: [
            {
              id: "voc_304",
              tagalog: "Chibog",
              hebrew: "ארוחה / אוכל (סלנג)",
              phoneticHebrew: "צִ'יבּוֹג",
              category: "סלנג",
              exampleSentence: {
                tagalog: "Tara, chibog na tayo!",
                hebrew: "בואו, נלך לאכול!",
                phoneticHebrew: "תָּארָא, צִ'יבּוֹג נָא תָּאיָוֹ!"
              }
            },
            {
              id: "voc_305",
              tagalog: "Lodi / Petmalu",
              hebrew: "תותח / אגדה (היפוך אותיות של Idol / Malupit)",
              phoneticHebrew: "לוֹדִי / פֶּתְמָאלוּ",
              category: "סלנג",
              exampleSentence: {
                tagalog: "Lodi ka talaga!",
                hebrew: "אתה ממש אגדה / תותח!",
                phoneticHebrew: "לוֹדִי כָּה תָּאלָאגָא!"
              }
            },
            {
              id: "voc_306",
              tagalog: "Barkada",
              hebrew: "חבורת חברים קרובים",
              phoneticHebrew: "בָּארְכָּאדָא",
              category: "תרבות",
              exampleSentence: {
                tagalog: "Kasama ko ang barkada ko.",
                hebrew: "אני עם חבורת החברים שלי.",
                phoneticHebrew: "כָּאסָאמָא כּוֹ אָנְג בָּארְכָּאדָא כּוֹ."
              }
            },
            {
              id: "voc_307",
              tagalog: "Charot!",
              hebrew: "סתם! / בצחוק!",
              phoneticHebrew: "צָ'ארִיאָוט!",
              category: "סלנג",
              exampleSentence: {
                tagalog: "Maganda ako... charot!",
                hebrew: "אני דוגמן... סתם בצחוק!",
                phoneticHebrew: "מָאגָאנְדָא אָקוֹ... צָ'ארִיאָוט!"
              }
            }
          ],
          quiz: [
            {
              id: "q3_2_1",
              type: "multiple-choice",
              questionHebrew: "מה מקור מילת הסלנג הפיליפינית 'Lodi'?",
              options: ["מילה בספרדית", "היפוך אותיות של המילה האנגלית IDOL", "שם של מאכל", "קיצור של Hello"],
              correctAnswer: "היפוך אותיות של המילה האנגלית IDOL",
              explanationHebrew: "בפיליפינים אוהבים להפוך אותיות! Lodi = Idol, Petmalu = Malupit (אדיר/קשוח)."
            }
          ]
        }
      ]
    }
  ],

  // תרחישי שיחה לסימולטור (Role-Play Chat Simulator for Travelers)
  scenarios: [
    {
      id: "sc_01",
      titleHebrew: "הזמנת אוכל בשוק המקומי (Divisoria Market)",
      icon: "🍢",
      locationTagalog: "Divisoria Market, Manila",
      descriptionHebrew: "תרגלו הזמנת שיפודי עוף ואורז ממוכרת חביבה בשוק",
      initialMessageTagalog: "Magandang araw po! Ano po ang gusto ninyong kainin?",
      initialMessageHebrew: "יום טוב! מה תרצה לאכול?",
      initialMessagePhonetic: "מַגַאנְדַאנְג אָרָאוָו פּוֹ! אָנוֹ פּוֹ אָנְג גוּסְטוֹ נִין-יוֹנְג כָּאאִין?",
      userOptions: [
        {
          textTagalog: "Magkano po ang adobo at kanin?",
          textHebrew: "כמה עולה אדובו ואורז?",
          textPhonetic: "מַגְקָאנוֹ פּוֹ אָנְג אָדוֹבּוֹ אָאת כָּאנִין?",
          botResponseTagalog: "50 pesos lang po! Masarap at mainit pa.",
          botResponseHebrew: "50 פסו בלבד! זה טעים וחם מאוד.",
          botResponsePhonetic: "50 פֶּסוֹס לָאנְג פּוֹ! מַסָארָאפְּ אָאת מָאאִינִית פָּא.",
          xpReward: 20
        },
        {
          textTagalog: "Pahingi po ng tubig at isang kanin.",
          textHebrew: "אפשר מים ומנה אורז אחת בבקשה.",
          textPhonetic: "פָּאהִין-גִי פּוֹ נְג טוּבִֿיג אָאת אִיסָאנְג כָּאנִין.",
          botResponseTagalog: "Eto na po ang tubig at kanin ninyo! Tuloy po kayo.",
          botResponseHebrew: "הנה המים והאורז שלך! בתיאבון.",
          botResponsePhonetic: "אֶתוֹ נָא פּוֹ אָנְג טוּבִֿיג אָאת כָּאנִין נִין-יוֹ!",
          xpReward: 20
        }
      ]
    },
    {
      id: "sc_02",
      titleHebrew: "מיקוח ונסיעה בטרייסיקל (El Nido, Palawan)",
      icon: "🛺",
      locationTagalog: "El Nido Town, Palawan",
      descriptionHebrew: "דברו עם נהג הטריקסי לגבי נסיעה לחוף Nacpan Beach",
      initialMessageTagalog: "Tricycle boss! Saan po ang punta ninyo?",
      initialMessageHebrew: "טרייסיקל, בוס! לאן תרצה לנסוע?",
      initialMessagePhonetic: "תְּרָאי-סִיכֶּל בּוֹס! סָאַאן פּוֹ אָנְג פּוּנְתָּה נִין-יוֹ?",
      userOptions: [
        {
          textTagalog: "Papunta po sa Nacpan Beach. Magkano?",
          textHebrew: "נוסעים לחוף נאקפאן. כמה זה עולה?",
          textPhonetic: "פָּאפּוּנְתָּה פּוֹ סָא נָאכְפָּאן בִּיץ'. מַגְקָאנוֹ?",
          botResponseTagalog: "300 pesos po papunta doon, sir!",
          botResponseHebrew: "300 פסו לנסיעה לשם, אדוני!",
          botResponsePhonetic: "300 פֶּסוֹס פּוֹ פָּאפּוּנְתָּה דוֹ-אוֹן, סֶר!",
          xpReward: 25
        },
        {
          textTagalog: "Ang mahal naman! Pwede po 200 pesos lang?",
          textHebrew: "זה יקר מאוד! אפשר ב-200 פסו בבקשה?",
          textPhonetic: "אָנְג מָאהָאל נָאמָאן! פְּװֶדֶה פּוֹ 200 פֶּסוֹס לָאנְג?",
          botResponseTagalog: "Sige na nga, 250 pesos na lang para sa inyo! Sakay na po.",
          botResponseHebrew: "נו טוב, 250 פסו בשבילך! עמוד לעלות.",
          botResponsePhonetic: "סִיגֶה נָא נְגָא, 250 פֶּסוֹס נָא לָאנְג פָּארָא סָא אִין-יוֹ! סָאכָּאי נָא פּוֹ.",
          xpReward: 35
        }
      ]
    },
    {
      id: "sc_03",
      titleHebrew: "צ'ק-אין במלון / ריזורט (Panglao, Bohol)",
      icon: "🏨",
      locationTagalog: "Alona Beach, Bohol",
      descriptionHebrew: "בצעו צ'ק-אין בריזורט על הים ובקשו חדר עם נוף למים",
      initialMessageTagalog: "Magandang hapon po! Welcome sa resort! May reservation po ba kayo?",
      initialMessageHebrew: "אחר צהריים טובים! ברוכים הבאים לריזורט! יש לכם הזמנה?",
      initialMessagePhonetic: "מַגַאנְדַאנְג הָאפּוֹן פּוֹ! װֶלְכָּאם סָא רִיזוֹרְט! מַאי רֶזֶרְװֵישְׁן פּוֹ בָּא כָּאיָוֹ?",
      userOptions: [
        {
          textTagalog: "Opo, may reservation po ako under Dan.",
          textHebrew: "כן, יש לי הזמנה על שם דן.",
          textPhonetic: "אוֹפּוֹ, מַאי רֶזֶרְװֵישְׁן פּוֹ אָקוֹ אָנְדֶר דָאן.",
          botResponseTagalog: "Nakita ko na po! Eto na po ang keycard ng room ninyo.",
          botResponseHebrew: "מצאתי את ההזמנה! הנה מפתח החדר שלכם.",
          botResponsePhonetic: "נָאכִּיתָא כּוֹ נָא פּוֹ! אֶתוֹ נָא פּוֹ אָנְג כִּיכָּארְד נְג רוּם נִין-יוֹ.",
          xpReward: 30
        },
        {
          textTagalog: "Pwede po ba makakuha ng room na may sea view?",
          textHebrew: "האם אפשר לקבל חדר עם נוף לים?",
          textPhonetic: "פְּװֶדֶה פּוֹ בָּא מָאכָּאכּוּהָא נְג רוּם נָא מַאי סִי װְיוּ?",
          botResponseTagalog: "Oo naman po! In-upgrade ko na kayo sa ocean view room!",
          botResponseHebrew: "בוודאי! שדרגתי אתכם לחדר עם נוף לאוקיינוס!",
          botResponsePhonetic: "אוֹ-אוֹ נָאמָאן פּוֹ! אִין-אפגרייד כּוֹ נָא כָּאיָוֹ סָא אוֹשֶׁן װְיוּ רוּם!",
          xpReward: 40
        }
      ]
    },
    {
      id: "sc_04",
      titleHebrew: "השכרת אופנוע / קטנוע (Siargao Island)",
      icon: "🛵",
      locationTagalog: "General Luna, Siargao",
      descriptionHebrew: "השכירו קטנוע לנסיעות לגלישה ולטיולים באי",
      initialMessageTagalog: "Mabuhay! Gusto ninyo mag-rent ng motorbike para sa surfing?",
      initialMessageHebrew: "ברוכים הבאים! רוצים להשכיר אופנוע לנסיעה לגלישה?",
      initialMessagePhonetic: "מָאבּוּהָאי! גוּסְטוֹ נִין-יוֹ מַג-רֶנְט נְג מוֹטוֹר-בַּאיְכּ פָּארָא סָא סֶרְפִינְג?",
      userOptions: [
        {
          textTagalog: "Magkano po ang rent bawat araw?",
          textHebrew: "כמה עולה השכרה ליום?",
          textPhonetic: "מַגְקָאנוֹ פּוֹ אָנְג רֶנְט בָּאוָואת אָרָאוָו?",
          botResponseTagalog: "400 pesos lang po bawat araw kasama ang helmet!",
          botResponseHebrew: "400 פסו ליום בלבד כולל קסדות!",
          botResponsePhonetic: "400 פֶּסוֹס לָאנְג פּוֹ בָּאוָואת אָרָאוָו כָּאסָאמָא אָנְג הֶלְמֶת!",
          xpReward: 30
        },
        {
          textTagalog: "Kasama na po ba ang dalawang helmet at surf rack?",
          textHebrew: "האם זה כולל שתי קסדות ומתקן לגלשן?",
          textPhonetic: "כָּאסָאמָא נָא פּוֹ בָּא אָנְג דָאלָאוָואנְג הֶלְמֶת אָאת סֶרְף רָאכּ?",
          botResponseTagalog: "Opo! Nakakabit na ang surf rack. Ingat sa pagmamaneho!",
          botResponseHebrew: "כן! מתקן הגלשנים מורכב. נסיעה בטוחה!",
          botResponsePhonetic: "אוֹפּוֹ! נָאכָּאכָּאבִּית נָא אָנְג סֶרְף רָאכּ. אִין-גָאת סָא פָּאגְמָאמָאנֶה-הוֹ!",
          xpReward: 35
        }
      ]
    },
    {
      id: "sc_05",
      titleHebrew: "סיור שיוט בסירות (Coron Island Hopping)",
      icon: "⛵",
      locationTagalog: "Coron Town, Palawan",
      descriptionHebrew: "צאו לשיוט בסירת בנגקה (Bangka) בין אגמים ולגונות קסומות",
      initialMessageTagalog: "Good morning! Handa na ba kayo sa Island Hopping Tour ngayon?",
      initialMessageHebrew: "בוקר טוב! מוכנים לסיור האיים היום?",
      initialMessagePhonetic: "גוּד מוֹרְנִינְג! הָאנְדָא נָא בָּא כָּאיָוֹ סָא אָאיְלֶנְד הָאפִּינְג תוּר נְגָאיון?",
      userOptions: [
        {
          textTagalog: "Opo! Saan po ang unang pupuntahan natin?",
          textHebrew: "כן! לאן נוסעים קודם?",
          textPhonetic: "אוֹפּוֹ! סָאַאן פּוֹ אָנְג אוּנָאנְג פּוּפּוּנְתָּה-הָאן נָאתִין?",
          botResponseTagalog: "Pupunta tayo sa Kayangan Lake at Twin Lagoon!",
          botResponseHebrew: "נוסעים קודם לאגם קאיאנגאן וללגונה התאומה!",
          botResponsePhonetic: "פּוּפּוּנְתָּה תָּאיָוֹ סָא כָּאיָאנְגָאן לֵייכּ אָאת תְּוִוין לָאגוּן!",
          xpReward: 35
        },
        {
          textTagalog: "May kasama po bang masarap na tanghalian?",
          textHebrew: "האם יש ארוחת צהריים טעימה כלולה?",
          textPhonetic: "מַאי כָּאסָאמָא פּוֹ בָּא נָא מַסָארָאפְּ נָא תָּאנְג-הָאלִי-יָאן?",
          botResponseTagalog: "Opo! Magluluto kami ng inihaw na isda at mangga sa beach!",
          botResponseHebrew: "כן! נבשל דגים על האש ומנגו טרי בחוף!",
          botResponsePhonetic: "אוֹפּוֹ! מַגְלוּלוּתוֹ כָּאמִי נְג אִין-אִיחָאוָו נָא אִירְדָא אָאת מַאנְג-גָא סָא בִּיץ'!",
          xpReward: 40
        }
      ]
    },
    {
      id: "sc_06",
      titleHebrew: "מפגש והכרות עם מקומיים (Boracay Beach Cafe)",
      icon: "☕",
      locationTagalog: "Station 2, Boracay",
      descriptionHebrew: "ערכו שיחת היכרות קולחת עם חברים פיליפינים על החוף",
      initialMessageTagalog: "Hi! Bago ka lang ba dito sa Boracay? Kumusta ang biyahe mo?",
      initialMessageHebrew: "היי! אתה חדש כאן בבורקאי? איך הטיול שלך עד כה?",
      initialMessagePhonetic: "הַאי! בָּאגוֹ כָּה לָאנְג בָּא דִיטוֹ סָא בּוֹרָאכָּאי? קוּמוּסְטָה אָנְג בִּייָאהֶה מוֹ?",
      userOptions: [
        {
          textTagalog: "Ako si Dan mula sa Israel. Masarap at maganda dito!",
          textHebrew: "אני דן מישראל. טעים ויפהפה פה מאוד!",
          textPhonetic: "אָקוֹ סִי דָאן מוּלָא סָא אִישְׂרָאֵל. מַסָארָאפְּ אָאת מָאגָאנְדָא דִיטוֹ!",
          botResponseTagalog: "Wow! Welcome sa Pilipinas, kaibigan! Tara, kape tayo!",
          botResponseHebrew: "וואו! ברוך הבא לפיליפינים, חבר! בוא נשתה קפה יחד!",
          botResponsePhonetic: "וָואוֹ! װֶלְכָּאם סָא פִּילִיפִּינָאס, כָּאאִיבִֿיגַאן! תָּארָא, כָּאפֶּה תָּאיָוֹ!",
          xpReward: 45
        }
      ]
    }
  ]
};
