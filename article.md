# OpenCode SDK Telegram Bot: A Complete Beginner's Guide

## Introduction

Have you ever wanted to control your computer from your phone? Imagine being able to ask an AI assistant to help with programming tasks, generate code, and manage development work through simple text messages on Telegram. This is exactly what this project makes possible.

This guide will walk you through every single aspect of the OpenCode SDK Telegram Bot integration. By the end, you will understand exactly how this system works, how to set it up, how to use it, and how to extend it. No prior programming knowledge is needed. We will start from the very beginning and build up your understanding piece by piece.

This implementation lets you control computer functions through the OpenCode server SDK integration, similar to how the OpenClaw project can control computer behavior. The project connects Telegram messaging with OpenCode AI through a Node.js application. When you send a message to your Telegram bot, it forwards your request to an OpenCode server, processes the AI response, and sends the result back to you. It creates a remote control for AI-powered coding assistance that you can access from anywhere in the world using Telegram.

## Getting Started with Practical Examples

Before we dive deeper into the technical details, let us think about what you can actually do with this bot once it is running. Imagine you are at a coffee shop, away from your computer, and you remember you need to write a function to parse some data. You open Telegram on your phone, type a command to your bot, and ask it to generate Python code for parsing CSV files. Within seconds, you receive a complete, working function. You can then copy that code and paste it into your project. This is the power of having an AI coding assistant in your pocket.

Or consider this scenario: you are working on a complex bug and cannot figure out why your code is not behaving as expected. You could describe the problem to your bot, include the relevant code snippets, and ask for debugging help. The AI can analyze the code, identify potential issues, and suggest fixes. All of this happens through simple text messages, without needing to switch to a different application or interrupt your flow.

Another useful application is learning new programming concepts. If you are trying to understand how recursion works, you can ask your bot to explain it in simple terms, provide examples, and even generate practice problems. The bot becomes a personal tutor available anytime.

These examples illustrate why this integration is valuable. It puts powerful AI assistance within reach of anyone with a Telegram account, turning your phone into a portable development environment helper.

## What You Need to Know First

Before we dive into the code, let us establish some basic concepts. A Telegram bot is like a virtual assistant that lives inside Telegram. You can send it messages, and it responds automatically. The bot itself is just a program running on a computer somewhere. In our case, that program is written in Node.js, which is a way to run JavaScript outside of a web browser.

OpenCode is an AI-powered coding assistant platform. It provides artificial intelligence that can help with programming tasks: writing code, explaining concepts, analyzing files, and more. The OpenCode SDK is a library that lets other programs talk to OpenCode servers. Our bot uses this library to send your prompts to OpenCode and get responses.

The Node.js application we are building sits in the middle. It receives Telegram messages, uses the OpenCode SDK to process them, and returns results. Think of it as a translator that knows both Telegram's language and OpenCode's language.

## Understanding the Core Concepts in Everyday Terms

Let us build a solid foundation by explaining the key concepts in plain language. Do not worry if some of these terms are new; we will explore them thoroughly.

### What is a Bot, Really?

A bot is simply a computer program that automates tasks, like a robot but for software. In our case, the bot lives on a computer (maybe your laptop, a server, or a cloud machine) and waits for messages from Telegram. When you send a message to your bot on Telegram, that message travels across the internet to Telegram's servers. Your bot, which is constantly checking for new messages, sees your message, figures out what you want, does some processing, and sends a reply back through Telegram to your phone.

Think of it like having a personal assistant who sits at a desk with a telephone. You call that assistant (send a Telegram message), the assistant answers, understands your request, does some work, and calls you back with the answer. The assistant never sleeps, never gets tired, and can handle many requests over time.

### What is Node.js and Why Do We Use It?

Node.js is a way to run JavaScript code on a computer, not just in a web browser. Normally, JavaScript runs inside browsers like Chrome or Firefox, making web pages interactive. Node.js lets us use the same JavaScript language for general-purpose programming, like we would with Python or Java.

Why is this useful? Because JavaScript is widely known, has a huge ecosystem of libraries, and Node.js makes it easy to build network applications like our bot. With Node.js, we can listen for incoming network requests, make outgoing requests to other services, handle files, and do all the things we need for our bot.

Node.js also comes with npm, the Node Package Manager, which is like an app store for code libraries. When we need to talk to Telegram, we do not write all that code ourselves. We install a library called node-telegram-bot-api that already knows how to communicate with Telegram's servers. This saves enormous time and ensures reliability.

### What is an API?

API stands for Application Programming Interface. It is a contract that says: "If you send me a request in this specific format, I will send you back a response in this specific format." APIs are how different software systems talk to each other.

Telegram provides an API that lets bots send and receive messages. OpenCode provides an API that lets programs ask its AI to generate responses. Our bot uses both of these APIs. It sends requests to Telegram's API to get messages and to send replies. It sends requests to OpenCode's API to get AI responses.

Understanding APIs is fundamental because they are the glue connecting different systems. Every time you use an app on your phone that shows weather data, that app is probably making an API request to a weather service server.

### What is OpenCode?

OpenCode is an AI-powered coding assistant platform. Unlike ChatGPT or GitHub Copilot, OpenCode is designed specifically to help with programming tasks. It can write code, explain programming concepts, analyze existing codebases, run commands, edit files, and more. It is like having an experienced programmer sitting next to you, ready to help.

The OpenCode platform consists of a server that runs AI models and provides tools for file manipulation, command execution, and code analysis. The server exposes an API that clients can use to create sessions and interact with the AI.

OpenCode differs from general AI chat in that it is built for development work. It understands code, can read files from your computer, can execute terminal commands (with permission), and maintains context across a session. This makes it powerful for real development tasks.

## Project Structure

Let us first look at what files make up this project and what each one does. Here is the typical folder layout:

```
project-root/
├── .env                    # Secret configuration file
├── .gitignore              # Files to ignore in version control
├── package.json            # Project metadata and dependencies
├── package-lock.json       # Exact dependency versions (auto-generated)
├── opencode.json           # OpenCode agent and provider configuration
├── bot.js                  # Main application code
├── prompts/               # Prompt templates for agents
└── images/               # Documentation images
```

**bot.js** is the heart of the project. This 243-line file contains all the logic for the Telegram bot. It sets up the bot, connects to OpenCode, handles incoming messages, and dispatches responses. You will spend most of your time in this file when customizing the bot.

**package.json** is a configuration file for Node.js projects. It lists the project name, type, dependencies (other libraries we use), and scripts (commands to run). It tells Node.js which packages we need and how to start the application. Our package.json is simple: it specifies that we are using ES modules, depends on three packages, and has one script called "start" that runs "node bot.js".

**opencode.json** is the configuration file that OpenCode SDK reads to know which AI providers to use and how to configure its agents. This file must be in your project root because the SDK looks for it in the current working directory. It defines providers (connections to AI services) and agents (specialized AI personas with specific capabilities). The bot does not directly use this file, but the OpenCode SDK needs it to function.

**.env** stores environment variables – secret configuration values that should not be hard-coded in the source code. This file contains your Telegram bot token and OpenCode server URL. Keeping secrets in .env files is a common practice that makes it easy to change configuration without modifying code and helps avoid accidentally exposing credentials.

**node_modules/** is a folder where npm (Node Package Manager) installs all the dependencies. This folder is automatically created when you run "npm install" and contains thousands of files from the libraries you use. You never edit this folder manually.

**package-lock.json** is automatically generated by npm to lock the exact versions of all dependencies. This ensures that anyone installing the project gets the same versions, preventing "it works on my machine" problems.

**.gitignore** tells Git which files to ignore when tracking changes. It typically includes node_modules, .env, and other files that should not be committed to version control.

Now let us examine each file in detail and understand how they work together.

## The Project Structure in Depth

We already listed the files in the project structure, but let us explore how they work together and why each is necessary. Understanding these relationships will help you when you need to modify or debug the bot.

Imagine the project as a kitchen. The `bot.js` file is the chef who does the cooking. The `package.json` is the recipe book that lists all the ingredients (dependencies) needed. The `opencode.json` is a special instruction manual that tells the AI assistant (OpenCode) how to behave. The `.env` file is a secure note card where you write your secret passwords and keys. The `node_modules` folder is the pantry where all the ingredients (libraries) are stored after you bring them home from the store (npm install).

When you run `npm start`, here is what happens step by step:

1. Node.js reads `package.json` to understand the project and its dependencies.
2. Node.js loads the modules from `node_modules` that are referenced in the `import` statements at the top of `bot.js`.
3. The `dotenv.config()` call reads the `.env` file and puts those values into `process.env`, making them available as environment variables.
4. The bot code starts executing: it checks for the Telegram token, initializes the OpenCode client, and sets up event listeners.
5. The bot connects to Telegram and begins polling for messages.
6. The bot also tries to connect to the OpenCode server using the configuration from `opencode.json` and the URL from `.env`.

If any of these pieces is missing or misconfigured, the bot will fail to start or behave incorrectly. That is why understanding each file's role is essential for troubleshooting.

## Understanding package.json in Depth

package.json is one of the most important files in any Node.js project. It is the project's manifest that describes what the project is and what it needs. Let us look at our package.json line by line and understand the deeper implications.

```json
{
  "type": "module",
  "dependencies": {
    "dotenv": "^17.3.1",
    "node-telegram-bot-api": "^0.67.0",
    "@opencode-ai/sdk": "^1.2.26"
  },
  "scripts": {
    "start": "node bot.js"
  }
}
```

The `"type": "module"` declaration might seem small, but it has significant implications. In Node.js, there are two systems for organizing code: CommonJS (the old way using `require()` and `module.exports`) and ES Modules (the modern way using `import` and `export`). By setting `"type": "module"`, we tell Node.js that files in this project should use the ES Modules syntax. This is why we can write `import dotenv from 'dotenv'` at the top of `bot.js`. Without this line, Node.js would expect CommonJS syntax and would throw an error when it sees `import`.

The `"dependencies"` object lists the external libraries our project needs. Each entry has a package name and a version number. The version numbers have a caret (`^`) before them, which means "compatible with this version and newer patch versions, but not new major versions." For example, `^17.3.1` means version 17.3.1 up to, but not including, version 18.0.0. This is a safety measure: it allows you to get bug fixes and minor improvements automatically when you run `npm install`, but avoids automatically upgrading to versions that might introduce breaking changes.

The three dependencies each serve a specific purpose:

- **dotenv** handles environment variables. It is a tiny library, only a few kilobytes, but it does one job very well. When your application starts, it reads the `.env` file, parses each line as a key-value pair, and adds those pairs to `process.env`. This means you can access your secrets as `process.env.TELEGRAM_BOT_API_KEY` anywhere in your code. The library also handles edge cases like quoted values and comments, so you do not have to write that parsing logic yourself.

- **node-telegram-bot-api** is a comprehensive wrapper around Telegram's Bot API. Telegram's API is a set of web endpoints (URLs) that accept HTTP requests and return responses in JSON format. You could theoretically use a generic HTTP library like `fetch` or `axios` to call these endpoints directly, but `node-telegram-bot-api` makes it much easier. It handles authentication (adding your token to every request), provides a clean event-driven interface, manages the polling loop or webhook server, and offers convenient methods for sending messages, editing messages, handling different types of updates, and more. In our bot, we use the simplest part: we create a bot with polling enabled, listen for 'message' events, and call `sendMessage`. But this library could do much more if we needed.

- **@opencode-ai/sdk** is the official client library for OpenCode. It provides a typed, promise-based interface to the OpenCode HTTP API. Without this SDK, we would have to construct HTTP requests manually: building URLs, setting headers, formatting request bodies according to OpenCode's specification, parsing responses, and handling errors. The SDK abstracts all that away. We simply call methods like `opencodeClient.session.create()` and get back JavaScript objects. The SDK also reads the `opencode.json` configuration file to understand which providers and agents are available, and it handles the details of routing requests to the appropriate AI service.

The `"scripts"` section defines shortcuts that can be run with `npm run`. The `"start"` script runs `node bot.js`. This is conventional. You could also define other scripts like `"dev"` to run with auto-reload on file changes, or `"test"` to run tests, or `"lint"` to check code style. Having these scripts in `package.json` means other developers (or you in a few months) will know how to run common tasks just by reading this file.

When someone else wants to use your project, they run `npm install`. npm reads the `package.json`, downloads the specified versions of all dependencies (and their dependencies, and their dependencies' dependencies, forming a tree), and stores them in the `node_modules` folder. The `package-lock.json` file is created or updated to record the exact version of every package that was installed. This ensures that if someone else runs `npm install` later, they get the exact same set of packages, preventing "it works on my machine" problems.

## Understanding opencode.json in Depth

While package.json describes our project's dependencies, opencode.json configures the OpenCode SDK itself. This file must be in your project root because the SDK looks for it in the current working directory. Let us break it down and understand each concept thoroughly.

```json
{
  "$schema": "https://opencode.ai/config.json",
  "agent": {
    "documentor": { ... },
    "gitmasters": { ... }
  },
  "provider": {
    "openrouter-hunter-alpha": { ... },
    "openrouter-nemotron": { ... },
    "openrouter-stepfun": { ... },
    "openrouter-trinity": { ... }
  }
}
```

The `$schema` is not used by OpenCode directly; it helps code editors provide autocomplete and validation for this file. It points to the official OpenCode configuration schema. When you open this file in an editor like VS Code, the editor fetches that schema and uses it to warn you about invalid fields, suggest possible values, and show documentation on hover. This makes editing much easier and less error-prone.

The `agent` section defines specialized AI agents. Agents in OpenCode are like different personalities or specialists, each with their own prompt template, tools, and permissions. Think of them as different AI assistants optimized for specific tasks. In this project's configuration, we see two agents:

**documentor** is an agent designed to write accessible articles for non-technical audiences. It has permissions to read files, edit files, run bash commands, fetch web pages, perform tasks, and more. Its temperature is set to 0.8, meaning it is more creative and varied in responses. The prompt is loaded from `./prompts/documentor.txt`.

**gitmasters** is an agent focused on Git operations. It can perform all git-related tasks autonomously. Its temperature is 0.3, making it more deterministic and focused. It has similar tool permissions but asks before fetching web content (`"webfetch": "ask"` versus `"webfetch": "allow"`).

Each agent specifies several properties that control its behavior:

- `description`: A human-readable explanation of what this agent does. This is for your reference when managing agents.
- `mode`: The operational mode. `"subagent"` means it is a specialized assistant that can be invoked for particular tasks, rather than the default general-purpose agent.
- `model`: Which AI model the agent uses. This points to a model identifier defined in the `provider` section. In our configuration, both agents use `openrouter-stepfun/stepfun/step-3.5-flash:free`, which is a specific model provided through OpenRouter. The model determines the AI's capabilities, knowledge, response style, and cost.
- `prompt`: The path to a file that contains the system prompt. The system prompt is the set of instructions that define the agent's role, goals, constraints, and output format. It is essentially the "personality" or "job description" of the agent. For example, the documentor agent's prompt might say "You are a technical writer who explains complex topics in simple language for beginners."
- `temperature`: A number between 0 and 1 that controls randomness. Lower values (near 0) make the AI more deterministic and focused; it will give similar responses to similar prompts. Higher values (near 1) make the AI more creative and varied. For technical tasks like code generation, lower temperatures are often better because they produce more consistent results. For creative writing or brainstorming, higher temperatures can yield more diverse ideas. The documentor uses 0.8 for creativity, while gitmasters uses 0.3 for precision.
- `color`: A hex color code used to identify the agent in the OpenCode user interface. This is purely cosmetic.
- `permission`: What external operations the agent is allowed to perform. This is a critical security setting. Permissions include `bash` (run shell commands), `write` (edit files), `read` (read files), `webfetch` (fetch web pages), `task` (execute complex multi-step tasks), and more. You should grant only the permissions your agent needs. An agent that can run arbitrary shell commands could do harmful things if misused.
- `tools`: Which built-in tools the agent has access to. Tools are the primitive operations the agent can combine to accomplish tasks, such as `Bash`, `Glob`, `Grep`, `Read`, `Edit`, `Write`, `Task`, `WebFetch`, etc. The tools listed here must be among the agent's permissions.

The `provider` section defines how to connect to AI model services. OpenCode does not host AI models itself; it acts as a client that connects to external providers like OpenRouter, Anthropic, OpenAI, or others. Each provider entry specifies:

- `npm`: The npm package to use for this provider. For OpenRouter-compatible providers, it is typically `@ai-sdk/openai-compatible`. This package knows how to speak the OpenAI API format, which many providers (including OpenRouter) emulate.
- `name`: A human-readable name for the provider.
- `options`: An object containing connection details:
  - `baseURL`: The API endpoint URL for this provider, where requests will be sent.
  - `apiKey`: The secret API key for authentication with the provider. This key proves you have an account and are authorized to use the service.
  - `headers`: Additional HTTP headers to send with requests. Sometimes providers require custom headers for identification or tracking.
- `models`: A mapping from model identifiers (the strings used in an agent's `model` field) to human-readable names. For example, `"openrouter-stepfun/stepfun/step-3.5-flash:free": "Step Fun Step 3.5 Flash (Free)"`. This mapping allows OpenCode to display friendly names in the UI.

In our configuration, we see four providers, all through OpenRouter, each with different AI models. The bot can use any of these depending on which model is specified in an agent's configuration. OpenRouter is a service that aggregates many AI models from different vendors and provides a unified API. By using OpenRouter as a provider, we can access multiple models without changing our integration code.

Important security note: the `opencode.json` file may contain API keys in the `apiKey` fields. In a real deployment, you should never commit these keys to version control. Instead, you can set environment variables in the provider configuration, like `"apiKey": "${OPENROUTER_API_KEY}"`, and then set those environment variables on the system where the bot runs. The SDK will substitute environment variable references. If you do commit keys, at minimum ensure `.gitignore` excludes `opencode.json` and rotate the keys immediately.

In summary, opencode.json tells OpenCode: "Here are the AI services I have access to, and here are the specialized agents I want to use." The OpenCode SDK reads this file on initialization and sets up the necessary connections. This separation of configuration from code makes it easy to change models or agents without modifying bot.js.

## Understanding .env in Depth

The .env file stores environment variables – configuration values that our application reads at runtime. Environment variables are a universal way to configure applications across different environments (development, testing, production). Our bot.js reads two variables from .env:

```
TELEGRAM_BOT_API_KEY=your_telegram_bot_token_here
OPENCODE_SERVER_URL=http://localhost:4096
```

Environment variables are not unique to Node.js; they are a concept from operating systems. Before a program starts, the operating system can set key-value pairs in its environment, and the program inherits them. In Node.js, these are accessible through `process.env`, an object where each property is an environment variable. You could set environment variables in your shell before running the program: in bash, `export TELEGRAM_BOT_API_KEY=abc123`; in Windows Command Prompt, `set TELEGRAM_BOT_API_KEY=abc123`; in PowerShell, `$env:TELEGRAM_BOT_API_KEY="abc123"`.

However, hardcoding secrets in shell commands is cumbersome and insecure. The `.env` file method provides a convenient, safe place to store these values. The dotenv library reads the file when your app starts, parses each line, and assigns the values to `process.env`. From that point on, your code can access them just like any other environment variable.

`TELEGRAM_BOT_API_KEY` is the secret token you get from BotFather when creating a Telegram bot. This token identifies your bot to Telegram's servers. Anyone with this token can control your bot, send messages as your bot, and potentially perform actions depending on your bot's capabilities. So it must be kept secret. That is why we store it in .env and add .env to .gitignore. The token is a long string of letters, numbers, and sometimes colons, for example `1234567890:ABCdefGHIjkLMNOPqrSTUvwxYZ0123456789`.

`OPENCODE_SERVER_URL` tells the bot where to find the OpenCode server. The default is `http://localhost:4096`, meaning the server is running on the same machine as the bot, on port 4096. If your OpenCode server is on a different machine or uses a different port, you change this URL. For example, if your OpenCode server is on a remote machine with IP address 192.168.1.100 and you have configured it to listen on port 4096, you would set `OPENCODE_SERVER_URL=http://192.168.1.100:4096`. If you set up SSL/TLS, you would use `https://` instead of `http://`.

The .env file format is simple: `KEY=value` on each line, no spaces around the equals sign. The dotenv library is forgiving; it will ignore lines that do not match the pattern, and it supports quoted values if your value contains spaces (though you should not have spaces in these particular keys). Comments are allowed on lines starting with `#`. For example:

```
# Telegram bot configuration
TELEGRAM_BOT_API_KEY=123:ABC
# OpenCode server (local)
OPENCODE_SERVER_URL=http://localhost:4096
```

The `dotenv.config()` call reads .env and populates `process.env`. This must happen before you try to access the environment variables. That is why it is placed at the top of bot.js, immediately after the imports. If you try to access `process.env.TELEGRAM_BOT_API_KEY` before calling `dotenv.config()`, you will get `undefined` even if the .env file contains the key.

You can call `dotenv.config()` with an options object to specify a different path or control behavior, but the default works fine: it looks for a file named `.env` in the current working directory (the directory from which you started the process).

One important detail: environment variables are always strings. If you need a number or boolean, you must convert it yourself. For our purposes, strings are fine.

Why is the .env approach better than hard-coding values in bot.js? Several reasons:

1. **Security**: The .env file is typically added to .gitignore, so it never gets committed to version control. If your repository is public or shared with others, your secrets remain private.
2. **Configuration flexibility**: You can have different .env files for development, testing, and production. Or you can set actual environment variables on the system (which take precedence over .env), allowing you to deploy the same code to different environments without changing it.
3. **Separation of concerns**: Code and configuration are kept separate. The code does what it does regardless of the specific values; the configuration determines which specific resources the code connects to.
4. **Ease of change**: You can change the Telegram token or OpenCode server URL without touching the code. Just edit .env and restart the bot.

Always ensure `.env` is listed in `.gitignore`. Never share it. If you accidentally commit it, immediately rotate the secrets (generate new tokens/keys) and remove the file from the repository's history if possible.

## The Main Event: bot.js

Now we reach the core of the project. Let us go through bot.js line by line and understand what each part does. This file is where everything comes together. Before diving into the specifics, let us step back and understand the overall architecture and design patterns.

### Bot Architecture Overview

The bot follows a straightforward event-driven architecture. At its core, it sets up a listener for incoming Telegram messages. When a message arrives, the listener calls a function that examines the message text to determine what command or action the user wants, then performs the appropriate operations and sends a reply.

The bot consists of several logical layers:

1. **Configuration Layer**: At the top, we import dependencies and load configuration from `.env` and `opencode.json`. This layer establishes the bot's identity (Telegram token) and its connection to OpenCode.

2. **Initialization Layer**: We validate that required configuration is present and create instances of the Telegram bot and OpenCode client. The OpenCode client is created asynchronously because it may need to read configuration files and establish connections.

3. **Event Registration Layer**: We define functions to handle different events (incoming messages, polling errors) and register them with the bot. This tells the bot what to do when those events occur.

4. **Message Processing Layer**: The heart of the bot is the message event handler. This function runs every time a message is received. It performs command routing using regular expressions, executes the appropriate logic for each command, and handles errors.

5. **Response Layer**: Throughout the message handler, we call `bot.sendMessage` to send replies back to the user. These calls are asynchronous but generally we do not wait for them to complete before returning from the handler.

The bot runs in a single process, using Node.js's asynchronous, non-blocking I/O model. This means that while waiting for network operations (like calling the OpenCode API), the bot can handle other incoming messages. This is crucial for responsiveness: if we made synchronous network calls, the entire bot would freeze until the call returned, making it impossible to serve multiple users or handle concurrent requests.

Now let us go through bot.js line by line and understand what each part does.

### Imports and Setup (Lines 1-6)

```javascript
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import { createOpencodeClient } from '@opencode-ai/sdk';
import path from 'path';

dotenv.config();
```

The first four lines import the libraries we need:

`dotenv` – to load environment variables from .env
`node-telegram-bot-api` – to connect to Telegram
`createOpencodeClient` – the main function from the OpenCode SDK
`path` – Node.js built-in module for working with file paths (though we do not actually use it in this code)

Then `dotenv.config()` executes immediately, reading the .env file and populating `process.env` with its contents. This must happen before we try to access the environment variables.

### Loading the Telegram Token (Lines 8-14)

```javascript
const token = process.env.TELEGRAM_BOT_API_KEY;

if (!token) {
  console.error('Error: TELEGRAM_BOT_API_KEY not found in .env file');
  process.exit(1);
}
```

Here we read the Telegram bot token from the environment. We store it in a constant called `token`. Then we check whether it exists. If the token is missing (maybe the user forgot to create .env or did not put the token in it), we print an error message to the console and exit the program with a non-zero status code. `process.exit(1)` tells the operating system that the program failed to start.

This is an important validation step. Without the token, the bot cannot connect to Telegram, so there is no point continuing.

### OpenCode Server URL and Client Setup (Lines 16-19)

```javascript
const opencodeServerUrl = process.env.OPENCODE_SERVER_URL || 'http://localhost:4096';
let opencodeClient = null;
```

We read the OpenCode server URL from the environment, with a fallback default of `http://localhost:4096` if the variable is not set. The `||` operator returns the left side if it is truthy (not null, undefined, empty string), otherwise the right side.

We declare `opencodeClient` as a variable initialized to `null`. This variable will later hold the OpenCode client instance once we create it. We keep it in a variable (rather than a constant) because it starts as null and gets assigned later when we initialize the client asynchronously.

### Initializing OpenCode (Lines 21-37)

```javascript
async function initOpencode() {
  try {
    const config = {
      baseUrl: opencodeServerUrl,
      throwOnError: false,
      directory: process.cwd(),
    };

    opencodeClient = createOpencodeClient(config);
    
    console.log('✓ Opencode client initialized');
    return true;
  } catch (error) {
    console.error('Failed to initialize Opencode client:', error.message);
    return false;
  }
}
```

This `initOpencode` function sets up the OpenCode client. It is marked `async` because creating the client might involve asynchronous operations, such as reading the `opencode.json` file from disk (which is synchronous but could be done asynchronously in some implementations) or establishing connections to the OpenCode server. Even if the current implementation is mostly synchronous, marking it `async` allows us to use `await` inside and makes the function return a Promise, which fits better with the asynchronous nature of the rest of the bot.

Inside the function:

We build a `config` object with three properties:

`baseUrl` is the URL of the OpenCode server. We use the `opencodeServerUrl` we read from the environment. The SDK will use this base URL to construct full API endpoints, for example appending `/session` to create sessions.

`throwOnError: false` tells the SDK not to throw exceptions when errors occur. Instead, it will return objects that have an `error` property. This is an important design pattern. Most Node.js libraries throw exceptions on failure, which means you must wrap each call in try-catch. By setting `throwOnError: false`, the SDK adopts a "result object" pattern where every response is an object like `{ data: ..., error: ... }`. This allows you to check for errors at your convenience without writing try-catch for every line. It leads to flatter code where you can handle errors in one place rather than having many nested try-catch blocks. However, you must remember to check the `error` property after each call. Our code does this consistently in the `/opencode` handler.

`directory: process.cwd()` sets the directory where the SDK should look for `opencode.json`. `process.cwd()` returns the current working directory – the folder from which you started the bot. This is typically the project root. By specifying this, we ensure the SDK finds the configuration file regardless of where it is located relative to the bot script. If you started the bot from a different directory than the project root, you would need to adjust this or change your working directory before starting.

Then we call `createOpencodeClient(config)` which returns an OpenCode client object. We assign this to our outer variable `opencodeClient`. This makes the client available to the rest of the bot code. The client is reusable; we will use it for all OpenCode operations for all users.

We log a success message and return `true`. If an error occurs during creation (for example, if `opencode.json` is missing or malformed, or the server is unreachable), we catch it, log the error, and return `false`. Note that the caller uses `.then()` and does not distinguish between success and failure in terms of logging; it logs "Opencode integration ready" regardless. That is a minor bug: the success log should be inside the try block, or the caller should check the return value. In practice, the bot will still function (or not) based on whether `opencodeClient` is null or not, so it is not critical.

The use of an async initialization function rather than doing everything synchronously demonstrates good separation of concerns. The function encapsulates all OpenCode setup logic and returns a simple boolean indicating success. This makes the main flow cleaner.

### Creating the Telegram Bot (Lines 40-42)

```javascript
const bot = new TelegramBot(token, { polling: true });

console.log('Bot is starting...');
```

Here we create the Telegram bot instance. The `TelegramBot` constructor takes the token and an options object. Setting `polling: true` enables long polling mode. In polling mode, the bot actively checks Telegram for new messages at regular intervals. It keeps a connection open and waits for updates. It is simpler than webhook mode because we do not need to expose a public URL.

After creating the bot, we log "Bot is starting..." to indicate the initialization process is underway.

### Initializing OpenCode and Starting (Lines 44-49)

```javascript
// Initialize Opencode
initOpencode().then(() => {
  console.log('Opencode integration ready');
});
```

We call `initOpencode()` and use `.then()` to log when it completes. Since `initOpencode` returns a Promise, we can attach a callback that runs after the Promise resolves. This asynchronous call means we do not wait for OpenCode to finish initializing before moving on – the bot creation continues immediately. That is fine because the OpenCode client might take a moment to set up, and the bot will only process `/opencode` commands once `opencodeClient` is available.

The log message "Opencode integration ready" appears after initialization succeeds (or fails but returns true/false? Actually the `then` runs regardless of success, since we return boolean, not throw; but our catch returns false and still resolves, so `then` runs. The success message should probably be inside the try block after console.log. The current code logs "Opencode integration ready" even if initialization failed because the catch returns, which resolves the promise. This is a minor bug in the original code, but it does not affect functionality because we check `opencodeClient` later. For clarity, we could move the log inside the try block).

### The Jokes Collection (Lines 51-60)

```javascript
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
```

This is an array of programming-themed jokes. Arrays are ordered collections of items. In JavaScript, arrays are written with square brackets and items separated by commas. Here we have eight strings, each a joke. This array is stored in the constant `jokes` so we can later pick a random one when someone uses the `/joke` command.

### Message Handling: The Core Logic (Lines 62-232)

The heart of the bot is the message event handler. This is the function that runs for every incoming message. It embodies the command routing logic and ties together all the bot's capabilities.

```javascript
bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text || '';
```

`bot.on('message', ...)` registers a callback function that executes every time the bot receives a message. The callback receives the `msg` object which contains all information about the message: who sent it, what text it contains, when it was sent, message ID, and more. The callback is marked `async` because inside we will use `await` for OpenCode operations, making the handler asynchronous.

We extract `chatId` which is the unique identifier of the chat (conversation) with the user. Every chat in Telegram, whether private or group, has a numeric ID. We need this to send replies back to the same conversation.

We extract `text` from `msg.text`. Telegram messages may have various types: text, photos, stickers, documents, etc. We only handle text commands. If `msg.text` is undefined (non-text message), we use `|| ''` to default to an empty string. This prevents errors when we try to use string methods on undefined. Non-text messages will fall through to the echo fallback at the end, but since `msg.text` is undefined, the echo condition `if (msg.text)` will be false, so nothing happens. That is acceptable.

#### Command Routing Strategy

The handler uses a series of independent `if` statements, each checking whether the text matches a particular command pattern using regular expressions. The order matters in the sense that once a command matches, we `return`, preventing subsequent checks from running. This is a simple dispatch mechanism.

Each command pattern is mutually exclusive (no two commands can match the same text because they start with different literal strings). For example, `/start` cannot also match `/help`. Therefore, the order of the checks does not affect correctness, but it is logical to place the most common or most specific commands first.

The final two conditions handle fallback cases:
- If the text starts with `/` but did not match any known command, it is an unknown command.
- If the text does not start with `/`, it is a regular message to be echoed.

This two-tier fallback ensures that unknown commands are acknowledged as such, while non-command messages still get a response, making the bot feel interactive.

#### Why We Return After Each Command

Notice that every command block ends with `return;`. This is crucial. The `return` exits the async function immediately, so the bot stops processing that message after sending the reply. Without it, after handling `/start`, the code would continue to check the `/help` condition, then `/echo`, and so on, eventually reaching the "unknown command" block because the text starts with `/`. That would cause the bot to send multiple replies for a single message. The `return` prevents that by terminating the function after the first matching command.

#### Asynchronous Nature and Concurrency

Since the handler is `async` and we use `await` in commands that call OpenCode, the function may pause at those points. While it is paused, Node.js can handle other incoming messages. Each message triggers a new invocation of the handler, and those invocations run independently. This means multiple users can interact with the bot concurrently, even if one user's request is taking a long time to process. The bot does not block other users while waiting for OpenCode to respond. This is a key advantage of the async/await pattern.

#### Error Handling Philosophy

Within the message handler, errors are caught in the `/opencode` block with a `try`/`catch`. Other commands are simple and unlikely to throw, so they do not need try-catch. The error handling for OpenCode operations follows a pattern: attempt the operation, check for an `error` property on the result (because we set `throwOnError: false`), and throw a descriptive error if something went wrong. All errors in that block are caught by the outer catch, which logs the technical details to the console and sends a user-friendly message. This prevents the bot from crashing and provides a graceful degradation path.

The philosophy is: the bot should never crash because of a single bad request. It should handle errors, inform the user something went wrong, and continue running for the next message.

#### The /start Command (Lines 68-86)

```javascript
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
```

This block handles the `/start` command. The condition uses a regular expression: `/^\/start$/`. Regular expressions are patterns for matching text. Here, `^` means start of string, `\/` matches a literal slash (escaped because slash is special in regex), `start` matches the word "start", `$` means end of string. So this matches exactly the string "/start" and nothing else.

When the condition matches, we construct a welcome message as a multi-line string using backticks. The `.trim()` at the end removes leading and trailing whitespace, ensuring the message has no extra newlines at the beginning or end.

The welcome message explains what the bot is and lists all available commands. It also mentions that non-command messages will be echoed back.

We send the message using `bot.sendMessage(chatId, welcomeMessage)`. This is an asynchronous call, but we do not await it because we return immediately after. That is fine; the bot will send the message in the background.

Finally, `return` exits the event handler, preventing further processing. Without return, the bot would continue checking other conditions even after handling `/start`.

#### The /help Command (Lines 88-105)

```javascript
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
```

This is similar to `/start` but provides a slightly different message focused on command reference. It uses the same regex pattern matching `/^\/help$/`. The help message lists all commands with brief descriptions and includes a tip about echo behavior.

#### The /echo Command (Lines 107-111)

```javascript
const echoMatch = text.match(/^\/echo (.+)/);
if (echoMatch) {
  bot.sendMessage(chatId, `🔁 ${echoMatch[1]}`);
  return;
}
```

The `/echo` command is different because it takes an argument. The pattern `/^\/echo (.+)/` matches `/echo ` followed by one or more characters (captured in a group). The parentheses around `.+` create a capturing group. `text.match()` returns an array where index 0 is the full match and index 1 is the first captured group.

If the pattern matches, `echoMatch[1]` contains everything after `/echo `. We send that back prefixed with a 🔁 emoji. This command is useful for testing the bot or repeating text.

#### The /time Command (Lines 113-127)

```javascript
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
```

The `/time` command gets the current date and time. `new Date()` creates a Date object representing the current moment. The `toLocaleString` method formats the date according to locale-specific conventions. We pass 'en-US' for US English and an options object specifying which components to include.

The options produce a string like "Sunday, March 15, 2026, 18:07:30 GMT". We then send this back with a prefix "🕐 Current time:" and a newline.

#### The /random Command (Lines 129-133)

```javascript
if (/^\/random$/.test(text)) {
  const randomNum = Math.floor(Math.random() * 100) + 1;
  bot.sendMessage(chatId, `🎲 Your random number: ${randomNum}`);
  return;
}
```

`/random` generates a random integer between 1 and 100 inclusive. `Math.random()` returns a floating-point number in the range [0, 1). Multiplying by 100 gives [0, 100). `Math.floor()` rounds down to an integer in [0, 99]. Adding 1 shifts it to [1, 100].

We send the result with a dice emoji.

#### The /joke Command (Lines 135-139)

```javascript
if (/^\/joke$/.test(text)) {
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  bot.sendMessage(chatId, `😄 ${randomJoke}`);
  return;
}
```

This picks a random joke from the `jokes` array. `jokes.length` gives the number of jokes (8). `Math.floor(Math.random() * jokes.length)` generates an index from 0 to 7. We then retrieve that joke and send it with a smiling emoji.

#### The /opencode Command – OpenCode SDK Integration (Lines 141-199)

This is the most important command because it integrates with OpenCode. It demonstrates the complete workflow: create a session, send a prompt, get a response, delete the session.

```javascript
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

    if (session.error) {
      const errMsg = typeof session.error === 'string' ? session.error : 
                     session.error?.message || JSON.stringify(session.error);
      throw new Error(`Session creation failed: ${errMsg}`);
    }

    const sessionId = session.data?.id;
    if (!sessionId) {
      throw new Error('Failed to create session - no ID returned');
    }

    // Send prompt and get response
    const result = await opencodeClient.session.prompt({
      path: { id: sessionId },
      body: {
        parts: [{ type: 'text', text: prompt }],
      },
    });

    if (result.error) {
      throw new Error(typeof result.error === 'string' ? result.error : result.error.message || JSON.stringify(result.error));
    }

    // Extract response text
    let response = 'No response received';
    if (result.data?.parts) {
      const textParts = result.data.parts
        .filter(part => part.type === 'text')
        .map(part => part.text);
      response = textParts.join('\n') || response;
    }

    // Clean up: delete the session
    await opencodeClient.session.delete({ path: { id: sessionId } });

    bot.sendMessage(chatId, `📝 Response:\n\n${response}`);
  } catch (error) {
    console.error('Opencode error:', error);
    bot.sendMessage(chatId, `❌ Opencode error: ${error.message || 'Unknown error'}`);
  }
  return;
}
```

Let us break this down step by step with deeper insights.

First, we match the command using a regex with a capture group: `/^\/opencode\s+(.+)/`. This matches `/opencode` followed by whitespace (`\s+`) which can be one or more spaces or tabs, and then captures any characters `(.+)` until the end. The captured group is the user's prompt. For example, if the user sends `/opencode Write a Python hello world`, the capture group is "Write a Python hello world". The pattern is deliberately permissive about trailing content; it does not require the prompt to be the only thing in the message after the command, though in practice Telegram messages are just what the user types.

If there is a match but `opencodeClient` is still null (meaning initialization failed or is not yet complete), we send an error message and return. This prevents trying to use the SDK when it is not ready. It is a defensive check that makes the bot more robust during startup or if the OpenCode server is down.

We extract the prompt from `opencodeMatch[1]` and immediately send a message "🤖 Processing with Opencode..." to let the user know the bot is working on it. This acknowledgment is important because OpenCode processing may take several seconds, especially for complex prompts. Without this, the user might think the bot is broken and send the command again.

Then we enter a `try` block because all the OpenCode SDK calls are asynchronous and may fail. We want to catch errors and send a friendly error message to the user rather than crashing. The `try` block encompasses the entire OpenCode interaction: session creation, prompting, response extraction, and session deletion. If any of these steps fails, control jumps to the `catch`.

**Session creation**: We call `opencodeClient.session.create()` and await its result. The `await` keyword pauses execution of the handler until the Promise resolves. We pass an object with a `body` property containing a title. The title is "Telegram: " followed by the first 30 characters of the prompt, truncated with "..." if longer. This creates an identifiable session on the OpenCode server. The title will appear in the OpenCode UI and in logs, helping you distinguish sessions created from Telegram versus elsewhere.

The OpenCode SDK returns a response object. Because we set `throwOnError: false` in the client config, it does not throw exceptions; instead the object may have an `error` property indicating failure. We check `if (session.error)` and if present, we throw a new Error with a helpful message. We need to handle both string errors and error objects with a `message` property. The `|| JSON.stringify(session.error)` fallback ensures we always have a readable message, even if the error structure is unexpected.

Then we extract `sessionId` from `session.data?.id`. The optional chaining `?.` means if `session.data` is null or undefined, the whole expression evaluates to undefined instead of throwing an error. We check whether we got an ID and throw if not. Without a session ID, we cannot proceed.

**Sending the prompt**: Once we have a session ID, we call `opencodeClient.session.prompt()`. This sends the user's prompt to the OpenCode session and asks for a response. The arguments are:

`path: { id: sessionId }` – tells the SDK which session to prompt. This associates the prompt with the previously created session, allowing the AI to have context (though in our disposable pattern, we only send one prompt per session).

`body: { parts: [{ type: 'text', text: prompt }] }` – the content to send. OpenCode uses a "parts" structure similar to some AI APIs (like Google's Gemini). Here we provide one part with type "text" and the prompt text. This structure allows for multipart messages that could include text, images, or other data types in the same request. Since we only have text, we use a single part.

Again we await the result and check `result.error`. If there is an error, we throw. This ensures that any failure in the prompting phase is caught and reported.

**Extracting the response**: The result may contain `result.data.parts`, an array of response parts. Just as a prompt can have multiple parts, a response can have multiple parts: plain text, code blocks, images, etc. We filter for parts where `type === 'text'`, map each to its `text` property, and join them with newlines. This gives us the AI's textual response. If no text parts are found, we use the fallback "No response received". In practice, OpenCode should return at least one text part for a normal prompt, but it is good to have a fallback.

**Cleaning up the session**: After we have extracted the response, we delete the session using `opencodeClient.session.delete({ path: { id: sessionId } })`. This is important for resource management. Sessions consume server resources (memory, database entries, possibly file handles). If we left them all open, they would accumulate and eventually cause problems like running out of memory or hitting a session limit. We await the deletion to ensure it completes before we finish handling the command. If the delete fails, the `try`/`catch` will catch it and send an error to the user, though the user already received a response, which might be confusing. A more sophisticated approach could use a `finally` block to attempt deletion without affecting the user-visible outcome, but the current simple approach is acceptable for a small bot.

**Sending the final response**: We format the response with a header "📝 Response:" and a blank line, then send it to the user. The response may contain newlines, code snippets, or other formatting. Telegram will display it as plain text. In a more advanced bot, you could use Markdown parsing to format code blocks nicely.

**Error handling**: If any error occurs in the try block (session creation fails, prompt fails, extraction fails, deletion fails), we catch it. We log the error to the console for debugging (including the stack trace) and send a user-friendly error message. The `${error.message || 'Unknown error'}` shows the error message if available, otherwise a generic message. This ensures the user knows something went wrong, and the console logs give the developer details to diagnose.

Finally we `return` to prevent falling through to the unknown command or echo handlers.

#### The Disposable Session Pattern

The pattern used here – create a session, use it once, delete it – is called a "disposable session" or "ephemeral session" pattern. It is simple and effective for isolated, one-off questions. It guarantees that no sessions are left on the server to accumulate. Every `/opencode` request is independent; the AI does not remember previous interactions.

The trade-off is that you cannot have a continuous conversation with the AI where context carries over. If you ask a follow-up question, the AI has no memory of the previous exchange. For simple information queries, this is fine. For longer dialogues, you would need persistent sessions.

We will explore how to implement persistent sessions later in the "Session Management Deep Dive" section, where we discuss storing session IDs per user and reusing them across multiple prompts.

#### The /health Command

Let us examine the health check command to see how we monitor the OpenCode server.

#### The /health Command (Lines 201-220)

```javascript
if (/^\/health$/.test(text)) {
  if (!opencodeClient) {
    bot.sendMessage(chatId, '❌ Opencode client not initialized');
    return;
  }

  try {
    const sessions = await opencodeClient.session.list();
    if (sessions.error) {
      bot.sendMessage(chatId, `❌ Server health check failed: ${typeof sessions.error === 'string' ? sessions.error : JSON.stringify(sessions.error)}`);
    } else {
      const count = Array.isArray(sessions.data) ? sessions.data.length : 0;
      bot.sendMessage(chatId, `✅ Opencode server is healthy\nActive sessions: ${count}`);
    }
  } catch (error) {
    bot.sendMessage(chatId, `❌ Server health check failed: ${error.message}`);
  }
  return;
}
```

`/health` checks whether the OpenCode server is running and how many sessions are currently active. It first checks if the client is initialized, then calls `opencodeClient.session.list()` to get a list of all sessions on the server.

If there is an error (`sessions.error`), we send a failure message. Otherwise we count how many sessions are in `sessions.data` (assuming it is an array) and report that number.

This command is useful for verifying that the bot can reach the OpenCode server and for monitoring resource usage.

#### Unknown Commands and Echo Fallback (Lines 222-231)

```javascript
// Unknown command
if (text.startsWith('/')) {
  bot.sendMessage(chatId, "❓ Unknown command. Type /help to see available commands.");
  return;
}

// Echo non-command messages
if (msg.text) {
  bot.sendMessage(chatId, `You said: "${msg.text}"`);
}
```

The last two conditions handle messages that did not match any specific command.

First, if the text starts with a slash (`/`), it means the user tried a command that does not exist. We send a helpful message pointing to /help.

Second, if the message is regular text (not a command), we simply echo it back with "You said: " prefix. This is the "just send me a message" behavior mentioned in the welcome and help messages.

Notice that these conditions do not have `return` after them. That is because they are the last conditions and there is nothing more to do. The function ends naturally.

### Bot Error Handling (Lines 234-241)

```javascript
bot.on('polling_error', (error) => {
  console.error('Polling error:', error.message);
});

bot.on('error', (error) => {
  console.error('Bot error:', error.message);
});
```

These are separate event listeners that catch errors at the bot level. `polling_error` fires when there is a problem with the polling connection to Telegram. `error` catches general bot errors. Both simply log the error message to the console. This ensures that errors do not crash the process without any trace.

### Startup Confirmation (Line 243)

```javascript
console.log('Bot is running and ready to receive messages!');
```

After all setup is done and the error handlers are registered, we log a final confirmation that the bot is up and running. This line executes after `initOpencode().then(...)` is set up but before that Promise resolves. It gives immediate feedback that the script did not exit early.

## Session Management Deep Dive

Sessions are a core concept in OpenCode. Understanding them helps you use the bot effectively and extend it.

A session in OpenCode is an isolated workspace. Each session has:
- A unique ID
- A title (human-readable name)
- Its own file system context (if file operations are enabled)
- Conversation history with the AI
- State that persists across multiple prompts

When you use the `/opencode` command in our current bot, we create a brand new session, send your prompt, retrieve the response, and immediately delete the session. This is a "use and discard" pattern. It works well for one-off questions because each request is independent and we clean up automatically.

But you might want to have longer conversations where context carries over. In that case, you would change the bot to:
1. Create a session only once per user or per context
2. Store the session ID (in memory or a database)
3. Reuse that session for subsequent prompts
4. Optionally provide a command to list and switch between sessions
5. Only delete sessions when explicitly requested

Our health check command (`/health`) lists all sessions currently on the server. With the current disposable-session pattern, this count should usually be zero or very low, because we delete after each use. If the server crashes or the bot exits without cleaning up, sessions might be left orphaned; health check would reveal them.

The OpenCode SDK provides these session operations:
- `session.create({ body: { title } })` – create a new session
- `session.list()` – list all sessions
- `session.prompt({ path: { id }, body: { parts } })` – send a prompt to a specific session
- `session.delete({ path: { id } })` – delete a session
- `session.heartbeat({ path: { id } })` – keep a session alive (prevent timeout)

In a more advanced bot, you could add commands like `/sessions` to list your sessions, `/switch <id>` to change the active session, `/delete <id>` to remove a specific session, and `/continue` to continue the last session without creating a new one.

## Implementing Persistent Sessions: A Practical Guide

Let us walk through a concrete implementation of persistent sessions. The goal is: each Telegram user gets their own session that persists across multiple `/opencode` calls, so the AI remembers the conversation history.

We will need to:
- Track which session ID belongs to which Telegram user.
- When a user issues `/opencode`, check if they already have an active session.
- If yes, reuse that session ID.
- If no, create a new session and store the mapping.
- Provide a way for users to end their session explicitly (e.g., `/end`).
- Optionally, clean up old sessions after a timeout.

### Storing Session Mappings

For simplicity, we can use a JavaScript Map in memory:

```javascript
const userSessions = new Map(); // key: userId (number), value: sessionId (string)
```

This works as long as the bot runs continuously. If the bot restarts, the map is lost and users will lose their sessions. For persistence across restarts, you would need a database (SQLite, PostgreSQL, Redis, etc.) or at least save to a file.

We will add the map near the top of bot.js, after the jokes array:

```javascript
const userSessions = new Map();
```

### Modifying the /opencode Command

Replace the current `/opencode` handler with the following logic:

```javascript
const opencodeMatch = text.match(/^\/opencode\s+(.+)/);
if (opencodeMatch) {
  if (!opencodeClient) {
    bot.sendMessage(chatId, '❌ Opencode client not initialized. Please wait a moment and try again.');
    return;
  }

  const userId = msg.from.id;
  let sessionId = userSessions.get(userId);

  // If user has no active session, create one
  if (!sessionId) {
    bot.sendMessage(chatId, '🤖 Creating new session...');
    try {
      const session = await opencodeClient.session.create({
        body: { title: `User ${userId}: ${prompt.substring(0, 20)}...` }
      });
      if (session.error) {
        throw new Error(`Session creation failed: ${session.error.message || session.error}`);
      }
      sessionId = session.data.id;
      userSessions.set(userId, sessionId);
    } catch (error) {
      console.error('Failed to create session:', error);
      bot.sendMessage(chatId, `❌ Failed to create session: ${error.message}`);
      return;
    }
  }

  const prompt = opencodeMatch[1];
  bot.sendMessage(chatId, `🤖 Processing (session: ${sessionId.substring(0, 8)}...)...`);

  try {
    const result = await opencodeClient.session.prompt({
      path: { id: sessionId },
      body: { parts: [{ type: 'text', text: prompt }] },
    });

    if (result.error) {
      throw new Error(result.error.message || result.error);
    }

    let response = 'No response received';
    if (result.data?.parts) {
      const textParts = result.data.parts
        .filter(part => part.type === 'text')
        .map(part => part.text);
      response = textParts.join('\n') || response;
    }

    bot.sendMessage(chatId, `📝 Response:\n\n${response}`);
  } catch (error) {
    console.error('Opencode error:', error);
    bot.sendMessage(chatId, `❌ Opencode error: ${error.message || 'Unknown error'}`);
  }
  return;
}
```

Key changes:
- We get `userId` from `msg.from.id`. This is a unique number identifying the Telegram user.
- We look up `sessionId` in `userSessions` map.
- If not found, we create a new session and store the mapping.
- In the prompt call, we use the stored `sessionId`.
- We do **not** delete the session after use. The session stays alive, accumulating conversation history.
- The acknowledgment message now shows a truncated session ID so the user knows which session is active (optional).
- If the bot restarts, `userSessions` is empty, so users will get new sessions (their old sessions remain on the server until manually cleaned up or timed out).

### Adding a Command to End a Session

We should let users end their conversation and free resources. Add this handler:

```javascript
if (/^\/end$/.test(text)) {
  const userId = msg.from.id;
  const sessionId = userSessions.get(userId);
  if (!sessionId) {
    bot.sendMessage(chatId, "You don't have an active session.");
    return;
  }
  try {
    await opencodeClient.session.delete({ path: { id: sessionId } });
    userSessions.delete(userId);
    bot.sendMessage(chatId, "✅ Session ended.");
  } catch (error) {
    console.error('Failed to delete session:', error);
    bot.sendMessage(chatId, `❌ Failed to end session: ${error.message}`);
  }
  return;
}
```

This `/end` command looks up the user's session, deletes it on the server, and removes it from the map.

### Adding a Command to List Active Sessions

For debugging or curiosity, users might want to see their active session ID:

```javascript
if (/^\/session$/.test(text)) {
  const userId = msg.from.id;
  const sessionId = userSessions.get(userId);
  if (sessionId) {
    bot.sendMessage(chatId, `Your active session ID: \`${sessionId}\`\n(First 8 chars: ${sessionId.substring(0,8)}...)`);
  } else {
    bot.sendMessage(chatId, "You don't have an active session. Use /opencode to start one.");
  }
  return;
}
```

### Session Cleanup on Bot Shutdown

If the bot stops normally (e.g., receives SIGINT or SIGTERM), we could clean up all sessions in the map. Add a shutdown handler:

```javascript
process.on('SIGINT', async () => {
  console.log('Shutting down, cleaning up sessions...');
  for (const [userId, sessionId] of userSessions) {
    try {
      await opencodeClient.session.delete({ path: { id: sessionId } });
      console.log(`Deleted session ${sessionId} for user ${userId}`);
    } catch (error) {
      console.error(`Failed to delete session ${sessionId}:`, error.message);
    }
  }
  process.exit(0);
});
```

This ensures no orphaned sessions remain if the bot is stopped gracefully. However, if the bot crashes, sessions will remain; you could have a periodic job to list and delete old sessions based on age, but that requires storing timestamps.

### Trade-offs and Considerations

Persistent sessions use more server resources because sessions stay alive longer. They also consume memory on the OpenCode server proportional to the conversation length. If you have many users, you might need to set a limit on how many sessions are kept or enforce timeouts.

The in-memory map is simple but limits you to a single bot instance. If you scale to multiple bot instances (for high availability), you would need a shared storage (like Redis) so all instances can access the same session mappings. That is more complex.

For a personal bot with a few users, the in-memory approach is perfectly fine.

## Session Cleanup and Orphaned Sessions

Even with persistent sessions, you may accumulate sessions if users abandon them or if the bot crashes. The `/health` command already lists session count, which is a good indicator.

You can manually delete sessions using the OpenCode CLI (if you have access) or via an admin command. For example, you could add an `/admin cleanup` command that lists all sessions and allows deletion, but that would require authentication to prevent abuse.

Another strategy is to rely on OpenCode server's built-in session expiration. Check the OpenCode documentation: some implementations automatically delete sessions after a period of inactivity. If that is available, you can rely on it to avoid manual cleanup.

If you need to manually clean up, you could write a script that calls `opencodeClient.session.list()`, then deletes sessions older than a certain age or with a certain title pattern. Run this script periodically with a cron job.

## Advanced Session Features: Heartbeat and Timeouts

OpenCode provides a `session.heartbeat()` method to keep a session alive, preventing it from timing out due to inactivity. If your sessions have an auto-timeout, you could periodically send heartbeats for active sessions.

For a Telegram bot, you likely do not need this because the session usage pattern naturally includes prompts; each prompt resets any idle timer. But if your OpenCode server has a very short timeout and you have long gaps between user interactions, you might need heartbeats.

Implementation would involve storing the last activity time per session and periodically (e.g., every 5 minutes) sending heartbeats for sessions that have been idle but are still considered active (i.e., the user has not typed `/end`). You would need to run this in a separate interval in Node.js.

However, be cautious: heartbeats keep sessions in memory, reducing the cleanup benefit. Use them only if you know sessions auto-expire quickly and you need to keep them alive across longer user pauses.

## Choosing Between Disposable and Persistent Sessions

Which pattern should you use? Consider your use case:

- **Disposable** is simpler, uses fewer server resources, and ensures no leftover state. Suitable for stateless Q&A: each user question is independent. The downside is no memory across prompts.
- **Persistent** enables multi-turn conversations, code generation with context, and ongoing tasks. Downside: more resource usage, need for cleanup, potential for stale sessions.

You could also offer both: a `/chat` command that uses persistent sessions and an `/ask` command that uses disposable sessions. Or you could automatically create a persistent session when a user sends a `/start` command and keep it until `/end`, while `/opencode` uses the active session if it exists. Actually, our current `/opencode` always creates a new session; we could modify it to first check for an existing session and fall back to creating one if none exists. That would give the best of both worlds: the user can have an ongoing session or just ask one-off questions.

A hybrid approach:

```javascript
let sessionId = userSessions.get(userId);
// If not found, we could either create a new disposable session (deleted after use)
// OR we could tell the user to start a session with /startChat first.
// Your choice.
```

If you want sessions to be persistent by default, you could set a flag in the user's map to indicate whether they are in "ephemeral" or "persistent" mode.

Ultimately, the design depends on how you expect users to interact with the bot. For a coding assistant, persistent sessions are often more useful because you may want to build on previous answers. However, if you want each question to be isolated (maybe to avoid context poisoning or to reduce token usage), disposable is better.

## Message Flow Through the System

Let us visualize what happens when a user sends a message to your Telegram bot:

1. User types `/opencode Explain recursion` in Telegram and hits send.
2. Telegram's servers receive the message and make it available through the Bot API. They store it until your bot retrieves it.
3. Our bot, running with `polling: true`, periodically calls Telegram's `getUpdates` method to fetch new messages. When a new message arrives, Telegram returns it to our bot.
4. The `bot.on('message')` handler is invoked with a `msg` object containing all message details: chat ID, user ID, text, date, message ID, etc.
5. The handler extracts `chatId` and `text`. The text is "/opencode Explain recursion".
6. The regex `/^\/opencode\s+(.+)/` matches. The capture group is "Explain recursion". We enter the `/opencode` block.
7. We check `opencodeClient`. If it is null, we send an error and stop.
8. We send "🤖 Processing with Opencode..." to acknowledge receipt.
9. We call `opencodeClient.session.create()`. This makes an HTTP request to the OpenCode server at the configured baseUrl, typically `http://localhost:4096/session`. The server creates a new session in its database and returns an ID.
10. With the session ID, we call `opencodeClient.session.prompt()`. This sends a POST request to `/session/{id}/prompt` with the prompt text in the request body.
11. The OpenCode server receives the request. It routes it to the appropriate agent (by default, likely the first agent or a configured default). The AI model generates a response to the prompt "Explain recursion".
12. The server streams or returns the response. In this code, we await the full response. The SDK returns an object with `data.parts` containing the AI's output parts.
13. We filter and join text parts to get the full response string.
14. We call `opencodeClient.session.delete()` to send a DELETE request to `/session/{id}`. The server removes the session and frees resources.
15. We send the final response back to the user on Telegram using `bot.sendMessage()`.
16. The handler returns, and the bot goes back to waiting for the next message.

If the OpenCode server is down or unreachable, steps 9, 10, or 14 would fail, triggering our catch blocks and sending error messages to the user.

## Configuration in Detail

We already covered .env and opencode.json, but let us elaborate on practical use.

### Setting up .env

Create a file named `.env` in your project root. It should contain exactly:

```
TELEGRAM_BOT_API_KEY=your_actual_token_here
OPENCODE_SERVER_URL=http://localhost:4096
```

Replace `your_actual_token_here` with the token from BotFather. If your OpenCode server is on a different address, adjust the URL accordingly.

The .env file must have no spaces around the `=` and no quotation marks unless the value itself contains spaces (unlikely for these variables).

### Getting Your Telegram Bot Token

Here is the step-by-step process:

1. Open Telegram on your phone or desktop.
2. In the search bar, type `@BotFather` and start a chat with the verified bot that has a blue checkmark.
3. Send the command `/newbot` (no quotes).
4. BotFather will ask for a name. Enter any display name, e.g., "OpenCode Assistant".
5. BotFather will ask for a username. It must be unique and end with "bot", e.g., "opencode_assistant_bot" or "my_code_helper_bot".
6. If the username is available, BotFather will generate an HTTP API token. It looks like: `1234567890:ABCdefGHIjkLMNOPqrSTUvwxYZ0123456789`.
7. Copy that token and paste it into your .env file as the value for TELEGRAM_BOT_API_KEY.
8. Click the link BotFather provides to open a chat with your new bot, then tap "Start" to begin the conversation.

Important: Do not share this token. Anyone with it can control your bot. If you accidentally expose it, go back to BotFather and use `/revoke` to generate a new token, then update your .env.

### Getting OpenCode Running

Before you can start the Telegram bot, you need a running OpenCode server. There are two ways to get OpenCode:

- If you have installed OpenCode CLI locally, run `opencode serve --port 4096` in a terminal. This starts the server on port 4096.
- If you have a remote OpenCode server, make sure it is running and note its URL.

Test that the server is healthy by visiting `http://localhost:4096/health` in your browser or using curl: `curl http://localhost:4096/health`. You should see a JSON response like `{"healthy": true}`. If you get "connection refused" or no response, the server is not running or the port is wrong.

Make sure your opencode.json is in the same directory from which you will start the bot, because we configured the SDK to use `process.cwd()`.

### Starting the Bot

Once .env is configured and OpenCode is running, start the bot with:

```
npm start
```

Or directly:

```
node bot.js
```

You should see output:

```
Bot is starting...
✓ Opencode client initialized
Opencode integration ready
Bot is running and ready to receive messages!
```

If you see the initialization message, the bot is ready. Go to Telegram and send `/start` to test it.

## Dependencies Explained

Let us explore each dependency more deeply, not just what it is but what it actually does for us.

### dotenv

Environment variables are key-value pairs stored outside your program. In Node.js, they are accessible through the global `process.env` object. For example, if you run `TELEGRAM_TOKEN=123 node bot.js` in a shell, then `process.env.TELEGRAM_TOKEN` would be "123". However, hardcoding secrets in shell commands is cumbersome and insecure. The .env file method lets you write `TELEGRAM_TOKEN=123` in a file, and dotenv automatically loads it into process.env when your app starts.

dotenv is tiny (only a few kilobytes) but essential. It reads the .env file, parses each line as a key-value pair, and assigns them to process.env. It also handles comments (lines starting with #) and quoted values.

Without dotenv, you would have to manually read the file and parse it yourself.

### node-telegram-bot-api

This library is a complete wrapper around Telegram's Bot API. Telegram's API is a set of HTTP endpoints you can call to send messages, get updates, etc. You could theoretically use `fetch` or `axios` to call these endpoints directly, but node-telegram-bot-api makes it much easier.

Key features:

- **Authentication**: It takes your token and includes it in every request.
- **Polling**: Automatically polls for updates at a configurable interval. You just set `polling: true` and provide a callback.
- **Event system**: You can listen for events like 'message', 'inline_query', 'callback_query', 'polling_error', etc.
- **Convenient methods**: `bot.sendMessage(chatId, text)` is much nicer than constructing HTTP requests yourself.
- **File handling**: It can handle sending/receiving photos, documents, and other media (though our bot does not use this).
- **Webhook support**: Optionally use webhooks instead of polling.

In our bot, we use only a small subset: instantiation with polling, `bot.on('message', ...)`, `bot.sendMessage()`, and error events.

### @opencode-ai/sdk

The OpenCode SDK is the official client library for OpenCode. It provides a typed, promise-based interface to the OpenCode HTTP API.

Key capabilities:

- **Client creation**: `createOpencodeClient(config)` returns a client object.
- **Session management**: `client.session.create()`, `client.session.list()`, `client.session.prompt()`, `client.session.delete()`.
- ** agents**: The SDK knows about agents defined in opencode.json and can route prompts to specific agents if needed.
- **Error handling**: With `throwOnError: false`, it returns objects with `.error` properties instead of throwing.
- **Configuration**: It reads opencode.json from the specified directory to know which providers and agents are available.

The SDK abstracts the underlying REST API. You could make direct HTTP requests to `http://server:port/session`, but the SDK handles authentication (if needed), request formatting, response parsing, and error handling in a consistent way.

## Security Considerations

Security is important even for a simple hobby bot. Here are key considerations:

### Credential Protection

Never commit your .env file or opencode.json with real API keys to version control. Always add these to .gitignore. In this project, .gitignore should contain:

```
node_modules/
.env
opencode.json (if it contains secrets)
```

Consider using environment variables directly on your deployment platform (Heroku, Railway, etc.) rather than a .env file in production.

### Bot Token Secrecy

The Telegram bot token is essentially a password. If someone gets it, they can send messages as your bot, read incoming messages, and potentially do malicious things. Treat it like a password: do not share it, do not post it in public forums, do not put it in logs. If you suspect it is compromised, revoke it via BotFather immediately.

### OpenCode Server Access

The OpenCode server you run becomes a powerful tool. Anyone who can access your Telegram bot can also issue OpenCode commands through it. If you want to limit who can use the bot, you would need to add authentication logic in bot.js. For example, you could check `msg.from.id` against a whitelist of allowed Telegram user IDs. Without such checks, anyone who can find and start your bot can use it.

### OpenCode Agent Permissions

In opencode.json, agents have permissions to run bash commands, edit files, etc. These are powerful capabilities. Ensure you understand what permissions you are granting. An agent that can run arbitrary bash commands could do harmful things if misused. Since we are not using agents directly via Telegram (the `/opencode` command uses default OpenCode processing, not a specific agent), this is less of a concern, but it is good to be aware of what agents are configured.

### Input Validation and Sanitization

Our bot does minimal input validation. The `/opencode` command sends whatever the user typed to OpenCode. OpenCode itself should handle any problematic prompts, but there could be injection risks depending on how OpenCode is configured. If you extend the bot to run shell commands or write files based on user input, you must carefully validate and sanitize inputs to prevent command injection or path traversal attacks.

## Running the Bot in Production

While `npm start` works for development, running a bot in production requires considering a few things:

- **Process management**: Use a process manager like PM2, systemd, or Docker to keep the bot running automatically and restart it if it crashes.
- **Logging**: Our bot uses console.log. In production, you might want structured logging to files or a logging service.
- **Monitoring**: Set up alerts if the bot stops responding or the OpenCode server becomes unreachable.
- **Persistent sessions**: If you want sessions to survive a bot restart, you cannot store session IDs in memory only. You would need a database.
- **Environment configuration**: Use environment variables or a secure configuration service, not a .env file that sits on disk.
- **Scalability**: The bot as written is single-threaded and single-instance. If you need higher throughput, you might run multiple instances behind a load balancer, but then session state becomes distributed and requires shared storage.

## Potential Extensions and Improvements

The current bot is a solid foundation. Here are ideas for extending it:

### Session Persistence

Store user sessions in a simple database (SQLite, PostgreSQL, Redis) so that users can have ongoing conversations across bot restarts. You could map Telegram user IDs to session IDs, provide a `/sessions` command to list and manage them, and automatically delete old sessions after a timeout.

### File Operations

Add commands to interact with files in the OpenCode session workspace:
- `/ls` – list files
- `/read <path>` – read a file
- `/write <path> <content>` – write a file
- `/delete <path>` – delete a file

These would use the OpenCode file system tools available to agents. You might need to send prompts that instruct the agent to perform file operations, rather than direct SDK calls, depending on OpenCode's API.

### Specialized Agents

Instead of using default processing for `/opencode`, you could let users choose which agent to use. For example:
- `/code <prompt>` – send to a coding agent
- `/docs <prompt>` – send to a documentation agent
- `/git <prompt>` – send to the gitmasters agent

This would involve either selecting an agent in the session creation or calling a different SDK method.

### User Authentication

Add a simple password or allowlist of Telegram user IDs. When a user first starts the bot, require them to send a password or register. Only authorized users can use the bot thereafter. Store allowed user IDs in an array in code or in a database.

### Rich Responses

Currently we only send plain text responses. Telegram supports Markdown formatting, HTML, and even sending code blocks with syntax highlighting. You could format AI responses with Markdown to preserve code formatting: send with `parse_mode: 'Markdown'` and wrap code in triple backticks.

Telegram also supports sending files. If OpenCode returns a file (e.g., a generated script), the bot could send it as a document.

### Conversation Context

Allow users to have multi-turn conversations with the AI. Instead of creating a new session each time, keep a session per user (or per chat) and continuously prompt the same session. The AI will remember previous messages in the session context. You would need to not delete the session immediately, but keep it around until the user decides to end the conversation (`/end`).

### Tool Use

If OpenCode agents have tools (like reading files, running commands), you could expose specific tools as Telegram commands. For instance, a `/run <command>` could execute a shell command in the OpenCode session's environment (with caution regarding security).

### Notifications and Scheduled Tasks

Use the bot to receive notifications from OpenCode. For example, if a long-running task completes, OpenCode could send a message to the bot (via webhook or polling a `/notify` endpoint), and the bot could forward it to the user.

### Multi-User Support

Currently all users share the same OpenCode server but get separate sessions per `/opencode` call. You could implement per-user session tracking so each user has their own default session that persists. This would require storing Telegram user IDs and their associated session IDs, and checking permissions to ensure users only access their own sessions.

### Health Monitoring

Expand `/health` to check not just session count but also disk space, memory usage, and maybe even perform a test prompt to ensure the AI is responsive.

### Webhook Mode

Switch from polling to webhook for better real-time performance and reduced overhead. This would require exposing the bot on a public URL with HTTPS, configuring Telegram to send updates to that URL, and possibly using a reverse proxy like Nginx. It is more complex to set up but more efficient for high-traffic bots.

### Rate Limiting

Protect against abuse by limiting how many requests a user can make per minute or hour. Store timestamps of recent requests per user and reject if too many.

### Improved Error Messages

Instead of raw error messages, provide suggestions. For example, if the OpenCode server is unreachable, tell the user to check that the server is running and the URL is correct.

### Localization

Support multiple languages for bot responses. Detect user's Telegram language preference or let them choose with a `/lang` command.

## Troubleshooting Common Issues

Let us address the most common problems users encounter.

### "TELEGRAM_BOT_API_KEY not found in .env file"

Cause: The .env file does not exist, does not contain that variable, or has a typo in the variable name.

Solution: Create a .env file in the project root with `TELEGRAM_BOT_API_KEY=your_token`. Ensure the variable name matches exactly, with no spaces. Restart the bot after creating or editing .env.

### "Failed to initialize Opencode client" or "Opencode client not initialized"

Cause: The OpenCode SDK could not find opencode.json or it is invalid; or the OPENCODE_SERVER_URL is wrong and the server is unreachable during client setup.

Solution: Ensure opencode.json exists in the project root (same folder as bot.js) and is valid JSON. Check for syntax errors. Verify that your OpenCode server is running and the URL in .env is correct.

### "Opencode error: fetch failed" or "ECONNREFUSED"

Cause: The bot cannot connect to the OpenCode server. The server is not running, or the URL is wrong, or a firewall blocks the connection.

Solution:
1. Confirm the OpenCode server is running. If local, look for its console window or process.
2. Use the diagnostic steps from the README to find which port the server actually uses.
3. Update OPENCODE_SERVER_URL in .env to match that port.
4. If using a remote server, ensure it is accessible over the network (no firewall blocking, correct hostname/IP).
5. Test with curl: `curl http://localhost:4096/health`. You should get `{"healthy":true}`.

### Bot starts but does not respond to messages

Cause: The bot token is incorrect, the bot is blocked by the user, or polling is misconfigured.

Solution: Check the console for errors. Verify the token in .env matches what BotFather gave you. Ensure you started a chat with the bot and sent `/start`. If you blocked the bot, you need to unblock it. Confirm that you see "Bot is running and ready to receive messages!" in console.

### Commands always show "Unknown command"

Cause: There might be a space before the slash or something else wrong with the message.

Solution: Commands must start with `/` and match exactly. No extra spaces before the `/`. Telegram automatically treats messages starting with `/` as commands, but our regex expects them to be at the very start of the text string. Also note that Telegram might strip or transform certain characters. Test with simple commands like `/start`.

### OpenCode returns errors about missing providers or API keys

Cause: opencode.json is missing provider configuration or the API keys are invalid.

Solution: Check opencode.json has a `provider` section with at least one provider configured. Ensure the `apiKey` values are correct and not expired. If using OpenRouter, check that your account has credits and the keys are active.

### Sessions keep accumulating on the server

Cause: If the bot crashes or exits before deleting sessions, they remain. Or if you have modified the code to not delete sessions.

Solution: Use `/health` to see how many sessions exist. You may need to manually clean them up using OpenCode's CLI or API. In the future, implement more robust cleanup: ensure `session.delete()` is called even if errors occur, perhaps using a `finally` block. Also consider setting session expiration on the server side.

### Bot does not receive messages after some time

Cause: Polling might encounter errors and stop. The library should recover, but sometimes it needs a restart.

Solution: Check the console for "Polling error" messages. If polling errors are frequent, your network connection to Telegram might be unstable. Consider switching to webhook mode if you have a reliable public server. Otherwise, restart the bot.

## Conclusion

We have covered the entire OpenCode SDK Telegram Bot integration project from the ground up. You now understand:

- The purpose: a Telegram bot that lets you interact with OpenCode AI through simple messages and control computer functions from your phone
- The project structure: bot.js, package.json, opencode.json, .env
- Each dependency and why it is needed
- Every command in the bot and exactly how it works, line by line
- The OpenCode SDK integration and session management pattern
- How to set up and run the bot
- Security considerations and production concerns
- Ideas for extending the bot

This bot is a practical tool that brings AI coding assistance to your mobile device. You can ask programming questions, get code examples, and explore OpenCode's capabilities without needing to be at your computer with an IDE open. The code is straightforward to modify, so you can tailor it to your specific workflow.

Remember to keep your secrets safe, run the OpenCode server before starting the bot, and refer to this guide whenever you need to understand a specific part. With this foundation, you are ready to build your own remote AI assistant.