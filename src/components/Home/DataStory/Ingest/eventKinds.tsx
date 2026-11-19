import React from 'react'
import { IconBolt, IconCopy, IconCursorClick, IconEye, IconPlay } from '@posthog/icons'

export type EventKind = 'pageview' | 'autocapture' | 'rageclick' | 'copy' | 'snapshot'

interface EventKindStyle {
    event: string
    color: string
    Icon: React.ComponentType<{ className?: string }>
}

export const EVENT_KINDS: Record<EventKind, EventKindStyle> = {
    pageview: { event: '$pageview', color: '#2F80FA', Icon: IconEye },
    autocapture: {
        event: '$autocapture',
        color: '#EB9D2A',
        Icon: IconCursorClick,
    },
    snapshot: {
        event: '$snapshot',
        color: '#B62AD9',
        Icon: IconPlay,
    },
    copy: { event: '$copy_autocapture', color: '#6AA84F', Icon: IconCopy },
    rageclick: { event: '$rageclick', color: '#F54E00', Icon: IconBolt },
}

const tileBorder = (color: string): string => `color-mix(in srgb, ${color} 70%, black)`

export const EventTile = ({ kind }: { kind: EventKind }) => {
    const { color, Icon } = EVENT_KINDS[kind]
    return (
        <span
            className="flex size-5 shrink-0 items-center justify-center rounded-[5px] border text-white shadow-sm"
            style={{ backgroundColor: color, borderColor: tileBorder(color) }}
        >
            <Icon className="size-3" />
        </span>
    )
}
