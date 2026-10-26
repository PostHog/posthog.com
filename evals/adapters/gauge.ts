import { execFileSync, spawnSync } from 'node:child_process'
import { join } from 'node:path'
import { repoRoot } from '../spec.ts'
import type { RenderedCheck } from '../render.ts'

// The only Gauge-aware file. It turns rendered checks into Gauge's --apply case spec
// (see `gauge run --schema`), one Gauge case per check, and wraps the CLI calls.
// Gauge says "case" where the eval files say "check"; this is the only place both
// words meet. Written against gauge CLI 0.23, which runs in local Docker unless
// told --hosted, so every call passes it.
// The CLI runs from evals/ so it picks up evals/gauge.json, which keeps the Gauge
// GitHub App from treating every posthog.com PR as an eval run.

const evalsDir = join(repoRoot, 'evals')
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
            skillRefs?: string[]
        }
    }[]
}

export function toGaugeSpecs(checks: RenderedCheck[], samples: number): GaugeSpec[] {
    const specs: GaugeSpec[] = []
    for (let start = 0; start < checks.length; start += maxCasesPerRequest) {
        specs.push({
            version: 2,
            cases: checks.slice(start, start + maxCasesPerRequest).map((c) => ({
                key: c.key,
                prompt: c.prompt,
                criteria: c.criteria,
                config: {
                    agents: c.harnesses.map((h) => ({ agent: h.gauge, models: h.models })),
                    sampleCount: samples,
                    // An answer-only check has no starting app.
                    repoUrl: c.fixture?.repo ?? null,
                    repoRef: c.fixture?.ref ?? null,
                    ...(c.skillRefs.length > 0 ? { skillRefs: c.skillRefs } : {}),
                },
            })),
        })
    }
    return specs
}

const gauge = (args: string[]) =>
    execFileSync('gauge', [...args, '--hosted'], {
        cwd: evalsDir,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'inherit'],
        maxBuffer: 64 * 1024 * 1024,
    })

export const dryRun = (specPath: string) => gauge(['run', '--apply', specPath, '--dry-run'])

export function launch(specPath: string): { raw: string; requestId: string | null } {
    const raw = gauge(['run', '--apply', specPath, '--yes', '-o', 'json'])
    return { raw, requestId: findRequestId(raw) }
}

// The launch response's id field isn't documented; take the first id-like value.
export function findRequestId(launchJson: string): string | null {
    const parsed = JSON.parse(launchJson) as Record<string, unknown>
    for (const key of ['runRequestId', 'requestId', 'id'])
        if (typeof parsed[key] === 'string') return parsed[key] as string
    return null
}

// With --check, wait exits 1 unless the verdict passes; stdout is still the JSON.
export function wait(requestId: string): { raw: string; passed: boolean } {
    const result = spawnSync('gauge', ['run', 'wait', requestId, '--check', '-o', 'json', '--hosted'], {
        cwd: evalsDir,
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
    })
    if (result.stderr) process.stderr.write(result.stderr)
    return { raw: result.stdout, passed: result.status === 0 }
}

export const runDetails = (runId: string) => gauge(['run', 'get', runId, '-o', 'json'])
export const runLogs = (runId: string) => gauge(['run', 'get', runId, '--logs', '-o', 'json'])

export function skillExists(ref: string): boolean {
    return spawnSync('gauge', ['skills', 'get', ref, '--hosted'], { cwd: evalsDir, stdio: 'ignore' }).status === 0
}

export function gaugeAvailable(): boolean {
    return spawnSync('gauge', ['--version'], { stdio: 'ignore' }).status === 0
}
