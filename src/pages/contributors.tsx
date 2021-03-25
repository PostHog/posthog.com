import React from 'react'
import Layout from '../components/Layout'
import { Spacer } from '../components/Spacer'
import { Row } from 'antd'
import { useValues } from 'kea'
import { contributorsLogic } from '../logic/contributorsLogic'
import { SEO } from '../components/seo'
import pluginLibraryOgImage from '../images/posthog-plugins.png'
import './styles/contributors.scss'
import { ContributorCard } from 'components/ContributorCard'
import { Contributor } from 'types'

export const ContributorsPage = () => {
    const { contributors } = useValues(contributorsLogic)

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
                    <Row gutter={16} style={{ marginTop: 16, marginRight: 10, marginLeft: 10, minHeight: 600 }}>
                        <ContributorCard
                            key="cool-hedgehog"
                            name="the-cool-hedgehog"
                            link="https://github.com/PostHog/posthog"
                            imageSrc="https://posthog.com/static/cool-hedgehog-2e771b8385a05bfe25cfdea4bbb775a3.svg"
                            contributions={['code', 'doc', 'plugin', 'bug']}
                            mvpWins={2}
                            contributorLevel={99}
                        />
                        {contributors.map((contributor: Contributor) => (
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
                    </Row>
                </div>
                <Spacer />
            </Layout>
        </div>
    )
}

export default ContributorsPage
