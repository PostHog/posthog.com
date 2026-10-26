// Assertions: a short, closed list of facts a check can assert without writing a
// rubric. Each one renders to a criterion with fixed wording, so the same assertion
// reads the same way on every page. Today Gauge's judge grades them like any other
// criterion; if Gauge ever hands back the final workspace, an adapter can run them
// as code instead, and no eval file changes.

export const assertionKinds = ['dependency', 'command', 'file-exists', 'calls', 'no-literal-token', 'mentions'] as const
export type AssertionKind = (typeof assertionKinds)[number]

export type Assertion =
    | { kind: 'dependency'; package: string; in: string }
    | { kind: 'command'; command: string }
    | { kind: 'file-exists'; path: string }
    | { kind: 'calls'; call: string; in: string | null }
    | { kind: 'no-literal-token' }
    | { kind: 'mentions'; text: string }

// Every kind but mentions looks at the fixture's folder, so it needs a workspace.
export const needsWorkspace = (assertion: Assertion) => assertion.kind !== 'mentions'

// A path inside the fixture folder: relative, no `..`, no leading slash.
const folderPath = /^(?!\/)(?!.*(?:^|\/)\.\.(?:\/|$))[^\s{}]+$/

export function parseAssertion(raw: unknown): { assertion: Assertion | null; problem: string | null } {
    const fail = (problem: string) => ({ assertion: null, problem })
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return fail('each assertion must be a mapping')
    const entry = raw as Record<string, unknown>
    const kinds = Object.keys(entry).filter((key) => (assertionKinds as readonly string[]).includes(key))
    if (kinds.length !== 1) return fail(`each assertion needs exactly one of ${assertionKinds.join(', ')}`)
    const kind = kinds[0] as AssertionKind
    const value = entry[kind]
    const extra = Object.keys(entry).filter((key) => key !== kind && key !== 'in')
    if (extra.length > 0) return fail(`${kind}: unknown key "${extra[0]}"`)
    const takesIn = kind === 'dependency' || kind === 'calls'
    if (entry.in !== undefined && !takesIn) return fail(`${kind}: "in" only goes with dependency or calls`)
    if (entry.in !== undefined && (typeof entry.in !== 'string' || !folderPath.test(entry.in)))
        return fail(`${kind}: "in" must be a path inside the fixture folder, such as src/main.ts`)
    const where = entry.in as string | undefined

    if (kind === 'no-literal-token')
        return value === true ? { assertion: { kind }, problem: null } : fail('no-literal-token: set it to true')
    if (typeof value !== 'string' || value.trim() === '') return fail(`${kind}: needs a value`)
    const text = value.trim()
    switch (kind) {
        case 'dependency':
            return { assertion: { kind, package: text, in: where ?? 'package.json' }, problem: null }
        case 'command':
            return { assertion: { kind, command: text }, problem: null }
        case 'file-exists':
            return folderPath.test(text)
                ? { assertion: { kind, path: text }, problem: null }
                : fail('file-exists: must be a path inside the fixture folder')
        case 'calls':
            return { assertion: { kind, call: text, in: where ?? null }, problem: null }
        case 'mentions':
            return { assertion: { kind, text }, problem: null }
    }
}

const slug = (text: string) =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '')

const subject = (assertion: Assertion): string => {
    switch (assertion.kind) {
        case 'dependency':
            return assertion.package
        case 'command':
            return assertion.command
        case 'file-exists':
            return assertion.path
        case 'calls':
            return assertion.call
        case 'no-literal-token':
            return ''
        case 'mentions':
            return assertion.text
    }
}

// assert-<kind>[-<subject>], kebab-case and at most 64 characters, like every criterion name.
export function assertionName(assertion: Assertion): string {
    const name = ['assert', assertion.kind, slug(subject(assertion))].filter(Boolean).join('-')
    return name.slice(0, 64).replace(/-$/, '')
}

// The rubric is written with {folder}, which render.ts fills like any other rubric.
export function assertionRubric(assertion: Assertion): string {
    switch (assertion.kind) {
        case 'dependency':
            return `{folder}/${assertion.in} lists \`${assertion.package}\` as a dependency.`
        case 'command':
            return `The trace shows \`${assertion.command}\` run in {folder}/ after the last change, and it finishes without errors.`
        case 'file-exists':
            return `{folder}/${assertion.path} exists when the run ends.`
        case 'calls':
            return `The code ${assertion.in ? `in {folder}/${assertion.in}` : 'in {folder}/'} calls \`${
                assertion.call
            }\`. Cite the file and line.`
        case 'no-literal-token':
            return 'No PostHog project token (a string starting with phc_) appears as a literal anywhere in {folder}/.'
        case 'mentions':
            return `The agent's final answer mentions "${assertion.text}", in any letter case.`
    }
}
