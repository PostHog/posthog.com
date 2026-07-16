import React from 'react'
import { faqs } from '../../../pages-content/pricing-data'

export const FAQs = ({ className = '' }) => {
    return (
        <section className={className}>
            {faqs.map(({ q, a }, index) => (
                <details key={index}>
                    <summary>{q}</summary>
                    {a}
                </details>
            ))}
        </section>
    )
}
