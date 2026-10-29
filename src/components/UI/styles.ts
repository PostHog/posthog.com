import './grain.css'

export const grainSurface = 'ui-grain'

export const flatHover =
    'transition-colors duration-150 ease-out hover:bg-[rgb(var(--text-primary)/0.06)] motion-reduce:transition-none'

export const flatPressable = `${flatHover} [&:not([data-disabled]):not([aria-disabled=true]):active]:bg-[rgb(var(--text-primary)/0.12)]`

export const focusRing =
    'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--text-primary))]'

export const insetFocusRing =
    'outline-none focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[rgb(var(--text-primary))]'

export const overlayShadowSm =
    'shadow-[0_1px_2px_rgb(0_0_0/0.08),0_4px_12px_-2px_rgb(0_0_0/0.14)] dark:shadow-[0_1px_2px_rgb(0_0_0/0.4),0_4px_12px_-2px_rgb(0_0_0/0.5)]'

export const overlayShadowMd =
    'shadow-[0_10px_38px_-10px_rgba(22,23,24,0.35),0_10px_20px_-15px_rgba(22,23,24,0.2)] dark:shadow-[0_10px_38px_-10px_rgb(0_0_0/0.7),0_10px_20px_-15px_rgb(0_0_0/0.5)]'

export const raisedOverlayShadowMd =
    'shadow-[0_1px_0_rgb(var(--border)),0_10px_38px_-10px_rgba(22,23,24,0.35),0_10px_20px_-15px_rgba(22,23,24,0.2)] dark:shadow-[0_1px_0_rgb(var(--border)),0_10px_38px_-10px_rgb(0_0_0/0.7),0_10px_20px_-15px_rgb(0_0_0/0.5)]'

export const overlayShadowLg =
    'shadow-[0_24px_64px_-12px_rgb(0_0_0/0.35),0_12px_24px_-12px_rgb(0_0_0/0.25)] dark:shadow-[0_24px_64px_-12px_rgb(0_0_0/0.7),0_12px_24px_-12px_rgb(0_0_0/0.5)]'

export const popupSurface = `${grainSurface} relative rounded-md border border-primary bg-primary text-primary outline-none ${raisedOverlayShadowMd}`

export const popupTransition =
    'origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] data-[ending-style]:duration-100 data-[starting-style]:scale-95 data-[starting-style]:opacity-0 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 motion-reduce:transition-none data-[instant=group]:transition-none data-[instant=trigger-change]:transition-none'

export const surfaceDivider = 'border-[rgb(var(--text-primary)/0.14)]'

export const sectionSurface = `rounded-[8px] border ${surfaceDivider}`

export const heightRevealPanel =
    'h-[var(--collapsible-panel-height)] overflow-hidden transition-[height] duration-200 ease-out data-[starting-style]:h-0 data-[ending-style]:h-0 motion-reduce:transition-none'

export const cardBarSurface =
    'border-[rgb(var(--text-primary)/0.12)] bg-[rgb(var(--text-primary)/0.045)] dark:bg-white/[0.035]'

export const cardLevels = {
    1: `${grainSurface} [--ui-card-radius:8px] rounded-[var(--ui-card-radius)] border border-[rgb(var(--text-primary)/0.13)] bg-white/60 shadow-[0_1px_0_rgb(0_0_0/0.05),0_1px_2px_-1px_rgb(0_0_0/0.08)] dark:border-[rgb(var(--text-primary)/0.12)] dark:bg-white/[0.06] dark:shadow-[0_1px_0_rgb(0_0_0/0.3)]`,
    2: `${grainSurface} [--ui-card-radius:6px] rounded-[var(--ui-card-radius)] border border-[rgb(var(--text-primary)/0.1)] bg-[rgb(var(--text-primary)/0.035)] shadow-[inset_0_1px_0_rgb(0_0_0/0.08)] dark:bg-black/20 dark:shadow-[inset_0_1px_0_rgb(0_0_0/0.4)]`,
} as const

export const cardInnerTopRadius = 'rounded-t-[calc(var(--ui-card-radius)_-_1px)]'

export const cardInnerBottomRadius = 'rounded-b-[calc(var(--ui-card-radius)_-_1px)]'

export const cardAppearances = {
    glass: '',
    solid: 'bg-white dark:bg-accent-dark dark:[background-image:linear-gradient(rgb(255_255_255/0.025),rgb(255_255_255/0.025))]',
    dashed: 'border-dashed border-[rgb(var(--text-primary)/0.28)] dark:border-[rgb(var(--text-primary)/0.28)]',
} as const

export const surfaceAppearances = {
    plain: '',
    outlined: sectionSurface,
    raised: cardLevels[1],
} as const

export type SurfaceAppearance = keyof typeof surfaceAppearances

export const surfacePaddings = {
    none: 'gap-0 p-0',
    sm: 'gap-2 p-3',
    md: 'gap-3 p-4',
    lg: 'gap-4 p-6',
} as const

export const positionerLayer = 'z-50 outline-none'

export const popupArrow =
    "relative block h-1.5 w-3 overflow-clip data-[side=bottom]:top-[-6px] data-[side=left]:right-[-9px] data-[side=left]:rotate-90 data-[side=right]:left-[-9px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-6px] data-[side=top]:rotate-180 before:absolute before:bottom-0 before:left-1/2 before:h-[calc(6px*1.4142)] before:w-[calc(6px*1.4142)] before:border before:border-primary before:bg-primary before:content-[''] before:[transform:translate(-50%,50%)_rotate(45deg)]"

export const disclosureChevron =
    'size-4 shrink-0 text-secondary transition-transform duration-150 ease-out group-data-[panel-open]:rotate-90 motion-reduce:transition-none'

export const menuPopup = `${popupSurface} ${popupTransition} min-w-[180px] max-h-[var(--available-height)] overflow-y-auto p-[5px]`

export const menuItem =
    'relative flex h-[25px] cursor-default select-none items-center gap-2 rounded px-2.5 text-[13px] leading-none text-primary outline-none data-[highlighted]:bg-accent data-[disabled]:pointer-events-none data-[disabled]:text-muted'

export const menuItemWithIndicator = `${menuItem} pl-7`

export const menuItemIndicator = 'absolute left-2 flex items-center justify-center'

export const menubarAppearances = {
    outlined: `flex w-fit items-center gap-px px-1 py-0.5 ${sectionSurface}`,
    plain: 'flex items-center gap-px py-0.5',
} as const

export const menubarTrigger =
    'flex select-none items-center gap-0.5 rounded px-1.5 py-0.5 text-[13px] font-medium leading-none text-primary outline-none transition-colors duration-150 hover:bg-[rgb(var(--text-primary)/0.07)] focus-visible:bg-[rgb(var(--text-primary)/0.07)] data-[popup-open]:bg-[rgb(var(--text-primary)/0.1)] data-[disabled]:text-muted motion-reduce:transition-none'

export const menuSeparator = 'm-[5px] h-px bg-border'

export const menuGroupLabel =
    'select-none px-2.5 pb-1 pt-1.5 text-[11px] font-semibold uppercase leading-none tracking-wide text-muted'

export const fieldDivider = 'border-[rgb(var(--text-primary)/0.16)]'

export const controlSurface =
    'border border-[rgb(var(--text-primary)/0.16)] bg-white/50 shadow-[inset_0_1px_0_rgb(0_0_0/0.2)] dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgb(0_0_0/0.4)]'

export const fieldSurface = `${controlSurface} rounded-md transition-[border-color,box-shadow,background-color] duration-150 ease-out hover:border-[rgb(var(--text-primary)/0.36)] motion-reduce:transition-none`

export const fieldFocusVisible =
    'focus-visible:border-orange focus-visible:bg-white/70 focus-visible:shadow-[inset_0_1px_0_rgb(0_0_0/0.2),0_0_0_3px_rgb(235_157_42/0.28)] dark:focus-visible:bg-white/[0.11] dark:focus-visible:shadow-[inset_0_1px_0_rgb(0_0_0/0.4),0_0_0_3px_rgb(235_157_42/0.3)]'

export const fieldFocusWithin =
    'has-[:focus-visible]:border-orange has-[:focus-visible]:bg-white/70 has-[:focus-visible]:shadow-[inset_0_1px_0_rgb(0_0_0/0.2),0_0_0_3px_rgb(235_157_42/0.28)] dark:has-[:focus-visible]:bg-white/[0.11] dark:has-[:focus-visible]:shadow-[inset_0_1px_0_rgb(0_0_0/0.4),0_0_0_3px_rgb(235_157_42/0.3)]'

export const disabledHatch =
    '[&[data-disabled]:not([aria-busy=true])]:bg-[repeating-linear-gradient(135deg,rgb(var(--text-primary)/0.08)_0_1px,transparent_1px_6px)]'

export const fieldState = `data-[disabled]:cursor-not-allowed data-[disabled]:border-dashed data-[disabled]:border-[rgb(var(--text-primary)/0.3)] data-[disabled]:bg-transparent ${disabledHatch} data-[disabled]:opacity-70 data-[disabled]:shadow-none dark:data-[disabled]:bg-transparent dark:data-[disabled]:shadow-none data-[invalid]:border-red dark:data-[invalid]:border-yellow`

export const formsPluginReset = 'focus:outline-none focus:ring-0 focus:ring-offset-0'

export const scrollbarHidden = '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden'

export const plainCode = 'block rounded-none border-0 bg-transparent p-0 font-normal [user-select:text]'

export const placeholderText = 'placeholder:text-muted dark:placeholder:text-[rgb(var(--text-primary)/0.5)]'

export const touchFieldText = '[@media(pointer:coarse)]:text-[16px]'

const textInputBase = `${fieldState} ${formsPluginReset} h-9 w-full px-2.5 py-0 text-sm text-primary ${placeholderText} ${touchFieldText}`

export const textInput = `${fieldSurface} ${fieldFocusVisible} ${textInputBase}`

export type FieldAppearance = 'inset' | 'line'

const fieldTransition =
    'transition-[border-color,box-shadow,background-color] duration-150 ease-out motion-reduce:transition-none'

const fieldAppearanceSurfaces: Record<FieldAppearance, string> = {
    inset: fieldSurface,
    line: `border-0 border-b border-[rgb(var(--text-primary)/0.24)] bg-transparent hover:border-[rgb(var(--text-primary)/0.45)] ${fieldTransition}`,
}

const fieldAppearanceFocusVisible: Record<FieldAppearance, string> = {
    inset: fieldFocusVisible,
    line: 'focus-visible:border-orange focus-visible:shadow-[0_1px_0_rgb(235_157_42)]',
}

const fieldAppearanceFocusWithin: Record<FieldAppearance, string> = {
    inset: fieldFocusWithin,
    line: 'has-[:focus-visible]:border-orange has-[:focus-visible]:shadow-[0_1px_0_rgb(235_157_42)]',
}

export const fieldAppearanceShape: Record<FieldAppearance, string> = {
    inset: '',
    line: 'rounded-none px-0 [&[data-disabled]:not([aria-busy=true])]:bg-none',
}

export const fieldTriggerSurface = (appearance: FieldAppearance): string =>
    `${fieldAppearanceSurfaces[appearance]} ${fieldAppearanceFocusVisible[appearance]} ${fieldState}`

export const fieldGroupSurface = (appearance: FieldAppearance): string =>
    `${fieldAppearanceSurfaces[appearance]} ${fieldAppearanceFocusWithin[appearance]} ${fieldState}`

export const textInputFor = (appearance: FieldAppearance): string =>
    `${fieldAppearanceSurfaces[appearance]} ${fieldAppearanceFocusVisible[appearance]} ${textInputBase}`

export const bareInput = `${formsPluginReset} min-w-0 flex-1 self-stretch border-0 bg-transparent p-0 text-sm text-primary shadow-none outline-none ${placeholderText} focus:border-0 focus:shadow-none ${touchFieldText}`

const inputGroupBase = `${fieldState} flex min-h-8 w-full cursor-text items-center gap-0.5 px-1 text-sm text-primary`

export const inputGroup = `${fieldSurface} ${fieldFocusWithin} ${inputGroupBase}`

export const inputGroupFor = (appearance: FieldAppearance): string =>
    `${fieldAppearanceSurfaces[appearance]} ${fieldAppearanceFocusWithin[appearance]} ${inputGroupBase}`

export const liquidGlassSurface = `bg-white/45 text-black backdrop-blur-xl backdrop-saturate-[1.8] shadow-[inset_0_1px_0_rgb(255_255_255/0.75),inset_0_0_0_1px_rgb(255_255_255/0.4),0_6px_18px_-6px_rgb(0_0_0/0.25)] dark:bg-black/30 dark:text-white dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.22),inset_0_0_0_1px_rgb(255_255_255/0.12),0_6px_18px_-6px_rgb(0_0_0/0.6)]`

export type SearchAppearance = FieldAppearance | 'pill' | 'floating'

const searchRoundSurfaces: Record<'pill' | 'floating', string> = {
    pill: `rounded-full border border-[rgb(var(--text-primary)/0.14)] bg-white/60 shadow-[0_1px_2px_rgb(0_0_0/0.05)] hover:border-[rgb(var(--text-primary)/0.28)] dark:bg-white/[0.08] dark:shadow-none ${fieldTransition} has-[:focus-visible]:border-orange has-[:focus-visible]:bg-white/80 has-[:focus-visible]:shadow-[0_1px_2px_rgb(0_0_0/0.05),0_0_0_3px_rgb(235_157_42/0.22)] dark:has-[:focus-visible]:bg-white/[0.11] dark:has-[:focus-visible]:shadow-[0_0_0_3px_rgb(235_157_42/0.3)]`,
    floating: `rounded-full border-0 ${liquidGlassSurface} transition-[background-color,box-shadow] duration-150 ease-out hover:bg-white/55 has-[:focus-visible]:bg-white/65 has-[:focus-visible]:shadow-[inset_0_1px_0_rgb(255_255_255/0.75),inset_0_0_0_1px_rgb(255_255_255/0.4),0_6px_18px_-6px_rgb(0_0_0/0.25),0_0_0_3px_rgb(235_157_42/0.35)] dark:hover:bg-black/40 dark:has-[:focus-visible]:bg-black/45 dark:has-[:focus-visible]:shadow-[inset_0_1px_0_rgb(255_255_255/0.22),inset_0_0_0_1px_rgb(255_255_255/0.12),0_6px_18px_-6px_rgb(0_0_0/0.6),0_0_0_3px_rgb(235_157_42/0.4)] motion-reduce:transition-none`,
}

export const searchGroupFor = (appearance: SearchAppearance): string =>
    appearance === 'pill' || appearance === 'floating'
        ? `${searchRoundSurfaces[appearance]} ${inputGroupBase}`
        : inputGroupFor(appearance)

export const trackSurface =
    'bg-white/50 shadow-[inset_0_1px_0_rgb(0_0_0/0.12)] dark:bg-white/[0.08] dark:shadow-[inset_0_1px_0_rgb(0_0_0/0.45)]'

export const chip =
    'inline-flex h-6 min-w-0 max-w-full shrink-0 items-center gap-1 rounded-full border border-[rgb(var(--text-primary)/0.1)] bg-white/60 px-2 text-[13px] font-medium leading-4 text-primary has-[button]:pr-px dark:bg-white/[0.1]'

export const chipImage = '-ml-1 size-4 shrink-0 rounded-full object-cover'

export const chipIcon = 'flex size-3.5 shrink-0 items-center justify-center text-secondary [&>svg]:size-full'

export const chipRemove = `flex size-5 shrink-0 items-center justify-center rounded-full text-secondary hover:bg-[rgb(var(--text-primary)/0.07)] hover:text-primary ${insetFocusRing}`

export const listItem =
    'min-h-[25px] cursor-default select-none items-center gap-2 rounded py-1 text-sm leading-none text-primary outline-none data-[highlighted]:bg-accent data-[disabled]:pointer-events-none data-[disabled]:text-muted'

export const checkListItem = `grid grid-cols-[1rem_1fr] pl-2 pr-4 data-[selected]:font-medium ${listItem}`

export const dialogBackdrop =
    'fixed inset-0 z-50 bg-black/25 transition-opacity duration-200 ease-[ease] data-[ending-style]:duration-150 data-[starting-style]:opacity-0 data-[ending-style]:opacity-0 motion-reduce:transition-none'

export const dialogViewport = 'fixed inset-0 z-50 flex items-center justify-center p-4'

export const dialogSurface = `${grainSurface} rounded-lg border border-primary bg-primary/80 backdrop-blur-3xl transform-gpu reduce-transparency:!bg-primary reduce-transparency:backdrop-blur-none text-primary outline-none ${overlayShadowLg}`

export const dialogPopup = `${dialogSurface} relative flex max-h-full w-full flex-col overflow-hidden transition-[transform,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] data-[ending-style]:duration-150 data-[starting-style]:scale-[0.96] data-[starting-style]:opacity-0 data-[ending-style]:scale-[0.96] data-[ending-style]:opacity-0 motion-reduce:transition-none`

export const barRoot = 'grid w-full grid-cols-[1fr_auto] items-center gap-x-2 gap-y-1.5'

export const barLabel = 'text-sm font-semibold text-primary'

export const barValue = 'col-start-2 text-right text-sm tabular-nums text-secondary'

export const barTrack =
    'col-span-2 h-2 overflow-hidden rounded-full bg-[rgb(var(--text-primary)/0.08)] shadow-[inset_0_1px_0_rgb(0_0_0/0.06)] dark:bg-white/[0.07] dark:shadow-[inset_0_1px_0_rgb(0_0_0/0.3)]'

export const barIndicator =
    'block h-full rounded-full bg-orange transition-[width] duration-500 ease-out motion-reduce:transition-none'

export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'error' | 'brand'

export const dangerFill =
    'bg-[color:color-mix(in_srgb,color-mix(in_srgb,theme(colors.salmon)_85%,theme(colors.red))_92%,black)]'

export const toneFill: Record<Tone, string> = {
    neutral: 'bg-[rgb(var(--text-primary)/0.06)]',
    info: 'bg-blue/10',
    success: 'bg-green/10',
    warning: 'bg-yellow/10',
    error: 'bg-salmon/10',
    brand: 'bg-orange/10',
}

export const toneBorder: Record<Tone, string> = {
    neutral: 'border-[rgb(var(--text-primary)/0.14)]',
    info: 'border-blue/30',
    success: 'border-green/30',
    warning: 'border-yellow/35',
    error: 'border-salmon/35',
    brand: 'border-orange/35',
}

export const toneText: Record<Tone, string> = {
    neutral: 'text-secondary',
    info: 'text-[color:color-mix(in_srgb,theme(colors.blue)_70%,black)] dark:text-[color:color-mix(in_srgb,theme(colors.blue)_65%,white)]',
    success:
        'text-[color:color-mix(in_srgb,theme(colors.green)_65%,black)] dark:text-[color:color-mix(in_srgb,theme(colors.green)_70%,white)]',
    warning:
        'text-[color:color-mix(in_srgb,theme(colors.yellow)_55%,black)] dark:text-[color:color-mix(in_srgb,theme(colors.yellow)_75%,white)]',
    error: 'text-[color:color-mix(in_srgb,theme(colors.salmon)_65%,black)] dark:text-[color:color-mix(in_srgb,theme(colors.salmon)_75%,white)]',
    brand: 'text-[color:color-mix(in_srgb,theme(colors.orange)_55%,black)] dark:text-[color:color-mix(in_srgb,theme(colors.orange)_75%,white)]',
}

export const toneSolid: Record<Tone, string> = {
    neutral: 'bg-[rgb(var(--text-primary))] text-[rgb(var(--bg))]',
    info: 'bg-blue text-white',
    success: 'bg-green text-white',
    warning: 'bg-yellow text-black',
    error: `${dangerFill} text-white`,
    brand: 'bg-orange text-black',
}

export const toneIcon: Record<Tone, string> = {
    neutral: 'text-secondary',
    info: 'text-blue',
    success: 'text-green',
    warning: 'text-yellow',
    error: 'text-salmon',
    brand: 'text-orange',
}

export type FieldSize = 'sm' | 'md' | 'lg'
export const fieldSizes = {
    sm: 'h-[26px] rounded px-2 text-[12px]',
    md: 'h-9 px-2.5 text-sm',
    lg: 'h-11 px-3 text-[15px]',
} as const
export const searchRoundPadding = {
    sm: 'rounded-full px-3',
    md: 'rounded-full px-4',
    lg: 'rounded-full px-5',
} as const
export const fieldGroupSizes = {
    sm: 'min-h-[26px] rounded text-[12px]',
    md: 'min-h-9 text-sm',
    lg: 'min-h-11 text-[15px]',
} as const
export const fieldInnerSizes = {
    sm: 'min-h-[18px] px-1 text-[12px]',
    md: 'min-h-6 px-1.5 text-sm',
    lg: 'min-h-7 px-2 text-[15px]',
} as const
export const fieldIconButtonSizes = {
    sm: 'size-5 shrink-0 self-start mt-[2px] rounded-[3px] p-0 text-secondary hover:text-primary focus-visible:-outline-offset-2',
    md: 'size-7 shrink-0 self-start mt-[3px] p-0 text-secondary hover:text-primary focus-visible:-outline-offset-2',
    lg: 'size-9 shrink-0 self-start mt-[3px] p-0 text-secondary hover:text-primary focus-visible:-outline-offset-2',
} as const
export const fieldIconButtonIconSize = { sm: 'sm', md: 'sm', lg: 'md' } as const
export const fieldChipSizes = {
    sm: 'h-[18px] px-1.5 text-[11px] has-[button]:pr-px',
    md: 'h-6 px-2 text-[13px] has-[button]:pr-px',
    lg: 'h-7 px-2.5 text-sm has-[button]:pr-[3px]',
} as const
export const fieldChipRemoveSizes = { sm: 'size-3.5 [&>svg]:size-2.5', md: 'size-5', lg: 'size-5' } as const
export const fieldChipsSizes = { sm: 'py-[2px]', md: 'py-[3px]', lg: 'py-[3px]' } as const
export const fieldChevronSizes = { sm: 'size-4', md: 'size-5', lg: 'size-6' } as const
export const fieldListItemSizes = {
    sm: 'min-h-[22px] text-[12px]',
    md: 'min-h-[25px] text-sm',
    lg: 'min-h-[30px] text-[15px]',
} as const
export const fieldStepperSizes = {
    sm: 'w-4 [&_svg]:size-3',
    md: 'w-6 [&_svg]:size-4',
    lg: 'w-8 [&_svg]:size-5',
} as const
export const textareaSizes = {
    sm: 'min-h-[42px] rounded px-2 py-1 text-[12px] leading-4',
    md: 'min-h-14 px-2.5 py-[7px] text-sm leading-5',
    lg: 'min-h-[68px] px-3 py-[9px] text-[15px] leading-6',
} as const

export const tintedHeaderEdge =
    'border-b-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.45)] dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]'
