import { execFileSync, spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { parse } from 'yaml'
import { repoRoot } from '../load-eval-files.ts'
import type { CheckPrompt } from '../build-eval-prompts.ts'

// Everything Gauge-specific lives in this folder. This file turns check prompts into
// Gauge's --apply case spec (see `gauge run --schema`), one Gauge case per check, for
// the free dry run that `pnpm evals plan` does, and waits for paid runs. Paid runs
// launch under saved evals: see saved-evals.ts. Gauge says "case" where the eval files say "check"; this
// is the only place both words meet. Written against gauge CLI 0.23, which runs in
// local Docker unless told --hosted, so every call passes it.
// The CLI runs from this folder so it picks up gauge.json beside this file, which
// keeps the Gauge GitHub App from treating every posthog.com PR as an eval run.

const gaugeDir = join(repoRoot, 'evals', 'gauge')
export const maxCasesPerRequest = 20

export type GaugeSpec = {
    version: 2
    cases: {
        key: string
        prompt: string
        criteria: { name: string; rubric: string }[]
        config: {
            agents: { agent: string; models: string[] }[]
            sampleCount: number
            repoUrl: string | null
            repoRef: string | null
            mcpRefs?: string[]
        }
    }[]
}

const gauge = (args: string[]) =>
    execFileSync('gauge', [...args, '--hosted'], {
        cwd: gaugeDir,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'inherit'],
        maxBuffer: 64 * 1024 * 1024,
    })

// Our harness ids are Gauge's harness slugs (claude-code). Gauge's specs and saved evals
// take its enum (CLAUDE_CODE), so this maps id → enum, from Gauge itself. Free.
export type GaugeHarnesses = Map<string, string>
export function gaugeHarnesses(): GaugeHarnesses {
    const models = JSON.parse(gauge(['models', 'list', '-o', 'json'])) as { harness: string; harnessSlug: string }[]
    return new Map(models.map((m) => [m.harnessSlug, m.harness]))
}

export function gaugeAgents(check: CheckPrompt, harnesses: GaugeHarnesses) {
    return check.harnesses.map((h) => {
        const agent = harnesses.get(h.id)
        if (!agent) throw new Error(`Gauge has no harness ${h.id}; check shared/run-config.yml`)
        return { agent, models: h.models }
    })
}

// attach_mcp name → the Gauge server pinned for it, or null until one is pinned.
const mcpPins = (parse(readFileSync(join(gaugeDir, 'mcp-servers.yml'), 'utf8')) ?? {}) as Record<string, string | null>
export const gaugeMcpRefs = (check: CheckPrompt) =>
    check.mcp ? [mcpPins[check.mcp.name]].filter((ref): ref is string => !!ref) : []

// Why Gauge can't run a check that is otherwise ready, or null.
export function gaugeCantRunReason(check: CheckPrompt): string | null {
    if (check.mcp && !mcpPins[check.mcp.name])
        return `attach_mcp ${check.mcp.name} has no Gauge server pinned in gauge/mcp-servers.yml`
    return null
}

export function toGaugeSpecs(checks: CheckPrompt[], samples: number, harnesses: GaugeHarnesses): GaugeSpec[] {
    const specs: GaugeSpec[] = []
    for (let start = 0; start < checks.length; start += maxCasesPerRequest) {
        specs.push({
            version: 2,
            cases: checks.slice(start, start + maxCasesPerRequest).map((c) => ({
                key: c.key,
                prompt: c.prompt,
                criteria: c.criteria,
                config: {
                    agents: gaugeAgents(c, harnesses),
                    sampleCount: samples,
                    // An answer-only check has no codebase.
                    repoUrl: c.codebase?.repo ?? null,
                    repoRef: c.codebase?.ref ?? null,
                    ...(c.mcp ? { mcpRefs: gaugeMcpRefs(c) } : {}),
                },
            })),
        })
    }
    return specs
}

export const dryRun = (specPath: string) => gauge(['run', '--apply', specPath, '--dry-run'])

// The launch response's id field isn't documented; take the first id-like value.
export function findRequestId(launchJson: string): string | null {
    const parsed = JSON.parse(launchJson) as Record<string, unknown>
    for (const key of ['runRequestId', 'requestId', 'id'])
        if (typeof parsed[key] === 'string') return parsed[key] as string
    return null
}

const sleep = (ms: number) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)

// One agent session's grade, in terms that don't depend on Gauge.
export type SessionResult = {
    check: string // check key
    harness: string // id from shared/run-config.yml
    model: string
    passed: boolean
    criteria: { name: string; passed: boolean; reason: string }[]
    url: string | null // where to read the session
}

type GaugeVerdict = {
    batches?: {
        runs?: {
            agent: string
            model: string
            result: string
            url?: string
            criterionResults?: { name: string; passed: boolean; reasoning?: string }[]
        }[]
    }[]
}

export function toSessionResults(check: string, verdict: unknown, harnesses: GaugeHarnesses): SessionResult[] {
    const ids = new Map([...harnesses].map(([id, agent]) => [agent, id]))
    return ((verdict as GaugeVerdict).batches ?? []).flatMap((batch) =>
        (batch.runs ?? []).map((run) => ({
            check,
            harness: ids.get(run.agent) ?? run.agent,
            model: run.model,
            passed: run.result === 'PASSED',
            criteria: (run.criterionResults ?? []).map((c) => ({
                name: c.name,
                passed: c.passed,
                reason: c.reasoning ?? '',
            })),
            url: run.url ?? null,
        }))
    )
}

export type WaitResult = { verdict: unknown; passed: boolean } | { error: string }

// With --check, wait exits 1 unless the verdict passes; stdout is still the JSON. A
// network error or a 503 while polling exits with no JSON: that's not a verdict, so wait
// again on the same request, backing off, and report an error if it never answers.
export function wait(requestId: string, attempts = 4): WaitResult {
    let lastError = ''
    for (let attempt = 1; attempt <= attempts; attempt++) {
        const result = spawnSync('gauge', ['run', 'wait', requestId, '--check', '-o', 'json', '--hosted'], {
            cwd: gaugeDir,
            encoding: 'utf8',
            maxBuffer: 64 * 1024 * 1024,
        })
        if (result.stderr) process.stderr.write(result.stderr)
        try {
            return { verdict: JSON.parse(result.stdout), passed: result.status === 0 }
        } catch {
            lastError = result.stderr.trim().split('\n').at(-1) || `gauge exited ${result.status} with no JSON`
            if (attempt < attempts) sleep(15_000 * 2 ** (attempt - 1))
        }
    }
    return { error: lastError }
}

export function gaugeAvailable(): boolean {
    return spawnSync('gauge', ['--version'], { stdio: 'ignore' }).status === 0
}
