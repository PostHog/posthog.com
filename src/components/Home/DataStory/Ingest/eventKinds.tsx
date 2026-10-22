import React from 'react'
import { cn } from '../../../../utils'
import { IconBolt, IconCopy, IconCursorClick, IconEye, IconPlay } from '@posthog/icons'

export type EventKind = 'pageview' | 'autocapture' | 'rageclick' | 'copy' | 'snapshot'

interface EventKindStyle {
    event: string
    description: string
    color: string
    Icon: React.ComponentType<{ className?: string }>
}

export const EVENT_KINDS: Record<EventKind, EventKindStyle> = {
    pageview: { event: '$pageview', description: 'page views', color: '#2F80FA', Icon: IconEye },
    autocapture: {
        event: '$autocapture',
        description: 'clicks and inputs',
        color: '#EB9D2A',
        Icon: IconCursorClick,
    },
    snapshot: {
        event: '$snapshot',
        description: 'session replay',
        color: '#B62AD9',
        Icon: IconPlay,
    },
    copy: { event: '$copy_autocapture', description: 'copied text', color: '#6AA84F', Icon: IconCopy },
    rageclick: { event: '$rageclick', description: 'frustrated clicks', color: '#F54E00', Icon: IconBolt },
}

const tileBorder = (color: string): string => `color-mix(in srgb, ${color} 70%, black)`

export const EventTile = ({ kind, className }: { kind: EventKind; className?: string }) => {
    const { color, Icon } = EVENT_KINDS[kind]
    return (
        <span
            className={cn(
                'flex size-5 shrink-0 items-center justify-center rounded-[5px] border text-white shadow-sm',
                className
            )}
            style={{ backgroundColor: color, borderColor: tileBorder(color) }}
        >
            <Icon className="size-3" />
        </span>
    )
}
