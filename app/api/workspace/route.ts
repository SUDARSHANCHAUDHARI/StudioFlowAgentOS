import Anthropic from "@anthropic-ai/sdk";
import { guard, safeError, extractText, safeJson } from "../../../lib/apiGuard";
import { NextRequest, NextResponse } from "next/server";
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
export async function POST(req: NextRequest) {
  const _guard = guard(req);
  if (_guard) return _guard;
  const { project, message } = await req.json();
  if (!project?.trim()) return NextResponse.json({ error: "Project description required" }, { status: 400 });
  const prompt = `You are StudioFlow OS, an AI project workspace where agents, tasks, docs, and project memory live together. Given the project and the user's message, respond as the workspace.
Project: ${project}
Message: ${message || "Set up the workspace for this project."}
Return JSON: { "agents": [{ "role": "string", "focus": "string" }], "tasks": ["string"], "docs": [{ "name": "string", "purpose": "string" }], "memoryNotes": ["string"], "reply": "string", "summary": "string" }
Return ONLY valid JSON.`;
  try {
    const msg = await client.messages.create({ model: "claude-sonnet-4-6", max_tokens: 1800, messages: [{ role: "user", content: prompt }] });
    return NextResponse.json(safeJson(extractText(msg)));
  } catch (e) { return safeError(e); }
}
