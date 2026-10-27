import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dryRun, findRequestId, gaugeAvailable, toGaugeSpecs, wait } from './gauge/send-to-gauge.ts'
import {
    createSavedEval,
    definitionFor,
    editSavedEval,
    harnessSlugs,
    idsFile,
    isCurrent,
    launchSavedEval,
    listSavedEvals,
    readIds,
    removeSavedEval,
    savedEvalName,
    writeIds,
} from './gauge/saved-evals.ts'
import { buildPrompts, fetchPageText, type CheckPrompt, type Selection } from './build-eval-prompts.ts'
import {
    loadEvalFiles,
    loadShared,
    pageForEvalFile,
    pageForSourceFile,
    pageIndex,
    repoRoot,
    suites,
    type EvalFile,
    type Shared,
} from './load-eval-files.ts'

const usage = `Usage: pnpm evals <command> [filters]

Commands:
  validate        Check every eval file. Free.
  index           Print page → checks, from every eval file and pages: list.
  plan            Build the selected checks' prompts and run gauge --dry-run. Free.
  sync            Create or update one saved Gauge eval per selected check, and record
                  their ids in gauge/saved-evals.json. Starts no sessions.
  run --yes       Launch the selected checks under their saved evals and wait for judging.
                  Spends Gauge credits. Without --yes, the same as plan.

Filters (combine):
  --page <docs path>     e.g. product-analytics/identify; repeatable
  --tag <tag>            repeatable
  --suite <suite>        smoke or deep; repeatable (default: both)
  --harness <id>         from shared/run-config.yml; repeatable
  --changed [base]       only checks whose pages or eval file changed against base (default origin/master)
  --base-url <url>       where append_docs_link and append_docs_content read pages
                         (default https://posthog.com)
  --include-unverified   add shared/run-config.yml harnesses with verified: false
  --write <dir>          plan: also write the Gauge specs there
  --prune                sync with no filters: delete saved evals whose check no longer exists`

type Options = {
    command: string
    pages: string[]
    tags: string[]
    suites: string[]
    harnesses: string[]
    changed: string | null
    baseUrl: string
    includeUnverified: boolean
    yes: boolean
    write: string | null
    prune: boolean
}

export function parseArgs(argv: string[]): Options {
    const valuesOf = (flag: string) =>
        argv.flatMap((arg, i) => (arg === flag && argv[i + 1] && !argv[i + 1].startsWith('--') ? [argv[i + 1]] : []))
    const changedAt = argv.indexOf('--changed')
    return {
        command: argv[0] && !argv[0].startsWith('--') ? argv[0] : 'help',
        pages: valuesOf('--page').map((page) => (page.startsWith('docs/') ? page : `docs/${page}`).replace(/\/$/, '')),
        tags: valuesOf('--tag'),
        suites: valuesOf('--suite'),
        harnesses: valuesOf('--harness'),
        changed: changedAt === -1 ? null : valuesOf('--changed')[0] ?? 'origin/master',
        baseUrl: valuesOf('--base-url')[0] ?? 'https://posthog.com',
        includeUnverified: argv.includes('--include-unverified'),
        yes: argv.includes('--yes'),
        prune: argv.includes('--prune'),
        write: valuesOf('--write')[0] ?? null,
    }
}

// Files changed against the merge base, including uncommitted and untracked work.
function changedFiles(base: string): string[] {
    const git = (args: string[]) =>
        execFileSync('git', args, { cwd: repoRoot, encoding: 'utf8' }).split('\n').filter(Boolean)
    const mergeBase = git(['merge-base', base, 'HEAD'])[0]
    return [
        ...new Set([
            ...git(['diff', '--name-only', mergeBase]),
            ...git(['ls-files', '--others', '--exclude-standard']),
        ]),
    ]
}

export function changedSelection(files: EvalFile[], changed: string[]): Set<string> {
    const index = pageIndex(files)
    const keys = new Set<string>()
    for (const path of changed) {
        const page = pageForSourceFile(path)
        for (const { file, check } of page ? index.get(page) ?? [] : []) keys.add(`${file.path}#${check.id}`)
        if (path.endsWith('.eval.yaml'))
            for (const file of files.filter((f) => f.path === path))
                for (const check of file.checks) keys.add(`${file.path}#${check.id}`)
    }
    return keys
}

export function select(files: EvalFile[], shared: Shared, options: Options, changed: Set<string> | null) {
    for (const suite of options.suites)
        if (!(suites as readonly string[]).includes(suite))
            throw new Error(`Unknown --suite ${suite}; choose from ${suites.join(', ')}`)
    const knownHarnesses = shared.runConfig.harnesses.map((h) => h.id)
    for (const id of options.harnesses)
        if (!knownHarnesses.includes(id))
            throw new Error(`Unknown --harness ${id}; choose from ${knownHarnesses.join(', ')}`)
    const index = pageIndex(files)
    for (const page of options.pages) if (!index.has(page)) throw new Error(`No eval checks read ${page}`)

    const harnesses = shared.runConfig.harnesses.filter((h) =>
        options.harnesses.length > 0 ? options.harnesses.includes(h.id) : h.verified || options.includeUnverified
    )
    const selections: Selection[] = []
    let inactive = 0
    for (const file of files) {
        if (options.tags.length > 0 && !options.tags.some((tag) => file.tags.includes(tag))) continue
        for (const check of file.checks) {
            const matchesPage =
                options.pages.length === 0 ||
                options.pages.some((page) => (index.get(page) ?? []).some((hit) => hit.check === check))
            if (options.suites.length > 0 && !options.suites.includes(check.suite)) continue
            if (!matchesPage || (changed && !changed.has(`${file.path}#${check.id}`))) continue
            if (file.status !== 'active') {
                inactive++
                continue
            }
            selections.push({ file, check })
        }
    }
    return { selections, harnesses, inactive }
}

// Why a check can't run, or null when it can. Free to check.
export function cantRunReason(check: CheckPrompt, shared: Shared): string | null {
    if (check.codebase && !check.codebase.ref)
        return `codebase ${check.codebase.name} has no ref in shared/codebases-to-test.yaml`
    if (check.mcp && !check.mcp.ref)
        return `attach_mcp ${check.mcp.name} has no version pinned in the mcp map of shared/run-config.yml`
    if (check.skill)
        return shared.runConfig.skills.enabled
            ? "attach_skill isn't built yet; skills need gauge/skills.ts"
            : 'attach_skill is a placeholder (skills.enabled is false in shared/run-config.yml)'
    return null
}

// What the agent gets on top of the prompt, for the plan output.
export function setupOf(check: CheckPrompt): string {
    const parts = [
        ...(check.append.link ? ['docs link'] : []),
        ...(check.append.content ? ['docs content'] : []),
        ...(check.mcp ? [`mcp ${check.mcp.name}`] : []),
        ...(check.skill ? ['skill'] : []),
    ]
    return parts.length > 0 ? parts.join(' + ') : 'no docs'
}

function printProblems(title: string, problems: string[]) {
    console.error(`${title}:\n${problems.map((p) => `  ${p}`).join('\n')}`)
}

async function main(argv: string[]): Promise<number> {
    const options = parseArgs(argv)
    if (options.command === 'help' || argv.includes('--help')) {
        console.log(usage)
        return 0
    }
    const shared = loadShared()
    const { files, problems } = loadEvalFiles(shared)
    if (problems.length > 0) {
        printProblems(
            `${problems.length} problem(s) in eval files`,
            problems.map((p) => `${p.path}: ${p.message}`)
        )
        return 1
    }
    const checkCount = files.reduce((sum, f) => sum + f.checks.length, 0)

    if (options.command === 'validate') {
        const active = files.filter((f) => f.status === 'active')
        console.log(`${files.length} eval files, ${checkCount} checks (${active.length} files active). All valid.`)
        return 0
    }
    if (options.command === 'index') {
        const index = [...pageIndex(files).entries()].sort(([a], [b]) => a.localeCompare(b))
        for (const [page, hits] of index) {
            console.log(page)
            for (const { file, check } of hits) {
                const where = file.page && file.page !== page ? `  (in ${file.path})` : ''
                console.log(
                    `  → ${pageForEvalFile(file.path) ?? file.path}#${check.id}${
                        file.status === 'active' ? '' : ` [${file.status}]`
                    }${where}`
                )
            }
        }
        return 0
    }

    const changed = options.changed ? changedSelection(files, changedFiles(options.changed)) : null
    let selected: ReturnType<typeof select>
    try {
        selected = select(files, shared, options, changed)
    } catch (error) {
        console.error(error instanceof Error ? error.message : String(error))
        return 2
    }
    const { selections, harnesses, inactive } = selected
    if (inactive > 0) console.log(`Skipping ${inactive} draft or skipped check(s).`)
    if (selections.length === 0) {
        console.log('No active checks match.')
        return 0
    }
    const pageText = fetchPageText(options.baseUrl)

    if (harnesses.length === 0) {
        console.error('No harness selected; check shared/run-config.yml or pass --harness / --include-unverified')
        return 2
    }
    const built = await buildPrompts(selections, harnesses, shared, options.baseUrl, pageText)
    // Checks that can't run are left out and reported, never fatal: the rest still run.
    const cantRun = built.flatMap((c) => {
        const reason = cantRunReason(c, shared)
        return reason ? [{ key: c.key, reason }] : []
    })
    const checks = built.filter((c) => !cantRun.some((x) => x.key === c.key))
    if (cantRun.length > 0)
        printProblems(
            `Can't run ${cantRun.length} check(s), skipping them`,
            cantRun.map((x) => `${x.key}: ${x.reason}`)
        )
    console.log(
        `${checks.length} check(s) to run, on ${harnesses.map((h) => `${h.id} (${h.models.join(', ')})`).join(', ')}:`
    )
    for (const c of checks)
        console.log(
            `  ${c.key}  ${setupOf(c)}  ${c.criteria.length} criteria  ${c.codebase ? c.codebase.name : 'answer-only'}`
        )
    if (checks.length === 0) {
        console.log('Nothing to run.')
        return cantRun.length > 0 ? 1 : 0
    }

    if (!['plan', 'sync', 'run'].includes(options.command)) {
        console.error(`Unknown command ${options.command}\n\n${usage}`)
        return 2
    }
    if (!gaugeAvailable()) {
        console.error('The gauge CLI is not on PATH: npm install -g @withgauge/cli, then gauge auth login')
        return 1
    }
    if (options.command === 'sync') return sync(checks, built, shared, options)
    if (options.command === 'plan' || !options.yes) {
        const specDir = options.write ?? (await mkdtemp(join(tmpdir(), 'posthog-evals-')))
        await mkdir(specDir, { recursive: true })
        for (const [i, spec] of toGaugeSpecs(checks, shared.runConfig.samples).entries()) {
            const path = join(specDir, `spec-${i + 1}.json`)
            await writeFile(path, `${JSON.stringify(spec, null, 4)}\n`)
            console.log(dryRun(path))
        }
        console.log(
            options.command === 'run' ? 'Plan only. Re-run with --yes to launch these sessions.' : `Specs in ${specDir}`
        )
        return 0
    }
    return runSavedEvals(checks, shared, cantRun)
}

const unfiltered = (options: Options) =>
    [options.pages, options.tags, options.suites, options.harnesses].every((list) => list.length === 0) &&
    !options.changed

// Makes Gauge's saved evals match the eval files. An eval is edited only when something
// in it changed, so Gauge starts a new revision only for a real change. `ready` are the
// checks that can run; `all` also holds the skipped ones, so their saved evals, if any,
// don't count as orphans.
function sync(ready: CheckPrompt[], all: CheckPrompt[], shared: Shared, options: Options): number {
    const slugs = harnessSlugs()
    const saved = listSavedEvals()
    const ids = readIds()
    const counts = { created: 0, updated: 0, unchanged: 0 }
    for (const check of ready) {
        const wanted = definitionFor(check, shared.runConfig.samples)
        const existing = saved.get(wanted.name)
        if (!existing) {
            ids[check.key] = createSavedEval(wanted, slugs)
            counts.created++
            console.log(`  created    ${check.key}  ${ids[check.key]}`)
        } else if (!isCurrent(existing, wanted)) {
            editSavedEval(existing.id, wanted, slugs)
            ids[check.key] = existing.id
            counts.updated++
            console.log(`  updated    ${check.key}  ${existing.id}`)
        } else {
            ids[check.key] = existing.id
            counts.unchanged++
        }
    }

    // Saved evals for checks that no longer exist. Only knowable when sync saw every check.
    if (unfiltered(options)) {
        const keys = new Set(all.map((c) => c.key))
        for (const key of Object.keys(ids)) if (!keys.has(key)) delete ids[key]
        const names = new Set(all.map((c) => savedEvalName(c.key)))
        const orphans = [...saved.values()].filter((e) => !names.has(e.name))
        for (const orphan of orphans) {
            if (options.prune) removeSavedEval(orphan.id)
            console.log(`  ${options.prune ? 'deleted' : 'orphan '}    ${orphan.name}  ${orphan.id}`)
        }
        if (orphans.length > 0 && !options.prune) console.log('Pass --prune to delete the orphans above.')
    }
    writeIds(ids)
    console.log(
        `${counts.created} created, ${counts.updated} updated, ${counts.unchanged} unchanged. Ids in ${idsFile.replace(
            `${repoRoot}/`,
            ''
        )}`
    )
    return 0
}

type CantRun = { key: string; reason: string }

// Launches each check under its saved eval, then waits for every one that launched.
// Nothing here stops the run early except running out of credits: a check that can't
// run is recorded with its reason, and the summary at the end lists them all.
async function runSavedEvals(checks: CheckPrompt[], shared: Shared, cantRun: CantRun[]): Promise<number> {
    const ids = readIds()
    const saved = listSavedEvals()
    const launchable: CheckPrompt[] = []
    for (const check of checks) {
        const live = saved.get(savedEvalName(check.key))
        if (!ids[check.key] || !live || live.id !== ids[check.key])
            cantRun.push({ key: check.key, reason: 'no saved eval; run pnpm evals sync' })
        else if (!isCurrent(live, definitionFor(check, shared.runConfig.samples)))
            cantRun.push({ key: check.key, reason: 'saved eval is out of date; run pnpm evals sync' })
        else launchable.push(check)
    }

    const outDir = join(repoRoot, 'evals', 'results', new Date().toISOString().replace(/[:.]/g, '-'))
    await mkdir(outDir, { recursive: true })
    await writeFile(join(outDir, 'checks.json'), `${JSON.stringify(launchable, null, 4)}\n`)

    // Launch everything first, so the sessions run side by side, then wait for each.
    const launched: { check: string; evalId: string; requestId: string; response: unknown }[] = []
    let stopReason: string | null = null
    for (const check of launchable) {
        if (stopReason) {
            cantRun.push({ key: check.key, reason: `not launched: ${stopReason}` })
            continue
        }
        const launch = launchSavedEval(ids[check.key])
        if (!launch.ok) {
            cantRun.push({ key: check.key, reason: `launch failed: ${launch.code}: ${launch.message}` })
            // Every later launch would fail the same way.
            if (launch.code === 'insufficient_credits') stopReason = 'Gauge is out of credits'
            continue
        }
        const requestId = findRequestId(launch.raw)
        if (!requestId) {
            cantRun.push({ key: check.key, reason: 'launched, but the response had no request id' })
            continue
        }
        console.log(`Launched ${check.key} (${requestId})`)
        launched.push({ check: check.key, evalId: ids[check.key], requestId, response: JSON.parse(launch.raw) })
    }
    await writeFile(join(outDir, 'request.json'), `${JSON.stringify(launched, null, 4)}\n`)

    const results: Record<string, unknown> = {}
    const verdicts: { check: string; passed: boolean }[] = []
    if (launched.length > 0) console.log(`Waiting for judging on ${launched.length} launched run(s)`)
    for (const run of launched) {
        const result = wait(run.requestId)
        results[run.check] = JSON.parse(result.raw)
        verdicts.push({ check: run.check, passed: result.passed })
        console.log(`  ${result.passed ? 'passed' : 'failed'}  ${run.check}`)
    }
    await writeFile(join(outDir, 'results.json'), `${JSON.stringify({ results, cantRun }, null, 4)}\n`)

    const passed = verdicts.filter((v) => v.passed).length
    console.log(
        `\n${passed} passed, ${verdicts.length - passed} failed, ${cantRun.length} couldn't run. Results in ${outDir}`
    )
    if (cantRun.length > 0)
        printProblems(
            "Couldn't run",
            cantRun.map((x) => `${x.key}: ${x.reason}`)
        )
    return passed === verdicts.length && cantRun.length === 0 ? 0 : 1
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exitCode = await main(process.argv.slice(2))
