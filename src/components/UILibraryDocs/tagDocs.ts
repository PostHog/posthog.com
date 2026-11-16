import type { DocProp } from './types'

const colorType =
    "'white' | 'gray' | 'brand' | 'blue' | 'cobalt' | 'coral' | 'corn-blue' | 'green' | 'lemon' | 'lime' | 'purple' | 'tangerine' | 'teal' | 'violet' | 'yellow'"

export const tagColorsDescription =
    'Use white (the default) for neutral metadata, gray for a strong neutral label such as Deprecated, and a brand color when the label must stand out. The colors have no fixed meaning. Badge and Chip share these colors.'

export const tagAppearancesDescription =
    'Use solid (the default) for one label that must stand out. Use soft when there are many labels, such as tags in a list. White looks the same in both.'

export const tagPreviewDescription = (name: string): string =>
    `Pass the card content in preview. With href, the ${name} uses PreviewCard, which opens on hover or keyboard focus. Without href, the ${name} is a button and uses Popover, which also opens on click and tap. The content mounts only when the card opens.`

export const tagPreviewNote = (name: string): string =>
    `On a link ${name}, a preview repeats or extends what the link target shows. Do not put actions or required information in it, because touch users do not see it. A ${name} without href can hold them, because its card opens on tap.`

export const tagColorRow: DocProp = {
    name: 'color',
    type: colorType,
    defaultValue: "'white'",
    description: 'Sets the color: white, gray, or a PostHog brand color.',
}

export const tagAppearanceRow: DocProp = {
    name: 'appearance',
    type: "'solid' | 'soft'",
    defaultValue: "'solid'",
    description: 'Sets the fill and border of a color other than white.',
}

export const tagHrefRow = (name: string): DocProp => ({
    name: 'href',
    type: 'string',
    description: `Makes the ${name} a link. It renders the site Link, so internal links open in the app. For an external URL, pass externalNoIcon to open it in a new tab.`,
})

export const tagPreviewRow = (name: string): DocProp => ({
    name: 'preview',
    type: 'ReactNode',
    description: `The content of a card that opens on hover. With href, it is a PreviewCard. Without href, the ${name} becomes a button with a Popover. Load the data for the card inside this content, so the request starts when the card opens.`,
})
