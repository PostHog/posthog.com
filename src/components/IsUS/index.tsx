import React from 'react'
import usePostHog from 'hooks/usePostHog'

export default function IsUS({ children }: { children: React.ReactNode }) {
    const posthog = usePostHog()
    return !posthog?.isFeatureEnabled?.('direct-to-eu-cloud') ? children : null
}
