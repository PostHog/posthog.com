import {
    Android,
    AWS,
    Azure,
    DigitalOcean,
    Docker,
    GCS,
    GitHub,
    HelmChart,
    Heroku,
    Ios,
    JS,
    More,
    NodeJS,
    ReactIcon,
    Ruby,
    Segment,
    Sentry,
    Shopify,
    Slack,
    WordPress,
    Zapier,
} from 'components/Icons/Icons'
import Link from 'components/Link'
import { useValues } from 'kea'
import { posthogAnalyticsLogic } from 'logic/posthogAnalyticsLogic'
import React from 'react'

const icons = {
    android: Android,
    aws: AWS,
    azure: Azure,
    'digital ocean': DigitalOcean,
    docker: Docker,
    gcs: GCS,
    'helm chart': HelmChart,
    heroku: Heroku,
    ios: Ios,
    js: JS,
    nodejs: NodeJS,
    react: ReactIcon,
    ruby: Ruby,
    shopify: Shopify,
    segment: Segment,
    sentry: Sentry,
    wordpress: WordPress,
    zapier: Zapier,
    more: More,
    github: GitHub,
    slack: Slack,
}

export default function DeployOption({ url, icon, title, disablePrefetch }) {
    const { posthog } = useValues(posthogAnalyticsLogic)
    const Icon = icon && icons[icon]
    return (
        <Link
            disablePrefetch={disablePrefetch}
            className="text-almost-black hover:text-almost-black dark:text-white dark:hover:text-white font-semibold p-2 hover:bg-gray-accent-light dark:hover:bg-opacity-10 rounded flex items-center space-x-2 text-[14px]"
            to={url}
            onClick={() => {
                posthog?.capture('deploy option clicked', { deploy_option: title })
            }}
        >
            {Icon && <Icon />}
            <span>{title}</span>
        </Link>
    )
}
