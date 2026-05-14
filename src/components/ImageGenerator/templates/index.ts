import type { ComponentType } from 'react'
import EventSquare from './event/square'
import EventOG from './event/og'
import type { Aspect, GeneratorState, TemplateId } from '../types'

export const CANVAS_DIMENSIONS: Record<Aspect, { width: number; height: number }> = {
    square: { width: 1200, height: 1200 },
    og: { width: 1200, height: 630 },
}

export const TEMPLATE_LABELS: Record<TemplateId, string> = {
    event: 'Event poster',
}

type TemplateComponent = ComponentType<{ state: GeneratorState }>

export const TEMPLATE_COMPONENTS: Record<TemplateId, Record<Aspect, TemplateComponent>> = {
    event: {
        square: EventSquare,
        og: EventOG,
    },
}
