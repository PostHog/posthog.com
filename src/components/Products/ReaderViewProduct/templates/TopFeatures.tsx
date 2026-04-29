import React from 'react'
import TabbedCarousel, { type TabbedCarouselTab } from 'components/TabbedCarousel'
import { SectionComponentProps } from '../types'
import CloudinaryImage from 'components/CloudinaryImage'
import Glow from 'components/Glow'
import { IconList, IconCode, IconRecord, IconSearch, IconExpand } from '@posthog/icons'
import { DebugContainerQuery } from 'components/DebugContainerQuery'

const TopFeatures = ({ id, productData }: SectionComponentProps) => {
    const { name, color, screenshots } = productData ?? {}

    // TODO: source from productData.topFeatures when generalizing this template across products.
    const featureTabs: TabbedCarouselTab[] = [
        {
            value: 'event-timeline',
            label: 'Event timeline',
            icon: <IconList className="size-5" />,
            content: (
                <div className="@container p-4 @2xl/reader-content:p-8 @4xl/reader-content:p-10">
                    {screenshots?.home?.src && (
                        <Glow
                            color={color}
                            intensity="soft"
                            className="rounded border border-secondary max-w-md @2xl:float-right @2xl:max-w-sm @3xl:max-w-md transition-all leading-[0] mb-4 @2xl:mb-0 @2xl:ml-4 @3xl:ml-8 @4xl/reader-content:ml-10"
                        >
                            <CloudinaryImage
                                src={screenshots.overview.src as `https://res.cloudinary.com/${string}`}
                                alt={screenshots.overview.alt || name}
                                className="w-full"
                                imgClassName="h-auto"
                            />
                        </Glow>
                    )}
                    <div className="text-base text-primary/90">
                        <h3 className="mb-4">Event timeline</h3>
                        <p>
                            Scrub through an activity log of a user's session to jump directly to parts you want to
                            watch. The timeline shows you a full list of autocapture events (like page views), custom
                            events, form interactions, and errors the user may have encountered during their session.
                        </p>
                        <ul className="space-y-4 mb-4">
                            <li>
                                <strong>Event properties</strong> show you the properties of the event, like the page
                                URL, the user's IP address, and the timestamp of the event.
                            </li>
                            <li>
                                <strong>Error details</strong> show you the details of the error, like the error
                                message, the stack trace, and the timestamp of the error. You can also see the full
                                request and response headers.
                            </li>
                            <li>
                                <strong>Web vitals</strong> lets you see performance metrics like FCP, LCP, INP, CLS,
                                and any other acronyms they might think up next.
                            </li>
                        </ul>
                        <p>
                            Click on any row to jump to that point in the session, or click the{' '}
                            <span className="inline-block">
                                <IconExpand className="size-5 inline-block" aria-label="Expand" /> icon
                            </span>{' '}
                            view the associated metadata.
                        </p>
                    </div>
                </div>
            ),
            color: 'bg-white',
            activeText: 'text-primary',
            progressBar: 'bg-yellow',
        },
        {
            value: 'technical-context',
            label: 'Technical context',
            icon: <IconCode className="size-5" />,
            content: <p className="p-4">add a placeholder</p>,
            color: 'bg-white',
            activeText: 'text-primary',
            progressBar: 'bg-green',
        },
        {
            value: 'recording-rules',
            label: 'Recording rules',
            icon: <IconRecord className="size-5" />,
            content: <p className="p-4">add a placeholder</p>,
            color: 'bg-white',
            activeText: 'text-primary',
            progressBar: 'bg-blue',
        },
        {
            value: 'find-behavior',
            label: 'Find behavior',
            icon: <IconSearch className="size-5" />,
            content: <p className="p-4">add a placeholder</p>,
            color: 'bg-white',
            activeText: 'text-primary',
            progressBar: 'bg-purple',
        },
    ]

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-8">Top features</h2>
            <TabbedCarousel
                tabs={featureTabs}
                slideDuration={6000}
                showActiveBg={false}
                slideClassName="!min-h-0 !p-0 !rounded"
                className="mt-4 mb-12"
            />
        </section>
    )
}

export default TopFeatures
