import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { Reactions } from 'components/Roadmap/UnderConsideration'
import React from 'react'
import Markdown from 'markdown-to-jsx'

interface IUser {
    url: string
    avatar: string
    username: string
}

interface IGitHubTooltip {
    reactions: {
        heart: number
        hooray: number
        eyes: number
        plus1: number
    }
    body: string
    user: IUser
    labels: [
        {
            name: string
        }
    ]
    updated_at: string
    title: string
    url: string
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

export default function GitHubTooltip({
    reactions,
    body,
    user,
    labels,
    updated_at,
    title,
    url,
}: IGitHubTooltip): JSX.Element {
    const hasLabels = labels?.length > 0
    const hasReactions = reactions?.heart > 0 || reactions?.hooray > 0 || reactions?.eyes > 0 || reactions?.plus1 > 0

    return (
        <div className="p-2 flex">
            <div className="max-w-[300px] flex flex-col">
                <h5 className="m-0">{title}</h5>
                <div className="m-0 mt-1 text-sm mb-4 max-h-[250px] overflow-hidden relative text-">
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
                        {body}
                    </Markdown>
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-white/100 via-white/50 to-white/0 dark:from-[#484848]/100 dark:via-[#484848]/50 dark:to-[#484848]/0" />
                </div>
                <CallToAction className="mb-1 mt-auto" size="sm" to={url}>
                    Continue reading on GitHub
                </CallToAction>
            </div>
            <div className="ml-4 pl-4  w-[200px] hidden sm:flex flex-col space-y-2">
                <TooltipSection title="Author">
                    <span className="text-red font-bold">
                        <Author url={user?.url} avatar={user?.avatar} username={user?.username} />
                    </span>
                </TooltipSection>
                <TooltipSection title="Last updated">
                    <p className="m-0 text-sm leading-none">{updated_at}</p>
                </TooltipSection>
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
            </div>
        </div>
    )
}
