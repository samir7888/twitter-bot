require('dotenv').config();

module.exports = {
    twitter: {
        appKey: process.env.API_KEY,
        appSecret: process.env.API_SECRET,
        accessToken: process.env.ACCESS_TOKEN,
        accessSecret: process.env.ACCESS_SECRET,
    },
    ai: {
        geminiKey: process.env.GEMINI_API_KEY,
        model: 'gemini-2.5-flash',
    },
    automation: {
        intervalHours: { min: 2, max: 4 },
        dryRun: process.env.DRY_RUN === 'true',
    },
    topics: ['React', 'Next.js','AI','Web3', 'web development', 'education', 'motivation', 'Full stack', 'technology'],
    tones: [
        'Thoughtful criticism',
        'Reality check',
        'Balanced comparison',
        'Mentor-style advice',
    ],
    redditSubreddits: ['reactjs', 'webdev', 'programming', 'web3'],
};
