import React from 'react'
import { SectionComponentProps } from '../types'
import { SectionHeading } from '../helpers'

const Eli5 = ({ id, productData }: SectionComponentProps) => {
    const eli5 = productData?.overview?.eli5

    if (!eli5) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <SectionHeading>What does it do?</SectionHeading>
            {/* Capped to a readable measure – around 75 characters a line. The
                bullets used to sit in an 18rem column beside this copy, which
                held it to roughly this width; without them it would run the full
                container and hit 160+ characters a line on a wide monitor. */}
            <div className="max-w-3xl text-lg leading-relaxed [&>p]:m-0 [&>p+p]:mt-4">
                {typeof eli5 === 'string' ? <p>{eli5}</p> : eli5}
            </div>
        </section>
    )
}

export default Eli5
