import React from 'react'
import { IconWarning } from '@posthog/icons'

export default function ShippingBanner(): React.ReactElement {
    return (
        <div className="not-prose bg-yellow/25 border-b border-yellow rounded p-4 flex gap-4">
            <div className="shrink w-10">
                <IconWarning className="size-10" />
            </div>
            <div>
                <h3 className="text-base mb-0">July 2: We're catching up on merch orders</h3>
                <p className="text-sm mb-0">
                    Just like our code, our merch usually ships fast. But we're changing merch fulfillment providers
                    which means there will be a delay in fulfilling orders. The process is also complete and we expect
                    to be fully caught up on shipping new orders within the next 2 weeks. Orders placed between June 13
                    and July 1 will ship soon. Thanks for your patience!
                </p>
            </div>
        </div>
    )
}
