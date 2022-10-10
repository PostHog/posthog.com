import React from 'react'
import Layout from 'components/Layout'
import { SEO } from 'components/seo'
import { StaticImage } from 'gatsby-plugin-image'
import Link from 'components/Link'
import PostLayout from 'components/PostLayout'
import { handbook } from '../sidebars/sidebars.json'
import SearchBox from 'components/SearchBox'

const otherLinks = [
    {
        name: 'Company',
        links: [
            { name: 'Story', to: '/handbook/company/story' },
            { name: 'Team', to: '/handbook/company/team' },
            { name: 'Investors', to: '/handbook/strategy/investors' },
            { name: 'Compensation', to: '/handbook/people/compensation' },
            { name: 'Benefits', to: '/handbook/people/benefits' },
            { name: 'Hiring', to: '/handbook/people/hiring-process' },
        ],
    },
    {
        name: 'Strategy',
        links: [
            { name: 'Overview', to: '/handbook/strategy/overview' },
            { name: 'Business model', to: '/handbook/strategy/business-model' },
            { name: 'Objectives', to: '/handbook/strategy/objectives' },
            { name: 'Brand', to: '/handbook/strategy/brand' },
        ],
    },
    {
        name: 'How we work',
        links: [
            { name: 'Culture', to: '/handbook/company/culture' },
            { name: 'Values', to: '/handbook/company/values' },
            { name: 'Values', to: '/handbook/company/values' },
            { name: 'Goal setting', to: '/handbook/company/goal-setting' },
            { name: 'Diversity and inclusion', to: '/handbook/company/diversity' },
            { name: 'Management', to: '/handbook/company/management' },
        ],
    },
    {
        name: 'Engineering',
        links: [
            { name: 'Developing locally', to: '/handbook/engineering/developing-locally' },
            { name: 'Project structure', to: '/handbook/engineering/project-structure' },
            { name: 'Feature ownership', to: '/handbook/engineering/feature-ownership' },
            { name: 'Releasing a new version', to: '/handbook/engineering/release-new-version' },
        ],
    },
    {
        name: 'Design',
        links: [
            { name: 'Philosophy', to: '/handbook/design/philosophy' },
            { name: 'Product design', to: '/handbook/design/process' },
            { name: 'Website design', to: '/handbook/design/designing-posthog-website' },
        ],
    },
    {
        name: 'Customer success',
        links: [
            { name: 'Strategy', to: '/handbook/growth/strategy' },
            { name: 'Support', to: '/handbook/growth/customer-support' },
            { name: 'Inbound model', to: '/handbook/growth/sales/overview' },
            { name: 'Demos', to: '/handbook/growth/sales/demos' },
            { name: 'Billing', to: '/handbook/growth/sales/billing' },
            { name: 'CRM', to: '/handbook/growth/sales/crm' },
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
                                <h1 className="font-bold text-5xl mb-2">Handbook</h1>
                                <h5 className="opacity-60 font-semibold leading-tight mb-8">
                                    Welcome to the PostHog Company Handbook! <br />
                                    This explains how we operate as a company.
                                </h5>

                                <SearchBox filter="handbook" placeholder="Seach handbook..." />
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
