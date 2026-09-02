import React from 'react'
import { Link } from 'gatsby'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { FAQs } from 'components/Pricing/FAQs'
import { SectionLayout, SectionHeader } from 'components/Pricing/Test/Sections'
import Hero from 'components/Pricing/Redesign/Hero'
import FreeTierTicker from 'components/Pricing/Redesign/FreeTierTicker'
import CustomerLogos from 'components/Pricing/Redesign/CustomerLogos'
import MoreOptions from 'components/Pricing/Redesign/MoreOptions'
import CalculatorReveal from 'components/Pricing/Redesign/CalculatorReveal'
import CalculatorSection from 'components/Pricing/Redesign/CalculatorSection'
import PricingJourney from 'components/Pricing/Redesign/PricingJourney'
import Surfaces from 'components/Pricing/Redesign/Surfaces'
import Philosophy from './philosophy'
import ShamelessCTA from 'components/Home/ShamelessCTA'
import { RenderInClient } from 'components/RenderInClient'

export const PRICING_CALCULATOR_FLAG = 'pricing-calculator-visibility'

export const PRICING_CALCULATOR_VARIANTS = {
    control: 'control',
    shown: 'shown',
} as const

function isShownVariant(): boolean {
    // Called from RenderInClient after flags resolve (or after the 5s fallback).
    // An unresolved flag is control — the collapsed calculator.
    return window.posthog?.getFeatureFlag?.(PRICING_CALCULATOR_FLAG) === PRICING_CALCULATOR_VARIANTS.shown || true
}

/**
 * `/pricing`.
 *
 * See components/Pricing/Redesign/README.md for what this page cuts from the page it replaced
 * and why. The short version: two audiences (people trying PostHog out, and people sizing it up
 * for scale), and one page that answers each in order — free tier limits first, then what a card
 * changes, then escape hatches and a human.
 */
export default function Pricing(): JSX.Element {
    return (
        <ReaderView hideLeftSidebar hideRightSidebar showQuestions={false} hideMobileTableOfContents>
            <SEO
                title="PostHog pricing – Start free, scale when you need"
                description="97% of companies use PostHog for free. Generous monthly free tiers on every product, usage-based pricing after that, and no surprise bills."
            />

            <Hero />
            <SectionLayout id="free-tiers" className="not-prose">
                <SectionHeader>
                    <h2 className="text-2xl mb-0">What you get for free, every month</h2>
                    <p className="text-[15px] text-secondary mb-0 mt-1">
                        Resets monthly. Same allowance whether or not you have a card on file.
                    </p>
                </SectionHeader>
                <FreeTierTicker />
                <div className="mt-3">
                    <Surfaces />
                </div>
            </SectionLayout>

            <SectionLayout id="plans" className="not-prose">
                <SectionHeader>
                    <h2 className="text-2xl mb-0">Then why would I pay?</h2>
                    <p className="text-[15px] text-secondary mb-0 mt-1">
                        There's one signup and one product. Just add a card whenever you need higher limits.
                    </p>
                </SectionHeader>
                <PricingJourney />
            </SectionLayout>

            <SectionLayout className="not-prose">
                <CustomerLogos />
            </SectionLayout>

            <SectionLayout id="more-options" className="not-prose">
                <SectionHeader>
                    <h2 className="text-2xl mb-0">Platform features, volume discounts, and onboarding help</h2>
                </SectionHeader>
                <MoreOptions />
                <RenderInClient render={() => (isShownVariant() ? <></> : <CalculatorReveal />)} />
            </SectionLayout>

            <RenderInClient
                render={() =>
                    isShownVariant() ? (
                        <SectionLayout id="calculator" className="not-prose">
                            <SectionHeader>
                                <h2 className="text-2xl mb-0">Pricing calculator</h2>
                            </SectionHeader>
                            <CalculatorSection />
                        </SectionLayout>
                    ) : (
                        <></>
                    )
                }
            />

            <Philosophy />

            <SectionLayout id="faq" className="mb-12">
                <h2 className="text-2xl m-0 mb-0 pb-6 border-b border-primary">Pricing FAQ</h2>
                <FAQs />
                <p className="my-6 relative">
                    Have another pricing-related question?{' '}
                    <Link to="/questions/topic/pricing" state={{ newWindow: true }}>
                        Ask in our community forum
                    </Link>{' '}
                    or{' '}
                    <Link to="/talk-to-a-human" state={{ newWindow: true }}>
                        talk to a human
                    </Link>
                    .
                </p>
            </SectionLayout>

            <SectionLayout id="shameless-cta" className="mb-12 overflow-x-hidden">
                <SectionHeader>
                    <h2 className="text-2xl mb-0">Shameless CTA</h2>
                </SectionHeader>
                <div className="pt-0 md:pt-16">
                    <ShamelessCTA />
                </div>
            </SectionLayout>
        </ReaderView>
    )
}
