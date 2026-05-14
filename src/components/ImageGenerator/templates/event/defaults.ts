import type { GeneratorState } from '../../types'
import { pickRandomTheme } from '../../themes'

export function eventDefaults(): GeneratorState {
    return {
        template: 'event',
        aspect: 'square',
        theme: pickRandomTheme(Math.floor(Math.random() * 22)),
        title: { content: 'Event title goes here', maxWidth: 80 },
        text: { content: '', maxWidth: 70 },
        image: {
            source: null,
            size: 100,
            x: 0,
            y: 0,
            rotation: 0,
        },
        logos: [
            {
                id: 'default',
                type: 'posthog',
                variant: 'landscape',
                color: 'mono-white',
                sizePx: 120,
            },
        ],
        logoPlacement: 'inline',
        logoArrangement: { direction: 'row', gap: 32 },
        event: {
            date: undefined,
            time: undefined,
            showCalendar: true,
        },
    }
}
