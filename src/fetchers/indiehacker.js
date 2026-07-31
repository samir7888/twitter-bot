const axios = require('axios');

async function getIndieHackerTrends() {
    try {
        // Dev.to has a great indiehackers community tag, we use this to get builder struggles
        const { data } = await axios.get('https://dev.to/api/articles?tag=indiehackers');
        
        return data.slice(0, 5).map(article => `${article.title} - ${article.description}`);
    } catch (error) {
        console.error('Error fetching Indie Hacker trends:', error.message);
        return [];
    }
}

module.exports = { getIndieHackerTrends };
