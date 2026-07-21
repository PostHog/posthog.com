import React from 'react'
import { faqs } from '../../../pages-content/pricing-data'
import { Accordion } from '../../RadixUI/Accordion'

export const FAQs = ({ className = '' }) => {
    return (
        <section className={className}>
            <Accordion
                items={faqs.map(({ q, a }) => ({
                    trigger: q,
                    content: a,
                }))}
            />
        </section>
    )
}
