// Finds MCP tool names that docs pages mention but the MCP tool catalog does not define.
// See https://github.com/PostHog/posthog.com/issues/20440.

export interface UnknownToolReference {
    name: string
    line: number
}

export interface ToolNameHints {
    // Last name segments that at least `minActionCount` catalog tools end with, e.g. `list` or `create`.
    actions: Set<string>
    // First two name segments of catalog tools, e.g. `vision-scanners` or `insight-create`.
    families: Set<string>
}

const INLINE_CODE = /(?<!`)`([a-z][a-z0-9]*(?:-[a-z0-9]+)+)`(?!`)/g
const FENCE = /^\s*(```|~~~)/

export function referencesMcp(source: string): boolean {
    return /\bMCP\b/.test(source) || source.includes('/docs/model-context-protocol')
}

export function toolNameHints(toolNames: Iterable<string>, minActionCount = 3): ToolNameHints {
    const actionCounts = new Map<string, number>()
    const families = new Set<string>()
    for (const name of toolNames) {
        const segments = name.split('-')
        const action = segments[segments.length - 1]
        actionCounts.set(action, (actionCounts.get(action) ?? 0) + 1)
        if (segments.length >= 2) families.add(segments.slice(0, 2).join('-'))
    }
    const actions = new Set([...actionCounts].filter(([, count]) => count >= minActionCount).map(([action]) => action))
    return { actions, families }
}

// A kebab-case token looks like a tool name when it ends with a common tool action, or when it
// has three or more segments and starts with the first two segments of a catalog tool.
export function looksLikeToolName(token: string, hints: ToolNameHints): boolean {
    const segments = token.split('-')
    if (hints.actions.has(segments[segments.length - 1])) return true
    return segments.length >= 3 && hints.families.has(segments.slice(0, 2).join('-'))
}

// Returns inline-code tokens that look like tool names but are not in the catalog. Fenced code
// blocks are skipped, because they hold code and config, not tool references.
export function findUnknownToolReferences(
    source: string,
    toolNames: ReadonlySet<string>,
    hints: ToolNameHints,
    ignored: ReadonlySet<string> = new Set()
): UnknownToolReference[] {
    const unknown: UnknownToolReference[] = []
    let fence: string | undefined
    source.split('\n').forEach((text, index) => {
        const marker = text.match(FENCE)?.[1]
        if (marker && (!fence || marker === fence)) {
            fence = fence ? undefined : marker
            return
        }
        if (fence) return
        for (const match of text.matchAll(INLINE_CODE)) {
            const name = match[1]
            if (toolNames.has(name) || ignored.has(name) || !looksLikeToolName(name, hints)) continue
            unknown.push({ name, line: index + 1 })
        }
    })
    return unknown
}
