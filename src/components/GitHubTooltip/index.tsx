import { CallToAction } from 'components/CallToAction'
import Link from 'components/Link'
import { Reactions } from 'components/Roadmap/UnderConsideration'
import React from 'react'

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
    body: {
        excerpt: string
    }
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
                <p className="m-0 mt-1 text-sm mb-4">
                    {body?.excerpt.replace('Is your feature request related to a problem?', '').trim()}
                </p>
                <CallToAction className="mb-1 mt-auto" size="xs" to={url}>
                    Continue reading on GitHub
                </CallToAction>
            </div>
            <div className="ml-4 pl-4 border-l border-gray-accent-light dark:border-gray-accent-dark border-dashed w-[200px] hidden sm:flex flex-col space-y-2">
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
