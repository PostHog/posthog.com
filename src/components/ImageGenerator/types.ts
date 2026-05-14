export type Aspect = 'square' | 'og'

export type TemplateId = 'event'

export type ThemeMode = 'solid' | 'gradient'

export type Theme = {
    name: string
    mode: ThemeMode
}

export type ImageSource = 'person' | 'library' | 'upload' | null

export type LogoType = 'posthog' | 'svg' | 'upload'

export type LogoVariant = 'landscape' | 'stacked'

export type LogoColor = 'gradient' | 'mono-black' | 'mono-white'

export type LogoEntry = {
    id: string
    type: LogoType
    variant?: LogoVariant
    color?: LogoColor
    svg?: string
    uploadUrl?: string
    sizePx: number
}

export type GeneratorState = {
    template: TemplateId
    aspect: Aspect
    theme: Theme
    title: { content: string; maxWidth: number }
    text: { content: string; maxWidth: number }
    image: {
        source: ImageSource
        personId?: string
        personName?: string
        personRole?: string
        personAvatarUrl?: string
        librarySlug?: string
        libraryUrl?: string
        uploadUrl?: string
        size: number
        x: number
        y: number
        rotation: number
    }
    logos: LogoEntry[]
    logoPlacement: 'overlay' | 'inline'
    logoArrangement: { direction: 'row' | 'col'; gap: number }
    event?: {
        date?: string
        time?: string
        showCalendar: boolean
    }
}

export type CanvasDimensions = { width: number; height: number }
