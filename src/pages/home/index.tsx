import React, { useRef, useState } from 'react'
import Wizard from 'components/Wizard'
import { CallToAction } from 'components/CallToAction'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Logo from 'components/Logo'
import SEO from 'components/seo'
import OSButton from 'components/OSButton'
import { useApp } from '../../context/App'
import WistiaVideo, { WistiaVideoRef } from 'components/WistiaVideo'
import { Accordion } from 'components/RadixUI/Accordion'
import useProduct from 'hooks/useProduct'

// Prompts with video IDs, grouped by slide (quotes added during render)
const PROMPTS = [
    { slide: 'analytics', text: 'Why has my traffic decreased?', videoId: 'pmh9dvfgj4' },
    { slide: 'analytics', text: 'Create an SEO/SEM dashboard for my marketing team', videoId: '79pshye67k' },
    { slide: 'analytics', text: "What's my activation rate?", videoId: 'pmh9dvfgj4' },
    { slide: 'feature-flags', text: 'Add a feature flag to my product', videoId: '79pshye67k' },
    { slide: 'feature-flags', text: 'Roll out a feature flag to 50% of users', videoId: 'pmh9dvfgj4' },
    { slide: 'feature-flags', text: 'Create a feature flag for my marketing team', videoId: '79pshye67k' },
]

// Helper component to use hooks for product data
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

export default function Home2() {
    const { siteSettings } = useApp()
    const videoRef = useRef<WistiaVideoRef>(null)
    const [activePromptIndex, setActivePromptIndex] = useState(0)

    // Derived state
    const currentPrompt = PROMPTS[activePromptIndex]
    const activeAccordion = currentPrompt.slide
    const currentVideoId = currentPrompt.videoId

    // Handle video end - advance to next prompt, loop at end
    const handleVideoEnd = () => {
        setActivePromptIndex((prev) => (prev + 1) % PROMPTS.length)
    }

    // Handle manual accordion change
    const handleAccordionChange = (value: string) => {
        if (!value) return // Ignore collapse
        const firstPromptIndex = PROMPTS.findIndex((p) => p.slide === value)
        if (firstPromptIndex !== -1) {
            setActivePromptIndex(firstPromptIndex)
        }
    }

    // Handle manual prompt click - restart video if clicking active prompt
    const handlePromptClick = (index: number) => {
        if (index === activePromptIndex) {
            videoRef.current?.time(0)
            videoRef.current?.play()
        } else {
            setActivePromptIndex(index)
        }
    }

    // Build prompts with global index
    const promptsWithIndex = PROMPTS.map((p, i) => ({ ...p, globalIndex: i }))

    // Build accordion items
    const accordionItems = [
        {
            handle: 'product_analytics',
            value: 'analytics',
        },
        {
            handle: 'feature_flags',
            value: 'feature-flags',
        },
    ].map(({ handle, value }) => {
        const slidePrompts = promptsWithIndex.filter((p) => p.slide === value)

        return {
            value,
            trigger: <ProductTrigger handle={handle} />,
            content: (
                <div className="flex flex-col gap-2">
                    {slidePrompts.map((prompt) => (
                        <OSButton
                            key={prompt.globalIndex}
                            size="md"
                            width="full"
                            align="left"
                            onClick={() => handlePromptClick(prompt.globalIndex)}
                            className={activePromptIndex === prompt.globalIndex ? 'bg-accent font-bold' : ''}
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
            <SEO
                title="Welcome to PostHog"
                description="PostHog is the only developer platform built to natively work with Session Replay, Feature Flags, Experiments, and Surveys."
                image={`/images/og/default.png`}
            />
            <Wizard
                leftNavigation={
                    <>
                        <CallToAction type="secondary" size="sm">
                            Previous
                        </CallToAction>
                    </>
                }
                rightNavigation={
                    <>
                        <OSButton asLink to="/demo" variant="primary" size="md" state={{ newWindow: true }}>
                            Watch a demo
                        </OSButton>
                    </>
                }
            >
                <ScrollArea className="flex-1 w-full [&>div>div]:h-full [&>div>div]:!flex [&>div>div]:flex-col [&>div>div]:py-4">
                    <div className="flex  gap-2">
                        <div>
                            <Logo className="inline-block" fill={siteSettings.theme === 'dark' ? 'white' : undefined} />
                            <h1>The AI platform for engineers</h1>
                            <p>Debug products. Ship features faster. With all user and product data in one stack.</p>

                            <Accordion
                                key={activeAccordion}
                                skin={false}
                                items={accordionItems}
                                defaultValue={activeAccordion}
                                onValueChange={handleAccordionChange}
                            />
                        </div>
                        <div>
                            <WistiaVideo
                                ref={videoRef}
                                videoId={currentVideoId}
                                onEnd={handleVideoEnd}
                                className="w-[500px]"
                            />
                        </div>
                    </div>
                </ScrollArea>
            </Wizard>
        </>
    )
}
