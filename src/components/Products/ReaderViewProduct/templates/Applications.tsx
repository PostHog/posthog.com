import React from 'react'
import { SectionComponentProps } from '../types'

const Applications = ({ id }: SectionComponentProps) => {
    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-8">How do I use it?</h2>
            <p>add a placeholder</p>
        </section>
    )
}

export default Applications
