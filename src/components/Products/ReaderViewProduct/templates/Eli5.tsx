import React from 'react'
import { SectionComponentProps } from '../types'

const Eli5 = ({ id, productData }: SectionComponentProps) => {
    const eli5 = productData?.overview?.eli5

    if (!eli5) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-8">What does it do?</h2>
            <p>{eli5}</p>
        </section>
    )
}

export default Eli5
