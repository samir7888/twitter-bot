const axios = require('axios');
const cheerio = require('cheerio');

async function getRedditTrends(subreddit) {
    try {
        const { data } = await axios.get(`https://www.reddit.com/r/${subreddit}.rss`, {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' 
            }
        });
        
        const $ = cheerio.load(data, { xmlMode: true });
        const trends = [];
        
        $('entry title').each((i, el) => {
            if (i < 5) {
                trends.push($(el).text().trim());
            }
        });
        
        return trends;
    } catch (error) {
        console.error(`Error fetching Reddit trends for r/${subreddit}:`, error.message);
        return [];
    }
}

module.exports = { getRedditTrends };
