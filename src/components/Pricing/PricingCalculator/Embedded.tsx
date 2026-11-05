import React, { lazy, Suspense } from 'react'
import Link from 'components/Link'
import { RenderInClient } from 'components/RenderInClient'
import type { TabbedProps } from './Tabbed'

const Tabbed = lazy(() => import('./Tabbed'))

const placeholder = (
    <div className="min-h-96 flex flex-col items-center justify-center gap-2 text-sm">
        <p role="status" className="m-0 text-secondary">
            Loading calculator...
        </p>
        <Link to="/pricing" className="font-semibold underline">
            View pricing
        </Link>
    </div>
)

export default function PricingCalculator({ defaultProducts }: TabbedProps): JSX.Element {
    return (
        <section aria-label="Pricing calculator" className="not-prose my-8">
            <RenderInClient
                waitForFlags={false}
                placeholder={placeholder}
                render={() => (
                    <Suspense fallback={placeholder}>
                        <Tabbed defaultProducts={defaultProducts} />
                    </Suspense>
                )}
            />
        </section>
    )
}
