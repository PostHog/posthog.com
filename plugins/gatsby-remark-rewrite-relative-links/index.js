const path = require('path')

const hasProtocol = (url = '') => /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)

const visitLinks = (node, callback) => {
    if (!node || typeof node !== 'object') {
        return
    }

    if (node.type === 'link' || node.type === 'definition') {
        callback(node)
    }

    if (Array.isArray(node.children)) {
        node.children.forEach((child) => visitLinks(child, callback))
    }
}

module.exports = ({ markdownAST, markdownNode, getNode }, pluginOptions = {}) => {
    if (!markdownAST || !markdownNode || !getNode) {
        return
    }

    const fileNode = getNode(markdownNode.parent)

    if (!fileNode || fileNode.internal?.type !== 'File') {
        return
    }

    const { repoConfigs = {} } = pluginOptions
    const config = repoConfigs[fileNode.sourceInstanceName]

    // Only process if this is a configured external repo
    const isExternalRepo = !!config

    // Get the file's path for resolving relative links
    const fileRelativePath = fileNode.relativePath
    const fileDir = path.dirname(fileRelativePath)

    visitLinks(markdownAST, (node) => {
        const originalUrl = node.url

        if (!originalUrl) {
            return
        }

        // Skip anchor-only links
        if (originalUrl.startsWith('#')) {
            return
        }

        // Handle posthog.com URL normalization (for all repos, not just external)
        if (originalUrl.startsWith('https://posthog.com/') || originalUrl.startsWith('http://posthog.com/')) {
            const url = new URL(originalUrl)
            node.url = url.pathname + url.search + url.hash
            return
        }

        // Skip absolute paths (they already work)
        if (originalUrl.startsWith('/') && !hasProtocol(originalUrl)) {
            return
        }

        // Skip external URLs (other domains)
        if (hasProtocol(originalUrl)) {
            return
        }

        // Only process relative markdown links for external repos
        if (!isExternalRepo) {
            return
        }

        // Split URL into parts
        let linkPath = originalUrl
        let fragment = ''
        let query = ''

        const hashIndex = linkPath.indexOf('#')
        if (hashIndex !== -1) {
            fragment = linkPath.slice(hashIndex)
            linkPath = linkPath.slice(0, hashIndex)
        }

        const queryIndex = linkPath.indexOf('?')
        if (queryIndex !== -1) {
            query = linkPath.slice(queryIndex)
            linkPath = linkPath.slice(0, queryIndex)
        }

        // Check if this is a markdown file link
        if (!/\.(mdx?)$/i.test(linkPath)) {
            return
        }

        // Strip .md/.mdx extension
        const strippedPath = linkPath.replace(/\.(mdx?)$/i, '')

        // Resolve relative path to absolute
        const resolvedPath = path.join(fileDir, strippedPath)

        // Convert to absolute URL with configured prefix
        const urlPrefix = config.urlPrefix || ''
        const absolutePath = path.posix.join('/', urlPrefix, resolvedPath)

        node.url = `${absolutePath}${query}${fragment}`
    })
}

module.exports.__testables__ = {
    hasProtocol,
}
