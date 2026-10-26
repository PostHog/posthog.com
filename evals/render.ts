import { createHash } from 'node:crypto'
import { assertionName, assertionRubric } from './assertions.ts'
import { checkPages, type Arm, type EvalCheck, type EvalFile, type Fixture, type Harness, type Shared } from './spec.ts'

// Turns eval files into rendered checks: one per check × arm, with every selected
// harness on each. Still harness-neutral; adapters/gauge.ts turns each one into a
// Gauge case.

export type RenderedCheck = {
    key: string // unique, lowercase-kebab, ≤ 64 chars
    file: string
    checkId: string
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

export function checkKey(file: EvalFile, check: EvalCheck, arm: Arm): string {
    const owner = file.page ? slug(file.page) : `journey-${file.path.replace(/^.*\//, '').replace(/\.eval\.yaml$/, '')}`
    const key = `${owner}-${check.id}-${arm}`
    return key.length <= 64 ? key : `${key.slice(0, 51).replace(/-$/, '')}-${shortHash(key)}`
}

// Markers around pasted pages, so docs-read.ts can drop them before looking for fetches.
export const inlineOpen = (url: string) => `<docs-page url="${url}">`
export const inlineClose = '</docs-page>'
const relyOnIt = 'and rely on it rather than on what you already know'

// The baseline arm sends the prompt as written; every other arm adds a tail.
export async function renderPrompt(
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

export type Selection = { file: EvalFile; check: EvalCheck; arms: Arm[] }

export async function renderChecks(
    selections: Selection[],
    harnesses: Harness[],
    shared: Shared,
    baseUrl: string,
    pageText: PageText
): Promise<RenderedCheck[]> {
    const rendered: RenderedCheck[] = []
    for (const { file, check, arms } of selections) {
        const fixture = check.fixture ? { name: check.fixture, ...shared.fixtures[check.fixture] } : null
        const fill = (text: string) => (fixture ? text.replaceAll('{folder}', fixture.folder) : text)
        const pages = checkPages(file, check)
        const criteria = [
            ...check.shared.map((name) => ({ name, rubric: fill(shared.criteria[name].trim()) })),
            ...check.assertions.map((assertion) => ({
                name: assertionName(assertion),
                rubric: fill(assertionRubric(assertion)),
            })),
            ...Object.entries(check.rubrics).map(([name, rubric]) => ({ name, rubric: fill(rubric) })),
        ]
        for (const arm of arms) {
            const skillRefs =
                arm === 'skill'
                    ? await Promise.all(
                          pages.map(async (page) => `${skillName(page)}@${skillVersion(await pageText(page))}`)
                      )
                    : []
            rendered.push({
                key: checkKey(file, check, arm),
                file: file.path,
                checkId: check.id,
                arm,
                pages,
                fixture,
                harnesses,
                prompt: await renderPrompt(fill(check.prompt), arm, pages, baseUrl, pageText),
                criteria,
                skillRefs,
            })
        }
    }
    return rendered
}
