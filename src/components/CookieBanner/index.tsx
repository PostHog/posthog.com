import { StaticImage } from 'gatsby-plugin-image'
import usePostHog from '../../hooks/usePostHog'
import React, { useEffect, useState } from 'react'
import Tooltip from 'components/Tooltip'

export default function CookieBanner() {
    const posthog = usePostHog()
    const [showBanner, setShowBanner] = useState(false)

    const handleClick = (accept: boolean) => {
        accept ? posthog?.opt_in_capturing() : posthog?.opt_out_capturing()
        setShowBanner(false)
    }

    useEffect(() => {
        setShowBanner(
            typeof posthog?.has_opted_in_capturing !== 'undefined' &&
                !posthog?.has_opted_in_capturing() &&
                !posthog?.has_opted_out_capturing()
        )
    }, [])

    return showBanner ? (
        <div className="fixed z-50 left-0 bottom-0">
            <div className="bg-primary/80 backdrop-blur dark:bg-gray-accent-dark rounded-[15px] shadow-[0px_4px_10px_rgba(0,0,0,.4)] px-6 py-5 sm:pb-3 w-[calc(100%_-_2rem)] sm:max-w-[300px] translate-x-4 sm:translate-x-[80px] border border-white/20 mb-2">
                <p className="text-[14px] m-0 pb-2 text-white">
                    <strong>PostHog.com doesn't use third party cookies</strong>{' '}
                    <span className="text-white/80">- only a single in-house cookie.</span>
                </p>
                <p className="text-[14px] m-0 pb-4 text-white/80">No data is transmitted to a third party.</p>
                <div className="space-y-2 sm:space-y-1.5">
                    <button
                        onClick={() => handleClick(true)}
                        className="bg-white text-red w-full text-center sm:text-sm py-2.5 sm:py-2 font-bold select-none rounded-sm inline-block cta button-shadow shadow-xl relative hover:scale-[1.02] active:top-[0.5px] active:scale-[.99]"
                    >
                        Accept
                    </button>
                    <button
                        onClick={() => handleClick(false)}
                        className="border border-white/20 sm:border-transparent bg-none text-white/50 hover:text-white/60 hover:border-white/25 w-full text-center text-base sm:text-[13px] py-2.5 sm:py-2 font-semibold select-none rounded-sm inline-block cta button-shadow shadow-xl relative active:top-[0.5px] active:scale-[.99]"
                    >
                        Decline
                    </button>
                </div>
            </div>

            <Tooltip
                content={
                    <>
                        <p className="text-sm m-0">
                            PostHog appreciates your privacy as much as the President of the European Commission, Ursula
                            von der Leyen.
                        </p>
                    </>
                }
                placement="right"
                tooltipClassName="max-w-[325px] shadow-xl text-xs backdrop-blur bg-white/75 -ml-12 !px-4 !py-2"
                tooltipWrapperClassName="z-[10000]"
                offset={[0, 0]}
            >
                <div className="relative max-w-[280px]">
                    <StaticImage
                        alt="Ursula von der Leyen, President of the European Commission"
                        width={250}
                        src="../EU/images/ursula.png"
                    />
                </div>
            </Tooltip>
        </div>
    ) : null
}
