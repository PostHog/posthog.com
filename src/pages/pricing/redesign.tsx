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
import Philosophy from './philosophy'
import PricingJourney from 'components/Pricing/Redesign/PricingJourney'
import SelfDrivingPricing from 'components/Pricing/Redesign/SelfDrivingPricing'

/**
 * Redesigned pricing page — mockup route, live at /pricing/redesign.
 *
 * See components/Pricing/Redesign/README.md for what was cut from /pricing and
 * why. The short version: two audiences (people trying PostHog out, and people
 * sizing it up for scale), and one page that answers each in order — free tier
 * limits first, then what a card changes, then escape hatches (with a quiet
 * calculator footnote) and a human.
 */
export default function PricingRedesign(): JSX.Element {
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

            <Philosophy />

            <SectionLayout id="more-options" className="not-prose">
                <SectionHeader>
                    <h2 className="text-2xl mb-0">Startups, bigger teams, and discounts</h2>
                </SectionHeader>
                <MoreOptions />
                <CalculatorReveal />
            </SectionLayout>

            <SectionLayout id="self-driving" className="not-prose">
                <SectionHeader>
                    <h2 className="text-2xl mb-0">If you'd rather PostHog did the work</h2>
                    <p className="text-[15px] text-secondary mb-0 mt-1">
                        Self-driving is the one thing here that isn't billed on usage.
                    </p>
                </SectionHeader>
                <SelfDrivingPricing />
            </SectionLayout>

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
        </ReaderView>
    )
}
