import React from 'react'
import TabbedCarousel, { type TabbedCarouselTab } from 'components/TabbedCarousel'
import { SectionComponentProps } from '../types'

// TODO: source from productData.topFeatures when generalizing this template across products.
const featureTabs: TabbedCarouselTab[] = [
    {
        value: 'event-timeline',
        label: 'Event timeline',
        content: <p className="p-4">Find the exact moment you're looking for.</p>,
        color: 'bg-yellow',
        activeText: 'text-primary',
        progressBar: 'bg-yellow',
    },
    {
        value: 'selective-recording',
        label: 'Selective recording',
        content: <p className="p-4">add a placeholder</p>,
        color: 'bg-blue',
        activeText: 'text-primary',
        progressBar: 'bg-blue',
    },
    {
        value: 'debug-info',
        label: 'Debug info',
        content: <p className="p-4">add a placeholder</p>,
        color: 'bg-green',
        activeText: 'text-primary',
        progressBar: 'bg-green',
    },
    {
        value: 'find-behavior',
        label: 'Find behavior',
        content: <p className="p-4">add a placeholder</p>,
        color: 'bg-purple',
        activeText: 'text-primary',
        progressBar: 'bg-purple',
    },
]

const TopFeatures = ({ id }: SectionComponentProps) => {
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
