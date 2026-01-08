const { TwitterApi } = require('twitter-api-v2');
const fs = require('fs');
const path = require('path');

/**
 * Twitter Bot Configuration
 * Credentials are read from Environment Variables
 */
const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

// Use the read-write client
const twitterClient = client.readWrite;

async function postTweet() {
  try {
    console.log('--- Starting Twitter Bot Task ---');

    const postsDir = path.join(__dirname, 'posts');
    
    // Read all JSON files in the posts directory
    const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.json'));

    if (files.length === 0) {
      console.error('No post files found in the /posts folder.');
      return;
    }

    // Randomly select one post
    const randomFile = files[Math.floor(Math.random() * files.length)];
    const filePath = path.join(postsDir, randomFile);
    
    console.log(`Selected post: ${randomFile}`);

    const postData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { text, image } = postData;

    if (!text) {
      console.error('Missing "text" field in post JSON.');
      return;
    }

    let mediaId = null;

    // Upload image if provided
    if (image) {
      const imagePath = path.resolve(postsDir, image);
      if (fs.existsSync(imagePath)) {
        console.log(`Uploading image: ${imagePath}`);
        // Image upload uses v1.1 API
        mediaId = await client.v1.uploadMedia(imagePath);
        console.log(`Image uploaded successfully. Media ID: ${mediaId}`);
      } else {
        console.warn(`Image file not found at: ${imagePath}. Posting without image.`);
      }
    }

    // Publish tweet
    console.log(`Publishing tweet: "${text}"`);
    const tweetConfig = {};
    if (mediaId) {
      tweetConfig.media = { media_ids: [mediaId] };
    }

    const { data: createdTweet } = await twitterClient.v2.tweet(text, tweetConfig);
    
    console.log('Successfully posted tweet!');
    console.log(`Tweet ID: ${createdTweet.id}`);
    console.log('--- Task Completed ---');

  } catch (error) {
    console.error('Error occurred while running the bot:');
    if (error.data) {
      console.error(JSON.stringify(error.data, null, 2));
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

postTweet();
