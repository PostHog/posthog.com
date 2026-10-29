import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import ReactMarkdown, { Components } from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import { ZoomImage } from 'components/ZoomImage'
import { TransformImage } from 'react-markdown/lib/ast-to-react'
import remarkGfm from 'remark-gfm'
import { cn } from '../../../utils'
import { ReferenceLink } from './References'

const replaceMentions = (body: string) => {
    return body.replace(/(^|[^\w.@/])@([a-zA-Z0-9_-]+\/[0-9]+|max\b)/g, (_match, before, username) => {
        if (username === 'max') {
            return `${before}[@max](/community/profiles/${process.env.GATSBY_AI_PROFILE_ID})`
        }
        return `${before}[@${username}](/community/profiles/${username.split('/')[1]})`
    })
}

export const Markdown = ({
    children,
    transformImageUri,
    allowedElements,
    regularText,
    className,
    components,
}: {
    children: string
    transformImageUri?: TransformImage | undefined
    allowedElements?: string[]
    regularText?: 'false'
    className?: string
    components?: Partial<Components>
}) => {
    return (
        // transformImageUri is safe, rehypeSanitize sanitizes all HTML output
        // nosemgrep: typescript.react.security.react-markdown-insecure-html.react-markdown-insecure-html
        <ReactMarkdown
            allowedElements={allowedElements}
            remarkPlugins={[remarkGfm]}
            transformImageUri={transformImageUri}
            rehypePlugins={[rehypeSanitize]}
            className={cn(
                'markdown prose dark:prose-invert prose-sm max-w-full text-primary [&_a]:font-semibold break-words [overflow-wrap:anywhere]',
                !regularText,
                className
            )}
            components={{
                pre: ({ children }) => {
                    return (
                        <>
                            <Highlight
                                {...defaultProps}
                                code={(children[0] as any)?.props?.children[0]}
                                language={'js' as Language}
                            >
                                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                                    <pre className={`${className} whitespace-pre-wrap`} style={style}>
                                        {tokens.map((line, i) => (
                                            <div key={i} {...getLineProps({ line, key: i })}>
                                                {line.map((token, key) => (
                                                    <span key={key} {...getTokenProps({ token, key })} />
                                                ))}
                                            </div>
                                        ))}
                                    </pre>
                                )}
                            </Highlight>
                        </>
                    )
                },
                code: ({ node, ...props }) => {
                    return <code {...props} className="break-all inline-block" />
                },
                a: ReferenceLink,
                img: ZoomImage,
                ...components,
            }}
        >
            {replaceMentions(children)}
        </ReactMarkdown>
    )
}

export default Markdown
