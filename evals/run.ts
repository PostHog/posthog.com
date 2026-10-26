import { execFileSync } from 'node:child_process'
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dryRun, gaugeAvailable, launch, skillExists, toGaugeSpecs, wait } from './adapters/gauge.ts'
import { readCheck } from './read-check.ts'
import {
    fetchPageText,
    renderCases,
    renderSkill,
    skillName,
    skillVersion,
    type RenderedCase,
    type Selection,
} from './render.ts'
import {
    arms,
    loadEvalFiles,
    loadShared,
    pageForEvalFile,
    pageForSourceFile,
    pageIndex,
    repoRoot,
    type Arm,
    type EvalFile,
    type Shared,
} from './spec.ts'

const usage = `Usage: pnpm evals <command> [filters]

Commands:
  validate        Check every eval file. Free; runs in CI.
  index           Print page → cases, from every eval file and pages: list.
  plan            Render the selected cases and run gauge --dry-run. Free.
  run --yes       Launch the selected cases, wait for judging, run the read check. Spends Gauge credits.
  skills --out <dir>   Write one SKILL.md per selected page, for the skill arm.

Filters (combine):
  --page <docs path>     e.g. product-analytics/identify; repeatable
  --tag <tag>            repeatable
  --arm <arm>            ${arms.join(', ')}; repeatable
  --harness <id>         from matrix.yaml; repeatable
  --changed [base]       only cases whose pages or eval file changed against base (default origin/master)
  --base-url <url>       where link, inline and skill read pages (default https://posthog.com)
  --include-unverified   add matrix harnesses with verified: false
  --write <dir>          plan: also write the Gauge specs there`

type Options = {
    command: string
    pages: string[]
    tags: string[]
    arms: string[]
    harnesses: string[]
    changed: string | null
    baseUrl: string
    includeUnverified: boolean
    yes: boolean
    write: string | null
    out: string | null
}

export function parseArgs(argv: string[]): Options {
    const valuesOf = (flag: string) =>
        argv.flatMap((arg, i) => (arg === flag && argv[i + 1] && !argv[i + 1].startsWith('--') ? [argv[i + 1]] : []))
    const changedAt = argv.indexOf('--changed')
    return {
        command: argv[0] && !argv[0].startsWith('--') ? argv[0] : 'help',
        pages: valuesOf('--page').map((page) => (page.startsWith('docs/') ? page : `docs/${page}`).replace(/\/$/, '')),
        tags: valuesOf('--tag'),
        arms: valuesOf('--arm'),
        harnesses: valuesOf('--harness'),
        changed: changedAt === -1 ? null : valuesOf('--changed')[0] ?? 'origin/master',
        baseUrl: valuesOf('--base-url')[0] ?? 'https://posthog.com',
        includeUnverified: argv.includes('--include-unverified'),
        yes: argv.includes('--yes'),
        write: valuesOf('--write')[0] ?? null,
        out: valuesOf('--out')[0] ?? null,
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
        for (const { file, evalCase } of page ? index.get(page) ?? [] : []) keys.add(`${file.path}#${evalCase.id}`)
        if (path.endsWith('.eval.yaml'))
            for (const file of files.filter((f) => f.path === path))
                for (const c of file.cases) keys.add(`${file.path}#${c.id}`)
    }
    return keys
}

export function select(files: EvalFile[], shared: Shared, options: Options, changed: Set<string> | null) {
    for (const arm of options.arms)
        if (!(arms as readonly string[]).includes(arm))
            throw new Error(`Unknown --arm ${arm}; choose from ${arms.join(', ')}`)
    const knownHarnesses = shared.matrix.harnesses.map((h) => h.id)
    for (const id of options.harnesses)
        if (!knownHarnesses.includes(id))
            throw new Error(`Unknown --harness ${id}; choose from ${knownHarnesses.join(', ')}`)
    const index = pageIndex(files)
    for (const page of options.pages) if (!index.has(page)) throw new Error(`No eval cases read ${page}`)

    const harnesses = shared.matrix.harnesses.filter((h) =>
        options.harnesses.length > 0 ? options.harnesses.includes(h.id) : h.verified || options.includeUnverified
    )
    const selections: Selection[] = []
    let inactive = 0
    for (const file of files) {
        if (options.tags.length > 0 && !options.tags.some((tag) => file.tags.includes(tag))) continue
        for (const evalCase of file.cases) {
            const matchesPage =
                options.pages.length === 0 ||
                options.pages.some((page) => (index.get(page) ?? []).some((hit) => hit.evalCase === evalCase))
            if (!matchesPage || (changed && !changed.has(`${file.path}#${evalCase.id}`))) continue
            if (file.status !== 'active') {
                inactive++
                continue
            }
            const caseArms = (evalCase.arms ?? shared.matrix.defaultArms).filter(
                (arm) => options.arms.length === 0 || options.arms.includes(arm)
            )
            if (caseArms.length > 0) selections.push({ file, evalCase, arms: caseArms as Arm[] })
        }
    }
    return { selections, harnesses, inactive }
}

// What must be true before Gauge can run the cases. Free to check.
function readinessProblems(cases: RenderedCase[]): string[] {
    const problems = new Set<string>()
    for (const c of cases) {
        if (c.fixture && !c.fixture.ref)
            problems.add(`fixtures.yaml: ${c.fixture.name} has no ref; build it and pin the commit`)
    }
    const skillRefs = [...new Set(cases.flatMap((c) => c.skillRefs))]
    for (const ref of skillRefs)
        if (!skillExists(ref)) problems.add(`skill ${ref} isn't registered in Gauge; see pnpm evals skills`)
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
    const caseCount = files.reduce((sum, f) => sum + f.cases.length, 0)

    if (options.command === 'validate') {
        const active = files.filter((f) => f.status === 'active')
        console.log(`${files.length} eval files, ${caseCount} cases (${active.length} files active). All valid.`)
        return 0
    }
    if (options.command === 'index') {
        const index = [...pageIndex(files).entries()].sort(([a], [b]) => a.localeCompare(b))
        for (const [page, hits] of index) {
            console.log(page)
            for (const { file, evalCase } of hits) {
                const where = file.page && file.page !== page ? `  (in ${file.path})` : ''
                console.log(
                    `  → ${pageForEvalFile(file.path) ?? file.path}#${evalCase.id}${
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
    if (inactive > 0) console.log(`Skipping ${inactive} draft or skipped case(s).`)
    if (selections.length === 0) {
        console.log('No active cases match.')
        return 0
    }
    const pageText = fetchPageText(options.baseUrl)

    if (options.command === 'skills') {
        if (!options.out) {
            console.error('skills needs --out <dir>')
            return 2
        }
        const pages = [
            ...new Set(
                selections.flatMap(({ file, evalCase }) =>
                    [file.page, ...file.pages, ...evalCase.pages].filter((p): p is string => Boolean(p))
                )
            ),
        ]
        for (const page of pages) {
            const text = await pageText(page)
            await mkdir(join(options.out, skillName(page)), { recursive: true })
            await writeFile(join(options.out, skillName(page), 'SKILL.md'), renderSkill(page, text))
            console.log(
                `gauge skills add <owner/repo>/<path>/${skillName(page)}#<commit> --as ${skillName(
                    page
                )} --label ${skillVersion(text)} --hosted`
            )
        }
        console.log(
            `Wrote ${pages.length} skills to ${options.out}. Push them, then run the commands above with the real repo and commit.`
        )
        return 0
    }

    if (harnesses.length === 0) {
        console.error('No harness selected; check matrix.yaml or pass --harness / --include-unverified')
        return 2
    }
    const cases = await renderCases(selections, harnesses, shared, options.baseUrl, pageText)
    console.log(
        `${cases.length} Gauge case(s) from ${selections.length} eval case(s), on ${harnesses
            .map((h) => `${h.id} (${h.models.join(', ')})`)
            .join(', ')}:`
    )
    for (const c of cases)
        console.log(`  ${c.key}  ${c.criteria.length} criteria${c.fixture ? `  ${c.fixture.name}` : '  answer-only'}`)

    if (options.command !== 'plan' && options.command !== 'run') {
        console.error(`Unknown command ${options.command}\n\n${usage}`)
        return 2
    }
    const specs = toGaugeSpecs(cases, shared.matrix.samples)
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
    const notReady = readinessProblems(cases)
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
    await writeFile(join(outDir, 'cases.json'), `${JSON.stringify(cases, null, 4)}\n`)
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
    // One wait result per request; read-check finds run ids anywhere in the file.
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
    await readCheck(outDir)
    console.log(`Results in ${outDir}`)
    return passed ? 0 : 1
}

if (process.argv[1] === fileURLToPath(import.meta.url)) process.exitCode = await main(process.argv.slice(2))
