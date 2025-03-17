import React, { useEffect, useState } from 'react'

import { getRandomAccesoryCombo, HedgeHogMode } from '@posthog/hedgehog-mode'
import { useLayoutData } from 'components/Layout/hooks'

export default function HedgeHogModeEmbed(): JSX.Element {
    const { hedgehogModeEnabled, setHedgehogModeEnabled } = useLayoutData()

    const [ref, setRef] = useState<HTMLDivElement | null>(null)
    const [game, setGame] = useState<HedgeHogMode | null>(null)

    // const [randomBoxes, setRandomBoxes] = useState<
    //     {
    //         x: number
    //         y: number
    //         w: number
    //         h: number
    //     }[]
    // >([])

    const spawnHedgehog = async (count: number, hedgehogMode = game) => {
        for (let i = 0; i < count; i++) {
            hedgehogMode?.spawnHedgehog({
                id: `hedgehog-${i}`,
                controls_enabled: false,
                accessories: getRandomAccesoryCombo(),
            })

            await new Promise((resolve) => setTimeout(resolve, 50))
        }
    }

    const setupHedgehogMode = async () => {
        const { HedgeHogMode } = await import('@posthog/hedgehog-mode')
        if (ref) {
            const hedgeHogMode = new HedgeHogMode({
                assetsUrl: '/hedgehog-mode',
                platformSelector: '.border',
            })
            await hedgeHogMode.render(ref)
            setGame(hedgeHogMode)
        }
    }

    useEffect(() => {
        if (hedgehogModeEnabled && ref) {
            setupHedgehogMode()
        }
    }, [ref, hedgehogModeEnabled])

    useEffect(() => {
        if (!hedgehogModeEnabled && game) {
            game.destroy()
            setGame(null)
        }
    }, [hedgehogModeEnabled, game])


    useEffect(() => {
        if (game) {
            game.spawnHedgehog({
                id: 'hedgehog-1',
                skin: 'default',
                controls_enabled: true,
                player: true,
                accessories: getRandomAccesoryCombo(),
            })

            // spawnHedgehog(20, game)
        }
    }, [game])

    return <div id="game" className="fixed inset-0 z-20 pointer-events-none" ref={(r) => setRef(r)}></div>
}
