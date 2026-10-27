import { createHash } from 'node:crypto'
import {
    checkPages,
    type EvalCheck,
    type EvalFile,
    type Codebase,
    type Harness,
    type Shared,
} from './load-eval-files.ts'

// Builds what gets sent to the agent: one prompt per check, with the docs the check
// appends and the check's criteria in order. Knows nothing about Gauge;
// gauge/send-to-gauge.ts turns each one into a Gauge case.

export type CheckPrompt = {
    key: string // unique, lowercase-kebab, ≤ 64 chars
    file: string
    checkId: string
    pages: string[]
    codebase: (Codebase & { name: string }) | null
    harnesses: Harness[]
    prompt: string
    criteria: { name: string; rubric: string }[]
    append: { link: boolean; content: boolean }
    mcp: { name: string; ref: string | null } | null // ref is the Gauge handle@version
    skill: boolean
}

export type PageText = (page: string) => Promise<string>

export const markdownUrl = (baseUrl: string, page: string) => `${baseUrl.replace(/\/$/, '')}/${page}.md`

// Fetches each page's built Markdown once. append_docs_link points at the same URL,
// so a link and a content check see the same words.
export function fetchPageText(baseUrl: string): PageText {
    const cache = new Map<string, Promise<string>>()
    return (page) => {
        if (!cache.has(page)) {
            cache.set(
                page,
                fetch(markdownUrl(baseUrl, page)).then(async (response) => {
                    if (!response.ok) throw new Error(`${markdownUrl(baseUrl, page)} returned ${response.status}`)
                    return response.text()
                })
            )
        }
        return cache.get(page)!
    }
}

const slug = (page: string) => page.replace(/^docs\//, '').replace(/[^a-z0-9]+/g, '-')
const shortHash = (text: string) => createHash('sha256').update(text).digest('hex').slice(0, 12)

// Gauge needs a unique case key of at most 64 characters.
export function checkKey(file: EvalFile, check: EvalCheck): string {
    const owner = file.page
        ? slug(file.page)
        : `e2e-${slug(file.path.replace(/^evals\/e2e-evals\//, '').replace(/\.eval\.yaml$/, ''))}`
    const key = `${owner}-${check.id}`
    return key.length <= 64 ? key : `${key.slice(0, 51).replace(/-$/, '')}-${shortHash(key)}`
}

const relyOnIt = 'and rely on it rather than on what you already know'

// The prompt as written, then the docs the check appends: the link first, then the
// content. The wording matches the old link and inline arms, so results compare.
export async function appendDocs(
    prompt: string,
    append: { link: boolean; content: boolean },
    pages: string[],
    baseUrl: string,
    pageText: PageText
): Promise<string> {
    const lines = [prompt]
    const several = pages.length > 1
    if (append.link) {
        lines.push('', `Follow ${several ? 'these guides' : 'this guide'} ${relyOnIt}:`)
        lines.push(...pages.map((page) => markdownUrl(baseUrl, page)))
    }
    if (append.content) {
        lines.push('', `Follow the ${several ? 'guides' : 'guide'} below ${relyOnIt}.`)
        for (const page of pages)
            lines.push(
                '',
                `<docs-page url="${markdownUrl(baseUrl, page)}">`,
                (await pageText(page)).trimEnd(),
                '</docs-page>'
            )
    }
    return lines.join('\n')
}

export type Selection = { file: EvalFile; check: EvalCheck }

export async function buildPrompts(
    selections: Selection[],
    harnesses: Harness[],
    shared: Shared,
    baseUrl: string,
    pageText: PageText
): Promise<CheckPrompt[]> {
    const built: CheckPrompt[] = []
    for (const { file, check } of selections) {
        const codebase = check.codebase ? { name: check.codebase, ...shared.codebases[check.codebase] } : null
        const fill = (text: string) => (codebase ? text.replaceAll('{folder}', codebase.folder) : text)
        const pages = checkPages(file, check)
        const append = { link: check.appendDocsLink, content: check.appendDocsContent }
        const criteria = [
            ...check.shared.map((name) => ({ name, rubric: fill(shared.criteria[name].trim()) })),
            ...Object.entries(check.rubrics).map(([name, rubric]) => ({ name, rubric: fill(rubric) })),
        ]
        built.push({
            key: checkKey(file, check),
            file: file.path,
            checkId: check.id,
            pages,
            codebase,
            harnesses,
            prompt: await appendDocs(fill(check.prompt), append, pages, baseUrl, pageText),
            criteria,
            append,
            mcp: check.attachMcp ? { name: check.attachMcp, ref: shared.runConfig.mcp[check.attachMcp] ?? null } : null,
            skill: check.attachSkill,
        })
    }
    return built
}
