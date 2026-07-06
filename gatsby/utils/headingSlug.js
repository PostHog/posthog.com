// Shared helpers for turning heading text into anchor slugs.
//
// Some headings embed inline markup (an icon <span>, a beta label, etc.). Left
// untouched, that markup leaks into generated anchor IDs — e.g. a heading like
// `## <span ...><IconToggle /></span> Feature flags` would produce an ID like
// `span-classnameinline-blockicontoggle-...-feature-flags` instead of
// `feature-flags`. Stripping the markup before slugging keeps section links clean
// and consistent across the element ID, the table of contents, and search.

const GithubSlugger = require('github-slugger')

// Matches a balanced pair of inline HTML/JSX tags, e.g. `<span ...>...</span>`.
// Kept identical to the regex used by `formatToc` in gatsby/createPages.ts so the
// element ID, the sidebar table of contents, and Algolia fragments all agree.
const INLINE_MARKUP_REGEX = /\s*<([a-z]+).+?>.+?<\/\1>/g

// Remove inline markup and trim, so a heading like `<span>...</span> Feature flags`
// yields `Feature flags` rather than ` Feature flags` (a leading space would otherwise
// slug to `-feature-flags`). The removal is applied to a fixed point (repeat until the
// string stops changing) so nested or adjacent tags can't leave a partial tag behind.
const stripHeadingMarkup = (value = '') => {
    if (typeof value !== 'string') {
        return ''
    }
    let result = value
    let previous
    do {
        previous = result
        result = result.replace(INLINE_MARKUP_REGEX, '')
    } while (result !== previous)
    return result.trim()
}

// Slugify a heading's text, ignoring any inline markup it contains. Pass an
// existing GithubSlugger instance to keep per-page de-duplication counters in sync.
const slugifyHeading = (value, slugger = new GithubSlugger()) => slugger.slug(stripHeadingMarkup(value))

module.exports = { stripHeadingMarkup, slugifyHeading, INLINE_MARKUP_REGEX }
