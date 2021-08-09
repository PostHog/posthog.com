import React, { useState } from 'react'
import { Link } from 'gatsby'

import { NewsletterForm } from '../NewsletterForm'
import logo from '../../images/posthog-hog-transparent.svg'

import { mergeClassList } from '../../lib/utils'
interface FooterListItemProps {
    to?: string
    href?: string
    children: any
    border?: boolean
}

const FooterListItem = ({ to = '', border = true, href = '', children }: FooterListItemProps) => {
    const baseClasses = 'block py-3 text-white text-opacity-60 hover:text-opacity-100 hover:text-white'
    const classList = border ? `${baseClasses} border-b border-gray-600` : baseClasses

    return to ? (
        <Link to={to} className={classList}>
            {children}
        </Link>
    ) : (
        <a href={href} className={classList}>
            {children}
        </a>
    )
}

const FooterSubCategory = ({ children }: { children: any }) => (
    <header className="block text-white mt-8 mb-2 font-bold text-sm">{children}</header>
)

const FooterCategory = ({ children, title }: { children: any; title: string }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <div>
            <h5
                className="md:hidden cursor-pointer text-white text-lg border-b border-gray-600 py-2 my-2"
                onClick={() => setExpanded(!expanded)}
            >
                {title}

                <span className="float-right block text-2xl">{expanded ? '-' : '+'}</span>
            </h5>
            <h5 className="hidden md:block text-white text-lg">{title}</h5>
            <div className={expanded ? 'block' : 'hidden md:block'}>{children}</div>
        </div>
    )
}

export function Footer({
    showNewsletter = false,
    backgroundClass = '',
    transparentBg = false,
}: {
    showNewsletter?: boolean
    backgroundClass?: string
    transparentBg?: boolean
}): JSX.Element {
    const newsletterSignup = showNewsletter ? <NewsletterForm /> : null
    const classList = mergeClassList(
        'site-footer py-24 relative',
        backgroundClass,
        transparentBg ? 'site-footer--transparent' : null
    )

    return (
        <div className={classList}>
            {newsletterSignup}
            <img src={logo} className="mx-auto block text-center" />
            <div className="w-11/12 max-w-5xl flex flex-col md:flex-row justify-between mx-auto mt-24">
                <div className="w-full md:w-1/4 md:pr-8">
                    <FooterCategory title="Product">
                        <FooterSubCategory>Overview</FooterSubCategory>
                        <FooterListItem to="/product" border={false}>
                            Product
                        </FooterListItem>

                        <FooterSubCategory>Product suite</FooterSubCategory>
                        <FooterListItem to="/product-features/trends">Trends</FooterListItem>
                        <FooterListItem to="/product-features/funnels">Funnels</FooterListItem>
                        <FooterListItem to="/product-features/retention">Retention</FooterListItem>
                        <FooterListItem to="/product-features/session-recording">Session replay</FooterListItem>
                        <FooterListItem to="/product-features/feature-flags">Feature Flags</FooterListItem>
                        <FooterListItem to="/plugins" border={false}>
                            Plugin Library
                        </FooterListItem>

                        <FooterSubCategory>Features</FooterSubCategory>
                        <FooterListItem to="/product-features/event-autocapture">Auto capture</FooterListItem>
                        <FooterListItem to="/product-features/plugins">Plugins</FooterListItem>
                        <FooterListItem to="/product-features/self-hosted">Data portability</FooterListItem>
                        <FooterListItem to="/product-features/self-hosted" border={false}>
                            Self-hosting options
                        </FooterListItem>
                    </FooterCategory>
                </div>
                <div className="w-full md:w-1/4 md:px-8">
                    <FooterCategory title="Community">
                        <FooterSubCategory>Code</FooterSubCategory>
                        <FooterListItem href="https://github.com/posthog/posthog">Source code</FooterListItem>
                        <FooterListItem href="https://github.com/posthog" border={false}>
                            All repositories
                        </FooterListItem>

                        <FooterSubCategory>Discussion</FooterSubCategory>
                        <FooterListItem to="/slack">Slack</FooterListItem>
                        <FooterListItem href="https://github.com/PostHog/posthog/issues">Issues</FooterListItem>
                        <FooterListItem to="/support">Support</FooterListItem>
                        <FooterListItem href="https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u" border={false}>
                            Contact Sales
                        </FooterListItem>

                        <FooterSubCategory>Get involved</FooterSubCategory>
                        <FooterListItem href="/docs/contribute/code-of-conduct">Code of conduct</FooterListItem>
                        <FooterListItem href="/handbook/strategy/roadmap">Roadmap</FooterListItem>
                        <FooterListItem to="/contributors">Contributors</FooterListItem>
                        <FooterListItem href="https://merch.posthog.com/collections/all" border={false}>
                            Merch
                        </FooterListItem>
                    </FooterCategory>
                </div>
                <div className="w-full md:w-1/4 md:px-8">
                    <FooterCategory title="Docs">
                        <FooterSubCategory>Getting started</FooterSubCategory>
                        <FooterListItem href="https://app.posthog.com/signup">PostHog cloud</FooterListItem>
                        <FooterListItem to="/docs/self-host/deploy/overview" border={false}>
                            Deploying PostHog
                        </FooterListItem>

                        <FooterSubCategory>Configuring PostHog</FooterSubCategory>
                        <FooterListItem to="/docs/self-host/configure">Installation</FooterListItem>
                        <FooterListItem to="/docs">Docs</FooterListItem>
                        <FooterListItem to="/docs/api/overview">API</FooterListItem>
                        <FooterListItem to="/docs/integrate/overview" border={false}>
                            Libraries
                        </FooterListItem>

                        <FooterSubCategory>Using PostHog</FooterSubCategory>
                        <FooterListItem to="/docs/user-guides/overview">Features</FooterListItem>
                        <FooterListItem to="/docs/plugins/overview">Plugins</FooterListItem>
                        <FooterListItem to="/docs/tutorials/overview">Tutorials</FooterListItem>
                        <FooterListItem to="/faq" border={false}>
                            FAQ
                        </FooterListItem>
                    </FooterCategory>
                </div>
                <div className="w-full md:w-1/4 md:pl-8">
                    <FooterCategory title="Company">
                        <FooterSubCategory>About</FooterSubCategory>
                        <FooterListItem href="https://github.com/posthog/posthog">Open source</FooterListItem>
                        <FooterListItem to="/handbook/company/story">Our story</FooterListItem>
                        <FooterListItem to="/handbook">Handbook</FooterListItem>
                        <FooterListItem to="/handbook/company/team">Team</FooterListItem>
                        <FooterListItem to="/handbook/strategy/investors">Investors</FooterListItem>
                        <FooterListItem to="/careers" border={false}>
                            Careers
                        </FooterListItem>

                        <FooterSubCategory>Resources</FooterSubCategory>
                        <FooterListItem to="/blog">Blog</FooterListItem>
                        <FooterListItem to="/media">Media</FooterListItem>
                        <FooterListItem href="https://merch.posthog.com/collections/all" border={false}>
                            Merch
                        </FooterListItem>

                        <FooterSubCategory>Get in touch</FooterSubCategory>
                        <FooterListItem href="https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u">
                            Contact Sales
                        </FooterListItem>
                        <FooterListItem href="https://posthog.com/support" border={false}>
                            Support
                        </FooterListItem>
                    </FooterCategory>
                </div>
            </div>

            <div className="w-11/12 mt-24 text-center mx-auto">
                <span className="text-sm font-bold text-white text-opacity-40">&copy; 2021 PostHog, Inc.</span>
                <div className="mt-4">
                    <Link
                        to="/privacy"
                        className="p-2 mx-1 text-white bg-transparent border rounded opacity-60 hover:text-white hover:opacity-100"
                    >
                        Privacy
                    </Link>
                    <Link
                        to="/terms"
                        className="p-2 mx-1 text-white bg-transparent border rounded opacity-60 hover:text-white hover:opacity-100"
                    >
                        Terms
                    </Link>
                </div>
            </div>
        </div>
    )
}
