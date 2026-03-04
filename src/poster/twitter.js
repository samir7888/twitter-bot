const { TwitterApi } = require('twitter-api-v2');
const config = require('../config');

const client = new TwitterApi(config.twitter);
const twitterClient = client.readWrite;

async function postToTwitter(text, retries = 3) {
    if (config.automation.dryRun) {
        console.log('[DRY-RUN] Would post to Twitter:', text);
        return { id: 'dry-run-id' };
    }

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const { data: createdTweet } = await twitterClient.v2.tweet(text);
            return createdTweet;
        } catch (error) {
            console.error(`Attempt ${attempt}/${retries} - Error posting to Twitter:`, error.message);
            if (error.data) console.error(JSON.stringify(error.data, null, 2));
            
            // If it's a 503 (service unavailable) or 502 (bad gateway), retry after delay
            if ((error.code === 503 || error.code === 502) && attempt < retries) {
                const delay = Math.pow(2, attempt) * 1000; // Exponential backoff: 2s, 4s, 8s
                console.log(`Service unavailable, retrying in ${delay/1000}s...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                continue;
            }
            
            throw error;
        }
    }
}

module.exports = { postToTwitter };
