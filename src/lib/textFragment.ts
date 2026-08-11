/**
 * Text fragment (`#:~:text=`) support for reader pages.
 *
 * Native text fragments never work on this site, for two independent reasons:
 *
 * 1. The MDX body is rendered on the client, so at the point the browser runs its text-fragment
 *    search the document only holds the title and the table of contents — there is nothing to
 *    match against.
 * 2. Reader content scrolls inside a Radix `ScrollArea.Viewport`, not the document, which is the
 *    same reason `ElementScrollLink` and `ScrollToElement` hand-roll `#id` scrolling.
 *
 * So we re-implement the useful subset of the Scroll To Text Fragment spec ourselves: read the
 * directive off the URL, find the text once the content has rendered, paint it with the CSS Custom
 * Highlight API (no DOM mutation, so it can't fight React or mark.js), and scroll the viewport.
 */

/** A single parsed `text=` directive: `[prefix-,]textStart[,textEnd][,-suffix]`. */
export interface TextDirective {
    prefix?: string
    textStart: string
    textEnd?: string
    suffix?: string
}

const FRAGMENT_DIRECTIVE_DELIMITER = ':~:'
const TEXT_DIRECTIVE_PREFIX = 'text='
const HIGHLIGHT_NAME = 'text-fragment'

const decode = (value: string): string => {
    try {
        return decodeURIComponent(value)
    } catch {
        // A malformed escape sequence is worth matching literally rather than throwing away.
        return value
    }
}

/**
 * Lowercase a single character, unless its lowercase form isn't a single character (e.g. `İ`).
 * Callers rely on case folding being length-preserving to map indexes in the folded string back to
 * text node offsets.
 */
const foldCase = (char: string): string => {
    const lower = char.toLowerCase()
    return lower.length === char.length ? lower : char
}

/**
 * Lowercase and collapse whitespace so a directive copied from the rendered page still matches DOM
 * text that carries MDX's source newlines and indentation.
 */
export const normalizeText = (value: string): string => Array.from(value.replace(/\s+/g, ' ').trim(), foldCase).join('')

const parseTextDirective = (value: string): TextDirective | null => {
    // Commas inside the text itself are percent-encoded, so splitting on the raw character is
    // safe – and splitting before decoding is what keeps an encoded `-` from reading as a
    // prefix/suffix marker.
    const parts = value.split(',')
    let prefix: string | undefined
    let suffix: string | undefined

    if (parts.length > 1 && parts[0].endsWith('-')) {
        prefix = parts.shift()?.slice(0, -1)
    }
    if (parts.length > 1 && parts[parts.length - 1].startsWith('-')) {
        suffix = parts.pop()?.slice(1)
    }
    if (parts.length > 2 || !parts[0]) return null

    return {
        prefix: prefix ? decode(prefix) : undefined,
        textStart: decode(parts[0]),
        textEnd: parts[1] ? decode(parts[1]) : undefined,
        suffix: suffix ? decode(suffix) : undefined,
    }
}

/** Pull every `text=` directive out of a URL fragment (`#anything:~:text=a&text=b`). */
export const parseFragmentDirective = (fragment: string): TextDirective[] => {
    const delimiterIndex = fragment.indexOf(FRAGMENT_DIRECTIVE_DELIMITER)
    if (delimiterIndex === -1) return []

    return fragment
        .slice(delimiterIndex + FRAGMENT_DIRECTIVE_DELIMITER.length)
        .split('&')
        .filter((directive) => directive.startsWith(TEXT_DIRECTIVE_PREFIX))
        .map((directive) => parseTextDirective(directive.slice(TEXT_DIRECTIVE_PREFIX.length)))
        .filter((directive): directive is TextDirective => directive !== null)
}

/** Everything before the fragment directive – the plain `#id` part of a hash, if any. */
export const stripFragmentDirective = (hash: string): string =>
    hash.split(FRAGMENT_DIRECTIVE_DELIMITER)[0].replace(/^#/, '')

interface NavigationDirective {
    pathname: string
    /** The plain `#id` the landing URL carried alongside the directive, usually empty. */
    elementId: string
    directives: TextDirective[]
}

let navigationDirective: NavigationDirective | null | undefined

/**
 * Browsers strip the fragment directive from the URL before any script runs, so `location.hash`
 * can't see it. The Navigation Timing entry still holds the URL the browser was handed, which is
 * the only surface that exposes it today (Chrome and Firefox; Safari 18+ scrubs it there too, and
 * the standardised replacement hasn't landed yet). Read once and cached – the entry is immutable,
 * and keeping it readable rather than consuming it keeps repeat effect runs idempotent.
 */
const getNavigationDirective = (): NavigationDirective | null => {
    if (navigationDirective === undefined) {
        navigationDirective = null
        try {
            const entry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
            if (entry?.name) {
                const { pathname, hash } = new URL(entry.name)
                const directives = parseFragmentDirective(hash)
                if (directives.length) {
                    navigationDirective = { pathname, elementId: stripFragmentDirective(hash), directives }
                }
            }
        } catch {
            // Navigation Timing is unavailable, or the entry name isn't a parseable URL.
        }
    }
    return navigationDirective
}

const normalizePath = (path: string): string => path.split(/[?#]/)[0].replace(/\/+$/, '') || '/'

/**
 * Text directives from the URL the browser loaded, if that's still the location being rendered.
 *
 * In-app (pushState) navigations keep the directive in the hash, so `parseFragmentDirective` is
 * enough for those; this is the fallback for the navigation that actually stripped it. Callers must
 * apply it at most once – it stays readable for the life of the page, so anything that re-reads it
 * later (a table of contents click, another window navigating) would get yanked back to it.
 */
export const readLandingTextDirectives = (hash: string, path: string): TextDirective[] => {
    const navigation = getNavigationDirective()
    const isLandingLocation =
        navigation &&
        normalizePath(navigation.pathname) === normalizePath(path) &&
        stripFragmentDirective(hash) === navigation.elementId

    return isLandingLocation ? navigation.directives : []
}

/**
 * Resolve `directive` against `text`, which must already be `normalizeText`ed, and return the
 * `[start, end)` index pair of the match.
 *
 * Simplification of the spec's algorithm: it searches plain text rather than walking block
 * boundaries, and treats `prefix`/`suffix` as needing to sit next to the match with at most
 * collapsed whitespace between. That covers the links browsers and search engines generate.
 */
export const locateDirective = (text: string, directive: TextDirective): [number, number] | null => {
    const textStart = normalizeText(directive.textStart)
    if (!text || !textStart) return null

    const textEnd = normalizeText(directive.textEnd ?? '')
    const prefix = normalizeText(directive.prefix ?? '')
    const suffix = normalizeText(directive.suffix ?? '')
    // Whitespace is collapsed on both sides, so there is at most one space to step over.
    const skipSpace = (index: number) => (text[index] === ' ' ? index + 1 : index)
    const suffixFollows = (end: number) => !suffix || text.startsWith(suffix, skipSpace(end))

    let from = 0
    while (from <= text.length) {
        let start: number
        if (prefix) {
            const prefixIndex = text.indexOf(prefix, from)
            if (prefixIndex === -1) return null
            from = prefixIndex + 1
            start = skipSpace(prefixIndex + prefix.length)
            if (!text.startsWith(textStart, start)) continue
        } else {
            start = text.indexOf(textStart, from)
            if (start === -1) return null
            from = start + 1
        }

        if (!textEnd) {
            if (suffixFollows(start + textStart.length)) return [start, start + textStart.length]
            continue
        }
        // Any occurrence of textEnd after textStart can close the range, so keep trying later ones
        // until the suffix lines up – the first one often sits inside the passage being linked to.
        for (
            let endIndex = text.indexOf(textEnd, start + textStart.length);
            endIndex !== -1;
            endIndex = text.indexOf(textEnd, endIndex + 1)
        ) {
            if (suffixFollows(endIndex + textEnd.length)) return [start, endIndex + textEnd.length]
        }
    }
    return null
}

const SKIPPED_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE', 'TEXTAREA', 'SELECT'])

// JSX drops the whitespace between element children, so React renders `</h2><p>` and `</li><li>`
// with no text node in between. Without a synthetic separator at each block boundary, a directive
// that spans two blocks – what a browser emits for a short selection covering a heading and the
// sentence under it – would have to match text with the words glued together.
const BLOCK_SELECTOR =
    'address, article, aside, blockquote, dd, details, div, dl, dt, fieldset, figcaption, figure,' +
    ' footer, form, h1, h2, h3, h4, h5, h6, header, hr, li, main, nav, ol, p, pre, section, summary,' +
    ' table, td, th, tr, ul'

/**
 * Flatten a container's rendered text into a normalized string, keeping a text node + offset for
 * every character so a match can be turned back into a `Range`.
 */
const flattenText = (root: HTMLElement): { text: string; positions: { node: Text; offset: number }[] } => {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
            const parent = node.parentElement
            if (!parent || SKIPPED_TAGS.has(parent.tagName)) return NodeFilter.FILTER_REJECT
            // Collapsed <details> stay in – they're opened before scrolling, matching how the
            // `#id` path and the browser's own text fragments treat them.
            if (parent.closest('[hidden], [aria-hidden="true"]')) return NodeFilter.FILTER_REJECT
            return NodeFilter.FILTER_ACCEPT
        },
    })

    let text = ''
    const positions: { node: Text; offset: number }[] = []
    let pendingSpace = false
    let currentBlock: Element | null = null

    for (let node = walker.nextNode() as Text | null; node; node = walker.nextNode() as Text | null) {
        const block = node.parentElement?.closest(BLOCK_SELECTOR) ?? null
        if (block !== currentBlock) {
            currentBlock = block
            pendingSpace = pendingSpace || text.length > 0
        }

        const value = node.nodeValue ?? ''
        for (let offset = 0; offset < value.length; offset++) {
            const char = value[offset]
            if (/\s/.test(char)) {
                // Runs of whitespace – including across text nodes – collapse to one space, and
                // leading whitespace is dropped, so the string matches what a reader would copy.
                pendingSpace = text.length > 0
                continue
            }
            if (pendingSpace) {
                text += ' '
                positions.push({ node, offset })
                pendingSpace = false
            }
            text += foldCase(char)
            positions.push({ node, offset })
        }
    }

    return { text, positions }
}

/**
 * Find each directive's text inside `root`, in directive order. Unmatched directives are dropped.
 *
 * Visibility isn't consulted beyond the `hidden` attribute, so `root` should be the content itself:
 * pass a container that repeats the same text twice (an in-page table of contents, say) and a
 * directive can resolve to the copy rather than the real thing.
 */
export const findTextDirectiveRanges = (root: HTMLElement, directives: TextDirective[]): Range[] => {
    if (!directives.length) return []
    const { text, positions } = flattenText(root)

    return directives.reduce<Range[]>((ranges, directive) => {
        const match = locateDirective(text, directive)
        if (!match) return ranges

        const [start, end] = match
        const range = document.createRange()
        range.setStart(positions[start].node, positions[start].offset)
        // A match never ends on the collapsed space emitted between two text nodes (directives are
        // trimmed), so the last character always sits in its own node at `offset + 1`.
        range.setEnd(positions[end - 1].node, positions[end - 1].offset + 1)
        return [...ranges, range]
    }, [])
}

/** Expand any collapsed `<details>` wrapping a match so it can actually be seen. */
export const revealRange = (range: Range): void => {
    let element = range.startContainer.parentElement
    while (element) {
        const details = element.closest('details')
        if (!details) return
        details.open = true
        element = details.parentElement
    }
}

/**
 * Paint matches with the CSS Custom Highlight API, styled by `::highlight(text-fragment)`. Where
 * it isn't supported the reader still gets scrolled to the right place, just without the highlight.
 */
export const highlightTextFragment = (ranges: Range[]): void => {
    if (typeof CSS === 'undefined' || !CSS.highlights || typeof Highlight === 'undefined') return
    CSS.highlights.set(HIGHLIGHT_NAME, new Highlight(...ranges))
}

export const clearTextFragmentHighlight = (): void => {
    if (typeof CSS === 'undefined' || !CSS.highlights) return
    CSS.highlights.delete(HIGHLIGHT_NAME)
}

/**
 * Scroll a match into view, leaving `spaceAbove` pixels of context above it. Prefers the enclosing
 * Radix ScrollArea viewport and falls back to the window, the same way `scrollToElement` does.
 */
export const scrollRangeIntoView = (range: Range, spaceAbove = 100): void => {
    const anchor = range.startContainer.parentElement
    if (!anchor) return

    // An empty rect means the range itself isn't laid out (e.g. a zero-height wrapper); the
    // element that holds the text is the next best target.
    const rangeRect = range.getBoundingClientRect()
    const targetRect = rangeRect.height || rangeRect.width ? rangeRect : anchor.getBoundingClientRect()

    const scrollViewport = anchor.closest('[data-radix-scroll-area-viewport]') as HTMLElement | null
    // In website mode the viewport exists but doesn't scroll – pages are full height.
    if (scrollViewport && scrollViewport.scrollHeight > scrollViewport.clientHeight) {
        const viewportRect = scrollViewport.getBoundingClientRect()
        scrollViewport.scrollTo({
            top: Math.max(0, targetRect.top - viewportRect.top + scrollViewport.scrollTop - spaceAbove),
            behavior: 'smooth',
        })
    } else {
        window.scrollTo({
            top: Math.max(0, targetRect.top + window.pageYOffset - spaceAbove),
            behavior: 'smooth',
        })
    }
}
