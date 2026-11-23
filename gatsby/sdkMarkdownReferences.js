// Strapi stores each SDK reference as Markdown, and gatsby/onPreBootstrap.ts writes it to
// contents/docs/libraries/<sdk>/<page>.md. A row must never run code in the build, so these
// pages are never MDX: gatsby-config.js blocks them from MDX, gatsby/onCreateNode.ts turns them
// into SdkMarkdownReference nodes, and src/templates/sdk/SdkMarkdownReference.tsx renders them.

/**
 * The SDKs whose rows become pages. Strapi also syncs the web and remaining mobile SDKs, but their pages aren't ready,
 * so the build skips them. Add an SDK here to publish it.
 */
const PUBLISHED_SDK_REFERENCES = ['posthog-python', 'posthog-go', 'posthog-rust', 'posthog-node', 'posthog-android']

/** The pages a row can write: reference, migration, and one per major version, such as 7.x.x.md. */
const isSdkReferencePage = (file) => file === 'reference.md' || file === 'migration.md' || file.endsWith('.x.x.md')

/**
 * Whether a page answers noindex (see vercel.json), so it stays out of the sitemap and site search: a page for
 * one major version, which repeats a reference page.
 */
const isNoindexSdkReference = (slug) => slug.startsWith('/docs/libraries/') && slug.endsWith('.x.x')

/** Whether a gatsby-source-filesystem File node is one of those pages. */
const isSdkReferenceFile = (node) => {
    if (node.internal.type !== 'File' || node.sourceInstanceName !== 'contents') return false
    const [docs, libraries, sdk, file, ...rest] = node.relativePath.split('/')
    return docs === 'docs' && libraries === 'libraries' && !!sdk && !!file && !rest.length && isSdkReferencePage(file)
}

/** Public URL for a generated SDK reference file: reference.md serves /docs/libraries/<sdk>, others keep their name. */
const sdkReferenceSlug = (relativePath) => `/${relativePath.slice(0, -'.md'.length).replace(/\/reference$/, '')}`

/** HogRef SDK IDs that still need legacy sourcing (everything not migrated to Markdown references). */
const getLegacyHogRefSdkIds = (supportedSdkIds) =>
    supportedSdkIds.filter((id) => !PUBLISHED_SDK_REFERENCES.includes(id))

module.exports = {
    PUBLISHED_SDK_REFERENCES,
    isSdkReferencePage,
    isNoindexSdkReference,
    isSdkReferenceFile,
    sdkReferenceSlug,
    getLegacyHogRefSdkIds,
}
