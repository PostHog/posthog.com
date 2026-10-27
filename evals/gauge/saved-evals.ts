import { execFileSync, spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { repoRoot } from '../load-eval-files.ts'
import type { CheckPrompt } from '../build-eval-prompts.ts'

// Saved evals in Gauge ("eval sets"): one per check, each with a stable id that every
// paid run launches under, so Gauge keeps one history per check.
// `pnpm evals sync` creates or updates them from the eval files; `pnpm evals run`
// launches them. Our evals share the Gauge org with other people's, so we only ever
// touch evals whose name starts with namePrefix.

const gaugeDir = join(repoRoot, 'evals', 'gauge')
export const idsFile = join(gaugeDir, 'saved-evals.json')
export const namePrefix = '[posthog.com] '
const tag = 'posthog-com-evals'

const gauge = (args: string[]) =>
    execFileSync('gauge', [...args, '--hosted'], {
        cwd: gaugeDir,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'inherit'],
        maxBuffer: 64 * 1024 * 1024,
    })

// What a saved eval should hold, built from one check prompt.
export type SavedEvalDefinition = {
    name: string
    prompt: string
    criteria: { name: string; rubric: string }[]
    repoUrl: string | null
    repoRef: string | null
    agents: { agent: string; models: string[] }[] // agent as Gauge's harness enum, e.g. CLAUDE_CODE
    sampleCount: number
    mcpRefs: string[] // handle@version
    tags: string[]
}

// The fields `gauge eval list -o json` returns that sync compares.
export type SavedEval = {
    id: string
    name: string
    promptText: string
    criteria: { name: string; rubric: string }[]
    repoUrl: string | null
    repoRef: string | null
    agents: { agent: string; models: string[] }[]
    sampleCount: number
    mcpRefs: string[]
    tags: string[]
}

export const savedEvalName = (checkKey: string) => `${namePrefix}${checkKey}`

export function definitionFor(check: CheckPrompt, samples: number): SavedEvalDefinition {
    return {
        name: savedEvalName(check.key),
        prompt: check.prompt,
        criteria: check.criteria,
        repoUrl: check.codebase?.repo ?? null,
        repoRef: check.codebase?.ref ?? null,
        agents: check.harnesses.map((h) => ({ agent: h.gauge, models: h.models })),
        sampleCount: samples,
        mcpRefs: check.mcp?.ref ? [check.mcp.ref] : [],
        tags: [tag],
    }
}

// Only our evals, keyed by name.
export function listSavedEvals(): Map<string, SavedEval> {
    const all = JSON.parse(gauge(['eval', 'list', '-o', 'json'])) as SavedEval[]
    return new Map(all.filter((e) => e.name.startsWith(namePrefix)).map((e) => [e.name, e]))
}

const sorted = <T>(items: T[], key: (item: T) => string) => [...items].sort((a, b) => key(a).localeCompare(key(b)))
const agentsKey = (agents: { agent: string; models: string[] }[]) =>
    JSON.stringify(sorted(agents, (a) => a.agent).map((a) => [a.agent, [...a.models].sort()]))

// True when the saved eval already matches, so sync leaves it alone and Gauge starts
// no new revision.
export function isCurrent(saved: SavedEval, wanted: SavedEvalDefinition): boolean {
    return (
        saved.promptText === wanted.prompt &&
        JSON.stringify(saved.criteria.map((c) => [c.name, c.rubric])) ===
            JSON.stringify(wanted.criteria.map((c) => [c.name, c.rubric])) &&
        (saved.repoUrl ?? null) === wanted.repoUrl &&
        (saved.repoRef ?? null) === wanted.repoRef &&
        agentsKey(saved.agents) === agentsKey(wanted.agents) &&
        saved.sampleCount === wanted.sampleCount &&
        JSON.stringify([...(saved.mcpRefs ?? [])].sort()) === JSON.stringify([...wanted.mcpRefs].sort()) &&
        JSON.stringify([...saved.tags].sort()) === JSON.stringify([...wanted.tags].sort())
    )
}

// The CLI's --agent flag takes the harness slug (claude-code), not the enum (CLAUDE_CODE).
export function harnessSlugs(): Map<string, string> {
    const models = JSON.parse(gauge(['models', 'list', '-o', 'json'])) as { harness: string; harnessSlug: string }[]
    return new Map(models.map((m) => [m.harness, m.harnessSlug]))
}

function definitionFlags(wanted: SavedEvalDefinition, slugs: Map<string, string>, editing: boolean): string[] {
    const dir = mkdtempSync(join(tmpdir(), 'posthog-evals-'))
    writeFileSync(join(dir, 'prompt.md'), wanted.prompt)
    // No criterion ids, so the list replaces the saved criteria whole.
    writeFileSync(join(dir, 'criteria.json'), JSON.stringify(wanted.criteria))
    const agents = wanted.agents.flatMap((a) => {
        const slug = slugs.get(a.agent)
        if (!slug) throw new Error(`Gauge has no harness ${a.agent}; check shared/run-config.yml`)
        return ['--agent', `${slug}:${a.models.join(',')}`]
    })
    const repo = wanted.repoUrl
        ? ['--repo', wanted.repoUrl, ...(wanted.repoRef ? ['--ref', wanted.repoRef] : [])]
        : editing
        ? ['--clear-repo']
        : []
    const mcp =
        wanted.mcpRefs.length > 0 ? wanted.mcpRefs.flatMap((ref) => ['--mcp', ref]) : editing ? ['--clear-mcp'] : []
    return [
        '--file',
        join(dir, 'prompt.md'),
        '--criteria-file',
        join(dir, 'criteria.json'),
        ...repo,
        ...mcp,
        ...agents,
        '--samples',
        String(wanted.sampleCount),
        ...wanted.tags.flatMap((t) => ['--tag', t]),
    ]
}

export function createSavedEval(wanted: SavedEvalDefinition, slugs: Map<string, string>): string {
    const raw = gauge(['eval', 'create', '--name', wanted.name, ...definitionFlags(wanted, slugs, false), '-o', 'json'])
    const parsed = JSON.parse(raw) as { id?: string; evalSet?: { id?: string } }
    const id = parsed.id ?? parsed.evalSet?.id
    if (!id) throw new Error(`No id in the gauge eval create response; check its shape:\n${raw}`)
    return id
}

export function editSavedEval(id: string, wanted: SavedEvalDefinition, slugs: Map<string, string>): void {
    gauge(['eval', 'edit', id, ...definitionFlags(wanted, slugs, true), '-o', 'json'])
}

export const removeSavedEval = (id: string) => gauge(['eval', 'rm', id])

// Launches one run of a saved eval. Gauge prints its error as JSON with a code, such as
// insufficient_credits; a failed launch comes back as { ok: false } instead of throwing,
// so one bad launch doesn't lose the ones that went out.
export type Launch = { ok: true; raw: string } | { ok: false; code: string; message: string }

export function launchSavedEval(id: string): Launch {
    const result = spawnSync('gauge', ['run', '--eval', id, '--yes', '-o', 'json', '--hosted'], {
        cwd: gaugeDir,
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
    })
    if (result.status === 0) return { ok: true, raw: result.stdout }
    const output = `${result.stdout}\n${result.stderr}`
    try {
        const { error } = JSON.parse(output.slice(output.indexOf('{'), output.lastIndexOf('}') + 1)) as {
            error: { code: string; message: string }
        }
        return { ok: false, code: error.code, message: error.message }
    } catch {
        return { ok: false, code: 'unknown', message: output.trim() || `gauge exited with ${result.status}` }
    }
}

// check key → saved eval id. Committed, so anyone can see which Gauge eval a check maps to.
export function readIds(): Record<string, string> {
    return existsSync(idsFile) ? (JSON.parse(readFileSync(idsFile, 'utf8')) as Record<string, string>) : {}
}

export function writeIds(ids: Record<string, string>): void {
    const ordered = Object.fromEntries(Object.entries(ids).sort(([a], [b]) => a.localeCompare(b)))
    writeFileSync(idsFile, `${JSON.stringify(ordered, null, 4)}\n`)
}
