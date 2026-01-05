const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config');

async function generateTweet(trends, topic, tone) {
    if (!config.ai.geminiKey) {
        console.error('GEMINI_API_KEY is missing in .env');
        return null;
    }

    const genAI = new GoogleGenerativeAI(config.ai.geminiKey);
    const model = genAI.getGenerativeModel({ model: config.ai.model });

    const prompt = `
    You are a professional web developer and tech educator.
    Context: Trending topics in ${topic} include:
    ${trends.join('\n')}

    Rules for the tweet:
    - Focus on: ${topic}
    - Tone: ${tone}
    - Style: Conversational,use humor sometimes, developer-to-developer, slightly provocative but not hostile.
    - length: 1–2 sentences max.
    - Goal: Thoughtful, mildly controversial, and conversation-worthy. Invite discussion and disagreement.
    - Avoid: "Follow me", "Like and RT", generic motivation quotes, ragebait, or insults.
    - Emojis: Max 1.
    - Hashtags: Max 1 or 2 relevant hashtags.
    - Voice: Opinionated but reasonable. Balanced comparison or reality check. use like human voice.
    - Use simple words.
    Generate 1 tweet:
  `;

    try {
        const result = await model.generateContent(prompt);
        const text = result.response.text().trim().replace(/^"|"$/g, '');
        return text;
    } catch (error) {
        console.error('Error generating tweet:', error.message);
        if (error.response) {
            console.error('Response details:', JSON.stringify(error.response, null, 2));
        }
        return null;
    }
}

module.exports = { generateTweet };
