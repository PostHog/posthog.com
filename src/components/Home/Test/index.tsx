import React, { useEffect, useState } from 'react'
import ReaderView from 'components/ReaderView'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'
import DataStackSection from 'components/Home/Sections/DataStackSection'
import PricingSection from 'components/Home/Sections/PricingSection'
import WhyPostHogSection from 'components/Home/Sections/WhyPostHogSection'
import BedtimeReadingSection from 'components/Home/Sections/BedtimeReadingSection'
import ShamelessCTASection from 'components/Home/Sections/ShamelessCTASection'
import HitCounter from 'components/Home/HitCounter'
import Link from 'components/Link'
import { IconHeadset, IconPlayFilled } from '@posthog/icons'
import { IconMCP } from 'components/OSIcons'
import { Logo } from '@posthog/brand/logo'
import { CallToAction } from 'components/CallToAction'
import IntegrationPrompt from 'components/IntegrationPrompt'
import { motion } from 'framer-motion'
import ToolsTicker from 'components/Home/ToolsTicker'
// NOTE: `components/PlatformInstall` (index/IconButton/schema/CopyableCommand), the new
// `Logomark*` icons added to `components/OSIcons/Icons.tsx`, and the `canvas-confetti`
// dependency are all VENDORED VERBATIM from the `9000` branch — kept byte-identical to that
// branch on purpose. When 9000 lands, the additions will be identical on both sides and 3-way
// merge cleanly (no conflicts). Do NOT edit the vendored files here to avoid diverging from
// 9000; tweak the install UI via the schema prop instead. This homepage integration (Tagline,
// GetStarted, the carousel) is the only PostHog.com-side glue and is not present on 9000.
import PlatformInstall, { wizardInstallSchema } from 'components/PlatformInstall'
import HeroCTA, { HeroCtaProvider, useHeroCtaVariant } from 'components/Home/HeroCTA'
import Customers from '../Customers'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'
import { cn } from '../../../utils'

/** Loads HeroCarousel + Typecaast slides only in the browser so SSR/Helmet aren't affected. */
function LazyHeroCarousel({ className }: { className?: string }) {
    const [Content, setContent] = useState<React.ComponentType<{ className?: string }> | null>(null)

    useEffect(() => {
        Promise.all([import('components/Home/HeroCarousel'), import('components/Home/HeroCarousel/tabs')]).then(
            ([{ default: HeroCarousel }, { buildTabs }]) => {
                function HeroCarouselContent(props: { className?: string }) {
                    return <HeroCarousel tabs={buildTabs} {...props} />
                }

                setContent(() => HeroCarouselContent)
            }
        )
    }, [])

    if (!Content) {
        return <div className={`@container ${className} min-h-[300px] @[820px]:min-h-[400px]`} aria-hidden />
    }

    return <Content className={className} />
}

const SecondaryActions = ({ justify = 'center' }: { className?: string; justify?: 'center' | 'start' }) => (
    <p
        className={`!text-sm mt-4 mb-0 flex w-full max-w-md flex-wrap items-center gap-2 ${
            justify === 'start' ? 'justify-start' : 'justify-center'
        }`}
    >
        <Link
            to="/docs/model-context-protocol"
            state={{ newWindow: true }}
            className="text-secondary hover:text-primary"
        >
            <IconMCP className="size-4 mr-1 inline-block relative -top-px" />
            <span className="underline font-semibold">MCP</span>
        </Link>
        <span className="text-secondary">•</span>
        <Link to="/demo" state={{ newWindow: true }} className="text-secondary hover:text-primary">
            <IconPlayFilled className="size-4 mr-1 inline-block relative -top-px" />
            <span className="underline font-semibold">Watch a demo</span>
        </Link>
        <span className="text-secondary">•</span>
        <Link to="/talk-to-a-human" state={{ newWindow: true }} className="text-secondary hover:text-primary">
            <IconHeadset className="size-4 mr-1 inline-block relative -top-px" />
            <span className="underline font-semibold">Talk to a human</span>
        </Link>
    </p>
)

// PostHog.com-side glue (see note above): the install UI + optional secondary links, used by the
// homepage hero (inlined) and the /products page (via this export).
export const GetStarted = ({
    selfDriving,
    showSecondaryActions = true,
}: {
    selfDriving?: boolean
    showSecondaryActions?: boolean
}) => (
    <div className="mt-6 flex flex-col items-center @xl:items-start">
        <PlatformInstall schema={wizardInstallSchema} selfDriving={selfDriving} />
        {showSecondaryActions ? <SecondaryActions /> : null}
    </div>
)

export const CTAs = () => {
    const [showIntegrationPrompt, setShowIntegrationPrompt] = useState(false)
    return (
        <div>
            <div className="flex flex-col @xs:flex-row @xs:justify-center @xl:justify-start gap-3 @sm:gap-2">
                <CallToAction
                    to="https://app.posthog.com/signup"
                    size="md"
                    state={{ newWindow: true, initialTab: 'signup' }}
                >
                    Get started - free
                </CallToAction>
                <CallToAction
                    type="secondary"
                    size="md"
                    onClick={() => setShowIntegrationPrompt((current) => !current)}
                >
                    Install with AI
                </CallToAction>
            </div>
            <motion.div
                className="overflow-hidden"
                initial={{ height: 0 }}
                animate={{ height: showIntegrationPrompt ? 'auto' : 0 }}
            >
                <div
                    data-scheme="secondary"
                    className="mt-4 p-4 border border-primary rounded-md bg-primary [&_h3]:mt-0 [&_ul]:mb-0 [&_ul]:p-0"
                >
                    <IntegrationPrompt />
                </div>
            </motion.div>
            <div className="mt-4">
                <SecondaryActions justify="start" />
            </div>
        </div>
    )
}

function Hero(): JSX.Element {
    // Some CTA variants start at the top of the layout, level with the headline rather than below it.
    // For those, the headline moves into the left grid column so the CTA column can begin alongside it
    // – matching `pt-4` on both keeps their text tops on the same line. The logo stays put either way.
    const { alignsWithHeadline } = useHeroCtaVariant()

    const headline = (
        <h1 className="!text-3xl @xl:!text-4xl pt-4 mt-0">
            Shift your product into{' '}
            <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1 @xl:whitespace-nowrap">
                self-driving mode
            </span>
        </h1>
    )

    return (
        <>
            <div className="text-center @xl:text-left min-w-0">
                <h1 className="[&_p]:m-0 flex gap-1 flex-wrap justify-center @xl:justify-start !text-2xl mb-8 pt-2">
                    <Logo className="max-w-[157px] dark:hidden" width="auto" />
                    <Logo className="hidden max-w-[157px] dark:block" variant="mono" color="white" width="auto" />
                </h1>

                {alignsWithHeadline ? null : headline}

                <div className="grid @xl:grid-cols-2 @xl:gap-8 min-w-0">
                    <div className="min-w-0">
                        {alignsWithHeadline ? headline : null}
                        <p className="text-balance @xl:text-wrap text-[17px]">
                            PostHog already knows your customers, which features they use, and the issues they have.
                        </p>
                        <p className="text-balance @xl:text-wrap text-[17px]">
                            Now, PostHog automatically{' '}
                            <RoughAnnotation
                                type="highlight"
                                color="rgba(247, 165, 1, 0.15)"
                                strokeWidth={1}
                                padding={2}
                                delay={0}
                                multiline
                            >
                                diagnoses problems
                            </RoughAnnotation>
                            ,{' '}
                            <RoughAnnotation
                                type="highlight"
                                color="rgba(247, 165, 1, 0.15)"
                                strokeWidth={1}
                                padding={2}
                                delay={500}
                                multiline
                            >
                                fixes bugs
                            </RoughAnnotation>
                            , and{' '}
                            <RoughAnnotation
                                type="highlight"
                                color="rgba(247, 165, 1, 0.15)"
                                strokeWidth={1}
                                padding={2}
                                delay={900}
                                multiline
                            >
                                generates pull requests
                            </RoughAnnotation>
                            {' – all '}
                            <RoughAnnotation
                                type="underline"
                                color="currentColor"
                                strokeWidth={1}
                                delay={1800}
                                multiline
                                className="text-secondary"
                            >
                                without you having to prompt it.
                            </RoughAnnotation>
                        </p>
                        <p className="text-balance @xl:text-wrap text-secondary">
                            Join 500,000+ teams already shipping with PostHog.
                        </p>
                    </div>

                    {/* CTA variant comes from the `homepage-cta` experiment – see
                        components/Home/HeroCTA/README.md. Falls back to the control (the wizard
                        install card) until flags resolve. The MCP / demo / talk-to-a-human row that
                        used to sit under this was removed from the hero; `SecondaryActions` is still
                        used by `GetStarted` and `CTAs`. */}
                    <div
                        className={cn(
                            'flex flex-col items-center min-w-0 w-full',
                            // pt-4 mirrors the headline's own top padding so the two line up exactly.
                            alignsWithHeadline ? '@xl:pt-4 mt-6 @xl:mt-0' : 'mt-6'
                        )}
                    >
                        <HeroCTA />
                    </div>
                </div>
            </div>

            <LazyHeroCarousel className="mb-4" />
            <ToolsTicker className="mb-8" />
        </>
    )
}

export default function HomeTest() {
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'home.mdx')
        }
    }, [])

    return (
        <ReaderView proseSize="lg" hideLeftSidebar showQuestions={false}>
            <div className="space-y-12">
                <HeroCtaProvider>
                    <Hero />
                </HeroCtaProvider>
                <Customers />
                <DataStackSection />
                <PricingSection />
                <WhyPostHogSection />
                <BedtimeReadingSection />
                <ShamelessCTASection />
                <HitCounter />
            </div>
        </ReaderView>
    )
}
