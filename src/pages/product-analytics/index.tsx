import React from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'

export default function ProductAnalytics(): JSX.Element {
    return (
        <Explorer
            features
            pricing
            customers
            comparison
            docs
            tutorials
            questions
            team
            roadmap
            changelog
            slug="product-analytics"
            // teamName="product-analytics"
            // roadmapCategory="product-analytics"
            // changelogCategory="product-analytics"
        >
            <p>
                PostHog is the only product analytics platform built to natively work with{' '}
                <Link to="/session-replay">session replays</Link>,{' '}
                <Link to="/feature-flags">feature flags</Link>, <Link to="/experiments">experiments</Link>, and{' '}
                <Link to="/surveys">surveys</Link>.
            </p>
        </Explorer>
    )
}
