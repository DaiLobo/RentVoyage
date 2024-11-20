/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en"]
  },
  backend: {
    loadPath: "public/locales/{{lng}}/{{ns}}.json",
  },
  reloadOnPrerender: process.env.NODE_ENV === "development"
};
