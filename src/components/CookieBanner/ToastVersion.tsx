import React, { useEffect, useState } from 'react'
import { useToast } from '../../context/Toast'
import usePostHog from '../../hooks/usePostHog'
import CloudinaryImage from 'components/CloudinaryImage'
import Tooltip from 'components/RadixUI/Tooltip'
import { IconX } from '@posthog/icons'

export default function CookieBannerToast() {
    const { addToast } = useToast()
    const posthog = usePostHog()
    const [hasShownBanner, setHasShownBanner] = useState(false)

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent')

        if (!consent && !hasShownBanner) {
            setHasShownBanner(true)
            addToast({
                title: 'Legally-required cookie banner',
                description: (
                    <>
                        <p className="mt-1">
                            PostHog.com doesn't use third-party cookies, only a single in-house cookie.
                        </p>
                        <p className="pr-28">
                            No data is sent to a third party. (

                            <Tooltip trigger={<span className="border-b border-primary border-dashed">Ursula von der Leyen</span>} delay={0}
                            >
                                <div className="max-w-64">
                                    <span className="text-sm">Ursula von der Leyen is the President of the European Commission – NOT to be confused with Hilary Clinton.</span>
                                </div>
                            </Tooltip>{' '} would be so proud.)
                        </p>
                    </>
                ),
                image: (
                    <div className="absolute bottom-0 -right-4 leading-[0]">
                        <CloudinaryImage
                            alt="Ursula von der Leyen, President of the European Commission"
                            width={180}
                            src="https://res.cloudinary.com/dmukukwp6/image/upload/posthog.com/src/components/EU/images/ursula.png"
                        />
                    </div>
                ),
                onAction: () => {
                    localStorage.setItem('cookie_consent', 'acknowledged')
                    posthog?.set_config({ persistence: 'localStorage+cookie' })
                },
                actionLabel: 'Close',
                actionAsIcon: (<IconX className="size-4" />),
                verticalAlign: 'items-start',
                duration: 999999999,
            })
        } else if (consent) {
            // If acknowledgement was already received, ensure PostHog is configured correctly
            posthog?.set_config({ persistence: 'localStorage+cookie' })
        }
    }, [addToast, posthog, hasShownBanner])

    return null
}
