import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import ReactMarkdown, { type Components, defaultUrlTransform } from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import { ZoomImage } from 'components/ZoomImage'
import remarkGfm from 'remark-gfm'
import { cn } from '../../../utils'
import Link from 'components/Link'

/** The text of the `<code>` element react-markdown passes to `pre`. */
export const codeText = (children: React.ReactNode): string =>
    String((React.Children.toArray(children)[0] as React.ReactElement | undefined)?.props?.children ?? '').replace(
        /\n$/,
        ''
    )

const replaceMentions = (body: string) => {
    return body.replace(/@([a-zA-Z0-9_-]+\/[0-9]+|max)/g, (match, username) => {
        if (username === 'max') {
            return `[${match}](/community/profiles/${import.meta.env.PUBLIC_AI_PROFILE_ID})`
        }
        return `[${match}](/community/profiles/${username.split('/')[1]})`
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
    transformImageUri?: (src: string) => string
    allowedElements?: string[]
    regularText?: 'false'
    className?: string
    components?: Partial<Components>
}) => {
    return (
        // urlTransform is safe, rehypeSanitize sanitizes all HTML output
        // nosemgrep: typescript.react.security.react-markdown-insecure-html.react-markdown-insecure-html
        <div
            className={cn(
                'markdown prose dark:prose-invert prose-sm max-w-full text-primary [&_a]:font-semibold break-words [overflow-wrap:anywhere]',
                !regularText,
                className
            )}
        >
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
                        return <Link rel="nofollow noopener noreferrer" {...props} state={{ newWindow: true }} />
                    },
                    img: ZoomImage,
                    ...components,
                }}
            >
                {replaceMentions(children)}
            </ReactMarkdown>
        </div>
    )
}

export default Markdown
