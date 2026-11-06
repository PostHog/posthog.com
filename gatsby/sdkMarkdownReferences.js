const YAML = require('yaml')

// Strapi stores each SDK reference as Markdown, and gatsby/onPreBootstrap.ts writes it to
// contents/docs/libraries/<sdk>/<page>.md. A row must never run code in the build, so these
// pages are never MDX: gatsby-config.js blocks them from MDX, gatsby/onCreateNode.ts turns them
// into SdkMarkdownReference nodes, and src/templates/sdk/SdkMarkdownReference.tsx renders them.

/** The pages a row can write: reference, migration, and one per major version, such as 7.x.x.md. */
const isSdkReferencePage = (file) => file === 'reference.md' || file === 'migration.md' || file.endsWith('.x.x.md')

/**
 * Whether a page answers noindex (see vercel.json), so it stays out of the sitemap and site search: a past or
 * next major, and the migration guides.
 */
const isNoindexSdkReference = (slug) =>
    slug.startsWith('/docs/libraries/') && (slug.endsWith('.x.x') || slug.endsWith('/migration'))

/** Whether a gatsby-source-filesystem File node is one of those pages. */
const isSdkReferenceFile = (node) => {
    if (node.internal.type !== 'File' || node.sourceInstanceName !== 'contents') return false
    const [docs, libraries, sdk, file, ...rest] = node.relativePath.split('/')
    return docs === 'docs' && libraries === 'libraries' && !!sdk && !!file && !rest.length && isSdkReferencePage(file)
}

/** Splits a page into its YAML front matter and its Markdown body. */
const splitFrontmatter = (raw) => {
    const end = raw.startsWith('---\n') ? raw.indexOf('\n---\n', 3) : -1
    if (end === -1) return { frontmatter: {}, body: raw }
    return { frontmatter: YAML.parse(raw.slice(4, end)) || {}, body: raw.slice(end + 5) }
}

module.exports = { isSdkReferencePage, isNoindexSdkReference, isSdkReferenceFile, splitFrontmatter }
