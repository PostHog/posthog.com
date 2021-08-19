import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'gatsby'
import { Transition } from '@headlessui/react'
import { NextArrow, RightArrow, Plus, Chevron } from '../Icons/Icons'
import _ from 'lodash'
import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import AnimateHeight from 'react-animate-height'
import SearchBar from '../../templates/Handbook/SearchBar'

// const data = [
//     { icon: 'android', name: 'Android' },

//     { icon: 'ios', name: 'iOS' },
//     { icon: 'js', name: 'JavaScript' },
//     { icon: 'nodejs', name: 'NodeJS' },
//     { icon: 'react', name: 'React' },
//     { icon: 'ruby', name: 'Ruby' },
//     { icon: 'segment', name: 'Segment' },
//     { icon: 'sentry', name: 'Sentry' },
//     { icon: 'shopify', name: 'Shopify' },
//     { icon: 'slack', name: 'Slack' },
//     { icon: 'wordpress', name: 'WordPress' },
//     { icon: 'zapier', name: 'Zapier' },
// ]

const menu = [
    {
        title: 'Product',
        url: '/product',
    },
    {
        title: 'Docs',
        url: '/docs',
        sub: {
            title: 'Docs',
            description: `Learn how to deploy, use, and contribute to PostHog. Here are some handy links to help you
           get started.`,
            items: [
                {
                    title: '1. Self Hosting',
                    link: {
                        title: 'Overview',
                        url: '/docs/self-host',
                    },
                    sections: [
                        {
                            title: 'Deploy via',
                            link: {
                                title: 'View All (13)',
                                url: 'https://posthog.com/docs/self-host',
                            },
                            items: [
                                { icon: 'aws', title: 'AWS', url: '/docs/self-host/deploy/aws' },
                                { icon: 'gcs', title: 'Google Cloud', url: '/docs/self-host/deploy/gcp' },
                                { icon: 'docker', title: 'Docker', url: '/docs/contribute/developing-locally' },
                                { icon: 'helm chart', title: 'Helm Chart', url: '/docs/self-host/deploy/other' },
                                {
                                    icon: 'digital ocean',
                                    title: 'Digital Ocean',
                                    url: '/docs/self-host/deploy/digital-ocean',
                                },
                                { icon: 'github', title: 'Source', url: 'https://github.com/PostHog/posthog' },
                            ],
                        },
                        {
                            title: 'Top articles',
                            items: [
                                { title: 'Configuring PostHog', url: '/docs/self-host#configure' },
                                { title: 'Hosting Costs', url: '/docs/self-host/deploy/hosting-costs' },
                                { title: 'Upgrade Guide', url: '/docs/self-host/configure/upgrading-posthog' },
                                { title: 'Self Host vs. PostHogCloud', url: '/docs/user-guides/organizations' },
                                { title: 'Clickhouse', url: '/docs/self-host/deploy/' },
                            ],
                        },
                    ],
                },
                {
                    title: '2. Install & integrate',
                    link: {
                        title: 'Overview',
                        url: '/docs/integrate',
                    },
                    sections: [
                        {
                            title: 'Top libraries',
                            items: [
                                { icon: 'js', title: 'JavaScript', url: '/docs/integrate/client/js' },
                                { icon: 'nodejs', title: 'NodeJS', url: '/docs/integrate/server/node' },
                                { icon: 'ruby', title: 'Ruby', url: '/docs/integrate/server/ruby' },
                                { icon: 'react', title: 'React Native', url: '/docs/integrate/client/react-native' },
                                { icon: 'ios', title: 'iOS', url: '/docs/integrate/client/ios' },
                                { icon: 'android', title: 'Android', url: '/docs/integrate/client/android' },
                            ],
                        },
                        {
                            title: 'Top integrations',
                            items: [
                                { icon: 'segment', title: 'Segment', url: '/docs/integrate/third-party/segment' },
                                { icon: 'sentry', title: 'Sentry', url: '/docs/integrate/third-party/sentry' },
                                { icon: 'slack', title: 'Slack', url: '/docs/integrate/webhooks/slack' },
                                { icon: 'shopify', title: 'Shopify', url: '/docs/integrate/third-party/shopify' },
                                { icon: 'wordpress', title: 'WordPress', url: '/docs/integrate/third-party/wordpress' },
                            ],
                        },
                    ],
                },
                {
                    title: '3. User guides',
                    link: {
                        title: 'Overview',
                        url: '/docs/user-guides',
                    },
                    sections: [
                        {
                            title: 'Analytics',
                            items: [
                                { title: 'Cohorts', url: '/docs/user-guides/cohorts' },
                                { title: 'Funnels', url: '/docs/user-guides/funnels' },
                                { title: 'Paths', url: '/docs/user-guides/paths' },
                                { title: 'Retention', url: '/docs/user-guides/retention' },
                                { title: 'Sessions', url: '/docs/user-guides/sessions' },
                                { title: 'Trends', url: '/docs/user-guides/trends' },
                                { title: 'Users', url: '/docs/user-guides/users' },
                            ],
                        },
                        {
                            title: 'Apps',
                            items: [
                                { title: 'Feature flags', url: '/docs/user-guides/feature-flags' },
                                { title: 'Session recordings', url: '/docs/user-guides/session-recording' },
                            ],
                        },
                        {
                            title: 'Platform',
                            items: [
                                { title: 'Application settings', url: '/docs/user-guides/application-settings' },
                                { title: 'Dashboards', url: '/docs/user-guides/dashboards' },
                                { title: 'Organizations', url: '/docs/user-guides/organizations' },
                                { title: 'Plugiπheadns', url: '/docs/user-guides/plugins' },
                                { title: 'Projects', url: '/docs/user-guides/projects' },
                                { title: 'SSO', url: '/docs/user-guides/sso' },
                                { title: 'Toolbar', url: '/docs/user-guides/toolbar' },
                            ],
                        },
                        {
                            title: 'Data',
                            items: [
                                { title: 'Actions', url: '/docs/user-guides/actions' },
                                { title: 'Annotations', url: '/docs/user-guides/annotations' },
                                { title: 'Events', url: '/docs/user-guides/events' },
                            ],
                        },
                    ],
                },
            ],
        },
    },
    {
        title: 'Company',
        url: '/handbook/company/story',
    },
    {
        title: 'Pricing',
        url: '/pricing',
    },
    {
        title: 'Github',
        url: 'https://github.com/posthog/posthog',
    },
]

const TooltipPointer = ({ parent, body, className, offset, hide }) => {
    const [position, setPosition] = useState(null)
    function setTooltipPosition() {
        if (parent?.current && body?.current) {
            const left = parent.current.offsetLeft + parent.current.getBoundingClientRect().width / 2 - 33 / 2
            const top = body.current.getBoundingClientRect().top - 14 + offset
            setPosition({ left, top })
        }
    }

    useEffect(() => {
        window.addEventListener('resize', setTooltipPosition)
        setTooltipPosition()
        return () => window.removeEventListener('resize', setTooltipPosition)
    }, [])

    return (
        !hide && (
            <svg
                style={position ? { left: position.left, top: position.top } : { visibility: 'hidden' }}
                className={className}
                width="33"
                height="14"
                viewBox="0 0 33 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M32.4472 12.9001L17.6664 0.417127C17.0073 -0.139042 15.719 -0.139042 15.0613 0.417127L0.280435 12.9001C-0.0476837 13.1779 -0.0902867 13.4501 0.165378 13.6655C0.419636 13.8816 0.923876 14 1.58296 14H31.145C31.8041 14 32.3069 13.8816 32.5626 13.6655C32.8155 13.4501 32.7771 13.1772 32.4476 12.9001H32.4472Z"
                    fill="currentColor"
                />
            </svg>
        )
    )
}

const MenuItem = ({ menuItem }) => {
    const [subOpen, setSubOpen] = useState(false)
    const { title, url, sub } = menuItem
    const linkRef = useRef(null)
    const bodyRef = useRef(null)
    const breakpoints = useBreakpoint()
    const height = !breakpoints.md || subOpen ? 'auto' : 0
    const handleSubClick = () => setSubOpen(!subOpen)
    return (
        <li tabIndex={sub && '0'} className="group w-full">
            <div className="flex justify-between items-center space-x-2">
                <a
                    aria-haspopup={(!!sub).toString()}
                    aria-expanded={subOpen.toString()}
                    ref={linkRef}
                    href={url}
                    className="lg:opacity-50 opacity-100 group-hover:opacity-100 text-white hover:text-white transition-opacity"
                >
                    {title}
                </a>
                {sub && (
                    <button onClick={handleSubClick}>
                        {breakpoints.md ? (
                            <Plus open={subOpen} />
                        ) : (
                            <Chevron className="opacity-50 group-hover:opacity-100 transition-opacity" />
                        )}
                    </button>
                )}
            </div>

            {sub && (
                <>
                    <TooltipPointer
                        hide={breakpoints.md}
                        parent={linkRef}
                        body={bodyRef}
                        offset={30}
                        className="absolute text-[#371a51] invisible opacity-0 group-focus:visible group-hover:visible group-focus:opacity-90 group-hover:opacity-90 transition-all"
                    />
                    <AnimateHeight height={height}>
                        <div
                            ref={bodyRef}
                            className={`z-10 mx-auto w-full max-w-screen-xl lg:absolute lg:left-1/2 lg:pt-[30px] border-transparent lg:transform lg:-translate-x-1/2 visible lg:group-focus:visible lg:group-hover:visible lg:invisible opacity-100 lg:group-focus:opacity-100 lg:group-hover:opacity-100 lg:opacity-0  transition-all`}
                        >
                            <div className="main-menu-submenu-container mx-auto bg-opacity-90 lg:bg-[#371a51]  lg:p-12 p-0 rounded">
                                <h1 className="hidden lg:block text-4xl m-0 font-bold">{sub.title}</h1>
                                <p className="hidden lg:block my-3">{sub.description}</p>
                                {sub.items.map((item, index) => {
                                    const { sections, title, link } = item
                                    const cols = sections.length
                                    return (
                                        <div key={index} className="lg:mt-12 mt-6 font-bold">
                                            <div className="flex items-center justify-between">
                                                <h2 className="text-lg lg:text-xl font-bold">{title}</h2>
                                                {link && (
                                                    <a
                                                        href={link.url}
                                                        className="flex items-center space-x-1 text-light-yellow hover:text-light-yellow"
                                                    >
                                                        <span>{link.title}</span>
                                                        <RightArrow className="w-5 h-5" />
                                                    </a>
                                                )}
                                            </div>

                                            <div
                                                className={`grid grid-cols-1 sm:grid-cols-${
                                                    cols > 3 ? '2' : '1'
                                                } lg:grid-cols-${cols} lg:divide-x-2 divide-white divide-opacity-10 bg-white bg-opacity-10 rounded lg:py-0 py-5`}
                                            >
                                                {sections.map((section, index) => {
                                                    const { title, link, items } = section
                                                    const rows = Math.ceil(items.length / 2)
                                                    return (
                                                        <div key={index} className="px-5 py-2 lg:py-5">
                                                            <div className="flex justify-between items-center text-base ">
                                                                <h3 className="text-base m-0 font-bold opacity-50">
                                                                    {title}
                                                                </h3>
                                                                {link && (
                                                                    <a
                                                                        className="text-light-yellow hover:text-light-yellow"
                                                                        href={link.url}
                                                                    >
                                                                        {link.title}
                                                                    </a>
                                                                )}
                                                            </div>
                                                            <ul
                                                                className={`list-none p-0 m-0 mt-4 grid lg:gap-x-20 ${
                                                                    cols > 3
                                                                        ? `grid-cols-1`
                                                                        : `grid-cols-1 sm:grid-cols-2 sm:grid-flow-col grid-rows-${rows}`
                                                                }`}
                                                            >
                                                                {items.map((item, index) => {
                                                                    const { icon, title, url } = item

                                                                    return (
                                                                        <li key={index}>
                                                                            <a
                                                                                className="text-white transition-colors hover:text-white p-2 hover:bg-[#6C5085] rounded flex items-center space-x-2"
                                                                                href={url}
                                                                            >
                                                                                {icon && (
                                                                                    <svg className="w-6 h-6">
                                                                                        <use
                                                                                            xlinkHref={`#${icon}`}
                                                                                        ></use>
                                                                                    </svg>
                                                                                )}
                                                                                <span>{title}</span>
                                                                            </a>
                                                                        </li>
                                                                    )
                                                                })}
                                                            </ul>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </AnimateHeight>
                </>
            )}
        </li>
    )
}

export default function MainNav({ expanded }) {
    const breakpoints = useBreakpoint()
    const height = !breakpoints.md || expanded ? 'auto' : 0
    return (
        <AnimateHeight duration={150} className={` z-50 lg:static absolute left-0 top-full w-full `} height={height}>
            <ul className="flex-col lg:space-y-0 space-y-6 lg:w-auto w-full bg-[#371a51] lg:bg-transparent flex lg:space-x-14 space-x-0 lg:flex lg:flex-row list-none justify-between lg:items-center items-start mb-0 font-nav lg:px-0 px-5 lg:py-0 py-5 text-white">
                {menu.map((menuItem, index) => (
                    <MenuItem key={index} menuItem={menuItem} />
                ))}
            </ul>
        </AnimateHeight>
    )
}
