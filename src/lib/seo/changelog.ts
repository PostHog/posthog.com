// Shared by /changelog.md and /changelog.rss.

/** A changelog entry's Markdown description without images, with site-relative links made absolute. */
export const changelogDescription = (markdown?: string | null): string =>
    (markdown || '')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
        .replace(/\]\(\//g, '](https://posthog.com/')
        .trim()
