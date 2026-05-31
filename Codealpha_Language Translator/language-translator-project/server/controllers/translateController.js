const { translateText } = require("../services/translateService");

async function translate(req, res, next) {
  try {
    const { text, source = "auto", target } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({
        success: false,
        message: "Text is required for translation."
      });
    }

    if (!target || !target.trim()) {
      return res.status(400).json({
        success: false,
        message: "Target language is required."
      });
    }

    const translatedText = await translateText({
      text: text.trim(),
      source,
      target
    });

    return res.status(200).json({
      success: true,
      data: {
        source,
        target,
        originalText: text.trim(),
        translatedText
      }
    });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  translate
};
