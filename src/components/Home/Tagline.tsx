import React, { useEffect, useState } from 'react'
import usePostHog from 'hooks/usePostHog'

const taglineContent = {
    control: 'We make dev tools that help product engineers build successful products.',
    test: 'Debug your code, ship features faster, and keep all your usage and customer data in one stack.',
}

export default function Tagline(): JSX.Element {
    const posthog = usePostHog()
    const [tagline, setTagline] = useState<string>(taglineContent.control)
    const [ready, setReady] = useState<boolean>(false)

    useEffect(() => {
        try {
            const ffVariant = posthog?.getFeatureFlag?.('home-tagline')
            if (ffVariant) {
                setTagline(taglineContent[ffVariant as keyof typeof taglineContent])
            }
        } catch (error) {
            console.error('Error getting feature flag for home tagline', error)
        } finally {
            setReady(true)
        }
    }, [posthog])

    return (
        <p className={ready ? 'opacity-100' : 'opacity-0'}>
            <span className="text-base font-medium mb-0">{tagline}</span>
        </p>
    )
}
