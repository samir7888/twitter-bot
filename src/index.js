const config = require('./config');
const { getGitHubTrends } = require('./fetchers/github');
const { getHNTrends } = require('./fetchers/hn');
const { getRedditTrends } = require('./fetchers/reddit');
const { getXTechTrends } = require('./fetchers/x_tech');
const { getProductHuntToday } = require('./fetchers/producthunt');
const { getIndieHackerTrends } = require('./fetchers/indiehacker');
const { generateTweet } = require('./generator');
const { logTweet } = require('./utils/logger');
const { sendEmail } = require('./utils/send');

async function runTask() {
    console.log('--- Starting Content Automation Task ---');


    const sources = [
        'x_tech',           // Highest priority
        'producthunt',
        'hackernews',
        'github',
        'indiehacker',
        'reddit'
    ];

    // Select source - you could also weigh this by priority!
    const source = sources[Math.floor(Math.random() * sources.length)];
    const topic = config.topics[Math.floor(Math.random() * config.topics.length)];
    const tone = config.tones[Math.floor(Math.random() * config.tones.length)];

    console.log(`Source: ${source}, Topic: ${topic}, Tone: ${tone}`);

    // 2. Fetch trends
    let trends = [];
    try {
        if (source === 'x_tech') {
            trends = await getXTechTrends();
        } else if (source === 'producthunt') {
            trends = await getProductHuntToday();
        } else if (source === 'hackernews') {
            trends = await getHNTrends();
        } else if (source === 'github') {
            trends = await getGitHubTrends();
        } else if (source === 'indiehacker') {
            trends = await getIndieHackerTrends();
        } else if (source === 'reddit') {
            const sub = config.redditSubreddits[Math.floor(Math.random() * config.redditSubreddits.length)];
            trends = await getRedditTrends(sub);
            console.log(`Subreddit: r/${sub}`);
        }
        console.log(`Fetched ${trends.length} trends from ${source}.`);
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

    // // 4. Post
    // try {
    //     const tweet = await postToTwitter(tweetText);
    //     console.log(`Successfully posted tweet! ID: ${tweet.id}`);

    //     // 5. Log only on successful post
    //     logTweet(source, topic, tweetText);
    // } catch (error) {
    //     console.error('Failed to post tweet:', error.message);
    //     if (error.data) {
    //         console.error('Twitter API Error Details:', JSON.stringify(error.data, null, 2));
    //     }
    //     throw error; // Re-throw to ensure GitHub Actions shows failure
    // }


    // 5.Send email with the generated tweet
    await sendEmail({ tweet: tweetText });
    console.log('--- Task Completed ---');
}

// Support for running once (for manual tests or cron jobs)
if (require.main === module) {
    runTask();
}
module.exports = { runTask };
