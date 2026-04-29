import React from 'react'
import TabbedCarousel, { type TabbedCarouselTab } from 'components/TabbedCarousel'
import { IconTarget, IconBolt, IconCoffee } from '@posthog/icons'
import { SectionComponentProps } from '../types'
import CloudinaryImage from 'components/CloudinaryImage'
import { useApp } from '../../../../context/App'

const Applications = ({ id, productData }: SectionComponentProps) => {
    const { name, screenshots } = productData ?? {}
    const { siteSettings } = useApp()
    const isDark = siteSettings.theme === 'dark'

    // TODO: source from productData.applications when generalizing this template across products.
    const applicationTabs: TabbedCarouselTab[] = [
        {
            value: 'filter',
            label: 'Find something specific',
            icon: <IconTarget className="size-5" />,
            content: (
                <div className="text-base text-primary/90">
                    <div className="p-4 @2xl/reader-content:p-8">
                        <h3 className="mb-2">Find something specific</h3>
                        <p className="mb-0">
                            You can search by a user's info like email address, location, or organization.
                        </p>
                    </div>
                    <div className="bg-tan dark:bg-dark p-4 border-t border-primary">
                        <CloudinaryImage
                            src={
                                isDark && screenshots.filters.srcDark
                                    ? screenshots.filters.srcDark
                                    : (screenshots.filters.src as any)
                            }
                            alt={screenshots.filters.alt || name}
                            className="w-full @2xl/reader-content:max-w-3xl"
                            imgClassName="h-auto border border-secondary rounded-md"
                        />
                    </div>
                </div>
            ),
            color: 'bg-white dark:bg-dark',
            activeText: 'text-primary',
            progressBar: 'bg-blue',
        },
        {
            value: 'research',
            label: 'Automate analysis',
            icon: <IconBolt className="size-5" />,
            content: (
                <div className="text-base text-primary/90">
                    <div className="p-4 @2xl/reader-content:p-8">
                        <h3 className="mb-2">Building and want to ask questions about data?</h3>
                        <p className="mb-0">
                            Ask PostHog AI (also available with our MCP) and it'll return specific answers based on
                            replay data.
                        </p>
                    </div>
                    <div className="bg-tan dark:bg-dark p-4 border-t border-primary">
                        <CloudinaryImage
                            src={
                                isDark && screenshots.chat.srcDark
                                    ? screenshots.chat.srcDark
                                    : (screenshots.chat.src as any)
                            }
                            alt={screenshots.chat.alt || name}
                            className="w-full @2xl/reader-content:max-w-3xl"
                            imgClassName="h-auto"
                        />
                    </div>
                </div>
            ),
            color: 'bg-white dark:bg-dark',
            activeText: 'text-primary',
            progressBar: 'bg-purple',
        },
        {
            value: 'explore',
            label: 'Just want to explore?',
            icon: <IconCoffee className="size-5" />,
            content: (
                <div className="text-base text-primary/90">
                    <div className="p-4 @2xl/reader-content:p-8">
                        <h3 className="mb-2">Just want to explore?</h3>
                        <p className="mb-0">
                            Crack open the Session Replay app and you'll see a list of recent sessions. Click through
                            them like you're watching TV. Scrub around to look for interesting points in the timeline.
                        </p>
                    </div>
                    <div className="bg-tan dark:bg-dark pt-4 px-4 border-t border-primary leading-[0]">
                        <CloudinaryImage
                            src={
                                isDark && screenshots.recordings.srcDark
                                    ? screenshots.recordings.srcDark
                                    : (screenshots.recordings.src as any)
                            }
                            alt={screenshots.recordings.alt || name}
                            className="w-full"
                            imgClassName="h-auto border-t border-x border-secondary rounded-t-md"
                        />
                    </div>
                </div>
            ),
            color: 'bg-white dark:bg-dark',
            activeText: 'text-primary',
            progressBar: 'bg-yellow',
        },
    ]

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-8">How do I use it?</h2>
            <p>There are a few ways to access session recordings.</p>
            <TabbedCarousel
                tabs={applicationTabs}
                slideDuration={6000}
                showActiveBg={false}
                slideClassName="!min-h-0 !p-0 !rounded"
                className="mt-4 mb-12"
            />
        </section>
    )
}

export default Applications
