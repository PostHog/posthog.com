import React, { useRef } from 'react'
import { Logo } from '@posthog/brand/logo'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import { SignupCTA } from 'components/SignupCTA'
import OSButton from 'components/OSButton'
import { Accordion } from 'components/RadixUI/Accordion'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { BusinessProof, WorkWithUs, BuyerResources } from 'components/Enterprise/BusinessProof'
import { PlatformPackageCards } from 'components/Pricing/Platform/PlatformPackageComparison'
import CustomerLogos from 'components/Pricing/Redesign/CustomerLogos'
import { useApp } from '../context/App'
import { BuildingArt, EnterpriseScene } from 'components/Enterprise/BuildingArt'
// Placeholder FAQ. Confirm every answer before shipping. Same accordion as the research and
// context-warehouse pages.
const FAQ_ITEMS = [
    {
        trigger: 'Where is our data hosted?',
        content: (
            <p>PostHog Cloud runs in the US and in the EU. You choose the region when you create your organization.</p>
        ),
    },
    {
        trigger: 'What compliance documentation can you share?',
        content: (
            <p>
                Ask us for the current SOC 2 report and our security documentation. Talk to a human and we will send it
                over.
            </p>
        ),
    },
    {
        trigger: 'Do you support SSO and role-based access?',
        content: <p>Enterprise plans include SAML SSO and role-based access controls. Details are in the docs.</p>,
    },
    {
        trigger: 'How does enterprise pricing work?',
        content: (
            <p>
                Usage-based, like every PostHog plan, with enterprise support and terms on top. The pricing page has the
                numbers; talk to a human for a quote.
            </p>
        ),
    },
]

/** The page's two calls to action, used in the hero and again at the foot of the page. */
function CTAs(): JSX.Element {
    return (
        <>
            <SignupCTA size="md" text="Get started" />
            <OSButton
                asLink
                to="/talk-to-a-human"
                variant="secondary"
                size="md"
                state={{ newWindow: true }}
                event="clicked Talk to a human"
            >
                Talk to a human
            </OSButton>
        </>
    )
}

function Hero(): JSX.Element {
    const { siteSettings } = useApp()

    return (
        <section className="relative z-10 @3xl:pr-[34%] @3xl:pt-16">
            <div className="flex flex-col items-start gap-4 pb-6">
                <h1 className="m-0 flex flex-wrap items-center gap-x-3 gap-y-1 text-4xl font-bold leading-[1.1] tracking-tight @2xl:text-5xl">
                    <Logo
                        className="h-11 w-auto @2xl:h-[3.25rem]"
                        variant={siteSettings.theme === 'dark' ? 'mono' : 'gradient'}
                        color={siteSettings.theme === 'dark' ? 'white' : undefined}
                    />
                    <span className="whitespace-nowrap">for enterprise</span>
                </h1>
                <p className="m-0 max-w-md text-lg text-secondary @2xl:text-xl">
                    Ship at{' '}
                    <RoughAnnotation
                        type="highlight"
                        color="rgba(247, 165, 1, 0.15)"
                        strokeWidth={1}
                        padding={2}
                        delay={0}
                        multiline
                    >
                        startup speeds
                    </RoughAnnotation>{' '}
                    with{' '}
                    <RoughAnnotation
                        type="highlight"
                        color="rgba(247, 165, 1, 0.15)"
                        strokeWidth={1}
                        padding={2}
                        delay={500}
                        multiline
                    >
                        enterprise control
                    </RoughAnnotation>
                </p>
                <div className="flex flex-col gap-2 @xs:flex-row @xs:items-center">
                    <CTAs />
                </div>
            </div>
        </section>
    )
}

export default function Enterprise(): JSX.Element {
    const packagesRef = useRef<HTMLElement>(null)
    const emailRef = useRef<HTMLDivElement>(null)
    return (
        <>
            <SEO title="PostHog for enterprise" description="Ship at startup speeds with enterprise control." />
            <Editor
                slug="/enterprise"
                maxWidth="100%"
                hasPadding={false}
                disableFormatting
                bookmark={{
                    title: 'PostHog for enterprise',
                    description: 'Ship at startup speeds with enterprise control.',
                }}
            >
                <EnterpriseScene>
                    <div className="relative grid pt-8 @3xl:grid-cols-[minmax(0,1fr)_27%]">
                        <div className="col-span-full col-start-1 row-start-1 flex flex-col justify-between">
                            <Hero />
                            <div className="relative z-10 pb-5 pt-3 @3xl:pr-[44%]">
                                <h2 className="m-0 text-2xl font-semibold tracking-tight">Platform packages</h2>
                                <p className="m-0 mt-2 max-w-2xl text-pretty text-sm text-secondary">
                                    Security, compliance, and team controls that sit on top of every PostHog product.
                                    Turn them on from billing as your organization grows.
                                </p>
                            </div>
                        </div>
                        <BuildingArt section="top" landingRef={packagesRef} />
                    </div>
                    <section ref={packagesRef} aria-label="Platform packages" className="relative z-20">
                        <PlatformPackageCards />
                    </section>
                    <section aria-label="Our customers" className="relative z-10 pt-8">
                        <CustomerLogos title="Join the ranks" subtitle="Teams already shipping on PostHog" scrolling />
                    </section>
                    <div className="relative grid @3xl:grid-cols-[minmax(0,1fr)_27%]">
                        <div className="col-span-full col-start-1 row-start-1 flex min-w-0 flex-col">
                            <BusinessProof />
                            <WorkWithUs />
                            <h3 className="relative z-10 m-0 pb-5 text-base font-semibold @3xl:pr-[36%]">
                                In the meantime - forward this email to your CTO
                            </h3>
                        </div>
                        <BuildingArt section="middle" className="z-20" landingRef={emailRef} />
                    </div>
                    <div ref={emailRef} className="relative z-30">
                        <BuyerResources />
                    </div>
                    <div className="relative z-30 grid @3xl:grid-cols-[minmax(0,1fr)_27%]">
                        <div className="relative z-10 col-span-full col-start-1 row-start-1 flex min-w-0 flex-col pt-10 @3xl:pr-[36%]">
                            <section className="mt-auto pb-12 pt-12 @3xl:pb-20">
                                <h2 className="m-0 max-w-xl text-balance text-2xl font-bold tracking-tight @2xl:text-3xl">
                                    Build your business on a foundation you can trust
                                </h2>
                                <div className="mt-5 flex flex-col items-start gap-2 @xs:flex-row @xs:items-center">
                                    <CTAs />
                                </div>
                            </section>
                        </div>
                        <BuildingArt section="bottom" className="z-20 @3xl:aspect-[4/7]" />
                    </div>
                    {/* FAQ – scaffold; see FAQ_ITEMS. */}
                    <section className="relative z-10 border-t-2 border-primary pb-16 pt-10">
                        <h2 className="m-0 mb-6 text-2xl">Frequently asked questions</h2>
                        <Accordion
                            type="multiple"
                            triggerClassName="!px-3 !py-2"
                            contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                            items={FAQ_ITEMS}
                        />
                    </section>
                </EnterpriseScene>
            </Editor>
        </>
    )
}
