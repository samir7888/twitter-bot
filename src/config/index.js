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
    "AI today",
    "web development market",
    "B2B SaaS and marketing",
    "deep tech news",
    "engineering culture",
    "coding,IT memes",
    "startup life",
    "post graduate education",
    "motivation",
    "Full stack, devops, could engineering",
    "technology",
    "data science",
    "data analyst",
    "football hot news",
  ],
  tones: [
    "Provocative shower thought",
    "Relatable builder struggle",
    "Industry hot take",
    "Direct community question",
    "Witty observation",
    "Tech skepticism",
    "Thoughtful criticism",
    "Reality check",
    "Balanced comparison",
    "Mentor-style advice",
    "humour",
    "general questioner",
  ],
  redditSubreddits: ["webdev","vibecoding","programming", "web3", "codingmemes"],
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  }
};
