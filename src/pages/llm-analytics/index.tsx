import React from 'react'
import ProductReaderView from 'components/ProductReaderView'

/**
 * LLM Analytics product page using reader view template
 */
export default function LLMAnalytics(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="llm_analytics"
            seoOverrides={{
                title: 'LLM Analytics - Track costs, performance, and usage of AI features',
                description:
                    'Monitor LLM costs, latency, and performance. Track token usage, analyze AI interactions, and optimize your AI-powered features with PostHog LLM Analytics.',
            }}
        />
    )
}
