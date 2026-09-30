export type Messages = Record<string, string>

// Locale files nest keys for readability. Components look them up by dotted path, e.g. "home.hero.body".
export function flattenMessages(tree: Record<string, unknown> = {}, prefix = ''): Messages {
    return Object.entries(tree).reduce<Messages>((acc, [key, value]) => {
        const path = prefix ? `${prefix}.${key}` : key
        if (value && typeof value === 'object') {
            Object.assign(acc, flattenMessages(value as Record<string, unknown>, path))
        } else {
            acc[path] = String(value)
        }
        return acc
    }, {})
}
