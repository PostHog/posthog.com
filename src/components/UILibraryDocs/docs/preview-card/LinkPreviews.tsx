import React from 'react'
import { Link as GatsbyLink } from 'gatsby'
import { PreviewCard } from 'components/UI/PreviewCard'

export default function PreviewCardLinkPreviews(): JSX.Element {
    return (
        <p className="m-0 text-[15px]">
            Watch real users with{' '}
            <PreviewCard.Root>
                <PreviewCard.Trigger render={<GatsbyLink to="/session-replay" />}>session replay</PreviewCard.Trigger>
                <PreviewCard.Popup className="w-64">
                    <PreviewCard.Arrow />
                    <span className="block text-[15px] font-bold leading-snug">Session replay</span>
                    <span className="mt-1 block text-sm text-secondary">
                        Watch recordings of real user sessions to see where people get stuck.
                    </span>
                </PreviewCard.Popup>
            </PreviewCard.Root>
            , then roll out the fix with{' '}
            <PreviewCard.Root>
                <PreviewCard.Trigger render={<GatsbyLink to="/feature-flags" />}>feature flags</PreviewCard.Trigger>
                <PreviewCard.Popup className="w-64">
                    <PreviewCard.Arrow />
                    <span className="block text-[15px] font-bold leading-snug">Feature flags</span>
                    <span className="mt-1 block text-sm text-secondary">
                        Release features to specific users or groups, and roll them back without a deploy.
                    </span>
                </PreviewCard.Popup>
            </PreviewCard.Root>
            .
        </p>
    )
}
