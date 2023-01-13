import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { Reactions } from 'components/Roadmap/UnderConsideration'
import React from 'react'
import Markdown from 'markdown-to-jsx'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { ITableOfContents } from 'components/PostLayout/types'
import { formatToc } from 'lib/utils'

interface IUser {
    url: string
    avatar: string
    username: string
}

export interface ILinkPreview {
    reactions?: {
        heart: number
        hooray: number
        eyes: number
        plus1: number
    }
    body: {
        type: 'mdx' | 'markdown'
        content: string
    }
    users?: IUser[]
    labels?: [
        {
            name: string
        }
    ]
    date: string
    title: string
    url: string
    ctaText?: string
    video?: string
    tableOfContents?: ITableOfContents[]
}

export interface MdxNode {
    frontmatter: {
        title: string
        featuredVideo: string
    }
    headings?: {
        depth: number
        value: string
    }
    parent: {
        fields: {
            gitLogLatestDate: string
        }
    }
    fields: {
        slug: string
        contributors: {
            url: string
            username: string
            avatar: {
                publicURL: string
            }
        }[]
    }
    body: string
}

export const formatNode = (node: MdxNode): ILinkPreview => {
    return {
        title: node?.frontmatter?.title,
        url: node?.fields?.slug,
        body: { type: 'mdx', content: node?.body },
        video: node?.frontmatter?.featuredVideo,
        date: node?.parent?.fields?.gitLogLatestDate,
        users: node?.fields?.contributors?.map((contributor) => {
            return {
                url: contributor.url,
                username: contributor.username,
                avatar: contributor.avatar.publicURL,
            }
        }),
        tableOfContents: node.headings && formatToc(node.headings),
    }
}

const TooltipSection = ({ title, children }: { title: string; children: React.ReactNode }) => {
    return (
        <div>
            <h5 className="text-sm m-0 mb-1">{title}</h5>
            {children}
        </div>
    )
}

export const Author = ({ avatar, username, url }: IUser): JSX.Element => {
    return (
        <Link to={url} className="flex items-center space-x-2 flex-shrink-0 xl:w-[200px]">
            <img className="rounded-full w-[30px] h-[30px]" src={avatar} />
            <p className="m-0 font-semibold text-ellipsis overflow-hidden whitespace-nowrap xl:block hidden">
                {username}
            </p>
        </Link>
    )
}

export const Heading = ({
    as = 'h1',
    children,
    ...other
}: {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    children: JSX.Element | string
}): JSX.Element => {
    const Heading = as
    return (
        <Heading className="text-base my-1" {...other}>
            {children}
        </Heading>
    )
}

export default function LinkPreview({
    reactions,
    body = { type: 'markdown', content: '' },
    users,
    labels,
    date,
    title,
    url,
    ctaText = 'Continue reading on GitHub',
    tableOfContents,
    video,
}: ILinkPreview): JSX.Element {
    const hasUsers = users && users?.length > 0
    const hasTableOfContents = tableOfContents && tableOfContents?.length > 0
    const hasLabels = labels && labels?.length > 0
    const hasReactions =
        reactions && (reactions?.heart > 0 || reactions?.hooray > 0 || reactions?.eyes > 0 || reactions?.plus1 > 0)
    const hasSidebar = !!date || hasUsers || hasTableOfContents || hasLabels || hasReactions

    return (
        <div className="p-2 flex">
            <div className="max-w-[300px] flex flex-col">
                <h5 className="m-0">{title}</h5>
                <div className="m-0 mt-1 text-sm mb-4 max-h-[250px] overflow-hidden relative">
                    {body.type === 'markdown' ? (
                        <Markdown
                            options={{
                                disableParsingRawHTML: true,
                                overrides: {
                                    h1: {
                                        props: {
                                            className: 'text-base my-1',
                                        },
                                    },
                                    h2: {
                                        props: {
                                            className: 'text-base my-1',
                                        },
                                    },
                                    h3: {
                                        props: {
                                            className: 'text-base my-1',
                                        },
                                    },
                                    h4: {
                                        props: {
                                            className: 'text-base my-1',
                                        },
                                    },
                                    h5: {
                                        props: {
                                            className: 'text-base my-1',
                                        },
                                    },
                                    p: {
                                        props: {
                                            className: 'text-sm my-1',
                                        },
                                    },
                                    li: {
                                        props: {
                                            className: 'text-sm my-1',
                                        },
                                    },
                                },
                            }}
                        >
                            {body?.content}
                        </Markdown>
                    ) : (
                        <MDXProvider
                            components={{
                                h1: (props) => Heading({ as: 'h1', ...props }),
                                h2: (props) => Heading({ as: 'h2', ...props }),
                                h3: (props) => Heading({ as: 'h3', ...props }),
                                h4: (props) => Heading({ as: 'h4', ...props }),
                                h5: (props) => Heading({ as: 'h5', ...props }),
                                p: (props) => <p className="text-sm my-1">{props.children}</p>,
                                li: (props) => <li className="text-sm my-1">{props.children}</li>,
                                code: () => null,
                                pre: () => null,
                                blockquote: () => null,
                            }}
                        >
                            <MDXRenderer>{body?.content}</MDXRenderer>
                        </MDXProvider>
                    )}
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-white/100 via-white/50 to-white/0 dark:from-[#484848]/100 dark:via-[#484848]/50 dark:to-[#484848]/0" />
                </div>
                <CallToAction className="mb-1 mt-auto" size="xs" to={url}>
                    {ctaText}
                </CallToAction>
            </div>
            {hasSidebar && (
                <div className="ml-4 pl-4 border-l border-gray-accent-light dark:border-gray-accent-dark border-dashed w-[200px] hidden sm:flex flex-col space-y-2">
                    {hasUsers && (
                        <TooltipSection title={`Author${users?.length > 1 ? 's' : ''}`}>
                            <span className="text-red font-bold grid gap-y-1">
                                {users.slice(0, 3).map((user) => {
                                    return (
                                        <Author
                                            key={user.username}
                                            url={user?.url}
                                            avatar={user?.avatar}
                                            username={user?.username}
                                        />
                                    )
                                })}
                            </span>
                        </TooltipSection>
                    )}
                    {date && (
                        <TooltipSection title="Last updated">
                            <p className="m-0 text-sm leading-none">{date}</p>
                        </TooltipSection>
                    )}
                    {hasReactions && (
                        <TooltipSection title="Reactions">
                            <Reactions reactions={reactions} />
                        </TooltipSection>
                    )}
                    {hasLabels && (
                        <TooltipSection title="Labels">
                            <ul className="list-none flex flex-wrap items-center m-0 p-0 -ml-1">
                                {labels.map(({ name }: { name: string }) => {
                                    return (
                                        <li
                                            key={name}
                                            className="px-2 py-1 bg-gray-accent-light border-black/80 rounded-sm font-semibold text-xs m-1 dark:text-black"
                                        >
                                            {name}
                                        </li>
                                    )
                                })}
                            </ul>
                        </TooltipSection>
                    )}
                    {hasTableOfContents && (
                        <TooltipSection title="On this page">
                            <div className="relative">
                                <ul className="list-none m-0 p-0 h-[140px] overflow-auto pb-[20px]">
                                    {tableOfContents?.map((heading, i) => {
                                        return (
                                            <li key={heading.value + i} className="text-sm group">
                                                <Link
                                                    to={`${url}/#${heading.url}`}
                                                    className="text-black/60 dark:text-white/60 group-hover:text-black/90 dark:group-hover:text-white/90"
                                                >
                                                    {heading.value}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                                <div className="absolute left-0 bottom-0 h-[20px] w-full bg-gradient-to-t from-white/100 via-white/50 to-white/0 dark:from-[#484848]/100 dark:via-[#484848]/50 dark:to-[#484848]/0" />
                            </div>
                        </TooltipSection>
                    )}
                </div>
            )}
        </div>
    )
}
