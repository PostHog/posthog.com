export type CodingStyle = 'agent' | 'human'

export function getCodingStyle(tags?: string[] | null): CodingStyle | null {
    const agent = tags?.includes('ai-coded') ?? false
    const human = tags?.includes('human-coded') ?? false

    // Missing or conflicting tags do not establish who coded the PR.
    if (agent === human) return null
    return human ? 'human' : 'agent'
}
