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
topics: [
  "founder struggles",
  "AI coding tools",
  "building in public",
  "growth strategies",
  "tools & subscriptions",
  "startup decisions",
  "indie hacking & revenue",
  "AI as co-founder",
  "consistency & focus",
  "distribution challenges",
  "solo founder life",
  "product vs marketing",
  "career transitions into AI",
  "tech stack choices",
  "startup validation"
],

tones: [
  "Direct founder question",
  "Slightly provocative take",
  "Relatable builder struggle",
  "Reality check",
  "Curious peer question",
  "Confident observation",
  "Light challenge",
  "Personal experience + question",
  "Simple industry truth",
  "Community engagement",
  "Sharp but friendly hot take",
  "Open discussion starter"
],
  redditSubreddits: ["webdev","vibecoding","programming", "codingmemes"],
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  }
};
