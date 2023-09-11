import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'

const chapters = [
    {
        name: 'Chapters',
        links: [
            { order: '1', name: 'What is PostHog?', to: '/handbook/what-is-posthog' },
            { order: '2', name: 'A wide company with small teams', to: '/handbook/wide-company' },
            {
                order: '3',
                name: 'Providing a world-class engineering environment',
                to: '/handbook/world-class-engineering',
            },
            { order: '4', name: 'Deciding which products to build', to: '/handbook/which-products' },
            { order: '5', name: 'How we get users', to: '/handbook/how-we-get-users' },
            { order: '6', name: 'Enduringly low prices', to: '/handbook/low-prices' },
            { order: '7', name: 'How we make users happy', to: '/handbook/making-users-happy' },
            { order: '8', name: 'How we make money', to: '/handbook/how-we-make-money' },
            { order: '9', name: "How we're building a world-class team", to: '/handbook/strong-team' },
            { order: '10', name: 'Not running out of money', to: '/handbook/finance' },
            { order: '11', name: 'How we got here', to: '/handbook/story' },
            { order: '12', name: 'Where we are now', to: '/handbook/current-status' },
            { order: '13', name: 'Where are we going?', to: '/handbook/future' },
            { order: '14', name: 'How you can help', to: '/handbook/help' },
        ],
    },
]

const otherLinks = [
    {
        name: 'Company',
        links: [
            { name: 'Story', to: '/handbook/company/story' },
            { name: 'Team', to: '/handbook/company/team' },
            { name: 'Strategy overview', to: '/handbook/strategy/overview' },
            { name: 'Objectives', to: '/handbook/strategy/objectives' },
        ],
    },
    {
        name: 'How we work',
        links: [
            { name: 'Culture', to: '/handbook/company/culture' },
            { name: 'Values', to: '/handbook/company/values' },
            { name: 'Team structure', to: '/handbook/company/small-teams' },
            { name: 'Management', to: '/handbook/company/management' },
        ],
    },
    {
        name: 'People',
        links: [
            { name: 'Compensation', to: '/handbook/people/compensation' },
            { name: 'Benefits', to: '/handbook/people/benefits' },
            { name: 'Time off', to: '/handbook/people/time-off' },
            { name: 'Spending money', to: '/handbook/people/spending-money' },
        ],
    },
    {
        name: 'Engineering',
        links: [
            { name: 'Developing locally', to: '/handbook/engineering/developing-locally' },
            { name: 'Support hero', to: '/handbook/engineering/support-hero' },
            { name: 'Feature ownership', to: '/handbook/engineering/feature-ownership' },
            { name: 'Releasing a new version', to: '/handbook/engineering/release-new-version' },
        ],
    },
    {
        name: 'Design',
        links: [
            { name: 'Philosophy', to: '/handbook/design/philosophy' },
            { name: 'Product design', to: '/handbook/design/process' },
            { name: 'Working with product design', to: '/handbook/engineering/product-design' },
            { name: 'PostHog.com', to: '/handbook/design/designing-posthog-website' },
        ],
    },
    {
        name: 'Sales & marketing',
        links: [
            { name: 'Marketing overview', to: '/handbook/growth/marketing' },
            { name: 'Content & SEO', to: '/handbook/growth/marketing/blog' },
            { name: 'Inbound model', to: '/handbook/growth/sales/overview' },
            { name: 'Sales operations', to: '/handbook/growth/sales/sales-operations' },
        ],
    },
]

export const Handbook: React.FC = () => {
    return (
        <Layout>
            <SEO image="/images/handbook.png" title="Handbook - PostHog" />

            <PostLayout article={false} title={'Handbook'} hideSidebar hideSurvey>
                <section className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:items-center md:justify-end md:flex-row-reverse gap-8 md:gap-2">
                        <div className="-mt-16 md:-mt-12">
                            <StaticImage
                                src="../../contents/images/search-hog-4.png"
                                alt="This hog has an answer"
                                width={400}
                                placeholder="blurred"
                            />
                        </div>
                        <div className="md:flex-1">
                            <h1 className="font-bold text-5xl mb-6">Company handbook</h1>
                            <h3 className="text-xl">👋 Welcome!</h3>
                            <h5 className="opacity-60 font-semibold leading-tight mb-8 max-w-lg">
                                This handbook simply explains how we work. It has been one of the most important things
                                we've ever made.
                            </h5>
                        </div>
                    </div>

                    {chapters.map((category) => {
                        return (
                            <div key={category.name} className="mb-16">
                                <h4 className="text-base font-normal opacity-60">{category.name}</h4>
                                <ol className="p-0 -ml-3 -mr-2 space-y-0.5">
                                    {category.links.map((link) => {
                                        return (
                                            <li key={link.to} className="list-none">
                                                <Link
                                                    to={link.to}
                                                    className="flex justify-between baseline relative bg-bullet-light dark:bg-bullet-dark bg-repeat-x bg-center bg-[length:8px_8px] text-primary hover:text-primary dark:text-primary-dark hover:dark:text-primary-dark rounded border border-b-3 border-transparent hover:border-light dark:hover:border-dark hover:translate-y-[-1px] active:translate-y-[1px] active:transition-all min-h-[34px] py-2"
                                                >
                                                    <span className="relative inline-block pl-3 pr-2 bg-light dark:bg-dark">
                                                        {link.name}
                                                    </span>
                                                    <span className="relative pr-2 bg-light dark:bg-dark w-10 text-center text-sm">
                                                        {link.order}
                                                    </span>
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ol>
                            </div>
                        )
                    })}

                    <h4>Top links</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {otherLinks.map((category) => {
                            return (
                                <div
                                    key={category.name}
                                    className="space-y-2 py-4 md:py-6 px-4 md:px-8 bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded"
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

                <section className="space-y-8"></section>
            </PostLayout>
        </Layout>
    )
}

export default Handbook
