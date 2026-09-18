import React from 'react'
import ReactMarkdown, { Components } from 'react-markdown'
import Link from 'components/Link'

interface MarkdownProps {
    children: string
    className?: string
    components?: Partial<Components>
}

export const Markdown = ({ children, className, components }: MarkdownProps) => {
    return (
        <ReactMarkdown
            className={className}
            components={{
                a: ({ node, ...props }) => <Link {...props} />,
                ...components,
            }}
        >
            {children}
        </ReactMarkdown>
    )
}

export default Markdown
