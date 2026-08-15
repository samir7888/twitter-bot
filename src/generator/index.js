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
You are a tech Twitter growth strategist who studies viral accounts like @paulg, @karpathy, @TTrimoreau, and top YC founders. Your job: create tweets that maximize impressions, replies, and X Creator Payouts in 2026.

CONTEXT:
- X now pays based on qualified impressions from Premium subscribers on Home Timeline
- Tech/founder audiences have high Premium penetration ($8–25 per 1M impressions)
- Algorithm rewards: reply depth, bookmark rate, repost velocity, dwell time
- Best formats: stories (119 median score), lists (93), before/after, mistake confessions, unpopular opinions

TASK:
Generate 3 original tweets (max 280 characters each) for a tech/founder audience. Follow these rules:

1. HOOK TYPES (use variety):
   - Specific outcome: "We cut CAC 38% in 90 days. Not ads — outbound. Here's how:"
   - Mistake confession: "I burned $12k on the wrong ICP. 4 signs we missed:"
   - Unpopular opinion: "Most 'founder brand' advice is backwards for B2B."
   - Before/after: "Jan: 2 replies/week. Jun: 41. What changed:"
   - Story arc: "My first 6 years: failed 4 startups, $15k debt, 8 YC rejections. Last year: raised $3M, hit $1M ARR. What I learned:"
   - Observation + aphorism (PG style): "One way you can recognize [trend] is when [sharp insight]."

2. STRUCTURE:
   - First line must deliver value or curiosity gap (standalone payoff)
   - Use concrete numbers, not vague claims
   - End with reply bait: question, "What did I miss?", or "Drop your take below"
   - No emojis in first line (use max 1–2 total if needed)
   - No hashtags (algorithm understands context now)

3. TONE:
   - Direct, conversational, slightly contrarian
   - No corporate speak, no fluff, no AI-slop diction
   - Sound like a founder talking to other founders at 2 AM

4. TOPICS:
   - AI/LLMs, SaaS, growth, monetization, X growth, coding, startup lessons, fundraising, product-market fit

5. ENGAGEMENT OPTIMIZATION:
   - At least 2 tweets should be list format (3–5 items)
   - At least 1 tweet should be a mini-story (failure → lesson)
   - At least 1 tweet should be an unpopular opinion that invites debate
   - At least 1 tweet should be a before/after transformation

OUTPUT FORMAT:
Return exactly 3 tweets, numbered 1–3. Each on its own line, under 280 characters. No explanations, no extra text.

EXAMPLES OF STYLE (do not copy):
- "Validate first. I burned 5 years building things literally nobody wanted."
- "Most companies can get to $1M ARR with only two channels. Pick from: paid, cold email, cold DMs, founder-led social. Everything else is long-term."
- "One pattern I find useful for working with LLMs: lean back, switch to /voice, and just ramble for 10 minutes. Context > perfect prompts."
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
