import React, { useState } from 'react'
import SEO from 'components/seo'
import OSButton from 'components/OSButton'
import ScrollArea from 'components/RadixUI/ScrollArea'

function TitleScene({ onStart }: { onStart: () => void }) {
    return (
        <div className="mx-auto max-w-screen-lg">
            <div className="flex flex-col items-center justify-center gap-y-4 py-10">
                <h1 className="text-6xl font-bold text-center">The Product Market Fit Game</h1>
                <h2 className="text-2xl font-bold text-center">A journey through stages of startup growth.</h2>
                <OSButton variant="primary" onClick={onStart}>
                    Start
                </OSButton>
            </div>

            <div className="py-6">
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/f_webp,h_1472,w_2619,c_fill,g_auto,q_auto/v1/posthog.com/contents/images/blog/pmf-game-guide/pmf-guide?_a=AXAH4nI0"
                    alt="Product Market Fit Game"
                    className="w-full object-cover"
                />
            </div>
        </div>
    )
}

export default function PMFGame(): JSX.Element {
    const [gameStarted, setGameStarted] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)

    return (
        <>
            <SEO
                title="The Product Market Fit Game"
                description="Achieve your wildest dreams: product market fit."
                image={`/images/og/default.png`}
            />
            <div className="@container w-full h-full flex flex-col min-h-1">
                <div data-scheme="secondary" className="flex flex-col @3xl:flex-row flex-grow min-h-0 h-full">
                    {/* Left Sidebar */}
                    <aside
                        data-scheme="secondary"
                        className="@3xl:w-64 bg-primary border-t @3xl:border-t-0 @3xl:border-r border-primary h-full prose prose-sm dark:prose-invert flex-shrink-0"
                    >
                        <ScrollArea className="h-full p-2">
                            <div className="space-y-3">
                                <h3 className="font-bold text-sm uppercase opacity-60 m-0">Progress</h3>
                                <div className="text-sm">
                                    {gameStarted ? (
                                        <p className="m-0">Step {currentStep + 1}</p>
                                    ) : (
                                        <p className="m-0">Press Start to begin</p>
                                    )}
                                </div>
                            </div>
                        </ScrollArea>
                    </aside>

                    {/* Main Content */}
                    <main data-scheme="primary" className="@container flex-1 bg-primary relative h-full">
                        <ScrollArea className="h-full">
                            <div className="max-w-screen-lg mx-auto p-8">
                                <TitleScene onStart={() => setGameStarted(true)} />
                            </div>
                        </ScrollArea>
                    </main>
                </div>
            </div>
        </>
    )
}
