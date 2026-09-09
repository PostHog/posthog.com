import React from 'react'
import { Link } from 'gatsby'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import CalculatorSection from 'components/Pricing/Redesign/CalculatorSection'
import { SectionLayout, SectionHeader } from 'components/Pricing/Test/Sections'

export default function PricingCalculator(): JSX.Element {
    return (
        <ReaderView hideLeftSidebar hideRightSidebar showQuestions={false} hideMobileTableOfContents>
            <SEO
                title="PostHog pricing calculator – Estimate your monthly bill"
                description="Estimate your monthly PostHog bill. Choose your products, enter your expected usage, and share a personalized estimate with your team."
                canonicalUrl="/pricing/calculator"
            />

            <SectionLayout id="calculator" className="not-prose">
                <SectionHeader>
                    <h1 className="text-3xl @3xl:text-4xl mb-2">PostHog pricing calculator</h1>
                    <p className="text-base text-secondary max-w-prose mb-0">
                        Choose the products you need and enter your expected monthly usage. Adjust the numbers to see
                        how your costs change, then share your estimate with your team.
                    </p>
                </SectionHeader>
                <CalculatorSection />
            </SectionLayout>

            <p className="text-[15px] text-secondary">
                Need more context? Explore <Link to="/pricing">PostHog pricing</Link> or read our{' '}
                <Link to="/docs/billing/estimating-usage-costs">guide to estimating usage and costs</Link>.
            </p>
        </ReaderView>
    )
}
