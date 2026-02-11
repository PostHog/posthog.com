import React from 'react'
import Link from 'components/Link'
import Logo from 'components/Logo'
import { IconXNotTwitter, IconSubstack, IconYouTube, IconLinkedIn, IconGithub, IconInstagram } from 'components/OSIcons'
import * as Icons from '@posthog/icons'
import AppStatus from 'components/AppStatus'
import OSButton from 'components/OSButton'

interface FooterLink {
    label: string
    url: string
    icon?: React.ReactNode
    external?: boolean
}

interface FooterColumn {
    title: string
    titleUrl?: string
    icon?: React.ReactNode
    links: FooterLink[]
}

const footerColumns: FooterColumn[] = [
    {
        title: 'Products',
        titleUrl: '/products',
        icon: <Icons.IconApps className="size-4 text-red" />,
        links: [
            { label: 'Product analytics', url: '/product-analytics' },
            { label: 'Web analytics', url: '/web-analytics' },
            { label: 'Session replay', url: '/session-replay' },
            { label: 'Feature flags', url: '/feature-flags' },
            { label: 'Experiments', url: '/experiments' },
            { label: 'Surveys', url: '/surveys' },
            { label: 'Error tracking', url: '/error-tracking' },
            { label: 'Data warehouse', url: '/data-warehouse' },
            { label: 'PostHog AI', url: '/ai' },
        ],
    },
    {
        title: 'Docs',
        titleUrl: '/docs',
        icon: <Icons.IconBook className="size-4 text-purple" />,
        links: [
            { label: 'Getting started', url: '/docs/getting-started/install' },
            { label: 'SDKs & frameworks', url: '/docs/libraries' },
            { label: 'Data management', url: '/docs/data' },
            { label: 'API', url: '/docs/api' },
            { label: 'Tutorials', url: '/tutorials' },
            { label: 'Templates', url: '/templates' },
        ],
    },
    {
        title: 'Community',
        titleUrl: '/community',
        icon: <Icons.IconMessage className="size-4 text-green" />,
        links: [
            { label: 'Questions', url: '/questions' },
            { label: 'Newsletter', url: '/newsletter' },
            { label: 'Blog', url: '/blog' },
            { label: 'Product engineers', url: '/product-engineers' },
            { label: 'Founders', url: '/founders' },
            { label: 'Merch', url: '/merch' },
        ],
    },
    {
        title: 'Company',
        titleUrl: '/about',
        icon: <Icons.IconBuilding className="size-4 text-blue" />,
        links: [
            { label: 'About', url: '/about' },
            { label: 'Customers', url: '/customers' },
            { label: 'Careers', url: '/careers' },
            { label: 'People', url: '/people' },
            { label: 'Handbook', url: '/handbook' },
            { label: 'Roadmap', url: '/roadmap' },
            { label: 'Changelog', url: '/changelog' },
        ],
    },
]

const socialLinks = [
    {
        label: 'X',
        url: 'https://x.com/posthog',
        icon: <IconXNotTwitter className="size-4" />,
    },
    {
        label: 'LinkedIn',
        url: 'https://www.linkedin.com/company/posthog',
        icon: <IconLinkedIn className="size-4" />,
    },
    {
        label: 'GitHub',
        url: 'https://github.com/posthog',
        icon: <IconGithub className="size-4" />,
    },
    {
        label: 'YouTube',
        url: 'https://www.youtube.com/@posthog',
        icon: <IconYouTube className="size-4" />,
    },
    {
        label: 'Substack',
        url: 'https://newsletter.posthog.com',
        icon: <IconSubstack className="size-4" />,
    },
    {
        label: 'Instagram',
        url: 'https://www.instagram.com/teamposthog',
        icon: <IconInstagram className="size-4" />,
    },
]

const legalLinks = [
    { label: 'Terms', url: '/terms' },
    { label: 'Privacy', url: '/privacy' },
    { label: 'DPA', url: '/dpa' },
    { label: 'SOC 2', url: '/handbook/company/security#soc-2' },
    { label: 'HIPAA', url: '/docs/privacy/hipaa-compliance' },
]

export default function WebsiteFooter(): React.ReactElement {
    return (
        <footer className="@container z-40">
            <div data-scheme="secondary" className="bg-primary border-t border-primary">
                {/* Main footer content */}
                <div className="p-6 @lg:p-8 border-b border-primary">
                    <div className="flex flex-col @lg:flex-row gap-8 @lg:gap-12">
                        {/* Logo and social links - stacks on small, side column on large */}
                        <div className="flex flex-col gap-4 @lg:gap-6 @lg:w-48 @lg:shrink-0 items-center @lg:items-start">
                            <Link to="/" className="inline-block">
                                <Logo className="h-6" />
                            </Link>

                            {/* Social links */}
                            <div className="flex flex-wrap gap-1">
                                {socialLinks.map((social) => (
                                    <OSButton
                                        key={social.label}
                                        icon={social.icon}
                                        to={social.url}
                                        asLink
                                        external
                                        hideExternalIcon
                                        tooltip={social.label}
                                        size="sm"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Footer columns - responsive grid */}
                        <div className="grid grid-cols-2 @2xl:grid-cols-4 gap-6 @lg:gap-8 flex-1">
                            {footerColumns.map((column) => (
                                <div key={column.title} className="flex flex-col gap-3">
                                    <Link
                                        to={column.titleUrl || '#'}
                                        className="flex items-center gap-2 text-sm font-semibold"
                                    >
                                        <span>{column.title}</span>
                                    </Link>
                                    <nav className="flex flex-col gap-2">
                                        {column.links.map((link) => (
                                            <Link
                                                key={link.label}
                                                to={link.url}
                                                externalNoIcon={link.external}
                                                className="text-sm underline"
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </nav>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="p-3 @lg:px-8 bg-accent/30 border-t border-primary/10 text-xs">
                    <div className="flex flex-col @xl:flex-row @xl:items-center @xl:justify-between gap-3">
                        {/* Copyright and status */}
                        <div className="flex items-center gap-4 justify-between @xl:justify-start">
                            <p className="text-secondary m-0">&copy; {new Date().getFullYear()} PostHog, Inc.</p>
                            <AppStatus textClassName="text-xs underline" />
                        </div>

                        {/* Legal links */}
                        <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            {legalLinks.map((link) => (
                                <Link key={link.label} to={link.url} className="transition-colors underline">
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>
        </footer>
    )
}
