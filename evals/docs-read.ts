import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { runDetails, runLogs } from './adapters/gauge.ts'
import { skillName, type RenderedCheck } from './render.ts'
import type { Arm } from './spec.ts'

// The docs-read report: works out from each run's logs whether the agent used the
// docs. It isn't a criterion, because a failed criterion fails the whole run.
//
// Gauge's API spec leaves run and log payloads untyped, so this reads them as text
// instead of depending on a shape we haven't seen yet. Tighten it after the first
// real run.

const docsUrlPattern = /https?:\/\/[^\s"'<>\\)\]]+?\/docs\/[^\s"'<>\\)\]]+/gi
const runIdPattern = /\brun_[A-Za-z0-9]+\b/g

// Drops the host too, so production and deploy-preview URLs compare equal.
export function normalizeDocsUrl(url: string): string {
    return url
        .replace(/^https?:\/\/[^/]+/i, '')
        .replace(/[#?].*$/, '')
        .replace(/\.md$/, '')
        .replace(/\/$/, '')
        .toLowerCase()
}

export const extractDocsUrls = (text: string) => [
    ...new Set([...text.matchAll(docsUrlPattern)].map((match) => normalizeDocsUrl(match[0]))),
]

// `gauge run wait -o json` lists runs under batches[].runs[].id; the launch
// response lists them under runIds.
export function extractRunIds(text: string): string[] {
    try {
        const parsed = JSON.parse(text) as { batches?: { runs?: { id?: unknown }[] }[]; runIds?: unknown[] }
        const ids = [
            ...(parsed.batches ?? []).flatMap((batch) => (batch.runs ?? []).map((run) => run.id)),
            ...(parsed.runIds ?? []),
        ]
        const strings = ids.filter((id): id is string => typeof id === 'string')
        if (strings.length > 0) return [...new Set(strings)]
    } catch {
        // Not JSON; fall through to the pattern.
    }
    return [...new Set(text.match(runIdPattern) ?? [])]
}

// Check keys are unique, so the longest key that appears in the run payload wins.
export const matchCheck = (runText: string, checks: RenderedCheck[]) =>
    [...checks].sort((a, b) => b.key.length - a.key.length).find((c) => runText.includes(c.key)) ?? null

// Drops what the prompt itself handed the agent (raw or JSON-escaped), so anything
// left came from the agent's own tool calls.
export function stripPromptContent(logsText: string, rendered: RenderedCheck): string {
    let text = logsText
    for (const form of [rendered.prompt, JSON.stringify(rendered.prompt).slice(1, -1)]) text = text.replaceAll(form, '')
    return text
}

// fetchedPages: which of the check's pages the agent fetched itself. On link that
// shows the agent followed the link; on baseline it means the agent found the docs
// on its own. It's
// null on skill, where reading the staged skill puts the page's own URLs in the
// logs. usedSkill: the logs mention the skill beyond the prompt (skill arm only).
export type RunDocsRead = {
    runId: string
    checkKey: string | null
    arm: Arm | null
    fetchedPages: Record<string, boolean> | null
    usedSkill: boolean | null
    docsUrls: string[]
}

export function readRun(runId: string, runText: string, logsText: string, checks: RenderedCheck[]): RunDocsRead {
    const matched = matchCheck(runText, checks)
    const ownText = matched ? stripPromptContent(logsText, matched) : logsText
    const docsUrls = extractDocsUrls(ownText)
    const isSkill = matched?.arm === 'skill'
    return {
        runId,
        checkKey: matched?.key ?? null,
        arm: matched?.arm ?? null,
        fetchedPages:
            matched && !isSkill
                ? Object.fromEntries(
                      matched.pages.map((page) => [page, docsUrls.includes(normalizeDocsUrl(`/${page}`))])
                  )
                : null,
        usedSkill: matched && isSkill ? matched.pages.some((page) => ownText.includes(skillName(page))) : null,
        docsUrls,
    }
}

// Reads results.json and checks.json from a run folder and writes docs-read.json.
export async function docsRead(outDir: string): Promise<RunDocsRead[]> {
    const checks = JSON.parse(await readFile(join(outDir, 'checks.json'), 'utf8')) as RenderedCheck[]
    const runIds = extractRunIds(await readFile(join(outDir, 'results.json'), 'utf8'))
    if (runIds.length === 0)
        throw new Error(`No run ids in ${join(outDir, 'results.json')}; check its shape and update extractRunIds`)
    const reads = runIds.map((runId) => readRun(runId, runDetails(runId), runLogs(runId), checks))
    await writeFile(join(outDir, 'docs-read.json'), `${JSON.stringify(reads, null, 4)}\n`)
    for (const read of reads) {
        const fetched =
            read.fetchedPages &&
            Object.entries(read.fetchedPages).map(([page, yes]) => `${yes ? 'fetched' : 'did not fetch'} ${page}`)
        const notes = [
            read.checkKey === null ? 'unknown check' : null,
            ...(fetched ?? []),
            read.usedSkill === null ? null : read.usedSkill ? 'used the skill' : 'no sign of the skill',
        ].filter(Boolean)
        console.log(`${read.runId}  ${read.checkKey ?? '?'}  ${notes.join(', ')}  (${read.docsUrls.length} docs URLs)`)
    }
    return reads
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const outDir = process.argv[2]
    if (!outDir) {
        console.log('Usage: node evals/docs-read.ts <results folder>')
        process.exitCode = 2
    } else await docsRead(dirname(join(outDir, 'results.json')))
}
