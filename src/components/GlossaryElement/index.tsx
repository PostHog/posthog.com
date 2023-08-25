import { graphql, useStaticQuery } from 'gatsby'
import reactStringReplace from 'react-string-replace'
import React, { useState } from 'react'
import pluralizeWord from 'pluralize'
import Tooltip from '../Tooltip'
import { CallToAction } from 'components/CallToAction'
import { Close } from 'components/Icons'

export interface TooltipContentProps {
    title: string
    slug: string
    description: string
    video?: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface MdxNode {
    frontmatter: {
        title: string
        featuredVideo: string
    }
    fields: {
        slug: string
    }
    excerpt: string
}

export const formatNode = (node: MdxNode) => ({
    title: node?.frontmatter?.title,
    slug: node?.fields?.slug,
    description: node?.excerpt,
    video: node?.frontmatter?.featuredVideo,
})

export const TooltipContent = ({ slug, description, title, video, setOpen }: TooltipContentProps) => {
    const [view, setView] = useState('article')
    return (
        title &&
        slug &&
        description && (
            <div className="w-[320px] p-4 relative">
                <button onClick={() => setOpen(false)} className="absolute top-2 right-1">
                    <Close opacity="100" className="w-3 h-3 opacity-40 hover:opacity-60 transition-opacity" />
                </button>
                {video && (
                    <div className="grid grid-cols-2 mb-4 pb-4 relative">
                        <button onClick={() => setView('article')} className="font-semibold">
                            Article
                        </button>
                        <button onClick={() => setView('video')} className="font-semibold">
                            Video
                        </button>
                        <span
                            className={`w-1/2 h-[2px] rounded-full bg-red absolute bottom-0 transition-all ${
                                view === 'article' ? 'translate-x-0' : 'translate-x-full'
                            }`}
                        />
                    </div>
                )}
                {view === 'article' ? (
                    <>
                        <h4 className="text-2xl m-0">{title}</h4>
                        <p className="text-base m-0 mt-4">{description}</p>
                        {slug && (
                            <CallToAction size="sm" className="mt-6" width="full" to={slug}>
                                Continue reading
                            </CallToAction>
                        )}
                    </>
                ) : (
                    <iframe className="aspect-video w-full m-0" src={video} />
                )}
            </div>
        )
    )
}

const escapeRegex = (str) => {
    // eslint-disable-next-line
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

export default function GlossaryElement({ as = 'p', ...other }) {
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
                    className=""
                    key={match + i}
                    content={() => (
                        <TooltipContent
                            title={
                                glossaryItem?.page?.frontmatter?.title ||
                                glossaryItem?.word.charAt(0).toUpperCase() + glossaryItem?.word.slice(1)
                            }
                            description={glossaryItem?.description || glossaryItem?.page?.excerpt}
                            slug={glossaryItem?.slug}
                        />
                    )}
                >
                    <span className="cursor-default">{match}</span>
                </Tooltip>
            )
        })
    }
    return <Element>{children}</Element>
}
