const { TwitterApi } = require('twitter-api-v2');
const config = require('../config');

const client = new TwitterApi(config.twitter);
const twitterClient = client.readWrite;

async function postToTwitter(text) {
    if (config.automation.dryRun) {
        console.log('[DRY-RUN] Would post to Twitter:', text);
        return { id: 'dry-run-id' };
    }

    try {
        const { data: createdTweet } = await twitterClient.v2.tweet(text);
        return createdTweet;
    } catch (error) {
        console.error('Error posting to Twitter:', error.message);
        if (error.data) console.error(JSON.stringify(error.data, null, 2));
        throw error;
    }
}

module.exports = { postToTwitter };
