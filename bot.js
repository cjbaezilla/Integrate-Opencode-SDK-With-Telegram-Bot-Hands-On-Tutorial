require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

// Load bot token from .env file
const token = process.env.TELEGRAM_BOT_API_KEY;

if (!token) {
  console.error('Error: TELEGRAM_BOT_API_KEY not found in .env file');
  process.exit(1);
}

// Create bot with polling enabled
const bot = new TelegramBot(token, { polling: true });

console.log('Bot is starting...');

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
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';

  // Command handlers
  if (/^\/start$/.test(text)) {
    const welcomeMessage = `
🤖 Hello! I'm your Telegram bot.

Available commands:
/start - Start the bot
/help - Show this help message
/echo <text> - Repeat your text
/time - Get current date and time
/random - Get a random number (1-100)
/joke - Get a random joke

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
