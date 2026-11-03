type SourceDocsNode = {
    slug: string
    mdx?: { fields?: { slug?: string | null } | null } | null
}

export function getSourceDocsPath(source: SourceDocsNode, basePath = '/docs/data-pipelines/sources'): string {
    return source.mdx?.fields?.slug || `${basePath}/${source.slug}`
}
