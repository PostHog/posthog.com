import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import Icon from 'components/SupportImages/Icon'
import DeployOption from 'components/DeployOption'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import docs from 'sidebars/docs.json'
import SearchBox from 'components/Search/SearchBox'

const quickLinks = [
    {
        icon: 'selfHost',
        name: 'Deploy',
        to: '/docs/self-host',
        description: 'Detailed information on getting PostHog running.',
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
        description: 'Extend PostHog by adding your own functionality.',
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
        description: 'Interact with PostHog programmatically.',
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
    { name: 'DigitalOcean', to: '/docs/self-host/deploy/digital-ocean', icon: 'digital ocean', badge: undefined },
    { name: 'Azure', to: '/docs/self-host/deploy/azure', icon: 'azure', badge: 'beta' },
    { name: 'Hobby', to: '/docs/self-host/deploy/hobby', icon: 'docker', badge: undefined },
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
    { name: 'Zapier', to: '/apps/zapier-connector', icon: 'zapier' },
]

const otherLinks = [
    {
        name: 'Integrate PostHog',
        links: [
            { name: 'Live events', to: '/docs/integrate/ingest-live-data' },
            { name: 'Historical events', to: '/docs/integrate/ingest-historic-data' },
            { name: 'Identifying users', to: '/docs/integrate/identifying-users' },
            { name: 'Libraries', to: '/docs/integrate/libraries' },
            { name: 'Proxying events', to: '/docs/integrate/proxy' },
        ],
    },
    {
        name: 'Product manual',
        links: [
            { name: 'Trends', to: '/manual/trends' },
            { name: 'Funnels', to: '/manual/funnels' },
            { name: 'Retention', to: '/manual/retention' },
            { name: 'Session recording', to: '/manual/recordings' },
            { name: 'Feature flags', to: '/manual/feature-flags' },
            { name: 'Experimentation', to: '/manual/experimentation' },
        ],
    },
    {
        name: 'Self-host',
        links: [
            { name: 'Deployment', to: '/docs/self-host' },
            { name: 'Runbook', to: '/docs/runbook' },
            { name: 'Environment variables', to: '/docs/self-host/configure/environment-variables' },
            { name: 'Monitoring', to: '/docs/self-host/configure/monitoring-with-grafana' },
            { name: 'Upgrading', to: '/docs/runbook/upgrading-posthog' },
            { name: 'Troubleshooting', to: '/docs/self-host/deploy/troubleshooting' },
        ],
    },
    {
        name: 'Apps',
        links: [
            { name: 'Explore app library', to: '/apps' },
            { name: 'Use cases', to: '/docs/apps' },
            { name: 'Building an app', to: '/docs/apps/build' },
            { name: 'Developer reference', to: '/docs/apps/build/reference' },
        ],
    },
    {
        name: 'Developers',
        links: [
            { name: 'REST API', to: '/docs/api' },
            { name: 'Developing locally', to: '/handbook/engineering/developing-locally' },
            { name: 'Contributing', to: '/docs/contribute' },
            { name: 'How PostHog works', to: '/docs/how-posthog-works' },
        ],
    },
    {
        name: 'Privacy & compliance',
        links: [
            { name: 'GDPR', to: '/docs/privacy/gdpr-compliance' },
            { name: 'HIPAA', to: '/docs/privacy/hipaa-compliance' },
            { name: 'CCPA', to: '/docs/privacy/ccpa-compliance' },
            { name: 'Data deletion', to: '/docs/privacy/data-deletion' },
        ],
    },
]

export const DocsIndex: React.FC = () => {
    return (
        <Layout>
            <SEO title="Documentation - PostHog" />

            <PostLayout article={false} title={'Docs'} menu={docs} hideSidebar hideSurvey>
                <div className="space-y-16 lg:space-y-20 lg:-mt-12 mb-8">
                    <section>
                        <div className="flex justify-start relative pb-12 md:pt-12 md:pb-20 lg:pt-16 lg:pb-16 items-center -mx-px h-80">
                            <div className="w-full z-20">
                                <h1 className="font-bold text-5xl mb-2">Documentation</h1>
                                <h5 className="opacity-60 font-semibold leading-tight mb-8">
                                    In-depth tutorials, references, and <br className="hidden md:block xl:hidden" />
                                    examples for everything PostHog
                                </h5>
                            </div>

                            <div className="absolute hidden md:block overflow-hidden inset-y-0 right-0 h-full w-full z-10">
                                <span className="absolute right-0 bottom-0">
                                    <StaticImage
                                        src="../../contents/images/search-hog-3.png"
                                        alt="This hog has an answer"
                                        width={400}
                                        placeholder="blurred"
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 border-l border-t border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                            {quickLinks.map((link) => {
                                return (
                                    <Link
                                        to={link.to}
                                        key={link.name}
                                        disablePrefetch
                                        className="border-b border-r border-dashed border-gray-accent-light dark:border-gray-accent-dark px-8 py-4 flex items-start space-x-3 hover:bg-gray-accent-light dark:hover:bg-gray-accent-dark"
                                    >
                                        <Icon className="w-6 h-6 text-gray mt-1 lg:mt-0.5 shrink-0" name={link.icon} />
                                        <div>
                                            <h3 className="text-lg font-bold text-red mb-0.5">{link.name}</h3>
                                            <p className="text-black dark:text-white font-medium mb-2 text-gray-accent-dark text-sm">
                                                {link.description}
                                            </p>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>
                    </section>

                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="font-bold mb-1">Get started</h2>
                            <p className="text-gray font-medium">Information on how to get PostHog up and running</p>
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-4 rounded xl:rounded-none overflow-hidden">
                            <div className="bg-gray-accent-light dark:bg-gray-accent-dark lg:rounded px-6 py-4">
                                <div>
                                    <h4 className="font-bold mb-0">
                                        <span className="text-gray text-lg">1.</span> Deploy
                                    </h4>
                                    <p className="text-base text-gray">Spin up your PostHog instance</p>
                                </div>

                                <ul className="grid grid-cols-2 xl:grid-cols-1 w-full list-none m-0 p-0 space-y-1">
                                    {deployment.map((deploy) => {
                                        return (
                                            <li className="flex-grow" key={deploy.name}>
                                                <DeployOption
                                                    url={deploy.to}
                                                    title={deploy.name}
                                                    icon={deploy.icon}
                                                    disablePrefetch
                                                    badge={deploy.badge}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className="bg-gray-accent-light dark:bg-gray-accent-dark xl:rounded px-6 py-4">
                                <div>
                                    <h4 className="font-bold mb-0">
                                        <span className="text-gray text-lg">2.</span> Integrate
                                    </h4>
                                    <p className="text-base text-gray">Start tracking events and users</p>
                                </div>
                                <ul className="grid grid-cols-2 xl:grid-cols-1 w-full list-none m-0 p-0 space-y-1">
                                    {libraries.map((library) => {
                                        return (
                                            <li className="flex-grow" key={library.name}>
                                                <DeployOption
                                                    url={library.to}
                                                    title={library.name}
                                                    icon={library.icon}
                                                    disablePrefetch
                                                    badge={undefined}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>

                            <div className="bg-gray-accent-light dark:bg-gray-accent-dark xl:rounded px-6 py-4">
                                <h4 className="font-bold mb-0">
                                    <span className="text-gray text-lg">3.</span> Customize
                                </h4>
                                <p className="text-base text-gray">Customize your installation</p>
                                <ul className="grid grid-cols-2 xl:grid-cols-1 w-full list-none m-0 p-0 space-y-1">
                                    {apps.map((app) => {
                                        return (
                                            <li className="flex-grow" key={app.name}>
                                                <DeployOption
                                                    url={app.to}
                                                    title={app.name}
                                                    icon={app.icon}
                                                    disablePrefetch
                                                    badge={undefined}
                                                />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </section>

                    <section className="space-y-8">
                        <div className="text-center">
                            <h2 className="font-bold mb-1">Important links</h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-dashed border-gray-accent-light dark:border-gray-accent-dark">
                            {otherLinks.map((category) => {
                                return (
                                    <div
                                        key={category.name}
                                        className="space-y-2 py-4 md:py-6 px-4 md:px-8 border-dashed border-b border-r border-gray-accent-light dark:border-gray-accent-dark"
                                    >
                                        <h4 className="mb-0">{category.name}</h4>
                                        <ul className="p-0 space-y-1">
                                            {category.links.map((link) => {
                                                return (
                                                    <li key={link.to} className="list-none">
                                                        <Link to={link.to}>{link.name}</Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>
                                )
                            })}
                        </div>
                    </section>
                </div>
            </PostLayout>
        </Layout>
    )
}

export default DocsIndex
