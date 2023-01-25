import cntl from 'cntl'
import Accordion from 'components/Accordion'
import Link from 'components/Link'
import Logo from 'components/Logo'
import React from 'react'
import { IProps, LinkListItem } from './LinkList'
import ProductIcons from 'components/ProductIcons'
import { GitHub, LinkedIn, YouTube, SlackMonochrome, Twitter } from 'components/Icons/Icons'

const linklist: IProps[] = [
    {
        title: 'Product',
        url: '/product',
        items: [
            {
                title: 'Overview',
                url: '/product',
            },
            {
                title: 'Pricing',
                url: '/pricing',
            },
            {
                title: 'Product analytics',
                url: '/product#top-features',
            },
            {
                title: 'Session recording',
                url: '/product/session-recording',
            },
            {
                title: 'A/B testing',
                url: '/product/experimentation-suite',
            },
            {
                title: 'Feature flags',
                url: '/product/feature-flags',
            },
            {
                title: 'Apps',
                url: '/apps',
            },
            {
                title: 'Customer stories',
                url: '/customers',
            },
            {
                title: 'PostHog vs...',
                url: '/blog/tags/comparisons',
            },
        ],
    },
    {
        title: 'Docs',
        url: '/docs',
        items: [
            {
                title: 'Quickstart guide',
                url: '/docs/getting-started/cloud',
            },
            {
                title: 'Self-hosting',
                url: '/docs/self-host',
            },
            {
                title: 'Installing PostHog',
                url: '/docs/integrate',
            },
            {
                title: 'Building an app',
                url: '/docs/apps/build',
            },
            {
                title: 'API',
                url: '/docs/api',
            },
            {
                title: 'Webhooks',
                url: '/docs/integrate/webhooks/message-formatting',
            },
            {
                title: 'How PostHog works',
                url: '/docs/how-posthog-works',
            },
            {
                title: 'Data privacy',
                url: '/docs/privacy',
            },
        ],
    },
    {
        title: 'Using PostHog',
        url: '/using-posthog',
        items: [
            {
                title: 'Product manual',
                url: '/using-posthog/',
            },
            {
                title: 'Apps manuals',
                url: '/docs/apps',
            },
            {
                title: 'Tutorials',
                url: '/tutorials',
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
                title: 'Product roadmap',
                url: '/roadmap',
            },
            {
                title: 'Contributors',
                url: '/contributors',
            },
            {
                title: 'Partners',
                url: '/partners',
            },
            {
                title: 'Newsletter',
                url: '/newsletter',
            },
            {
                title: 'Merch',
                url: 'https://merch.posthog.com/collections/all',
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
                title: 'Getting started',
                url: '/handbook/getting-started/start-here',
            },
            {
                title: 'Company',
                url: '/handbook/company/story',
            },
            {
                title: 'Strategy',
                url: '/handbook/strategy/overview',
            },
            {
                title: 'How we work',
                url: '/handbook/company/culture',
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
                title: 'Product',
                url: '/handbook/product/product-team',
            },
            {
                title: 'Design',
                url: '/handbook/design/philosophy',
            },
            {
                title: 'Marketing',
                url: '/handbook/growth/marketing',
            },
            {
                title: 'Customer success',
                url: '/handbook/growth/strategy',
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
                title: 'Team',
                url: '/handbook/company/team',
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
                title: 'Blog',
                url: '/blog',
            },
            {
                title: 'FAQ',
                url: '/faq',
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
            Icon: <SlackMonochrome className="w-8 h-8 box-border fill-current" />,
            url: '/slack',
        },
        {
            Icon: <Twitter className="w-8 h-8 box-border fill-current" />,
            url: 'https://twitter.com/posthog',
        },
        {
            Icon: (
                <span className="fill-current">
                    <LinkedIn className="w-8 h-8 box-border" />
                </span>
            ),
            url: 'https://www.linkedin.com/company/posthog',
        },
        {
            Icon: (
                <span className="fill-current">
                    <YouTube className="w-8 h-8 box-border" />
                </span>
            ),
            url: 'https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA',
        },
        {
            Icon: (
                <span className="fill-current">
                    <GitHub className="w-8 h-8 box-border" />
                </span>
            ),
            url: 'https://github.com/PostHog',
        },
    ]

    return (
        <footer className="border-t border-dashed border-gray-accent-light dark:border-gray-accent-dark">
            <div className="relative -top-6">
                <Link
                    to="/"
                    className="left-[calc(50%-40px)] w-20 h-12 inline-flex justify-center items-center absolute z-10 rounded dark:!bg-primary !bg-tan hover:!bg-gray-accent-light/90 px-4 active:!bg-gray-accent-light/100 dark:!hover:gray-accent-dark border border-dashed border-gray-accent-light dark:border-gray-accent-dark hover:scale-[1.02] active:top-[1px] active:scale-[.99] transition-all"
                >
                    <span className="inline-block">{ProductIcons.posthogMonochrome}</span>
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:border-r-0 last:border-r-0 lg:grid-cols-6 w-full max-w-screen-2xl mx-auto">
                {linklist.map((item) => (
                    <LinkListItem {...item} key={item.url} />
                ))}
            </div>

            <div className="flex lg:border-t border-gray-accent-light dark:border-gray-accent-dark border-dashed justify-center">
                <ul className="list-none px-0 py-2 flex space-x-4">
                    {social.map(({ Icon, url }: Social) => {
                        return (
                            <li key={url}>
                                <Link
                                    to={url}
                                    className="rounded p-2 inline-flex hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark opacity-70 hover:opacity-90 relative hover:scale-[1.01] active:top-[1px] active:scale-[.99] transition-all"
                                >
                                    {Icon}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className="py-5 border-t border-dashed border-gray-accent-light dark:border-gray-accent-dark border-l-0 border-r-0">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center text-lg px-5">
                    <small className="font-semibold dark:text-gray">
                        &copy; {new Date().getFullYear()} PostHog, Inc.
                    </small>
                    <ul className="m-0 p-0 list-none sm:ml-auto flex sm:space-x-8 space-x-4 mt-2 sm:mt-0">
                        <li>
                            <Link
                                to="/docs/contribute/code-of-conduct"
                                className="font-bold text-sm text-almost-black/70 hover:text-almost-black/90 dark:text-gray dark dark:hover:text-gray"
                            >
                                Code of conduct
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/privacy"
                                className="font-bold text-sm text-almost-black/70 hover:text-almost-black/90 dark:text-gray dark dark:hover:text-gray"
                            >
                                Privacy policy
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/terms"
                                className="font-bold text-sm text-almost-black/70 hover:text-almost-black/90 dark:text-gray dark dark:hover:text-gray"
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
