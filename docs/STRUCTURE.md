# Suggested Structure

```text
studioflow-os/
├── apps/
│   ├── web/
│   ├── api/
│   └── worker/
├── packages/
│   ├── shared/
│   ├── agents/
│   ├── ai-core/
│   ├── memory/
│   ├── tools/
│   └── workflow-engine/
├── prompts/
│   ├── system/
│   ├── agents/
│   └── workflows/
├── docs/
├── examples/
├── scripts/
├── docker-compose.yml
├── AGENTS.md
├── CLAUDE.md
├── README.md
└── .env.example
```

## Tech Stack

- Frontend: Next.js, TypeScript, Tailwind, shadcn/ui.
- Backend: NestJS, Prisma, PostgreSQL, Redis.
- AI: OpenAI, Anthropic, Gemini, later Ollama.
- Memory: PostgreSQL + pgvector.
- Future UI: React Flow.

## Database Models

- User.
- Project.
- Document.
- Note.
- Task.
- Agent.
- Conversation.
- Message.
- MemoryItem.
- Tool.
- Workflow.
- WorkflowRun.
