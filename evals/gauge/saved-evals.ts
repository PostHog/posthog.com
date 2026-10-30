import { execFileSync, spawnSync } from 'node:child_process'
import { mkdtempSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { repoRoot } from '../load-eval-files.ts'
import type { CheckPrompt } from '../build-eval-prompts.ts'
import { gaugeAgents, gaugeMcpRefs, type GaugeHarnesses } from './send-to-gauge.ts'

// Saved evals in Gauge ("eval sets"): one per check, which every paid run launches
// under, so Gauge keeps one history per check. A saved eval's name is the check's name,
// [posthog.com/<path>] <check id>, and that name is its identity: nothing in the repo
// records Gauge ids. `pnpm evals sync` creates or updates them from the eval files;
// `pnpm evals run` launches them. Our evals share the Gauge org with other people's, so
// we only ever touch evals whose name starts with namePrefix.

const gaugeDir = join(repoRoot, 'evals', 'gauge')
// Also matches the older "[posthog.com] <key>" names, so sync lists them as orphans.
export const namePrefix = '[posthog.com'
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

export function definitionFor(check: CheckPrompt, samples: number, harnesses: GaugeHarnesses): SavedEvalDefinition {
    return {
        name: check.name,
        prompt: check.prompt,
        criteria: check.criteria,
        repoUrl: check.codebase?.repo ?? null,
        repoRef: check.codebase?.ref ?? null,
        agents: gaugeAgents(check, harnesses),
        sampleCount: samples,
        mcpRefs: gaugeMcpRefs(check),
        tags: [tag],
    }
}

// Only our evals, keyed by name. A name maps to a list, because Gauge doesn't stop two
// evals sharing one; sync and run report that rather than pick one.
export function listSavedEvals(): Map<string, SavedEval[]> {
    const all = JSON.parse(gauge(['eval', 'list', '-o', 'json'])) as SavedEval[]
    return groupByName(all.filter((e) => e.name.startsWith(namePrefix)))
}

export function groupByName(evals: SavedEval[]): Map<string, SavedEval[]> {
    const byName = new Map<string, SavedEval[]>()
    for (const e of evals) byName.set(e.name, [...(byName.get(e.name) ?? []), e])
    return byName
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
function definitionFlags(wanted: SavedEvalDefinition, harnesses: GaugeHarnesses, editing: boolean): string[] {
    const slugs = new Map([...harnesses].map(([slug, agent]) => [agent, slug]))
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

export function createSavedEval(wanted: SavedEvalDefinition, harnesses: GaugeHarnesses): string {
    const raw = gauge([
        'eval',
        'create',
        '--name',
        wanted.name,
        ...definitionFlags(wanted, harnesses, false),
        '-o',
        'json',
    ])
    const parsed = JSON.parse(raw) as { id?: string; evalSet?: { id?: string } }
    const id = parsed.id ?? parsed.evalSet?.id
    if (!id) throw new Error(`No id in the gauge eval create response; check its shape:\n${raw}`)
    return id
}

export function editSavedEval(id: string, wanted: SavedEvalDefinition, harnesses: GaugeHarnesses): void {
    gauge(['eval', 'edit', id, ...definitionFlags(wanted, harnesses, true), '-o', 'json'])
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
