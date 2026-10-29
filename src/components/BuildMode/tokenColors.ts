/**
 * Colors are read off a probe element carrying the token classes and handed back as hex, rather than
 * duplicated here as literals.
 *
 * The probe has to be mounted inside the clicked element's subtree. Semantic tokens resolve through
 * `--text-*` custom properties scoped to a `[data-scheme]` ancestor, so a probe parked on
 * `document.body` sits outside the theme and resolves to whatever `body` happens to inherit.
 */
export function resolveTokenColors(classNames: string[], context: HTMLElement): string[] {
    const probe = document.createElement('span')
    probe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;visibility:hidden'
    context.appendChild(probe)
    const colors = classNames.map((className) => {
        probe.className = className
        const [r, g, b] = getComputedStyle(probe).color.match(/\d+/g)?.map(Number) ?? [0, 0, 0]
        return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
    })
    probe.remove()
    return colors
}
