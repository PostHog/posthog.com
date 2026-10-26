import { createHash } from 'node:crypto'
import {
    checkPages,
    type Arm,
    type EvalCheck,
    type EvalFile,
    type Codebase,
    type Harness,
    type Shared,
} from './load-eval-files.ts'

// Builds what gets sent to the agent: one prompt per check × arm, with the check's
// criteria in order. Knows nothing about Gauge; gauge/send-to-gauge.ts turns each one
// into a Gauge case.

export type CheckPrompt = {
    key: string // unique, lowercase-kebab, ≤ 64 chars
    file: string
    checkId: string
    arm: Arm
    pages: string[]
    codebase: (Codebase & { name: string }) | null
    harnesses: Harness[]
    prompt: string
    criteria: { name: string; rubric: string }[]
}

export type PageText = (page: string) => Promise<string>

export const markdownUrl = (baseUrl: string, page: string) => `${baseUrl.replace(/\/$/, '')}/${page}.md`

// Fetches each page's built Markdown once. The link arm points at the same URL,
// so link and inline see the same words.
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
export function checkKey(file: EvalFile, check: EvalCheck, arm: Arm): string {
    const owner = file.page ? slug(file.page) : `journey-${file.path.replace(/^.*\//, '').replace(/\.eval\.yaml$/, '')}`
    const key = `${owner}-${check.id}-${arm}`
    return key.length <= 64 ? key : `${key.slice(0, 51).replace(/-$/, '')}-${shortHash(key)}`
}

const relyOnIt = 'and rely on it rather than on what you already know'

// baseline sends the prompt as written; link and inline add the page.
export async function armPrompt(
    prompt: string,
    arm: Arm,
    pages: string[],
    baseUrl: string,
    pageText: PageText
): Promise<string> {
    const lines = [prompt]
    const several = pages.length > 1
    if (arm === 'link') {
        lines.push('', `Follow ${several ? 'these guides' : 'this guide'} ${relyOnIt}:`)
        lines.push(...pages.map((page) => markdownUrl(baseUrl, page)))
    }
    if (arm === 'inline') {
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

export type Selection = { file: EvalFile; check: EvalCheck; arms: Arm[] }

export async function buildPrompts(
    selections: Selection[],
    harnesses: Harness[],
    shared: Shared,
    baseUrl: string,
    pageText: PageText
): Promise<CheckPrompt[]> {
    const built: CheckPrompt[] = []
    for (const { file, check, arms } of selections) {
        const codebase = check.codebase ? { name: check.codebase, ...shared.codebases[check.codebase] } : null
        const fill = (text: string) => (codebase ? text.replaceAll('{folder}', codebase.folder) : text)
        const pages = checkPages(file, check)
        const criteria = [
            ...check.shared.map((name) => ({ name, rubric: fill(shared.criteria[name].trim()) })),
            ...Object.entries(check.rubrics).map(([name, rubric]) => ({ name, rubric: fill(rubric) })),
        ]
        for (const arm of arms)
            built.push({
                key: checkKey(file, check, arm),
                file: file.path,
                checkId: check.id,
                arm,
                pages,
                codebase,
                harnesses,
                prompt: await armPrompt(fill(check.prompt), arm, pages, baseUrl, pageText),
                criteria,
            })
    }
    return built
}
