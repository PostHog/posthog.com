import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import SourcesHero from 'components/DataPipelines/SourcesHero'
import SourcesPipelineCarousel from 'components/DataPipelines/SourcesPipelineCarousel'
import SourcesPlumbing from 'components/DataPipelines/SourcesPlumbing'
import SourcesComparison from 'components/DataPipelines/SourcesComparison'
import SourcesCatalog from 'components/DataPipelines/SourcesCatalog'
import SourcesCTA from 'components/DataPipelines/SourcesCTA'

export default function DataPipelineSources(): JSX.Element {
    return (
        <>
            <SEO title="Sources – Sync 1,400+ tools and databases | PostHog" />
            <ReaderView
                title="Sources"
                hideTitle
                hideLeftSidebar
                hideRightSidebar
                hideMarkdownActions
                proseSize="lg"
                showQuestions={false}
            >
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-12">
                    <SourcesHero />
                    <SourcesPipelineCarousel />
                    <SourcesPlumbing />
                    <SourcesComparison />
                    <SourcesCatalog />
                    <SourcesCTA />
                </div>
            </ReaderView>
        </>
    )
}
