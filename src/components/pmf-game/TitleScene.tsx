import React, { useState } from 'react'

interface TitleSceneProps {
    onStart: () => void
}

export default function TitleScene({ onStart }: TitleSceneProps): JSX.Element {
    const [showHowToPlay, setShowHowToPlay] = useState(false)

    return (
        <div className="mx-auto max-w-screen-lg px-8">
            <style>{`
                @keyframes pulse-scale {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                }
                .btn-pulse {
                    animation: pulse-scale 3s ease-in-out infinite;
                }
                .btn-pulse:hover {
                    animation: none;
                }
            `}</style>
            <div className="flex flex-col items-center justify-center gap-y-4 pt-10 pb-4">
                <h1 className="text-6xl font-bold text-center font-game">The Product-Market Fit Game</h1>
                <h2 className="text-2xl font-bold text-center">A journey through the stages of startup growth.</h2>
            </div>

            <div className="py-6 relative">
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/menu_ce216a1ecf.png"
                    alt="Product Market Fit Game"
                    className="w-full object-cover border-4 border-black"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-3 items-center">
                    <button
                        onClick={onStart}
                        className="btn-pulse px-8 py-3 bg-white/70 hover:bg-orange text-black font-bold text-xl border-4 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                        Start Game
                    </button>
                    <button
                        onClick={() => setShowHowToPlay(true)}
                        className="px-6 py-3 bg-white/70 hover:bg-orange text-black font-bold text-xl border-4 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                    >
                        How To Play?
                    </button>
                </div>
            </div>

            {/* How To Play Dialog */}
            {showHowToPlay && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white border-4 border-black p-8 max-w-md shadow-[8px_8px_0_0_#000]">
                        <h3 className="text-2xl font-bold mb-4">How To Play</h3>
                        <p className="text-lg mb-6">Just follow our instructions. Talk to your users. And ship fast.</p>
                        <button
                            onClick={() => setShowHowToPlay(false)}
                            className="w-full px-6 py-3 bg-orange text-black font-bold text-lg border-4 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                        >
                            Got it!
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
