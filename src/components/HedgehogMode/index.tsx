import React, { lazy, Suspense } from 'react'

import { useLayoutData } from 'components/Layout/hooks'


const HedgeHogModeRenderer = lazy(() => import('@posthog/hedgehog-mode').then((module) => ({ default: module.HedgehogModeRenderer })))

export default function HedgeHogModeEmbed(): JSX.Element | null {
    const { hedgehogModeEnabled } = useLayoutData()


    return hedgehogModeEnabled ? (
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
