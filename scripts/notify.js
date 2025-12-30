#!/usr/bin/env node

/**
 * Claude Slack Notifier
 * 
 * Sends Slack notifications when Claude Code tasks complete.
 * Reads project-specific configuration from .claude/slack.json
 * 
 * Cross-platform: Windows, macOS, Linux
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { getLang } = require('./lang');

// Configuration file name
const CONFIG_FILE = '.claude/slack.json';
const GLOBAL_CONFIG_FILE = path.join(process.env.HOME || process.env.USERPROFILE, '.claude', 'slack-notifier.json');
const PROMPT_CACHE_FILE = path.join(process.env.HOME || process.env.USERPROFILE, '.claude', 'last-user-prompt.json');

/**
 * Find project config by traversing up from current directory
 */
function findProjectConfig(startDir) {
  let currentDir = startDir || process.cwd();
  
  while (currentDir !== path.parse(currentDir).root) {
    const configPath = path.join(currentDir, CONFIG_FILE);
    if (fs.existsSync(configPath)) {
      return { path: configPath, dir: currentDir };
    }
    currentDir = path.dirname(currentDir);
  }
  
  return null;
}

/**
 * Load configuration
 */
function loadConfig() {
  // 1. Try project-specific config
  const projectConfig = findProjectConfig();
  
  if (projectConfig) {
    try {
      const config = JSON.parse(fs.readFileSync(projectConfig.path, 'utf8'));
      config._projectDir = projectConfig.dir;
      config._projectName = config.project || path.basename(projectConfig.dir);
      return config;
    } catch (e) {
      console.error(`Error reading config: ${e.message}`);
    }
  }
  
  // 2. Try global config
  if (fs.existsSync(GLOBAL_CONFIG_FILE)) {
    try {
      const config = JSON.parse(fs.readFileSync(GLOBAL_CONFIG_FILE, 'utf8'));
      config._projectName = path.basename(process.cwd());
      return config;
    } catch (e) {
      console.error(`Error reading global config: ${e.message}`);
    }
  }
  
  // 3. Try environment variables
  if (process.env.SLACK_WEBHOOK_URL) {
    return {
      webhook: process.env.SLACK_WEBHOOK_URL,
      channel: process.env.SLACK_CHANNEL || '',
      _projectName: process.env.SLACK_PROJECT_NAME || path.basename(process.cwd())
    };
  }
  
  return null;
}

/**
 * Read hook input from stdin
 */
async function readStdin() {
  return new Promise((resolve) => {
    let data = '';
    
    // Set timeout for stdin read
    const timeout = setTimeout(() => {
      resolve(null);
    }, 1000);
    
    if (process.stdin.isTTY) {
      clearTimeout(timeout);
      resolve(null);
      return;
    }
    
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (chunk) => {
      data += chunk;
    });
    process.stdin.on('end', () => {
      clearTimeout(timeout);
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve(null);
      }
    });
    process.stdin.on('error', () => {
      clearTimeout(timeout);
      resolve(null);
    });
  });
}

/**
 * Send Slack message
 */
function sendSlackMessage(webhookUrl, message) {
  return new Promise((resolve, reject) => {
    const url = new URL(webhookUrl);
    const protocol = url.protocol === 'https:' ? https : http;
    
    const payload = JSON.stringify(message);
    
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    };
    
    const req = protocol.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`Slack API error: ${res.statusCode} - ${data}`));
        }
      });
    });
    
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

/**
 * Format timestamp
 */
function formatTimestamp() {
  return new Date().toLocaleString();
}

/**
 * Escape special characters for Slack mrkdwn
 */
function escapeSlackText(text) {
  if (!text) return '';
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Save user prompt to cache file
 */
function saveUserPrompt(sessionId, userPrompt) {
  try {
    const cacheDir = path.dirname(PROMPT_CACHE_FILE);
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    fs.writeFileSync(PROMPT_CACHE_FILE, JSON.stringify({
      session_id: sessionId,
      user_prompt: userPrompt,
      timestamp: Date.now()
    }));
  } catch (e) {
    // Silent fail
  }
}

/**
 * Load user prompt from cache file
 */
function loadUserPrompt(sessionId) {
  try {
    if (fs.existsSync(PROMPT_CACHE_FILE)) {
      const data = JSON.parse(fs.readFileSync(PROMPT_CACHE_FILE, 'utf8'));
      // Only return if same session and not too old (5 minutes)
      if (data.session_id === sessionId && (Date.now() - data.timestamp) < 5 * 60 * 1000) {
        return data.user_prompt;
      }
    }
  } catch (e) {
    // Silent fail
  }
  return '';
}

/**
 * Extract info from transcript file
 */
function extractFromTranscript(transcriptPath) {
  try {
    if (!transcriptPath || !fs.existsSync(transcriptPath)) {
      return { userPrompt: '', summary: '' };
    }

    const content = fs.readFileSync(transcriptPath, 'utf8');
    const lines = content.trim().split('\n');

    let lastUserPrompt = '';
    let lastAssistantMessage = '';

    for (const line of lines) {
      try {
        const entry = JSON.parse(line);

        // Get last user message: type="user", message.content can be string or array
        if (entry.type === 'user' && entry.message && entry.message.content) {
          const content = entry.message.content;
          if (typeof content === 'string') {
            lastUserPrompt = content.substring(0, 500);
          } else if (Array.isArray(content)) {
            // Handle array of content blocks
            for (const block of content) {
              if (block.type === 'text' && block.text) {
                lastUserPrompt = block.text.substring(0, 500);
                break;
              }
            }
          }
        }

        // Get last assistant message: type="assistant", message.content is array
        if (entry.type === 'assistant' && entry.message && Array.isArray(entry.message.content)) {
          // Find text content (skip thinking blocks)
          for (const block of entry.message.content) {
            if (block.type === 'text' && block.text) {
              lastAssistantMessage = block.text.substring(0, 1000);
            }
          }
        }
      } catch (e) {
        // Skip invalid lines
      }
    }

    return {
      userPrompt: lastUserPrompt,
      summary: lastAssistantMessage
    };
  } catch (e) {
    return { userPrompt: '', summary: '' };
  }
}

/**
 * Build Slack message
 */
function buildMessage(config, hookData, eventType) {
  const projectName = config._projectName || 'Unknown Project';
  const channel = config.channel || '';
  const lang = getLang(config.lang || 'en');

  // Determine emoji and title based on event type
  let emoji, title, color;

  switch (eventType) {
    case 'stop':
      emoji = '✅';
      title = lang.taskCompleted;
      color = '#36a64f'; // green
      break;
    case 'notification':
      emoji = '⏳';
      title = lang.waitingForInput;
      color = '#f2c744'; // yellow
      break;
    case 'error':
      emoji = '❌';
      title = lang.errorOccurred;
      color = '#e01e5a'; // red
      break;
    default:
      emoji = '🔔';
      title = lang.notification;
      color = '#4a90d9'; // blue
  }
  
  // Extract message from hook data
  let hookMessage = '';
  if (hookData && hookData.message) {
    hookMessage = hookData.message;
  }
  
  // Build message payload
  const message = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: `${emoji} Claude Code: ${title}`,
          emoji: true
        }
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: `*${lang.project}:*\n${projectName}`
          },
          {
            type: 'mrkdwn',
            text: `*${lang.time}:*\n${formatTimestamp()}`
          }
        ]
      }
    ],
    attachments: [
      {
        color: color,
        blocks: []
      }
    ]
  };
  
  // Extract user request and task summary from hook data
  let userRequest = '';
  let taskSummary = '';

  if (hookData) {
    // user_prompt is available in UserPromptSubmit hook
    // For Stop hook, we load it from cache or transcript
    userRequest = hookData.user_prompt || loadUserPrompt(hookData.session_id) || '';
    taskSummary = hookData.transcript_summary || hookMessage || '';

    // If no data yet, try to extract from transcript file
    if ((!userRequest || !taskSummary) && hookData.transcript_path) {
      const transcriptData = extractFromTranscript(hookData.transcript_path);
      if (!userRequest) userRequest = transcriptData.userPrompt;
      if (!taskSummary) taskSummary = transcriptData.summary;
    }
  }

  // Add user request if present
  if (userRequest && userRequest.trim()) {
    const sanitizedRequest = escapeSlackText(userRequest).substring(0, 2900);
    message.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${lang.customerRequest}:*\n${sanitizedRequest}`
      }
    });
  }

  // Add task summary if present
  if (taskSummary && taskSummary.trim()) {
    const sanitizedSummary = escapeSlackText(taskSummary).substring(0, 2900);
    message.blocks.push({
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*${lang.taskSummary}:*\n${sanitizedSummary}`
      }
    });
  }
  
  // Add channel if specified
  if (channel) {
    message.channel = channel;
  }
  
  return message;
}

/**
 * Initialize config file
 */
function initConfig(targetDir) {
  const configDir = path.join(targetDir, '.claude');
  const configPath = path.join(configDir, 'slack.json');
  
  if (fs.existsSync(configPath)) {
    console.log(`Config already exists: ${configPath}`);
    return;
  }
  
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }
  
  const defaultConfig = {
    webhook: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
    channel: '#your-channel',
    project: path.basename(targetDir),
    lang: 'en'
  };
  
  fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
  console.log(`Created config: ${configPath}`);
  console.log('Edit the file and set your Slack webhook URL.');
}

/**
 * Test notification
 */
async function testNotification() {
  const config = loadConfig();
  
  if (!config) {
    console.error('No configuration found!');
    console.error('Run: claude-slack-notify init');
    process.exit(1);
  }
  
  if (!config.webhook || config.webhook.includes('YOUR/WEBHOOK')) {
    console.error('Please set your Slack webhook URL in the config file.');
    process.exit(1);
  }
  
  console.log(`Testing notification for: ${config._projectName}`);
  
  const message = buildMessage(config, {
    user_prompt: '테스트 알림 보내기',
    transcript_summary: '테스트 알림이 성공적으로 전송되었습니다!'
  }, 'stop');
  
  try {
    await sendSlackMessage(config.webhook, message);
    console.log('✅ Test notification sent successfully!');
  } catch (e) {
    console.error(`❌ Failed to send: ${e.message}`);
    process.exit(1);
  }
}

/**
 * Show help
 */
function showHelp() {
  console.log(`
Claude Slack Notifier

Usage:
  claude-slack-notify              Send notification (reads from stdin)
  claude-slack-notify init         Create config file in current project
  claude-slack-notify test         Send test notification
  claude-slack-notify help         Show this help

Configuration:
  Project config: .claude/slack.json
  Global config:  ~/.claude/slack-notifier.json
  
  Config format:
  {
    "webhook": "https://hooks.slack.com/services/...",
    "channel": "#channel-name",
    "project": "Project Name",
    "lang": "en"
  }

Environment Variables:
  SLACK_WEBHOOK_URL     Webhook URL (fallback)
  SLACK_CHANNEL         Channel name (fallback)
  SLACK_PROJECT_NAME    Project name (fallback)

Hook Setup (~/.claude/settings.json):
  {
    "hooks": {
      "UserPromptSubmit": [{
        "matcher": "",
        "hooks": [{
          "type": "command",
          "command": "claude-slack-notify"
        }]
      }],
      "Stop": [{
        "matcher": "",
        "hooks": [{
          "type": "command",
          "command": "claude-slack-notify"
        }]
      }],
      "Notification": [{
        "matcher": "",
        "hooks": [{
          "type": "command",
          "command": "claude-slack-notify"
        }]
      }]
    }
  }

Note: UserPromptSubmit hook captures the customer request.
`);
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  // Handle commands
  switch (command) {
    case 'init':
      initConfig(process.cwd());
      return;
    case 'test':
    case '--test':
      await testNotification();
      return;
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      return;
    case 'version':
    case '--version':
    case '-v':
      const pkg = require('../package.json');
      console.log(`v${pkg.version}`);
      return;
  }
  
  // Load configuration
  const config = loadConfig();
  
  if (!config) {
    // Silent exit if no config (don't break Claude Code)
    process.exit(0);
  }
  
  if (!config.webhook || config.webhook.includes('YOUR/WEBHOOK')) {
    // Silent exit if webhook not configured
    process.exit(0);
  }
  
  // Read hook input from stdin
  const hookData = await readStdin();

  // Debug: log hook data to see what Claude Code sends
  if (hookData) {
    const debugPath = path.join(process.env.HOME || process.env.USERPROFILE, '.claude', 'hook-debug.json');
    fs.writeFileSync(debugPath, JSON.stringify(hookData, null, 2));
  }

  // If this is a UserPromptSubmit hook, save the prompt and exit (no notification)
  if (hookData && hookData.user_prompt && !hookData.transcript_summary && !hookData.message) {
    saveUserPrompt(hookData.session_id, hookData.user_prompt);
    process.exit(0);
  }

  // Determine event type from hook data or default to 'stop'
  let eventType = 'stop';
  if (hookData) {
    if (hookData.message && hookData.message.toLowerCase().includes('waiting')) {
      eventType = 'notification';
    } else if (hookData.error) {
      eventType = 'error';
    }
  }
  
  // Build and send message
  const message = buildMessage(config, hookData, eventType);
  
  try {
    await sendSlackMessage(config.webhook, message);
  } catch (e) {
    // Silent fail to not break Claude Code
    console.error(`Slack notification failed: ${e.message}`);
  }
}

// Run
main().catch(console.error);
