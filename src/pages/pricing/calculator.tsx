import React from 'react'
import { Link } from 'gatsby'
import { HedgehogMoney } from '@posthog/brand/hoggies'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import CalculatorSection from 'components/Pricing/Redesign/CalculatorSection'
import { FAQs } from 'components/Pricing/FAQs'
import { SectionLayout, SectionHeader } from 'components/Pricing/Test/Sections'

export default function PricingCalculator(): JSX.Element {
    return (
        <ReaderView
            hideLeftSidebar
            hideRightSidebar
            showQuestions={false}
            hideMobileTableOfContents
            hideMarkdownActions
        >
            <SEO
                title="PostHog pricing calculator – Estimate your monthly bill"
                description="Estimate your monthly PostHog bill. Choose your products, enter your expected usage, and share a personalized estimate with your team."
                canonicalUrl="/pricing/calculator"
            />

            <SectionLayout id="calculator" className="not-prose">
                <SectionHeader>
                    <div className="flex items-center gap-8 pb-4">
                        <div className="flex-1 min-w-0">
                            <h1 className="text-3xl @3xl:text-4xl mb-2">
                                PostHog{' '}
                                <span className="bg-green/25 text-green-dark dark:text-lime-green rounded-sm px-1.5 box-decoration-clone">
                                    pricing calculator
                                </span>
                            </h1>
                            <p className="text-base text-secondary max-w-prose mb-0">
                                Choose the products you need and enter your expected monthly usage. Adjust the numbers
                                to see how your costs change, then share your estimate with your team.
                            </p>
                            <p className="text-base text-secondary mt-3 mb-0">
                                Looking for more info on our pricing? Check out our{' '}
                                <Link to="/pricing" className="font-semibold underline">
                                    pricing page
                                </Link>
                                .
                            </p>
                        </div>
                        <HedgehogMoney size={184} className="hidden @3xl:block shrink-0" />
                    </div>
                </SectionHeader>
                <CalculatorSection />
            </SectionLayout>

            <p className="text-[15px] text-secondary">
                Need more context? Explore <Link to="/pricing">PostHog pricing</Link> or read our{' '}
                <Link to="/docs/billing/estimating-usage-costs">guide to estimating usage and costs</Link>.
            </p>

            <SectionLayout id="faq">
                <h2 className="text-2xl m-0 pb-6 border-b border-primary">Pricing FAQ</h2>
                <FAQs />
            </SectionLayout>
        </ReaderView>
    )
}
