const path = require('path')

const ensureLeadingSlash = (value = '') => {
    if (!value) {
        return ''
    }
    return value.startsWith('/') ? value : `/${value}`
}

const ensureTrailingSlash = (value = '') => {
    if (!value) {
        return ''
    }
    return value.endsWith('/') ? value : `${value}/`
}

const hasProtocol = (url = '') => /^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(url)

const joinUrl = (base, slug) => {
    const normalizedBase = base ? ensureLeadingSlash(base).replace(/\/+$/, '') : ''
    const normalizedSlug = slug ? slug.replace(/^\/+/, '') : ''

    if (normalizedBase && normalizedSlug) {
        return `${normalizedBase}/${normalizedSlug}`
    }

    if (normalizedBase) {
        return normalizedBase || '/'
    }

    if (normalizedSlug) {
        return `/${normalizedSlug}`
    }

    return '/'
}

const normaliseDocSlug = (slug) => {
    if (!slug) {
        return ''
    }

    const cleaned = slug.replace(/\.(mdx?)$/i, '')

    if (/^(readme|index)$/i.test(cleaned)) {
        return ''
    }

    return cleaned.replace(/\/(readme|index)$/gi, '')
}

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

    if (!config) {
        return
    }

    const stripPrefix = config.stripPrefix ? ensureTrailingSlash(ensureLeadingSlash(config.stripPrefix)) : null
    const pathPrefix = config.pathPrefix ? ensureLeadingSlash(config.pathPrefix) : ''
    const fileRelativePath = fileNode.relativePath

    if (!fileRelativePath) {
        return
    }

    const fileDir = path.posix.dirname(`/${fileRelativePath}`)

    visitLinks(markdownAST, (node) => {
        const originalUrl = node.url

        if (!originalUrl) {
            return
        }

        if (hasProtocol(originalUrl) || originalUrl.startsWith('/') || originalUrl.startsWith('#')) {
            return
        }

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

        if (!linkPath) {
            return
        }

        if (!/\.(mdx?)$/i.test(linkPath)) {
            return
        }

        const resolvedPath = path.posix.normalize(path.posix.join(fileDir, linkPath))

        if (stripPrefix && !resolvedPath.startsWith(stripPrefix)) {
            return
        }

        let relativePath = stripPrefix ? resolvedPath.slice(stripPrefix.length) : resolvedPath.replace(/^\//, '')

        if (relativePath.startsWith('/')) {
            relativePath = relativePath.slice(1)
        }

        const slug = normaliseDocSlug(relativePath)

        const finalPath = joinUrl(pathPrefix, slug)

        node.url = `${finalPath}${query}${fragment}`
    })
}

module.exports.__testables__ = {
    ensureLeadingSlash,
    ensureTrailingSlash,
    hasProtocol,
    joinUrl,
    normaliseDocSlug,
}
