import React from 'react'
import { SectionComponentProps } from '../types'

const PostHogOnPostHog = ({ id, productData }: SectionComponentProps) => {
    const block = productData?.postHogOnPostHog
    if (!block?.benefits?.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="text-3xl font-bold text-primary mt-0 mb-3">{block.title || 'How PostHog uses PostHog'}</h2>
            {block.description && (
                <p className="text-base text-secondary leading-relaxed m-0 mb-4">{block.description}</p>
            )}
            <ul className="grid grid-cols-1 @md:grid-cols-2 gap-3 list-none m-0 p-0">
                {block.benefits.map((benefit: { title: string; description: string }) => (
                    <li
                        key={benefit.title}
                        className="m-0 p-3 border border-primary rounded bg-primary text-sm leading-relaxed"
                    >
                        <strong className="text-primary block mb-1">{benefit.title}</strong>
                        <span className="text-secondary">{benefit.description}</span>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default PostHogOnPostHog
