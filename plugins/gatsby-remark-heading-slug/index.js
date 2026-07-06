const visit = require('unist-util-visit')
const GithubSlugger = require('github-slugger')
const { slugifyHeading } = require('../../gatsby/utils/headingSlug')

// Concatenate a node's text content, mirroring `mdast-util-to-string`. Inline
// HTML/JSX nodes expose their raw markup as `value`, which is exactly what we
// want to feed to the slugger (and then strip) so this matches what
// `gatsby-remark-autolink-headers` would otherwise produce.
const getNodeText = (node) => {
    if (typeof node.value === 'string') {
        return node.value
    }
    if (Array.isArray(node.children)) {
        return node.children.map(getNodeText).join('')
    }
    return ''
}

// Runs BEFORE gatsby-remark-autolink-headers to assign a clean anchor ID to every
// heading, stripping any inline markup (icon spans, beta labels, etc.) so it never
// leaks into the URL. autolink-headers only patches an ID when one isn't already
// set, so the value we write here wins.
module.exports = ({ markdownAST }) => {
    const slugger = new GithubSlugger()

    visit(markdownAST, 'heading', (node) => {
        const id = slugifyHeading(getNodeText(node), slugger)

        node.data = node.data || {}
        node.data.id = id
        node.data.htmlAttributes = node.data.htmlAttributes || {}
        node.data.htmlAttributes.id = id
        node.data.hProperties = node.data.hProperties || {}
        node.data.hProperties.id = id
    })

    return markdownAST
}
