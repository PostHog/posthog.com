import type { GeneratorState, LogoColor } from '../../types'
import { getThemeForeground, pickRandomTheme } from '../../themes'

export function eventDefaults(): GeneratorState {
    const theme = pickRandomTheme(Math.floor(Math.random() * 22))
    const fg = getThemeForeground(theme)
    const logoColor: LogoColor = fg === '#fff' ? 'mono-white' : 'mono-black'
    return {
        template: 'event',
        aspect: 'square',
        theme,
        title: { content: 'Event title goes here', maxWidth: 70 },
        text: { content: '', maxWidth: 60 },
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
                color: logoColor,
                sizePx: 60,
            },
        ],
        logoPlacement: 'overlay',
        logoArrangement: { direction: 'row', gap: 48 },
        event: {
            date: undefined,
            time: undefined,
            showCalendar: true,
        },
    }
}
