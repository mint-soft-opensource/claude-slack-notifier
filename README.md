# Claude Slack Notifier

[![npm version](https://badge.fury.io/js/claude-slack-notifier.svg)](https://www.npmjs.com/package/claude-slack-notifier)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Send Slack notifications when Claude Code tasks complete. Cross-platform support for Windows, macOS, and Linux.

## Features

- 🔔 **Automatic Notifications**: Get notified when Claude Code finishes a task
- 📁 **Project-specific Config**: Different settings per project
- 🌍 **Cross-platform**: Works on Windows, macOS, and Linux
- ⚡ **Zero Dependencies**: Pure Node.js, no external packages
- 🎨 **Rich Messages**: Beautiful Slack messages with project info

## Installation

```bash
npm install -g claude-slack-notifier
```

## Quick Start

### 1. Set up Slack Webhook

#### Step 1: Create a Slack App

1. Go to [Slack API Apps](https://api.slack.com/apps)
2. Click **"Create New App"**
3. Select **"From scratch"**
4. Enter an App Name (e.g., "Claude Code Notifier")
5. Select your workspace and click **"Create App"**

#### Step 2: Enable Incoming Webhooks

1. In the left sidebar, click **"Incoming Webhooks"**
2. Toggle **"Activate Incoming Webhooks"** to **On**
3. Click **"Add New Webhook to Workspace"** at the bottom
4. Select the channel where you want notifications (e.g., `#dev-alerts`)
5. Click **"Allow"**

#### Step 3: Copy the Webhook URL

After authorization, you'll see a new webhook URL. Copy this URL - you'll need it for the configuration.

> **Note**: Keep your webhook URL secret! Anyone with this URL can post messages to your Slack channel.

### 2. Configure Claude Code Hook

Add to `~/.claude/settings.json`:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "claude-slack-notify"
          }
        ]
      }
    ],
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "claude-slack-notify"
          }
        ]
      }
    ]
  }
}
```

### 3. Create Project Config

```bash
cd your-project
claude-slack-notify init
```

Edit `.claude/slack.json`:

```json
{
  "webhook": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL",
  "channel": "#dev-alerts",
  "project": "My Project",
  "lang": "en"
}
```

### 4. Test

```bash
claude-slack-notify test
```

## Configuration

### Project Config (`.claude/slack.json`)

```json
{
  "webhook": "https://hooks.slack.com/services/...",
  "channel": "#channel-name",
  "project": "Project Name",
  "lang": "en"
}
```

| Field | Description |
|-------|-------------|
| `webhook` | Slack Webhook URL (required) |
| `channel` | Slack channel name |
| `project` | Project name |
| `lang` | Language code (default: `en`) |

### Global Config (`~/.claude/slack-notifier.json`)

Same format as project config. Used as fallback when no project config exists.

### Environment Variables

| Variable | Description |
|----------|-------------|
| `SLACK_WEBHOOK_URL` | Webhook URL (fallback) |
| `SLACK_CHANNEL` | Channel name (fallback) |
| `SLACK_PROJECT_NAME` | Project name (fallback) |

## Commands

| Command | Description |
|---------|-------------|
| `claude-slack-notify` | Send notification (auto-called by hook) |
| `claude-slack-notify init` | Create project config file |
| `claude-slack-notify test` | Send test notification |
| `claude-slack-notify help` | Show help |
| `claude-slack-notify version` | Show version |

## Notification Types

| Event | Emoji | When |
|-------|-------|------|
| Stop | ✅ | Task completed |
| Notification | ⏳ | Waiting for input |
| Error | ❌ | Error occurred |

## Supported Languages

50 languages are supported. Set the `lang` field in your config to one of these codes:

| Code | Language | Code | Language | Code | Language |
|------|----------|------|----------|------|----------|
| `en` | English | `ko` | Korean | `ja` | Japanese |
| `zh` | Chinese (Simplified) | `zh-tw` | Chinese (Traditional) | `es` | Spanish |
| `fr` | French | `de` | German | `it` | Italian |
| `pt` | Portuguese | `ru` | Russian | `ar` | Arabic |
| `hi` | Hindi | `bn` | Bengali | `id` | Indonesian |
| `ms` | Malay | `th` | Thai | `vi` | Vietnamese |
| `tr` | Turkish | `pl` | Polish | `nl` | Dutch |
| `el` | Greek | `cs` | Czech | `ro` | Romanian |
| `hu` | Hungarian | `sv` | Swedish | `da` | Danish |
| `no` | Norwegian | `fi` | Finnish | `uk` | Ukrainian |
| `he` | Hebrew | `fa` | Persian | `sw` | Swahili |
| `tl` | Filipino | `ca` | Catalan | `sk` | Slovak |
| `bg` | Bulgarian | `hr` | Croatian | `sr` | Serbian |
| `sl` | Slovenian | `et` | Estonian | `lv` | Latvian |
| `lt` | Lithuanian | `is` | Icelandic | `mt` | Maltese |
| `cy` | Welsh | `ga` | Irish | `af` | Afrikaans |
| `eu` | Basque | | | | |

## Example Slack Message

```
✅ Claude Code: Task Completed
━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project:              My Project
Time:                 2025-01-30 15:30:00
Customer Request:     User request content
Work Summary:         Claude Code task summary
```

## Troubleshooting

### Notifications not working

1. Test your webhook: `claude-slack-notify test`
2. Check config path: `.claude/slack.json`
3. Verify hook setup: `~/.claude/settings.json`

### Only want notifications for specific projects

Don't create a global config. Only create `.claude/slack.json` in projects where you want notifications.

### Disable notifications for a project

Simply delete the `.claude/slack.json` file from your project directory.

## How It Works

```
Claude Code Task Completes
        ↓
   Stop Hook Fires
        ↓
 claude-slack-notify runs
        ↓
 Reads .claude/slack.json
        ↓
 Sends Slack Message
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © 2025 mint-soft
