import React, { useState } from 'react'
import CTA from 'components/Home/CTA'
import WordArt, { wordArtThemes } from 'components/WordArt'
import MSPaint from 'components/MSPaint'
import StopImage from '../../../../static/images/stop.png'
import { SignupCTA } from 'components/SignupCTA'
import IntegrationPrompt from 'components/IntegrationPrompt'
import { IconCheck, IconCopy } from '@posthog/icons'
import { useToast } from '../../../context/Toast'
import { Link } from 'gatsby'
import OSButton from 'components/OSButton'
import Unicorn from './unicorn.gif'
import ArrowStencil from './arrow-stencil.gif'
import ArrowBlink from './arrow-blink.gif'
import ArrowRainbow from './arrow-rainbow.gif'
import Confetti from 'react-confetti'

export default function GettingStartedSlide({ initialState, productName }: { initialState: any; productName: string }) {
    const coloringPageImage = StopImage
    const [justCopied, setJustCopied] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const { addToast } = useToast()

    const WordArtSlop = () => {
        return (
            <>
                <WordArt
                    text="Get started today!!"
                    theme="superhero"
                    fontSize={48}
                    className="absolute top-8 @2xl:top-24 left-6 @2xl:left-20"
                />
                <WordArt
                    text="If you we're looking for a sign..."
                    secretMessage="(yes, the typo was intentional)"
                    theme="rainbow"
                    fontSize={36}
                    className="absolute top-[8.5rem] @xl:top-44 left-24 @2xl:left-72 scale-75 @2xl:scale-100"
                />
                <WordArt
                    text="Follow your dreams"
                    theme="blues"
                    fontSize={24}
                    className="absolute top-12 right-12 @2xl:right-40"
                />
                <div className="absolute top-[58rem] @2xl:top-[24rem] left-36 @2xl:left-32 text-center max-w-sm scale-150 @2xl:scale-100">
                    <WordArt text="Install with AI" theme="italicOutline" fontSize={24} className="" />
                    <br />
                    <WordArt text="in less than 90 seconds" theme="italicOutline" fontSize={16} />
                    <br />
                    <WordArt
                        text="Works in your terminal or with tools like Cursor, Replit, and Bolt."
                        theme="italicOutline"
                        fontSize={12}
                    />
                    <br />
                    <div
                        className="relative inline-block mt-4 mb-2 rounded p-[2px] shadow-2xl animate-gradient-rotate"
                        style={{
                            background:
                                'linear-gradient(90deg, #ff0000 0%, #ff7f00 14%, #ffff00 28%, #00ff00 42%, #00ffff 56%, #0000ff 70%, #9400d3 84%, #ff0000 100%)',
                            backgroundSize: '400% 400%',
                            filter: 'drop-shadow(0 0 15px rgba(255, 0, 0, 0.5)) drop-shadow(0 0 15px rgba(0, 255, 0, 0.5)) drop-shadow(0 0 15px rgba(0, 0, 255, 0.5))',
                        }}
                    >
                        <div className="rounded p-2 bg-white text-left">
                            <div className="flex items-center gap-0.5">
                                <code className="text-sm">npx -y @posthog/wizard@latest</code>
                                <OSButton size="xs" onClick={handleCopy} aria-label="Copy to clipboard">
                                    {justCopied ? (
                                        <IconCheck className="size-5 text-green" />
                                    ) : (
                                        <IconCopy className="size-5" />
                                    )}
                                </OSButton>
                            </div>
                        </div>
                    </div>
                    <WordArt
                        text="Supports Next.js, React, React Native Svelte, and Astro"
                        theme="italicOutline"
                        fontSize={12}
                    />
                    <br />
                    <div className="@2xl:hidden">
                        <WordArt
                            text="(Probably best to do this from a computer though)"
                            theme="italicOutline"
                            fontSize={12}
                        />
                    </div>
                </div>
                <div className="absolute top-[15rem] @2xl:top-[24rem] right-64 @2xl:right-72 text-center scale-150 @2xl:scale-100">
                    <WordArt text="Install without AI" theme="italicOutline" fontSize={24} />
                    <br />
                    <div className="relative">
                        <SignupCTA size="absurd" type="primary" className="animate-grow mt-2 mb-1" />
                        <br />
                        <WordArt
                            text="(Yes this is a real button, you can actually click it)"
                            theme="italicOutline"
                            fontSize={10}
                        />

                        <div className="absolute top-full flex gap-2 ml-6 -mt-10 -translate-x-1/2 scale-75">
                            <img src={ArrowStencil} className="rotate-45 mr-2 relative -top-8" />
                            <img src={ArrowBlink} className="rotate-90 -mr-24" />
                            <img src={ArrowRainbow} className="rotate-90" />
                        </div>
                    </div>
                </div>
                <WordArt
                    text={`${productName} is my passion`}
                    theme="radial"
                    fontSize={24}
                    className="absolute bottom-20 right-8 @2xl:right-36 [writing-mode:vertical-rl]"
                />
                <WordArt
                    text="New year, new you!"
                    theme="slate"
                    fontSize={30}
                    className="absolute bottom-36 left-4 @2xl:left-16 [writing-mode:sideways-lr]"
                />
                <WordArt
                    text="Get started with a new better life"
                    theme="tilt"
                    fontSize={30}
                    className="absolute bottom-12 @2xl:bottom-20 left-36 @2xl:left-96"
                />
            </>
        )
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText('npx -y @posthog/wizard@latest')
            setJustCopied(true)
            setShowConfetti(true)

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
            {showConfetti && (
                <div className="fixed inset-0 pointer-events-none z-50">
                    <Confetti
                        onConfettiComplete={() => setShowConfetti(false)}
                        recycle={false}
                        numberOfPieces={800}
                        gravity={0.4}
                        initialVelocityY={25}
                        initialVelocityX={10}
                        tweenDuration={3000}
                        colors={['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#9400d3']}
                    />
                </div>
            )}

            <div
                className="absolute inset-0 @2xl:hidden"
                style={{
                    backgroundImage: `url(${StopImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            ></div>
            <div className="hidden @2xl:block h-full">
                <MSPaint
                    // Pass the image URL to preload it as line art
                    initialImage={coloringPageImage}
                    canvasSize={{ width: 1066, height: 614 }}
                    initialState={initialState}
                />
            </div>
            {/* <WordArt text="PostHog" theme="rainbow" fontSize={60} />
                    <WordArt text="Analytics" theme="superhero" fontSize={40} /> */}
            {/* <img src={Unicorn} className="absolute right-36 top-28 w-60 [mix-blend-mode:multiply]" /> */}

            <WordArtSlop />
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
