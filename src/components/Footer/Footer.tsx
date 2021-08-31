import React from 'react'
import Link from 'components/Link'
import Logo from 'components/Logo'
import Accordion from 'components/Accordion'

const FooterMenuItem = ({ title, url, className = '' }) => {
    return (
        <li className={className}>
            <Link
                className={`text-primary hover:text-primary dark:text-primary-dark dark:hover:text-white text-sm font-bold leading-loose`}
                to={url}
            >
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
        <footer className="max-w-screen-2xl mx-auto mt-20 pb-9 px-4">
            <div className="py-2 border border-dashed border-gray-accent-light dark:border-gray-accent-dark border-l-0 border-r-0 max-w-6xl mx-auto">
                <ul className="list-none p-0 m-0 flex justify-between sm:space-x-12 items-center flex-wrap">
                    <div className="w-full sm:w-auto flex justify-center">
                        <Logo noText />
                    </div>
                    <FooterMenuItem className="md:text-base" title="About" url="/handbook/company/story" />
                    <FooterMenuItem className="md:text-base" title="Blog" url="/blog" />
                    <FooterMenuItem className="md:text-base" title="Careers" url="/careers" />
                    <FooterMenuItem className="lg:!ml-auto md:text-base" title="Support" url="/support" />
                    <FooterMenuItem
                        className="md:text-base"
                        title="Contact sales"
                        url="https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u"
                    />
                </ul>
            </div>
            <div className="mt-9 grid grid-cols-1 lg:grid-cols-3 max-w-6xl mx-auto">
                <div className="col-span-2 border-b-1 lg:border-r-1 border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:pr-10 pb-4 lg:pb-7">
                    <Accordion title={'Product analytics'}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div>
                                <h4 className="text-base mb-3">
                                    <Link
                                        to="/product"
                                        className="font-bold dark:text-primary-dark text-primary dark:hover:text-primary-dark hover:text-primary"
                                    >
                                        Product tour
                                    </Link>
                                </h4>
                                <h5 className="text-sm text-gray">Analytics</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Trends" url="/product-features/trends" />
                                    <FooterMenuItem title="Funnels" url="/product-features/funnels" />
                                    <FooterMenuItem title="Retention" url="/product-features/retention" />
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-base mb-3">
                                    <Link
                                        href="/pricing"
                                        className="font-bold dark:text-primary-dark text-primary dark:hover:text-primary-dark hover:text-primary"
                                    >
                                        Pricing
                                    </Link>
                                </h4>
                                <h5 className="text-sm text-gray">Apps</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem
                                        title="Session recordings"
                                        url="/product-features/session-recording"
                                    />
                                    <FooterMenuItem title="Feature flags" url="/product-features/feature-flags" />
                                    <FooterMenuItem title="Plugins library" url="/plugins" />
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-sm text-gray">Top features</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem
                                        title="Event autocapture"
                                        url="/product-features/event-autocapture"
                                    />
                                    <FooterMenuItem title="Self-hosting" url="/product-features/self-hosted" />
                                    <FooterMenuItem title="Open source" url="https://github.com/posthog/posthog" />
                                </ul>
                            </div>
                        </div>
                    </Accordion>
                </div>
                <div className="col-span-1 border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:px-10 pb-4 lg:pb-7 lg:pt-0 pt-4">
                    <Accordion title="Company">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h5 className="text-sm text-gray">About</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Our story" url="/handbook/company/story" />
                                    <FooterMenuItem title="Team" url="/handbook/company/team" />
                                    <FooterMenuItem title="Handbook" url="/handbook" />
                                    <FooterMenuItem title="Investors" url="/handbook/strategy/investors" />
                                    <FooterMenuItem title="Careers" url="/careers" />
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-sm text-gray">Resources</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Blog" url="/blog" />
                                    <FooterMenuItem title="Media" url="/media" />
                                    <FooterMenuItem title="Merch" url="https://merch.posthog.com/collections/all" />
                                    <FooterMenuItem
                                        title="YouTube"
                                        url="https://www.youtube.com/channel/UCn4mJ4kK5KVSvozJre645LA"
                                    />
                                </ul>
                            </div>
                        </div>
                    </Accordion>
                </div>
                <div className="col-span-2 lg:border-r-1 border-b-1 lg:border-b-0 border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:pr-10 pt-4 lg:pt-7 pb-4 lg:pb-0">
                    <Accordion title="Docs">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h5 className="text-sm text-gray">Getting started</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="PostHog Cloud" url="https://app.posthog.com/signup" />
                                    <FooterMenuItem title="Self hosting" url="/docs/self-host" />
                                    <FooterMenuItem
                                        title="Compare options"
                                        url="/docs/user-guides/organizations#cloud-vs-selfhosted"
                                    />
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-sm text-gray">Install & integrate</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem
                                        title="Installation"
                                        url="/docs/integrate/client/snippet-installation#docs-content-wrapper"
                                    />
                                    <FooterMenuItem title="Docs" url="/docs" />
                                    <FooterMenuItem title="API" url="/docs/api#docs-content-wrapper" />
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-sm text-gray">User guides</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Cohorts" url="/docs/user-guides/cohorts" />
                                    <FooterMenuItem title="Funnels" url="/docs/user-guides/funnels" />
                                    <FooterMenuItem title="Sessions" url="/docs/user-guides/sessions" />
                                    <FooterMenuItem title="Data" url="/docs/user-guides/actions" />
                                    <FooterMenuItem title="Plugins" url="/docs/user-guides/plugins" />
                                    <FooterMenuItem title="Events" url="/docs/user-guides/events" />
                                    <FooterMenuItem title="FAQ" url="/faq" />
                                </ul>
                            </div>
                        </div>
                    </Accordion>
                </div>
                <div className="col-span-1 lg:px-10 pt-4 lg:pt-7">
                    <Accordion title="Community">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h5 className="text-sm text-gray">Discussion</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Slack" url="/slack" />
                                    <FooterMenuItem
                                        title="Issues"
                                        url="https://github.com/PostHog/posthog.com/issues"
                                    />
                                    <FooterMenuItem title="Support" url="/support" />
                                    <FooterMenuItem
                                        title="Contact sales"
                                        url="https://share.hsforms.com/1-IVCY9gNRvaZBajMt_UPIg4559u"
                                    />
                                </ul>
                            </div>
                            <div>
                                <h5 className="text-sm text-gray">Get involved</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Roadmap" url="/handbook/strategy/roadmap" />
                                    <FooterMenuItem title="Contributors" url="/contributors" />
                                    <FooterMenuItem
                                        title="Code of conduct"
                                        url="/handbook/company/security#security-policies"
                                    />
                                    <FooterMenuItem title="Merch" url="https://merch.posthog.com/collections/all" />
                                </ul>
                            </div>
                        </div>
                    </Accordion>
                </div>
            </div>
            <div className="flex py-5 border border-dashed border-gray-accent-light dark:border-gray-accent-dark border-l-0 border-r-0 mt-9 items-center text-base max-w-6xl mx-auto">
                <small className="font-bold dark:text-gray">&copy; {new Date().getFullYear()} PostHog, Inc.</small>
                <ul className="m-0 p-0 list-none ml-auto flex sm:space-x-8 space-x-4 text-base">
                    <li>
                        <Link
                            to=""
                            className="font-bold text-almost-black hover:text-almost-black dark:text-gray dark hover:text-gray"
                        >
                            Privacy
                        </Link>
                    </li>
                    <li>
                        <Link
                            to=""
                            className="font-bold text-almost-black hover:text-almost-black dark:text-gray dark hover:text-gray"
                        >
                            Terms
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
