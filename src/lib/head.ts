// Page <head> data. React components describe the head with <SEO>; during server rendering, <SEO>
// records the resolved tags here, keyed by the page path, and the Astro layout writes them after it
// renders the page island (see src/layouts/Site.astro). The last <SEO> rendered on a page wins, as
// it did with react-helmet.

export const siteMetadata = {
    title: 'PostHog',
    description:
        'The single platform for engineers to analyze, test, observe, and deploy new features. Product analytics, session replay, feature flags, experiments, CDP, and more.',
    siteUrl: 'https://posthog.com', // No trailing slash allowed!
    image: '/images/og/default.png',
    twitterUsername: '@PostHog',
}

export interface HeadData {
    title: string
    description: string
    image?: string
    /** Absolute URL of this page. */
    url: string
    canonical: string
    article: boolean
    noindex: boolean
    lang?: string
    languageAlternates: { hrefLang: string; href: string }[]
    structuredData: Record<string, any>[]
    documentRkey?: string
}

const collected = new Map<string, HeadData>()

export function collectHead(pathname: string, head: HeadData): void {
    collected.set(pathname, head)
}

/** Returns and forgets the head recorded for a page. */
export function takeHead(pathname: string): HeadData | undefined {
    const head = collected.get(pathname)
    collected.delete(pathname)
    return head
}

export function defaultHead(pathname: string): HeadData {
    const url = `${siteMetadata.siteUrl}${pathname}`
    return {
        title: siteMetadata.title,
        description: siteMetadata.description,
        image: `${siteMetadata.siteUrl}${siteMetadata.image}`,
        url,
        canonical: url,
        article: false,
        noindex: false,
        languageAlternates: [],
        structuredData: [],
    }
}

// Content modules a page renders through MDXRenderer, recorded during server rendering. The layout
// lists them in the page, and the `client:page` directive loads them before hydrating, so nested
// content (snippets, embedded MDX) never suspends hydration either.
const contentKeys = new Map<string, Set<string>>()

export function collectContent(pathname: string, key: string): void {
    if (!contentKeys.has(pathname)) contentKeys.set(pathname, new Set())
    contentKeys.get(pathname)!.add(key)
}

/** Returns and forgets the content modules recorded for a page. */
export function takeContent(pathname: string): string[] {
    const keys = [...(contentKeys.get(pathname) ?? [])]
    contentKeys.delete(pathname)
    return keys
}
