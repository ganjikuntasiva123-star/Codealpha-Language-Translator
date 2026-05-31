const dotenv = require("dotenv");

dotenv.config();

const config = {
  port: process.env.PORT || 5050,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5050",
  translationProvider: process.env.TRANSLATION_PROVIDER || "google_free",
  microsoft: {
    key: process.env.MICROSOFT_TRANSLATOR_KEY || "",
    region: process.env.MICROSOFT_TRANSLATOR_REGION || "",
    endpoint:
      process.env.MICROSOFT_TRANSLATOR_ENDPOINT ||
      "https://api.cognitive.microsofttranslator.com"
  }
};

module.exports = config;
