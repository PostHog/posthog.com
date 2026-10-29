const { isPrivateUrl } = require('./private-link-policy.cjs') // eslint-disable-line @typescript-eslint/no-var-requires

function decodeUrl(value) {
    return value
        .replace(/&amp;/g, '&')
        .replace(/&#(x[\da-f]+|\d+);/gi, (entity, code) => {
            const point = code[0].toLowerCase() === 'x' ? parseInt(code.slice(1), 16) : Number(code)
            return point >= 0 && point <= 0x10ffff ? String.fromCodePoint(point) : entity
        })
        .replace(/\\([\p{P}\p{S}])/gu, '$1')
}

module.exports = {
    names: ['private-links'],
    description: 'Use PrivateLink for PostHog staff-only destinations',
    tags: ['links'],
    parser: 'micromark',
    function: (params, onError) => {
        const source = params.lines.join('\n')
        const offsets = [0]
        for (const line of params.lines) offsets.push(offsets[offsets.length - 1] + line.length + 1)
        const tokenRange = (token) => [
            offsets[token.startLine - 1] + token.startColumn - 1,
            offsets[token.endLine - 1] + token.endColumn - 1,
        ]
        const contains = ([start, end], position) => position >= start && position < end
        const ignored = []
        const destinations = []
        const paragraphs = []
        const visit = (tokens) => {
            for (const token of tokens) {
                if (token.type === 'paragraph') paragraphs.push(tokenRange(token))
                if (['codeFenced', 'codeIndented', 'codeText'].includes(token.type)) {
                    ignored.push(tokenRange(token))
                    continue
                }
                if (['htmlText', 'htmlFlow'].includes(token.type) && token.text.trimStart().startsWith('<!--')) {
                    ignored.push(tokenRange(token))
                    continue
                }
                if (token.type === 'htmlFlow' && /^\s*<[A-Za-z]/.test(token.text)) {
                    const [start] = tokenRange(token)
                    for (const match of token.text.matchAll(/\{\/\*[\s\S]*?\*\/\}/g)) {
                        ignored.push([start + match.index, start + match.index + match[0].length])
                    }
                }
                if (
                    [
                        'resourceDestinationString',
                        'definitionDestinationString',
                        'autolinkProtocol',
                        'literalAutolinkHttp',
                    ].includes(token.type)
                ) {
                    let parent = token.parent
                    while (parent && !['image', 'link', 'definition', 'autolink'].includes(parent.type))
                        parent = parent.parent
                    if (parent?.type !== 'image') destinations.push(token)
                }
                visit(token.children || [])
            }
        }
        visit(params.parsers.micromark.tokens)
        const elements = [...source.matchAll(/<(\/?)([A-Za-z][\w.:]*)\b(?:"[^"]*"|'[^']*'|`[^`]*`|[^'"`>])*>/g)].filter(
            (match) => !ignored.some((range) => contains(range, match.index))
        )
        const elementStack = []
        const inlineElements = []
        for (const element of elements) {
            if (element[1]) {
                const index = elementStack.findLastIndex((opening) => opening[2] === element[2])
                if (index === -1) continue
                const [opening] = elementStack.splice(index)
                if (
                    paragraphs.some(
                        (range) =>
                            contains(range, opening.index) &&
                            contains(range, element.index) &&
                            !source.slice(range[0], opening.index).trim()
                    )
                ) {
                    inlineElements.push([opening.index + opening[0].length, element.index])
                }
            } else if (!element[0].endsWith('/>')) {
                elementStack.push(element)
            }
        }
        for (const match of source.matchAll(/\{\/\*[\s\S]*?\*\/\}/g)) {
            if (inlineElements.some(([start, end]) => match.index >= start && match.index + match[0].length <= end)) {
                ignored.push([match.index, match.index + match[0].length])
            }
        }
        const tags = elements.filter(
            (match) =>
                ['a', 'Link', 'PrivateLink'].includes(match[2]) &&
                !ignored.some((range) => contains(range, match.index))
        )
        const tagRanges = tags.map((match) => [match.index, match.index + match[0].length])
        const openings = []
        const wrappers = []
        for (const match of tags) {
            if (match[2] !== 'PrivateLink' || match[0].endsWith('/>')) continue
            if (match[1]) {
                const opening = openings.pop()
                if (opening !== undefined) wrappers.push([opening, match.index + match[0].length])
            } else {
                openings.push(match.index)
            }
        }
        const report = (token, url, wrapped) => {
            const destination = decodeUrl(url)
            const nested = /^\[[\s\S]*?\]\((https?:\/\/[\s\S]+)\)$/.exec(destination)
            if (nested || (!wrapped && isPrivateUrl(destination))) {
                onError({
                    lineNumber: token.startLine,
                    detail: nested
                        ? 'Remove the nested Markdown URL and use PrivateLink for staff-only destinations.'
                        : `Use <PrivateLink url="${destination}">...</PrivateLink>.`,
                    context: token.text,
                })
            }
        }
        for (const match of tags) {
            if (match[1]) continue
            const token = { startLine: source.slice(0, match.index).split('\n').length, text: match[0] }
            for (const attribute of match[0].matchAll(/\s(href|to|url)\s*=\s*(?:\{\s*)?(["'`])(.*?)\2(?:\s*\})?/gs)) {
                report(token, attribute[3], match[2] === 'PrivateLink' && attribute[1] === 'url')
            }
        }
        for (const token of destinations) {
            const [position] = tokenRange(token)
            if ([...ignored, ...tagRanges].some((range) => contains(range, position))) continue
            report(
                token,
                token.text,
                wrappers.some((range) => contains(range, position))
            )
        }
    },
}
