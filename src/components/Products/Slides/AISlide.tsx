import React from 'react'
import Link from 'components/Link'
import CloudinaryImage from 'components/CloudinaryImage'

type CloudinaryImageSrc = `https://res.cloudinary.com/${string}`

const DEFAULT_SLIDE_IMAGE: CloudinaryImageSrc =
    'https://res.cloudinary.com/dmukukwp6/image/upload/posthog_ai_hogs_d4c45b4550.png'

interface AISlideProductAi {
    title?: string
    description?: string
    skills?: string[]
    prompts?: string[]
    /** Full image URL for this product's AI slide. Omit to use default PostHog AI art. */
    image?: string
    imageAlt?: string
    imageClasses?: string
}

interface AISlideProps {
    ai?: AISlideProductAi
    productName: string
}

export default function AISlide({ ai, productName }: AISlideProps) {
    const slideImage = (
        typeof ai?.image === 'string' && ai.image.trim() !== '' ? ai.image.trim() : DEFAULT_SLIDE_IMAGE
    ) as CloudinaryImageSrc
    const slideAlt = typeof ai?.imageAlt === 'string' && ai.imageAlt.trim() !== '' ? ai.imageAlt.trim() : 'PostHog AI'

    return (
        <div className="bg-[#b8e0d8] h-full p-8 flex flex-col justify-center bg-ai">
            <div className="bg-white/80 backdrop-blur-lg h-full rounded-lg shadow-2xl flex flex-col gap-8 @2xl:flex-row @2xl:items-center @2xl:gap-12 p-8">
                <div className="flex-1 prose">
                    <h2 className="text-5xl font-bold text-primary mb-4">
                        {ai?.title || 'PostHog AI does ' + productName.toLowerCase() + '.'}
                    </h2>
                    <p className="text-2xl text-secondary mx-auto">
                        Our{' '}
                        <Link to="/ai" className="font-semibold underline" state={{ newWindow: true }}>
                            AI-powered product assistant
                        </Link>{' '}
                        can help you {ai?.description || 'work with ' + productName + ' more efficiently'}.
                    </p>
                    <h3 className="text-2xl mt-4">Skills</h3>
                    <ul>
                        {ai?.skills?.map((skill: string) => (
                            <li key={skill} className="text-xl">
                                {skill}
                            </li>
                        ))}
                    </ul>
                    <h3 className="text-2xl mt-4">Example prompts</h3>
                    <ul>
                        {ai?.prompts?.map((prompt: string) => (
                            <li key={prompt} className="text-xl">
                                "{prompt}"
                            </li>
                        ))}
                    </ul>
                </div>
                <aside className="text-center flex justify-center @2xl:shrink-0">
                    <CloudinaryImage
                        src={slideImage}
                        alt={slideAlt}
                        className="max-w-[400px]"
                        imgClassName={ai?.imageClasses}
                    />
                </aside>
            </div>
        </div>
    )
}
