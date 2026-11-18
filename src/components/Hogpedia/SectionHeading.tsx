import React from 'react'
import Slugger from 'github-slugger'
import Link from 'components/Link'
import { useHogpediaArticle, articleSourceUrls } from './context'

/**
 * A section heading with the bracketed `[edit]` link MonoBook put beside every one.
 *
 * The link opens the page the section was written from — the handbook or docs page it
 * cites — because that is where a correction has to land. Editing the Hogpedia article
 * instead would fix this mirror and leave the source saying the old thing. Where a section
 * cites no first-party page, it falls back to the article's own source, and then to the
 * GitHub editor for the file.
 *
 * The heading id comes from `github-slugger`, the same package
 * `gatsby-remark-autolink-headers` uses, so the Contents box anchors match.
 */
const slugger = new Slugger()

const textOf = (node: React.ReactNode): string => {
    if (node === null || node === undefined || typeof node === 'boolean') {
        return ''
    }
    if (typeof node === 'string' || typeof node === 'number') {
        return String(node)
    }
    if (Array.isArray(node)) {
        return node.map(textOf).join('')
    }
    if (React.isValidElement(node)) {
        return textOf((node.props as { children?: React.ReactNode }).children)
    }
    return ''
}

export const makeSectionHeading = (Tag: 'h2' | 'h3' | 'h4') => {
    const Heading = ({
        children,
        id,
        noEdit,
    }: {
        children?: React.ReactNode
        id?: string
        /**
         * For a heading the template generates rather than the author writes – "See also",
         * "References", "External links". Those are built from frontmatter, so there is no
         * passage of prose behind them to correct.
         */
        noEdit?: boolean
    }): JSX.Element => {
        const article = useHogpediaArticle()
        const urls = articleSourceUrls(article?.filePath)
        slugger.reset()
        const anchor = id || slugger.slug(textOf(children))

        const source = noEdit ? undefined : article?.sectionSources?.[anchor] || article?.primarySource
        const href = noEdit ? undefined : source || urls?.edit

        return (
            <Tag id={anchor}>
                <span>{children}</span>
                {href && (
                    <span className="hp-editsection">
                        [
                        {source ? (
                            <Link to={source} title="Edit this section where it is written">
                                edit
                            </Link>
                        ) : (
                            <a href={href} target="_blank" rel="noreferrer" title="Edit this page on GitHub">
                                edit
                            </a>
                        )}
                        ]
                    </span>
                )}
            </Tag>
        )
    }
    Heading.displayName = `HogpediaHeading${Tag}`
    return Heading
}
