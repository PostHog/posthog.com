import React from 'react'
import OSButton from 'components/OSButton'
import { useAppSettings } from '../../context/App'

interface PrimaryCTAProps {
    translate?: (label: string) => string
}

/**
 * Shared "Open PostHog" / "Get started – free" taskbar CTA, used by both the
 * default and Korean taskbars so the destination/label logic only lives once.
 */
export default function PrimaryCTA({ translate = (label) => label }: PrimaryCTAProps) {
    const { posthogInstance } = useAppSettings()
    const strippedInstance = posthogInstance?.replace(/"/g, '')

    return (
        <div className="relative mr-1">
            <OSButton
                variant="primary"
                size="md"
                asLink
                to={strippedInstance || 'https://app.posthog.com/signup'}
                className=""
            >
                {strippedInstance ? translate('Open PostHog') : translate('Get started – free')}
            </OSButton>
        </div>
    )
}
