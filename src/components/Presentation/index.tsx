import React, { useState, useEffect, useRef, useMemo } from 'react'
import HeaderBar from 'components/OSChrome/HeaderBar'
import ScrollArea from 'components/RadixUI/ScrollArea'
import { Accordion } from '../RadixUI/Accordion'
import { ToggleOption } from 'components/RadixUI/ToggleGroup'
import { IconInfo, IconGear } from '@posthog/icons'
import PresentationMode from './FullScreen'
import { motion } from 'framer-motion'
import { navigate } from 'gatsby'
import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'

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
        slug: string
        content: React.ReactNode
        rawContent?: React.ReactNode
        thumbnailContent?: React.ReactNode
    }>
    slideId?: string
    presenterNotes?: Record<string, string>
}

const SidebarContent = ({
    content,
    activeSlideIndex,
    onClick,
}: {
    content: React.ReactNode | AccordionItem[] | ((activeSlideIndex: number, onClick?: () => void) => React.ReactNode)
    activeSlideIndex: number
    onClick?: () => void
}): React.ReactElement | null => {
    if (!content) return null

    if (typeof content === 'function') {
        return <>{content(activeSlideIndex, onClick)}</>
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

export const getIsMobile = (siteSettings: any, appWindow: any) => {
    const width =
        typeof window !== 'undefined' && siteSettings.experience === 'boring'
            ? window.innerWidth
            : appWindow?.size?.width
    return width < 672
}

export default function Presentation({
    accentImage,
    sidebarContent,
    children,
    fullScreen = false,
    slides = [],
    slideId,
    presenterNotes,
}: PresentationProps) {
    const { siteSettings, websiteMode } = useApp()
    const { appWindow } = useWindow()
    const [isMobile, setIsMobile] = useState<boolean>(getIsMobile(siteSettings, appWindow))
    const [isNavVisible, setIsNavVisible] = useState<boolean>(!isMobile)
    const [isPresentationMode, setIsPresentationMode] = useState<boolean>(false)
    const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0)
    const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true)
    const [drawerHeight, setDrawerHeight] = useState<number>(90)
    const [lastOpenHeight, setLastOpenHeight] = useState<number>(90)
    const [isDragging, setIsDragging] = useState<boolean>(false)
    const [dragStartHeight, setDragStartHeight] = useState<number>(0)
    const containerRef = useRef<HTMLDivElement>(null)

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible)
    }

    const toggleDrawer = () => {
        if (isDrawerOpen) {
            // Closing: save current height (only if it's reasonable)
            if (drawerHeight >= 10) {
                setLastOpenHeight(drawerHeight)
            }
            setIsDrawerOpen(false)
        } else {
            // Opening: restore last height, but ensure it's reasonable
            const heightToRestore = lastOpenHeight >= 25 ? lastOpenHeight : 90
            setDrawerHeight(heightToRestore)
            setIsDrawerOpen(true)
        }
    }

    const handleVerticalDrag = (_event: any, info: any) => {
        if (!containerRef.current || !isDrawerOpen) return
        const containerHeight = containerRef.current.getBoundingClientRect().height
        const newDrawerHeight = Math.min(Math.max(dragStartHeight - info.offset.y, 0), 300)
        setDrawerHeight(newDrawerHeight)

        // Update lastOpenHeight for reasonable heights only
        if (newDrawerHeight >= 10) {
            setLastOpenHeight(newDrawerHeight)
        }
    }

    const currentSlideNotes = useMemo(() => {
        if (!presenterNotes || !slides || slides.length === 0) return ''
        const currentSlide = slides[activeSlideIndex]
        if (!currentSlide) return ''
        return presenterNotes[currentSlide.slug] || ''
    }, [presenterNotes, slides, activeSlideIndex])

    //// Handle initial hash navigation on page load
    // useEffect(() => {
    //     if (slides.length === 0) return

    //     const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : ''
    //     if (hash) {
    //         const slideIndex = slides.findIndex((slide) => slide.slug === hash)
    //         if (slideIndex !== -1) {
    //             // Small delay to ensure DOM is ready
    //             setTimeout(() => {
    //                 const slideSelector = slideId
    //                     ? `[data-slide-id="${slideId}"][data-slide="${slideIndex}"]`
    //                     : `[data-slide="${slideIndex}"]`
    //                 const slideElement = document.querySelector(slideSelector)

    //                 if (slideElement) {
    //                     slideElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
    //                 }
    //             }, 100)
    //         }
    //     }
    // }, [slides, slideId])

    // // Update URL hash when active slide changes
    // useEffect(() => {
    //     if (slides.length === 0) return

    //     const currentSlide = slides[activeSlideIndex]
    //     if (!currentSlide) return

    //     // Don't add hash for overview slide (first slide)
    //     if (activeSlideIndex === 0 || currentSlide.slug === 'overview') {
    //         if (typeof window !== 'undefined' && window.location.hash) {
    //             navigate(window.location.pathname, { replace: true })
    //         }
    //     } else {
    //         if (typeof window !== 'undefined') {
    //             const newHash = `#${currentSlide.slug}`
    //             if (window.location.hash !== newHash) {
    //                 navigate(`${window.location.pathname}${newHash}`, { replace: true })
    //             }
    //         }
    //     }
    // }, [activeSlideIndex, slides])

    // Set up scroll-based detection to track active slide
    useEffect(() => {
        if (slides.length === 0) return

        const scrollContainerSelector = slideId
            ? `[data-presentation-id="${slideId}"] [data-radix-scroll-area-viewport]`
            : '[data-app="Presentation"] [data-radix-scroll-area-viewport]'
        const scrollContainer = document.querySelector(scrollContainerSelector)
        if (!scrollContainer) return

        const handleScroll = () => {
            const containerRect = scrollContainer.getBoundingClientRect()
            const containerTop = containerRect.top
            const containerBottom = containerRect.bottom

            let bestSlideIndex = 0
            let maxVisibleArea = 0

            // Check each slide to find which has the most visible area
            const slideSelector = slideId ? `[data-slide-id="${slideId}"][data-slide]` : '[data-slide]'
            const slideElements = document.querySelectorAll(slideSelector)
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
    }, [slides.length, slideId])

    useEffect(() => {
        const handleResize = () => {
            const mobile = getIsMobile(siteSettings, appWindow)
            setIsMobile(mobile)
        }
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [appWindow, siteSettings])

    useEffect(() => {
        setIsNavVisible(!isMobile)
    }, [isMobile])

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
            <div
                ref={containerRef}
                data-scheme="secondary"
                className={`@container w-full transition-all duration-300 h-full flex flex-col min-h-1 ${
                    websiteMode ? 'max-w-7xl border-x border-primary mx-auto' : 'max-w-full'
                }`}
            >
                <div
                    data-scheme="secondary"
                    className={`flex flex-grow min-h-0 ${fullScreen ? 'border-t border-primary' : ''}`}
                >
                    {sidebarContent && (
                        <motion.aside
                            animate={
                                isMobile
                                    ? {
                                          height: isNavVisible ? 'auto' : 0,
                                          width: '100%',
                                      }
                                    : { width: isNavVisible ? 192 : 0, height: '100%' }
                            }
                            transition={{ duration: 0.3 }}
                            data-scheme="secondary"
                            className={`bg-primary @2xl:border-y-0 border-y ${
                                isNavVisible ? '@2xl:border-r' : 'border-b-0'
                            } border-primary overflow-hidden absolute z-10 @2xl:relative @2xl:translate-y-0 translate-y-[46px]`}
                        >
                            <ScrollArea className="p-2">
                                <div className="space-y-3">
                                    <SidebarContent
                                        content={sidebarContent}
                                        activeSlideIndex={activeSlideIndex}
                                        onClick={() => {
                                            if (isMobile) {
                                                toggleNav()
                                            }
                                        }}
                                    />
                                </div>
                            </ScrollArea>
                        </motion.aside>
                    )}
                    <main
                        data-app="Presentation"
                        data-presentation-id={slideId}
                        data-scheme="secondary"
                        className="@container flex-1 flex flex-col bg-primary relative h-full"
                    >
                        {!fullScreen && (
                            <>
                                <HeaderBar
                                    hasLeftSidebar={sidebarContent ? { enabled: true, alwaysShow: true } : false}
                                    showSidebar
                                    showSearch
                                    isNavVisible={isNavVisible}
                                    onToggleNav={toggleNav}
                                    showFullScreen
                                    showDrawerToggle
                                    isDrawerOpen={isDrawerOpen}
                                    onToggleDrawer={toggleDrawer}
                                    exportToPdf
                                    slideId={slideId}
                                    onFullScreenClick={slides.length > 0 ? enterPresentationMode : undefined}
                                    navIconClassName={isMobile ? 'rotate-90' : ''}
                                />
                            </>
                        )}
                        {fullScreen ? (
                            children
                        ) : (
                            <>
                                <div className="min-h-0 flex-1">
                                    <ScrollArea className="h-full flex-1 border-t border-primary">
                                        <div className="relative">{children}</div>
                                    </ScrollArea>
                                </div>
                                <div
                                    data-scheme="primary"
                                    className={`flex-none relative bg-primary border-t border-primary overflow-hidden ${
                                        !isDragging ? 'transition-all duration-200 ease-out' : ''
                                    }`}
                                    style={{
                                        height: isDrawerOpen ? drawerHeight : 0,
                                        maxHeight: 300,
                                        minHeight: 0,
                                    }}
                                >
                                    <motion.div
                                        data-scheme="tertiary"
                                        className={`h-1.5 top-0 left-0 !transform-none absolute z-20 w-full ${
                                            isDrawerOpen
                                                ? 'cursor-ns-resize hover:bg-accent active:bg-accent'
                                                : 'pointer-events-none'
                                        }`}
                                        drag={isDrawerOpen ? 'y' : false}
                                        dragMomentum={false}
                                        dragConstraints={{ top: 0, bottom: 0 }}
                                        onDragStart={() => {
                                            if (isDrawerOpen) {
                                                setIsDragging(true)
                                                setDragStartHeight(drawerHeight)
                                            }
                                        }}
                                        onDragEnd={() => {
                                            setIsDragging(false)
                                            // Auto-close if dragged to near-zero height
                                            if (drawerHeight <= 5) {
                                                setIsDrawerOpen(false)
                                                // Ensure we have a reasonable height for reopening
                                                if (lastOpenHeight < 10) {
                                                    setLastOpenHeight(90)
                                                }
                                            }
                                        }}
                                        onDrag={handleVerticalDrag}
                                    />
                                    <ScrollArea className="h-full">
                                        <div className="p-4 text-sm prose dark:prose-invert prose-sm">
                                            {currentSlideNotes ? (
                                                typeof currentSlideNotes === 'string' ? (
                                                    <div dangerouslySetInnerHTML={{ __html: currentSlideNotes }} />
                                                ) : (
                                                    currentSlideNotes
                                                )
                                            ) : (
                                                <div className="text-secondary">No presenter notes for this slide.</div>
                                            )}
                                        </div>
                                    </ScrollArea>
                                </div>
                            </>
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
