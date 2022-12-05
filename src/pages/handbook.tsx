import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import { handbook } from '../sidebars/sidebars.json'

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
            <SEO title="Handbook - PostHog" />

            <PostLayout article={false} title={'Handbook'} menu={handbook} hideSidebar hideSurvey>
                <div className="space-y-16 lg:space-y-20 lg:-mt-12 mb-8">
                    <section>
                        <div className="flex justify-start relative items-center -mx-px h-80">
                            <div className="w-full z-20">
                                <h1 className="font-bold text-5xl mb-2">Company handbook</h1>
                                <h5 className="opacity-60 font-semibold leading-tight mb-8">
                                    This explains how we operate as a company.
                                </h5>

                                <p className="text-gray mt-4">
                                    First time here? Read the{' '}
                                    <Link to="/handbook/getting-started/start-here">getting started</Link> guide.
                                </p>
                            </div>

                            <div className="absolute hidden md:block overflow-hidden inset-y-0 right-0 h-full w-full z-10">
                                <span className="absolute right-0 bottom-0">
                                    <StaticImage
                                        src="../../contents/images/search-hog-4.png"
                                        alt="This hog has an answer"
                                        width={400}
                                        placeholder="blurred"
                                    />
                                </span>
                            </div>
                        </div>

                        <h4>Top links</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-dashed border-gray-accent-light dark:border-gray-accent-dark">
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

                    <section className="space-y-8"></section>
                </div>
            </PostLayout>
        </Layout>
    )
}

export default Handbook
