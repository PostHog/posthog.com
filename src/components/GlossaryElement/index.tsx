import { graphql, useStaticQuery } from 'gatsby'
import reactStringReplace from 'react-string-replace'
import React from 'react'
import pluralizeWord from 'pluralize'
import Tooltip from '../Tooltip'
import { CallToAction } from 'components/CallToAction'

const TooltipContent = ({ slug, description, title }) => {
    return (
        <div className="max-w-[320px] p-4">
            <h4 className="text-2xl m-0">{title}</h4>
            <p className="text-base m-0 mt-4">{description}</p>
            {slug && (
                <CallToAction size="sm" className="mt-6" width="full" to={slug}>
                    Learn more
                </CallToAction>
            )}
        </div>
    )
}

const escapeRegex = (str) => {
    // eslint-disable-next-line
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export default function GlossaryElement({ as = 'p', ...other }) {
    const { glossary } = useStaticQuery(query)
    const Element = as
    let children = other.children
    if (typeof other.children === 'string') {
        const regex = new RegExp(
            `(${glossary?.nodes
                .map(({ word, pluralize }) => {
                    const wordPlural = pluralize && pluralizeWord(word)
                    return `\\b${
                        wordPlural && wordPlural !== word ? `${escapeRegex(wordPlural)}\\b|` : ''
                    }${escapeRegex(word)}`
                })
                .join('\\b|')}\\b)`,
            'gi'
        )
        children = reactStringReplace(other.children, regex, (match, i) => {
            const glossaryItem = glossary?.nodes.find(
                ({ word, pluralize }) =>
                    word.toLowerCase() === match.toLowerCase() ||
                    (pluralize && word.toLowerCase() === pluralizeWord.singular(word).toLowerCase())
            )
            return (
                <Tooltip
                    className="border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark"
                    key={match + i}
                    content={
                        <TooltipContent
                            title={
                                glossaryItem?.page?.frontmatter?.title ||
                                glossaryItem?.word.charAt(0).toUpperCase() + glossaryItem?.word.slice(1)
                            }
                            description={glossaryItem?.description || glossaryItem?.page?.excerpt}
                            slug={glossaryItem?.slug}
                        />
                    }
                >
                    <span className="cursor-default">{match}</span>
                </Tooltip>
            )
        })
    }
    return <Element>{children}</Element>
}

const query = graphql`
    {
        glossary: allGlossaryJson {
            nodes {
                page {
                    frontmatter {
                        title
                    }
                    excerpt(pruneLength: 300)
                }
                word
                pluralize
                slug
                description
            }
        }
    }
`
