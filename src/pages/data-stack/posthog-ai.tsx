import React from 'react'
import ReaderView from 'components/ReaderView'
import { customerDataInfrastructureNav } from '../../hooks/useCustomerDataInfrastructureNavigation'
import { TreeMenu } from 'components/TreeMenu'
import SEO from 'components/seo'
import Link from 'components/Link'
import { ProductScreenshot } from 'components/ProductScreenshot'
import FeatureTable from './FeatureTable'

const LeftSidebarContent = () => {
    return <TreeMenu items={customerDataInfrastructureNav.children} />
}

type AIFeature = {
    title: string
    description: string
    status?: 'available' | 'coming_soon'
}

const aiFeatures: AIFeature[] = [
    {
        title: 'Generate SQL queries',
        description:
            'Generate SQL queries from natural language prompts, making data exploration accessible to everyone.',
    },
    {
        title: 'Answer questions about your data',
        description:
            'Ask questions about your data in natural language and get accurate, data-driven answers without even knowing what SQL is.',
    },
    {
        title: 'Fix SQL queries',
        description:
            'Made a mistake in your SQL query? PostHog AI can automatically fix it for you, no more debugging required.',
    },
    {
        title: 'Optimize SQL queries',
        description:
            'PostHog AI can analyze and optimize your SQL queries for better performance, so you can get results faster.',
    },
    {
        title: 'Ask questions from Slack',
        description: 'Slack is where you live anyway, just ask your data questions there.',
        status: 'coming_soon',
    },
    {
        title: 'Iterative metric validation',
        description: 'Do your metrics actually make sense? PostHog AI will automatically validate them for you.',
        status: 'coming_soon',
    },
    {
        title: 'Agentic data notebooks',
        description:
            'Automatically generate data notebooks with charts, insights, and explanations based on your data.',
        status: 'coming_soon',
    },
]

export default function PostHogAIDataStack(): JSX.Element {
    return (
        <>
            <SEO
                title="PostHog AI - PostHog data stack"
                description="Learn how to model your data in PostHog"
                image="images/og/cdp.jpg"
            />
            <ReaderView leftSidebar={<LeftSidebarContent />} title="PostHog AI, wired all the way through">
                <p>
                    PostHog AI is not just an add-on feature; it's completely wired into and throughout our data stack.
                    It's the sql-writing, code-completing, statistical-minded sidekick that helps you do the grunt work.
                </p>
                <p>
                    PostHog queries your data warehouse tables, your clickstream event data, errors, and more to answer
                    tough questions using your complete source-of-truth business context.
                </p>

                <ProductScreenshot
                    imageLight="https://res.cloudinary.com/dmukukwp6/image/upload/h_800,c_limit,q_auto,f_auto/Post_Hog_ai_response_ed994d3859.png"
                    imageDark="https://res.cloudinary.com/dmukukwp6/image/upload/h_800,c_limit,q_auto,f_auto/Post_Hog_ai_response_ed994d3859.png"
                    alt="Conversation with PostHog AI"
                    classes="rounded"
                    zoom={false}
                />
                <div className="mb-8">
                    <h3>Features</h3>
                    <FeatureTable features={aiFeatures} />
                </div>
            </ReaderView>
        </>
    )
}
