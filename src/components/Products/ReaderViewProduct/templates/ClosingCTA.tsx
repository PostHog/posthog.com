import React from 'react'
import { CTAs } from 'components/CTAs'
import type { SectionComponentProps } from '../types'
import { SECTION_H2 } from '../helpers'

/**
 * The closing sign-up block. Reads `productData.closingCTA`: `title`,
 * `description`, an optional `footer` line under the buttons, and an optional `Hog`.
 */
const ClosingCTA = ({ id, productData }: SectionComponentProps) => {
    const cta = productData?.closingCTA
    if (!cta) return null

    const Hog = cta.Hog

    return (
        <section
            id={id}
            className="scroll-mt-20 not-prose border-2 border-yellow rounded-md bg-yellow/10 p-5 @xl/reader-content:p-8 @xl/reader-content:py-10"
        >
            <div className="grid grid-cols-1 @3xl/reader-content:grid-cols-[minmax(0,1fr)_14rem] gap-6 items-center">
                <div>
                    <h2 className={`${SECTION_H2} @xl/reader-content:!text-4xl`}>{cta.title}</h2>
                    <p className="text-lg text-secondary leading-relaxed m-0 mb-6 max-w-prose">{cta.description}</p>
                    <CTAs wizardCommand={productData?.wizardCommand} links={[]} />
                    {cta.footer && <p className="text-sm text-secondary leading-relaxed m-0 mt-5">{cta.footer}</p>}
                </div>
                {Hog && <Hog className="hidden @3xl/reader-content:block h-auto w-full" />}
            </div>
        </section>
    )
}

export default ClosingCTA
