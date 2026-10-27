export function isHumanCoded(tags?: string[] | null): boolean {
    // Only confirmed human-coded entries get the rare treatment. AI-coded,
    // untagged, and conflicting entries all keep the ordinary appearance.
    return Boolean(tags?.includes('human-coded') && !tags?.includes('ai-coded'))
}
