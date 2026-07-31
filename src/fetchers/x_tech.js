const axios = require('axios');

async function getXTechTrends() {
    try {
        // Using dev.to API as a reliable source for trending tech posts
        // This is a great alternative to X Advanced Search which requires a paid API
        const { data } = await axios.get('https://dev.to/api/articles?top=1');
        
        return data.slice(0, 5).map(article => `${article.title} - ${article.description}`);
    } catch (error) {
        console.error('Error fetching X Tech (dev.to) trends:', error.message);
        return [];
    }
}

module.exports = { getXTechTrends };
