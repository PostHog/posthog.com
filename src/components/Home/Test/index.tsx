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
import HeroCTA from 'components/Home/HeroCTA'
import { HeroBody, HeroHeadline } from 'components/Home/HeroCopy'
import { cn } from '../../../utils'
import HeroCarousel from 'components/Home/HeroCarousel'
import { buildTabs } from 'components/Home/HeroCarousel/tabs'
import Customers from '../Customers'
import { RenderInClient } from 'components/RenderInClient'

const SecondaryActions = ({
    justify = 'center',
    demoTo = '/demo',
    demoNewWindow = true,
}: {
    className?: string
    justify?: 'center' | 'start'
    demoTo?: string
    /** In-page anchors should scroll the current window rather than opening a new one. */
    demoNewWindow?: boolean
}) => (
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
        <Link
            to={demoTo}
            state={demoNewWindow ? { newWindow: true } : undefined}
            className="text-secondary hover:text-primary"
        >
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
    demoTo,
    demoNewWindow,
}: {
    selfDriving?: boolean
    showSecondaryActions?: boolean
    demoTo?: string
    demoNewWindow?: boolean
}) => (
    <div className="mt-6 flex flex-col items-center @xl:items-start">
        <PlatformInstall schema={wizardInstallSchema} selfDriving={selfDriving} />
        {showSecondaryActions ? <SecondaryActions demoTo={demoTo} demoNewWindow={demoNewWindow} /> : null}
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
    return (
        <>
            <div className="text-center @xl:text-left min-w-0">
                <div className="[&_p]:m-0 flex gap-1 flex-wrap justify-center @xl:justify-start !text-2xl mb-12 pt-2">
                    <Logo className="max-w-[157px] dark:hidden" width="auto" />
                    <Logo className="hidden max-w-[157px] dark:block" variant="mono" color="white" width="auto" />
                </div>

                <div className="group grid @xl:grid-cols-2 @xl:gap-x-8 min-w-0">
                    <div>
                        <HeroHeadline />

                        <HeroBody />
                    </div>

                    <div className="@xl:mt-0 mt-6 flex-shrink-0 flex justify-center w-full @xl:w-auto">
                        <HeroCTA />
                    </div>
                </div>
            </div>

            <HeroCarousel tabs={buildTabs} staticHeight className="mb-4" />
            <ToolsTicker className="mb-8" />
        </>
    )
}

const HomeContent = () => (
    <div className="space-y-12">
        <Hero />
        <Customers />
        <DataStackSection />
        <PricingSection />
        <WhyPostHogSection />
        <BedtimeReadingSection />
        <ShamelessCTASection />
        <HitCounter />
    </div>
)

const Bone = ({ className }: { className?: string }) => (
    <div className={cn('bg-accent animate-pulse rounded-md', className)} />
)

function HomeLoading(): JSX.Element {
    return (
        <>
            <div className="@container space-y-12" aria-busy="true" aria-live="polite">
                <div className="text-center @xl:text-left min-w-0">
                    <div className="flex gap-1 flex-wrap justify-center @xl:justify-start !text-2xl mb-12 pt-2">
                        <Logo className="max-w-[157px] dark:hidden" width="auto" />
                        <Logo className="hidden max-w-[157px] dark:block" variant="mono" color="white" width="auto" />
                    </div>

                    <div className="group grid @xl:grid-cols-2 @xl:gap-x-8 min-w-0">
                        <div className="@xl:row-start-1 @xl:col-start-1 @xl:col-span-2 @xl:group-has-[[data-cta-aligned]]:col-span-1 space-y-3 mb-4">
                            <Bone className="h-9 @xl:h-10 w-[min(100%,28rem)] mx-auto @xl:mx-0" />
                            <Bone className="h-9 @xl:h-10 w-[min(80%,18rem)] mx-auto @xl:mx-0" />
                        </div>

                        <div className="min-w-0 @xl:row-start-2 @xl:col-start-1 space-y-2">
                            <Bone className="h-4 w-full" />
                            <Bone className="h-4 w-[92%]" />
                            <Bone className="h-4 w-[70%]" />
                        </div>

                        <div
                            data-cta-aligned=""
                            className="mt-6 flex flex-col items-center min-w-0 w-full @xl:mt-0 @xl:row-start-1 @xl:row-span-2 @xl:col-start-2 @xl:justify-start"
                        >
                            <div className="w-full max-w-md min-w-0 border border-primary rounded-md bg-primary shadow-2xl animate-pulse">
                                <div className="p-4 space-y-3">
                                    <Bone className="h-6 w-40" />
                                    <Bone className="h-4 w-3/4" />
                                    <Bone className="h-4 w-2/3" />
                                    <Bone className="h-4 w-4/5" />
                                    <div className="flex gap-2 pt-1">
                                        <Bone className="h-10 flex-1" />
                                        <Bone className="h-10 flex-1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="flex gap-2">
                        <Bone className="h-10 flex-1 rounded-none rounded-t-md" />
                        <Bone className="h-10 flex-1 rounded-none rounded-t-md" />
                        <Bone className="h-10 flex-1 rounded-none rounded-t-md" />
                    </div>
                    <div className="min-h-[300px] @[820px]:min-h-[400px] p-2 rounded-b-md bg-accent animate-pulse">
                        <div className="bg-primary w-full min-h-[284px] @[820px]:min-h-[384px] shadow-2xl rounded" />
                    </div>
                </div>

                <Bone className="h-8 w-full mb-8" />
            </div>
            <div className="invisible">
                <HomeContent />
            </div>
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
            <RenderInClient render={HomeContent} placeholder={<HomeLoading />} />
        </ReaderView>
    )
}
