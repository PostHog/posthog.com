import React from 'react'
import type { SectionComponentProps } from 'components/Products/ReaderViewProduct/types'

interface PlaceholderProps extends SectionComponentProps {
    title?: string
    note?: string
}

// Generic "coming soon" section – used for pricing surfaces that don't have
// real data yet (TL;DR, plans, calculator, feature comparison).
const PlaceholderSection = ({ id, title = 'Coming soon', note = 'Content coming soon.' }: PlaceholderProps) => (
    <section id={id} className="scroll-mt-20 not-prose">
        <h2 className="text-2xl mb-3">{title}</h2>
        <p className="text-secondary">{note}</p>
    </section>
)

export default PlaceholderSection
