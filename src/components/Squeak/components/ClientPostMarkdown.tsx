import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import ReactMarkdown, { defaultUrlTransform } from 'react-markdown'
import { codeText } from './Markdown'
import rehypeSanitize from 'rehype-sanitize'
import { ZoomImage } from 'components/ZoomImage'
import remarkGfm from 'remark-gfm'

export const ClientPostMarkdown = ({
    children,
    transformImageUri,
    allowedElements,
}: {
    children: string
    transformImageUri?: (src: string) => string
    allowedElements?: string[]
}) => {
    return (
        // urlTransform is safe, rehypeSanitize sanitizes all HTML output
        // nosemgrep: typescript.react.security.react-markdown-insecure-html.react-markdown-insecure-html
        <ReactMarkdown
            allowedElements={allowedElements}
            remarkPlugins={[remarkGfm]}
            urlTransform={(url, key) =>
                key === 'src' && transformImageUri ? transformImageUri(url) : defaultUrlTransform(url)
            }
            rehypePlugins={[rehypeSanitize]}
            components={{
                pre: ({ children }) => {
                    return (
                        <>
                            <Highlight {...defaultProps} code={codeText(children)} language={'js' as Language}>
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

export default ClientPostMarkdown
