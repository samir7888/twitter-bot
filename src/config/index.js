require("dotenv").config();

module.exports = {
  twitter: {
    appKey: process.env.API_KEY,
    appSecret: process.env.API_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    accessSecret: process.env.ACCESS_SECRET,
  },
  ai: {
    geminiKey: process.env.GEMINI_API_KEY,
    model: "gemini-3.5-flash-lite",
  },
  automation: {
    intervalHours: { min: 2, max: 4 },
    dryRun: process.env.DRY_RUN === "true",
  },
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  }
};
