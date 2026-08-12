import React from 'react'
import TabbedCarousel from 'components/TabbedCarousel'
import CarouselSlide from 'components/Products/ReaderViewProduct/CarouselSlide'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'
import { applications } from 'hooks/productData/replay_vision/slides'

// "How do I use it?" – renders the applications carousel in the shared
// TabbedCarousel format (same primitives as the Applications template), with
// Replay Vision's own heading and intro copy.
const HowToUseSection = ({ id, productData }: SectionComponentProps) => {
    if (!applications.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-3">How do I use it?</h2>
            <p>There are a few ways to put Replay Vision to work.</p>
            <TabbedCarousel
                tabs={applications.map((s) => ({
                    value: s.slug,
                    label: s.label,
                    icon: s.icon,
                    color: s.color,
                    activeText: s.activeText,
                    progressBar: s.progressBar,
                    content: <CarouselSlide slide={s} productData={productData} />,
                }))}
                slideDuration={6000}
                showActiveBg={false}
                slideClassName="!min-h-0 !p-0 !rounded"
                className="mt-4 mb-12"
            />
        </section>
    )
}

export default HowToUseSection
