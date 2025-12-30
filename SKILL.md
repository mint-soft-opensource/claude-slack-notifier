# Claude Slack Notifier Skill

Claude Code 작업이 완료되면 Slack으로 알림을 보내는 스킬입니다.

## 개요

- **자동 알림**: Claude Code 작업 완료 시 Slack 메시지 자동 전송
- **프로젝트별 설정**: 각 프로젝트마다 다른 webhook, 채널, 프로젝트명 설정 가능
- **크로스 플랫폼**: Windows, macOS, Linux 모두 지원

## 설치

```bash
npm install -g claude-slack-notifier
```

## 설정

### 1. 글로벌 Hook 설정

`~/.claude/settings.json`에 추가:

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

### 2. 프로젝트별 설정

프로젝트 루트에서:

```bash
claude-slack-notify init
```

생성된 `.claude/slack.json` 수정:

```json
{
  "webhook": "https://hooks.slack.com/services/YOUR/WEBHOOK/URL",
  "channel": "#dev-alerts",
  "project": "식집사 앱",
  "message": ""
}
```

## Slack Webhook 생성 방법

1. [Slack API](https://api.slack.com/apps) 접속
2. "Create New App" → "From scratch"
3. "Incoming Webhooks" 활성화
4. "Add New Webhook to Workspace" 클릭
5. 채널 선택 후 Webhook URL 복사

## 명령어

| 명령어 | 설명 |
|--------|------|
| `claude-slack-notify` | 알림 전송 (Hook에서 자동 호출) |
| `claude-slack-notify init` | 프로젝트 설정 파일 생성 |
| `claude-slack-notify test` | 테스트 알림 전송 |
| `claude-slack-notify help` | 도움말 표시 |

## 설정 우선순위

1. 프로젝트 설정: `.claude/slack.json`
2. 글로벌 설정: `~/.claude/slack-notifier.json`
3. 환경변수: `SLACK_WEBHOOK_URL`, `SLACK_CHANNEL`, `SLACK_PROJECT_NAME`

## 알림 종류

| 이벤트 | 이모지 | 설명 |
|--------|--------|------|
| Stop | ✅ | 작업 완료 |
| Notification | ⏳ | 입력 대기 중 |
| Error | ❌ | 오류 발생 |

## 예시 메시지

```
✅ Claude Code: Task Completed

Project: 식집사 앱
Time: 2025. 1. 30. 오후 3:45:00
```

## 문제 해결

### 알림이 안 올 때

1. Webhook URL 확인: `claude-slack-notify test`
2. 설정 파일 경로 확인: `.claude/slack.json`
3. Hook 설정 확인: `~/.claude/settings.json`

### 특정 프로젝트에서만 알림 받기

글로벌 설정 없이 원하는 프로젝트에만 `.claude/slack.json` 생성

## 라이선스

MIT
