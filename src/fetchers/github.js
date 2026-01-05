const axios = require('axios');
const cheerio = require('cheerio');

async function getGitHubTrends() {
    try {
        const { data } = await axios.get('https://github.com/trending/javascript?since=daily');
        const $ = cheerio.load(data);
        const trends = [];

        $('.Box-row').each((i, element) => {
            if (i < 5) {
                const title = $(element).find('h2 a').text().trim().replace(/\s+/g, '');
                const description = $(element).find('p').text().trim();
                trends.push({ title, description });
            }
        });

        return trends.map(t => `${t.title}: ${t.description}`);
    } catch (error) {
        console.error('Error fetching GitHub trends:', error.message);
        return [];
    }
}

module.exports = { getGitHubTrends };
