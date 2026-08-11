/**
 * Parsing and matching for text fragment (`#:~:text=`) links. Covers the shapes browsers and
 * search engines actually generate, plus the whitespace/case differences between a directive
 * copied off the rendered page and the DOM text it has to match.
 *
 * Run with `node --test src/lib/textFragment.test.ts`.
 */
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'
import { JSDOM } from 'jsdom'

import {
    findTextDirectiveRanges,
    locateDirective,
    normalizeText,
    parseFragmentDirective,
    readLandingTextDirectives,
    revealRange,
    stripFragmentDirective,
} from './textFragment.ts'

describe('parseFragmentDirective', () => {
    test('ignores fragments with no directive', () => {
        assert.deepEqual(parseFragmentDirective(''), [])
        assert.deepEqual(parseFragmentDirective('#creating-feature-flags'), [])
    })

    test('reads textStart on its own', () => {
        assert.deepEqual(parseFragmentDirective('#:~:text=By%20default'), [
            { prefix: undefined, textStart: 'By default', textEnd: undefined, suffix: undefined },
        ])
    })

    test('reads a directive that follows an element id', () => {
        assert.deepEqual(parseFragmentDirective('#payloads:~:text=flag%20payloads'), [
            { prefix: undefined, textStart: 'flag payloads', textEnd: undefined, suffix: undefined },
        ])
    })

    test('reads prefix, textEnd, and suffix', () => {
        assert.deepEqual(parseFragmentDirective('#:~:text=flags-,are%20disabled,for%20everyone,-until'), [
            { prefix: 'flags', textStart: 'are disabled', textEnd: 'for everyone', suffix: 'until' },
        ])
    })

    test('keeps percent-encoded commas and dashes out of the grammar', () => {
        assert.deepEqual(parseFragmentDirective('#:~:text=%2Dwell%2C%20actually'), [
            { prefix: undefined, textStart: '-well, actually', textEnd: undefined, suffix: undefined },
        ])
    })

    test('reads multiple directives and skips non-text ones', () => {
        assert.deepEqual(
            parseFragmentDirective('#:~:text=first&unknown=x&text=second').map(({ textStart }) => textStart),
            ['first', 'second']
        )
    })

    test('drops directives with no textStart', () => {
        assert.deepEqual(parseFragmentDirective('#:~:text='), [])
        assert.deepEqual(parseFragmentDirective('#:~:text=a,b,c,d,e'), [])
    })
})

describe('stripFragmentDirective', () => {
    test('returns the element id, if any', () => {
        assert.equal(stripFragmentDirective('#payloads'), 'payloads')
        assert.equal(stripFragmentDirective('#payloads:~:text=anything'), 'payloads')
        assert.equal(stripFragmentDirective('#:~:text=anything'), '')
        assert.equal(stripFragmentDirective(''), '')
    })
})

describe('readLandingTextDirectives', () => {
    // Node exposes no 'navigation' performance entry, so there is never a landing directive to
    // find here – which is also what a browser sees on every navigation that carries no fragment.
    test('finds nothing without a navigation entry to read', () => {
        assert.deepEqual(readLandingTextDirectives('', '/docs/feature-flags'), [])
        assert.deepEqual(readLandingTextDirectives('#payloads', '/docs/feature-flags'), [])
    })
})

describe('locateDirective', () => {
    // What `flattenText` hands the matcher: whitespace collapsed, lowercased.
    const page = normalizeText(`
        Creating feature flags

        By default, feature flags are disabled for everyone until you roll them out.
        Payloads let you attach data to a flag. By default, payloads are empty.
    `)

    const matched = (directive: Parameters<typeof locateDirective>[1]) => {
        const match = locateDirective(page, directive)
        return match && page.slice(match[0], match[1])
    }

    test('matches across the source newlines and indentation MDX leaves behind', () => {
        assert.equal(matched({ textStart: 'Creating feature flags By default' }), 'creating feature flags by default')
    })

    test('matches case-insensitively', () => {
        assert.equal(matched({ textStart: 'ROLL THEM OUT' }), 'roll them out')
    })

    test('spans textStart to textEnd', () => {
        assert.equal(
            matched({ textStart: 'feature flags are', textEnd: 'everyone' }),
            'feature flags are disabled for everyone'
        )
    })

    test('uses prefix to pick between repeated phrases', () => {
        const match = locateDirective(page, { prefix: 'a flag.', textStart: 'By default' })
        assert.ok(match)
        assert.equal(page.slice(match[0]), 'by default, payloads are empty.')
    })

    test('uses suffix to pick between repeated phrases', () => {
        const match = locateDirective(page, { textStart: 'By default', suffix: ', payloads' })
        assert.ok(match)
        assert.equal(page.slice(match[0]), 'by default, payloads are empty.')
    })

    test('keeps looking for a textEnd that the suffix follows', () => {
        // "flags" could close the range twice; only the second occurrence is followed by "are".
        assert.equal(
            matched({ textStart: 'Creating', textEnd: 'flags', suffix: 'are disabled' }),
            'creating feature flags by default, feature flags'
        )
    })

    test('returns null when the text, prefix, or suffix is absent', () => {
        assert.equal(locateDirective(page, { textStart: 'session replay' }), null)
        assert.equal(locateDirective(page, { prefix: 'nowhere', textStart: 'By default' }), null)
        assert.equal(locateDirective(page, { textStart: 'By default', suffix: 'nowhere' }), null)
        assert.equal(locateDirective(page, { textStart: 'By default', textEnd: 'nowhere' }), null)
    })

    test('returns null for an empty page or an empty directive', () => {
        assert.equal(locateDirective('', { textStart: 'anything' }), null)
        assert.equal(locateDirective(page, { textStart: '   ' }), null)
    })
})

describe('findTextDirectiveRanges', () => {
    // Shaped like MDX rendered by React: inline elements mid-sentence, the markdown source's
    // newlines and indentation inside the text nodes, and – the part that matters – no whitespace
    // at all between block elements, because JSX drops it.
    const dom = new JSDOM(
        '<div id="content">' +
            '<h2 id="release-conditions">Release\n           conditions</h2>' +
            '<p>By <em>default</em>, feature flags are\n           disabled for ' +
            '<strong>everyone</strong> until you roll them out.</p>' +
            '<p>Payloads let you attach data to a flag. By default, payloads are empty.</p>' +
            '<ul><li>First bullet</li><li>Second bullet</li></ul>' +
            '<details><summary>More</summary><p>Hidden until opened text.</p></details>' +
            '<p hidden>Should never match hidden text.</p>' +
            "<script>var x = 'should never match script text'</script>" +
            '</div>'
    )

    // `lib/textFragment` only touches the DOM inside these functions, so handing it jsdom's
    // globals after import is enough.
    global.document = dom.window.document
    global.NodeFilter = dom.window.NodeFilter

    const root = dom.window.document.getElementById('content') as unknown as HTMLElement
    const find = (fragment: string) => findTextDirectiveRanges(root, parseFragmentDirective(fragment))
    const matched = (fragment: string) => find(fragment).map((range) => range.toString())

    test('matches across inline elements and the newlines MDX leaves in text nodes', () => {
        assert.deepEqual(matched('#:~:text=By%20default%2C%20feature%20flags%20are%20disabled'), [
            'By default, feature flags are\n           disabled',
        ])
        assert.deepEqual(matched('#:~:text=Release%20conditions'), ['Release\n           conditions'])
    })

    test('spans textStart to textEnd', () => {
        assert.deepEqual(matched('#:~:text=feature%20flags,everyone'), [
            'feature flags are\n           disabled for everyone',
        ])
    })

    // Block elements arrive with no whitespace between them, so the matcher inserts a separator –
    // hence the words being glued together in the range's own text.
    test('matches text spanning two blocks', () => {
        assert.deepEqual(matched('#:~:text=conditions%20By%20default'), ['conditionsBy default'])
        assert.deepEqual(matched('#:~:text=roll%20them%20out.%20Payloads'), ['roll them out.Payloads'])
        assert.deepEqual(matched('#:~:text=First%20bullet%20Second%20bullet'), ['First bulletSecond bullet'])
    })

    test('uses prefix or suffix to land on the second of two identical phrases', () => {
        for (const fragment of ['#:~:text=a%20flag.-,By%20default', '#:~:text=By%20default,-%2C%20payloads']) {
            const [range] = find(fragment)
            assert.equal(range.toString(), 'By default')
            assert.match(range.startContainer.textContent ?? '', /^Payloads let you/)
        }
    })

    test('returns a range per directive, in directive order', () => {
        assert.deepEqual(matched('#:~:text=Payloads&text=roll%20them%20out'), ['Payloads', 'roll them out'])
    })

    test('ends the range on the last matched character', () => {
        const [range] = find('#:~:text=roll%20them%20out')
        assert.equal(range.toString(), 'roll them out')
        assert.equal(range.endContainer.nodeValue?.slice(range.endOffset), '.')
    })

    test('skips hidden subtrees and script text, and drops directives that match nothing', () => {
        assert.deepEqual(matched('#:~:text=session%20replay'), [])
        assert.deepEqual(matched('#:~:text=match%20hidden%20text'), [])
        assert.deepEqual(matched('#:~:text=match%20script%20text'), [])
    })

    test('matches inside a collapsed <details>, which revealRange then opens', () => {
        const ranges = find('#:~:text=Hidden%20until%20opened')
        const details = dom.window.document.querySelector('details')
        assert.equal(ranges.length, 1)
        assert.equal(details?.open, false)
        ranges.forEach(revealRange)
        assert.equal(details?.open, true)
    })
})
