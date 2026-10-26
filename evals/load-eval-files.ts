import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob'
import { parse } from 'yaml'

// Finds, parses and checks eval files. Nothing in here knows about Gauge.

export const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

export const arms = ['baseline', 'link', 'inline'] as const
export type Arm = (typeof arms)[number]
export const statuses = ['active', 'draft', 'skipped'] as const
export type Status = (typeof statuses)[number]
export const suites = ['smoke', 'deep'] as const
export type Suite = (typeof suites)[number]

export type Codebase = { repo: string; ref?: string; folder: string; source?: string }
export type Harness = { id: string; gauge: string; models: string[]; verified: boolean }
export type RunConfig = { harnesses: Harness[]; defaultArms: Arm[]; samples: number }
export type Shared = { criteria: Record<string, string>; codebases: Record<string, Codebase>; runConfig: RunConfig }

export type EvalCheck = {
    id: string
    description: string | null
    codebase: string | null // codebase_to_test: a key in shared/codebases-to-test.yaml; null when answer-only
    pages: string[]
    prompt: string
    suite: Suite
    arms: Arm[] | null
    shared: string[] // names from shared/criteria.yaml
    rubrics: Record<string, string>
}

export type EvalFile = {
    path: string // repo-relative
    page: string | null // docs path such as docs/product-analytics/identify; null for a journey
    journey: boolean
    owner: string | null
    tags: string[]
    status: Status
    pages: string[] // journeys only: the pages the file tests
    checks: EvalCheck[]
}

export type Problem = { path: string; message: string }

const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
export const maxPagesPerCheck = 4
const fileKeys = ['owner', 'tags', 'status', 'pages', 'checks']
const checkKeys = ['id', 'description', 'codebase_to_test', 'pages', 'prompt', 'suite', 'arms', 'criteria']
const criteriaKeys = ['shared', 'rubrics']

const readYaml = (path: string) => parse(readFileSync(join(repoRoot, path), 'utf8'))

export function loadShared(): Shared {
    const runConfig = readYaml('evals/shared/run-config.yml') as RunConfig
    return {
        criteria: readYaml('evals/shared/criteria.yaml') as Record<string, string>,
        codebases: readYaml('evals/shared/codebases-to-test.yaml') as Record<string, Codebase>,
        runConfig: {
            ...runConfig,
            harnesses: runConfig.harnesses.map((h) => ({ ...h, verified: h.verified === true })),
        },
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
        problem('file-level pages is for journeys; list pages on the check instead')
    else if (journey && filePages.length === 0) problem('journeys need at least one page in pages')
    const validatePages = (list: string[], where: string) => {
        for (const listed of list) {
            if (!/^docs\/[a-z0-9/_-]+$/.test(listed))
                problem(`${where}: "${listed}" should look like docs/product-analytics/identify`)
            else if (!pageExists(listed)) problem(`${where}: no page at contents/${listed}.mdx or .md`)
        }
    }
    if (isStringList(filePages)) validatePages(filePages, 'pages')

    const checks: EvalCheck[] = []
    if (!Array.isArray(spec.checks) || spec.checks.length === 0) problem('checks must be a non-empty list')
    const seen = new Set<string>()
    for (const [index, rawCheck] of (Array.isArray(spec.checks) ? spec.checks : []).entries()) {
        if (!rawCheck || typeof rawCheck !== 'object') {
            problem(`checks[${index}] must be a mapping`)
            continue
        }
        const c = rawCheck as Record<string, unknown>
        const id = typeof c.id === 'string' ? c.id : `checks[${index}]`
        const where = `check ${id}`
        for (const key of Object.keys(c)) if (!checkKeys.includes(key)) problem(`${where}: unknown key "${key}"`)
        if (typeof c.id !== 'string' || !kebab.test(c.id)) problem(`${where}: id must be kebab-case`)
        if (seen.has(id)) problem(`${where}: duplicate id`)
        seen.add(id)

        if (typeof c.prompt !== 'string' || c.prompt.trim() === '') problem(`${where}: prompt is required`)
        const prompt = typeof c.prompt === 'string' ? c.prompt.trim() : ''

        if (c.description !== undefined && (typeof c.description !== 'string' || c.description.trim() === ''))
            problem(`${where}: description must be a sentence or two`)
        const description =
            typeof c.description === 'string' && c.description.trim() !== '' ? c.description.trim() : null

        const suite = (c.suite ?? 'smoke') as Suite
        if (!suites.includes(suite)) problem(`${where}: suite must be one of ${suites.join(', ')}`)

        let codebase: string | null = null
        if (c.codebase_to_test !== undefined) {
            if (typeof c.codebase_to_test !== 'string')
                problem(`${where}: codebase_to_test must be a name from evals/shared/codebases-to-test.yaml`)
            else if (!shared.codebases[c.codebase_to_test])
                problem(`${where}: no codebase "${c.codebase_to_test}" in evals/shared/codebases-to-test.yaml`)
            else codebase = c.codebase_to_test
        }
        if (codebase && !description)
            problem(`${where}: code checks need a description: what it tests and what the prompt leaves out`)

        const listedPages = c.pages ?? []
        if (!isStringList(listedPages)) problem(`${where}: pages must be a list of docs paths`)
        else {
            validatePages(listedPages, where)
            const total = new Set([
                ...(page ? [page] : []),
                ...(isStringList(filePages) ? filePages : []),
                ...listedPages,
            ])
            if (total.size > maxPagesPerCheck)
                problem(
                    `${where}: ${total.size} pages; the limit is ${maxPagesPerCheck}, move bigger checks to evals/journeys/`
                )
        }

        let checkArms: Arm[] | null = null
        if (c.arms !== undefined) {
            if (!isStringList(c.arms) || c.arms.length === 0) problem(`${where}: arms must be a non-empty list`)
            else {
                for (const arm of c.arms)
                    if (!(arms as readonly string[]).includes(arm)) problem(`${where}: unknown arm "${arm}"`)
                checkArms = c.arms as Arm[]
            }
        }

        // criteria has two kinds, each under its own key: shared rubrics by name, and
        // this check's own rubrics.
        const sharedNames: string[] = []
        const rubrics: Record<string, string> = {}
        if (!c.criteria || typeof c.criteria !== 'object' || Array.isArray(c.criteria))
            problem(`${where}: criteria is required`)
        else {
            const criteria = c.criteria as Record<string, unknown>
            for (const key of Object.keys(criteria))
                if (!criteriaKeys.includes(key))
                    problem(`${where}: unknown key "criteria.${key}"; use ${criteriaKeys.join(' or ')}`)

            if (criteria.shared !== undefined) {
                if (!isStringList(criteria.shared)) problem(`${where}: criteria.shared must be a list of names`)
                else
                    for (const name of criteria.shared) {
                        if (!shared.criteria[name])
                            problem(`${where}: no shared criterion "${name}" in evals/shared/criteria.yaml`)
                        else sharedNames.push(name)
                    }
            }

            if (criteria.rubrics !== undefined) {
                if (!criteria.rubrics || typeof criteria.rubrics !== 'object' || Array.isArray(criteria.rubrics))
                    problem(`${where}: criteria.rubrics must be name: rubric pairs`)
                else
                    for (const [name, value] of Object.entries(criteria.rubrics as Record<string, unknown>)) {
                        if (!kebab.test(name)) problem(`${where}: rubric name "${name}" must be kebab-case`)
                        else if (typeof value !== 'string' || value.trim() === '')
                            problem(`${where}: rubric "${name}" needs text`)
                        else if (shared.criteria[name])
                            problem(`${where}: "${name}" is a shared criterion; list it in criteria.shared instead`)
                        else rubrics[name] = value.trim()
                    }
            }

            if (sharedNames.length + Object.keys(rubrics).length === 0)
                problem(`${where}: criteria needs at least one shared criterion or rubric`)
        }

        const usesFolder = [
            prompt,
            ...Object.values(rubrics),
            ...sharedNames.map((name) => shared.criteria[name] ?? ''),
        ].some((text) => text.includes('{folder}'))
        if (usesFolder && !codebase) problem(`${where}: {folder} needs a codebase_to_test`)

        checks.push({
            id,
            description,
            codebase,
            pages: isStringList(listedPages) ? listedPages : [],
            prompt,
            suite,
            arms: checkArms,
            shared: sharedNames,
            rubrics,
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
        checks,
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

// Every page a check reads, the file's own page first.
export const checkPages = (file: EvalFile, check: EvalCheck) => [
    ...new Set([...(file.page ? [file.page] : []), ...file.pages, ...check.pages]),
]

// page → the checks that read it, from every eval file, wherever the check lives.
export function pageIndex(files: EvalFile[]): Map<string, { file: EvalFile; check: EvalCheck }[]> {
    const index = new Map<string, { file: EvalFile; check: EvalCheck }[]>()
    for (const file of files)
        for (const check of file.checks)
            for (const page of checkPages(file, check)) index.set(page, [...(index.get(page) ?? []), { file, check }])
    return index
}
