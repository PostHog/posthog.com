import React from 'react'
import { graphql } from 'gatsby'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import AIAdoptionReport, { AdoptionSeries } from 'components/AIAdoptionReport'

export default function Leaderboard({
    data,
}: {
    data: { aiAdoptionReport: { series: AdoptionSeries[] } | null }
}): JSX.Element {
    return (
        <>
            <SEO
                title="How teams use AI – PostHog"
                description="See which AI models, labs, providers, and developer tools teams use each month, based on the events they send to PostHog Cloud."
            />
            <ReaderView
                title="How teams use AI"
                hideTitle
                hideLeftSidebar
                hideRightSidebar
                hideAppOptions
                hideMarkdownActions
                showQuestions={false}
            >
                <AIAdoptionReport series={data.aiAdoptionReport?.series ?? []} />
            </ReaderView>
        </>
    )
}

export const query = graphql`
    query AIAdoptionLeaderboardPage {
        aiAdoptionReport {
            series {
                facet
                label
                points {
                    month
                    share
                }
            }
        }
    }
`
