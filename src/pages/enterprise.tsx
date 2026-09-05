import React from 'react'
import { Logo } from '@posthog/brand/logo'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import { SignupCTA } from 'components/SignupCTA'
import OSButton from 'components/OSButton'
import { Accordion } from 'components/RadixUI/Accordion'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { BusinessProof, WorkWithUs } from 'components/Enterprise/BusinessProof'
import { PlatformPackageCards } from 'components/Pricing/Platform/PlatformPackageComparison'
import CustomerLogos from 'components/Pricing/Redesign/CustomerLogos'
import { useApp } from '../context/App'
import towerTop from '../images/enterprise/skyscraper-top.png'
import towerTile from '../images/enterprise/skyscraper-tile.png'
import towerBottom from '../images/enterprise/skyscraper-bottom.png'
import clouds from '../images/enterprise/clouds.png'
import street from '../images/enterprise/street.png'

// The skyscraper is three images: the top (spire to the first floors), a repeating floor tile,
// and the base. All three are 461px wide; the tile is 75px tall. It is drawn as two separate
// pieces – an upper piece hanging from the top of the hero, a lower piece standing on the
// platform at the foot of the page – so neither has to know how tall the page in between is.
const TOWER_WIDTH = 176 // px – keep in step with the `w-44` on the images
const TOWER_TILE_HEIGHT = (75 / 461) * TOWER_WIDTH
// Upper piece: floors under the top, enough to reach into the cloud bank. It starts to fade a
// little above the clouds (the bank's image begins at about 25.5rem in the hero cell; the puffs
// under the tower start near 32rem) and is gone inside them.
const UPPER_TILES = 6
const UPPER_MASK = 'linear-gradient(to bottom, #000 25rem, transparent 34.5rem)'
// Lower piece: floors above the base. It fades in as it rises out of the comparison section.
const LOWER_TILES = 8
const LOWER_MASK = 'linear-gradient(to bottom, transparent, #000 5rem)'
// Masks rather than overlays, so the faded pixels are truly transparent and work over the
// window's translucent backdrop (same technique as Pricing/Redesign/FreeTierTicker).
// The cloud bank sits on the hero's bottom edge; its underside fades so it dissolves into the page.
const CLOUD_MASK = 'linear-gradient(to bottom, #000 55%, transparent 100%)'

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

/** A run of repeated floors. Overlaps the image above it by 1px, so scaling never leaves a hairline. */
function TowerFloors({ count }: { count: number }): JSX.Element {
    return (
        <div
            className="-mt-px w-44 bg-[length:100%_auto] bg-repeat-y"
            style={{ backgroundImage: `url(${towerTile})`, height: count * TOWER_TILE_HEIGHT }}
        />
    )
}

function Hero(): JSX.Element {
    const { siteSettings } = useApp()

    return (
        <section className="mx-auto grid w-full max-w-6xl gap-8 px-4 pt-8 @xl:px-8 @2xl:grid-cols-2 @2xl:items-center @2xl:gap-12 @2xl:pt-12">
            <div className="flex flex-col items-start gap-4 pb-8">
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

            {/* Right half: the upper piece of the skyscraper, fading into the cloud bank on the cell's
                bottom edge. The cell's min height is how tall that piece stands.
                TODO: hedgehog holding the top spike and waving a flag */}
            <div className="relative hidden min-h-[37rem] @2xl:block">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 flex flex-col items-center"
                    style={{ maskImage: UPPER_MASK, WebkitMaskImage: UPPER_MASK }}
                >
                    <img src={towerTop} alt="" className="w-44" />
                    <TowerFloors count={UPPER_TILES} />
                </div>
                {/* Drawn after the tower, so the clouds are in front of it. */}
                <img
                    src={clouds}
                    alt=""
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-0 left-1/2 w-[30rem] max-w-none -translate-x-1/2 translate-y-[38%] opacity-80"
                    style={{ maskImage: CLOUD_MASK, WebkitMaskImage: CLOUD_MASK }}
                />
            </div>
        </section>
    )
}

export default function Enterprise(): JSX.Element {
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
                <div className="@container not-prose text-pretty text-primary">
                    <Hero />
                    {/* Platform packages – the same billing data and cards as /platform-packages. */}
                    <section className="mx-auto w-full max-w-6xl px-4 pb-4 pt-10 @xl:px-8">
                        <div className="max-w-2xl">
                            <h2 className="m-0 text-lg font-semibold tracking-tight">Platform packages</h2>
                            <p className="m-0 mt-1 text-pretty text-sm text-secondary">
                                Security, compliance, and team controls that sit on top of every PostHog product. Turn
                                them on from billing as your organization grows.
                            </p>
                        </div>
                        <div className="mt-5">
                            <PlatformPackageCards />
                        </div>
                    </section>
                    {/* Customers – the same logo rail as /pricing. */}
                    <section className="mx-auto w-full max-w-6xl px-4 pb-4 pt-8 @xl:px-8">
                        <CustomerLogos title="Join the ranks" subtitle="Teams already shipping on PostHog" />
                    </section>

                    {/* Business proof – security, support, compliance, scale, trust – then the hand-off to sales. */}
                    <div className="mt-8">
                        <BusinessProof />
                        <WorkWithUs />
                    </div>

                    {/* The POSTHOG street closes the page. The lower piece of the skyscraper stands on the
                        lawn, in front of the platform (z-10), and fades in as it rises. */}
                    <div className="mx-auto w-full max-w-6xl px-4 pb-8 @xl:px-8">
                        <div className="relative">
                            <div
                                aria-hidden="true"
                                className="absolute bottom-[64%] left-[calc(75%+0.75rem)] z-10 hidden w-44 -translate-x-1/2 flex-col items-center @2xl:flex"
                                style={{ maskImage: LOWER_MASK, WebkitMaskImage: LOWER_MASK }}
                            >
                                <TowerFloors count={LOWER_TILES} />
                                <img src={towerBottom} alt="" className="-mt-px w-44" />
                            </div>
                            <img src={street} alt="" className="relative w-full" />
                        </div>
                    </div>

                    <section className="mx-auto w-full max-w-6xl px-4 pb-12 pt-6 @xl:px-8 @2xl:pb-16 @2xl:pt-8">
                        <div className="flex max-w-2xl flex-col items-start">
                            <h2 className="m-0 text-balance text-2xl font-bold tracking-tight @2xl:text-3xl">
                                Build your business on a foundation you can trust
                            </h2>
                            <div className="mt-5 flex flex-col items-start gap-2 @xs:flex-row @xs:items-center">
                                <CTAs />
                            </div>
                        </div>
                    </section>

                    {/* FAQ – scaffold; see FAQ_ITEMS. */}
                    <section className="mx-auto w-full max-w-6xl px-4 pb-16 @xl:px-8">
                        <h2 className="m-0 mb-6 text-2xl">Frequently asked questions</h2>
                        <Accordion
                            type="multiple"
                            triggerClassName="!px-3 !py-2"
                            contentClassName="!px-3 !py-2.5 !text-base !leading-relaxed"
                            items={FAQ_ITEMS}
                        />
                    </section>
                </div>
            </Editor>
        </>
    )
}
