import React from 'react'
import { IconWarning } from '@posthog/icons'

export default function ShippingBanner(): React.ReactElement {
    return (
        <div className="bg-yellow/25 border border-yellow rounded p-4 mb-4 flex gap-4">
            <div className="shrink w-10">
                <IconWarning className="size-10" />
            </div>
            <div>
                <h3 className="text-base mb-0">June 13: Expect shipping delays</h3>
                <p className="text-sm mb-0">
                    Just like our code, our merch usually ships fast. But we're changing merch fulfillment providers
                    which means there will be a delay in fulfilling orders. We expect this to last for the next 2-3
                    weeks. Thanks for your patience!
                </p>
            </div>
        </div>
    )
}
