import { StaticImage } from 'gatsby-plugin-image'
import usePostHog from '../../hooks/usePostHog'
import React, { useEffect, useState } from 'react'
import Tooltip from 'components/Tooltip'
import { useLayoutData } from 'components/Layout/hooks'

export default function CookieBanner() {
    const posthog = usePostHog()
    const { internalMenu } = useLayoutData()
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
        <div
            className={`fixed z-[50] left-0 lg:bottom-0 ${
                internalMenu?.length > 0 ? 'bottom-[122px]' : 'bottom-[75px]'
            } `}
        >
            <div className="bg-primary/80 backdrop-blur dark:bg-gray-accent-dark rounded-[15px] shadow-[0px_4px_10px_rgba(0,0,0,.4)] px-6 py-5 sm:pb-3 w-[calc(100%_-_2rem)] sm:max-w-[300px] translate-x-4 sm:translate-x-[80px] border border-white/20 mb-2">
                <p className="text-[14px] m-0 pb-2 text-white">
                    <strong>PostHog.com doesn't use third party cookies</strong>{' '}
                    <span className="text-white/80">- only a single in-house cookie.</span>
                </p>
                <p className="text-[14px] m-0 pb-4 text-white/80">No data is sent to a third party.</p>
                <div className="space-y-2">
                    <button
                        onClick={() => handleClick(true)}
                        className="bg-button-shadow dark:bg-button-shadow-dark border-[1.5px] relative top-[2px] rounded-[8px] text-primary inline-block border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed shadow-none !w-full box-border"
                    >
                        <span className="relative text-center w-auto bg-orange text-primary hover:text-primary dark:text-primary dark:hover:text-primary border-button dark:border-button-dark dark:bg-orange rounded-[8px] text-[15px] font-bold border-[1.5px] px-5 py-2 -translate-y-0.5 hover:-translate-y-1 active:-translate-y-0.5 mx-[-1.5px] group-disabled:hover:!-translate-y-1 group-disabled:hover:!translate-y-0 block active:transition-all active:duration-100 select-none">
                            Accept
                        </span>
                    </button>
                    <button
                        onClick={() => handleClick(false)}
                        className="bg-orange dark:bg-button-secondary-shadow-dark dark:border-button-secondary-dark border-[1.5px] relative top-[2px] rounded-[8px] w-full text-primary inline-block border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="relative text-center w-auto bg-white text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark border-button dark:border-orange dark:bg-dark rounded-[8px] text-[15px] font-bold border-[1.5px] px-5 py-2 -translate-y-0.5 hover:-translate-y-1 active:-translate-y-0.5 mx-[-1.5px] group-disabled:hover:!-translate-y-1 group-disabled:hover:!translate-y-0 block active:transition-all active:duration-100 select-none ">
                            Decline
                        </span>
                    </button>
                </div>
            </div>

            <Tooltip
                content={() => (
                    <>
                        <p className="text-sm m-0">
                            PostHog appreciates your privacy as much as the President of the European Commission, Ursula
                            von der Leyen.
                        </p>
                    </>
                )}
                placement="right"
                tooltipClassName="max-w-[325px] shadow-xl rounded text-xs backdrop-blur bg-accent dark:bg-accent-dark -ml-12 !px-4 !py-2"
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
