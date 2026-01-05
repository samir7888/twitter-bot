const axios = require('axios');

async function getHNTrends() {
    try {
        const { data } = await axios.get('https://hn.algolia.com/api/v1/search?tags=front_page');
        return data.hits.slice(0, 5).map(hit => `${hit.title} (${hit.url || 'no url'})`);
    } catch (error) {
        console.error('Error fetching HN trends:', error.message);
        return [];
    }
}

module.exports = { getHNTrends };
