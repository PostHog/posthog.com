import React, { useEffect, useMemo, useRef, useState } from 'react'
import { navigate } from 'gatsby'
import SEO from 'components/seo'
import useProduct from '../../hooks/useProduct'
import { IconArrowRight, IconArrowUpRight } from '@posthog/icons'
import { IconApple } from 'components/OSIcons'
import Editor from 'components/Editor'
import WizardCommand from 'components/WizardCommand'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { CTAs } from 'components/Home/Test'
import Tooltip from 'components/RadixUI/Tooltip'
import WistiaVideo, { WistiaVideoRef } from 'components/WistiaVideo'
import TVScreen from 'components/Home/Test/TV'
import { Accordion } from 'components/RadixUI/Accordion'
import OSButton from 'components/OSButton'

const statusDotColor: Record<string, string> = {
    beta: 'bg-yellow',
    alpha: 'bg-orange',
    WIP: 'bg-red',
}

const sections = [
    {
        title: 'Data platform',
        description:
            'Having all your product data in one place means you can make more informed decisions. Push all your data to PostHog, then send it anywhere else you need, too.',
        link: { label: 'Data stack README', url: '/data-stack' },
        groups: [
            {
                label: 'Data I/O',
                handles: ['data_in', 'data_out'],
                afterLink: { label: 'View all integrations', url: '/data-stack/integrations-library' },
            },
            {
                label: 'Manage & query',
                colSpan: 2,
                columns: [
                    ['data_modeling', 'data_warehouse', 'cdp'],
                    ['sql_editor', 'bi'],
                ],
            },
        ],
    },
    {
        title: 'Automatic tooling',
        description: (
            <>
                In a previous era of building products, you'd need to configure event tracking and feature flags
                manually. Now, your AI coding agent can use the{' '}
                <Link to="/docs/model-context-protocol" state={{ newWindow: true }} className="font-semibold">
                    PostHog MCP
                </Link>{' '}
                to configure PostHog without leaving your{' '}
                <Tooltip trigger={<span className="border-b border-primary border-dotted">ADE</span>}>
                    <span>AI development environment – like Claude Code, Cursor, and more.</span>
                </Tooltip>
                .
            </>
        ),
        link: [
            { label: 'Tooling README', url: '/tooling' },
            { label: 'Instructions for LLMs', url: '/docs/ai-engineering/markdown-llms-txt' },
        ],
        groups: [
            {
                label: 'Understand product usage',
                colSpan: 2,
                columns: [
                    ['web_analytics', 'product_analytics', 'revenue_analytics', 'trends'],
                    ['funnels', 'user_paths', 'lifecycle', 'heatmaps'],
                    ['llm_traces', 'llm_generations', 'llm_evals', 'activity'],
                ],
            },
            {
                label: 'Debug & fix issues',
                handles: ['error_tracking', 'logs', 'session_replay', 'profiles'],
            },
            {
                label: 'Ship features & get feedback',
                colSpan: 2,
                columns: [
                    ['feature_flags', 'experiments', 'no_code_ab_testing', 'early_access', 'endpoints', 'webhooks'],
                    ['workflows_emails', 'surveys', 'product_tours', 'support', 'user_interviews'],
                ],
            },
        ],
    },
]

const PROMPTS = [
    { slide: 'analytics', text: 'Why has my traffic decreased?', videoId: 'pmh9dvfgj4' },
    { slide: 'analytics', text: 'Create an SEO/SEM dashboard for my marketing team', videoId: '79pshye67k' },
    { slide: 'analytics', text: 'Find issues with page performance', videoId: '1fxx4escag' },
    { slide: 'replay', text: 'Watch user sessions to find UX issues', videoId: '39pr1b86tw' },
    { slide: 'replay', text: 'Show me recordings of visitors using a feature', videoId: '1bct5lkhxh' },
    { slide: 'feature-flags', text: 'Create a feature flag', videoId: 'lqo8v51lw6' },
    { slide: 'data-warehouse', text: 'Write a SQL query', videoId: 'lw11gbdm03' },
]

function ProductTrigger({ handle }: { handle: string }) {
    const product = useProduct({ handle }) as
        | { Icon?: React.ComponentType<{ className?: string }>; color?: string; name?: string }
        | undefined
    const Icon = product?.Icon
    return (
        <div className="flex items-center gap-2">
            {Icon && <Icon className={`size-5 text-${product?.color}`} />}
            <h2 className="!m-0">{product?.name}</h2>
        </div>
    )
}

const AIDemos = () => {
    const videoRef = useRef<WistiaVideoRef>(null)
    const tvScreenRef = useRef<HTMLDivElement>(null)
    const [activePromptIndex, setActivePromptIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(true)

    const scrollToVideo = () => {
        if (tvScreenRef.current) {
            setTimeout(() => {
                tvScreenRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
            }, 100)
        }
    }

    const handlePrev = () => {
        setActivePromptIndex((prev) => (prev - 1 + PROMPTS.length) % PROMPTS.length)
    }

    const handlePlayPause = () => {
        if (isPlaying) {
            videoRef.current?.pause()
        } else {
            videoRef.current?.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleNext = () => {
        setActivePromptIndex((prev) => (prev + 1) % PROMPTS.length)
    }

    useEffect(() => {
        setIsPlaying(true)
    }, [activePromptIndex])

    const currentPrompt = PROMPTS[activePromptIndex]
    const activeAccordion = currentPrompt.slide

    const handleVideoEnd = () => {
        setActivePromptIndex((prev) => (prev + 1) % PROMPTS.length)
    }

    const handleAccordionChange = (value: string) => {
        if (!value) return
        const firstPromptIndex = PROMPTS.findIndex((p) => p.slide === value)
        if (firstPromptIndex !== -1) {
            setActivePromptIndex(firstPromptIndex)
            scrollToVideo()
        }
    }

    const handlePromptClick = (index: number) => {
        if (index === activePromptIndex) {
            videoRef.current?.time(0)
            videoRef.current?.play()
        } else {
            setActivePromptIndex(index)
        }
        scrollToVideo()
    }

    const promptsWithIndex = PROMPTS.map((p, i) => ({ ...p, globalIndex: i }))

    const accordionItems = [
        { handle: 'product_analytics', value: 'analytics' },
        { handle: 'session_replay', value: 'replay' },
        { handle: 'feature_flags', value: 'feature-flags' },
        { handle: 'data_warehouse', value: 'data-warehouse' },
    ].map(({ handle, value }) => {
        const slidePrompts = promptsWithIndex.filter((p) => p.slide === value)
        return {
            value,
            trigger: <ProductTrigger handle={handle} />,
            content: (
                <div data-scheme="secondary" className="flex flex-col px-6 gap-px">
                    {slidePrompts.map((prompt) => (
                        <OSButton
                            key={prompt.globalIndex}
                            size="md"
                            width="full"
                            align="left"
                            onClick={() => handlePromptClick(prompt.globalIndex)}
                            className={`before:opacity-0 hover:!border-transparent before:content-["►"] before:text-base before:absolute before:-left-4 before:top-0.5 before:text-red dark:before:text-yellow active:!bg-transparent focus:!border-transparent ${
                                activePromptIndex === prompt.globalIndex
                                    ? 'font-bold before:opacity-100 !text-red dark:!text-yellow'
                                    : 'hover:underline hover:before:opacity-25 before:!text-primary'
                            }`}
                        >
                            "{prompt.text}"
                        </OSButton>
                    ))}
                </div>
            ),
        }
    })

    return (
        <>
            <h3 className="mt-0">PostHog AI demos</h3>

            <div className="flex flex-col @2xl:flex-row gap-8">
                <div className="@2xl:flex-[0_0_350px]">
                    <div className="@2xl:max-w-lg">
                        <Accordion
                            key={activeAccordion}
                            items={accordionItems}
                            defaultValue={activeAccordion}
                            onValueChange={handleAccordionChange}
                            triggerClassName="[&_h2]:text-lg !bg-transparent"
                        />
                    </div>
                </div>
                <div ref={tvScreenRef} className=" flex-1 flex flex-col items-center">
                    <TVScreen
                        className="relative w-full"
                        title={currentPrompt.text}
                        isPlaying={isPlaying}
                        videoNumber={activePromptIndex + 1}
                        onPrev={handlePrev}
                        onPlayPause={handlePlayPause}
                        onNext={handleNext}
                    >
                        <WistiaVideo
                            ref={videoRef}
                            videoId={currentPrompt.videoId}
                            onEnd={handleVideoEnd}
                            className="absolute inset-0 [&_.w-chrome]:!rounded-none [&_video]:m-0 [&_.w-vulcan-v2]:!rounded-none [&_.w-chrome]:![clip-path:none]"
                            hideInitialControls
                            hideAudioControls
                        />
                    </TVScreen>
                </div>
            </div>
        </>
    )
}

const ProductRow = ({ product }: { product: any }) => {
    const isWIP = product.status === 'WIP'

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        if (isWIP) return
        navigate(`/${product.slug}`, { state: { newWindow: true } })
    }

    return (
        <button
            onClick={handleClick}
            className={`flex items-center gap-2 py-0.5 group text-left w-full ${
                isWIP ? 'cursor-default opacity-60' : 'cursor-pointer'
            }`}
        >
            {product.Icon &&
                React.createElement(product.Icon, {
                    className: `size-6 shrink-0 text-${product.color}`,
                })}
            <span
                className={`text-[15px] font-medium text-primary ${
                    isWIP ? '' : 'group-hover:underline underline-offset-2'
                }`}
            >
                {product.name}
            </span>
            {product.status && (
                <span className={`size-1.5 shrink-0 rounded-full ${statusDotColor[product.status] || 'bg-muted'}`} />
            )}
        </button>
    )
}

export default function ProductsTest(): JSX.Element {
    const allProducts = useProduct() as any[]

    const productsByHandle = useMemo(() => {
        const map: Record<string, any> = {}
        for (const p of allProducts) {
            map[p.handle] = p
        }
        return map
    }, [allProducts])

    return (
        <>
            <SEO
                title="Product OS – PostHog"
                description="PostHog is the cracked technical co-founder that handles all the stuff you used to worry about."
                image="/images/og/default.png"
            />
            <Editor maxWidth={900}>
                <div className="space-y-10 font-rounded [&_p]:text-base [&_li]:text-base">
                    {/* Hero */}
                    <header className="space-y-4 text-center @xl:text-left">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/coderhog_80987dd905.png"
                            className="@xl:float-right @xl:ml-4 w-56 @xl:mt-4"
                        />
                        <h1 className="text-2xl @lg:text-3xl font-bold leading-tight">
                            Devtools and product data infrastructure for building successful products
                        </h1>
                        <p className="text-lg leading-relaxed">
                            Humans and AI agents build with PostHog because everything you need to collect and analyze
                            product usage data – and build and ship new features – lives in one place.
                        </p>

                        <CTAs />

                        {/* 
                        <div className="flex flex-wrap items-center gap-3 not-prose">
                            <Link
                                to="/download"
                                state={{ newWindow: true }}
                                className="inline-flex items-center gap-2 bg-dark text-white dark:bg-white dark:text-dark font-semibold text-sm px-4 py-2.5 rounded-md hover:opacity-90 no-underline"
                            >
                                <IconApple className="size-4" />
                                Download for Mac
                                <IconArrowRight className="size-4" />
                            </Link>
                            <WizardCommand slim />
                        </div>

                        <div className="flex gap-4 text-sm">
                            <Link
                                to="/docs/libraries/vscode"
                                state={{ newWindow: true }}
                                className="underline underline-offset-2 font-medium"
                            >
                                Get our VS Code extension
                            </Link>
                            <span className="text-secondary">or</span>
                            <Link
                                to="/docs/model-context-protocol"
                                state={{ newWindow: true }}
                                className="underline underline-offset-2 font-medium"
                            >
                                Try the MCP
                            </Link>
                        </div>
                         */}
                    </header>

                    {/* Sections */}
                    {sections.map((section) => (
                        <section key={section.title} className="space-y-3">
                            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0">
                                <h2 className="text-xl font-bold m-0">{section.title}</h2>
                                {section.link && (
                                    <aside className="order-last @xl:order-none">
                                        {(Array.isArray(section.link) ? section.link : [section.link]).map(
                                            (link, i, arr) => (
                                                <React.Fragment key={link.url}>
                                                    <Link
                                                        to={link.url}
                                                        state={{ newWindow: true }}
                                                        className="group inline-flex items-center gap-1 font-medium whitespace-nowrap"
                                                    >
                                                        {link.label}{' '}
                                                        <IconArrowUpRight className="size-3.5 text-secondary group-hover:text-primary" />
                                                    </Link>
                                                    {i < arr.length - 1 && (
                                                        <span className="text-secondary mx-1"> | </span>
                                                    )}
                                                </React.Fragment>
                                            )
                                        )}
                                    </aside>
                                )}
                                <p className="text-[15px] leading-relaxed w-full mb-0">{section.description}</p>
                            </div>

                            <div
                                className={`grid gap-x-8 gap-y-6 ${
                                    section.groups.length >= 3
                                        ? 'grid-cols-1 @lg:grid-cols-2 @2xl:grid-cols-3'
                                        : 'grid-cols-1 @3xl:grid-cols-3'
                                }`}
                            >
                                {section.groups.map((group, gi) => {
                                    if ('columns' in group && group.columns) {
                                        const isFirstGroup = gi === 0
                                        const spanClass =
                                            group.colSpan === 2
                                                ? isFirstGroup
                                                    ? '@lg:col-span-2 @2xl:col-span-3'
                                                    : '@lg:col-span-2'
                                                : ''
                                        return (
                                            <div key={gi} className={spanClass}>
                                                {group.label && (
                                                    <h3 className="text-sm font-semibold uppercase text-secondary mb-1.5">
                                                        {group.label}
                                                    </h3>
                                                )}
                                                <div
                                                    className={`grid gap-x-4 @lg:gap-x-8 gap-y-1 ${
                                                        isFirstGroup
                                                            ? '@lg:grid-cols-2 @3xl:grid-cols-3'
                                                            : '@lg:grid-cols-2'
                                                    }`}
                                                >
                                                    {group.columns.map((col: string[], ci: number) => (
                                                        <div key={ci} className="space-y-1.5">
                                                            {col.map((handle: string) => {
                                                                const product = productsByHandle[handle]
                                                                if (!product) return null
                                                                return <ProductRow key={handle} product={product} />
                                                            })}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    }

                                    return (
                                        <div key={gi} className="space-y-1">
                                            {group.label && (
                                                <h3 className="text-sm font-semibold uppercase text-secondary mb-1.5">
                                                    {group.label}
                                                </h3>
                                            )}
                                            {group.handles?.map((handle: string) => {
                                                const product = productsByHandle[handle]
                                                if (!product) return null
                                                return <ProductRow key={handle} product={product} />
                                            })}
                                            {'afterLink' in group && group.afterLink && (
                                                <Link
                                                    to={group.afterLink.url}
                                                    state={{ newWindow: true }}
                                                    className="inline-flex items-center gap-1 text-sm font-bold mt-2"
                                                >
                                                    {group.afterLink.label} <IconArrowRight className="size-3.5" />
                                                </Link>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    ))}

                    <div>
                        <h2 className="text-xl font-bold m-0">Data exploration</h2>
                        <p className="text-[15px] leading-relaxed !mt-4">
                            Instead of building insights from scratch, chat with{' '}
                            <Link to="/ai" state={{ newWindow: true }} className="font-semibold">
                                PostHog AI
                            </Link>{' '}
                            to have it do the hard work for you. If you want to do a deep dive, try{' '}
                            <Link to="/notebooks" state={{ newWindow: true }} className="font-semibold">
                                Notebooks
                            </Link>{' '}
                            where you can compile multiple insights and write up your findings on an infinite canvas.
                            And if you want to monitor metrics over time, save them to{' '}
                            <Link to="/dashboards" state={{ newWindow: true }} className="font-semibold">
                                Dashboards
                            </Link>
                            .
                        </p>
                        <AIDemos />
                    </div>
                </div>
            </Editor>
        </>
    )
}
