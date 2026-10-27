import { execFileSync, spawnSync } from 'node:child_process'
import { join } from 'node:path'
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
        }
    }[]
}

export function toGaugeSpecs(checks: CheckPrompt[], samples: number): GaugeSpec[] {
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
                    // An answer-only check has no codebase.
                    repoUrl: c.codebase?.repo ?? null,
                    repoRef: c.codebase?.ref ?? null,
                },
            })),
        })
    }
    return specs
}

const gauge = (args: string[]) =>
    execFileSync('gauge', [...args, '--hosted'], {
        cwd: gaugeDir,
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'inherit'],
        maxBuffer: 64 * 1024 * 1024,
    })

export const dryRun = (specPath: string) => gauge(['run', '--apply', specPath, '--dry-run'])

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
        cwd: gaugeDir,
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
    })
    if (result.stderr) process.stderr.write(result.stderr)
    return { raw: result.stdout, passed: result.status === 0 }
}

export function gaugeAvailable(): boolean {
    return spawnSync('gauge', ['--version'], { stdio: 'ignore' }).status === 0
}
