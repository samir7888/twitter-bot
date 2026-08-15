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
You are a tech Twitter growth expert. Write 5 original tweets (max 180 characters each) for a tech/founder audience on X. Follow this exact format:

1. Start with a sharp hook: specific result, contrarian take, or direct question
2. Use concrete numbers or clear choices (no vague claims)
3. End with reply bait: ask for experiences, tools, or opinions
4. Tone: direct, conversational, slightly contrarian, no fluff
5. Topics: AI, SaaS, growth, coding, monetization, X growth

Examples of style:
- "Before: 5s page load. After: 1.2s with lazy loading. What's your fastest optimization win?"
- "Everyone says [common advice]. I tested it for 90 days. Here's what actually moved revenue:"
- "What's the most underrated tool you use to [specific outcome]? Drop one below."

Generate 5 tweets. Each must be under 280 characters and end with a question or call for replies.
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
