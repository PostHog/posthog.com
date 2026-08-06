import React from 'react'
import { Link } from 'gatsby'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { FAQs } from 'components/Pricing/FAQs'
import { SectionLayout, SectionHeader } from 'components/Pricing/Test/Sections'
import Hero from 'components/Pricing/Page/Hero'
import FreeTierTicker from 'components/Pricing/Page/FreeTierTicker'
import CustomerLogos from 'components/Pricing/Page/CustomerLogos'
import MoreOptions from 'components/Pricing/Page/MoreOptions'
import CalculatorReveal from 'components/Pricing/Page/CalculatorReveal'
import Philosophy from './philosophy'
import PricingJourney from 'components/Pricing/Page/PricingJourney'
import Surfaces from 'components/Pricing/Page/Surfaces'
import ShamelessCTA from 'components/Home/ShamelessCTA'

/**
 * Canonical pricing page.
 *
 * See components/Pricing/Page/README.md for the page structure and the
 * decisions behind it.
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
                <CalculatorReveal />
            </SectionLayout>

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
                {/* The "haha bizzniss" hedgehog is positioned against the CTA card and pokes ~50px
                    above where this section's rule lands, so the border used to cut through it.
                    Padding the whole block down moves the doodle with it and clears the rule by
                    about 10px. Tuned by eye — if the artwork is ever swapped, re-check it. */}
                <div className="pt-0 md:pt-16">
                    <ShamelessCTA />
                </div>
            </SectionLayout>
        </ReaderView>
    )
}
