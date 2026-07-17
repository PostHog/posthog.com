import React from 'react'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'
import { SectionComponentProps } from '../types'

const DEFAULT_IMAGE = 'https://res.cloudinary.com/dmukukwp6/image/upload/posthog_ai_hogs_d4c45b4550.png'

const AI = ({ id, productData }: SectionComponentProps) => {
    const { name, ai } = productData ?? {}
    if (!ai) return null

    const productNameLower = String(name || 'this product').toLowerCase()
    const image = (
        ai.image && ai.image.trim() !== '' ? ai.image : DEFAULT_IMAGE
    ) as `https://res.cloudinary.com/${string}`
    const imageAlt = ai.imageAlt && ai.imageAlt.trim() !== '' ? ai.imageAlt : 'PostHog AI'

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <div className="bg-accent rounded p-5 flex flex-col @2xl:flex-row gap-6 items-start">
                <div className="flex-1 min-w-0">
                    <h2 className="text-3xl font-bold text-primary mt-0 mb-3">
                        {ai.title || `PostHog AI does ${productNameLower}.`}
                    </h2>
                    <p className="text-base text-secondary leading-relaxed m-0 mb-4">
                        Our{' '}
                        <Link to="/ai" state={{ newWindow: true }} className="font-semibold underline">
                            AI-powered product assistant
                        </Link>{' '}
                        can help you {ai.description || `work with ${name} more efficiently`}.
                    </p>

                    {ai.skills && ai.skills.length > 0 && (
                        <>
                            <h3 className="text-base font-semibold text-primary mt-4 mb-2">Skills</h3>
                            <ul className="list-disc pl-5 m-0 text-sm text-secondary leading-relaxed">
                                {ai.skills.map((skill: string) => (
                                    <li key={skill}>{skill}</li>
                                ))}
                            </ul>
                        </>
                    )}

                    {ai.prompts && ai.prompts.length > 0 && (
                        <>
                            <h3 className="text-base font-semibold text-primary mt-4 mb-2">Example prompts</h3>
                            <ul className="list-disc pl-5 m-0 text-sm text-secondary italic leading-relaxed">
                                {ai.prompts.map((prompt: string) => (
                                    <li key={prompt}>"{prompt}"</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
                <aside className="w-full @2xl:w-64 shrink-0 text-center">
                    <CloudinaryImage
                        src={image}
                        alt={imageAlt}
                        className="w-full max-w-[240px] mx-auto"
                        imgClassName="h-auto w-full object-contain"
                    />
                    <p className="text-xs text-secondary mt-3 m-0">
                        Looking for PostHog MCP?{' '}
                        <Link to="/docs/model-context-protocol" state={{ newWindow: true }} className="underline">
                            Read about it
                        </Link>
                    </p>
                </aside>
            </div>
        </section>
    )
}

export default AI
