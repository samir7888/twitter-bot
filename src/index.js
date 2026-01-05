const config = require('./config');
const { getGitHubTrends } = require('./fetchers/github');
const { getHNTrends } = require('./fetchers/hn');
const { getRedditTrends } = require('./fetchers/reddit');
const { generateTweet } = require('./generator');
const { postToTwitter } = require('./poster/twitter');
const { logTweet } = require('./utils/logger');

async function runTask() {
    console.log('--- Starting Content Automation Task ---');

    // 1. Pick a random source and topic
    const sources = ['GitHub', 'Hacker News', 'Reddit'];
    const source = sources[Math.floor(Math.random() * sources.length)];
    const topic = config.topics[Math.floor(Math.random() * config.topics.length)];
    const tone = config.tones[Math.floor(Math.random() * config.tones.length)];

    console.log(`Source: ${source}, Topic: ${topic}, Tone: ${tone}`);

    // 2. Fetch trends
    let trends = [];
    try {
        if (source === 'GitHub') {
            trends = await getGitHubTrends();
        } else if (source === 'Hacker News') {
            trends = await getHNTrends();
        } else if (source === 'Reddit') {
            const sub = config.redditSubreddits[Math.floor(Math.random() * config.redditSubreddits.length)];
            trends = await getRedditTrends(sub);
            console.log(`Subreddit: r/${sub}`);
        }
    } catch (err) {
        console.error('Fetching failed, using static fallback context.');
    }

    if (trends.length === 0) {
        trends = [`Recent developments in ${topic}`, `Community discussions around ${topic}`];
    }

    // 3. Generate Content
    const tweetText = await generateTweet(trends, topic, tone);
    if (!tweetText) {
        console.error('Failed to generate tweet.');
        return;
    }

    console.log('Generated Tweet:', tweetText);

    // 4. Post
    try {
        const tweet = await postToTwitter(tweetText);
        console.log(`Successfully handled tweet! ID: ${tweet.id}`);

        // 5. Log
        logTweet(source, topic, tweetText);
    } catch (error) {
        console.error('Task failed.');
    }

    console.log('--- Task Completed ---');
}

// Support for running once (for manual tests or cron jobs)
if (require.main === module) {
    runTask();
}

module.exports = { runTask };
