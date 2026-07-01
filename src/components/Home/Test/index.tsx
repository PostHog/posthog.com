import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import Tooltip from 'components/RadixUI/Tooltip'
import { IconArrowUpRight, IconHeadset, IconPlayFilled } from '@posthog/icons'
import {
    Digit0,
    Digit1,
    Digit2,
    Digit3,
    Digit4,
    Digit5,
    Digit6,
    Digit7,
    Digit8,
    Digit9,
    IconMCP,
} from 'components/OSIcons'
import useProduct from 'hooks/useProduct'
import { JsxComponentDescriptor } from '@mdxeditor/editor'
import Logo from 'components/Logo'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'
import MDXEditor from 'components/MDXEditor'
import { graphql, useStaticQuery } from 'gatsby'
import SEO from 'components/seo'
import usePostHog from 'hooks/usePostHog'
import { APP_COUNT } from '../../../constants'
import { CallToAction } from 'components/CallToAction'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import IntegrationPrompt from 'components/IntegrationPrompt'
import { motion } from 'framer-motion'
import HeroCarousel from 'components/Home/HeroCarousel'
import { buildTabs } from 'components/Home/HeroCarousel/tabs'
// NOTE: `components/PlatformInstall` (index/IconButton/schema/CopyableCommand), the new
// `Logomark*` icons added to `components/OSIcons/Icons.tsx`, and the `canvas-confetti`
// dependency are all VENDORED VERBATIM from the `9000` branch — kept byte-identical to that
// branch on purpose. When 9000 lands, the additions will be identical on both sides and 3-way
// merge cleanly (no conflicts). Do NOT edit the vendored files here to avoid diverging from
// 9000; tweak the install UI via the schema prop instead. This homepage integration (Tagline,
// GetStarted, the carousel) is the only PostHog.com-side glue and is not present on 9000.
import PlatformInstall, { wizardInstallSchema } from 'components/PlatformInstall'
import { Customers, getSharedDescriptors } from '../shared'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import { RenderInClient } from 'components/RenderInClient'
import { Tagline as ControlTagline, CTAs as ControlCTAs, HeroImage as ControlHeroImage } from '../Control'
import { TestRolloutSlide, DebugFixSlide, OnePlaceSlide, UnderstandUsageSlide } from '../HeroCarousel/slides'
import { RoughAnnotation } from 'components/Code/RoughAnnotation'

const AppCount = () => <span className="text-xs font-normal">{APP_COUNT} apps</span>

// @PostHog styled as a Slack-style mention chip, with a tooltip explaining the Slackbot.
const PostHogMention = () => {
    const [open, setOpen] = useState(false)
    return (
        <Tooltip
            delay={0}
            open={open}
            onOpenChange={setOpen}
            trigger={
                <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1 font-bold whitespace-nowrap cursor-help">
                    @PostHog
                </span>
            }
        >
            {/* Dismiss when the link inside is clicked */}
            <div
                data-scheme="primary"
                className="text-primary [&_*]:text-primary max-w-xs text-sm leading-normal font-normal prose"
                onClick={() => setOpen(false)}
            >
                <h3>How it works</h3>
                <ol>
                    <li>Add PostHog to your app</li>
                    <li>
                        <Link
                            to="https://posthog.slack.com/marketplace/A03M3FN0RSQ-posthog"
                            externalNoIcon
                            className="group underline font-semibold"
                        >
                            Install PostHog Slackbot{' '}
                            <IconArrowUpRight className="size-4 inline-block text-secondary group-hover:text-primary" />
                        </Link>
                    </li>
                    <li>
                        Tag <code>@PostHog</code> in any Slack thread to ship a fix, ask a data question, or edit
                        content – without leaving the conversation.
                    </li>
                </ol>
            </div>
        </Tooltip>
    )
}

const SecondaryActions = () => (
    <p className="!text-sm flex flex-wrap items-center gap-2 justify-center @xl:min-w-96 @xl:max-w-md">
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

// PostHog.com-side glue (see note above): the install UI + secondary links, used by the
// homepage hero (inlined) and the /products page (via this export).
export const GetStarted = ({ selfDriving }: { selfDriving?: boolean }) => (
    <div className="mt-6 flex flex-col items-center @xl:items-start">
        <PlatformInstall schema={wizardInstallSchema} selfDriving={selfDriving} />
        <SecondaryActions />
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
            {/* @TODO(data-positioning): Restore the original test CTA row below once this experiment no longer needs control-matching primary buttons.
            Existing test CTA row retained for reference:
            <div className="flex gap-2 items-center">
                <div className="flex items-center gap-1">
                    <WizardCommand slim className="border border-primary" />
                    <Tooltip trigger={<IconInfo className="size-4 text-primary inline-block" />}>
                        <div className="max-w-sm">
                            <p className="text-sm mb-1">
                                <strong className="block mb-1">Add PostHog to your project in ~8 minutes.</strong>
                            </p>
                            <p className="text-sm mb-0">
                                <Link to="/wizard" state={{ newWindow: true }}>
                                    <span className="underline font-bold">Learn more</span>{' '}
                                    <IconArrowUpRight className="size-4 inline-block" />
                                </Link>
                            </p>
                        </div>
                    </Tooltip>
                </div>
                <span className="text-sm">or </span>
                <CallToAction
                    to="https://app.posthog.com/signup"
                    size="sm"
                    state={{ newWindow: true, initialTab: 'signup' }}
                    type="plain"
                    className=""
                >
                    signup with email
                </CallToAction>
            </div>
            */}
            <div className="mt-4">
                <SecondaryActions />
            </div>
        </div>
    )
}

const HomeHitCounter = () => {
    const [hitCount, setHitCount] = useState<number | null>(null)

    useEffect(() => {
        fetch(`/api/homepage-hits`)
            .then((res) => res.json())
            .then((count) => setHitCount(count))
            .catch((err) => console.error(err))
    }, [])

    const formatCount = (count: number) => {
        return count.toString().padStart(7, '0')
    }

    const getDigitComponent = (digit: string) => {
        const digitComponents: { [key: string]: React.ComponentType<any> } = {
            '0': Digit0,
            '1': Digit1,
            '2': Digit2,
            '3': Digit3,
            '4': Digit4,
            '5': Digit5,
            '6': Digit6,
            '7': Digit7,
            '8': Digit8,
            '9': Digit9,
        }
        return digitComponents[digit] || Digit0
    }

    if (hitCount === null) return null

    const digits = formatCount(hitCount).split('')

    return (
        <span className="inline-flex items-center gap-0.5">
            {digits.map((digit, index) => {
                const DigitComp = getDigitComponent(digit)
                return <DigitComp key={index} className="h-4 w-auto" />
            })}
        </span>
    )
}

const Button = ({ url, children }: { url: string; children: React.ReactNode }) => (
    <Link to={url} state={{ newWindow: true }}>
        {children}
    </Link>
)

const CompanyStageTabs = () => {
    const [selectedStage, setSelectedStage] = React.useState('growth')

    const allProducts = useProduct()

    const getProduct = (handle: string) =>
        Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === handle) : undefined

    const stages = [
        {
            value: 'early',
            label: 'Early-stage',
            products: [
                { handle: 'product_analytics', text: 'for understanding user behavior' },
                { handle: 'session_replay', text: 'for watching real user sessions' },
                { handle: 'feature_flags', text: 'for safe feature rollouts' },
                { handle: 'surveys', text: 'for collecting user feedback' },
                { handle: 'web_analytics', text: 'for tracking website traffic' },
            ],
        },
        {
            value: 'growth',
            label: 'Growth',
            products: [
                { handle: 'experiments', text: 'for A/B testing ideas' },
                { handle: 'data_warehouse', text: 'for centralizing data' },
                { handle: 'error_tracking', text: 'for catching bugs fast' },
                { handle: 'cdp', text: 'for syncing data everywhere' },
                { handle: 'ai_observability', text: 'for monitoring AI features' },
            ],
        },
        {
            value: 'scale',
            label: 'At scale',
            products: [
                { handle: 'data_warehouse', text: 'for advanced data modeling' },
                { handle: 'cdp', text: 'for complex data pipelines' },
                { handle: 'experiments', text: 'for optimizing conversion' },
                { handle: 'product_analytics', text: 'for deep cohort analysis' },
                { handle: 'web_analytics', text: 'for multi-channel attribution' },
            ],
        },
    ]

    const stageOptions: ToggleOption[] = stages.map((stage) => ({
        label: stage.label,
        value: stage.value,
    }))

    const selectedStageData = stages.find((s) => s.value === selectedStage) || stages[0]

    return (
        <div className="not-prose">
            <ToggleGroup
                options={stageOptions}
                value={selectedStage}
                onValueChange={setSelectedStage}
                className="mb-4"
            />
            <ul className="space-y-1.5 text-sm list-none p-0">
                {selectedStageData.products.map((item, idx) => {
                    const product = getProduct(item.handle)
                    return (
                        <li key={idx} className="flex items-center gap-1.5">
                            {product?.Icon && <product.Icon className={`size-4 text-${product.color}`} />}
                            <Link to={`/${product?.slug}`} state={{ newWindow: true }} className="font-semibold">
                                {product?.name}
                            </Link>
                            <span className="text-secondary">{item.text}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

function TestHero(): JSX.Element {
    return (
        <>
            <div className="mb-12">
                <h1 className="[&_p]:m-0 flex gap-1 flex-wrap !text-2xl !mb-4 pt-2">
                    <div className="dark:hidden">
                        <Logo />
                    </div>
                    <div className="hidden dark:block">
                        <Logo fill="white" />
                    </div>
                </h1>

                <h1 className="!text-3xl @xl:!text-4xl pt-4">
                    Shift your product into{' '}
                    <span className="bg-blue/10 dark:bg-blue/20 text-blue rounded-md px-1 whitespace-nowrap">
                        self-driving mode
                    </span>
                </h1>

                <div className="grid @xl:grid-cols-2 @xl:gap-8">
                    <div>
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

                    <div className="mt-6 flex flex-col items-center @xl:items-start">
                        <PlatformInstall schema={wizardInstallSchema} selfDriving />
                        <SecondaryActions />
                    </div>
                </div>
            </div>

            <HeroCarousel tabs={buildTabs} className="mb-8" />
        </>
    )
}

function ControlHero(): JSX.Element {
    return (
        <>
            <div className="text-center @xl:text-left mb-12">
                <ControlHeroImage />

                <h1 className="[&_p]:m-0 flex gap-1 flex-wrap justify-center @xl:justify-start !text-2xl mb-8 pt-2">
                    <div className="dark:hidden">
                        <Logo />
                    </div>
                    <div className="hidden dark:block">
                        <Logo fill="white" />
                    </div>
                </h1>

                <ControlTagline />

                <ControlCTAs />
            </div>

            <HeroCarousel
                tabs={[
                    {
                        value: 'understand-usage',
                        label: 'Understand product usage',
                        content: <UnderstandUsageSlide />,
                        color: 'bg-blue',
                        activeText: 'text-white',
                        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(0,0,0,0.2)]',
                    },
                    {
                        value: 'one-place',
                        label: 'One place for product data',
                        content: <OnePlaceSlide />,
                        color: 'bg-teal',
                        activeText: 'text-black',
                        progressBar: 'bg-black/70 shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
                    },
                    {
                        value: 'debug-fix',
                        label: 'Debug & fix issues',
                        content: <DebugFixSlide />,
                        color: 'bg-salmon',
                        activeText: 'text-white',
                        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
                    },
                    {
                        value: 'test-rollout',
                        label: 'Test & roll out changes',
                        content: <TestRolloutSlide />,
                        color: 'bg-purple',
                        activeText: 'text-white',
                        progressBar: 'bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.4)]',
                    },
                ]}
            />
        </>
    )
}

function Hero(): JSX.Element {
    const posthog = usePostHog()
    return (
        <RenderInClient
            placeholder={<></>}
            render={() =>
                posthog?.getFeatureFlag?.('self-driving-mode-test', { fresh: true }) === 'test' ? (
                    <TestHero />
                ) : (
                    <ControlHero />
                )
            }
        />
    )
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    { name: 'AppCount', kind: 'flow', props: [], Editor: () => <AppCount /> },
    { name: 'CompanyStageTabs', kind: 'flow', props: [], Editor: () => <CompanyStageTabs /> },
    { name: 'CTAs', kind: 'flow', props: [], Editor: () => <CTAs /> },
    { name: 'HeroCarousel', kind: 'flow', props: [], Editor: () => <HeroCarousel tabs={buildTabs} /> },
    { name: 'HomeHitCounter', kind: 'flow', props: [], Editor: () => <HomeHitCounter /> },
    { name: 'Customers', kind: 'flow', props: [], Editor: () => <Customers tableClassName="bg-white dark:bg-dark" /> },
    {
        name: 'Logo',
        kind: 'flow',
        props: [],
        Editor: () => {
            const { siteSettings } = useApp()
            return (
                <>
                    <Logo className="inline-block h-9" fill={siteSettings.theme === 'dark' ? 'white' : undefined} />{' '}
                </>
            )
        },
    },
    {
        name: 'ButtonDataStack',
        kind: 'flow',
        props: [],
        Editor: () => <Button url="/data-stack">README: PostHog data stack.md</Button>,
    },
    { name: 'ButtonPricing', kind: 'flow', props: [], Editor: () => <Button url="/pricing">Explore pricing</Button> },
    { name: 'ButtonAI', kind: 'flow', props: [], Editor: () => <Button url="/ai">Learn about PostHog AI</Button> },
    { name: 'ButtonAbout', kind: 'flow', props: [], Editor: () => <Button url="/about">Read more about us</Button> },
    { name: 'Hero', kind: 'flow', props: [], Editor: () => <Hero /> },
    ...getSharedDescriptors(),
]

export default function HomeTest() {
    const data = useStaticQuery(graphql`
        query HomeTestMdx {
            homepageMdx: mdx(fileAbsolutePath: { regex: "/contents/index\\.mdx/" }) {
                rawBody
                mdxBody: body
            }
        }
    `)
    const rawBody = data?.homepageMdx?.rawBody
    const mdxBody = data?.homepageMdx?.mdxBody
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const posthog = usePostHog()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'home.mdx')
        }
    }, [])

    return (
        <>
            <SEO
                title="PostHog – We make dev tools for product engineers"
                updateWindowTitle={false}
                description="All your developer tools in one place. PostHog gives engineers everything to build, test, measure, and ship successful products faster. Get started free."
                image="/images/og/default.png"
            />
            <MDXEditor
                jsxComponentDescriptors={jsxComponentDescriptors}
                body={rawBody}
                mdxBody={mdxBody}
                maxWidth={900}
                readOnly
                contentClassName="font-rounded"
                cta={{
                    url: `https://${
                        posthog?.isFeatureEnabled?.('direct-to-eu-cloud') ? 'eu' : 'app'
                    }.posthog.com/signup`,
                    label: 'Get started - free',
                }}
            />
        </>
    )
}
