const axios = require("axios");
const config = require("../config/env");

async function translateWithGoogleFree({ text, source, target }) {
  const params = {
    client: "gtx",
    sl: source || "auto",
    tl: target,
    dt: "t",
    q: text
  };

  const response = await axios.get("https://translate.googleapis.com/translate_a/single", {
    params,
    timeout: 15000
  });

  const translatedText = response.data?.[0]
    ?.map((part) => part?.[0])
    .filter(Boolean)
    .join("");

  if (!translatedText) {
    throw new Error("Translation service returned an empty response.");
  }

  return translatedText;
}

async function translateWithMicrosoft({ text, source, target }) {
  if (!config.microsoft.key || !config.microsoft.region) {
    throw new Error("Microsoft Translator key and region are required in .env.");
  }

  const params = {
    "api-version": "3.0",
    to: target
  };

  if (source && source !== "auto") {
    params.from = source;
  }

  const response = await axios.post(
    `${config.microsoft.endpoint}/translate`,
    [{ Text: text }],
    {
      params,
      timeout: 15000,
      headers: {
        "Ocp-Apim-Subscription-Key": config.microsoft.key,
        "Ocp-Apim-Subscription-Region": config.microsoft.region,
        "Content-Type": "application/json"
      }
    }
  );

  const translatedText = response.data?.[0]?.translations?.[0]?.text;

  if (!translatedText) {
    throw new Error("Microsoft Translator returned an empty response.");
  }

  return translatedText;
}

async function translateText({ text, source = "auto", target }) {
  if (config.translationProvider === "microsoft") {
    return translateWithMicrosoft({ text, source, target });
  }

  return translateWithGoogleFree({ text, source, target });
}

module.exports = {
  translateText
};
