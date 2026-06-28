"use client";
import { useState } from "react";

interface Agent { role: string; focus: string; }
interface Doc { name: string; purpose: string; }
interface Result { agents: Agent[]; tasks: string[]; docs: Doc[]; memoryNotes: string[]; reply: string; summary: string; }

export default function StudioFlowOS() {
  const [project, setProject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  async function run() {
    if (!project.trim()) return;
    setLoading(true); setResult(null); setError("");
    try {
      const res = await fetch("/api/workspace", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ project, message }) });
      const data = await res.json();
      if (data.error) setError(data.error); else setResult(data);
    } catch { setError("Network error"); }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-lg bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-lg">🗄️</div>
            <h1 className="text-2xl font-bold">StudioFlow OS</h1>
          </div>
          <p className="text-zinc-400 text-sm">A project workspace where AI agents, tasks, docs, and project memory live together. Describe a project and chat to set it up.</p>
        </div>

        <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6 mb-6">
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">Project *</label>
          <input value={project} onChange={e => setProject(e.target.value)} placeholder="e.g. A signage analytics dashboard for retail screens" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-rose-500 mb-4" />
          <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-2 block">Message (optional)</label>
          <textarea value={message} onChange={e => setMessage(e.target.value)} rows={3} placeholder="e.g. Set up the workspace and plan the first milestone" className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-rose-500 resize-none mb-4" />
          <button onClick={run} disabled={loading || !project.trim()} className="px-8 py-3 bg-rose-500 hover:bg-rose-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold rounded-lg text-sm transition-colors">{loading ? "Working…" : "🗄️ Open Workspace"}</button>
        </div>

        {error && <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-sm mb-6">{error}</div>}
        {loading && <div className="flex items-center justify-center py-16"><div className="w-10 h-10 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" /></div>}

        {result && (
          <div className="flex flex-col gap-5">
            <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-5"><p className="text-zinc-200 text-sm">{result.reply}</p></div>
            <Section title="Agents">{result.agents?.map((a, i) => <div key={i} className="bg-zinc-800/50 rounded-lg p-3"><p className="text-sm font-semibold text-rose-300">{a.role}</p><p className="text-xs text-zinc-400 mt-0.5">{a.focus}</p></div>)}</Section>
            <Section title="Tasks">{result.tasks?.map((t, i) => <p key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-rose-400">•</span>{t}</p>)}</Section>
            <Section title="Docs">{result.docs?.map((d, i) => <div key={i} className="bg-zinc-800/50 rounded-lg p-3"><p className="text-sm font-semibold text-zinc-200 font-mono">{d.name}</p><p className="text-xs text-zinc-400 mt-0.5">{d.purpose}</p></div>)}</Section>
            <Section title="Project Memory">{result.memoryNotes?.map((m, i) => <p key={i} className="text-sm text-zinc-300 flex gap-2"><span className="text-amber-400">📌</span>{m}</p>)}</Section>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-4"><p className="text-sm text-rose-300">{result.summary}</p></div>
          </div>
        )}
      </div>
    </div>
  );
}
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-5"><h2 className="text-sm font-semibold text-white mb-3">{title}</h2><div className="flex flex-col gap-2">{children}</div></div>;
}
