import { useStaticQuery, graphql } from 'gatsby'
import { HogpediaArticleSummary, onlyArticles } from './data'

export const LORE_PAGE = '/handbook/company/lore'

export type LoreFact = {
    /** The fact, as Markdown. Any links it carries render through `MdxLinks`. */
    text: string
    /** The page the parenthetical after the fact points at. */
    to: string
    /** The label for that link. */
    label: string
}

/**
 * Rewrites one handbook lore bullet as plain Markdown.
 *
 * The handbook page is MDX, so a bullet can hold `<Emoji>`, `<TeamMember>` and raw HTML
 * anchors. Hogpedia's article template deliberately does not register the site's MDX
 * components — they carry site design tokens and would look wrong in a 2007 skin — so each
 * one is reduced to the text or Markdown it stands for.
 */
const toMarkdown = (bullet: string): string =>
    bullet
        .replace(/<Emoji[^>]*\/>/g, '')
        .replace(/<TeamMember\s+name="([^"]+)"[^>]*\/>/g, '$1')
        .replace(/<a\s+href="([^"]+)"[^>]*>([^<]*)<\/a>/g, '[$2]($1)')
        .replace(/<\/?(?:em|strong|b|i)>/g, '')
        .replace(/\s+/g, ' ')
        .replace(/\s+([.,;:?!])/g, '$1')
        // Two emojis separated by a slash leave the slash behind.
        .replace(/^[\s/]+/, '')
        .trim()

/**
 * The Hogpedia article a fact is about, when there is one.
 *
 * Single-word titles are skipped: "PostHog" and "Experiments" appear in nearly every lore
 * entry and would send every fact to the same article.
 */
const matchArticle = (text: string, articles: HogpediaArticleSummary[]): HogpediaArticleSummary | undefined => {
    const haystack = text.toLowerCase()
    return onlyArticles(articles)
        .filter((article) => article.title.trim().includes(' '))
        .sort((a, b) => b.title.length - a.title.length)
        .find((article) => haystack.includes(article.title.toLowerCase()))
}

/**
 * The facts on the handbook's lore page, for the Main Page's "Did you know…" module.
 *
 * Reading the handbook means the module grows whenever somebody adds a joke to the real
 * page, instead of being a copy that drifts. A bullet is dropped when it still holds markup
 * after the rewrite above, or when it opens in lower case — those read as the continuation
 * of an emoji that has just been removed, so they no longer stand on their own.
 */
export const useLoreFacts = (articles: HogpediaArticleSummary[]): LoreFact[] => {
    const data = useStaticQuery(graphql`
        query HogpediaLoreFacts {
            lore: allMdx(filter: { fields: { slug: { regex: "//handbook/company/lore/?$/" } } }) {
                nodes {
                    rawBody
                }
            }
        }
    `)

    const raw: string = data?.lore?.nodes?.[0]?.rawBody || ''

    return raw
        .split('\n')
        .filter((line) => /^\s*\*\s+/.test(line))
        .map((line) => toMarkdown(line.replace(/^\s*\*\s+/, '')))
        .filter((text) => text.length > 40 && !/[<>]/.test(text) && /^[A-Z0-9]/.test(text))
        .map((text) => {
            const article = matchArticle(text, articles)
            return {
                text,
                to: article ? article.slug : LORE_PAGE,
                label: article ? article.title : 'PostHog lore',
            }
        })
}
