const axios = require('axios');

async function getRedditTrends(subreddit) {
    try {
        const { data } = await axios.get(`https://www.reddit.com/r/${subreddit}/hot.json?limit=10`, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; TwitterBotFetcher/1.0)' }
        });
        return data.data.children
            .map(child => child.data.title)
            .slice(0, 5);
    } catch (error) {
        console.error(`Error fetching Reddit trends for r/${subreddit}:`, error.message);
        return [];
    }
}

module.exports = { getRedditTrends };
