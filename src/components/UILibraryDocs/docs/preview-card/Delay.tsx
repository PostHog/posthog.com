import React from 'react'
import { PreviewCard } from 'components/UI/PreviewCard'

const OPEN_DELAY_MS = 200

export default function PreviewCardDelay(): JSX.Element {
    return (
        <p className="m-0 text-[15px]">
            The code for this website is on{' '}
            <PreviewCard.Root>
                <PreviewCard.Trigger
                    href="https://github.com/PostHog/posthog.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    delay={OPEN_DELAY_MS}
                >
                    GitHub
                </PreviewCard.Trigger>
                <PreviewCard.Popup className="w-64">
                    <PreviewCard.Arrow />
                    <span className="block text-[15px] font-bold leading-snug">PostHog/posthog.com</span>
                    <span className="mt-1 block text-sm text-secondary">
                        The Gatsby site, the docs, and the handbook. Anyone can open a pull request.
                    </span>
                </PreviewCard.Popup>
            </PreviewCard.Root>
            .
        </p>
    )
}
