import React, { lazy, Suspense } from 'react'

import { useLayoutData } from 'components/Layout/hooks'

const HedgeHogModeRenderer =
    typeof window !== 'undefined'
        ? lazy(() => import('@posthog/hedgehog-mode').then((module) => ({ default: module.HedgehogModeRenderer })))
        : () => null

export default function HedgeHogModeEmbed(): JSX.Element | null {
    const { hedgehogModeEnabled, compact } = useLayoutData()

    return typeof window !== 'undefined' && hedgehogModeEnabled && !compact ? (
        <Suspense fallback={<span>Loading...</span>}>
            <HedgeHogModeRenderer
                config={{
                    assetsUrl: '/hedgehog-mode',
                    platforms: {
                        selector: '.border',
                        viewportPadding: {
                            top: 100,
                        },
                        minWidth: 50,
                    },
                }}
                onGameReady={() => {
                    console.log('Hedgehog mode ready')
                }}
                style={{
                    position: 'fixed',
                    zIndex: 999998,
                }}
            />
        </Suspense>
    ) : null
}
