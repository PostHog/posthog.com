import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import ReactMarkdown from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import { ZoomImage } from 'components/ZoomImage'
import { TransformImage } from 'react-markdown/lib/ast-to-react'
import remarkGfm from 'remark-gfm'

const replaceMentions = (body: string) => {
    return body.replace(/@([a-zA-Z0-9-]+\/[0-9]+|max)/g, (match, username) => {
        if (username === 'max') {
            return `[${match}](/community/profiles/${process.env.GATSBY_AI_PROFILE_ID})`
        }
        return `[${match}](/community/profiles/${username.split('/')[1]})`
    })
}

export const Markdown = ({
    children,
    transformImageUri,
    allowedElements,
    regularText,
}: {
    children: string
    transformImageUri?: TransformImage | undefined
    allowedElements?: string[]
    regularText?: 'false'
}) => {
    return (
        <ReactMarkdown
            allowedElements={allowedElements}
            remarkPlugins={[remarkGfm]}
            transformImageUri={transformImageUri}
            rehypePlugins={[rehypeSanitize]}
            className={`flex-1 !text-sm overflow-hidden text-ellipsis !pb-0 mr-1 text-primary/75 dark:text-primary-dark/75 font-normal [&_p:last-child]:mb-0 ${regularText ? '' : 'question-content community-post-markdown'
                }`}
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
                a: ({ node, ...props }) => {
                    return <a rel="nofollow" {...props} />
                },
                img: ZoomImage,
            }}
        >
            {replaceMentions(children)}
        </ReactMarkdown>
    )
}

export default Markdown
