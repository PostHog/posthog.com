import React, { useEffect, useState } from 'react'
import { useToast } from '../../context/Toast'
import usePostHog from '../../hooks/usePostHog'

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
                title: 'Cookie Notice',
                description:
                    "PostHog.com doesn't use third-party cookies - only a single in-house cookie. No data is sent to a third party.",
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
