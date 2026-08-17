import { BuildModePost } from './types'

/** Deterministic pseudo-random in [0, 1) — stable across SSR/hydration, varied per index. */
export const rand = (index: number, salt: number): number => {
    const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453
    return x - Math.floor(x)
}

/** First sentence of the post's meta description (or excerpt), used as a dek. */
export const getSubtitle = (post: BuildModePost): string => {
    const description = post.frontmatter.seo?.metaDescription || post.excerpt || ''
    // A sentence ends at `.`, `!`, or `?` that's followed by the end of the text, or by
    // whitespace and something that isn't lowercase — so a question or exclamation opener
    // ends the dek, while `e.g. gradual rollouts` reads as one sentence rather than two.
    const firstSentence = description.match(/^.*?[.!?](?=\s+[^a-z]|\s*$)/)?.[0] ?? description
    return firstSentence.replace(/\.\s*$/, '').trim()
}

export const getAuthorName = (post: BuildModePost): string | undefined => post.frontmatter.authors?.[0]?.name

/** `MMM D · Author` byline, with the separator dropped when there's no author. */
export const getByline = (post: BuildModePost, date: string): string => {
    const author = getAuthorName(post)
    return author ? `${date} · ${author}` : date
}
