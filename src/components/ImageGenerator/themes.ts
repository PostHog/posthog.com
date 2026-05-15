import resolveConfig from 'tailwindcss/resolveConfig'
import type { Theme, ThemeMode } from './types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindConfig = require('../../../tailwind.config.js')

const fullConfig = resolveConfig(tailwindConfig as any)
const themeColors = (fullConfig.theme as any).colors as Record<string, string>

export const THEME_NAMES = [
    'blue',
    'yellow',
    'teal',
    'purple',
    'coral',
    'tangerine',
    'lime',
    'green',
    'violet',
    'cobalt',
    'salmon',
] as const

export const THEME_MODES: ThemeMode[] = ['solid', 'gradient']

export function getThemeHex(name: string): string | undefined {
    return themeColors[name]
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
    let cleaned = hex.replace('#', '')
    if (cleaned.length === 3) {
        cleaned = cleaned
            .split('')
            .map((c) => c + c)
            .join('')
    }
    const r = parseInt(cleaned.slice(0, 2), 16) / 255
    const g = parseInt(cleaned.slice(2, 4), 16) / 255
    const b = parseInt(cleaned.slice(4, 6), 16) / 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min
    let h = 0
    let s = 0
    const l = (max + min) / 2
    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
        switch (max) {
            case r:
                h = ((g - b) / delta + (g < b ? 6 : 0)) * 60
                break
            case g:
                h = ((b - r) / delta + 2) * 60
                break
            case b:
                h = ((r - g) / delta + 4) * 60
                break
        }
    }
    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function getThemeBackground(theme: Theme): string {
    const hex = getThemeHex(theme.name)
    if (!hex) return '#000'
    if (theme.mode === 'solid') return hex
    const { h, s, l } = hexToHsl(hex)
    const bottomL = Math.max(l - 10, 0)
    return `linear-gradient(to bottom, hsl(${h}, ${s}%, ${l}%), hsl(${h}, ${s}%, ${bottomL}%))`
}

export function getThemeStyle(theme: Theme): React.CSSProperties {
    const bg = getThemeBackground(theme)
    return bg.startsWith('linear-gradient') ? { background: bg } : { backgroundColor: bg }
}

export function getThemeForeground(theme: Theme): string {
    const hex = getThemeHex(theme.name)
    if (!hex) return '#fff'
    const { l } = hexToHsl(hex)
    return l > 65 ? '#F54E00' : '#fff'
}

function colorDistance(a: { h: number; s: number; l: number }, b: { h: number; s: number; l: number }): number {
    const hueDiff = Math.min(Math.abs(a.h - b.h), 360 - Math.abs(a.h - b.h))
    const satDiff = a.s - b.s
    const litDiff = a.l - b.l
    return Math.sqrt(hueDiff * hueDiff * 2 + satDiff * satDiff + litDiff * litDiff)
}

export function suggestThemeFromHex(sourceHex: string): Theme {
    const source = hexToHsl(sourceHex)
    let best: { name: string; distance: number } | null = null
    for (const name of THEME_NAMES) {
        const hex = getThemeHex(name)
        if (!hex) continue
        const distance = colorDistance(source, hexToHsl(hex))
        if (!best || distance < best.distance) best = { name, distance }
    }
    return { name: best?.name || 'blue', mode: 'solid' }
}

export function getAllThemes(): Theme[] {
    const themes: Theme[] = []
    for (const name of THEME_NAMES) {
        for (const mode of THEME_MODES) themes.push({ name, mode })
    }
    return themes
}

export function pickRandomTheme(seed: number): Theme {
    const all = getAllThemes()
    return all[seed % all.length]
}
