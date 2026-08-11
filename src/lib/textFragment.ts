/**
 * Text fragment (`#:~:text=`) support for the reader.
 *
 * Browsers implement text fragments natively, and on a normal page there'd be nothing to do
 * here. Two things about this site break the native behaviour:
 *
 * 1. Nothing on the page is scrolled by the document scroller — article content lives inside a
 *    Radix ScrollArea viewport several levels down. The UA scrolls that container fine, but any
 *    scrolling we do afterwards (the reader resets the viewport to the top on navigation) wins,
 *    and the match ends up off screen.
 * 2. The highlight the UA creates is a Range over specific DOM nodes. Docs pages currently fail
 *    hydration, so React throws away the server-rendered tree and re-renders from scratch — the
 *    nodes the Range pointed at are gone, and the highlight goes with them.
 *
 * So we redo the work ourselves once the client-rendered content has settled: find the text,
 * highlight it, scroll the reader's scroll container to it.
 *
 * Matching follows https://wicg.github.io/scroll-to-text-fragment/ loosely — enough for the
 * fragments Chrome's "Copy link to highlight" produces (`prefix-,start,end,-suffix`, any of the
 * optional parts omitted), but without the spec's block-boundary rules.
 */

export interface TextDirective {
    prefix?: string
    start: string
    end?: string
    suffix?: string
}

/** Name used for both `CSS.highlights` and the `::highlight()` rule in global.css. */
export const TEXT_FRAGMENT_HIGHLIGHT = 'text-fragment'

const decode = (value: string | undefined): string | undefined => {
    if (value === undefined) return undefined
    try {
        return decodeURIComponent(value)
    } catch {
        // A malformed escape isn't worth throwing over — fall back to the raw token.
        return value
    }
}

/** Collapse the whitespace differences between source markup and rendered text. */
const normalize = (value: string): string => value.replace(/\s+/g, ' ').toLowerCase()

const parseTextDirective = (raw: string): TextDirective | null => {
    // Split before decoding: a literal comma or dash inside a term is percent-encoded precisely
    // so it can't be mistaken for a separator or a prefix/suffix marker.
    const tokens = raw.split(',')
    if (tokens.length === 0 || tokens.length > 4) return null

    // `prefix-` and `-suffix` only count as such while there's still a textStart left behind.
    const prefix = tokens.length > 1 && tokens[0].endsWith('-') ? tokens.shift()?.slice(0, -1) : undefined
    const suffix = tokens.length > 1 && tokens[tokens.length - 1].startsWith('-') ? tokens.pop()?.slice(1) : undefined

    const [start, end] = tokens
    if (!start) return null

    return { prefix: decode(prefix), start: decode(start) as string, end: decode(end), suffix: decode(suffix) }
}

/**
 * Pull the text directives out of a URL.
 *
 * Note this can't read `window.location`: browsers that support text fragments strip the
 * directive from the URL exposed to script and surface it only as an opaque
 * `document.fragmentDirective`. Pass the Navigation Timing entry's `name`, which keeps the
 * original URL, and fall back to `location.href` for browsers that leave the directive in place.
 */
export const parseTextDirectives = (url: string | undefined): TextDirective[] => {
    const fragment = url?.split('#')[1]
    const directive = fragment?.split(':~:')[1]
    if (!directive) return []

    return directive
        .split('&')
        .filter((part) => part.startsWith('text='))
        .map((part) => parseTextDirective(part.slice('text='.length)))
        .filter((parsed): parsed is TextDirective => parsed !== null)
}

const samePath = (a: string, b: string): boolean => a.replace(/\/$/, '') === b.replace(/\/$/, '')

/**
 * The text directives for the URL this document was loaded with, or `[]` if there are none.
 *
 * The Navigation Timing entry keeps the URL of the original page load for the whole life of the
 * document, so it's only meaningful while we're still on that page — a text fragment belongs to
 * the navigation that carried it, and shouldn't follow the reader around as they click through to
 * other pages. Once a client-side navigation has moved us elsewhere, report no directives.
 */
export const getTextDirectives = (): TextDirective[] => {
    if (typeof window === 'undefined') return []

    const [navigation] = performance.getEntriesByType('navigation')
    if (!navigation) return parseTextDirectives(window.location.href)

    try {
        if (!samePath(new URL(navigation.name).pathname, window.location.pathname)) return []
    } catch {
        return []
    }

    return parseTextDirectives(navigation.name)
}

interface FlatText {
    /** Whitespace-collapsed, lowercased text of everything under the root. */
    text: string
    /** `charPositions[i]` is where character `i` of `text` came from. */
    charPositions: { node: Text; offset: number }[]
}

/** Elements whose edges read as a word break, even when the markup leaves no whitespace there. */
const BLOCK_CONTAINERS =
    'p, li, td, th, dt, dd, pre, h1, h2, h3, h4, h5, h6, div, section, article, blockquote, figcaption'

/**
 * Flatten the rendered text under `root` into a single searchable string, remembering where each
 * character came from so a match can be turned back into a Range.
 */
const flattenText = (root: HTMLElement): FlatText => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) =>
            node.parentElement?.closest('script, style, noscript')
                ? NodeFilter.FILTER_REJECT
                : NodeFilter.FILTER_ACCEPT,
    })

    let text = ''
    const charPositions: { node: Text; offset: number }[] = []
    let previousBlock: Element | null = null

    for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
        // Adjacent blocks usually have no whitespace between them in the rendered markup, so
        // without this `…passes.` and `This means…` would flatten into one unsearchable word.
        const block = node.parentElement?.closest(BLOCK_CONTAINERS) || null
        if (block !== previousBlock && text !== '' && !text.endsWith(' ')) {
            text += ' '
            charPositions.push({ node, offset: 0 })
        }
        previousBlock = block

        const value = node.nodeValue || ''
        for (let offset = 0; offset < value.length; offset++) {
            const char = normalize(value[offset])
            // Collapsed whitespace contributes at most one space, and never a leading one.
            if (char === ' ' && (text === '' || text.endsWith(' '))) continue
            text += char
            charPositions.push({ node, offset })
        }
    }

    return { text, charPositions }
}

const rangeFor = (flat: FlatText, from: number, to: number): Range | null => {
    const first = flat.charPositions[from]
    const last = flat.charPositions[to - 1]
    if (!first || !last) return null

    const range = document.createRange()
    range.setStart(first.node, first.offset)
    range.setEnd(last.node, last.offset + 1)
    return range
}

/** Find the piece of `root` a text directive points at, or `null` if it isn't on the page. */
export const findTextDirective = (root: HTMLElement, directive: TextDirective): Range | null => {
    const flat = flattenText(root)
    const start = normalize(directive.start)
    if (!start) return null

    // A prefix, when present, anchors the search: textStart has to be the first match after it.
    let searchFrom = 0
    if (directive.prefix) {
        const prefixIndex = flat.text.indexOf(normalize(directive.prefix))
        if (prefixIndex === -1) return null
        searchFrom = prefixIndex + normalize(directive.prefix).length
    }

    const startIndex = flat.text.indexOf(start, searchFrom)
    if (startIndex === -1) return null
    let matchEnd = startIndex + start.length

    // With a textEnd the match spans from the start of textStart to the end of the first textEnd
    // that follows it, so a fragment can cover several paragraphs without quoting all of them.
    if (directive.end) {
        const end = normalize(directive.end)
        const endIndex = flat.text.indexOf(end, matchEnd)
        if (endIndex === -1) return null
        matchEnd = endIndex + end.length
    }

    if (directive.suffix && !flat.text.startsWith(normalize(directive.suffix), matchEnd)) return null

    return rangeFor(flat, startIndex, matchEnd)
}

/**
 * The CSS Custom Highlight API is newer than the TypeScript version this repo pins, so the DOM
 * lib doesn't describe it. Reach for it through a locally typed view of `window` rather than
 * augmenting globals, so nothing here depends on which lib.dom we happen to be building against.
 */
interface HighlightRegistry {
    set: (name: string, highlight: unknown) => void
    delete: (name: string) => void
}

interface HighlightCapableWindow {
    Highlight?: new (...ranges: Range[]) => unknown
    CSS?: { highlights?: HighlightRegistry }
}

const highlightApi = (): { create: (ranges: Range[]) => unknown; registry: HighlightRegistry } | null => {
    if (typeof window === 'undefined') return null
    const { Highlight, CSS } = window as unknown as HighlightCapableWindow
    if (!Highlight || !CSS?.highlights) return null
    return { create: (ranges) => new Highlight(...ranges), registry: CSS.highlights }
}

/**
 * Highlight `ranges`, replacing any previous text fragment highlight. Uses the CSS Custom
 * Highlight API rather than wrapping the text in `<mark>` so nothing in the article's DOM is
 * mutated — React owns that markup and would clobber injected elements on the next render.
 * Where the API is missing we still scroll to the match, just without the highlight.
 */
export const highlightRanges = (ranges: Range[]): void => {
    const api = highlightApi()
    if (!api) return

    if (ranges.length === 0) {
        api.registry.delete(TEXT_FRAGMENT_HIGHLIGHT)
        return
    }
    api.registry.set(TEXT_FRAGMENT_HIGHLIGHT, api.create(ranges))
}

export const clearHighlight = (): void => {
    highlightApi()?.registry.delete(TEXT_FRAGMENT_HIGHLIGHT)
}

/**
 * Highlight the document's text fragment inside `root` and scroll `scrollElement` to it.
 * Returns true if anything matched.
 */
export const applyTextFragment = (root: HTMLElement, scrollElement: HTMLElement): boolean => {
    const directives = getTextDirectives()
    if (directives.length === 0) return false

    const ranges = directives
        .map((directive) => findTextDirective(root, directive))
        .filter((range): range is Range => range !== null)
    if (ranges.length === 0) return false

    // A match inside a collapsed <details> can't be scrolled to until it's open.
    for (const range of ranges) {
        const details = (range.startContainer.parentElement as HTMLElement | null)?.closest('details')
        if (details) details.open = true
    }

    highlightRanges(ranges)

    const rangeRect = ranges[0].getBoundingClientRect()
    const scrollRect = scrollElement.getBoundingClientRect()
    // Sit the match a third of the way down rather than flush against the top, both to mirror
    // what the browser does natively and to clear the reader's top fade.
    const top = rangeRect.top - scrollRect.top + scrollElement.scrollTop - scrollElement.clientHeight / 3
    scrollElement.scrollTo({ top: Math.max(0, top) })

    return true
}
