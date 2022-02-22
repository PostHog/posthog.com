import { MDXProvider } from '@mdx-js/react'
import { Blockquote } from 'components/BlockQuote'
import { CodeBlock } from 'components/CodeBlock'
import { InlineCode } from 'components/InlineCode'
import Link from 'components/Link'
import { ZoomImage } from 'components/ZoomImage'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import Avatar from './Avatar'

export const Days = ({ ts, url }) => {
    const days = Number(ts)
    return (
        <Link
            to={url}
            className="font-normal ml-2 text-black hover:text-black dark:text-white dark:hover:text-white opacity-30"
        >
            {ts} day{days === 1 ? '' : 's'} ago
        </Link>
    )
}

export const Reply = ({ avatar, name, childMdx, teamMember, ts, parentId, id, className = '' }) => {
    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: CodeBlock,
        img: ZoomImage,
    }
    return (
        <div id={id} className={`py-4 rounded-md w-full mt-3 ${className}`}>
            <div className="flex space-x-4 items-start">
                <Avatar image={teamMember?.frontmatter?.headshot || avatar} />
                <div className="min-w-0">
                    <p className="m-0 text-[14px] font-semibold text-black dark:text-white">
                        <span>{teamMember?.frontmatter?.name || name}</span>
                        <span className="opacity-50">, {teamMember?.frontmatter?.jobTitle || 'Contributor'}</span>
                        <Days ts={ts} url={`/questions/${parentId}#${id}`} />
                    </p>
                    <div className="my-3">
                        <MDXProvider components={components}>
                            <MDXRenderer>{childMdx.body}</MDXRenderer>
                        </MDXProvider>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Question({ question, id }) {
    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: CodeBlock,
        img: ZoomImage,
    }
    const { avatar, childMdx, name, ts } = question[0]
    return (
        <div className="flex items-start space-x-4 w-full">
            <Avatar image={avatar} />
            <div className="flex-grow max-w-[405px]">
                <div>
                    <MDXProvider components={components}>
                        <MDXRenderer>{childMdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
                <p className="text-[14px] mb-3 text-black dark:text-white">
                    <span className="font-semibold opacity-50">by {name}</span>{' '}
                    <Days ts={ts} url={`/questions/${id}`} />
                </p>
                {question.length > 1 &&
                    question.slice(1).map((reply, index) => <Reply key={index} parentId={id} {...reply} />)}
            </div>
        </div>
    )
}
