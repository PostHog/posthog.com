import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import { IconHeadset, IconPlayFilled } from '@posthog/icons'
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
import CloudinaryImage from 'components/CloudinaryImage'
import IntegrationPrompt from 'components/IntegrationPrompt'
import { motion } from 'framer-motion'
import HeroCarousel from 'components/Home/HeroCarousel'
import { Customers, getSharedDescriptors } from '../shared'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const AppCount = () => <span className="text-xs font-normal">{APP_COUNT} apps</span>

const Tagline = () => (
    <>
        <h1 className="!text-2xl pt-4">The new way to build products</h1>
        <p className="text-balance @xl:text-wrap">
            Product development used to mean manually writing code, running analysis, diagnosing bugs, and rolling out
            changes using dozens of tools.
        </p>

        <p className="text-balance @xl:text-wrap">
            PostHog is the only platform that acts like a co-pilot for you (and your AI agents) to do it all –{' '}
            <em>autonomously</em>.
        </p>
    </>
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
                    <WizardCommand latest={false} slim className="border border-primary" />
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
            <p className="!text-sm flex items-center gap-2 mt-4 justify-center @xl:justify-start">
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
                { handle: 'llm_analytics', text: 'for monitoring AI features' },
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

function HeroImage(): JSX.Element {
    return (
        <CloudinaryImage
            src="https://res.cloudinary.com/dmukukwp6/image/upload/lazy_a2afd552f7.png"
            className="w-64 @xl:w-48 @xl:float-right @xl:ml-4 @2xl:w-56 @3xl:w-64 @2xl:float-right -scale-x-100 @xl:mt-16 @3xl:mt-8"
        />
    )
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    { name: 'Tagline', kind: 'flow', props: [], Editor: () => <Tagline /> },
    { name: 'AppCount', kind: 'flow', props: [], Editor: () => <AppCount /> },
    { name: 'CompanyStageTabs', kind: 'flow', props: [], Editor: () => <CompanyStageTabs /> },
    { name: 'CTAs', kind: 'flow', props: [], Editor: () => <CTAs /> },
    { name: 'HeroCarousel', kind: 'flow', props: [], Editor: () => <HeroCarousel /> },
    { name: 'HomeHitCounter', kind: 'flow', props: [], Editor: () => <HomeHitCounter /> },
    { name: 'Customers', kind: 'flow', props: [], Editor: () => <Customers tableClassName="bg-white" /> },
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
        name: 'HeroImage',
        kind: 'flow',
        props: [],
        Editor: () => <HeroImage />,
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
