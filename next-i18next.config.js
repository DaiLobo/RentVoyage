/** @type {import('next-i18next').UserConfig} */
module.exports = {
  i18n: {
    defaultLocale: "pt",
    locales: ["pt", "en"]
  },
  localePath:
    typeof window === "undefined"
      ? require("path").resolve("./public/locales")
      : "/public/locales",
  ns: ["common", "home", "about", "bookings", "chat", "login", "profile", "property", "register", "stays"],
  reloadOnPrerender: process.env.NODE_ENV === "development"
};
