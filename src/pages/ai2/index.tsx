import React from 'react'
import ProductReaderView from 'components/ProductReaderView'

/**
 * AI2 page - Development version of PostHog AI page using reader view template
 */
export default function AI2Page(): JSX.Element {
    return (
        <ProductReaderView
            productHandle="posthog_ai"
            seoOverrides={{
                title: 'PostHog AI - Your copilot for PostHog data and insights',
                description:
                    'Your AI-powered product analyst. Write natural language to query and analyze PostHog data instantly, find insights, and speed up product decisions with PostHog AI.',
            }}
        />
    )
}
