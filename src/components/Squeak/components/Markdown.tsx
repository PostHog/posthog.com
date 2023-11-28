import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import { ZoomImage } from 'components/ZoomImage'
import { TransformImage } from 'react-markdown/lib/ast-to-react'
import remarkGfm from 'remark-gfm'

export const Markdown = ({
    children,
    transformImageUri,
    allowedElements,
}: {
    children: string
    transformImageUri?: TransformImage | undefined
    allowedElements?: string[]
}) => {
    return (
        <ReactMarkdown
            allowedElements={allowedElements}
            remarkPlugins={[remarkGfm]}
            transformImageUri={transformImageUri}
            rehypePlugins={[rehypeSanitize]}
            className="question-content flex-1 !text-sm overflow-hidden text-ellipsis community-post-markdown !pb-0 text-primary/75 dark:text-primary-dark/75 font-normal"
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
                    return <code {...props} className="break-all" />
                },
                a: ({ node, ...props }) => {
                    return <a rel="nofollow" {...props} />
                },
                img: ZoomImage,
            }}
        >
            {children}
        </ReactMarkdown>
    )
}

export default Markdown
