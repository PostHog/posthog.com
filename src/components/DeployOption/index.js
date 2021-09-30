import React from 'react'
import Link from 'components/Link'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'

export default function DeployOption({ url, icon, title, disablePrefetch }) {
    const { posthog } = useValues(posthogAnalyticsLogic)
    return (
        <Link
            disablePrefetch={disablePrefetch}
            className="text-almost-black hover:text-almost-black dark:text-white dark:hover:text-white font-semibold p-2 hover:bg-gray-accent-light dark:hover:bg-opacity-10 rounded flex items-center space-x-2 text-[14px]"
            to={url}
            onClick={() => {
                posthog?.capture('deploy option clicked', { deploy_option: title })
            }}
        >
            {icon && (
                <svg className="w-5 h-5 text-black dark:text-white">
                    <use xlinkHref={`#${icon}`}></use>
                </svg>
            )}
            <span>{title}</span>
        </Link>
    )
}
