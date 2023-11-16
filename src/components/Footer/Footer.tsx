import cntl from 'cntl'
import Accordion from 'components/Accordion'
import Link from 'components/Link'
import Logo from 'components/Logo'
import React from 'react'
import { IProps, LinkListItem } from './LinkList'
import { GitHub, LinkedIn, YouTube, SlackMonochrome, Twitter } from 'components/Icons/Icons'

const linklist: IProps[] = [
    {
        title: 'Products',
        url: '/products/product-analytics',
        items: [
            {
                title: 'Product Analytics',
                url: '/product-analytics',
            },
            {
                title: 'Session Replay',
                url: '/session-replay',
            },
            {
                title: 'Feature Flags',
                url: '/feature-flags',
            },
            {
                title: 'A/B Testing',
                url: '/ab-testing',
            },
            {
                title: 'Surveys',
                url: '/surveys',
            },
            {
                title: 'Product OS',
                url: '/product-os',
            },
            {
                title: 'Data connections',
                url: '/cdp',
            },
            {
                title: 'Customer stories',
                url: '/customers',
            },
            {
                title: 'PostHog vs...',
                url: '/blog/tags/comparisons',
            },
            {
                title: 'For startups',
                url: '/startups',
            },
            {
                title: 'Pricing',
                url: '/pricing',
            },
        ],
    },
    {
        title: 'Product OS',
        url: '/docs',
        items: [
            {
                title: 'New? Start here.',
                url: '/docs/getting-started/install',
            },
            {
                title: 'SDKs',
                url: '/docs/libraries/js',
            },
            {
                title: 'Framework guides',
                url: '/docs/frameworks',
            },
            {
                title: 'Data management',
                url: '/docs/data',
            },
            {
                title: 'HogQL',
                url: '/docs/hogql',
            },
            {
                title: 'Toolbar',
                url: '/docs/toolbar',
            },
            {
                title: 'API',
                url: '/docs/api',
            },
            {
                title: 'Webhooks',
                url: '/docs/webhooks',
            },
        ],
    },
    {
        title: 'Docs',
        url: '/docs',
        items: [
            {
                title: 'Product Analytics',
                url: '/docs/product-analytics/',
            },
            {
                title: 'Session Recording',
                url: '/docs/session-replay',
            },
            {
                title: 'Feature Flags',
                url: '/docs/feature-flags',
            },
            {
                title: 'A/B Testing',
                url: '/docs/experiments',
            },
            {
                title: 'Surveys',
                url: '/docs/surveys',
            },
            {
                title: 'CDP',
                url: '/docs/cdp',
            },
            {
                title: 'Data Warehouse',
                url: '/docs/data-warehouse',
            },
            {
                title: 'Build an app',
                url: '/docs/apps/build',
            },
        ],
    },
    {
        title: 'Community',
        url: '/questions',
        items: [
            {
                title: 'Questions?',
                url: '/questions',
            },
            {
                title: 'Guides',
                url: '/tutorials',
            },
            {
                title: 'Apps',
                url: '/apps',
            },
            {
                title: 'Dashboard templates',
                url: '/templates',
            },
            {
                title: 'Founders',
                url: '/founders/all',
            },
            {
                title: 'Product engineers',
                url: '/product-engineers/all',
            },
            {
                title: 'Tracks',
                url: '/tracks',
            },
            {
                title: 'Merch',
                url: 'https://merch.posthog.com',
            },
            {
                title: 'Contributors',
                url: '/contributors',
            },
            {
                title: 'Newsletter',
                url: 'https://newsletter.posthog.com',
            },
            {
                title: 'PostHog FM',
                url: 'https://open.spotify.com/playlist/7A2H2J3WhpJmMEwAhKahWH?si=47418915a8d0447b',
            },
            {
                title: 'PostHog on GitHub',
                url: 'https://github.com/PostHog/posthog',
            },
        ],
    },
    {
        title: 'Handbook',
        url: '/handbook',
        items: [
            {
                title: "Why we're here",
                url: '/handbook/why-does-posthog-exist',
            },
            {
                title: 'Our story',
                url: '/handbook/story',
            },
            {
                title: 'How we work',
                url: '/handbook/company/culture',
            },
            {
                title: 'Values',
                url: '/handbook/values',
            },
            {
                title: 'Tips for working here',
                url: '/handbook/help',
            },
            {
                title: 'Small teams',
                url: '/handbook/small-teams/team-structure',
            },
            {
                title: 'People & Ops',
                url: '/handbook/people/compensation',
            },
            {
                title: 'Engineering',
                url: '/handbook/engineering/developing-locally',
            },
            {
                title: 'Design',
                url: '/handbook/design/philosophy',
            },
            {
                title: 'Marketing',
                url: '/handbook/growth/marketing',
            },
        ],
    },
    {
        title: 'Company',
        url: '/about',
        items: [
            {
                title: 'About',
                url: '/about',
            },
            {
                title: 'Roadmap',
                url: '/roadmap',
            },
            {
                title: 'Changelog',
                url: '/changelog',
            },
            {
                title: 'Team',
                url: '/team',
            },
            {
                title: 'Blog',
                url: '/blog/all',
            },
            {
                title: 'Investors',
                url: '/handbook/strategy/investors',
            },
            {
                title: 'Press',
                url: '/media',
            },
            {
                title: 'FAQ',
                url: '/faq',
            },
            {
                title: 'Security',
                url: '/handbook/company/security',
            },
            {
                title: 'Support',
                url: '/questions',
            },
            {
                title: 'Careers',
                url: '/careers',
            },
        ],
    },
]

const linksHeadingSm = cntl`
    text-base
    text-gray
    dark:text-gray
    mb-1
    leading-tight
    pb-[0.2rem]
`
const linksHeadingMd = cntl`
    text-lg
    mb-5
    leading-tight
`

const linksHeadingLg = cntl`
    text-xl flex
    justify-between
    items-center
    leading-tight
    mb-5
`

const link = (marginBottom = '1') => cntl`
    leading-tight
    text-primary
    hover:text-primary
    dark:text-primary-dark
    dark:hover:text-white
    text-base
    font-bold
    mb-${marginBottom}
    inline-block
`

const FooterMenuItem = ({ title, url, className = '', marginBottom = '1' }) => {
    return (
        <li className={className}>
            <Link className={link(marginBottom)} to={url}>
                {title}
            </Link>
        </li>
    )
}

export function Footer(): JSX.Element {
    const social: Social[] = [
        {
            Icon: <Twitter className="w-5 h-5 box-border fill-current" />,
            url: 'https://twitter.com/posthog',
        },
        {
            Icon: (
                <span className="fill-current">
                    <LinkedIn className="w-6 h-6 box-border" />
                </span>
            ),
            url: 'https://www.linkedin.com/company/posthog',
        },
        {
            Icon: (
                <span className="fill-current">
                    <YouTube className="w-6 h-6 box-border" />
                </span>
            ),
            url: 'https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA',
        },
        {
            Icon: (
                <span className="fill-current">
                    <GitHub className="w-6 h-6 box-border" />
                </span>
            ),
            url: 'https://github.com/PostHog',
        },
    ]

    return (
        <footer className="bg-accent dark:bg-accent-dark border-y border-light dark:border-dark">
            <div className="relative -top-6">
                <Link
                    to="/"
                    className="left-[calc(50%-40px)] w-20 h-12 inline-flex justify-center items-center absolute z-10 rounded bg-light dark:bg-dark px-2 pt-1.5 pb-1 mb-1 border border-b-3 border-light dark:border-dark hover:bg-accent dark:hover:bg-accent-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                >
                    <span className="inline-block">
                        <Logo noText={true} />
                    </span>
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full max-w-screen-2xl mx-auto">
                {linklist.map((item) => (
                    <LinkListItem {...item} key={item.url} />
                ))}
            </div>

            <div className="flex justify-center">
                <ul className="list-none px-0 py-2 flex space-x-4 items-center">
                    {social.map(({ Icon, url }: Social) => {
                        return (
                            <li key={url}>
                                <Link
                                    to={url}
                                    className="flex items-center relative px-2.5 pt-2 pb-1.5 mb-1 rounded border border-b-3 border-transparent opacity-70 hover:opacity-100 hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all"
                                >
                                    {Icon}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="py-5  border-l-0 border-r-0">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center text-lg px-5">
                    <small className="font-semibold dark:text-gray">
                        &copy; {new Date().getFullYear()} PostHog, Inc.
                    </small>
                    <ul className="m-0 p-0 list-none sm:ml-auto flex sm:space-x-8 space-x-4 mt-2 sm:mt-0">
                        <li>
                            <Link
                                to="https://status.posthog.com"
                                className="font-bold text-sm text-primary/70 hover:text-primary/90 dark:text-primary-dark dark:hover:text-primary-dark"
                            >
                                System status
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/handbook/company/security#soc-2"
                                className="font-bold text-sm text-primary/70 hover:text-primary/90 dark:text-primary-dark dark:hover:text-primary-dark"
                            >
                                SOC 2
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/privacy"
                                className="font-bold text-sm text-primary/70 hover:text-primary/90 dark:text-primary-dark dark:hover:text-primary-dark"
                            >
                                Privacy policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/terms"
                                className="font-bold text-sm text-primary/70 hover:text-primary/90 dark:text-primary-dark dark:hover:text-primary-dark"
                            >
                                Terms
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}
