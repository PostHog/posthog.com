import React from 'react'
import ReaderView from 'components/ReaderView'
import SEO from 'components/seo'
import { PostHogCodeSidebar } from 'components/PostHogCode/PostHogCodeSidebar'
import PostHogCodePageContent from 'components/PostHogCode/PostHogCodePageContent'

export default function PostHogCodePage() {
    return (
        <>
            <SEO
                title="PostHog Code – Agentic coding from your product data"
                description="The agentic coding tool that prompts itself. Pull signals from the tools you already use, triage in a prioritised inbox, and orchestrate agents to ship the work."
                image="/images/posthog-code/landing-preview.png"
            />
            <ReaderView
                title="PostHog Code"
                hideTitle
                leftSidebar={<PostHogCodeSidebar />}
                homeURL="/products"
                description="Agentic coding tool connected to PostHog"
                proseSize="base"
                showQuestions={false}
                contentMaxWidthClass="max-w-5xl"
                padding={false}
            >
                <div className="px-4 pb-4 @md/reader-content-container:px-6 @lg/reader-content-container:px-8 pt-2 @md/reader-content-container:pt-3">
                    <PostHogCodePageContent />
                </div>
            </ReaderView>
        </>
    )
}
