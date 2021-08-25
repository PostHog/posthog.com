import React, { useState } from 'react'
import Link from 'components/Link'
import { NewsletterForm } from '../NewsletterForm'
import logo from '../../images/posthog-hog-transparent.svg'

import { mergeClassList } from '../../lib/utils'
import Logo from 'components/Logo'
interface FooterListItemProps {
    to?: string
    href?: string
    children: any
    border?: boolean
}

const FooterSubCategory = ({ children }: { children: any }) => (
    <header className="block text-white mt-8 mb-2 font-bold text-sm">{children}</header>
)

const FooterCategory = ({ children, title }: { children: any; title: string }) => {
    const [expanded, setExpanded] = useState(false)

    return (
        <div>
            <h5
                className="md:hidden cursor-pointer text-white text-lg border-b border-gray-accent-light-600 py-2 my-2"
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

function FooterMenuItem({ title, url, className = '' }) {
    return (
        <li className={className}>
            <Link className={`text-almost-black hover:text-almost-black font-semibold leading-loose`} to={url}>
                {title}
            </Link>
        </li>
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
    return (
        <footer className="max-w-7xl mx-auto px-4">
            <div className="py-5 border-2 border-dashed border-gray-accent-light border-l-0 border-r-0">
                <ul className="list-none p-0 m-0 flex space-x-16 items-center flex-wrap">
                    <div className="w-full sm:w-auto flex justify-center">
                        <Logo noText />
                    </div>
                    <FooterMenuItem className="md:text-lg" title="About" url="/" />
                    <FooterMenuItem className="md:text-lg" title="Blog" url="/" />
                    <FooterMenuItem className="md:text-lg" title="Careers" url="/" />
                    <FooterMenuItem className="lg:!ml-auto md:text-lg" title="Support" url="/" />
                    <FooterMenuItem className="md:text-lg" title="Contact sales" url="/" />
                </ul>
            </div>
            <div className="mt-9 grid grid-cols-1 lg:grid-cols-3 max-w-6xl mx-auto">
                <div className="col-span-2 border-b-2 lg:border-r-2 border-dashed border-gray-accent-light lg:pr-10 pb-7">
                    <h3 className="text-xl">Product analytics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <h4 className="text-base">Product tour</h4>
                            <h5 className="text-base text-gray m-0">Analytics</h5>
                            <ul className="list-none p-0 m-0">
                                <FooterMenuItem title="Trends" url="/" />
                                <FooterMenuItem title="Funnels" url="/" />
                                <FooterMenuItem title="Retention" url="/" />
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-base">Pricing</h4>
                            <h5 className="text-base text-gray m-0">Apps</h5>
                            <ul className="list-none p-0 m-0">
                                <FooterMenuItem title="Session recordings" url="/" />
                                <FooterMenuItem title="Feature flags" url="/" />
                                <FooterMenuItem title="Plugins library" url="/" />
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-base">Customers</h4>
                            <h5 className="text-base text-gray m-0">Top features</h5>
                            <ul className="list-none p-0 m-0">
                                <FooterMenuItem title="Event autocapture" url="/" />
                                <FooterMenuItem title="Self-hosting" url="/" />
                                <FooterMenuItem title="Open source" url="/" />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 border-b-2 border-dashed border-gray-accent-light lg:px-10 pb-7 lg:pt-0 pt-7">
                    <h3 className="text-xl">Company</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h5 className="text-base text-gray m-0">About</h5>
                            <ul className="list-none p-0 m-0">
                                <FooterMenuItem title="Our story" url="" />
                                <FooterMenuItem title="Team" url="" />
                                <FooterMenuItem title="Handbook" url="" />
                                <FooterMenuItem title="Investors" url="" />
                                <FooterMenuItem title="Careers" url="" />
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-base text-gray m-0">Resources</h5>
                            <ul className="list-none p-0 m-0">
                                <FooterMenuItem title="Blog" url="" />
                                <FooterMenuItem title="Media" url="" />
                                <FooterMenuItem title="Merch" url="" />
                                <FooterMenuItem title="YouTube" url="" />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 lg:border-r-2 border-b-2 lg:border-b-0 border-dashed border-gray-accent-light lg:pr-10 pt-7 pb-7 lg:pb-0">
                    <h3 className="text-xl">Docs</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <h5 className="text-base text-gray m-0">Getting started</h5>
                            <ul className="list-none p-0 m-0">
                                <FooterMenuItem title="PostHog Cloud" url="" />
                                <FooterMenuItem title="Self hosting" url="" />
                                <FooterMenuItem title="Compare options" url="" />
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-base text-gray m-0">Install & integrate</h5>
                            <ul className="list-none p-0 m-0">
                                <FooterMenuItem title="Installation" url="" />
                                <FooterMenuItem title="Docs" url="" />
                                <FooterMenuItem title="API" url="" />
                                <FooterMenuItem title="Libraries" url="" />
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-base text-gray m-0">User guides</h5>
                            <ul className="list-none p-0 m-0">
                                <FooterMenuItem title="Analytics" url="" />
                                <FooterMenuItem title="Apps" url="" />
                                <FooterMenuItem title="Platform" url="" />
                                <FooterMenuItem title="Data" url="" />
                                <FooterMenuItem title="Plugins" url="" />
                                <FooterMenuItem title="Tutorials" url="" />
                                <FooterMenuItem title="FAQ" url="" />
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 lg:px-10 pt-7">
                    <h3 className="text-xl">Community</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h5 className="text-base text-gray m-0">Discussion</h5>
                            <ul className="list-none p-0 m-0">
                                <FooterMenuItem title="Slack" url="" />
                                <FooterMenuItem title="Issues" url="" />
                                <FooterMenuItem title="Support" url="" />
                                <FooterMenuItem title="Contact sales" url="" />
                            </ul>
                        </div>
                        <div>
                            <h5 className="text-base text-gray m-0">Get involved</h5>
                            <ul className="list-none p-0 m-0">
                                <FooterMenuItem title="Roadmap" url="" />
                                <FooterMenuItem title="Contributors" url="" />
                                <FooterMenuItem title="Code of conduct" url="" />
                                <FooterMenuItem title="Merch" url="" />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex py-5 border-2 border-dashed border-gray-accent-light border-l-0 border-r-0 mt-9 items-center">
                <small className="sm:text-base text-xs font-bold text-gray">
                    &copy; {new Date().getFullYear()} PostHog, Inc.
                </small>
                <ul className="m-0 p-0 list-none ml-auto flex sm:space-x-16 space-x-4">
                    <li>
                        <Link to="" className="sm:text-base text-xs font-bold text-gray hover:text-gray">
                            Privacy
                        </Link>
                    </li>
                    <li>
                        <Link to="" className="sm:text-base text-xs font-bold text-gray hover:text-gray">
                            Terms
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
