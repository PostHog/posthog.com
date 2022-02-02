import { MDXProvider } from '@mdx-js/react'
import { Blockquote } from 'components/BlockQuote'
import { CodeBlock } from 'components/CodeBlock'
import { InlineCode } from 'components/InlineCode'
import { ZoomImage } from 'components/ZoomImage'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import React from 'react'
import { shortcodes } from '../../mdxGlobalComponents'
import Avatar from './Avatar'

const Reply = ({ avatar, name, childMdx, teamMember }) => {
    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: CodeBlock,
        img: ZoomImage,
        ...shortcodes,
    }
    return (
        <div className="bg-gray-accent-light dark:bg-gray-accent-dark p-4 rounded-md w-full mt-3">
            <div className="flex space-x-2 items-center">
                <Avatar image={teamMember?.frontmatter?.headshot || avatar} />
                <p className="m-0 text-[14px] font-semibold">
                    <span>{teamMember?.frontmatter?.name || name}</span>
                    <span className="opacity-50">, {teamMember?.frontmatter?.jobTitle || 'Contributor'}</span>
                </p>
            </div>
            <div className="my-3">
                <MDXProvider components={components}>
                    <MDXRenderer>{childMdx.body}</MDXRenderer>
                </MDXProvider>
            </div>
        </div>
    )
}

export default function Question({ question }) {
    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: CodeBlock,
        img: ZoomImage,
        ...shortcodes,
    }
    const { avatar, childMdx, name } = question[0]
    return (
        <div className="flex items-start space-x-4 w-full">
            <Avatar image={avatar} />
            <div className="flex-grow max-w-[405px]">
                <div>
                    <MDXProvider components={components}>
                        <MDXRenderer>{childMdx.body}</MDXRenderer>
                    </MDXProvider>
                </div>
                <p className="text-[14px] font-semibold opacity-50 mb-3">by {name}</p>
                {question.length > 1 && question.slice(1).map((reply, index) => <Reply key={index} {...reply} />)}
            </div>
        </div>
    )
}
