import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { createOpencodeClient } from '@opencode-ai/sdk';

dotenv.config();

// Load bot token from .env file
const token = process.env.TELEGRAM_BOT_API_KEY;

if (!token) {
  console.error('Error: TELEGRAM_BOT_API_KEY not found in .env file');
  process.exit(1);
}

// Initialize Opencode client
const opencodeServerUrl = process.env.OPENCODE_SERVER_URL || 'http://localhost:4096';

let opencodeClient = null;

async function initOpencode() {
  try {
    opencodeClient = createOpencodeClient({
      baseUrl: opencodeServerUrl,
      throwOnError: false
    });
    
    console.log('✓ Opencode client initialized');
    return true;
  } catch (error) {
    console.error('Failed to initialize Opencode client:', error.message);
    return false;
  }
}

// Create bot with polling enabled
const bot = new TelegramBot(token, { polling: true });

console.log('Bot is starting...');

// Initialize Opencode
initOpencode().then(() => {
  console.log('Opencode integration ready');
});

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "Why did the developer go broke? Because he used up all his cache! 💸",
  "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
  "Why do Java developers wear glasses? Because they can't C#! 👓",
  "What's a programmer's favorite place to hang out? Foo Bar! 🍻",
  "Why was the JavaScript developer sad? Because he didn't know how to 'null' his feelings! 😢",
  "What do you call a programmer from Finland? Nerdic! 🇫🇮",
  "Why did the programmer quit his job? Because he didn't get arrays! 📊"
];

// Single message handler for all commands
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';

  // Command handlers
  if (/^\/start$/.test(text)) {
      const welcomeMessage = `
🤖 Hello! I'm your Telegram bot integrated with Opencode.

Available commands:
/start - Start the bot
/help - Show this help message
/echo <text> - Repeat your text
/time - Get current date and time
/random - Get a random number (1-100)
/joke - Get a random joke
/opencode <prompt> - Ask Opencode AI something
/health - Check Opencode server status

Just send me a message and I'll echo it back!
      `.trim();
    bot.sendMessage(chatId, welcomeMessage);
    return;
  }

  if (/^\/help$/.test(text)) {
      const helpMessage = `
📋 Available Commands:

/start - Start the bot
/help - Show this help message
/echo <text> - Repeat your text
/time - Get current date and time
/random - Get a random number (1-100)
/joke - Get a random joke
/opencode <prompt> - Ask Opencode AI something
/health - Check Opencode server status

💡 Tip: You can also just send any message and I'll echo it back!
      `.trim();
    bot.sendMessage(chatId, helpMessage);
    return;
  }

  const echoMatch = text.match(/^\/echo (.+)/);
  if (echoMatch) {
    bot.sendMessage(chatId, `🔁 ${echoMatch[1]}`);
    return;
  }

  if (/^\/time$/.test(text)) {
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    });
    bot.sendMessage(chatId, `🕐 Current time:\n${timeString}`);
    return;
  }

  if (/^\/random$/.test(text)) {
    const randomNum = Math.floor(Math.random() * 100) + 1;
    bot.sendMessage(chatId, `🎲 Your random number: ${randomNum}`);
    return;
  }

  if (/^\/joke$/.test(text)) {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
    bot.sendMessage(chatId, `😄 ${randomJoke}`);
    return;
  }

  // Opencode integration command
  const opencodeMatch = text.match(/^\/opencode\s+(.+)/);
  if (opencodeMatch) {
    if (!opencodeClient) {
      bot.sendMessage(chatId, '❌ Opencode client not initialized. Please wait a moment and try again.');
      return;
    }

    const prompt = opencodeMatch[1];
    bot.sendMessage(chatId, '🤖 Processing with Opencode...');

    try {
      // Create a new session
      const session = await opencodeClient.session.create({
        body: { title: `Telegram: ${prompt.substring(0, 30)}...` }
      });

      if (!session.data?.id) {
        throw new Error('Failed to create session');
      }

      // Send prompt and get response
      const result = await opencodeClient.session.prompt({
        path: { id: session.data.id },
        body: {
          parts: [{ type: 'text', text: prompt }],
        },
      });

      // Extract response text
      let response = 'No response received';
      if (result.data?.info?.parts) {
        const textParts = result.data.info.parts
          .filter(part => part.type === 'text')
          .map(part => part.text);
        response = textParts.join('\n') || response;
      }

      // Clean up: delete the session
      await opencodeClient.session.delete({ path: { id: session.data.id } });

      bot.sendMessage(chatId, `📝 Response:\n\n${response}`);
    } catch (error) {
      console.error('Opencode error:', error);
      bot.sendMessage(chatId, `❌ Opencode error: ${error.message || 'Unknown error'}`);
    }
    return;
  }

  // Health check command
  if (/^\/health$/.test(text)) {
    if (!opencodeClient) {
      bot.sendMessage(chatId, '❌ Opencode client not initialized');
      return;
    }

    try {
      const health = await opencodeClient.global.health();
      bot.sendMessage(chatId, `✅ Opencode server is healthy\nVersion: ${health.data.version || 'unknown'}`);
    } catch (error) {
      bot.sendMessage(chatId, `❌ Server health check failed: ${error.message}`);
    }
    return;
  }

  // Unknown command
  if (text.startsWith('/')) {
    bot.sendMessage(chatId, "❓ Unknown command. Type /help to see available commands.");
    return;
  }

  // Echo non-command messages
  if (msg.text) {
    bot.sendMessage(chatId, `You said: "${msg.text}"`);
  }
});

// Error handling
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.message);
});

bot.on('error', (error) => {
  console.error('Bot error:', error.message);
});

console.log('Bot is running and ready to receive messages!');
