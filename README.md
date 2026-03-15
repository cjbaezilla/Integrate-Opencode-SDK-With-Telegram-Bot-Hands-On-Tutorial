# OpenCode SDK Telegram Bot Integration

A practical hands-on project that connects the OpenCode SDK with Telegram, allowing you to control and interact with OpenCode through simple Telegram messages. This integration transforms your Telegram account into a remote control for AI-powered coding assistance and remote operations.

## Project Overview

Imagine having an AI coding assistant that you can control from your phone or any device with Telegram. This project creates a bridge between Telegram messaging and the OpenCode SDK, enabling you to manage remote coding sessions, send prompts, execute commands, and perform file operations using natural language through Telegram.

The bot acts as a messenger between you and OpenCode. When you send a message to the bot on Telegram, it translates your request into OpenCode SDK operations and returns the results back to you in Telegram. This means you can start a coding session on a remote server, ask questions about code, request file operations, and get AI assistance all from the convenience of your Telegram app.

## Why Telegram?

Telegram is the ideal platform for this AI coding assistant integration for several compelling reasons:

**Completely Free** - Unlike other messaging platforms, Telegram offers its full Bot API at no cost. There are no subscription fees, message limits, or hidden charges. You can build and deploy bots without worrying about usage caps or per-message fees, making it perfect for experimentation and production use alike.

**Simple and Accessible** - Telegram's bot creation process is straightforward through BotFather, requiring just a few steps to obtain a token. The API is well-documented and developer-friendly, with excellent libraries like `node-telegram-bot-api` that simplify integration. The platform works consistently across all devices and operating systems.

**Freedom from Restrictions** - Unlike WhatsApp's business API, which imposes strict message templates, approval processes, and per-conversation costs, Telegram offers unrestricted messaging. You can send any type of content—code snippets, formatted text, files—without pre-approval or limitations.

**Privacy-First** - Telegram provides end-to-end encryption options and respects user privacy. Bots don't have access to personal data beyond what's necessary for functionality, and the platform doesn't harvest user data for advertising.

**Reliable Infrastructure** - Telegram's servers are robust and globally distributed, ensuring your bot remains accessible with minimal downtime. The messaging delivery is fast and reliable, making it suitable for real-time interactions.

These attributes make Telegram the clear choice for building a remote development assistant that's both cost-effective and powerful.

## Features

This integration provides several powerful capabilities:

**Remote Session Management** - You can create new OpenCode sessions, list all active sessions, and delete sessions you no longer need. Each session is isolated, so you can work on different projects simultaneously without interference.

**AI-Powered Prompts** - Send any coding-related question or instruction to the AI through Telegram. The bot forwards your prompts to OpenCode and returns the AI's responses, including code suggestions, explanations, and solutions.

**Command Execution** - The bot can execute various OpenCode commands on your behalf. This includes operations like analyzing code, generating documentation, refactoring code, and running development tasks.

**File Operations** - Work with files remotely. You can read file contents, write new content, and manage files in your workspace through simple Telegram commands.

**Structured Output** - The integration handles structured data formats, making it easy to work with JSON, code snippets, and formatted responses directly in Telegram.

**Real-time Interaction** - Get immediate feedback on your requests. The bot processes your messages and returns responses, allowing for an interactive coding assistant experience.

**Secure Access** - Since control is tied to your Telegram account, only authorized users who can communicate with the bot can interact with your OpenCode sessions.

## Prerequisites

Before you begin, you need to have the following in place:

**Node.js** - You need Node.js version 14 or higher installed on your computer. You can download it from nodejs.org. To check if you have Node.js installed, open a terminal or command prompt and type `node --version`.

**Telegram Bot Token** - You must create a Telegram bot through BotFather on Telegram. This token is like a password that identifies your bot to Telegram's servers. We'll cover how to get this in the installation steps.

**OpenCode Server** - You need access to a running OpenCode server. This could be a local installation on your machine or a remote server. **The server must be running before you start the Telegram bot.** The server URL is required for the bot to connect to OpenCode.

**Basic Terminal Knowledge** - You should be comfortable with basic command line operations like navigating folders and running commands.

**Git** - While not strictly required for operation, Git is helpful for cloning and managing the project code.

## Installation

Setting up the project involves a few straightforward steps. Let's walk through each one:

First, navigate to the project directory using your terminal. If you haven't cloned or downloaded the project yet, you'll need to do that first.

Once you're in the project folder, you'll install the required dependencies. The project uses the node-telegram-bot-api library to communicate with Telegram. Run the following command:

```
npm install
```

This command reads the package.json file and downloads all necessary libraries into the node_modules folder. You should see output showing which packages are being installed.

After installation completes, verify that the dependencies were installed correctly by checking that the node_modules folder exists and contains the node-telegram-bot-api package.

## Configuration

The project uses environment variables to store sensitive configuration information. This keeps your secrets safe and makes it easy to change settings without modifying the code.

### The .env File

In the project root, you'll find a .env file (or you'll need to create one). This file stores key-value pairs that the bot reads when it starts. Here are the variables you need to set:

**TELEGRAM_BOT_TOKEN** - This is the token you get from BotFather when you create your Telegram bot. It looks something like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`. This token tells Telegram which bot is sending messages.

**OPENCODE_SERVER_URL** - The URL where your OpenCode server is running. For a local server, this might be `http://localhost:3000` or another port depending on your configuration. For a remote server, use its full URL including the protocol.

**PORT** (optional) - The port on which your bot should run. Default is usually 3000, but you can change it if that port is already in use.

**NODE_ENV** (optional) - Set to `production` for production use or `development` for development mode, which might include extra logging.

### Setting Up the .env File

If the .env file doesn't exist yet, create it in the project root. Add your configuration like this:

```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
OPENCODE_SERVER_URL=http://localhost:3000
PORT=3000
```

Make sure to replace the placeholder values with your actual bot token and server URL. Keep this file private and never commit it to version control - it's already listed in .gitignore.

## Usage

Once you've installed dependencies and configured environment variables, you're ready to start the bot.

### Important: Start OpenCode Server First

**Before starting the Telegram bot, ensure your OpenCode server is running.** The bot connects to the OpenCode server specified in your `OPENCODE_SERVER_URL` environment variable. If the server is not running, the bot will start but the `/opencode` and `/health` commands will fail.

To start the OpenCode server locally:

```bash
opencode
```

Or if you have a remote server, make sure it's running and accessible at the URL you configured.

### Starting the Bot

Run the following command in your terminal:

```
npm start
```

If the start script isn't configured in package.json, you might need to run:

```
node index.js
```

or whatever your main entry file is called.

When the bot starts successfully, you should see output indicating that the bot is running and connected to Telegram. It will start polling for messages (checking Telegram for new messages regularly) or set up a webhook if configured that way.

### Interacting with the Bot

Open Telegram and find your bot by the username you gave it when creating it through BotFather. Start a conversation by sending the `/start` command. The bot should respond with a welcome message and instructions.

You can now send commands and messages to the bot. The bot will process your requests through the OpenCode SDK and return results.

### Available Telegram Commands

The bot supports several commands that map to OpenCode operations:

**/start** - Begins your interaction with the bot. Usually sends a welcome message with available commands and instructions.

**/help** - Shows detailed help information about all available commands and how to use them.

**/sessions** - Lists all active OpenCode sessions. You'll see session IDs, names, and status information.

**/create_session** - Creates a new OpenCode session for your work. You might be able to specify a name or project type.

**/delete_session** - Removes a session you no longer need. You typically need to provide a session ID.

**/prompt** - Sends a prompt to the AI. Use it like `/prompt How do I sort an array in JavaScript?` The bot forwards this to OpenCode and returns the AI's response.

**/execute** - Executes a specific command in OpenCode. This gives you more control over what operation is performed.

**/files** - Lists files in the current workspace or session.

**/read** - Reads the contents of a specific file. You'd provide the filename.

**/write** - Writes content to a file. You specify the filename and the content to write.

These commands are just examples. The actual implemented commands depend on what's been built in this project.

### Example Conversations

Here's what interacting with the bot might look like:

You: `/sessions`
Bot: `Active Sessions:\n1. session_123 - Project Alpha - Running\n2. session_456 - Code Review - Idle`

You: `/create_session My New Project`
Bot: `Session created successfully! Session ID: session_789`

You: `/prompt Write a Python function to reverse a string`
Bot: `Here's a function to reverse a string in Python:\n\ndef reverse_string(s):\n    return s[::-1]\n\nThis uses Python's slice notation with a step of -1.`

You: `/read main.py`
Bot: `Contents of main.py:\n\ndef hello_world():\n    print("Hello, World!")\n\nif __name__ == "__main__":\n    hello_world()`

## Architecture

Understanding how the integration works helps you extend it and troubleshoot issues. Here's the flow:

### Component Overview

The system has three main components working together:

1. **Telegram Bot** - The interface you interact with on Telegram. It receives your messages and sends back responses.

2. **Bot Application** - This is our Node.js code that sits between Telegram and OpenCode. It uses the node-telegram-bot-api library to connect to Telegram.

3. **OpenCode SDK** - The library that actually talks to OpenCode server and performs AI operations.

4. **OpenCode Server** - The backend service that runs AI models and manages sessions.

### Message Flow

When you send a message to the bot, here's what happens:

1. Telegram receives your message and makes it available through their Bot API.

2. The node-telegram-bot-api library polls Telegram or receives a webhook, and our code gets the message.

3. The bot application parses your message to determine what command you want to execute. For example, if you send `/prompt How do I center a div?`, the bot recognizes the `/prompt` command and extracts the text "How do I center a div?".

4. Using the OpenCode SDK, the bot makes an API call to the OpenCode server. It includes your prompt, the session ID (if you're in a session), and any other relevant parameters.

5. The OpenCode server processes your request using AI models. It might generate code, analyze files, or perform operations on a session.

6. The OpenCode server sends back a response, typically including text, code snippets, or status information.

7. Our bot application receives this response and formats it appropriately for Telegram.

8. The bot sends the formatted response back to your Telegram chat, completing the cycle.

### Session Management

Sessions are central to how OpenCode works. Each session represents an isolated workspace with its own files, context, and state. The bot helps you manage these sessions:

- When you create a session, the bot uses the OpenCode SDK to create it on the server and returns the session ID.
- The bot stores your current session ID (in memory or a simple database) so subsequent commands know which session to use.
- You can switch between sessions if you have multiple active ones.

### Error Handling

The bot includes error handling for common issues:
- Invalid commands receive helpful error messages
- Connection problems with OpenCode server are reported
- Telegram API errors are caught and logged

### Polling vs Webhook

The bot can operate in two modes:

**Polling** - The bot actively checks Telegram for new messages at regular intervals. This is simpler to set up and works in most environments. It's what's typically used in development.

**Webhook** - Telegram sends a POST request to your server when a message arrives. This is more efficient and real-time but requires a publicly accessible URL and SSL certificate.

The project may use polling by default, but you can configure webhook if needed.

## Code Examples

To help you understand and extend the integration, here are key code patterns used in the project:

### Setting Up the Telegram Bot

```javascript
const TelegramBot = require('node-telegram-bot-api');

// Your bot token from environment variables
const token = process.env.TELEGRAM_BOT_TOKEN;

// Create a bot that uses polling
const bot = new TelegramBot(token, { polling: true });

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Welcome to OpenCode Bot! Use /help to see available commands.');
});
```

### Connecting to OpenCode SDK

```javascript
const { createOpencodeClient } = require('@opencode-ai/sdk');

// Create OpenCode client
const opencode = createOpencodeClient({
  baseUrl: process.env.OPENCODE_SERVER_URL
});
```

### Creating and Managing Sessions

```javascript
// Create a new session
async function createSession(name) {
  try {
    const session = await opencode.sessions.create({ name });
    return session.id;
  } catch (error) {
    console.error('Failed to create session:', error);
    throw error;
  }
}

// List all sessions
async function listSessions() {
  try {
    const sessions = await opencode.sessions.list();
    return sessions;
  } catch (error) {
    console.error('Failed to list sessions:', error);
    throw error;
  }
}
```

### Sending Prompts

```javascript
async function sendPrompt(sessionId, prompt) {
  try {
    const response = await opencode.sessions.prompt(sessionId, {
      text: prompt
    });
    return response.output;
  } catch (error) {
    console.error('Failed to send prompt:', error);
    throw error;
  }
}
```

### Handling Commands

```javascript
// Handle /prompt command
bot.onText(/\/prompt (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const prompt = match[1]; // The text after /prompt

  // Get current session for this user (stored in a map)
  const sessionId = getSessionForUser(chatId);

  if (!sessionId) {
    bot.sendMessage(chatId, 'You need to create a session first. Use /create_session');
    return;
  }

  try {
    bot.sendMessage(chatId, 'Processing your prompt...');
    const response = await sendPrompt(sessionId, prompt);
    bot.sendMessage(chatId, response);
  } catch (error) {
    bot.sendMessage(chatId, 'Error: ' + error.message);
  }
});
```

### Storing User Sessions

```javascript
// Simple in-memory store (for production, use a database)
const userSessions = new Map();

function setSessionForUser(chatId, sessionId) {
  userSessions.set(chatId, sessionId);
}

function getSessionForUser(chatId) {
  return userSessions.get(chatId);
}
```

## Project Structure

Understanding the folder layout helps you navigate and modify the code:

```
project-root/
├── .env                    # Environment variables configuration
├── .gitignore              # Files to ignore in version control
├── package.json            # Node.js dependencies and scripts
├── package-lock.json       # Auto-generated dependency lock file
├── opencode.json           # OpenCode agent configurations
├── index.js                # Main bot application entry point
├── sessions.js             # Session management logic
├── handlers/               # Command handlers
│   ├── promptHandler.js
│   ├── fileHandler.js
│   └── sessionHandler.js
├── utils/                  # Utility functions
│   ├── formatters.js
│   └── validators.js
├── docs/                   # Documentation and reference materials
│   └── node-telegram-bot-api/  # Library documentation
└── prompts/                # AI prompt templates
    ├── documentor.txt
    └── gitmasters.txt
```

The exact file structure may vary depending on how the project is organized. The main entry point (usually index.js or app.js) is where the bot is initialized and set up.

## Contributing

Contributions to this project are welcome. Whether you want to add features, fix bugs, improve documentation, or suggest enhancements, your help is appreciated.

Before contributing, please:

1. Fork the repository and create a branch for your changes.
2. Make your changes with clear, descriptive commit messages.
3. Test your changes thoroughly to ensure they work as expected.
4. Update documentation if you add new features or change existing behavior.
5. Submit a pull request with a clear description of what you've done.

Areas where you might contribute include:
- Adding more OpenCode SDK features
- Improving error handling and user feedback
- Adding persistent storage for sessions
- Creating additional Telegram commands
- Writing tests for the bot functionality
- Improving the README and documentation

If you're unsure about something, feel free to open an issue to discuss before starting work.

## License

This project is provided as-is for educational and practical purposes. Please check the LICENSE file (if present) for specific licensing terms. If no license file exists, you may need to add one or clarify usage rights.

## Troubleshooting

### Common Issues

**"❌ Opencode client not initialized" or connection errors**
- Ensure the OpenCode server is running before starting the bot
- Verify `OPENCODE_SERVER_URL` in your `.env` file points to the correct address and port
- If using a remote server, check that it's accessible from your network
- Test the server URL in a browser or with curl: `curl http://localhost:4096/health`

**Bot starts but doesn't respond to messages**
- Check that your `TELEGRAM_BOT_API_KEY` is correct and the bot is not blocked by Telegram
- Ensure polling is enabled (the bot uses long polling by default)
- Check the console for any error messages

**"Unknown command" errors**
- Make sure you're using the correct command syntax (e.g., `/opencode <your prompt>`)
- Commands are case-sensitive and must start with `/`

**API or authentication errors**
- Verify `OPENCODE_SERVER_URL` is correct and accessible
- Check if your OpenCode server requires provider authentication (set in server config)

**Server health check fails**
- The OpenCode server may not be running or the port might be different
- If you changed the default port (4096), update `OPENCODE_SERVER_URL` accordingly

#### Diagnosing Connection Issues (ECONNREFUSED)

If your bot shows `TypeError: fetch failed` with `ECONNREFUSED`, use these diagnostic steps:

**1. Check if OpenCode server is running:**

**Windows:**
```cmd
tasklist | findstr opencode
```
You should see `opencode.exe` or `opencode-cli.exe` in the output.

**macOS/Linux:**
```bash
ps aux | grep opencode
```

**2. Find the actual port the server is using:**

**Windows:**
```cmd
netstat -ano | findstr LISTENING
```
Look for a process with `opencode.exe` or `opencode-cli.exe` in the PID column, then note the port (e.g., `127.0.0.1:50715`).

Alternative: Use PowerShell to find the port by process name:
```powershell
Get-NetTCPConnection -OwningProcess (Get-Process opencode*,opencode-cli* -ErrorAction SilentlyContinue).Id | Select-Object LocalAddress,LocalPort
```

**macOS/Linux:**
```bash
sudo lsof -i -P -n | grep opencode
```
or
```bash
netstat -tulpn | grep opencode
```

**3. Test connectivity to the discovered port:**
```bash
curl http://localhost:<PORT>/health
```
Replace `<PORT>` with the actual port number. You should receive a JSON response with `"healthy": true`.

**4. Update your `.env` file:**
```
OPENCODE_SERVER_URL=http://localhost:<ACTUAL_PORT>
```

### Verifying Setup

1. **First, ensure OpenCode server is running** (see diagnostic steps above if unsure)

2. Check that OpenCode server is healthy:
   ```bash
   curl http://localhost:<PORT>/health
   ```
   You should see a JSON response with `"healthy": true`. Replace `<PORT>` with your configured port (default: 4096).

3. Verify your `.env` file has the correct URL:
   ```
   OPENCODE_SERVER_URL=http://localhost:<PORT>
   ```

4. Test the bot connection:
   - Start the bot with `npm start`
   - Send `/health` command to the bot in Telegram
   - You should receive a response indicating the server is healthy

## Getting Help

If you encounter issues or have questions:

1. Check this README thoroughly for guidance
2. Review the OpenCode SDK documentation at https://opencode.ai/docs/sdk/
3. Look at the node-telegram-bot-api documentation in the docs/ folder
4. Search or open issues in the project repository

For questions about OpenCode itself, refer to their official documentation and support channels.

## Next Steps

After getting the bot running, you might want to:

- Connect the bot to a remote server so you can access it from anywhere
- Add user authentication to ensure only authorized people can control your OpenCode sessions
- Implement more sophisticated session management, perhaps with project templates
- Add logging to track bot usage and debug issues
- Create a dashboard to view sessions and activity
- Integrate with other tools you use in your development workflow
- Deploy the bot to a cloud service for 24/7 availability

This project is a foundation. You can build upon it to create a powerful remote development assistant tailored to your specific needs.

## Acknowledgments

This project leverages:
- OpenCode SDK for AI-powered coding assistance
- node-telegram-bot-api library for Telegram integration
- Node.js and npm for the runtime environment

Special thanks to the developers of these tools for making such integrations possible.