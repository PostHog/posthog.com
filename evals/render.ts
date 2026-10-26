import { createHash } from 'node:crypto'
import { casePages, type Arm, type EvalCase, type EvalFile, type Fixture, type Harness, type Shared } from './spec.ts'

// Turns eval files into rendered cases: one per case × arm, with every selected
// harness on each. Still harness-neutral; adapters/gauge.ts does the Gauge part.

export type RenderedCase = {
    key: string // unique, lowercase-kebab, ≤ 64 chars
    file: string
    caseId: string
    arm: Arm
    pages: string[]
    fixture: (Fixture & { name: string }) | null
    harnesses: Harness[]
    prompt: string
    criteria: { name: string; rubric: string }[]
    skillRefs: string[]
}

export type PageText = (page: string) => Promise<string>

export const pageUrl = (baseUrl: string, page: string) => `${baseUrl.replace(/\/$/, '')}/${page}`
export const markdownUrl = (baseUrl: string, page: string) => `${pageUrl(baseUrl, page)}.md`

// Fetches each page's built Markdown once. The link arm points at the same URL,
// so link, inline and skill all see the same words.
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
const shortHash = (text: string, length = 12) => createHash('sha256').update(text).digest('hex').slice(0, length)

export const skillName = (page: string) => `posthog-docs-${slug(page)}`.slice(0, 64).replace(/-$/, '')
export const skillVersion = (pageText: string) => shortHash(pageText)

// The skill holds only the page, so the skill arm differs from inline in how the
// text arrives and nothing else.
export function renderSkill(page: string, pageText: string): string {
    const title = pageText.match(/^# (.+)$/m)?.[1] ?? page
    return [
        '---',
        `name: ${skillName(page)}`,
        `description: PostHog's "${title}" page from posthog.com. Use it when working on this with PostHog.`,
        '---',
        '',
        pageText,
    ].join('\n')
}

export function caseKey(file: EvalFile, evalCase: EvalCase, arm: Arm): string {
    const owner = file.page ? slug(file.page) : `journey-${file.path.replace(/^.*\//, '').replace(/\.eval\.yaml$/, '')}`
    const key = `${owner}-${evalCase.id}-${arm}`
    return key.length <= 64 ? key : `${key.slice(0, 51).replace(/-$/, '')}-${shortHash(key)}`
}

// Markers around pasted pages, so read-check.ts can drop them before looking for fetches.
export const inlineOpen = (url: string) => `<docs-page url="${url}">`
export const inlineClose = '</docs-page>'
const relyOnIt = 'and rely on it rather than on what you already know'

export async function renderPrompt(
    task: string,
    arm: Arm,
    pages: string[],
    baseUrl: string,
    pageText: PageText
): Promise<string> {
    const lines = [task]
    const several = pages.length > 1
    if (arm === 'link') {
        lines.push('', `Follow ${several ? 'these guides' : 'this guide'} ${relyOnIt}:`)
        lines.push(...pages.map((page) => markdownUrl(baseUrl, page)))
    }
    if (arm === 'inline') {
        lines.push('', `Follow the ${several ? 'guides' : 'guide'} below ${relyOnIt}.`)
        for (const page of pages) {
            lines.push('', inlineOpen(markdownUrl(baseUrl, page)), (await pageText(page)).trimEnd(), inlineClose)
        }
    }
    if (arm === 'skill') {
        const names = pages.map(skillName).join(', ')
        lines.push('', `Follow the guide${several ? 's' : ''} in the ${names} skill${several ? 's' : ''} ${relyOnIt}.`)
    }
    return lines.join('\n')
}

export type Selection = { file: EvalFile; evalCase: EvalCase; arms: Arm[] }

export async function renderCases(
    selections: Selection[],
    harnesses: Harness[],
    shared: Shared,
    baseUrl: string,
    pageText: PageText
): Promise<RenderedCase[]> {
    const rendered: RenderedCase[] = []
    for (const { file, evalCase, arms } of selections) {
        const fixture = evalCase.fixture ? { name: evalCase.fixture, ...shared.fixtures[evalCase.fixture] } : null
        const fill = (text: string) => (fixture ? text.replaceAll('{folder}', fixture.folder) : text)
        const pages = casePages(file, evalCase)
        const criteria = [
            ...evalCase.use.map((name) => ({ name, rubric: fill(shared.criteria[name].trim()) })),
            ...Object.entries(evalCase.criteria).map(([name, rubric]) => ({ name, rubric: fill(rubric) })),
        ]
        for (const arm of arms) {
            const skillRefs =
                arm === 'skill'
                    ? await Promise.all(
                          pages.map(async (page) => `${skillName(page)}@${skillVersion(await pageText(page))}`)
                      )
                    : []
            rendered.push({
                key: caseKey(file, evalCase, arm),
                file: file.path,
                caseId: evalCase.id,
                arm,
                pages,
                fixture,
                harnesses,
                prompt: await renderPrompt(fill(evalCase.task), arm, pages, baseUrl, pageText),
                criteria,
                skillRefs,
            })
        }
    }
    return rendered
}
