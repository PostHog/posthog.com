import React from 'react'
import { GitHub, LinkedIn, YouTube, Slack, Twitter } from 'components/Icons/Icons'
import Link from 'components/Link'

interface Social {
    Icon: React.ReactNode
    url: string
}

interface Props {
    title: string
}

export default function Header({ title }: Props) {
    const social: Social[] = [
        {
            Icon: <Slack className="w-[24px]" />,
            url: '/slack',
        },
        {
            Icon: <Twitter className="w-[24px] text-[#1d9bf0]" />,
            url: 'https://twitter.com/posthog',
        },
        {
            Icon: (
                <span className="text-[#0A66C2]">
                    <LinkedIn className="w-[24px]" />
                </span>
            ),
            url: 'https://www.linkedin.com/company/posthog',
        },
        {
            Icon: (
                <span className="text-white dark:text-gray-accent-dark">
                    <YouTube className="w-[24px]" />
                </span>
            ),
            url: 'https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA',
        },
        {
            Icon: (
                <span className="text-black dark:text-white">
                    <GitHub className="w-[24px]" />
                </span>
            ),
            url: 'https://github.com/PostHog',
        },
    ]

    return (
        <div className="flex md:justify-between items-center py-4 px-6 md:border-b md:border-t-0 border-t border-gray-accent-light border-dashed">
            <h2 className="text-base m-0 opacity-70 text-black md:block hidden">{title}</h2>
            <ul className="list-none flex space-x-4 p-0 md:w-auto w-full md:justify-start justify-between">
                {social.map(({ Icon, url }: Social) => {
                    return (
                        <li key={url}>
                            <Link to={url}>{Icon}</Link>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
