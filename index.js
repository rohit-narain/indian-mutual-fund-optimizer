#!/usr/bin/env node

import { createInterface } from 'node:readline';
import Parser from 'rss-parser';
import { program } from 'commander';
import pc from 'picocolors';
import open from 'open';

// Global constants
const VALID_TOPICS = new Set([
  'WORLD',
  'NATION',
  'BUSINESS',
  'TECHNOLOGY',
  'ENTERTAINMENT',
  'SPORTS',
  'SCIENCE',
  'HEALTH',
]);

// Start terminal loading spinner
function startLoading(text) {
  const isTTY = process.stdout.isTTY && typeof process.stdout.clearLine === 'function';
  if (!isTTY) {
    console.log(pc.cyan('ℹ ') + text);
    return () => {};
  }

  const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
  let i = 0;
  process.stdout.write(pc.cyan(frames[0]) + ' ' + text);
  const interval = setInterval(() => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    i = (i + 1) % frames.length;
    process.stdout.write(pc.cyan(frames[i]) + ' ' + text);
  }, 80);

  return () => {
    clearInterval(interval);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
  };
}

// Convert pubDate to a relative time string
function getRelativeTime(pubDate) {
  const ms = Date.now() - new Date(pubDate).getTime();
  const mins = Math.floor(ms / 60000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

// Separate title from publisher/source
function parseTitle(rawTitle) {
  const parts = rawTitle.split(' - ');
  if (parts.length > 1) {
    const source = parts.pop();
    const cleanTitle = parts.join(' - ');
    return { cleanTitle, source };
  }
  return { cleanTitle: rawTitle, source: 'Google News' };
}

// Build the target Google News RSS Feed URL
function buildUrl(options) {
  const { search, topic, country = 'US', lang = 'en' } = options;
  const gl = country.toUpperCase();
  const hl = lang.toLowerCase();
  const ceid = `${gl}:${hl}`;

  if (search) {
    return `https://news.google.com/rss/search?q=${encodeURIComponent(search)}&hl=${hl}&gl=${gl}&ceid=${ceid}`;
  }

  if (topic) {
    const upperTopic = topic.toUpperCase();
    if (VALID_TOPICS.has(upperTopic)) {
      return `https://news.google.com/rss/headlines/section/topic/${upperTopic}?hl=${hl}&gl=${gl}&ceid=${ceid}`;
    }
    // Fallback to searching the topic as a keyword if it's not a standard category
    return `https://news.google.com/rss/search?q=${encodeURIComponent(topic)}&hl=${hl}&gl=${gl}&ceid=${ceid}`;
  }

  // Fallback to top stories
  return `https://news.google.com/rss?hl=${hl}&gl=${gl}&ceid=${ceid}`;
}

// Format and display the list of news articles
function displayNews(feed, limit) {
  const items = feed.items.slice(0, limit);

  console.log(pc.bold(pc.white('\n========================================')));
  console.log(pc.bold(pc.magenta(`📰  ${feed.title || 'Google News'}`)));
  console.log(pc.bold(pc.white('========================================\n')));

  if (items.length === 0) {
    console.log(pc.yellow('No news articles found.'));
    return [];
  }

  items.forEach((item, index) => {
    const { cleanTitle, source } = parseTitle(item.title || '');
    const relativeTime = getRelativeTime(item.pubDate);
    const indexStr = pc.cyan(`[${index + 1}]`);
    
    console.log(`${indexStr} ${pc.bold(pc.white(cleanTitle))}`);
    console.log(`    ${pc.dim('via')} ${pc.green(source)} ${pc.dim('•')} ${pc.yellow(relativeTime)}`);
    console.log(`    ${pc.blue(pc.underline(item.link))}`);
    console.log();
  });

  return items;
}

// Fetch RSS feed using rss-parser
async function fetchNewsFeed(url) {
  const parser = new Parser();
  const stopLoading = startLoading('Connecting to Google News...');
  let xmlText = '';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    xmlText = await response.text();
    
    // Sanitize raw ampersands that are not part of an existing XML/HTML entity
    const cleanedXml = xmlText.replace(/&(?!([a-zA-Z0-9]+|#[0-9]+|#x[a-fA-F0-9]+);)/g, '&amp;');
    
    const feed = await parser.parseString(cleanedXml);
    stopLoading();
    return feed;
  } catch (error) {
    stopLoading();
    console.error(pc.red(`\nFailed to fetch news from RSS feed: ${error.message}`));
    if (xmlText) {
      console.error(pc.yellow('\nResponse snippet:'));
      console.error(pc.dim(xmlText.substring(0, 300) + '...'));
    }
    process.exit(1);
  }
}

// Prompt loop for interactive mode
function startInteractiveMode(items) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const promptUser = () => {
    rl.question(
      pc.cyan(`\nEnter article number (1-${items.length}) to open in browser, or ${pc.bold('q')} to quit: `),
      async (answer) => {
        const trimmed = answer.trim().toLowerCase();
        if (trimmed === 'q' || trimmed === 'quit' || trimmed === 'exit') {
          rl.close();
          return;
        }

        const index = parseInt(trimmed, 10) - 1;
        if (!isNaN(index) && index >= 0 && index < items.length) {
          const item = items[index];
          console.log(pc.green(`Opening: "${item.title}"...`));
          try {
            await open(item.link);
          } catch (err) {
            console.error(pc.red(`Failed to open link: ${err.message}`));
          }
          promptUser();
        } else {
          console.log(pc.red('Invalid selection. Please enter a valid number or "q" to quit.'));
          promptUser();
        }
      }
    );
  };

  promptUser();
}

// CLI setup
program
  .name('google-news')
  .description('Get the latest news from Google News directly in your terminal')
  .version('1.0.0')
  .option('-s, --search <query>', 'Search for specific news topics or keywords')
  .option(
    '-t, --topic <topic>',
    'Specify a category topic (WORLD, NATION, BUSINESS, TECHNOLOGY, ENTERTAINMENT, SPORTS, SCIENCE, HEALTH)'
  )
  .option('-l, --limit <number>', 'Number of news articles to display', (val) => parseInt(val, 10), 10)
  .option('-c, --country <geo>', 'Two-letter ISO country code (e.g. US, IN, GB)', 'US')
  .option('-g, --lang <language>', 'ISO language code (e.g. en, hi, fr)', 'en')
  .option('-o, --open <index>', 'Open the article at the specified index in the default browser', (val) => parseInt(val, 10))
  .option('-i, --interactive', 'Run in interactive mode to select and open articles');

program.parse(process.argv);

const options = program.opts();

async function main() {
  const url = buildUrl(options);
  const feed = await fetchNewsFeed(url);
  const items = displayNews(feed, options.limit);

  if (items.length > 0) {
    if (options.open !== undefined) {
      const index = options.open - 1;
      if (index >= 0 && index < items.length) {
        console.log(pc.green(`Opening article ${options.open} in default browser...`));
        await open(items[index].link);
      } else {
        console.log(pc.red(`Invalid index for --open: ${options.open}. Must be between 1 and ${items.length}.`));
      }
    } else if (options.interactive) {
      startInteractiveMode(items);
    }
  }
}

main().catch((err) => {
  console.error(pc.red(`Error: ${err.message}`));
});
