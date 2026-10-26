import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dryRun, gaugeAvailable, launch, toGaugeSpecs, wait } from './gauge/send-to-gauge.ts'
import { buildPrompts, fetchPageText, type CheckPrompt, type Selection } from './build-eval-prompts.ts'
import {
    arms,
    loadEvalFiles,
    loadShared,
    pageForEvalFile,
    pageForSourceFile,
    pageIndex,
    repoRoot,
    suites,
    type Arm,
    type EvalFile,
    type Shared,
} from './load-eval-files.ts'

const usage = `Usage: pnpm evals <command> [filters]

Commands:
  validate        Check every eval file. Free.
  index           Print page → checks, from every eval file and pages: list.
  plan            Build the selected checks' prompts and run gauge --dry-run. Free.
  run --yes       Launch the selected checks and wait for judging. Spends Gauge credits.

Filters (combine):
  --page <docs path>     e.g. product-analytics/identify; repeatable
  --tag <tag>            repeatable
  --suite <suite>        smoke or deep; repeatable (default: both)
  --arm <arm>            ${arms.join(', ')}; repeatable
  --harness <id>         from shared/run-config.yml; repeatable
  --changed [base]       only checks whose pages or eval file changed against base (default origin/master)
  --base-url <url>       where link and inline read pages (default https://posthog.com)
  --include-unverified   add shared/run-config.yml harnesses with verified: false
  --write <dir>          plan: also write the Gauge specs there`

type Options = {
    command: string
    pages: string[]
    tags: string[]
    suites: string[]
    arms: string[]
    harnesses: string[]
    changed: string | null
    baseUrl: string
    includeUnverified: boolean
    yes: boolean
    write: string | null
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
        arms: valuesOf('--arm'),
        harnesses: valuesOf('--harness'),
        changed: changedAt === -1 ? null : valuesOf('--changed')[0] ?? 'origin/master',
        baseUrl: valuesOf('--base-url')[0] ?? 'https://posthog.com',
        includeUnverified: argv.includes('--include-unverified'),
        yes: argv.includes('--yes'),
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
    for (const arm of options.arms)
        if (!(arms as readonly string[]).includes(arm))
            throw new Error(`Unknown --arm ${arm}; choose from ${arms.join(', ')}`)
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
            const checkArms = (check.arms ?? shared.runConfig.defaultArms).filter(
                (arm) => options.arms.length === 0 || options.arms.includes(arm)
            )
            if (checkArms.length > 0) selections.push({ file, check, arms: checkArms as Arm[] })
        }
    }
    return { selections, harnesses, inactive }
}

// What must be true before Gauge can run the checks. Free to check.
function readinessProblems(checks: CheckPrompt[]): string[] {
    const problems = new Set<string>()
    for (const c of checks)
        if (c.codebase && !c.codebase.ref)
            problems.add(`shared/codebases-to-test.yaml: ${c.codebase.name} has no ref; build it and pin the commit`)
    return [...problems]
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
    const checks = await buildPrompts(selections, harnesses, shared, options.baseUrl, pageText)
    console.log(
        `${checks.length} Gauge case(s) from ${selections.length} check(s), on ${harnesses
            .map((h) => `${h.id} (${h.models.join(', ')})`)
            .join(', ')}:`
    )
    for (const c of checks)
        console.log(`  ${c.key}  ${c.criteria.length} criteria${c.codebase ? `  ${c.codebase.name}` : '  answer-only'}`)

    if (options.command !== 'plan' && options.command !== 'run') {
        console.error(`Unknown command ${options.command}\n\n${usage}`)
        return 2
    }
    const specs = toGaugeSpecs(checks, shared.runConfig.samples)
    const specDir = options.write ?? (await mkdtemp(join(tmpdir(), 'posthog-evals-')))
    await mkdir(specDir, { recursive: true })
    const specPaths: string[] = []
    for (const [i, spec] of specs.entries()) {
        const path = join(specDir, `spec-${i + 1}.json`)
        await writeFile(path, `${JSON.stringify(spec, null, 4)}\n`)
        specPaths.push(path)
    }

    if (!gaugeAvailable()) {
        console.error('The gauge CLI is not on PATH: npm install -g @withgauge/cli, then gauge auth login')
        return 1
    }
    const notReady = readinessProblems(checks)
    if (notReady.length > 0) {
        printProblems('Not ready to run', notReady)
        return 1
    }
    for (const path of specPaths) console.log(dryRun(path))
    if (options.command === 'plan' || !options.yes) {
        console.log(
            options.command === 'run' ? 'Plan only. Re-run with --yes to launch these sessions.' : `Specs in ${specDir}`
        )
        return 0
    }

    const outDir = join(repoRoot, 'evals', 'results', new Date().toISOString().replace(/[:.]/g, '-'))
    await mkdir(outDir, { recursive: true })
    await writeFile(join(outDir, 'checks.json'), `${JSON.stringify(checks, null, 4)}\n`)
    let passed = true
    const results: unknown[] = []
    const requests: unknown[] = []
    for (const path of specPaths) {
        const { raw, requestId } = launch(path)
        requests.push(JSON.parse(raw))
        if (!requestId)
            throw new Error(`No request id in the launch response; check its shape and update findRequestId:\n${raw}`)
        console.log(`Launched ${requestId}; waiting for judging`)
        const result = wait(requestId)
        passed &&= result.passed
        results.push(JSON.parse(result.raw))
    }
    await writeFile(join(outDir, 'request.json'), `${JSON.stringify(requests, null, 4)}\n`)
    // One wait result per request; merge their batches into one file.
    await writeFile(
        join(outDir, 'results.json'),
        `${JSON.stringify(
            results.length === 1
                ? results[0]
                : { batches: results.flatMap((r) => (r as { batches?: unknown[] }).batches ?? []) },
            null,
            4
        )}\n`
    )
    console.log(`Results in ${outDir}`)
    return passed ? 0 : 1
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exitCode = await main(process.argv.slice(2))
