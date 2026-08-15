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
You are a tech Twitter growth expert who studies high-reply accounts like @TTrimoreau, @GohilHardy, and @jaredsuniverse. Your specialty: creating simple, direct question tweets that get massive replies and impressions.

CONTEXT:
- X's 2026 algorithm rewards replies 27x more than likes, and author replies to comments 150x more
- Tech/founder audiences have high Premium subscriber rates ($8–25 per 1M impressions for payouts)
- Best-performing format for replies: direct questions with clear choices or specific asks
- Top accounts post 1–3 original tweets/day + 50–100 replies/day on other posts

TASK:
Generate 5 original tweets (max 280 characters each) for a tech/founder audience. Follow this exact format:

1. QUESTION TYPES (use variety):
   - Tool question: "What's your #1 tool for [specific outcome]?"
   - Choice question: "You can only use ONE [thing] for [goal]. Which one? -Option A -Option B -Option C"
   - Builder question: "What are you building that [specific criteria]?"
   - Experience question: "What's the most [adjective] [thing] you've [done/used]?"
   - Metric question: "What's a realistic [metric] for [stage] in [timeframe]?"
   - Mistake question: "What's the most common mistake you see in [topic]?"
   - Prediction question: "Will [trend] dominate in 2026? Yes/No/Ask me later"
   - Confession question: "How many [things] before you [action]? 1, 2, 3, or too many"

2. STRUCTURE RULES:
   - First word = hook (What, Which, How, What's, You)
   - No preamble, no "Quick question:" setup
   - Max 1 sentence (can have 2 if second is "Drop one below" or similar)
   - End with reply bait: "Drop one below", "Which one?", "What's yours?"
   - No hashtags, no emojis in first line (max 1 emoji total if needed)
   - Under 180 characters (test before outputting)

3. TONE:
   - Direct, conversational, founder-to-founder
   - No corporate speak, no AI-slop diction
   - Sound like you're asking in a Slack group or DM
   - Slightly casual but specific (not vague "thoughts?")

4. TOPICS:
   - AI/LLMs, SaaS, growth, X/Twitter growth, monetization, coding, startup lessons, product-market fit, fundraising, cold outreach, content strategy

5. ENGAGEMENT OPTIMIZATION:
   - At least 3 tweets should be choice format (A/B/C options)
   - At least 2 tweets should be tool/resource questions
   - At least 2 tweets should be builder/milestone questions
   - At least 1 tweet should be a hot take split (Yes/No/Ask me later)
   - At least 1 tweet should be a confession (number-based)
   - At least 1 tweet should be a prediction or trend question

OUTPUT FORMAT:
Return exactly 5 tweets, numbered 1–5. Each on its own line, under 280 characters. No explanations, no extra text. Also you can say what kind of image would be realted with the tweet to post(optional)

EXAMPLES OF STYLE (do not copy):
- "What tool do you use to understand why users leave?"
- "You can get unlimited traffic from ONE source. Which one? -Google -X -YouTube -SEO"
- "What are you building that people can already pay for?"
- "What's the most underrated tool you use to [specific outcome]? Drop one below."
- "How many drafts before you post? 1, 2, 3, or too many?"`;
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
