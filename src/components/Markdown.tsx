import React from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import Link from 'components/Link'

interface MarkdownProps {
    children: string
    className?: string
    components?: Partial<Components>
}

export const Markdown = ({ children, className, components }: MarkdownProps) => {
    const markdown = (
        <ReactMarkdown
            components={{
                a: ({ node, ...props }) => <Link {...props} />,
                ...components,
            }}
        >
            {children}
        </ReactMarkdown>
    )
    // react-markdown 9 dropped `className`; version 8 wrapped the output in a div for it.
    return className ? <div className={className}>{markdown}</div> : markdown
}

export default Markdown
