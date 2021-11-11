import cntl from 'cntl'
import Accordion from 'components/Accordion'
import Link from 'components/Link'
import Logo from 'components/Logo'
import React from 'react'

const linksHeadingSm = cntl`
    text-sm
    text-gray
    dark:text-gray
    mb-1
    leading-tight
    pb-[0.2rem]
`
const linksHeadingMd = cntl`
    text-base
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
    text-sm
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
    return (
        <footer className="max-w-screen-2xl mx-auto mt-20 pb-9 px-4 leading">
            <div className="py-2 border border-dashed border-gray-accent-light dark:border-gray-accent-dark border-l-0 border-r-0 max-w-6xl mx-auto">
                <ul className="list-none p-0 m-0 flex justify-between sm:space-x-12 items-center flex-wrap">
                    <li className="w-full sm:w-auto flex justify-center mb-2 lg:mb-0">
                        <Logo noText />
                    </li>
                    <FooterMenuItem
                        marginBottom="0"
                        className="md:text-base"
                        title="About"
                        url="/handbook/company/story"
                    />
                    <FooterMenuItem marginBottom="0" className="md:text-base" title="Blog" url="/blog" />
                    <FooterMenuItem marginBottom="0" className="md:text-base" title="Careers" url="/careers" />
                    <FooterMenuItem
                        marginBottom="0"
                        className="lg:!ml-auto md:text-base"
                        title="Support"
                        url="/support"
                    />
                    <FooterMenuItem
                        marginBottom="0"
                        className="md:text-base"
                        title="Contact sales"
                        url="/signup/self-host/get-in-touch#contact"
                    />
                </ul>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 max-w-6xl mx-auto my-9 lg:my-0">
                <div className="col-span-2 border-b-1 lg:border-r-1 border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:pr-10 py-4 lg:py-7">
                    <Accordion title={'Product analytics suite'} titleClasses={linksHeadingLg}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                            <div>
                                <h4 className={linksHeadingMd}>
                                    <Link
                                        to="/product"
                                        className="font-bold dark:text-primary-dark text-primary dark:hover:text-primary-dark hover:text-primary"
                                    >
                                        Product tour
                                    </Link>
                                </h4>
                                <h5 className={linksHeadingSm}>Analytics</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Trends" url="/product/#analytics" />
                                    <FooterMenuItem title="Funnels" url="/product/#analytics" />
                                    <FooterMenuItem title="Retention" url="/product/#analytics" />
                                </ul>
                            </div>
                            <div>
                                <h4 className={linksHeadingMd}>
                                    <Link
                                        to="/pricing"
                                        className="font-bold dark:text-primary-dark text-primary dark:hover:text-primary-dark hover:text-primary"
                                    >
                                        Pricing
                                    </Link>
                                </h4>
                                <h5 className={linksHeadingSm}>Features</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Session recordings" url="/product/#insights" />
                                    <FooterMenuItem title="Feature flags" url="/product/#insights" />
                                    <FooterMenuItem title="Plugins library" url="/plugins" />
                                </ul>
                            </div>
                            <div>
                                <h4 className={linksHeadingMd}>
                                    <Link
                                        to="/customers"
                                        className="font-bold dark:text-primary-dark text-primary dark:hover:text-primary-dark hover:text-primary"
                                    >
                                        Customers
                                    </Link>
                                </h4>
                                <h5 className={linksHeadingSm}>Platform</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Event autocapture" url="/product/#platform" />
                                    <FooterMenuItem title="Self-hosting" url="/product/#platform" />
                                    <FooterMenuItem title="Open source" url="https://github.com/posthog/posthog" />
                                </ul>
                            </div>
                        </div>
                    </Accordion>
                </div>
                <div className="col-span-1 border-b border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:px-10 py-4 lg:pb-7 lg:py-7">
                    <Accordion title="Community" titleClasses={linksHeadingLg}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h5 className={linksHeadingSm}>Discussion</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Slack" url="/slack" />
                                    <FooterMenuItem
                                        title="Issues"
                                        url="https://github.com/PostHog/posthog.com/issues"
                                    />
                                    <FooterMenuItem title="Support" url="/support" />
                                    <FooterMenuItem
                                        title="Contact sales"
                                        url="/signup/self-host/get-in-touch#contact"
                                    />
                                </ul>
                            </div>
                            <div>
                                <h5 className={linksHeadingSm}>Get involved</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Roadmap" url="/handbook/strategy/roadmap" />
                                    <FooterMenuItem title="Contributors" url="/contributors" />
                                    <FooterMenuItem title="Merch" url="https://merch.posthog.com/collections/all" />
                                    <FooterMenuItem
                                        title="PostHog FM"
                                        url="https://open.spotify.com/playlist/7A2H2J3WhpJmMEwAhKahWH?si=47418915a8d0447b"
                                    />
                                </ul>
                            </div>
                        </div>
                    </Accordion>
                </div>
                <div className="col-span-2 lg:border-r-1 border-b-1 lg:border-b-0 border-dashed border-gray-accent-light dark:border-gray-accent-dark lg:pr-10 py-4 lg:py-7">
                    <Accordion title="Docs" titleClasses={linksHeadingLg}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <h5 className={linksHeadingSm}>Getting started</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="PostHog Cloud" url="https://app.posthog.com/signup" />
                                    <FooterMenuItem title="Self-hosted" url="/docs/self-host" />
                                    <FooterMenuItem title="Compare options" url="/pricing" />
                                </ul>
                            </div>
                            <div>
                                <h5 className={linksHeadingSm}>Install & integrate</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem
                                        title="Installation"
                                        url="/docs/integrate/client/snippet-installation"
                                    />
                                    <FooterMenuItem title="Docs" url="/docs" />
                                    <FooterMenuItem title="API" url="/docs/api" />
                                </ul>
                            </div>
                            <div>
                                <h5 className={linksHeadingSm}>User guides</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Cohorts" url="/docs/user-guides/cohorts" />
                                    <FooterMenuItem title="Funnels" url="/docs/user-guides/funnels" />
                                    <FooterMenuItem title="Sessions" url="/docs/user-guides/sessions" />
                                    <FooterMenuItem title="Data" url="/docs/user-guides/actions" />
                                    <FooterMenuItem title="Plugins" url="/docs/user-guides/plugins" />
                                    <FooterMenuItem title="Events" url="/docs/user-guides/events" />
                                </ul>
                            </div>
                        </div>
                    </Accordion>
                </div>
                <div className="col-span-1 lg:px-10 py-4 lg:py-7">
                    <Accordion title="Company" titleClasses={linksHeadingLg}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <h5 className={linksHeadingSm}>About</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="Our story" url="/handbook/company/story" />
                                    <FooterMenuItem title="Team" url="/handbook/company/team" />
                                    <FooterMenuItem title="Handbook" url="/handbook" />
                                    <FooterMenuItem title="Investors" url="/handbook/strategy/investors" />
                                    <FooterMenuItem title="Careers" url="/careers" />
                                </ul>
                            </div>
                            <div>
                                <h5 className={linksHeadingSm}>Resources</h5>
                                <ul className="list-none p-0 m-0">
                                    <FooterMenuItem title="FAQ" url="/faq" />
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
            </div>
            <div className="flex py-5 border border-dashed border-gray-accent-light dark:border-gray-accent-dark border-l-0 border-r-0 items-center text-base max-w-6xl mx-auto">
                <small className="font-bold dark:text-gray">&copy; {new Date().getFullYear()} PostHog, Inc.</small>
                <ul className="m-0 p-0 list-none ml-auto flex sm:space-x-8 space-x-4">
                    <li>
                        <Link
                            to="/docs/contribute/code-of-conduct"
                            className="font-bold text-sm text-almost-black hover:text-almost-black dark:text-gray dark dark:hover:text-gray"
                        >
                            Code of conduct
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/privacy"
                            className="font-bold text-sm text-almost-black hover:text-almost-black dark:text-gray dark dark:hover:text-gray"
                        >
                            Privacy
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/terms"
                            className="font-bold text-sm text-almost-black hover:text-almost-black dark:text-gray dark dark:hover:text-gray"
                        >
                            Terms
                        </Link>
                    </li>
                </ul>
            </div>
        </footer>
    )
}
