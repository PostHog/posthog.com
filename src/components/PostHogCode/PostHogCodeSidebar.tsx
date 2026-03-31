import React from 'react'
import { useLocation } from '@reach/router'
import OSButton from 'components/OSButton'
import { IconBolt, IconBook, IconHome, IconQuestion, IconWrench } from '@posthog/icons'

/** `id` values match on-page section anchors (`#overview`, etc.). */
const NAV_ITEMS = [
    { id: 'overview', name: 'Overview', icon: IconHome },
    { id: 'maintenance-and-build', name: 'Maintenance & build', icon: IconWrench },
    { id: 'signals', name: 'Signals', icon: IconBolt },
    { id: 'get-started', name: 'Get started', icon: IconBook },
    { id: 'faq', name: 'FAQ', icon: IconQuestion },
] as const

export function PostHogCodeSidebar() {
    const { pathname, hash } = useLocation()
    const onPostHogCodePage = pathname.replace(/\/$/, '') === '/posthog-code'
    const activeId = !onPostHogCodePage ? null : !hash ? 'overview' : hash.replace(/^#/, '')

    return (
        <div className="not-prose space-y-px">
            <div className="text-muted text-sm py-0.5 !mt-0 ml-2">PostHog Code</div>
            {NAV_ITEMS.map((item) => {
                const Icon = item.icon
                const active = activeId === item.id
                return (
                    <OSButton
                        key={item.id}
                        active={active}
                        align="left"
                        width="full"
                        size="md"
                        hover="background"
                        asLink
                        to={`/posthog-code#${item.id}`}
                        icon={<Icon className="size-4 text-brown" />}
                    >
                        {item.name}
                    </OSButton>
                )
            })}
        </div>
    )
}
