import React from 'react'
import { graphql } from 'gatsby'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import AIAdoptionReport, { AdoptionSeries } from 'components/AIAdoptionReport'

export default function Leaderboard({
    data,
}: {
    data: { aiAdoptionReport: { isPreview: boolean; series: AdoptionSeries[] } | null }
}): JSX.Element {
    return (
        <>
            <SEO
                title="How teams use AI – PostHog"
                description="Monthly adoption trends for AI models, labs, providers, and developer tools."
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
                <AIAdoptionReport
                    series={data.aiAdoptionReport?.series ?? []}
                    isPreview={data.aiAdoptionReport?.isPreview}
                />
            </ReaderView>
        </>
    )
}

export const query = graphql`
    query AIAdoptionLeaderboardPage {
        aiAdoptionReport {
            isPreview
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
