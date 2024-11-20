/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en"]
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales/{{lng}}/{{ns}}.json")
      : "/public/locales/{{lng}}/{{ns}}.json",
  reloadOnPrerender: process.env.NODE_ENV === "development"
};
