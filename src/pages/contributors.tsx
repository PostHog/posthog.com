import Chip from 'components/Chip'
import { ContributorCard } from 'components/ContributorCard'
import { ContributorsChart } from 'components/ContributorsChart'
import { ContributorSearch } from 'components/ContributorSearch'
import { useActions, useValues } from 'kea'
import React, { useState } from 'react'
import { Contributor } from 'types'
import Layout from '../components/Layout'
import { SEO } from '../components/seo'
import { Spacer } from '../components/Spacer'
import pluginLibraryOgImage from '../images/posthog-plugins.png'
import { contributorsLogic } from '../logic/contributorsLogic'

export const ContributorsPage = () => {
    const { setSearchQuery } = useActions(contributorsLogic)
    const { filteredContributors, contributorsLoading } = useValues(contributorsLogic)
    const [activeTab, setActiveTab] = useState('list')

    const handleTabClick = (newTab: string) => {
        setActiveTab(newTab)
        if (newTab === 'list') {
            setSearchQuery('')
        }
    }

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
                    <div className="flex justify-center space-x-2 items-center">
                        <Chip active={activeTab === 'list'} onClick={() => setActiveTab('list')}>
                            List
                        </Chip>
                        <Chip active={activeTab === 'stats'} onClick={() => setActiveTab('stats')}>
                            Stats
                        </Chip>
                    </div>
                    <Spacer height={20} />

                    {activeTab === 'list' ? (
                        <>
                            <ContributorSearch />
                            <Spacer height={20} />
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5">
                                {!contributorsLoading && (
                                    <>
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
                                    </>
                                )}
                            </div>
                        </>
                    ) : (
                        <ContributorsChart />
                    )}
                </div>
                <Spacer />
            </Layout>
        </div>
    )
}

export default ContributorsPage
