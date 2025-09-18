import React from 'react'

interface HowWeUseItSlideProps {
    title?: string
    description?: string
    videoUrl?: string
    videoTitle?: string
}

export default function HowWeUseItSlide({
    title = 'So good we use it ourselves',
    description = 'See how our own teams use feature flags to ship faster.',
    videoUrl = 'https://www.youtube-nocookie.com/embed/j0XoWfUxqe0',
    videoTitle = 'How PostHog uses feature flags',
}: HowWeUseItSlideProps) {
    return (
        <div className="max-w-7xl mx-auto px-5 py-20">
            <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl mb-4">{title}</h2>
                <p className="text-xl text-muted max-w-3xl mx-auto">{description}</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Video - 50% width on large screens */}
                <div className="w-full lg:w-1/2">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-2xl"
                            src={videoUrl}
                            title={videoTitle}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>

                {/* Text content - 50% width on large screens */}
                <div className="w-full lg:w-1/2">
                    <div className="prose prose-lg max-w-none">
                        <h3 className="text-2xl font-bold mb-4">We use feature flags internally to do things like:</h3>
                        <ul className="space-y-3 text-lg">
                            <li>
                                <strong>Test new ideas</strong> with beta cohorts or random sampling
                            </li>
                            <li>
                                <strong>Create killswitches</strong> with always-on flags we can turn off instantly
                            </li>
                            <li>
                                <strong>Stagger roll-outs</strong> just so we don't break everything at once
                            </li>
                            <li>
                                <strong>Run simple experiments</strong> to see what works best
                            </li>
                            <li>
                                <strong>Control user access</strong> by using flags as permissions
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
