import React from 'react'
import Layout from 'components/Layout'
import ProductProductAnalytics from 'components/Product/ProductAnalytics'
import Explorer from 'components/Explorer'
import { Link } from 'gatsby'
import { CallToAction } from 'components/CallToAction'
import CloudinaryImage from 'components/CloudinaryImage'

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
            accentImage={<CloudinaryImage
                src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/Product/ProductAnalytics/images/screenshot-product-analytics.png"
                alt="Screenshot of PostHog Product Analytics"
                className="w-full"
                placeholder="none"
            />}
        >
            
            <p>
                PostHog is the only product analytics platform built to natively work with{' '}
                <Link to="/session-replay">session replays</Link>,{' '}
                <Link to="/feature-flags">feature flags</Link>, <Link to="/experiments">experiments</Link>, and{' '}
                <Link to="/surveys">surveys</Link>.
            </p>

            <p className="flex gap-2">
                <CallToAction href="/signup" type="primary" size="md">Get started</CallToAction>
                <CallToAction href="/talk-to-a-human" type="secondary" size="md">Talk to a human</CallToAction>
            </p>
        </Explorer>
    )
}
