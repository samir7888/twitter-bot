# X Automation / Twitter Bot

A Node.js automation project that generates and posts high-engagement, developer-focused social content by fetching trending topics from top tech sources and using AI to craft relatable polls and tweets.

## What it does

- `src/index.js` runs a complete content automation pipeline:
  1. Fetches trending topics from a prioritized list of sources (X Tech/dev.to, Product Hunt, Hacker News, GitHub, Indie Hackers, Reddit).
  2. Uses Gemini AI to generate a highly engaging, poll-style tweet based on strict language rules (simple everyday language, no jargon, relatable hooks).
  3. Sends the generated tweet via email using Resend for review (or can be configured to post directly).
- `bot.js` is a simpler legacy script that can select a random JSON file from `posts/` and post its `text` (and optional `image`) content to Twitter/X.
- Automated via GitHub Actions to run every **1 hour**.

## Project structure

- `bot.js` - simple Twitter posting script from local JSON files.
- `package.json` - project metadata and scripts.
- `posts/` - JSON post definitions and optional images.
- `src/` - automation source code.
  - `index.js` - main automation task orchestration.
  - `config/index.js` - configuration for topics, tones, and API keys.
  - `fetchers/` - trend fetchers for:
    - `x_tech.js` (Trending tech posts via dev.to)
    - `producthunt.js` (Daily launches via RSS)
    - `hackernews.js` (Top HN posts via Algolia)
    - `github.js` (Trending repos)
    - `indiehacker.js` (Builder struggles via dev.to tag)
    - `reddit.js` (Subreddit trends via RSS)
  - `generator/` - Gemini AI prompt-based tweet generation designed for maximum engagement.
  - `poster/twitter.js` - helper to post tweets via Twitter API v2.
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

## Usage

- Run the AI automation task (Fetches trends -> Generates tweet -> Emails/Posts):

```bash
npm run task
```

- Run the simple local Twitter bot (Posts from `posts/` folder):

```bash
npm run bot
```

## Notes

- The AI Generator is strictly prompted to mimic high-engagement developer accounts by creating punchy, jargon-free, poll-style posts.
- `src/index.js` currently generates tweet text and sends it by email; the direct Twitter posting flow is commented out by default for safety.
- The GitHub Actions workflow (`.github/workflows/post.yml`) is configured to run automatically every hour.
- Enable `DRY_RUN=true` when testing to avoid side effects.

## Requirements

- Node.js 18 or newer
- Twitter API credentials (read/write access)
- Gemini AI key (for generation)
- Resend API key (for email delivery)
