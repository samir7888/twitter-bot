# X Automation / Twitter Bot

A small Node.js automation project that generates and/or posts social content from local files and AI prompts.

## What it does

- `bot.js` selects a random JSON file from `posts/` and posts its `text` content to Twitter/X.
- It can also upload an image if the selected post JSON includes an `image` path.
- `src/index.js` contains a separate automation task that generates a tweet using Gemini AI and sends the result via email.
- The repo includes a mix of content automation and Twitter posting logic.

## Project structure

- `bot.js` - simple Twitter posting script using `twitter-api-v2`.
- `package.json` - project metadata and scripts.
- `posts/` - JSON post definitions and optional images.
- `src/` - automation source code.
  - `index.js` - main automation task orchestration.
  - `config/index.js` - configuration from environment variables.
  - `fetchers/` - trend fetchers for GitHub, Hacker News, and Reddit.
  - `generator/` - Gemini AI prompt-based tweet generation.
  - `poster/twitter.js` - helper to post tweets via Twitter API.
  - `utils/logger.js` - optional logging for posted tweets.
  - `utils/send.js` - email sender using Resend.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with the required credentials:

```env
API_KEY=your_twitter_api_key
API_SECRET=your_twitter_api_secret
ACCESS_TOKEN=your_twitter_access_token
ACCESS_SECRET=your_twitter_access_secret
GEMINI_API_KEY=your_gemini_api_key
RESEND_API_KEY=your_resend_api_key
DRY_RUN=true
```

3. Add post JSON files to the `posts/` directory.

Example `posts/post1.json`:

```json
{
  "text": "This is a sample tweet from the bot.",
  "image": "images/sample.jpg"
}
```

## Usage

- Run the simple Twitter bot:

```bash
npm run bot
```

- Run the AI automation task:

```bash
npm run task
```

## Notes

- `bot.js` uses local JSON files in `posts/` to choose tweet content.
- `src/index.js` currently generates tweet text and sends it by email; the posting flow is commented out.
- Enable `DRY_RUN=true` when testing to avoid sending real tweets.

## Requirements

- Node.js 18 or newer
- Twitter API credentials
- Gemini AI key (for generation via `src/generator`)
- Resend API key (for email notifications)
