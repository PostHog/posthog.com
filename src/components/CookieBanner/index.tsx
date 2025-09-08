import CloudinaryImage from 'components/CloudinaryImage'
import usePostHog from '../../hooks/usePostHog'
import React, { useEffect, useState } from 'react'
import Tooltip from 'components/Tooltip'
import { useLayoutData } from 'components/Layout/hooks'
import { useLocation } from '@reach/router'

// Simple UK detection utility, this is just for fun
const isUserInUK = () => {
    if (navigator.language.includes('en-GB')) {
        return true
    }

    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        return timezone === 'Europe/London'
    } catch {
        return false
    }
}

// Text replacement for UK users
const cookieText = (text: string) => {
    return isUserInUK() ? text.replace(/cookie/gi, () => 'biscuit') : text
}

const UrsulaCookieBanner = ({
    handleClick,
    internalMenu,
}: {
    handleClick: (accept: boolean) => void
    internalMenu: any[]
}) => {
    return (
        <div
            className={`fixed z-[50] left-0 lg:bottom-0 ${
                internalMenu?.length > 0 ? 'bottom-[122px]' : 'bottom-[75px]'
            } `}
        >
            <div className="bg-primary/80 backdrop-blur dark:bg-gray-accent-dark rounded-[15px] shadow-[0px_4px_10px_rgba(0,0,0,.4)] px-6 py-5 sm:pb-3 w-[calc(100%_-_2rem)] sm:max-w-[300px] translate-x-4 sm:translate-x-[80px] border border-white/20 mb-2">
                <p className="text-[14px] m-0 pb-2 text-white">
                    <strong>{cookieText("PostHog.com doesn't use third party cookies")}</strong>{' '}
                    <span className="text-white/80">{cookieText('- only a single in-house cookie.')}</span>
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
                    <CloudinaryImage
                        alt="Ursula von der Leyen, President of the European Commission"
                        width={250}
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/EU/images/ursula.png"
                    />
                </div>
            </Tooltip>
        </div>
    )
}

const SmallCookieBanner = ({ handleClick }: { handleClick: (accept: boolean) => void }) => {
    return (
        <div className="fixed bottom-0 left-0 w-full z-[50]">
            <div className="bg-primary/80 dark:bg-gray-accent-dark backdrop-blur-sm p-4 w-full">
                <div className="max-w-7xl mx-auto flex flex-col items-center gap-y-3">
                    <p className="text-sm text-white m-0 text-center">
                        {cookieText("PostHog.com doesn't use third party cookies - only a single in-house cookie.")}
                    </p>
                    <div className="flex items-center gap-x-2">
                        <button
                            onClick={() => handleClick(false)}
                            className="bg-orange dark:bg-button-secondary-shadow-dark dark:border-button-secondary-dark border-[1.5px] relative top-px rounded-[8px] text-primary inline-block border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative text-center w-auto bg-white text-primary hover:text-primary dark:text-primary-dark dark:hover:text-primary-dark border-button dark:border-orange dark:bg-dark rounded-[8px] text-[14px] font-bold border-[1.5px] px-3 py-1 -translate-y-0.5 hover:-translate-y-1 active:-translate-y-0.5 mx-[-1.5px] group-disabled:hover:!-translate-y-1 group-disabled:hover:!translate-y-0 block active:transition-all active:duration-100 select-none ">
                                Decline
                            </span>
                        </button>
                        <button
                            onClick={() => handleClick(true)}
                            className="bg-button-shadow dark:bg-button-shadow-dark border-[1.5px] relative top-px rounded-[8px] text-primary inline-block border-button text-center group disabled:opacity-50 disabled:cursor-not-allowed shadow-none box-border"
                        >
                            <span className="relative text-center w-auto bg-orange text-primary hover:text-primary dark:text-primary dark:hover:text-primary border-button dark:border-button-dark dark:bg-orange rounded-[8px] text-[14px] font-bold border-[1.5px] px-3 py-1 -translate-y-0.5 hover:-translate-y-1 active:-translate-y-0.5 mx-[-1.5px] group-disabled:hover:!-translate-y-1 group-disabled:hover:!translate-y-0 block active:transition-all active:duration-100 select-none">
                                Accept
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function CookieBanner() {
    const posthog = usePostHog()
    const { internalMenu } = useLayoutData()
    const [consentGiven, setConsentGiven] = useState('')
    const { pathname, state } = useLocation()
    const paidAdsCookieBannerExperimentVariant = posthog?.getFeatureFlag?.('show-bottom-bar-cookie-banner')

    const handleClick = (accept: boolean) => {
        localStorage.setItem('cookie_consent', accept ? 'yes' : 'no')
        setConsentGiven(accept ? 'yes' : 'no')
    }

    useEffect(() => {
        if (['yes', 'no'].includes(consentGiven)) {
            posthog?.set_config({ persistence: consentGiven === 'yes' ? 'localStorage+cookie' : 'memory' })
        }
    }, [consentGiven])

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent')
        if (!consent) {
            setConsentGiven('undecided')
        } else {
            setConsentGiven(consent)
        }
    }, [])

    if (consentGiven !== 'undecided') {
        return null
    }

    const isOnPaidAdsLandingPage =
        pathname.includes('/newsletter-fbc') || (state as { isComingFromAd?: boolean })?.isComingFromAd
    if (isOnPaidAdsLandingPage && paidAdsCookieBannerExperimentVariant === 'test') {
        return <SmallCookieBanner handleClick={handleClick} />
    }

    return <UrsulaCookieBanner handleClick={handleClick} internalMenu={internalMenu} />
}
