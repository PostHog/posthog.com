export default function lightOrDark(color: string): 'light' | 'dark' {
    if (color === 'rgba(0, 0, 0, 0)') {
        return 'light'
    }
    let r, g, b, hsp
    const colorMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/)
    if (!colorMatch) return 'light'

    r = parseInt(colorMatch[1])
    g = parseInt(colorMatch[2])
    b = parseInt(colorMatch[3])
    hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b))
    return hsp > 127.5 ? 'light' : 'dark'
}
