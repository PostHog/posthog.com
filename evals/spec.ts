import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob'
import { parse } from 'yaml'

// Finds, parses and checks eval files. Nothing in here knows about Gauge.

export const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

export const arms = ['prompt', 'link', 'inline', 'skill'] as const
export type Arm = (typeof arms)[number]
export const statuses = ['active', 'draft', 'skipped'] as const
export type Status = (typeof statuses)[number]

export type Fixture = { repo: string; ref?: string; folder: string; source?: string }
export type Harness = { id: string; gauge: string; models: string[]; verified: boolean }
export type Matrix = { harnesses: Harness[]; defaultArms: Arm[]; samples: number }
export type Shared = { criteria: Record<string, string>; fixtures: Record<string, Fixture>; matrix: Matrix }

export type EvalCase = {
    id: string
    fixture: string | null
    pages: string[]
    task: string
    arms: Arm[] | null
    use: string[]
    criteria: Record<string, string>
}

export type EvalFile = {
    path: string // repo-relative
    page: string | null // docs path such as docs/product-analytics/identify; null for a journey
    journey: boolean
    owner: string | null
    tags: string[]
    status: Status
    pages: string[] // journeys only: the pages the file tests
    cases: EvalCase[]
}

export type Problem = { path: string; message: string }

const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const maxPagesPerCase = 4
const fileKeys = ['version', 'owner', 'tags', 'status', 'pages', 'cases']
const caseKeys = ['id', 'workspace', 'pages', 'task', 'arms', 'criteria']

const readYaml = (path: string) => parse(readFileSync(join(repoRoot, path), 'utf8'))

export function loadShared(): Shared {
    const matrix = readYaml('evals/matrix.yaml') as Matrix
    return {
        criteria: readYaml('evals/criteria.yaml') as Record<string, string>,
        fixtures: readYaml('evals/fixtures.yaml') as Record<string, Fixture>,
        matrix: { ...matrix, harnesses: matrix.harnesses.map((h) => ({ ...h, verified: h.verified === true })) },
    }
}

export const evalFilePaths = () =>
    globSync(['contents/**/*.eval.yaml', 'evals/journeys/*.eval.yaml'], { cwd: repoRoot, posix: true }).sort()

// contents/docs/a/b.eval.yaml → docs/a/b, and contents/docs/a/index.eval.yaml → docs/a,
// the same slug Gatsby gives b.mdx and a/index.mdx.
export function pageForEvalFile(path: string): string | null {
    if (!path.startsWith('contents/')) return null
    return path
        .replace(/^contents\//, '')
        .replace(/\.eval\.yaml$/, '')
        .replace(/\/index$/, '')
}

export function pageSourceFile(page: string): string | null {
    const candidates = ['.mdx', '.md', '/index.mdx', '/index.md'].map((ending) => `contents/${page}${ending}`)
    return candidates.find((candidate) => existsSync(join(repoRoot, candidate))) ?? null
}

// A changed docs source file → the page it builds, or null if it isn't a page.
export function pageForSourceFile(path: string): string | null {
    const match = path.match(/^contents\/(.+?)(?:\/index)?\.mdx?$/)
    return match && !path.includes('/_snippets/') ? match[1] : null
}

const isStringList = (value: unknown): value is string[] =>
    Array.isArray(value) && value.every((item) => typeof item === 'string')

export function parseEvalFile(
    path: string,
    raw: unknown,
    shared: Shared,
    pageExists: (page: string) => boolean = (page) => pageSourceFile(page) !== null
): { file: EvalFile | null; problems: Problem[] } {
    const problems: Problem[] = []
    const problem = (message: string) => problems.push({ path, message })
    const journey = path.startsWith('evals/journeys/')
    const page = pageForEvalFile(path)

    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        problem('expected a YAML mapping')
        return { file: null, problems }
    }
    const spec = raw as Record<string, unknown>
    for (const key of Object.keys(spec)) if (!fileKeys.includes(key)) problem(`unknown key "${key}"`)
    if (spec.version !== 1) problem('version must be 1')
    if (!journey && !page) problem('eval files live beside a page under contents/, or in evals/journeys/')
    if (page && !pageExists(page)) problem(`no page for this eval file: expected contents/${page}.mdx or .md`)

    const status = (spec.status ?? 'active') as Status
    if (!statuses.includes(status)) problem(`status must be one of ${statuses.join(', ')}`)
    const owner = spec.owner ?? null
    if (owner !== null && typeof owner !== 'string') problem('owner must be a team slug')
    if (journey && !owner) problem('journeys need an owner')
    const tags = spec.tags ?? []
    if (!isStringList(tags)) problem('tags must be a list of strings')

    const filePages = spec.pages ?? []
    if (!isStringList(filePages)) problem('pages must be a list of docs paths')
    else if (!journey && filePages.length > 0)
        problem('file-level pages is for journeys; list pages on the case instead')
    else if (journey && filePages.length === 0) problem('journeys need at least one page in pages')
    const checkPages = (list: string[], where: string) => {
        for (const listed of list) {
            if (!/^docs\/[a-z0-9/_-]+$/.test(listed))
                problem(`${where}: "${listed}" should look like docs/product-analytics/identify`)
            else if (!pageExists(listed)) problem(`${where}: no page at contents/${listed}.mdx or .md`)
        }
    }
    if (isStringList(filePages)) checkPages(filePages, 'pages')

    const cases: EvalCase[] = []
    if (!Array.isArray(spec.cases) || spec.cases.length === 0) problem('cases must be a non-empty list')
    const seen = new Set<string>()
    for (const [index, rawCase] of (Array.isArray(spec.cases) ? spec.cases : []).entries()) {
        if (!rawCase || typeof rawCase !== 'object') {
            problem(`cases[${index}] must be a mapping`)
            continue
        }
        const c = rawCase as Record<string, unknown>
        const id = typeof c.id === 'string' ? c.id : `cases[${index}]`
        const where = `case ${id}`
        for (const key of Object.keys(c)) if (!caseKeys.includes(key)) problem(`${where}: unknown key "${key}"`)
        if (typeof c.id !== 'string' || !kebab.test(c.id)) problem(`${where}: id must be kebab-case`)
        if (seen.has(id)) problem(`${where}: duplicate id`)
        seen.add(id)

        if (typeof c.task !== 'string' || c.task.trim() === '') problem(`${where}: task is required`)
        const task = typeof c.task === 'string' ? c.task.trim() : ''

        let fixture: string | null = null
        if (c.workspace !== undefined) {
            const workspace = c.workspace as Record<string, unknown> | null
            if (!workspace || typeof workspace.fixture !== 'string') problem(`${where}: workspace needs a fixture`)
            else if (!shared.fixtures[workspace.fixture])
                problem(`${where}: no fixture "${workspace.fixture}" in evals/fixtures.yaml`)
            else fixture = workspace.fixture
        }

        const casePages = c.pages ?? []
        if (!isStringList(casePages)) problem(`${where}: pages must be a list of docs paths`)
        else {
            checkPages(casePages, where)
            const total = new Set([
                ...(page ? [page] : []),
                ...(isStringList(filePages) ? filePages : []),
                ...casePages,
            ])
            if (total.size > maxPagesPerCase)
                problem(
                    `${where}: ${total.size} pages; the limit is ${maxPagesPerCase}, move bigger cases to evals/journeys/`
                )
        }

        let caseArms: Arm[] | null = null
        if (c.arms !== undefined) {
            if (!isStringList(c.arms) || c.arms.length === 0) problem(`${where}: arms must be a non-empty list`)
            else {
                for (const arm of c.arms)
                    if (!(arms as readonly string[]).includes(arm)) problem(`${where}: unknown arm "${arm}"`)
                caseArms = c.arms as Arm[]
            }
        }

        const use: string[] = []
        const criteria: Record<string, string> = {}
        if (!c.criteria || typeof c.criteria !== 'object' || Array.isArray(c.criteria))
            problem(`${where}: criteria is required`)
        else {
            for (const [name, value] of Object.entries(c.criteria as Record<string, unknown>)) {
                if (name === 'use') {
                    if (!isStringList(value)) problem(`${where}: criteria.use must be a list of names`)
                    else
                        for (const shared_name of value) {
                            if (!shared.criteria[shared_name])
                                problem(`${where}: no shared criterion "${shared_name}" in evals/criteria.yaml`)
                            else use.push(shared_name)
                        }
                } else if (!kebab.test(name)) problem(`${where}: criterion name "${name}" must be kebab-case`)
                else if (typeof value !== 'string' || value.trim() === '')
                    problem(`${where}: criterion "${name}" needs a rubric`)
                else if (use.includes(name) || shared.criteria[name])
                    problem(`${where}: "${name}" is a shared criterion; list it in use instead`)
                else criteria[name] = value.trim()
            }
            if (use.length + Object.keys(criteria).length === 0) problem(`${where}: needs at least one criterion`)
        }

        const usesFolder = [task, ...Object.values(criteria), ...use.map((name) => shared.criteria[name] ?? '')].some(
            (text) => text.includes('{folder}')
        )
        if (usesFolder && !fixture) problem(`${where}: {folder} needs a workspace fixture`)

        cases.push({
            id,
            fixture,
            pages: isStringList(casePages) ? casePages : [],
            task,
            arms: caseArms,
            use,
            criteria,
        })
    }

    const file: EvalFile = {
        path,
        page,
        journey,
        owner: typeof owner === 'string' ? owner : null,
        tags: isStringList(tags) ? tags : [],
        status,
        pages: isStringList(filePages) ? filePages : [],
        cases,
    }
    return { file: problems.length === 0 ? file : null, problems }
}

export function loadEvalFiles(shared: Shared = loadShared()): { files: EvalFile[]; problems: Problem[] } {
    const files: EvalFile[] = []
    const problems: Problem[] = []
    for (const path of evalFilePaths()) {
        let raw: unknown
        try {
            raw = readYaml(path)
        } catch (error) {
            problems.push({
                path,
                message: `not valid YAML: ${error instanceof Error ? error.message : String(error)}`,
            })
            continue
        }
        const result = parseEvalFile(path, raw, shared)
        problems.push(...result.problems)
        if (result.file) files.push(result.file)
    }
    return { files, problems }
}

// Every page a case reads, the file's own page first.
export const casePages = (file: EvalFile, evalCase: EvalCase) => [
    ...new Set([...(file.page ? [file.page] : []), ...file.pages, ...evalCase.pages]),
]

// page → the cases that read it, from every eval file, wherever the case lives.
export function pageIndex(files: EvalFile[]): Map<string, { file: EvalFile; evalCase: EvalCase }[]> {
    const index = new Map<string, { file: EvalFile; evalCase: EvalCase }[]>()
    for (const file of files)
        for (const evalCase of file.cases)
            for (const page of casePages(file, evalCase))
                index.set(page, [...(index.get(page) ?? []), { file, evalCase }])
    return index
}
