import React from 'react'
import TabbedCarousel from 'components/TabbedCarousel'
import CarouselSlide from '../CarouselSlide'
import type { CarouselSlide as CarouselSlideType, SectionComponentProps } from '../types'

interface ApplicationsProps extends SectionComponentProps {
    slides?: CarouselSlideType[]
}

const Applications = ({ id, productData, slides = [] }: ApplicationsProps) => {
    if (!slides.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-8">How do I use it?</h2>
            <p>There are a few ways to explore {productData.name}.</p>
            <TabbedCarousel
                tabs={slides.map((s) => ({
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

export default Applications
