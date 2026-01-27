import React from 'react'
import ProductReaderView from 'components/ProductReaderView'

/**
 * LLM Analytics product page using reader view template
 * Prototype: Uses product-centric navigation with product name as parent
 */
export default function LLMAnalytics(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="llm_analytics"
            useProductNav={true}
            navigationConfig={{
                docs: {
                    basePath: '/docs/llm-analytics',
                    dynamic: true, // Dynamically load docs navigation from docsMenu
                },
                roadmap: '/roadmap',
                tutorials: false, // Tutorials are in docs
                changelog: false, // Changelog is in docs
                forums: '/questions/topic/llm-analytics',
                people: '/teams',
                getStarted: '/docs/llm-analytics/start-here',
            }}
            seoOverrides={{
                title: 'LLM Analytics - Track costs, performance, and usage of AI features',
                description:
                    'Monitor LLM costs, latency, and performance. Track token usage, analyze AI interactions, and optimize your AI-powered features with PostHog LLM Analytics.',
            }}
        />
    )
}
