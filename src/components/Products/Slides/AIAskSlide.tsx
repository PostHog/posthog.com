import React from 'react'
import OSButton from 'components/OSButton'
import CloudinaryImage from 'components/CloudinaryImage'

interface AIAskSlideProps {
    productName?: string
}

// AI model configurations with proper links
const aiModels = [
    {
        name: 'ChatGPT',
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
        ),
        url: 'https://chatgpt.com/?prompt=tell+me+why+posthog+ai+is+a+great+choice+for+me',
    },
    {
        name: 'Claude',
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
        ),
        url: 'https://claude.ai/new?q=tell+me+why+posthog+ai+is+a+great+choice+for+me',
    },
    {
        name: 'Perplexity',
        icon: (
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
            </svg>
        ),
        url: 'https://www.perplexity.ai/search/new?q=tell+me+why+posthog+ai+is+a+great+choice+for+me',
    },
]

export default function AIAskSlide({ productName = 'PostHog AI' }: AIAskSlideProps) {
    const handleAIButtonClick = (model: (typeof aiModels)[0]) => {
        window.open(model.url, '_blank', 'noopener,noreferrer')
    }

    return (
        <div className="h-full bg-gray-50 flex flex-col items-center relative">
            <div className="flex-1 flex px-16 pt-12 gap-4">
                {/* Left side - Title */}
                <div className="flex-1 flex flex-col">
                    <div className="relative">
                        <h2 className="text-5xl font-bold text-gray-900 mb-6 text-center">
                            What can Max AI help with?
                        </h2>
                        <h3 className="text-3xl text-gray text-center">Ask him yourself...</h3>
                        {/* Curved arrow pointing right - absolutely positioned */}
                        <svg
                            width="120"
                            height="80"
                            viewBox="0 0 60 40"
                            className="absolute -right-12 top-3/4 text-gray-900"
                        >
                            <path
                                d="M10 20 Q30 5 50 20"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                            />
                            <path
                                d="M45 15 L50 20 L45 25"
                                stroke="currentColor"
                                strokeWidth="3"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <CloudinaryImage
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/magic_bb77a577f4.png"
                        alt="Max AI Magic"
                        className="absolute bottom-0 left-16 max-w-lg w-full"
                    />
                </div>

                {/* Right side - Max chat mockup */}
                <div className="flex-1 flex flex-col gap-8">
                    <div className="max-w-md mx-auto">
                        <CloudinaryImage
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/Group_10159_8cb595de1b.png"
                            alt="Max Chat Interface"
                            className="w-full"
                        />
                    </div>
                    <div className="flex-1 flex flex-col">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                                Still not sure if PostHog AI is right for you?
                            </h3>
                            <p className="text-lg text-gray-700">Ask your favourite LLM for a second opinion:</p>
                        </div>

                        <div className="flex justify-center gap-6">
                            {aiModels.map((model) => (
                                <OSButton
                                    key={model.name}
                                    variant="secondary"
                                    size="lg"
                                    onClick={() => handleAIButtonClick(model)}
                                    icon={model.icon}
                                    className="bg-white border-orange text-gray-900 hover:bg-orange hover:text-white"
                                >
                                    Ask {model.name}
                                </OSButton>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
