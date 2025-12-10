import React from 'react'

interface TitleSceneProps {
    onStart: () => void
}

export default function TitleScene({ onStart }: TitleSceneProps): JSX.Element {
    return (
        <div className="mx-auto max-w-screen-lg px-8">
            <div className="flex flex-col items-center justify-center gap-y-4 py-10">
                <h1 className="text-6xl font-bold text-center font-game">The Product-Market Fit Game</h1>
                <h2 className="text-2xl font-bold text-center">A journey through the stages of startup growth.</h2>
                <button
                    onClick={onStart}
                    className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xl border-4 border-black shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                >
                    Start Game
                </button>
            </div>

            <div className="py-6">
                <img
                    src="https://res.cloudinary.com/dmukukwp6/image/upload/q_auto,f_auto/menu_ce216a1ecf.png"
                    alt="Product Market Fit Game"
                    className="w-full object-cover border-4 border-black"
                />
            </div>
        </div>
    )
}
