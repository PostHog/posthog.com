import React, { useEffect, useState } from 'react'
import { useToast } from '../../context/Toast'
import usePostHog from '../../hooks/usePostHog'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/Tooltip'

export default function CookieBannerToast() {
    const { addToast } = useToast()
    const posthog = usePostHog()
    const [hasShownBanner, setHasShownBanner] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent')

        if (!consent && !hasShownBanner) {
            // Show the cookie banner toast
            setHasShownBanner(true)
            addToast({
                title: 'Legally-required cookie banner',
                description: (
                    <>
                        <p className="mt-1">
                            PostHog.com doesn't use third-party cookies, only a single in-house cookie.
                        </p>
                        <p className="pr-24">
                            No data is sent to a third party. (
                            <Tooltip
                                content="Ursula von der Leyen is the President of the European Commission – NOT to be confused with Hilary Clinton."
                                placement="top"
                                tooltipClassName="max-w-xs"
                            >
                                <span className="border-b border-primary border-dashed">Ursula von der Leyen</span>
                            </Tooltip>{' '}
                            would be so proud.)
                        </p>
                    </>
                ),
                image: (
                    <div className="absolute bottom-[calc(-1rem-1px)] -right-20 leading-[0]">
                        <CloudinaryImage
                            alt="Ursula von der Leyen, President of the European Commission"
                            width={180}
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/EU/images/ursula.png"
                        />
                    </div>
                ),
                onAction: () => {
                    // Since we don't use third-party cookies, we just acknowledge and close
                    localStorage.setItem('cookie_consent', 'acknowledged')
                    posthog?.set_config({ persistence: 'localStorage+cookie' })
                },
                actionLabel: 'Close',
                duration: 999999999, // Very long duration to effectively never auto-dismiss
            })
        } else if (consent) {
            // If consent was already given, ensure PostHog is configured correctly
            posthog?.set_config({ persistence: 'localStorage+cookie' })
        }
    }, [addToast, posthog, hasShownBanner])

    return null
}
