import React, { useState } from 'react'
import CTA from 'components/Home/CTA'
import WordArt, { wordArtThemes } from 'components/WordArt'
import MSPaint from 'components/MSPaint'
import StopImage from '../../../../static/images/stop.png'
import { SignupCTA } from 'components/SignupCTA'
import IntegrationPrompt from 'components/IntegrationPrompt'
import { IconCheck, IconCopy } from '@posthog/icons'
import { useToast } from '../../../context/Toast'

export default function GettingStartedSlide({ initialState, productName }: { initialState: any; productName: string }) {
    const coloringPageImage = StopImage
    const [justCopied, setJustCopied] = useState(false)
    const { addToast } = useToast()

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText('npx -y @posthog/wizard@latest')
            setJustCopied(true)

            // Show global toast
            addToast({
                description: 'Code copied to clipboard!',
                duration: 3000,
            })

            // Reset icon after 3 seconds
            setTimeout(() => {
                setJustCopied(false)
            }, 3000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <div className="h-full flex flex-col justify-center bg-light dark:bg-dark text-primary relative">
            <MSPaint
                // Pass the image URL to preload it as line art
                initialImage={coloringPageImage}
                canvasSize={{ width: 1066, height: 614 }}
                initialState={initialState}
            />
            {/* <WordArt text="PostHog" theme="rainbow" fontSize={60} />
                    <WordArt text="Analytics" theme="superhero" fontSize={40} /> */}

            <WordArt text="Get started today!!" theme="superhero" fontSize={48} className="absolute top-20 left-20" />
            <WordArt
                text="If you we're looking for a sign..."
                theme="rainbow"
                fontSize={36}
                className="absolute top-40 left-72"
            />
            <WordArt text="Follow your dreams" theme="blues" fontSize={24} className="absolute top-12 right-40" />
            <WordArt text="Install with AI" theme="italicOutline" fontSize={24} className="absolute top-96 left-52" />
            <WordArt
                text="Install without AI"
                theme="italicOutline"
                fontSize={24}
                className="absolute top-96 right-72"
            />
            <WordArt
                text={`${productName} is my passion`}
                theme="radial"
                fontSize={24}
                className="absolute bottom-20 right-36 [writing-mode:vertical-rl]"
            />
            <WordArt
                text="New year, new you!"
                theme="slate"
                fontSize={30}
                className="absolute bottom-36 left-16 [writing-mode:sideways-lr]"
            />
            <WordArt
                text="Get started with a new better life"
                theme="tilt"
                fontSize={30}
                className="absolute bottom-20 left-96"
            />

            <div className="absolute bottom-56 left-32 flex items-center gap-2">
                <div className="rounded border border-primary px-5 py-4 bg-white dark:bg-accent-dark flex items-center gap-2">
                    <code className="text-sm">npx -y @posthog/wizard@latest</code>
                    <button
                        onClick={handleCopy}
                        className="p-1 hover:bg-accent-dark rounded transition-colors"
                        aria-label="Copy to clipboard"
                    >
                        {justCopied ? (
                            <IconCheck className="size-5 text-green-600" />
                        ) : (
                            <IconCopy className="size-5 hover:text-secondary cursor-pointer" />
                        )}
                    </button>
                </div>
            </div>

            <div className="absolute bottom-56 right-64">
                <SignupCTA size="absurd" type="primary" />
            </div>

            {/*                     
                    <WordArt text="If you were looking for a sign..." theme="rainbow" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="radial" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="tilt" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="purple" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="horizon" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="italicOutline" fontSize={40} />
                    <WordArt text="If you were looking for a sign..." theme="slate" fontSize={40} /> */}
        </div>
    )
}
