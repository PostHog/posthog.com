import React from 'react'
import Logo from 'components/Logo'
import dayjs from 'dayjs'
import type { GeneratorState, LogoEntry } from '../../types'
import { getThemeStyle } from '../../themes'

function LogoRender({ entry }: { entry: LogoEntry }) {
    const sizeStyle: React.CSSProperties = { height: entry.sizePx, width: 'auto' }
    if (entry.type === 'posthog') {
        const variant = entry.color === 'gradient' ? 'gradient' : 'mono'
        const color = entry.color === 'mono-white' ? 'white' : 'black'
        return (
            <div style={sizeStyle} className="flex items-center">
                <Logo
                    variant={variant as 'gradient' | 'mono'}
                    color={color}
                    wordmark
                    stacked={entry.variant === 'stacked'}
                    className="h-full w-auto"
                />
            </div>
        )
    }
    if (entry.type === 'upload' && entry.uploadUrl) {
        return <img src={entry.uploadUrl} alt="" style={sizeStyle} />
    }
    if (entry.type === 'svg' && entry.svg) {
        return (
            <div
                style={sizeStyle}
                // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml - moderator-only tool, user-pasted SVG into their own browser
                dangerouslySetInnerHTML={{ __html: entry.svg }}
            />
        )
    }
    return null
}

export function LogoRow({ state }: { state: GeneratorState }) {
    if (!state.logos.length) return null
    const isOverlay = state.logoPlacement === 'overlay'
    const flexDir = state.logoArrangement.direction === 'col' ? 'flex-col' : 'flex-row'
    const wrapper = isOverlay
        ? 'absolute inset-0 flex items-center justify-center'
        : 'mt-auto flex items-center justify-center'
    const inner = isOverlay
        ? 'flex items-center justify-center backdrop-blur-md bg-black/20 rounded-2xl px-8 py-6'
        : 'flex items-center'
    return (
        <div className={wrapper}>
            <div className={`${inner} ${flexDir}`} style={{ gap: state.logoArrangement.gap }}>
                {state.logos.map((entry) => (
                    <LogoRender key={entry.id} entry={entry} />
                ))}
            </div>
        </div>
    )
}

export function CalendarTile({ date }: { date?: string }) {
    if (!date) return null
    const d = dayjs(date)
    if (!d.isValid()) return null
    return (
        <div className="absolute top-8 right-8 bg-light text-dark rounded-2xl px-5 py-3 text-center shadow-xl">
            <div className="text-sm font-bold uppercase tracking-wider opacity-70">{d.format('MMM')}</div>
            <div className="text-4xl font-bold leading-none mt-1">{d.format('D')}</div>
        </div>
    )
}

export function ImageSlot({ state, defaultMaxHeight }: { state: GeneratorState; defaultMaxHeight: number }) {
    const { image } = state
    if (!image.source) return null

    const transform = `translate(${image.x}px, ${image.y}px) rotate(${image.rotation}deg) scale(${image.size / 100})`

    if (image.source === 'person') {
        return (
            <div className="flex flex-col items-center" style={{ transform }}>
                {image.personAvatarUrl && (
                    <img
                        src={image.personAvatarUrl}
                        alt={image.personName}
                        className="rounded-full bg-light"
                        style={{ width: defaultMaxHeight, height: defaultMaxHeight, objectFit: 'cover' }}
                    />
                )}
                {image.personName && (
                    <div className="text-light mt-4 text-center">
                        <div className="text-2xl font-bold leading-tight">{image.personName}</div>
                        {image.personRole && <div className="text-lg opacity-80 mt-1">{image.personRole}</div>}
                    </div>
                )}
            </div>
        )
    }

    const url = image.source === 'library' ? image.libraryUrl : image.uploadUrl
    if (!url) return null
    return (
        <img
            src={url}
            alt=""
            style={{ maxHeight: defaultMaxHeight, transform, transformOrigin: 'center' }}
            className="w-auto"
        />
    )
}

export function TitleBlock({ state, sizePx }: { state: GeneratorState; sizePx: number }) {
    if (!state.title.content) return null
    return (
        <h1
            className="text-light text-center font-bold leading-tight m-0"
            style={{
                fontSize: sizePx,
                maxWidth: `${state.title.maxWidth}%`,
                lineHeight: 1.05,
            }}
            // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml - moderator-only tool, content from URL state controlled by moderator
            dangerouslySetInnerHTML={{ __html: state.title.content }}
        />
    )
}

export function TextBlock({ state, sizePx }: { state: GeneratorState; sizePx: number }) {
    if (!state.text.content) return null
    return (
        <div
            className="text-light text-center m-0 mt-6"
            style={{ fontSize: sizePx, maxWidth: `${state.text.maxWidth}%`, lineHeight: 1.4 }}
            // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml - moderator-only tool, content from URL state controlled by moderator
            dangerouslySetInnerHTML={{ __html: state.text.content }}
        />
    )
}

export function themeBgStyle(state: GeneratorState): React.CSSProperties {
    return getThemeStyle(state.theme)
}
