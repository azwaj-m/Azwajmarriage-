import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          menu: "Menu",
          edit_profile: "Edit Profile",
          logout: "Logout",
          // انگریزی کے دیگر الفاظ یہاں آئیں گے
        }
      },
      ur: {
        translation: {
          menu: "مینو",
          edit_profile: "پروفائل تبدیل کریں",
          logout: "لاگ آؤٹ",
          // اردو کے دیگر الفاظ یہاں آئیں گے
        }
      }
    },
    fallbackLng: 'ur',
    debug: false,
    interpolation: {
      escapeValue: false,
    }
  });

export default i18n;
