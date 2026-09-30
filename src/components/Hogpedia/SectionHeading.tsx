import React from 'react'
import Slugger from 'github-slugger'
import { useHogpediaArticle, articleSourceUrls } from './context'

/**
 * A section heading with the bracketed `[edit]` link MonoBook put beside every one.
 *
 * The link opens the GitHub editor for the article's own file, so it genuinely edits the
 * section it sits next to. The heading id comes from `github-slugger`, the same package
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
    const Heading = ({ children, id }: { children?: React.ReactNode; id?: string }): JSX.Element => {
        const article = useHogpediaArticle()
        const urls = articleSourceUrls(article?.filePath)
        slugger.reset()
        const anchor = id || slugger.slug(textOf(children))

        return (
            <Tag id={anchor}>
                <span>{children}</span>
                {urls && (
                    <span className="hp-editsection">
                        [
                        <a href={urls.edit} target="_blank" rel="noreferrer">
                            edit
                        </a>
                        ]
                    </span>
                )}
            </Tag>
        )
    }
    Heading.displayName = `HogpediaHeading${Tag}`
    return Heading
}
