const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../../logs.json');

function logTweet(source, topic, tweet) {
    const logEntry = {
        timestamp: new Date().toISOString(),
        source,
        topic,
        tweet,
    };

    let logs = [];
    if (fs.existsSync(logFile)) {
        try {
            logs = JSON.parse(fs.readFileSync(logFile, 'utf8'));
        } catch (e) {
            logs = [];
        }
    }

    logs.push(logEntry);
    fs.writeFileSync(logFile, JSON.stringify(logs, null, 2));
    console.log(`[LOGGED] Source: ${source}, Topic: ${topic}`);
}

module.exports = { logTweet };
