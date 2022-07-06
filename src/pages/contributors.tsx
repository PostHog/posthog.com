import React from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import { useValues } from 'kea'
import { contributorsLogic } from '../logic/contributorsLogic'
import { SEO } from '../components/seo'
import pluginLibraryOgImage from '../images/posthog-plugins.png'
import { Tab } from '@headlessui/react'
import { ContributorCard } from 'components/ContributorCard'
import { Contributor } from 'types'
import { ContributorSearch } from 'components/ContributorSearch'
import { ContributorsChart } from 'components/ContributorsChart'

export const ContributorsPage = () => {
    const { filteredContributors, contributorsLoading } = useValues(contributorsLogic)

    return (
        <div className="contributors-page-wrapper">
            <Layout>
                <SEO
                    title="Contributors • PostHog"
                    description="Plugins for getting data in and out of PostHog, the open source product analytics platform."
                    image={pluginLibraryOgImage}
                />
                <div className="centered" style={{ margin: 'auto' }}>
                    <Spacer />
                    <h1 className="center">Contributors</h1>
                    <Tab.Group>
                        <Tab.List className="space-x-4">
                            <Tab>
                                {({ selected }) => (
                                    <span
                                        className={`font-semibold focus:outline-none ${
                                            selected ? 'text-orange' : 'text-gray'
                                        }`}
                                    >
                                        List
                                    </span>
                                )}
                            </Tab>
                            <Tab>
                                {({ selected }) => (
                                    <span
                                        className={`font-semibold focus:outline-none ${
                                            selected ? 'text-orange' : 'text-gray'
                                        }`}
                                    >
                                        Stats
                                    </span>
                                )}
                            </Tab>
                        </Tab.List>
                        <Spacer height={20} />

                        <Tab.Panels>
                            <Tab.Panel>
                                <div className="space-y-16">
                                    <ContributorSearch />
                                    {contributorsLoading ? (
                                        <div className="w-full flex items-center justify-center mt-16">
                                            <svg
                                                viewBox="0 0 1024 1024"
                                                focusable="false"
                                                data-icon="loading"
                                                width="1em"
                                                height="1em"
                                                className="w-8 h-8 animate-spin"
                                                fill="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z"></path>
                                            </svg>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
                                            {filteredContributors.map((contributor: Contributor) => (
                                                <ContributorCard
                                                    key={contributor.login}
                                                    name={contributor.login}
                                                    link={contributor.profile}
                                                    imageSrc={contributor.avatar_url}
                                                    contributions={contributor.contributions}
                                                    mvpWins={contributor.mvpWins}
                                                    contributorLevel={contributor.level}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Tab.Panel>

                            <Tab.Panel>
                                <ContributorsChart />
                            </Tab.Panel>
                        </Tab.Panels>
                    </Tab.Group>
                </div>
                <Spacer />
            </Layout>
        </div>
    )
}

export default ContributorsPage
