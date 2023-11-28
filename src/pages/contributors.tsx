import React from 'react'
import Layout from 'components/Layout'
import { Spacer } from 'components/Spacer'
import { useValues } from 'kea'
import { contributorsLogic } from '../logic/contributorsLogic'
import { SEO } from 'components/seo'
import pluginLibraryOgImage from '../images/posthog-plugins.png'
import { ContributorCard } from 'components/ContributorCard'
import { Contributor } from 'types'
import { ContributorSearch } from 'components/ContributorSearch'
import Spinner from 'components/Spinner'

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

                    <div className="flex flex-col items-center space-y-8 px-6">
                        <ContributorSearch />

                        {contributorsLoading ? (
                            <Spinner />
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
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
                </div>
                <Spacer />
            </Layout>
        </div>
    )
}

export default ContributorsPage
