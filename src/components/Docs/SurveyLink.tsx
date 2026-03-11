import React, { useState, useEffect } from 'react'
import usePostHog from '../../hooks/usePostHog'

export const SurveyLink = ({ surveyId, children }: { surveyId: string; children: React.ReactNode }) => {
    const posthog = usePostHog()
    const [distinctId, setDistinctId] = useState<string | null>(null)

    useEffect(() => {
        posthog?.onFeatureFlags(() => {
            setDistinctId(posthog.get_distinct_id())
        })
    }, [posthog])

    const url = `https://app.posthog.com/external_surveys/${surveyId}${
        distinctId ? `?distinct_id=${encodeURIComponent(distinctId)}` : ''
    }`
    return <a href={url}>{children}</a>
}

export default SurveyLink
