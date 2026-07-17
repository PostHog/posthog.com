import React, { useEffect, useMemo, useState } from 'react'
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
import { useApp } from '../../context/App'
import { useWindow } from '../../context/Window'
import { graphql, useStaticQuery } from 'gatsby'
import SEO from 'components/seo'
import usePostHog from 'hooks/usePostHog'
import { APP_COUNT } from '../../constants'
import { CallToAction, child as ctaChild, container as ctaContainer } from 'components/CallToAction'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import CloudinaryImage from 'components/CloudinaryImage'
import IntegrationPrompt from 'components/IntegrationPrompt'
import { motion } from 'framer-motion'
import KoreanMDXViewer from '../../components/Korean/KoreanMDXViewer'
import KoreanHeroCarousel from '../../components/Korean/KoreanHeroCarousel'
import { KoreanCustomers, getKoreanSharedDescriptors } from '../../components/Korean/KoreanHomeShared'

type TranslateFn = (value: string) => string
type ProductSummary = {
    handle: string
    slug: string
    name: string
    color: string
    Icon?: React.ComponentType<{ className?: string }>
}

const identity = (value: string) => value
const AppCount = ({ t = identity }: { t?: TranslateFn }) => (
    <span className="text-xs font-normal">
        {APP_COUNT} {t('apps')}
    </span>
)

const Tagline = ({ t = identity }: { t?: TranslateFn }) => (
    <>
        <h1 className="!text-2xl pt-4">{t('The new way to build products')}</h1>
        <p className="text-balance @xl:text-wrap">
            {t(
                'Product development used to mean manually writing code, running analysis, diagnosing bugs, and rolling out changes using dozens of tools.'
            )}
        </p>

        <p className="text-balance @xl:text-wrap">
            {t('PostHog is the only platform that acts like a co-pilot for you (and your AI agents) to do it all –')}{' '}
            <em>{t('autonomously')}</em>.
        </p>
    </>
)

export const CTAs = ({ t = identity }: { t?: TranslateFn }): JSX.Element => {
    const [showIntegrationPrompt, setShowIntegrationPrompt] = useState(false)
    return (
        <div>
            <div className="flex flex-col @xs:flex-row @xs:justify-center @xl:justify-start gap-3 @sm:gap-2">
                <CallToAction
                    to="https://app.posthog.com/signup"
                    size="md"
                    state={{ newWindow: true, initialTab: 'signup' }}
                >
                    {t('Get started - free')}
                </CallToAction>
                <button
                    type="button"
                    onClick={() => setShowIntegrationPrompt((current) => !current)}
                    className={ctaContainer('secondary', 'md')}
                >
                    <span className={ctaChild('secondary', 'auto', '', 'md')}>{t('Install with AI')}</span>
                </button>
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
                    <span className="underline font-semibold">{t('Watch a demo')}</span>
                </Link>
                <span className="text-secondary">•</span>
                <Link to="/talk-to-a-human" state={{ newWindow: true }} className="text-secondary hover:text-primary">
                    <IconHeadset className="size-4 mr-1 inline-block relative -top-px" />
                    <span className="underline font-semibold">{t('Talk to a human')}</span>
                </Link>
            </p>
            <p className="!text-sm text-secondary mt-2 mb-0 text-center @xl:text-left">
                {t("PostHog's products and support are only available in English at this time.")}
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
        const digitComponents: { [key: string]: React.ComponentType<{ className?: string }> } = {
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

const CompanyStageTabs = ({ t = identity }: { t?: TranslateFn }) => {
    const [selectedStage, setSelectedStage] = React.useState('growth')

    const allProducts = useProduct()

    const getProduct = (handle: string) =>
        Array.isArray(allProducts) ? allProducts.find((p: ProductSummary) => p.handle === handle) : undefined

    const stages = [
        {
            value: 'early',
            label: t('Early-stage'),
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
            label: t('Growth'),
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
            label: t('At scale'),
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
                                {product?.name ? t(product.name) : product?.name}
                            </Link>
                            <span className="text-secondary">{t(item.text)}</span>
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
    { name: 'HeroCarousel', kind: 'flow', props: [], Editor: () => <KoreanHeroCarousel /> },
    { name: 'HomeHitCounter', kind: 'flow', props: [], Editor: () => <HomeHitCounter /> },
    {
        name: 'Customers',
        kind: 'flow',
        props: [],
        Editor: () => <KoreanCustomers tableClassName="bg-white dark:bg-dark" />,
    },
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
        Editor: () => <Button url="/data-stack">README: PostHog 데이터 스택.md</Button>,
    },
    { name: 'ButtonPricing', kind: 'flow', props: [], Editor: () => <Button url="/pricing">가격 정보 보기</Button> },
    { name: 'ButtonAI', kind: 'flow', props: [], Editor: () => <Button url="/ai">PostHog AI 알아보기</Button> },
    {
        name: 'ButtonAbout',
        kind: 'flow',
        props: [],
        Editor: () => <Button url="/about">PostHog에 대해 더 알아보기</Button>,
    },
    ...getKoreanSharedDescriptors(),
]

const getJsxComponentDescriptors = (t: TranslateFn): JsxComponentDescriptor[] => [
    { name: 'Tagline', kind: 'flow', props: [], Editor: () => <Tagline t={t} /> },
    { name: 'AppCount', kind: 'flow', props: [], Editor: () => <AppCount t={t} /> },
    { name: 'CompanyStageTabs', kind: 'flow', props: [], Editor: () => <CompanyStageTabs t={t} /> },
    { name: 'CTAs', kind: 'flow', props: [], Editor: () => <CTAs t={t} /> },
    { name: 'HeroCarousel', kind: 'flow', props: [], Editor: () => <KoreanHeroCarousel translate={t} /> },
    { name: 'HomeHitCounter', kind: 'flow', props: [], Editor: () => <HomeHitCounter /> },
    {
        name: 'Customers',
        kind: 'flow',
        props: [],
        Editor: () => <KoreanCustomers tableClassName="bg-white dark:bg-dark" translate={t} />,
    },
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
        Editor: () => <Button url="/data-stack">{t('README: PostHog data stack.md')}</Button>,
    },
    {
        name: 'ButtonPricing',
        kind: 'flow',
        props: [],
        Editor: () => <Button url="/pricing">{t('Explore pricing')}</Button>,
    },
    {
        name: 'ButtonAI',
        kind: 'flow',
        props: [],
        Editor: () => <Button url="/ai">{t('Learn about PostHog AI')}</Button>,
    },
    {
        name: 'ButtonAbout',
        kind: 'flow',
        props: [],
        Editor: () => <Button url="/about">{t('Read more about us')}</Button>,
    },
    ...getKoreanSharedDescriptors(t),
]

interface HomeTestProps {
    translate?: TranslateFn
    translateBody?: (value: string) => string
    seo?: {
        title?: string
        description?: string
        lang?: string
        canonicalUrl?: string
        languageAlternates?: { hrefLang: string; href: string }[]
    }
}

export default function KoreanHome({ translate = identity, translateBody, seo }: HomeTestProps = {}): JSX.Element {
    const data = useStaticQuery(graphql`
        query KoreanHomeMdx {
            homepageMdx: mdx(fileAbsolutePath: { regex: "/contents/index\\.mdx/" }) {
                mdxBody: body
            }
        }
    `)
    const sourceMdxBody = data?.homepageMdx?.mdxBody || ''
    const mdxBody = useMemo(
        () => (translateBody ? translateBody(sourceMdxBody) : sourceMdxBody),
        [sourceMdxBody, translateBody]
    )
    const jsxDescriptors = useMemo(
        () => (translate === identity ? jsxComponentDescriptors : getJsxComponentDescriptors(translate)),
        [translate]
    )
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const posthog = usePostHog()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, translate('home.mdx'))
        }
    }, [])

    return (
        <>
            <SEO
                title={seo?.title || 'PostHog – We make dev tools for product engineers'}
                updateWindowTitle={false}
                description={
                    seo?.description ||
                    'All your developer tools in one place. PostHog gives engineers everything to build, test, measure, and ship successful products faster. Get started free.'
                }
                image="/images/og/default.png"
                lang={seo?.lang}
                canonicalUrl={seo?.canonicalUrl}
                languageAlternates={seo?.languageAlternates}
            />
            <KoreanMDXViewer
                jsxComponentDescriptors={jsxDescriptors}
                mdxBody={mdxBody}
                maxWidth={900}
                cta={{
                    url: `https://${
                        posthog?.isFeatureEnabled?.('direct-to-eu-cloud') ? 'eu' : 'app'
                    }.posthog.com/signup`,
                    label: translate('Get started - free'),
                }}
            />
        </>
    )
}
