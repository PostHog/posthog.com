import React from 'react'
import { OnePlaceSlide, UnderstandUsageSlide, DebugFixSlide, TestRolloutSlide } from './slides'
import { SlackSlide, FixBugsSlide, AskAnythingSlide } from './homeSlides'

export interface Tab {
    value: string
    label: string
    content: React.ReactNode
    color: string
    activeText: string
    progressBar: string
}

// Product-feature carousel — lives on the /products page.
export const productUsageTabs: Tab[] = [
    {
        value: 'understand-usage',
        label: 'Understand product usage',
        content: <UnderstandUsageSlide />,
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
    },
    {
        value: 'one-place',
        label: 'One place for product data',
        content: <OnePlaceSlide />,
        color: 'bg-teal',
        activeText: 'text-black',
        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
    {
        value: 'debug-fix',
        label: 'Debug & fix issues',
        content: <DebugFixSlide />,
        color: 'bg-salmon',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
    {
        value: 'test-rollout',
        label: 'Test & roll out changes',
        content: <TestRolloutSlide />,
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
]

// Agentic "@PostHog" carousel — lives on the homepage (Slack-first).
export const buildTabs: Tab[] = [
    {
        value: 'slack',
        label: 'Create pull requests in Slack',
        content: <SlackSlide />,
        color: 'bg-red',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
    {
        value: 'fix-bugs',
        label: 'Fix bugs automatically',
        content: <FixBugsSlide />,
        color: 'bg-blue',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
    },
    {
        value: 'ask-anything',
        label: 'Ask PostHog anything',
        content: <AskAnythingSlide />,
        color: 'bg-purple',
        activeText: 'text-white',
        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
    },
]
