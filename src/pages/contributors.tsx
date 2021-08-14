import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import { Row, Tabs, Spin } from 'antd'
import { useActions, useValues } from 'kea'
import { contributorsLogic } from '../logic/contributorsLogic'
import { SEO } from '../components/seo'
import pluginLibraryOgImage from '../images/posthog-plugins.png'
import './styles/contributors.scss'
import { ContributorCard } from 'components/ContributorCard'
import { Contributor } from 'types'
import { ContributorSearch } from 'components/ContributorSearch'
import { ContributorsChart } from 'components/ContributorsChart'

const { TabPane } = Tabs

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
                    <Tabs centered activeKey={activeTab} onChange={(key) => handleTabClick(key)}>
                        <TabPane tab="List" key="list" />
                        <TabPane tab="Stats" key="stats" />
                    </Tabs>
                    <Spacer height={20} />

                    {activeTab === 'list' ? (
                        <>
                            <ContributorSearch />
                            <Spacer height={20} />
                            <Row gutter={16} style={{ marginTop: 16, marginRight: 10, marginLeft: 10, minHeight: 600 }}>
                                {contributorsLoading ? (
                                    <Spin size="large" style={{ position: 'fixed', top: '50%', left: '50%' }} />
                                ) : (
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
                            </Row>
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
