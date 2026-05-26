import React, { useMemo } from 'react'

interface Star {
    x: number
    y: number
    size: number
    twinkle: number
}

function pseudoRandom(seed: number): () => number {
    let state = seed
    return () => {
        state = (state * 9301 + 49297) % 233280
        return state / 233280
    }
}

interface StarfieldProps {
    /** How many stars to scatter. Stable for a given seed so SSR/CSR markup matches. */
    count?: number
    seed?: number
}

export default function Starfield({ count = 140, seed = 42 }: StarfieldProps): JSX.Element {
    const stars = useMemo<Star[]>(() => {
        const rand = pseudoRandom(seed)
        return Array.from({ length: count }, () => ({
            x: rand() * 100,
            y: rand() * 100,
            size: rand() < 0.85 ? 1 : 2,
            twinkle: rand() * 4 + 2,
        }))
    }, [count, seed])

    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
            {stars.map((star, i) => (
                <span
                    key={i}
                    className="absolute bg-white/80 rounded-full"
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animation: `galaxyTwinkle ${star.twinkle}s ease-in-out ${(i % 7) * 0.3}s infinite alternate`,
                    }}
                />
            ))}
            <style>{`
                @keyframes galaxyTwinkle {
                    0% { opacity: 0.15; }
                    100% { opacity: 0.85; }
                }
            `}</style>
        </div>
    )
}
