export type EventKind = 'pageview' | 'click' | 'scroll' | 'drag' | 'copy' | 'keypress' | 'rageclick'

interface EventKindStyle {
    label: string
    dotClassName: string
    strokeClassName: string
}

export const EVENT_KINDS: Record<EventKind, EventKindStyle> = {
    pageview: { label: '$pageview', dotClassName: 'bg-blue', strokeClassName: 'stroke-blue' },
    click: { label: 'click', dotClassName: 'bg-orange', strokeClassName: 'stroke-orange' },
    scroll: { label: 'scroll', dotClassName: 'bg-seagreen', strokeClassName: 'stroke-seagreen' },
    drag: { label: 'drag', dotClassName: 'bg-lilac', strokeClassName: 'stroke-lilac' },
    copy: { label: 'copy', dotClassName: 'bg-green', strokeClassName: 'stroke-green' },
    keypress: { label: 'keypress', dotClassName: 'bg-purple', strokeClassName: 'stroke-purple' },
    rageclick: { label: '$rageclick', dotClassName: 'bg-red', strokeClassName: 'stroke-red' },
}

export const SORTING_ORDER: EventKind[] = ['click', 'scroll', 'pageview', 'drag', 'keypress', 'copy', 'rageclick']

export const emptyCounts = (): Record<EventKind, number> => ({
    pageview: 0,
    click: 0,
    scroll: 0,
    drag: 0,
    copy: 0,
    keypress: 0,
    rageclick: 0,
})
