import React, { useEffect, useState } from 'react'
import Link from 'components/Link'
import OSTable from 'components/OSTable'
import { useCustomers } from 'hooks/useCustomers'
import CTA from 'components/Home/CTA'
import { IconArrowRight, IconArrowUpRight, IconGlobe, IconInfo, IconRefresh } from '@posthog/icons'
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
    DigitDash,
} from 'components/OSIcons'
import Roadmap from 'components/Home/New/Roadmap'
import Pricing from 'components/Home/New/Pricing'
import OSButton from 'components/OSButton'
import useProduct from 'hooks/useProduct'
import { Accordion } from 'components/RadixUI/Accordion'
import { JsxComponentDescriptor } from '@mdxeditor/editor'

import Logo from 'components/Logo'
import { useApp } from '../../../context/App'
import { useWindow } from '../../../context/Window'
import { LocaleProvider, useLocale } from '../../../context/Locale'
import Editor from 'components/Editor'
import MDXEditor from 'components/MDXEditor'
import { graphql, useStaticQuery } from 'gatsby'
import { MDXProvider } from '@mdx-js/react'
import SEO, { HOME_KO_LANGUAGE_ALTERNATES } from 'components/seo'
import usePostHog from 'hooks/usePostHog'
import Tooltip from 'components/RadixUI/Tooltip'
import { PRODUCT_COUNT, APP_COUNT } from '../../../constants'
import Start from 'components/Start'
import { CallToAction } from 'components/CallToAction'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import ProductTabs from 'components/ProductTabs'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import CloudinaryImage from 'components/CloudinaryImage'
import IntegrationPrompt from 'components/IntegrationPrompt'
import { motion } from 'framer-motion'
import SmallTeam from 'components/SmallTeam'

interface ProductButtonsProps {
    productTypes: string[]
    className?: string
    beta?: boolean
}

const ProductButtons: React.FC<ProductButtonsProps> = ({ productTypes, className = '', beta = false }) => {
    const allProducts = useProduct()

    const getProduct = (handle: string) =>
        Array.isArray(allProducts) ? allProducts.find((p: any) => p.handle === handle) : undefined

    return (
        <span className={`flex flex-wrap gap-1 pt-1 ${className}`}>
            {productTypes.map((type, index) => {
                const product = getProduct(type)
                return product ? (
                    <OSButton
                        key={type}
                        icon={product.Icon ? <product.Icon /> : undefined}
                        iconClassName={`text-${product.color}`}
                        color={product.color}
                        className="font-medium text-primary hover:text-primary"
                        to={`/${product.slug}`}
                        state={{ newWindow: true }}
                        asLink
                    >
                        {product.name}
                        {beta && <span className="text-xs opacity-50">beta</span>}
                    </OSButton>
                ) : null
            })}
        </span>
    )
}

const HomeHappyHog = () => {
    return (
        <img
            src="https://res.cloudinary.com/dmukukwp6/image/upload/happy_hog_ebc59e4658.png"
            alt="happy hog"
            className="@xl:float-right @xl:ml-2 max-w-[400px] max-h-48 -mt-2 -mr-2"
        />
    )
}

const CTAs = () => {
    const [showIntegrationPrompt, setShowIntegrationPrompt] = useState(false)
    return (
        <div>
            <div className="flex flex-col @xs:flex-row @xs:justify-center @xl:justify-start gap-3 @sm:gap-2">
                <CallToAction
                    to="https://app.posthog.com/signup"
                    size="md"
                    state={{ newWindow: true, initialTab: 'signup' }}
                >
                    {/* Korean: "Get started - free" */}
                    무료로 시작하기
                </CallToAction>
                <CallToAction type="secondary" size="md" onClick={() => setShowIntegrationPrompt(true)}>
                    {/* Korean: "Install with AI" */}
                    AI로 설치하기
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

    return (
        <div className="flex flex-col justify-center text-center mt-20">
            {/* Korean: "Thanks for being visitor number" */}
            <p className="mb-2">방문자 번호:</p>
            <Tooltip
                trigger={
                    <div className="inline-flex bg-black divide-x divide-primary">
                        {hitCount !== null ? (
                            formatCount(hitCount)
                                .split('')
                                .map((digit, index) => {
                                    const DigitComponent = getDigitComponent(digit)
                                    return (
                                        <div
                                            key={index}
                                            className="max-w-7 max-h-8 flex items-center justify-center p-1.5"
                                        >
                                            <DigitComponent className="text-[#00FF00] w-full h-full" />
                                        </div>
                                    )
                                })
                        ) : (
                            <div className="flex gap-0">
                                {[...Array(7)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="w-7 max-h-8 flex items-center justify-center text-red p-1.5 border-l border-primary"
                                    >
                                        <DigitDash className="text-red w-full h-full" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                }
                delay={0}
            >
                {/* Korean: "Total hit count to posthog.com" */}
                posthog.com 총 방문 횟수
            </Tooltip>
        </div>
    )
}

const AIAgents = () => {
    const columns = [
        { name: '', width: 'auto', align: 'center' as const },
        { name: 'Agent', width: 'minmax(150px,300px)', align: 'left' as const },
        { name: 'Skills', width: 'minmax(auto,1fr)', align: 'left' as const },
    ]

    const rows = [
        {
            cells: [
                { content: 1 },
                {
                    content: (
                        <div className="flex gap-2 items-center">
                            <span>
                                <Tooltip
                                    trigger={
                                        <Link to="/ai" state={{ newWindow: true }}>
                                            <img
                                                src="https://res.cloudinary.com/dmukukwp6/image/upload/h_200,c_limit,q_auto,f_auto/ai_max_e80de99727.png"
                                                className="w-16 -m-2"
                                            />
                                        </Link>
                                    }
                                    delay={0}
                                >
                                    <div className="relative">
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/h_400,c_limit,q_auto,f_auto/ai_max_e80de99727.png"
                                            className=""
                                        />
                                        <div className="absolute top-[calc(100%-5rem)] text-center text-3xl font-bold font-squeak uppercase text-orange rotate-[3.5deg] left-0 right-4">
                                            Hi, I'm PostHog AI
                                        </div>
                                    </div>
                                </Tooltip>
                            </span>
                            <div className="flex flex-col">
                                <Link to="/ai" state={{ newWindow: true }}>
                                    PostHog AI
                                </Link>
                                <span className="text-sm text-secondary">Helpful chatbot, data concierge</span>
                            </div>
                        </div>
                    ),
                },
                {
                    content: 'Writes SQL, builds data transformations, gathers context in insights',
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 2 },
                {
                    content: (
                        <div className="flex gap-2 items-center">
                            <span>
                                <Tooltip
                                    trigger={
                                        <Link to="/raquel" state={{ newWindow: true }}>
                                            <img
                                                src="https://res.cloudinary.com/dmukukwp6/image/upload/h_200,c_limit,q_auto,f_auto/ai_raquel_c56887c5b7.png"
                                                className="w-16 -m-2"
                                            />
                                        </Link>
                                    }
                                    delay={0}
                                >
                                    <div className="relative">
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/h_400,c_limit,q_auto,f_auto/ai_raquel_c56887c5b7.png"
                                            className=""
                                        />
                                        <div className="absolute top-[calc(100%-4.75rem)] text-center text-3xl font-bold font-squeak uppercase text-orange rotate-[-2.75deg] left-0 right-0">
                                            Hi, I'm Raquel
                                        </div>
                                    </div>
                                </Tooltip>
                            </span>
                            <div className="flex flex-col">
                                <span>
                                    <Link to="/raquel" state={{ newWindow: true }}>
                                        Raquel
                                    </Link>{' '}
                                    – <em>beta</em>
                                </span>
                                <span className="text-sm text-secondary">Hands-on exec</span>
                            </div>
                        </div>
                    ),
                },
                {
                    content: 'Researches complex data problems, summarizes session recordings',
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 3 },
                {
                    content: (
                        <div className="flex gap-2 items-center">
                            <span>
                                <Tooltip
                                    trigger={
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/h_200,c_limit,q_auto,f_auto/ai_annika_fb5ff41473.png"
                                            className="w-16 -m-2"
                                        />
                                    }
                                    delay={0}
                                >
                                    <div className="relative">
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/h_400,c_limit,q_auto,f_auto/ai_annika_fb5ff41473.png"
                                            className=""
                                        />
                                        <div className="absolute top-[calc(100%-4.75rem)] text-center text-3xl font-bold font-squeak uppercase text-orange rotate-[-2.75deg] left-0 right-0">
                                            Hi, I'm Annika
                                        </div>
                                    </div>
                                </Tooltip>
                            </span>
                            <div className="flex flex-col">
                                <span>
                                    <strong>Annika</strong> – <em>beta</em>
                                </span>
                                <span className="text-sm text-secondary">Product manager</span>
                            </div>
                        </div>
                    ),
                },
                {
                    content:
                        'Identifies errors and UX bugs, writes requirements docs, monitors code changes with phased rollouts',
                    className: 'text-sm',
                },
            ],
        },
        {
            cells: [
                { content: 4 },
                {
                    content: (
                        <div className="flex gap-2 items-center">
                            <span>
                                <Tooltip
                                    trigger={
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/h_200,c_limit,q_auto,f_auto/ai_marius_9c4cd7045d.png"
                                            className="w-16 -m-2"
                                        />
                                    }
                                    delay={0}
                                >
                                    <div className="relative">
                                        <img
                                            src="https://res.cloudinary.com/dmukukwp6/image/upload/h_400,c_limit,q_auto,f_auto/ai_marius_9c4cd7045d.png"
                                            className=""
                                        />
                                        <div className="absolute top-[calc(100%-5rem)] text-center text-3xl font-bold font-squeak uppercase text-orange rotate-[3.5deg] left-0 right-4">
                                            Hi, I'm Marius
                                        </div>
                                    </div>
                                </Tooltip>
                            </span>
                            <div className="flex flex-col">
                                <span>
                                    <strong>Marius</strong> – <em>beta</em>
                                </span>
                                <span className="text-sm text-secondary">10x engineer</span>
                            </div>
                        </div>
                    ),
                },
                {
                    content:
                        'Implements bug fixes, creates and configures feature flags, writes code and generates pull requests',
                    className: 'text-sm',
                },
            ],
        },
    ]

    return <OSTable columns={columns} rows={rows} size="sm" />
}

const COL1 = ['ycombinator', 'airbus', 'trust', 'lovable', 'startengine', 'researchgate', 'exa', 'heygen']

const COL2 = ['supabase', 'mistralai', 'elevenlabs', 'hasura', 'raycast', 'posthog']

const companyBreakdownsEn = {
    VCsLoveThem: { col1: 'VCs love them', col2: 'Product engineers love them' },
    colorful: { col1: 'Colorful logos', col2: '"Sleek" logos' },
    hardware: { col1: 'Hardware companies', col2: 'Not hardware companies' },
    planes: { col1: 'Builds planes', col2: "Doesn't build planes (yet)" },
    highValue: { col1: "Companies with >1 $B's in their valuations", col2: 'Everyone else (for now)' },
    caseStudy: { col1: 'Companies with PostHog case studies', col2: 'Companies who should do case studies' },
    easyToYell: { col1: 'Names you can yell easily', col2: 'Names that require breath control' },
    goodBandName: { col1: 'Good band names', col2: 'Could be mistaken for pharmaceuticals' },
    explainable: {
        col1: 'Companies you can explain to your parents',
        col2: 'Companies your parents will never understand',
    },
    shortNames: { col1: 'Names with 7 letters or less', col2: 'Names you can easily mistype' },
    realWords: { col1: 'Real words', col2: 'Not real words' },
    american: { col1: 'Founded in America', col2: 'Not founded in America' },
    pokemon: { col1: 'Could be a Pokémon', col2: 'Could be a Bond Villain' },
}

const companyBreakdownsKo = {
    VCsLoveThem: { col1: 'VC가 좋아하는 회사', col2: '프로덕트 엔지니어가 좋아하는 회사' },
    colorful: { col1: '컬러풀한 로고', col2: '"슬릭한" 로고' },
    hardware: { col1: '하드웨어 회사', col2: '하드웨어 회사 아님' },
    planes: { col1: '비행기 만드는 회사', col2: '아직 비행기는 안 만드는 회사' },
    highValue: { col1: '밸류에이션 10억 달러 이상', col2: '그 외 (당분간)' },
    caseStudy: { col1: 'PostHog 사례 연구 있는 회사', col2: '사례 연구 하면 좋을 회사' },
    easyToYell: { col1: '부르기 쉬운 이름', col2: '호흡 조절이 필요한 이름' },
    goodBandName: { col1: '밴드 이름으로 좋을 만한', col2: '제약회사로 오해받기 쉬운' },
    explainable: { col1: '부모님께 설명 가능한 회사', col2: '부모님이 이해 못 할 회사' },
    shortNames: { col1: '글자 7개 이하', col2: '오타 내기 쉬운 이름' },
    realWords: { col1: '실제 단어', col2: '실제 단어 아님' },
    american: { col1: '미국에서 설립', col2: '미국 외에서 설립' },
    pokemon: { col1: '포켓몬 같음', col2: '본드 빌런 같음' },
}

const companyAttributes = {
    VCsLoveThem: ['ycombinator', 'airbus', 'trust', 'lovable', 'startengine', 'researchgate', 'exa', 'heygen'],
    colorful: ['ycombinator', 'trust', 'lovable', 'supabase', 'startengine', 'mistralai', 'raycast', 'posthog'],
    hardware: ['airbus', 'posthog'],
    planes: ['airbus'],
    highValue: ['airbus', 'elevenlabs', 'lovable', 'supabase', 'hasura', 'mistralai'],
    caseStudy: ['ycombinator', 'elevenlabs', 'lovable', 'supabase', 'hasura', 'researchgate', 'exa', 'posthog'],
    easyToYell: ['airbus', 'trust', 'raycast', 'exa', 'heygen', 'posthog'],
    goodBandName: ['elevenlabs', 'lovable', 'trust', 'startengine', 'raycast', 'researchgate', 'posthog'],
    explainable: ['ycombinator', 'airbus', 'lovable', 'startengine', 'researchgate', 'exa'],
    shortNames: ['airbus', 'trust', 'lovable', 'hasura', 'raycast', 'exa', 'heygen', 'posthog'],
    realWords: ['airbus', 'trust', 'lovable', 'elevenlabs', 'startengine', 'researchgate', 'posthog'],
    american: ['ycombinator', 'trust', 'supabase', 'hasura', 'startengine', 'researchgate', 'exa', 'heygen', 'posthog'],
    pokemon: ['lovable', 'supabase', 'hasura', 'mistralai', 'raycast', 'exa', 'heygen'],
}

interface CustomerProps {
    number: number
    customer: {
        logo?: {
            light: string
            dark: string
        }
        name: string
        toolsUsed?: string[]
        slug: string
        notes?: string
    }
}

const ProductCount = () => {
    return <strong>{PRODUCT_COUNT}+ products</strong>
}

const AppCount = () => {
    return <>{APP_COUNT}</>
}

const CompanyStageTabs = () => {
    const [selectedStage, setSelectedStage] = React.useState('growth')

    const companyStageOptions: ToggleOption[] = [
        {
            label: (
                <span>
                    {/* Korean: "Startup / Side project" */}
                    스타트업<span className="hidden @lg:inline"> / 사이드 프로젝트</span>
                </span>
            ),
            value: 'startup',
        },
        {
            // Korean: "Growth"
            label: '성장기',
            value: 'growth',
        },
        {
            // Korean: "Scale"
            label: '스케일',
            value: 'scale',
        },
    ]

    return (
        <>
            <ToggleGroup
                hideTitle
                title="Company stage"
                options={companyStageOptions}
                onValueChange={setSelectedStage}
                value={selectedStage}
                className="mb-2"
            />

            {selectedStage === 'startup' && (
                <div className="flex flex-col gap-2">
                    <ProductTabs
                        productHandles={[
                            'web_analytics',
                            'session_replay',
                            'product_analytics',
                            'feature_flags',
                            'error_tracking',
                            'surveys',
                            'llm_analytics',
                        ]}
                    />
                </div>
            )}
            {selectedStage === 'growth' && (
                <div className="flex flex-col gap-2">
                    <ProductTabs
                        productHandles={[
                            'posthog_ai',
                            'session_replay',
                            'web_analytics',
                            'product_analytics',
                            'error_tracking',
                            'experiments',
                            'feature_flags',
                            'surveys',
                            'logs',
                            'cdp',
                            'workflows_emails',
                        ]}
                    />
                </div>
            )}
            {selectedStage === 'scale' && (
                <div className="flex flex-col gap-2">
                    <ProductTabs
                        productHandles={[
                            'data_warehouse',
                            'cdp',
                            'dashboards',
                            'product_analytics',
                            'experiments',
                            'feature_flags',
                            'error_tracking',
                        ]}
                        selectedStage="scale"
                    />
                </div>
            )}
        </>
    )
}

const Button = ({ url, children }: { url: string; children: React.ReactNode }) => {
    return (
        <OSButton asLink to={url} variant="secondary" size="md" state={{ newWindow: true }}>
            {children}
        </OSButton>
    )
}

const Image = ({ src, className }: { src: `https://res.cloudinary.com/${string}`; className?: string }) => {
    return <CloudinaryImage src={src} className={className} />
}

const Customers = () => {
    const locale = useLocale()
    const companyBreakdowns = locale === 'ko' ? companyBreakdownsKo : companyBreakdownsEn
    const { getCustomers, hasCaseStudy } = useCustomers()
    const [currentBreakdown, setCurrentBreakdown] = React.useState('VCsLoveThem')
    const [isAnimating, setIsAnimating] = React.useState(false)
    const logoRefs = React.useRef<Record<string, HTMLElement>>({})

    const allCompanies = [...COL1, ...COL2]
    const companiesInCol1 = companyAttributes[currentBreakdown as keyof typeof companyAttributes] || []
    const companiesInCol2 = allCompanies.filter((company) => !companiesInCol1.includes(company))

    const column1 = getCustomers(companiesInCol1)
    const column2 = getCustomers(companiesInCol2)

    const renderLogo = (customer: any) => {
        if (!customer.logo) {
            return <span className="text-xs">{customer.name}</span>
        }

        if (typeof customer.logo === 'function') {
            const LogoComponent = customer.logo
            const heightClass = customer.height ? `h-${customer.height - 2}` : 'h-8'
            const className = `w-full fill-current object-contain ${heightClass} `.trim()
            return <LogoComponent className={className} />
        }

        const heightClass = customer.height ? `max-h-${customer.height}` : ''
        return (
            <>
                <img
                    src={customer.logo.light}
                    alt={customer.name}
                    className={`h-full w-auto object-contain dark:hidden ${heightClass}`}
                />
                <img
                    src={customer.logo.dark}
                    alt={customer.name}
                    className={`h-full w-auto object-contain hidden dark:block ${heightClass}`}
                />
            </>
        )
    }

    const toggleBreakdown = () => {
        if (isAnimating) return

        const beforePositions: Record<string, DOMRect> = {}
        Object.keys(logoRefs.current).forEach((slug) => {
            const element = logoRefs.current[slug]
            if (element) {
                beforePositions[slug] = element.getBoundingClientRect()
            }
        })

        setIsAnimating(true)

        const breakdownKeys = Object.keys(companyBreakdowns)
        const currentIndex = breakdownKeys.indexOf(currentBreakdown)
        const availableBreakdowns = breakdownKeys.filter((_, index) => index !== currentIndex)
        const randomIndex = Math.floor(Math.random() * availableBreakdowns.length)
        setCurrentBreakdown(availableBreakdowns[randomIndex])

        requestAnimationFrame(() => {
            Object.keys(logoRefs.current).forEach((slug) => {
                const element = logoRefs.current[slug]
                if (element && beforePositions[slug]) {
                    const afterPosition = element.getBoundingClientRect()
                    const deltaX = beforePositions[slug].left - afterPosition.left
                    const deltaY = beforePositions[slug].top - afterPosition.top

                    element.style.transform = `translate(${deltaX}px, ${deltaY}px)`
                    element.style.transition = 'none'

                    requestAnimationFrame(() => {
                        element.style.transition = 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)'
                        element.style.transform = 'translate(0, 0)'
                    })
                }
            })

            setTimeout(() => {
                setIsAnimating(false)
                Object.keys(logoRefs.current).forEach((slug) => {
                    const element = logoRefs.current[slug]
                    if (element) {
                        element.style.transform = ''
                        element.style.transition = ''
                    }
                })
            }, 600)
        })
    }

    const currentLabels = companyBreakdowns[currentBreakdown as keyof typeof companyBreakdownsEn]
    const columns = [
        { name: currentLabels.col1, width: 'minmax(auto,1fr)', align: 'center' as const },
        { name: currentLabels.col2, width: 'minmax(auto,1fr)', align: 'center' as const },
    ]

    const renderCustomerWithLink = (customer: any) => (
        <div
            key={customer.slug}
            className="inline-block"
            ref={(el: HTMLElement | null) => {
                if (el) logoRefs.current[customer.slug] = el
            }}
        >
            {hasCaseStudy(customer.slug) || customer.slug === 'posthog' ? (
                <OSButton
                    asLink
                    to={customer.slug === 'posthog' ? '/blog/posthog-marketing' : `/customers/${customer.slug}`}
                    state={{ newWindow: true }}
                    className="relative border border-transparent hover:border-primary rounded-sm"
                >
                    {renderLogo(customer)}
                    <Tooltip
                        trigger={
                            <span className="absolute top-1 right-0 inline-flex w-4 h-4 rounded-full bg-red border-2 border-white dark:border-dark"></span>
                        }
                        delay={0}
                        sideOffset={14}
                    >
                        <p className="text-sm mb-0">
                            {/* Korean: "First PostHog customer!" / "Read customer story" */}
                            {customer.slug === 'posthog' ? '첫 번째 PostHog 고객!' : '고객 스토리 읽기'}
                        </p>
                    </Tooltip>
                </OSButton>
            ) : (
                <span className="inline-flex py-1.5 px-2">{renderLogo(customer)}</span>
            )}
        </div>
    )

    const rows = [
        {
            cells: [
                {
                    content: (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center items-center">
                            {column1.map(renderCustomerWithLink)}
                        </div>
                    ),
                    className: '!p-4',
                },
                {
                    content: (
                        <div className="flex flex-wrap gap-x-4 gap-y-1 justify-center items-center">
                            {column2.map(renderCustomerWithLink)}
                        </div>
                    ),
                    className: '!p-4',
                },
            ],
        },
    ]

    return (
        <>
            <div className="relative @xl:pt-1 pb-2 @xl:pb-0">
                <div className="@xl:absolute right-0 -top-8">
                    <OSButton
                        onClick={toggleBreakdown}
                        variant="secondary"
                        size="sm"
                        className="font-semibold [&_span]:min-w-[146px]"
                        disabled={isAnimating}
                    >
                        {isAnimating ? (
                            '🔀 섞는 중...' // Korean: "Shuffling..."
                        ) : (
                            <>
                                {/* Korean: "Shuffle companies" */}
                                <IconRefresh className="size-4 inline-block relative -top-px" /> 회사 섞기
                            </>
                        )}
                    </OSButton>
                </div>
            </div>
            <OSTable columns={columns} rows={rows} size="sm" rowAlignment="top" />
            <OSButton asLink to="/customers" variant="secondary" size="md" className="mt-4" state={{ newWindow: true }}>
                {/* Korean: "Open customers.mdx" */}
                customers.mdx 열기
            </OSButton>
        </>
    )
}

const jsxComponentDescriptors: JsxComponentDescriptor[] = [
    {
        name: 'AppCount',
        kind: 'flow',
        props: [],
        Editor: () => <AppCount />,
    },
    {
        name: 'CompanyStageTabs',
        kind: 'flow',
        props: [],
        Editor: () => <CompanyStageTabs />,
    },
    {
        name: 'CTAs',
        kind: 'flow',
        props: [],
        Editor: () => <CTAs />,
    },
    {
        name: 'HomeHitCounter',
        kind: 'flow',
        props: [],
        Editor: () => <HomeHitCounter />,
    },
    {
        name: 'AIAgents',
        kind: 'flow',
        props: [],
        Editor: () => <AIAgents />,
    },
    {
        name: 'Pricing',
        kind: 'flow',
        props: [],
        Editor: () => <Pricing />,
    },
    {
        name: 'Customers',
        kind: 'flow',
        props: [],
        Editor: () => <Customers />,
    },
    {
        name: 'CTA',
        kind: 'flow',
        props: [],
        Editor: () => (
            <>
                {/* Korean: "If nothing else has sold you on PostHog, hopefully these classic marketing tactics will." */}
                <p className="-mt-2">아직도 망설이신다면, 이런 클래식한 마케팅 전술을 써보겠습니다.</p>
                <CTA headline={false} />
            </>
        ),
    },
    {
        name: 'Logo',
        kind: 'flow',
        props: [],
        Editor: () => {
            const { siteSettings } = useApp()
            return <Logo className="inline-block" fill={siteSettings.theme === 'dark' ? 'white' : undefined} />
        },
    },
    {
        name: 'ButtonDataStack',
        kind: 'flow',
        props: [],
        // Korean: "README: PostHog data stack.md"
        Editor: () => <Button url="/data-stack">README: PostHog 데이터 스택.md</Button>,
    },
    {
        name: 'ButtonPricing',
        kind: 'flow',
        props: [],
        // Korean: "Explore pricing"
        Editor: () => <Button url="/pricing">요금제 살펴보기</Button>,
    },
    {
        name: 'ButtonAI',
        kind: 'flow',
        props: [],
        // Korean: "Learn about PostHog AI"
        Editor: () => <Button url="/ai">PostHog AI 알아보기</Button>,
    },
    {
        name: 'ButtonAbout',
        kind: 'flow',
        props: [],
        // Korean: "Read more about us"
        Editor: () => <Button url="/about">우리에 대해 더 알아보기</Button>,
    },
    {
        name: 'ImageDW',
        kind: 'flow',
        props: [],
        Editor: () => (
            <Image
                src="https://res.cloudinary.com/dmukukwp6/image/upload/data_warehouse_2c3928e9ad.png"
                className="max-w-[213px] absolute bottom-[-4px] right-0 rounded-br-sm"
            />
        ),
    },
    {
        name: 'ImageMoney',
        kind: 'flow',
        props: [],
        Editor: () => (
            <Image
                src="https://res.cloudinary.com/dmukukwp6/image/upload/dont_burn_money_28d5861fad.png"
                className="float-right max-w-[120px] @sm:max-w-[200px] ml-2 @sm:ml-4 mb-2 @sm:-mt-4"
            />
        ),
    },
    {
        name: 'ImageReading1',
        kind: 'flow',
        props: [],
        Editor: () => (
            <Image
                src="https://res.cloudinary.com/dmukukwp6/image/upload/reading_at_night_8397c5198c.png"
                className="@md:hidden @xl:block @lg:float-right max-w-full @xl:max-w-xs rotate-1 shadow-2xl rounded border-4 border-white dark:border-primary -mb-2 @lg:mb-2 @lg:ml-4 @lg:-mt-2"
            />
        ),
    },
    {
        name: 'ImageReading2',
        kind: 'flow',
        props: [],
        Editor: () => (
            <Image
                src="https://res.cloudinary.com/dmukukwp6/image/upload/reading_at_night_8397c5198c.png"
                className="hidden @md:block @md:float-right @xl:hidden @md:max-w-60 @xl:max-w-xs @sm:ml-4 @sm:mb-2 rotate-1 shadow-2xl rounded border-4 border-white dark:border-primary"
            />
        ),
    },
    {
        name: 'TooltipDW',
        kind: 'flow',
        props: [],
        Editor: () => (
            <Tooltip
                trigger={
                    <span>
                        <IconInfo className="size-4 inline-block relative -top-px" />
                    </span>
                }
                delay={0}
            >
                {/* Korean: "You can also connect your own!" */}
                <p className="text-sm mb-0">자체 데이터 웨어하우스도 연결할 수 있어요!</p>
            </Tooltip>
        ),
    },
    {
        name: 'SupportSmallTeamLink',
        kind: 'flow',
        props: [],
        Editor: () => (
            // Korean: "support folks"
            <SmallTeam slug="support" noMiniCrest>
                <span>서포트 팀원들</span>
            </SmallTeam>
        ),
    },
]

interface KoreanHomeProps {
    rawBody?: string
    mdxBody?: unknown
    bodyComponent?: React.ComponentType
}

export default function KoreanHome({
    rawBody: rawBodyProp,
    mdxBody: mdxBodyProp,
    bodyComponent: BodyComponent,
}: KoreanHomeProps = {}) {
    const data = useStaticQuery(graphql`
        query KoreanHomeQuery {
            mdx(fields: { slug: { eq: "/ko" } }) {
                rawBody
                mdxBody: body
            }
        }
    `)
    const rawBody = rawBodyProp ?? data?.mdx?.rawBody
    const mdxBody = mdxBodyProp ?? data?.mdx?.mdxBody
    const { appWindow } = useWindow()
    const { setWindowTitle } = useApp()
    const posthog = usePostHog()

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'home.mdx (한국어)')
        }
    }, [])

    if (BodyComponent) {
        const components = {
            ...jsxComponentDescriptors.reduce((acc, d) => {
                if (d.name) acc[d.name] = d.Editor
                return acc
            }, {} as Record<string, React.ComponentType<unknown>>),
            Link,
        }
        return (
            <LocaleProvider locale="ko">
                <SEO
                    lang="ko"
                    title="PostHog – 프로덕트 엔지니어를 위한 도구"
                    updateWindowTitle={false}
                    description="모든 개발자 도구를 한 곳에서. PostHog는 엔지니어에게 성공적인 제품을 더 빠르게 구축, 테스트, 측정, 배포할 수 있는 모든 것을 제공합니다. 무료로 시작하세요."
                    image="/images/og/default.png"
                    languageAlternates={HOME_KO_LANGUAGE_ALTERNATES}
                />
                <Editor
                    type="mdx"
                    hideToolbar
                    cta={{
                        url: `https://${
                            posthog?.isFeatureEnabled?.('direct-to-eu-cloud') ? 'eu' : 'app'
                        }.posthog.com/signup`,
                        label: '무료로 시작하기',
                    }}
                >
                    {/* @ts-expect-error MDXProvider return type incompatible with React 18 */}
                    <MDXProvider components={components as import('@mdx-js/react').MDXProviderComponentsProp}>
                        <BodyComponent />
                    </MDXProvider>
                </Editor>
            </LocaleProvider>
        )
    }

    if (!mdxBody) {
        return (
            <>
                <SEO
                    lang="ko"
                    title="PostHog – 프로덕트 엔지니어를 위한 도구"
                    updateWindowTitle={false}
                    description="모든 개발자 도구를 한 곳에서."
                    image="/images/og/default.png"
                    languageAlternates={HOME_KO_LANGUAGE_ALTERNATES}
                />
                <div className="p-8 text-center text-secondary">
                    <p>한국어 랜딩 페이지 콘텐츠를 불러올 수 없습니다.</p>
                    <Link to="/" className="text-primary underline mt-4 inline-block">
                        영어 홈페이지로 이동
                    </Link>
                </div>
            </>
        )
    }

    return (
        <>
            <SEO
                lang="ko"
                title="PostHog – 프로덕트 엔지니어를 위한 도구"
                updateWindowTitle={false}
                description="모든 개발자 도구를 한 곳에서. PostHog는 엔지니어에게 성공적인 제품을 더 빠르게 구축, 테스트, 측정, 배포할 수 있는 모든 것을 제공합니다. 무료로 시작하세요."
                image="/images/og/default.png"
                languageAlternates={HOME_KO_LANGUAGE_ALTERNATES}
            />
            <MDXEditor
                jsxComponentDescriptors={jsxComponentDescriptors}
                body={rawBody ?? ''}
                mdxBody={mdxBody}
                cta={{
                    url: `https://${
                        posthog?.isFeatureEnabled?.('direct-to-eu-cloud') ? 'eu' : 'app'
                    }.posthog.com/signup`,
                    label: '무료로 시작하기',
                }}
            />
        </>
    )
}
