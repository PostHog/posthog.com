import React, { useState, useEffect, useRef } from 'react'
import { Select } from '../RadixUI/Select'
import HeaderBar from 'components/OSChrome/HeaderBar'
import { navigate } from 'gatsby'
import { useLocation } from '@reach/router'
import { DebugContainerQuery } from 'components/DebugContainerQuery'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { productMenu } from '../../navs'
import { Accordion } from '../RadixUI/Accordion'
import { ToggleGroup, ToggleOption } from 'components/RadixUI/ToggleGroup'
import { IconInfo, IconGear } from '@posthog/icons'
import ProductSidebar from 'components/Explorer/ProductSidebar'
import PresentationMode from './FullScreen'
import { CallToAction } from 'components/CallToAction'

interface AccordionItem {
    title: string
    content: React.ReactNode
}

interface PresentationProps {
    template: 'generic' | 'product' | 'feature'
    slug: string
    title: string
    accentImage?: React.ReactNode
    sidebarContent?: React.ReactNode | AccordionItem[] | ((activeSlideIndex: number) => React.ReactNode)
    children?: React.ReactNode
    fullScreen?: boolean
    slides?: Array<{
        name: string
        content: React.ReactNode
        rawContent?: React.ReactNode
        thumbnailContent?: React.ReactNode
    }>
}

const SidebarContent = ({
    content,
    activeSlideIndex,
}: {
    content: React.ReactNode | AccordionItem[] | ((activeSlideIndex: number) => React.ReactNode)
    activeSlideIndex: number
}): React.ReactElement | null => {
    if (!content) return null

    if (typeof content === 'function') {
        return <>{content(activeSlideIndex)}</>
    }

    if (Array.isArray(content)) {
        return (
            <>
                {content.map((item, index) => (
                    <Accordion
                        key={index}
                        data-scheme="primary"
                        className=""
                        defaultValue="item-0"
                        items={[
                            {
                                trigger: item.title,
                                content: item.content,
                            },
                        ]}
                    />
                ))}
            </>
        )
    }

    return <>{content}</>
}

const sidebarTabOptions: ToggleOption[] = [
    {
        label: 'Info',
        value: 'info',
        icon: <IconInfo className="size-5" />,
        default: true,
    },
    {
        label: 'Settings',
        value: 'settings',
        icon: <IconGear className="size-5" />,
    },
]

export default function Presentation({
    template,
    slug,
    title,
    accentImage,
    sidebarContent,
    children,
    fullScreen = false,
    slides = [],
}: PresentationProps) {
    const location = useLocation()
    const currentPath = location.pathname.replace(/^\//, '') // Remove leading slash
    const [sidebarTab, setSidebarTab] = useState<string>('info')
    const [isNavVisible, setIsNavVisible] = useState<boolean>(true)
    const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false)
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)
    const observerRef = useRef<IntersectionObserver | null>(null)

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible)
    }

    // Set up scroll-based detection to track active slide
    useEffect(() => {
        if (slides.length === 0) return

        const scrollContainer = document.querySelector('[data-app="Presentation"] [data-radix-scroll-area-viewport]')
        if (!scrollContainer) return

        const handleScroll = () => {
            const containerRect = scrollContainer.getBoundingClientRect()
            const containerTop = containerRect.top
            const containerBottom = containerRect.bottom

            let bestSlideIndex = 0
            let maxVisibleArea = 0

            // Check each slide to find which has the most visible area
            const slideElements = document.querySelectorAll('[data-slide]')
            slideElements.forEach((slideElement, index) => {
                const slideRect = slideElement.getBoundingClientRect()

                // Calculate visible area of this slide
                const visibleTop = Math.max(slideRect.top, containerTop)
                const visibleBottom = Math.min(slideRect.bottom, containerBottom)
                const visibleHeight = Math.max(0, visibleBottom - visibleTop)
                const visibleArea = visibleHeight * slideRect.width

                // If this slide has more visible area, it should be active
                if (visibleArea > maxVisibleArea) {
                    maxVisibleArea = visibleArea
                    bestSlideIndex = index
                }
            })

            setActiveSlideIndex(bestSlideIndex)
        }

        // Initial check
        handleScroll()

        // Listen for scroll events
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            scrollContainer.removeEventListener('scroll', handleScroll)
        }
    }, [slides.length])

    const enterPresentationMode = () => {
        // Use the currently active slide index instead of searching for visible slide
        if (slides.length > 0) {
            setCurrentSlideIndex(activeSlideIndex)
        }
        setIsPresentationMode(true)
    }

    const exitPresentationMode = () => {
        setIsPresentationMode(false)
    }

    return (
        <>
            <div className="@container w-full h-full flex flex-col min-h-1">
                <div
                    data-scheme="secondary"
                    className={`flex flex-grow min-h-0 ${fullScreen ? 'border-t border-primary' : ''}`}
                >
                    {sidebarContent && (
                        <aside
                            data-scheme="secondary"
                            className={`${
                                isNavVisible ? 'w-48' : 'w-0'
                            } transition-all duration-300 bg-primary border-r border-primary h-full overflow-hidden`}
                        >
                            <ScrollArea className="p-2">
                                <div className="space-y-3">
                                    <SidebarContent content={sidebarContent} activeSlideIndex={activeSlideIndex} />
                                </div>
                            </ScrollArea>
                        </aside>
                    )}
                    <main
                        data-app="Presentation"
                        data-scheme="secondary"
                        className="@container flex-1 flex flex-col bg-primary relative h-full"
                    >
                        {!fullScreen && (
                            <>
                                <HeaderBar
                                    showSidebar
                                    showSearch
                                    isNavVisible={isNavVisible}
                                    onToggleNav={toggleNav}
                                    showFullScreen
                                    onFullScreenClick={slides.length > 0 ? enterPresentationMode : undefined}
                                />
                            </>
                        )}
                        {fullScreen ? (
                            children
                        ) : (
                            <div className="min-h-0">
                                <ScrollArea className="h-full flex-1 border-t  border-primary">
                                    {/* <DebugContainerQuery /> */}
                                    {accentImage && (
                                        <div className="absolute right-0 top-6">
                                            <div className="relative max-w-md @4xl:max-w-lg @5xl:max-w-xl @6xl:max-w-2xl transition-all duration-700 ease-out opacity-25 @xl:opacity-50">
                                                {accentImage}
                                                <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-[var(--bg)] to-[color-mix(in_srgb,var(--bg)_0%,transparent)]" />
                                                <div className="absolute bottom-0 left-0 h-1/2 w-full bg-gradient-to-b from-[color-mix(in_srgb,var(--bg)_0%,transparent)] to-[var(--bg)]" />
                                            </div>
                                        </div>
                                    )}
                                    <div className="relative">{children}</div>
                                </ScrollArea>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* Presentation Mode Portal - renders outside AppWindow */}
            {isPresentationMode && slides.length > 0 && (
                <PresentationMode slides={slides} onExit={exitPresentationMode} initialSlideIndex={currentSlideIndex} />
            )}
        </>
    )
}
