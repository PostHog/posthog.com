import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Breadcrumbs from 'components/Breadcrumbs'
import Icon from 'components/SupportImages/Icon'
import { PostHogWhite } from 'components/Icons/Icons'
import DeployOption from 'components/DeployOption'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import { DocSearchModal } from '@docsearch/react'
import { createPortal } from 'react-dom'

const quickLinks = [
    {
        icon: 'selfHost',
        name: 'Self-host',
        to: '/docs/self-host',
        description: 'Detailed information on getting PostHog running on your own.',
    },
    {
        icon: 'api',
        name: 'Integrate',
        to: '/docs/integrate',
        description: 'Connect PostHog to your website, app, or backend.',
    },
    {
        icon: 'apps',
        name: 'Apps',
        to: '/docs/apps',
        description: 'Extend PostHog by adding your own funcionality.',
    },
    {
        icon: 'partners',
        name: 'Tutorials',
        to: '/tutorials',
        description: 'Step-by-step guides on how to use every feature.',
    },
    {
        icon: 'feature-flags',
        name: 'API',
        to: '/docs/api',
        description: 'Interact with PostHog programmatically through our API.',
    },
    {
        icon: 'faq2',
        name: 'Ask a question',
        to: '/questions',
        description: "Can't find what you're looking for? Ask a question here.",
    },
]

const deployment = [
    { name: 'PostHog Cloud', to: '/signup', icon: 'posthog', badge: undefined },
    { name: 'AWS', to: '/docs/self-host/deploy/aws', icon: 'aws', badge: undefined },
    { name: 'Google Cloud', to: '/docs/self-host/deploy/gcp', icon: 'gcs', badge: undefined },
    { name: 'Digital Ocean', to: '/docs/self-host/deploy/digital-ocean', icon: 'digital ocean', badge: undefined },
    { name: 'Azure', to: '/docs/self-host/deploy/azure', icon: 'azure', badge: 'beta' },
    { name: 'Hobby', to: '/docs/self-host/deploy/hobby', icon: 'hobby', badge: undefined },
]

const libraries = [
    { name: 'JavaScript', to: '/docs/integrate/client/js', icon: 'js' },
    { name: 'NodeJS', to: '/docs/integrate/server/node', icon: 'nodejs' },
    { name: 'Ruby', to: '/docs/integrate/server/ruby', icon: 'ruby' },
    { name: 'React Native', to: '/docs/integrate/client/react-native', icon: 'react' },
    { name: 'iOS', to: '/docs/integrate/client/ios', icon: 'ios' },
    { name: 'Android', to: '/docs/integrate/client/android', icon: 'android' },
]

const apps = [
    { name: 'Segment', to: '/docs/integrate/third-party/segment', icon: 'segment' },
    { name: 'Sentry', to: '/docs/integrate/third-party/sentry', icon: 'sentry' },
    { name: 'Slack', to: '/docs/integrate/webhooks/slack', icon: 'slack' },
    { name: 'Shopify', to: '/docs/integrate/third-party/shopify', icon: 'shopify' },
    { name: 'WordPress', to: '/docs/integrate/third-party/wordpress', icon: 'wordpress' },
    { name: 'Zapier', to: '/docs/integrate/third-party/zapier', icon: 'zapier' },
]

const featureLinks = [
    { name: 'Trends', to: '/docs/user-guides/trends', icon: 'trendz' },
    { name: 'Funnels', to: '/docs/user-guides/funnels', icon: 'funnels' },
    { name: 'User paths', to: '/docs/user-guides/paths', icon: 'user-paths' },
    { name: 'Correlation analysis', to: '/docs/user-guides/correlation', icon: 'correlation-analysis' },
    { name: 'Session recording', to: '/docs/user-guides/recordings', icon: 'session-recording' },
    { name: 'Feature flags', to: '/docs/user-guides/feature-flags', icon: 'feature-flags' },
    { name: 'Experimentation', to: '/docs/user-guides/experimentation', icon: 'experimentation' },
    { name: 'Heatmaps', to: '/docs/user-guides/toolbar', icon: 'heatmaps' },
    { name: 'Apps', to: '/docs/apps', icon: 'apps' },
    { name: 'Toolbar', to: '/docs/user-guides/toolbar', icon: 'toolbar' },
    { name: 'Insights', to: '/docs/user-guides/insights', icon: 'insights' },
    { name: 'Group analytics', to: '/docs/user-guides/group-analytics', icon: 'group-analytics' },
]

export const DocsIndex: React.FC = () => {
    const [query, setQuery] = React.useState<string>('')
    const [searchOpen, setSearchOpen] = React.useState<boolean>(false)

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()

        if (query.trim()) {
            setSearchOpen(true)
        }
    }

    return (
        <Layout>
            <SEO title="Documentation - PostHog" />
            <Breadcrumbs
                crumbs={[{ title: 'Docs' }]}
                darkModeToggle
                className="px-4 mt-4 sticky top-[-2px] z-10 bg-tan dark:bg-primary"
            />

            <div className="max-w-5xl mx-auto space-y-16 lg:space-y-24 px-4">
                <section>
                    <div className="flex justify-start relative py-12 lg:py-20 overflow-hidden items-center -mx-px">
                        <div className="w-full">
                            <h1 className="font-bold mb-2">Documentation</h1>
                            <h5>In-depth tutorials, references, and examples for everything in PostHog</h5>

                            {searchOpen &&
                                createPortal(
                                    <DocSearchModal
                                        initialScrollY={window.scrollY}
                                        appId="B763I3AO0D"
                                        indexName="posthog"
                                        apiKey="f1386529b9fafc5c3467e0380f19de4b"
                                        initialQuery={query}
                                        onClose={() => setSearchOpen(false)}
                                    />,
                                    document.body
                                )}

                            <form
                                onSubmit={handleSubmit}
                                className="flex items-center relative mb-0 mt-8 w-full max-w-lg"
                            >
                                <div className="absolute left-4 w-4 h-4">
                                    <svg
                                        className="opacity-50"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 18 18"
                                    >
                                        <g opacity="1" clipPath="url(#a)">
                                            <path
                                                d="m18 15.964-4.794-4.793A7.2 7.2 0 1 0 .001 7.2a7.2 7.2 0 0 0 11.17 6.006L15.963 18 18 15.964ZM2.04 7.2A5.16 5.16 0 0 1 7.2 2.043 5.16 5.16 0 1 1 2.04 7.2Z"
                                                fill="#90794B"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="a">
                                                <path fill="#fff" d="M0 0h18v18H0z" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <input
                                    onChange={(e) => setQuery(e.target.value)}
                                    value={query}
                                    name="docs-search"
                                    placeholder="Search documentation..."
                                    autoFocus={true}
                                    className="pl-10 py-3 text-base text-left text-gray bg-white dark:bg-gray-accent-dark rounded-full w-full ring-red shadow-lg shadow-[0_100px_80px_0_rgba(0,0,0,0.07),0px_14.5036px_24.1177px_rgba(0,0,0,0.0395839),0_6.68266px_10.0172px_rgba(0,0,0,0.0291065),0_4.88627px_3.62304px_rgba(0,0,0,0.0214061)]"
                                />

                                <button className="hidden px-6 py-3 bg-red text-base shadow-md rounded-sm text-white font-bold">
                                    Search
                                </button>
                            </form>
                        </div>

                        <span className="hidden lg:block absolute right-0 bottom-0">
                            <StaticImage
                                src="../../contents/images/search-hog-3.png"
                                alt="This hog has an answer"
                                width={500}
                                placeholder="blurred"
                            />
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-l border-t border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                        {quickLinks.map((link) => {
                            return (
                                <Link
                                    to={link.to}
                                    key={link.name}
                                    className="border-b border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark px-8 py-4 flex items-start space-x-3 hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark"
                                >
                                    <Icon className="w-6 h-6 text-gray mt-1 lg:mt-0.5 shrink-0" name={link.icon} />
                                    <div>
                                        <h3 className="text-lg font-bold text-orange mb-0.5">{link.name}</h3>
                                        <p className="text-black dark:text-white font-medium mb-2 text-gray-accent-dark text-sm">
                                            {link.description}
                                        </p>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </section>

                <section className="space-y-10">
                    <div className="text-center">
                        <h2 className="font-bold mb-1">Get started</h2>
                        <p className="text-gray font-medium">Information on how to get PostHog up and running</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4 rounded lg:rounded-none overflow-hidden">
                        <div className="bg-white dark:bg-gray-accent-dark lg:rounded px-6 py-4">
                            <div>
                                <h4 className="font-bold mb-1">
                                    <span className="text-gray text-base">1.</span> Deploy
                                </h4>
                                <p className="text-sm text-gray">Spin up your PostHog instance</p>
                            </div>

                            <ul className="grid grid-cols-2 md:grid-cols-1 w-full list-none m-0 p-0">
                                {deployment.map((deploy) => {
                                    return (
                                        <li className="flex-grow" key={deploy.name}>
                                            <DeployOption
                                                url={deploy.to}
                                                title={deploy.name}
                                                icon={deploy.icon}
                                                disablePrefetch={false}
                                                badge={deploy.badge}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-gray-accent-dark lg:rounded px-6 py-4">
                            <div>
                                <h4 className="font-bold mb-1">
                                    <span className="text-gray text-base">2.</span> Integrate
                                </h4>
                                <p className="text-gray">Start tracking events and users</p>
                            </div>
                            <ul className="grid grid-cols-2 md:grid-cols-1 w-full list-none m-0 p-0">
                                {libraries.map((library) => {
                                    return (
                                        <li className="flex-grow" key={library.name}>
                                            <DeployOption
                                                url={library.to}
                                                title={library.name}
                                                icon={library.icon}
                                                disablePrefetch={false}
                                                badge={undefined}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="bg-white dark:bg-gray-accent-dark lg:rounded px-6 py-4">
                            <h4 className="font-bold mb-1">
                                <span className="text-gray text-base">3.</span> Customize
                            </h4>
                            <p className="text-gray">Customize your installation with apps</p>
                            <ul className="grid grid-cols-2 md:grid-cols-1 w-full list-none m-0 p-0">
                                {apps.map((app) => {
                                    return (
                                        <li className="flex-grow" key={app.name}>
                                            <DeployOption
                                                url={app.to}
                                                title={app.name}
                                                icon={app.icon}
                                                disablePrefetch={false}
                                                badge={undefined}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-center font-bold mb-8">Browse guides by feature</h2>

                    <ul className="grid grid-cols-2 lg:grid-cols-4 border-l border-t border-dashed border-gray-accent-light dark:border-gray-accent-dark m-0 p-0">
                        {featureLinks.map((link) => {
                            return (
                                <li
                                    key={link.name}
                                    className="list-none border-dashed border-b border-r border-gray-accent-light dark:border-gray-accent-dark"
                                >
                                    <Link
                                        to={link.to}
                                        className="w-full h-full flex items-center px-8 py-5 flex items-start space-x-3 hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark"
                                    >
                                        <Icon className="w-6 h-6 text-gray" name={link.icon} />
                                        <h3 className="text-lg font-bold text-sm m-0">{link.name}</h3>
                                    </Link>
                                </li>
                            )
                        })}

                        <li className="list-none border-dashed border-gray-accent-light dark:border-gray-accent-dark hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark border-r border-b col-span-full">
                            <Link className="flex items-center justify-center w-full py-4" to="/docs/user-guides">
                                View all (23)
                            </Link>
                        </li>
                    </ul>
                </section>
            </div>
        </Layout>
    )
}

export default DocsIndex
