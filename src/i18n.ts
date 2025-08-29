import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./resources/en.json";
import es from "./resources/es.json";

i18n.use(initReactI18next).init({
  resources: {
    en,
    es,
  },
  lng: "es",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
