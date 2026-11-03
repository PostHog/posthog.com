import React from 'react'
import TabbedCarousel from 'components/TabbedCarousel'
import CarouselSlide from '../CarouselSlide'
import { SECTION_H2 } from '../helpers'
import type { CarouselSlide as CarouselSlideType, SectionComponentProps } from '../types'

interface KeyFeaturesProps extends SectionComponentProps {
    slides?: CarouselSlideType[]
}

const KeyFeatures = ({ id, productData, slides = [] }: KeyFeaturesProps) => {
    if (!slides.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className={SECTION_H2}>Key features</h2>
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

export default KeyFeatures
