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
    PostHog,
    Hobby,
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
import usePostHog from '../../hooks/usePostHog'
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
    hobby: Hobby,
    shopify: Shopify,
    posthog: PostHog,
    segment: Segment,
    sentry: Sentry,
    wordpress: WordPress,
    zapier: Zapier,
    more: More,
    github: GitHub,
    slack: Slack,
}

export default function DeployOption({ url, icon, title, disablePrefetch, badge }) {
    const posthog = usePostHog()
    const Icon = icon && icons[icon]
    const badgeClass = badge === 'new' ? 'success' : badge === 'beta' ? 'warning' : null
    return (
        <Link
            disablePrefetch={disablePrefetch}
            className="text-almost-black hover:text-almost-black dark:text-white dark:hover:text-white font-semibold p-2 hover:bg-gray-accent/40 active:hover:bg-gray-accent/60 dark:hover:bg-gray-accent/10 dark:active:bg-gray-accent/5 rounded flex items-center space-x-2 text-[14px]"
            to={url}
            onClick={() => {
                posthog?.capture('deploy option clicked', { deploy_option: title })
            }}
        >
            {Icon && <Icon className="w-6 h-6" />}
            <span>{title}</span>
            {badge && <span className={`lemon-tag ${badgeClass}`}>{badge}</span>}
        </Link>
    )
}
