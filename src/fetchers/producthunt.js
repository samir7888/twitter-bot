const axios = require('axios');
const cheerio = require('cheerio');

async function getProductHuntToday() {
    try {
        const { data } = await axios.get('https://www.producthunt.com/feed', {
            headers: { 
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36' 
            }
        });
        
        const $ = cheerio.load(data, { xmlMode: true });
        const trends = [];
        
        $('entry').each((i, el) => {
            if (i < 5) {
                const title = $(el).find('title').text().trim();
                const content = $(el).find('content').text().trim().replace(/<[^>]*>?/gm, ''); // basic html strip
                trends.push(`${title} - ${content.substring(0, 100)}...`);
            }
        });
        
        return trends;
    } catch (error) {
        console.error('Error fetching Product Hunt trends:', error.message);
        return [];
    }
}

module.exports = { getProductHuntToday };
