import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { globSync } from 'glob'
import { parse } from 'yaml'

// Finds, parses and checks eval files. Nothing in here knows about Gauge.

export const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')

export const statuses = ['active', 'draft', 'skipped'] as const
export type Status = (typeof statuses)[number]
export const suites = ['smoke', 'deep'] as const
export type Suite = (typeof suites)[number]

export type Codebase = { repo: string; ref?: string; folder: string; source?: string }
export type Harness = { id: string; gauge: string; models: string[]; verified: boolean }
export type RunConfig = {
    harnesses: Harness[]
    samples: number
    mcp: Record<string, string | null> // name → Gauge handle@version; null until one is pinned
    skills: { enabled: boolean }
}
export type Shared = { criteria: Record<string, string>; codebases: Record<string, Codebase>; runConfig: RunConfig }

export type EvalCheck = {
    id: string
    description: string | null
    codebase: string | null // codebase_to_test: a key in shared/codebases-to-test.yaml; null when answer-only
    pages: string[]
    prompt: string
    suite: Suite
    appendDocsLink: boolean // add each page's .md URL to the end of the prompt
    appendDocsContent: boolean // add each page's built text to the end of the prompt
    attachMcp: string | null // a name in run-config.yml's mcp map
    attachSkill: boolean // a placeholder: skill checks never run yet
    shared: string[] // names from shared/criteria.yaml
    rubrics: Record<string, string>
}

export type EvalFile = {
    path: string // repo-relative
    page: string | null // docs path such as docs/product-analytics/identify; null in evals/e2e-evals/
    e2e: boolean // in evals/e2e-evals/ (any subfolder): spans several pages, and no single page owns it
    owner: string | null
    tags: string[]
    status: Status
    pages: string[] // evals/e2e-evals/ only: the pages every check in the file reads
    checks: EvalCheck[]
}

export type Problem = { path: string; message: string }

const kebab = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
// A check beside a page reads a few pages; a bigger one belongs in evals/e2e-evals/.
export const maxPagesPerCheck = { page: 4, e2e: 8 }
const fileKeys = ['owner', 'tags', 'status', 'pages', 'checks']
const checkKeys = [
    'id',
    'description',
    'codebase_to_test',
    'pages',
    'prompt',
    'suite',
    'append_docs_link',
    'append_docs_content',
    'attach_mcp',
    'attach_skill',
    'criteria',
]
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
            mcp: runConfig.mcp ?? {},
            skills: { enabled: runConfig.skills?.enabled === true },
        },
    }
}

export const evalFilePaths = () =>
    globSync(['contents/**/*.eval.yaml', 'evals/e2e-evals/**/*.eval.yaml'], { cwd: repoRoot, posix: true }).sort()

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

// Every repo file a page imports through a relative path, followed transitively, as
// repo-relative paths. Imports from packages or from the posthog repo are left out:
// --changed can't see those.
const importCache = new Map<string, Set<string>>()
export function localImports(sourceFile: string): Set<string> {
    const cached = importCache.get(sourceFile)
    if (cached) return cached
    const found = new Set<string>()
    importCache.set(sourceFile, found)
    const text = readFileSync(join(repoRoot, sourceFile), 'utf8')
    for (const [, spec] of text.matchAll(/\bfrom\s+['"](\.{1,2}\/[^'"]+)['"]/g)) {
        const base = join(dirname(sourceFile), spec)
        const target = ['', '.mdx', '.md', '.tsx', '.ts', '.jsx', '.js', '/index.tsx', '/index.ts', '/index.js']
            .map((ending) => `${base}${ending}`)
            .find((candidate) => existsSync(join(repoRoot, candidate)) && /\.(mdx?|[jt]sx?)$/.test(candidate))
        if (!target || found.has(target)) continue
        found.add(target)
        for (const nested of localImports(target)) found.add(nested)
    }
    return found
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
    const e2e = path.startsWith('evals/e2e-evals/')
    const page = pageForEvalFile(path)

    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
        problem('expected a YAML mapping')
        return { file: null, problems }
    }
    const spec = raw as Record<string, unknown>
    for (const key of Object.keys(spec)) if (!fileKeys.includes(key)) problem(`unknown key "${key}"`)
    if (!e2e && !page) problem('eval files live beside a page under contents/, or in evals/e2e-evals/')
    if (page && !pageExists(page)) problem(`no page for this eval file: expected contents/${page}.mdx or .md`)

    const status = (spec.status ?? 'active') as Status
    if (!statuses.includes(status)) problem(`status must be one of ${statuses.join(', ')}`)
    const owner = spec.owner ?? null
    if (owner !== null && typeof owner !== 'string') problem('owner must be a team slug')
    if (e2e && !owner) problem('files in evals/e2e-evals/ need an owner')
    const tags = spec.tags ?? []
    if (!isStringList(tags)) problem('tags must be a list of strings')

    const filePages = spec.pages ?? []
    if (!isStringList(filePages)) problem('pages must be a list of docs paths')
    else if (!e2e && filePages.length > 0)
        problem('file-level pages is for evals/e2e-evals/; list pages on the check instead')
    else if (e2e && filePages.length === 0) problem('files in evals/e2e-evals/ need at least one page in pages')
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
        for (const key of Object.keys(c)) {
            if (key === 'arms')
                problem(
                    `${where}: arms is gone; use append_docs_link, append_docs_content, attach_mcp or attach_skill, and a separate check for each setup`
                )
            else if (!checkKeys.includes(key)) problem(`${where}: unknown key "${key}"`)
        }
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
            const limit = e2e ? maxPagesPerCheck.e2e : maxPagesPerCheck.page
            if (total.size > limit)
                problem(
                    `${where}: ${total.size} pages; the limit is ${limit}${
                        e2e ? '' : ', move bigger checks to evals/e2e-evals/'
                    }`
                )
        }

        // What the agent gets on top of the prompt. Any of these combine; a check with
        // none of them gets the task only.
        const flag = (key: string) => {
            if (c[key] !== undefined && c[key] !== true) problem(`${where}: ${key} must be true, or left out`)
            return c[key] === true
        }
        const appendDocsLink = flag('append_docs_link')
        const appendDocsContent = flag('append_docs_content')
        const attachSkill = flag('attach_skill')
        let attachMcp: string | null = null
        if (c.attach_mcp !== undefined) {
            const names = Object.keys(shared.runConfig.mcp)
            if (typeof c.attach_mcp !== 'string' || !names.includes(c.attach_mcp))
                problem(
                    `${where}: attach_mcp must be one of ${names.join(', ')} (the mcp map in shared/run-config.yml)`
                )
            else attachMcp = c.attach_mcp
        }
        const pageCount =
            (page ? 1 : 0) +
            (isStringList(filePages) ? filePages.length : 0) +
            (isStringList(listedPages) ? listedPages.length : 0)
        if ((appendDocsLink || appendDocsContent || attachSkill) && pageCount === 0)
            problem(`${where}: append_docs_* and attach_skill need a page: the file's own page, or pages`)

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
            appendDocsLink,
            appendDocsContent,
            attachMcp,
            attachSkill,
            shared: sharedNames,
            rubrics,
        })
    }

    const file: EvalFile = {
        path,
        page,
        e2e,
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
