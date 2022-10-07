import { StaticImage } from 'gatsby-plugin-image'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import React, { useEffect, useState } from 'react'
import { useValues } from 'kea'

export default function CookieBanner() {
    const { posthog } = useValues(posthogAnalyticsLogic)
    const [showBanner, setShowBanner] = useState(false)

    const handleClick = (accept: boolean) => {
        accept ? posthog.opt_in_capturing() : posthog.opt_out_capturing()
        setShowBanner(false)
    }

    useEffect(() => {
        if (typeof posthog?.has_opted_in_capturing !== 'undefined') {
            setShowBanner(!posthog?.has_opted_in_capturing() || !posthog?.has_opted_out_capturing())
        }
    }, [])

    return showBanner ? (
        <div className="fixed z-50 -left-8 -bottom-10">
            <div className="bg-primary rounded-sm max-w-[200px] text-white/80 translate-x-1/2">
                <p className="text-[14px] m-0 p-3">
                    We use tracking cookies to understand how you use the product and help us improve it. Please accept
                    cookies to help us improve.
                </p>
                <div className="grid grid-cols-2 border-t border-white/40 border-dashed divide-x-1 divide-white/40 divide-dashed">
                    <button onClick={() => handleClick(true)} className="font-semibold text-red py-2 text-[14px]">
                        Accept
                    </button>
                    <button onClick={() => handleClick(false)} className="font-semibold text-red py-2 text-[14px]">
                        Decline
                    </button>
                </div>
            </div>
            <StaticImage alt="Sport hog" width={180} src="../Pricing/images/sport-hog.png" />
        </div>
    ) : null
}
