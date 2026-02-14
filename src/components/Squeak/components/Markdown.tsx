import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import ReactMarkdown, { Components } from 'react-markdown'
import rehypeSanitize from 'rehype-sanitize'
import { ZoomImage } from 'components/ZoomImage'
import { TransformImage } from 'react-markdown/lib/ast-to-react'
import remarkGfm from 'remark-gfm'
import { cn } from '../../../utils'
import Link from 'components/Link'
import { graphql, useStaticQuery } from 'gatsby'
import { TeamMemberLink } from 'components/TeamMember'

const replaceMentions = (body: string) => {
    return body.replace(/@((?:[^\s@/]+)\/([0-9]+)|max)/g, (match, full, id) => {
        if (full === 'max') {
            return `[${match}](/community/profiles/${process.env.GATSBY_AI_PROFILE_ID})`
        }
        return `[${match}](/community/profiles/${id})`
    })
}

interface Profile {
    avatar?: {
        formats?: {
            thumbnail?: {
                url: string
            }
        }
    }
    firstName: string
    lastName: string
    squeakId: number
    companyRole?: string
    location?: string
    country?: string
    color?: string
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
    const {
        profiles: { nodes: profiles },
    } = useStaticQuery<{ profiles: { nodes: Profile[] } }>(graphql`
        {
            profiles: allSqueakProfile {
                nodes {
                    avatar {
                        formats {
                            thumbnail {
                                url
                            }
                        }
                    }
                    firstName
                    lastName
                    squeakId
                    companyRole
                    location
                    country
                    color
                }
            }
        }
    `)

    const MentionLink = ({ href, children: linkChildren }: { href?: string; children?: React.ReactNode }) => {
        const profileMatch = href?.match(/^\/community\/profiles\/(\d+)$/)

        if (profileMatch) {
            const profileId = Number(profileMatch[1])
            const profile = profiles.find((p) => p.squeakId === profileId)

            if (profile?.companyRole) {
                const { squeakId, avatar, ...rest } = profile
                return (
                    <TeamMemberLink
                        {...rest}
                        squeakId={String(squeakId)}
                        avatar={
                            avatar?.formats?.thumbnail
                                ? { formats: { thumbnail: avatar.formats.thumbnail } }
                                : undefined
                        }
                    />
                )
            }
        }

        return (
            <Link rel="nofollow noopener noreferrer" to={href || ''} state={{ newWindow: true }}>
                {linkChildren}
            </Link>
        )
    }

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
                a: MentionLink,
                img: ZoomImage,
                ...components,
            }}
        >
            {replaceMentions(children)}
        </ReactMarkdown>
    )
}

export default Markdown
