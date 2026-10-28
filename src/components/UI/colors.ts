export type ColorName =
    | 'gray'
    | 'brand'
    | 'blue'
    | 'cobalt'
    | 'coral'
    | 'corn-blue'
    | 'green'
    | 'lemon'
    | 'lime'
    | 'purple'
    | 'tangerine'
    | 'teal'
    | 'violet'
    | 'yellow'

export const colorNames: ColorName[] = [
    'gray',
    'brand',
    'blue',
    'cobalt',
    'coral',
    'corn-blue',
    'green',
    'lemon',
    'lime',
    'purple',
    'tangerine',
    'teal',
    'violet',
    'yellow',
]

export const colorSolid: Record<ColorName, string> = {
    gray: 'bg-[rgb(var(--text-primary))] text-[rgb(var(--bg))]',
    brand: 'bg-orange text-black',
    blue: 'bg-brand-blue text-black',
    cobalt: 'bg-brand-cobalt text-white',
    coral: 'bg-brand-coral text-black',
    'corn-blue': 'bg-brand-corn-blue text-black',
    green: 'bg-brand-green text-black',
    lemon: 'bg-brand-lemon text-black',
    lime: 'bg-brand-lime text-black',
    purple: 'bg-brand-purple text-white',
    tangerine: 'bg-brand-tangerine text-black',
    teal: 'bg-brand-teal text-black',
    violet: 'bg-brand-violet text-white',
    yellow: 'bg-brand-yellow text-black',
}

export const colorSoft: Record<ColorName, string> = {
    gray: 'border-[rgb(var(--text-primary)/0.14)] bg-[rgb(var(--text-primary)/0.06)] text-secondary',
    brand: 'border-orange/40 bg-orange/15 text-[color:color-mix(in_srgb,theme(colors.orange-dark)_62%,black)] dark:text-[color:color-mix(in_srgb,theme(colors.orange)_70%,white)]',
    blue: 'border-brand-blue/40 bg-brand-blue/15 text-[color:color-mix(in_srgb,theme(colors.brand.blue.darker)_62%,black)] dark:text-brand-blue-lighter',
    cobalt: 'border-brand-cobalt/40 bg-brand-cobalt/15 text-[color:color-mix(in_srgb,theme(colors.brand.cobalt.darker)_62%,black)] dark:text-brand-cobalt-lighter',
    coral: 'border-brand-coral/40 bg-brand-coral/15 text-[color:color-mix(in_srgb,theme(colors.brand.coral.darker)_62%,black)] dark:text-brand-coral-lighter',
    'corn-blue':
        'border-brand-corn-blue/40 bg-brand-corn-blue/15 text-[color:color-mix(in_srgb,theme(colors.brand.corn-blue.darker)_62%,black)] dark:text-brand-corn-blue-lighter',
    green: 'border-brand-green/40 bg-brand-green/15 text-[color:color-mix(in_srgb,theme(colors.brand.green.darker)_62%,black)] dark:text-brand-green-lighter',
    lemon: 'border-brand-lemon/40 bg-brand-lemon/15 text-[color:color-mix(in_srgb,theme(colors.brand.lemon.darker)_62%,black)] dark:text-brand-lemon-lighter',
    lime: 'border-brand-lime/40 bg-brand-lime/15 text-[color:color-mix(in_srgb,theme(colors.brand.lime.darker)_62%,black)] dark:text-brand-lime-lighter',
    purple: 'border-brand-purple/40 bg-brand-purple/15 text-[color:color-mix(in_srgb,theme(colors.brand.purple.darker)_62%,black)] dark:text-brand-purple-lighter',
    tangerine:
        'border-brand-tangerine/40 bg-brand-tangerine/15 text-[color:color-mix(in_srgb,theme(colors.brand.tangerine.darker)_62%,black)] dark:text-brand-tangerine-lighter',
    teal: 'border-brand-teal/40 bg-brand-teal/15 text-[color:color-mix(in_srgb,theme(colors.brand.teal.darker)_62%,black)] dark:text-brand-teal-lighter',
    violet: 'border-brand-violet/40 bg-brand-violet/15 text-[color:color-mix(in_srgb,theme(colors.brand.violet.darker)_62%,black)] dark:text-brand-violet-lighter',
    yellow: 'border-brand-yellow/40 bg-brand-yellow/15 text-[color:color-mix(in_srgb,theme(colors.brand.yellow.darker)_62%,black)] dark:text-brand-yellow-lighter',
}

export const colorOpaque: Record<ColorName, string> = {
    gray: 'border-[rgb(var(--text-primary)/0.14)] bg-white dark:bg-accent-dark',
    brand: 'border-orange/40 bg-[color:color-mix(in_srgb,theme(colors.orange)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.orange)_20%,theme(colors.accent-dark))]',
    blue: 'border-brand-blue/40 bg-[color:color-mix(in_srgb,theme(colors.brand.blue.DEFAULT)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.brand.blue.DEFAULT)_20%,theme(colors.accent-dark))]',
    cobalt: 'border-brand-cobalt/40 bg-[color:color-mix(in_srgb,theme(colors.brand.cobalt.DEFAULT)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.brand.cobalt.DEFAULT)_20%,theme(colors.accent-dark))]',
    coral: 'border-brand-coral/40 bg-[color:color-mix(in_srgb,theme(colors.brand.coral.DEFAULT)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.brand.coral.DEFAULT)_20%,theme(colors.accent-dark))]',
    'corn-blue':
        'border-brand-corn-blue/40 bg-[color:color-mix(in_srgb,theme(colors.brand.corn-blue.DEFAULT)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.brand.corn-blue.DEFAULT)_20%,theme(colors.accent-dark))]',
    green: 'border-brand-green/40 bg-[color:color-mix(in_srgb,theme(colors.brand.green.DEFAULT)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.brand.green.DEFAULT)_20%,theme(colors.accent-dark))]',
    lemon: 'border-brand-lemon/40 bg-[color:color-mix(in_srgb,theme(colors.brand.lemon.DEFAULT)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.brand.lemon.DEFAULT)_20%,theme(colors.accent-dark))]',
    lime: 'border-brand-lime/40 bg-[color:color-mix(in_srgb,theme(colors.brand.lime.DEFAULT)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.brand.lime.DEFAULT)_20%,theme(colors.accent-dark))]',
    purple: 'border-brand-purple/40 bg-[color:color-mix(in_srgb,theme(colors.brand.purple.DEFAULT)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.brand.purple.DEFAULT)_20%,theme(colors.accent-dark))]',
    tangerine:
        'border-brand-tangerine/40 bg-[color:color-mix(in_srgb,theme(colors.brand.tangerine.DEFAULT)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.brand.tangerine.DEFAULT)_20%,theme(colors.accent-dark))]',
    teal: 'border-brand-teal/40 bg-[color:color-mix(in_srgb,theme(colors.brand.teal.DEFAULT)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.brand.teal.DEFAULT)_20%,theme(colors.accent-dark))]',
    violet: 'border-brand-violet/40 bg-[color:color-mix(in_srgb,theme(colors.brand.violet.DEFAULT)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.brand.violet.DEFAULT)_20%,theme(colors.accent-dark))]',
    yellow: 'border-brand-yellow/40 bg-[color:color-mix(in_srgb,theme(colors.brand.yellow.DEFAULT)_12%,white)] dark:bg-[color:color-mix(in_srgb,theme(colors.brand.yellow.DEFAULT)_20%,theme(colors.accent-dark))]',
}

export const colorText: Record<ColorName, string> = {
    gray: 'text-primary',
    brand: 'text-[color:color-mix(in_srgb,theme(colors.orange-dark)_62%,black)] dark:text-[color:color-mix(in_srgb,theme(colors.orange)_70%,white)]',
    blue: 'text-[color:color-mix(in_srgb,theme(colors.brand.blue.darker)_62%,black)] dark:text-brand-blue-lighter',
    cobalt: 'text-[color:color-mix(in_srgb,theme(colors.brand.cobalt.darker)_62%,black)] dark:text-brand-cobalt-lighter',
    coral: 'text-[color:color-mix(in_srgb,theme(colors.brand.coral.darker)_62%,black)] dark:text-brand-coral-lighter',
    'corn-blue':
        'text-[color:color-mix(in_srgb,theme(colors.brand.corn-blue.darker)_62%,black)] dark:text-brand-corn-blue-lighter',
    green: 'text-[color:color-mix(in_srgb,theme(colors.brand.green.darker)_62%,black)] dark:text-brand-green-lighter',
    lemon: 'text-[color:color-mix(in_srgb,theme(colors.brand.lemon.darker)_62%,black)] dark:text-brand-lemon-lighter',
    lime: 'text-[color:color-mix(in_srgb,theme(colors.brand.lime.darker)_62%,black)] dark:text-brand-lime-lighter',
    purple: 'text-[color:color-mix(in_srgb,theme(colors.brand.purple.darker)_62%,black)] dark:text-brand-purple-lighter',
    tangerine:
        'text-[color:color-mix(in_srgb,theme(colors.brand.tangerine.darker)_62%,black)] dark:text-brand-tangerine-lighter',
    teal: 'text-[color:color-mix(in_srgb,theme(colors.brand.teal.darker)_62%,black)] dark:text-brand-teal-lighter',
    violet: 'text-[color:color-mix(in_srgb,theme(colors.brand.violet.darker)_62%,black)] dark:text-brand-violet-lighter',
    yellow: 'text-[color:color-mix(in_srgb,theme(colors.brand.yellow.darker)_62%,black)] dark:text-brand-yellow-lighter',
}

export const colorFill: Record<ColorName, string> = {
    gray: 'bg-[rgb(var(--text-primary)/0.5)]',
    brand: 'bg-orange',
    blue: 'bg-brand-blue',
    cobalt: 'bg-brand-cobalt',
    coral: 'bg-brand-coral',
    'corn-blue': 'bg-brand-corn-blue',
    green: 'bg-brand-green',
    lemon: 'bg-brand-lemon',
    lime: 'bg-brand-lime',
    purple: 'bg-brand-purple',
    tangerine: 'bg-brand-tangerine',
    teal: 'bg-brand-teal',
    violet: 'bg-brand-violet',
    yellow: 'bg-brand-yellow',
}

export const colorShimmer: Record<ColorName, string> = {
    gray: 'data-[indeterminate]:from-[rgb(var(--text-primary)/0.15)] data-[indeterminate]:via-[rgb(var(--text-primary)/0.5)] data-[indeterminate]:to-[rgb(var(--text-primary)/0.15)]',
    brand: 'data-[indeterminate]:from-orange/30 data-[indeterminate]:via-orange data-[indeterminate]:to-orange/30',
    blue: 'data-[indeterminate]:from-brand-blue/30 data-[indeterminate]:via-brand-blue data-[indeterminate]:to-brand-blue/30',
    cobalt: 'data-[indeterminate]:from-brand-cobalt/30 data-[indeterminate]:via-brand-cobalt data-[indeterminate]:to-brand-cobalt/30',
    coral: 'data-[indeterminate]:from-brand-coral/30 data-[indeterminate]:via-brand-coral data-[indeterminate]:to-brand-coral/30',
    'corn-blue':
        'data-[indeterminate]:from-brand-corn-blue/30 data-[indeterminate]:via-brand-corn-blue data-[indeterminate]:to-brand-corn-blue/30',
    green: 'data-[indeterminate]:from-brand-green/30 data-[indeterminate]:via-brand-green data-[indeterminate]:to-brand-green/30',
    lemon: 'data-[indeterminate]:from-brand-lemon/30 data-[indeterminate]:via-brand-lemon data-[indeterminate]:to-brand-lemon/30',
    lime: 'data-[indeterminate]:from-brand-lime/30 data-[indeterminate]:via-brand-lime data-[indeterminate]:to-brand-lime/30',
    purple: 'data-[indeterminate]:from-brand-purple/30 data-[indeterminate]:via-brand-purple data-[indeterminate]:to-brand-purple/30',
    tangerine:
        'data-[indeterminate]:from-brand-tangerine/30 data-[indeterminate]:via-brand-tangerine data-[indeterminate]:to-brand-tangerine/30',
    teal: 'data-[indeterminate]:from-brand-teal/30 data-[indeterminate]:via-brand-teal data-[indeterminate]:to-brand-teal/30',
    violet: 'data-[indeterminate]:from-brand-violet/30 data-[indeterminate]:via-brand-violet data-[indeterminate]:to-brand-violet/30',
    yellow: 'data-[indeterminate]:from-brand-yellow/30 data-[indeterminate]:via-brand-yellow data-[indeterminate]:to-brand-yellow/30',
}

export const colorHeader: Record<ColorName, string> = {
    gray: 'border-b-[rgb(var(--text-primary)/0.18)] bg-[rgb(var(--text-primary)/0.1)]',
    brand: 'border-b-orange-dark/40 bg-orange/30 dark:border-b-orange/40',
    blue: 'border-b-brand-blue-darker/40 bg-brand-blue/30 dark:border-b-brand-blue/40',
    cobalt: 'border-b-brand-cobalt-darker/40 bg-brand-cobalt/30 dark:border-b-brand-cobalt/40',
    coral: 'border-b-brand-coral-darker/40 bg-brand-coral/30 dark:border-b-brand-coral/40',
    'corn-blue': 'border-b-brand-corn-blue-darker/40 bg-brand-corn-blue/30 dark:border-b-brand-corn-blue/40',
    green: 'border-b-brand-green-darker/40 bg-brand-green/30 dark:border-b-brand-green/40',
    lemon: 'border-b-brand-lemon-darker/40 bg-brand-lemon/30 dark:border-b-brand-lemon/40',
    lime: 'border-b-brand-lime-darker/40 bg-brand-lime/30 dark:border-b-brand-lime/40',
    purple: 'border-b-brand-purple-darker/40 bg-brand-purple/30 dark:border-b-brand-purple/40',
    tangerine: 'border-b-brand-tangerine-darker/40 bg-brand-tangerine/30 dark:border-b-brand-tangerine/40',
    teal: 'border-b-brand-teal-darker/40 bg-brand-teal/30 dark:border-b-brand-teal/40',
    violet: 'border-b-brand-violet-darker/40 bg-brand-violet/30 dark:border-b-brand-violet/40',
    yellow: 'border-b-brand-yellow-darker/40 bg-brand-yellow/30 dark:border-b-brand-yellow/40',
}

export const colorIcon: Record<ColorName, string> = {
    gray: 'text-secondary',
    brand: 'text-orange-dark dark:text-orange',
    blue: 'text-brand-blue-darker dark:text-brand-blue-lighter',
    cobalt: 'text-brand-cobalt-darker dark:text-brand-cobalt-lighter',
    coral: 'text-brand-coral-darker dark:text-brand-coral-lighter',
    'corn-blue': 'text-brand-corn-blue-darker dark:text-brand-corn-blue-lighter',
    green: 'text-brand-green-darker dark:text-brand-green',
    lemon: 'text-brand-lemon-darker dark:text-brand-lemon',
    lime: 'text-brand-lime-darker dark:text-brand-lime',
    purple: 'text-brand-purple-darker dark:text-brand-purple-lighter',
    tangerine: 'text-brand-tangerine-darker dark:text-brand-tangerine-lighter',
    teal: 'text-brand-teal-darker dark:text-brand-teal',
    violet: 'text-brand-violet-darker dark:text-brand-violet-lighter',
    yellow: 'text-brand-yellow-darker dark:text-brand-yellow',
}

export const colorEmphasis: Record<ColorName, string> = {
    gray: 'bg-[rgb(var(--text-primary)/0.06)] text-primary dark:bg-[rgb(var(--text-primary)/0.1)]',
    brand: 'bg-orange/15 text-orange-dark dark:bg-orange/20 dark:text-orange',
    blue: 'bg-brand-blue/15 text-brand-blue-darker dark:bg-brand-blue/20 dark:text-brand-blue-lighter',
    cobalt: 'bg-brand-cobalt/15 text-brand-cobalt-darker dark:bg-brand-cobalt/20 dark:text-brand-cobalt-lighter',
    coral: 'bg-brand-coral/15 text-brand-coral-darker dark:bg-brand-coral/20 dark:text-brand-coral-lighter',
    'corn-blue':
        'bg-brand-corn-blue/15 text-brand-corn-blue-darker dark:bg-brand-corn-blue/20 dark:text-brand-corn-blue-lighter',
    green: 'bg-brand-green/15 text-brand-green-darker dark:bg-brand-green/20 dark:text-brand-green',
    lemon: 'bg-brand-lemon/15 text-brand-lemon-darker dark:bg-brand-lemon/20 dark:text-brand-lemon',
    lime: 'bg-brand-lime/15 text-brand-lime-darker dark:bg-brand-lime/20 dark:text-brand-lime',
    purple: 'bg-brand-purple/15 text-brand-purple-darker dark:bg-brand-purple/20 dark:text-brand-purple-lighter',
    tangerine:
        'bg-brand-tangerine/15 text-brand-tangerine-darker dark:bg-brand-tangerine/20 dark:text-brand-tangerine-lighter',
    teal: 'bg-brand-teal/15 text-brand-teal-darker dark:bg-brand-teal/20 dark:text-brand-teal',
    violet: 'bg-brand-violet/15 text-brand-violet-darker dark:bg-brand-violet/20 dark:text-brand-violet-lighter',
    yellow: 'bg-brand-yellow/15 text-brand-yellow-darker dark:bg-brand-yellow/20 dark:text-brand-yellow',
}

export const colorStroke: Record<ColorName, string> = {
    gray: 'text-current',
    brand: 'text-orange',
    blue: 'text-brand-blue',
    cobalt: 'text-brand-cobalt',
    coral: 'text-brand-coral',
    'corn-blue': 'text-brand-corn-blue',
    green: 'text-brand-green',
    lemon: 'text-brand-lemon',
    lime: 'text-brand-lime',
    purple: 'text-brand-purple',
    tangerine: 'text-brand-tangerine',
    teal: 'text-brand-teal',
    violet: 'text-brand-violet',
    yellow: 'text-brand-yellow',
}

export const colorHighlight: Record<ColorName, string> = {
    gray: 'text-[rgb(var(--text-primary)/0.15)]',
    brand: 'text-orange/30',
    blue: 'text-brand-blue/30',
    cobalt: 'text-brand-cobalt/30',
    coral: 'text-brand-coral/30',
    'corn-blue': 'text-brand-corn-blue/30',
    green: 'text-brand-green/30',
    lemon: 'text-brand-lemon/30',
    lime: 'text-brand-lime/30',
    purple: 'text-brand-purple/30',
    tangerine: 'text-brand-tangerine/30',
    teal: 'text-brand-teal/30',
    violet: 'text-brand-violet/30',
    yellow: 'text-brand-yellow/30',
}

export const colorInk: Record<ColorName, string> = {
    gray: 'text-secondary',
    brand: 'text-orange-dark dark:text-orange',
    blue: 'text-brand-blue-darker dark:text-brand-blue-lighter',
    cobalt: 'text-brand-cobalt-darker dark:text-brand-cobalt-lighter',
    coral: 'text-brand-coral-darker dark:text-brand-coral-lighter',
    'corn-blue': 'text-brand-corn-blue-darker dark:text-brand-corn-blue-lighter',
    green: 'text-brand-green-darker dark:text-brand-green',
    lemon: 'text-brand-lemon-darker dark:text-brand-lemon',
    lime: 'text-brand-lime-darker dark:text-brand-lime',
    purple: 'text-brand-purple-darker dark:text-brand-purple-lighter',
    tangerine: 'text-brand-tangerine-darker dark:text-brand-tangerine-lighter',
    teal: 'text-brand-teal-darker dark:text-brand-teal',
    violet: 'text-brand-violet-darker dark:text-brand-violet-lighter',
    yellow: 'text-brand-yellow-darker dark:text-brand-yellow',
}

export type StatusAlias = 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'brand'

export const statusColors: Record<StatusAlias, ColorName> = {
    neutral: 'gray',
    info: 'blue',
    success: 'green',
    warning: 'yellow',
    error: 'coral',
    brand: 'brand',
}

export type ColorOrStatus = ColorName | StatusAlias

export const isStatusAlias = (value: unknown): value is StatusAlias =>
    typeof value === 'string' && Object.prototype.hasOwnProperty.call(statusColors, value)

export const isColorOrStatus = (value: unknown): value is ColorOrStatus =>
    isStatusAlias(value) || (typeof value === 'string' && (colorNames as string[]).includes(value))

export const resolveColor = (value: ColorOrStatus): ColorName => (isStatusAlias(value) ? statusColors[value] : value)
