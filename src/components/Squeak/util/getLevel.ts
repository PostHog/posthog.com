export const LEVELS = [
    {
        threshold: 10,
        label: 'Hoglet',
        color: '#6B7280',
        borderOpacity: '40',
        bgOpacity: '12',
        shimmer: null,
    },
    {
        threshold: 50,
        label: 'Hogthusiast',
        color: '#30ABC6',
        borderOpacity: '60',
        bgOpacity: '18',
        shimmer: null,
    },
    {
        threshold: 100,
        label: 'PowerHog',
        color: '#2F80FA',
        borderOpacity: '80',
        bgOpacity: '20',
        shimmer: { colors: ['#2F80FA', '#30ABC6'], opacity: 0.25 },
    },
    {
        threshold: 200,
        label: 'TopHog',
        color: '#B62AD9',
        borderOpacity: '90',
        bgOpacity: '22',
        shimmer: { colors: ['#B62AD9', '#2F80FA'], opacity: 0.35 },
    },
    {
        threshold: 400,
        label: 'ElderHog',
        color: '#F54E00',
        borderOpacity: 'A0',
        bgOpacity: '28',
        shimmer: { colors: ['#F54E00', '#B62AD9', '#EB9D2A'], opacity: 0.45 },
    },
    {
        threshold: 750,
        label: 'Hogfather',
        color: '#F54E00',
        borderOpacity: 'C0',
        bgOpacity: '30',
        shimmer: { colors: ['#F54E00', '#EB9D2A', '#B62AD9', '#2F80FA'], opacity: 0.55 },
    },
]

export type LevelInfo = {
    label: string
    color: string | null
    borderOpacity: string
    bgOpacity: string
    shimmer: { colors: string[]; opacity: number } | null
}

export default function getLevel(points?: number): LevelInfo | null {
    if (points == null || points < 1) return null
    let level: LevelInfo | null = null
    for (const { threshold, label, color, borderOpacity, bgOpacity, shimmer } of LEVELS) {
        if (points >= threshold) {
            level = { label, color, borderOpacity, bgOpacity, shimmer }
        } else {
            break
        }
    }
    return level
}
