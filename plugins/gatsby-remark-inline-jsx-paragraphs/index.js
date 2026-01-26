const visit = require('unist-util-visit')

const PARAGRAPH_REGEX = /^<p[\s>]/i
const INLINE_JSX_REGEX = /^<([A-Z][\w.]*)\b/

const hasMatchingClosingTag = (value) => {
    const trimmedValue = value.trim()
    const openingMatch = trimmedValue.match(INLINE_JSX_REGEX)
    if (!openingMatch) {
        return false
    }

    const tagName = openingMatch[1]
    const closingTagRegex = new RegExp(`<\\/${tagName}>`)
    const selfClosingRegex = new RegExp(`^<${tagName}\\b[^>]*\\/>`)

    return closingTagRegex.test(trimmedValue) || selfClosingRegex.test(trimmedValue)
}

const shouldWrapLine = (rawValue = '') => {
    if (typeof rawValue !== 'string') {
        return false
    }

    const trimmedValue = rawValue.trim()

    if (!trimmedValue) {
        return false
    }

    // Ignore anything that is already wrapped in a paragraph.
    if (PARAGRAPH_REGEX.test(trimmedValue)) {
        return false
    }

    // Only consider JSX components that are declared inline (single line).
    if (!INLINE_JSX_REGEX.test(trimmedValue) || trimmedValue.includes('\n')) {
        return false
    }

    // Skip plain HTML elements (lowercase) by requiring our components to start with a capital letter.
    if (!/[A-Z]/.test(trimmedValue.charAt(1))) {
        return false
    }

    return hasMatchingClosingTag(trimmedValue)
}

const wrapWithParagraph = (value) => {
    const leadingWhitespace = value.match(/^\s*/)?.[0] ?? ''
    const trailingWhitespace = value.match(/\s*$/)?.[0] ?? ''
    const trimmedValue = value.trim()

    return `${leadingWhitespace}<p>${trimmedValue}</p>${trailingWhitespace}`
}

const isTopLevelNode = (parent) => !parent || parent.type === 'root'

module.exports = ({ markdownAST }) => {
    visit(markdownAST, (node, _index, parent) => {
        if (!node || typeof node.value !== 'string') {
            return
        }

        const isHtmlNode = node.type === 'html' || node.type === 'jsx'

        if (!isHtmlNode || !isTopLevelNode(parent) || !shouldWrapLine(node.value)) {
            return
        }

        node.value = wrapWithParagraph(node.value)
    })

    return markdownAST
}
