// Reviewed attribution for Tomás Farías's Redshift integration PR (changelog entry 2967).
// The author limits Claude's involvement to advice about mypy type hints.
const humanCodedPR = 'https://github.com/PostHog/posthog/pull/76745'
export const humanCodedBaseline = '2026-08-28T08:53:36.911Z'

export function isHumanCoded(tags?: string[] | null, githubUrls?: string[] | null): boolean {
    // Explicit AI coding evidence still takes precedence over reviewed attribution.
    const reviewedPR = githubUrls?.length === 1 && githubUrls[0] === humanCodedPR
    return Boolean(!tags?.includes('ai-coded') && (tags?.includes('human-coded') || reviewedPR))
}
