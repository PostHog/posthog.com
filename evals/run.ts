import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'
import {
    dryRun,
    findRequestId,
    gaugeAvailable,
    gaugeCantRunReason,
    gaugeHarnesses,
    toGaugeSpecs,
    toSessionResults,
    wait,
    type GaugeHarnesses,
    type SessionResult,
} from './gauge/send-to-gauge.ts'
import {
    createSavedEval,
    definitionFor,
    editSavedEval,
    isCurrent,
    launchSavedEval,
    listSavedEvals,
    removeSavedEval,
} from './gauge/saved-evals.ts'
import {
    buildPrompts,
    checkKey,
    checkName,
    fetchPageText,
    type CheckPrompt,
    type Selection,
} from './build-eval-prompts.ts'
import {
    loadEvalFiles,
    loadShared,
    pageForEvalFile,
    localImports,
    pageForSourceFile,
    pageIndex,
    pageSourceFile,
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
  sync            Create or update one saved Gauge eval per selected check, named
                  [posthog.com/<path>] <check id>. Starts no sessions.
  run             Show how many saved evals and agent sessions would launch, ask to
                  confirm, then launch them and wait for judging. Spends Gauge credits.

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
  --prune                sync with no filters: delete saved evals whose check no longer exists
  --yes, -y              run: answer yes to the launch question (for CI and scripts)`

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
        yes: argv.includes('--yes') || argv.includes('-y'),
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

export function duplicateKeys(files: EvalFile[]): string[] {
    const owners = new Map<string, string[]>()
    for (const file of files)
        for (const check of file.checks) {
            const key = checkKey(file, check)
            owners.set(key, [...(owners.get(key) ?? []), `${file.path}#${check.id}`])
        }
    return [...owners].filter(([, where]) => where.length > 1).map(([key, where]) => `${key}: ${where.join(', ')}`)
}

export function changedSelection(files: EvalFile[], changed: string[]): Set<string> {
    const index = pageIndex(files)
    const keys = new Set<string>()
    // A page also changes when a snippet or component it imports changes.
    const changedPages = new Set(changed.map(pageForSourceFile).filter((page): page is string => page !== null))
    for (const page of index.keys()) {
        const source = pageSourceFile(page)
        if (source && changed.some((path) => localImports(source).has(path))) changedPages.add(page)
    }
    for (const page of changedPages)
        for (const { file, check } of index.get(page) ?? []) keys.add(`${file.path}#${check.id}`)
    for (const path of changed) {
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
    if (check.skill)
        return shared.runConfig.skills.enabled
            ? "attach_skill isn't built yet; skills need gauge/skills.ts"
            : 'attach_skill is a placeholder (skills.enabled is false in shared/run-config.yml)'
    return gaugeCantRunReason(check)
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

// Groups skipped checks under their reason, so 40 checks with one cause read as one line.
function printSkipped(title: string, skipped: CantRun[]) {
    const byReason = new Map<string, string[]>()
    for (const { key, reason } of skipped) byReason.set(reason, [...(byReason.get(reason) ?? []), key])
    console.log(`\n${title} (${skipped.length})`)
    for (const [reason, keys] of byReason) {
        console.log(`\n  ${reason} (${keys.length})`)
        for (const key of keys) console.log(`    ${key}`)
    }
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
    // A check key names its saved eval, so two checks with one key would overwrite each
    // other in Gauge: product-analytics/installation/react#native-install and
    // .../react-native#install, for example.
    const collisions = duplicateKeys(files)
    if (collisions.length > 0) {
        printProblems(`${collisions.length} check key(s) used by more than one check; rename one check id`, collisions)
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
    // Checks that can't run are left out and reported, never fatal: the rest still run.
    // Each prompt is built on its own, so a page that fails to fetch skips only the
    // checks that paste it in.
    const built: CheckPrompt[] = []
    const cantRun: CantRun[] = []
    for (const selection of selections) {
        try {
            built.push(...(await buildPrompts([selection], harnesses, shared, options.baseUrl, pageText)))
        } catch (error) {
            const message = error instanceof Error ? error.message : String(error)
            cantRun.push({
                key: checkKey(selection.file, selection.check),
                reason: `couldn't build the prompt: ${message}`,
            })
        }
    }
    for (const c of built) {
        const reason = cantRunReason(c, shared)
        if (reason) cantRun.push({ key: c.key, reason })
    }
    const checks = built.filter((c) => !cantRun.some((x) => x.key === c.key))
    if (cantRun.length > 0) printSkipped('Skipping', cantRun)
    console.log(
        `\nTo run (${checks.length}), on ${harnesses.map((h) => `${h.id} (${h.models.join(', ')})`).join(', ')}\n`
    )
    const rows = checks.map((c) => [
        c.key,
        setupOf(c),
        `${c.criteria.length} criteria`,
        c.codebase ? c.codebase.name : 'answer-only',
    ])
    const widths = rows.reduce((w, row) => row.map((cell, i) => Math.max(w[i] ?? 0, cell.length)), [] as number[])
    for (const row of rows) console.log(`  ${row.map((cell, i) => cell.padEnd(widths[i])).join('   ')}`.trimEnd())
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
    const harnessMap = gaugeHarnesses()
    if (options.command === 'sync') return sync(checks, files, shared, options, harnessMap)
    if (options.command === 'plan') {
        // Absolute, because the gauge CLI runs from evals/gauge/, not from here.
        const specDir = options.write ? resolve(options.write) : await mkdtemp(join(tmpdir(), 'posthog-evals-'))
        await mkdir(specDir, { recursive: true })
        for (const [i, spec] of toGaugeSpecs(checks, shared.runConfig.samples, harnessMap).entries()) {
            const path = join(specDir, `spec-${i + 1}.json`)
            await writeFile(path, `${JSON.stringify(spec, null, 4)}\n`)
            console.log(dryRun(path))
        }
        console.log(`Specs in ${specDir}`)
        return 0
    }
    return runSavedEvals(checks, shared, cantRun, options.yes, harnessMap)
}

const unfiltered = (options: Options) =>
    [options.pages, options.tags, options.suites, options.harnesses].every((list) => list.length === 0) &&
    !options.changed

// Makes Gauge's saved evals match the eval files, matching them by name. An eval is
// edited only when something in it changed, so Gauge starts a new revision only for a
// real change. `ready` are the checks that can run; `files` holds every check,
// including skipped ones and ones in draft or skipped files, so their saved evals, if
// any, don't count as orphans.
function sync(ready: CheckPrompt[], files: EvalFile[], shared: Shared, options: Options, harnesses: GaugeHarnesses) {
    const saved = listSavedEvals()
    const counts = { created: 0, updated: 0, unchanged: 0, duplicated: 0 }
    for (const check of ready) {
        const wanted = definitionFor(check, shared.runConfig.samples, harnesses)
        const existing = saved.get(wanted.name) ?? []
        if (existing.length > 1) {
            counts.duplicated++
            console.log(`  duplicate  ${check.name}: ${existing.length} saved evals have this name; delete all but one`)
        } else if (existing.length === 0) {
            createSavedEval(wanted, harnesses)
            counts.created++
            console.log(`  created    ${check.name}`)
        } else if (!isCurrent(existing[0], wanted)) {
            editSavedEval(existing[0].id, wanted, harnesses)
            counts.updated++
            console.log(`  updated    ${check.name}`)
        } else counts.unchanged++
    }

    // Saved evals for checks that no longer exist. Only knowable when sync saw every check.
    if (unfiltered(options)) {
        const names = new Set(files.flatMap((file) => file.checks.map((check) => checkName(file, check))))
        const orphans = [...saved.values()].flat().filter((e) => !names.has(e.name))
        for (const orphan of orphans) {
            if (options.prune) removeSavedEval(orphan.id)
            console.log(`  ${options.prune ? 'deleted' : 'orphan '}    ${orphan.name}`)
        }
        if (orphans.length > 0 && !options.prune) console.log('Pass --prune to delete the orphans above.')
    }
    console.log(
        `${counts.created} created, ${counts.updated} updated, ${counts.unchanged} unchanged${
            counts.duplicated > 0 ? `, ${counts.duplicated} with duplicate names` : ''
        }.`
    )
    return counts.duplicated > 0 ? 1 : 0
}

type CantRun = { key: string; reason: string }

// Launches each check under its saved eval, then waits for every one that launched.
// Nothing here stops the run early except running out of credits: a check that can't
// run is recorded with its reason, and the summary at the end lists them all.
async function runSavedEvals(
    checks: CheckPrompt[],
    shared: Shared,
    cantRun: CantRun[],
    yes: boolean,
    harnesses: GaugeHarnesses
): Promise<number> {
    const saved = listSavedEvals()
    const launchable: { check: CheckPrompt; evalId: string }[] = []
    const alreadyReported = cantRun.length
    for (const check of checks) {
        const live = saved.get(check.name) ?? []
        if (live.length === 0) cantRun.push({ key: check.key, reason: 'no saved eval; run pnpm evals sync' })
        else if (live.length > 1)
            cantRun.push({ key: check.key, reason: 'more than one saved eval has its name; delete all but one' })
        else if (!isCurrent(live[0], definitionFor(check, shared.runConfig.samples, harnesses)))
            cantRun.push({ key: check.key, reason: 'saved eval is out of date; run pnpm evals sync' })
        else launchable.push({ check, evalId: live[0].id })
    }
    const notSynced = cantRun.slice(alreadyReported)
    if (notSynced.length > 0) printSkipped('Also skipping, saved eval not ready', notSynced)
    if (launchable.length === 0) {
        console.log('Nothing to launch.')
        return 1
    }
    if (
        !(await confirmLaunch(
            launchable.map((l) => l.check),
            shared,
            cantRun.length,
            yes
        ))
    )
        return 1

    const outDir = join(repoRoot, 'evals', 'results', new Date().toISOString().replace(/[:.]/g, '-'))
    await mkdir(outDir, { recursive: true })
    await writeFile(
        join(outDir, 'checks.json'),
        `${JSON.stringify(
            launchable.map((l) => l.check),
            null,
            4
        )}\n`
    )

    // Launch everything first, so the sessions run side by side, then wait for each.
    const launched: { check: string; evalId: string; requestId: string; response: unknown }[] = []
    let stopReason: string | null = null
    for (const { check, evalId } of launchable) {
        if (stopReason) {
            cantRun.push({ key: check.key, reason: `not launched: ${stopReason}` })
            continue
        }
        const launch = launchSavedEval(evalId)
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
        launched.push({ check: check.key, evalId, requestId, response: JSON.parse(launch.raw) })
        // Saved after every launch: these sessions are paid for even if this process dies.
        await writeFile(join(outDir, 'request.json'), `${JSON.stringify(launched, null, 4)}\n`)
    }

    // results.json is the same whatever runs the evals; gauge-raw.json keeps Gauge's own
    // verdicts for debugging.
    const sessions: SessionResult[] = []
    const raw: Record<string, unknown> = {}
    const verdicts: { check: string; passed: boolean }[] = []
    if (launched.length > 0) console.log(`Waiting for judging on ${launched.length} launched run(s)`)
    // Saved after every verdict, so a crash or a CI timeout keeps what already came back.
    const save = async () => {
        await writeFile(join(outDir, 'results.json'), `${JSON.stringify({ sessions, cantRun }, null, 4)}\n`)
        await writeFile(join(outDir, 'gauge-raw.json'), `${JSON.stringify(raw, null, 4)}\n`)
    }
    for (const run of launched) {
        const result = wait(run.requestId)
        if ('error' in result) {
            cantRun.push({
                key: run.check,
                reason: `launched, but no verdict came back (${result.error}); try gauge run wait ${run.requestId} --hosted`,
            })
            console.log(`  no verdict  ${run.check}`)
        } else {
            raw[run.check] = result.verdict
            sessions.push(...toSessionResults(run.check, result.verdict, harnesses))
            verdicts.push({ check: run.check, passed: result.passed })
            console.log(`  ${result.passed ? 'passed' : 'failed'}  ${run.check}`)
        }
        await save()
    }
    await save()

    const passed = verdicts.filter((v) => v.passed).length
    console.log(
        `\n${passed} passed, ${verdicts.length - passed} failed, ${cantRun.length} couldn't run. Results in ${outDir}`
    )
    if (cantRun.length > 0) printSkipped("Couldn't run", cantRun)
    return passed === verdicts.length && cantRun.length === 0 ? 0 : 1
}

// One saved eval launches one session per harness model per sample.
export const sessionsFor = (checks: CheckPrompt[], samples: number) =>
    checks.reduce((sum, c) => sum + c.harnesses.reduce((n, h) => n + h.models.length, 0) * samples, 0)

// The last free step before credits are spent: say what will launch and ask.
async function confirmLaunch(launchable: CheckPrompt[], shared: Shared, skipped: number, yes: boolean) {
    const harnesses = [
        ...new Set(launchable.flatMap((c) => c.harnesses.map((h) => `${h.id} (${h.models.join(', ')})`))),
    ]
    console.log(
        [
            '',
            'Ready to launch on Gauge',
            `  Saved evals   ${launchable.length}`,
            `  Sessions      ${sessionsFor(launchable, shared.runConfig.samples)}`,
            `  Samples       ${shared.runConfig.samples} per harness model`,
            `  Harnesses     ${harnesses.join(', ')}`,
            `  Skipped       ${skipped}${skipped > 0 ? ' (listed above)' : ''}`,
            '',
            'This spends Gauge credits.',
        ].join('\n')
    )
    if (yes) return true
    if (!process.stdin.isTTY) {
        console.error('Not launched: no terminal to confirm in. Pass --yes to launch without asking.')
        return false
    }
    const prompt = createInterface({ input: process.stdin, output: process.stdout })
    const answer = await prompt.question('Launch? [y/N] ')
    prompt.close()
    if (/^y(es)?$/i.test(answer.trim())) return true
    console.log('Not launched.')
    return false
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exitCode = await main(process.argv.slice(2))
