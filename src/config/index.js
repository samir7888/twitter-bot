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
    "coding struggles & wins",
    "startup life & MVPs",
    "dev career transitions",
    "full stack vs specialized roles",
    "DevOps & cloud engineering",
    "data science & ML",
    "programming languages & tools",
    "AI tools & productivity",
    "tech job market & remote work",
    "productivity & developer life"
],
 tones: [
    "Provocative shower thought",
    "Relatable builder struggle",
    "Bold industry hot take",
    "Curious community question",
    "Witty observation",
    "Light humour & sarcasm",
    "Tech skepticism",
    "Reality check",
    "Balanced comparison",
    "Mentor-style advice",
    "Future prediction",
    "Personal story + question"
],
  redditSubreddits: ["webdev","vibecoding","programming", "codingmemes"],
  resend: {
    apiKey: process.env.RESEND_API_KEY,
  }
};
