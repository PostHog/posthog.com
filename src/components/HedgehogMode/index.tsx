import React, { lazy, Suspense } from 'react'

import { useLayoutData } from 'components/Layout/hooks'

const HedgeHogModeRenderer =
    typeof window !== 'undefined'
        ? lazy(() => import('@posthog/hedgehog-mode').then((module) => ({ default: module.HedgehogModeRenderer })))
        : () => null

export default function HedgeHogModeEmbed(): JSX.Element | null {
    const { hedgehogModeEnabled } = useLayoutData()

    return typeof window !== 'undefined' && hedgehogModeEnabled ? (
        <Suspense fallback={<span>Loading...</span>}>
            <HedgeHogModeRenderer
                config={{
                    assetsUrl: '/hedgehog-mode',
                    platformSelector: '.border',
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
