import React, { useEffect, useState } from 'react'
import usePostHog from '../../hooks/usePostHog'

interface FeatureFlagProps {
    flag: string
    children: React.ReactNode
    fallback?: React.ReactNode
}

export const FeatureFlag: React.FC<FeatureFlagProps> = ({ flag, children, fallback = null }) => {
    const posthog = usePostHog()
    const [flagValue, setFlagValue] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        if (posthog) {
            const checkFlag = () => {
                const value = posthog.isFeatureEnabled(flag)
                setFlagValue(value)
            }

            checkFlag()

            posthog.onFeatureFlags(() => {
                checkFlag()
            })
        }
    }, [posthog, flag])

    if (flagValue === undefined) {
        return null
    }

    return <>{flagValue ? children : fallback}</>
}

export default FeatureFlag
