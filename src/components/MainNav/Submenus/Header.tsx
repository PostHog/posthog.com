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
            Icon: <Twitter className="w-[24px]" />,
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
                <span className="text-[#ED1D24]">
                    <YouTube className="w-[24px]" />
                </span>
            ),
            url: 'https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA',
        },
        {
            Icon: (
                <span className="text-black">
                    <GitHub className="w-[24px]" />
                </span>
            ),
            url: 'https://github.com/PostHog',
        },
    ]

    return (
        <div className="flex justify-between items-center p-4 border-b border-gray-accent-light border-dashed">
            <h2 className="text-lg m-0 opacity-70 text-black">{title}</h2>
            <ul className="list-none flex space-x-2">
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
