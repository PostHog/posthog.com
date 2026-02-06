import React from 'react'
import Link from 'components/Link'
import Logo from 'components/Logo'
import { IconXNotTwitter, IconSubstack, IconYouTube, IconLinkedIn, IconGithub, IconInstagram } from 'components/OSIcons'
import * as Icons from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'

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

export default function WebsiteFooter() {
    return (
        <footer className="@container">
            {/* Main footer content */}
            <div data-scheme="secondary" className="bg-primary border-t border-primary">
                {/* Bottom bar */}
                <div className="p-4 bg-accent/30">
                    <div className="flex flex-col @md:flex-row @md:items-center @md:justify-between gap-3">
                        {/* Copyright and status */}
                        <div className="flex items-center gap-4">
                            <p className="text-sm text-secondary m-0">
                                &copy; {new Date().getFullYear()} PostHog, Inc.
                            </p>
                            <a
                                href="https://status.posthog.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-primary transition-colors underline"
                            >
                                <span className="size-2 rounded-full bg-green animate-pulse" />
                                <span>System status</span>
                            </a>
                        </div>

                        {/* Legal links */}
                        <nav className="flex flex-wrap items-center gap-4">
                            {legalLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.url}
                                    className="text-sm text-secondary hover:text-primary transition-colors underline"
                                >
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
