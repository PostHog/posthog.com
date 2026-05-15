import React from 'react'
import Logo from 'components/Logo'
import dayjs from 'dayjs'
import type { GeneratorState, LogoEntry } from '../../types'
import { getThemeStyle } from '../../themes'

const SQUEAK: React.CSSProperties = { fontFamily: 'Squeak, sans-serif', fontWeight: 700 }
const ROUNDED: React.CSSProperties = { fontFamily: 'Open Runde, sans-serif' }

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

function LogoCluster({ state }: { state: GeneratorState }) {
    if (!state.logos.length) return null
    const flexDir = state.logoArrangement.direction === 'col' ? 'flex-col' : 'flex-row'
    return (
        <div className={`flex items-center ${flexDir}`} style={{ gap: state.logoArrangement.gap }}>
            {state.logos.map((entry) => (
                <LogoRender key={entry.id} entry={entry} />
            ))}
        </div>
    )
}

export const OVERLAY_BAR_HEIGHT = 140

export function LogoBar({
    state,
    overlayHeight = OVERLAY_BAR_HEIGHT,
}: {
    state: GeneratorState
    overlayHeight?: number
}) {
    if (!state.logos.length) return null
    if (state.logoPlacement === 'inline') {
        return (
            <div className="mt-auto flex justify-start">
                <LogoCluster state={state} />
            </div>
        )
    }
    return (
        <div
            className="absolute left-0 right-0 bottom-0 flex justify-center items-center px-16"
            style={{
                height: overlayHeight,
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
            }}
        >
            <LogoCluster state={state} />
        </div>
    )
}

export function CalendarTile({
    date,
    accentHex,
    style,
}: {
    date?: string
    accentHex: string
    style?: React.CSSProperties
}) {
    if (!date) return null
    const d = dayjs(date)
    if (!d.isValid()) return null
    return (
        <div
            className="absolute top-12 right-12 bg-white rounded-2xl overflow-hidden shadow-2xl border border-black/10"
            style={{ width: 150, ...style }}
        >
            <div
                className="text-white text-center py-2"
                style={{ ...SQUEAK, backgroundColor: accentHex, fontSize: 26, letterSpacing: 1.5 }}
            >
                {d.format('MMM').toUpperCase()}
            </div>
            <div
                className="bg-white text-center py-3"
                style={{ ...SQUEAK, fontSize: 72, color: '#111', lineHeight: 1 }}
            >
                {d.format('D')}
            </div>
        </div>
    )
}

export function PersonNameBadge({
    name,
    role,
    style,
    sizes = { name: 32, role: 28 },
}: {
    name: string
    role?: string
    style?: React.CSSProperties
    sizes?: { name: number; role: number }
}) {
    return (
        <div
            className="rounded-2xl px-6 py-3 inline-flex items-center"
            style={{
                ...ROUNDED,
                background: 'rgba(0,0,0,0.35)',
                color: '#fff',
                whiteSpace: 'nowrap',
                ...style,
            }}
        >
            <span style={{ fontSize: sizes.name, fontWeight: 600 }}>{name}</span>
            {role && (
                <>
                    <span style={{ fontSize: sizes.name, opacity: 0.55, margin: '0 12px' }}>/</span>
                    <span style={{ fontSize: sizes.role, fontWeight: 400, opacity: 0.95 }}>{role}</span>
                </>
            )}
        </div>
    )
}

export function ImageSlot({
    state,
    bottomOffset = 0,
    rightOffset = -100,
    defaultHeight,
    nameBadgeBottom = OVERLAY_BAR_HEIGHT + 24,
    nameBadgeRight = 48,
    nameBadgeSizes,
}: {
    state: GeneratorState
    bottomOffset?: number
    rightOffset?: number
    defaultHeight: number
    nameBadgeBottom?: number
    nameBadgeRight?: number
    nameBadgeSizes?: { name: number; role: number }
}) {
    const { image, logoPlacement } = state
    if (!image.source) return null

    const transform = `translate(${image.x}px, ${image.y}px) rotate(${image.rotation}deg) scale(${image.size / 100})`
    const badgeBottom = logoPlacement === 'overlay' ? nameBadgeBottom : 48

    if (image.source === 'person') {
        return (
            <>
                {image.personAvatarUrl && (
                    <img
                        src={image.personAvatarUrl}
                        alt={image.personName}
                        style={{
                            position: 'absolute',
                            bottom: bottomOffset,
                            right: rightOffset,
                            height: defaultHeight,
                            width: 'auto',
                            objectFit: 'contain',
                            objectPosition: 'bottom right',
                            transform,
                            transformOrigin: 'bottom right',
                        }}
                    />
                )}
                {image.personName && (
                    <div className="absolute" style={{ bottom: badgeBottom, right: nameBadgeRight, zIndex: 5 }}>
                        <PersonNameBadge name={image.personName} role={image.personRole} sizes={nameBadgeSizes} />
                    </div>
                )}
            </>
        )
    }

    const url = image.source === 'library' ? image.libraryUrl : image.uploadUrl
    if (!url) return null
    return (
        <img
            src={url}
            alt=""
            style={{
                position: 'absolute',
                bottom: bottomOffset,
                right: rightOffset,
                height: defaultHeight,
                width: 'auto',
                transform,
                transformOrigin: 'bottom right',
            }}
        />
    )
}

export function TitleBlock({ state, sizePx, color }: { state: GeneratorState; sizePx: number; color: string }) {
    if (!state.title.content) return null
    return (
        <h1
            className="text-left m-0 uppercase"
            style={{
                ...SQUEAK,
                fontSize: sizePx,
                maxWidth: `${state.title.maxWidth}%`,
                lineHeight: 0.95,
                color,
                letterSpacing: -1,
            }}
            // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml - moderator-only tool, content from URL state controlled by moderator
            dangerouslySetInnerHTML={{ __html: state.title.content }}
        />
    )
}

export function TextBlock({ state, sizePx, color }: { state: GeneratorState; sizePx: number; color: string }) {
    if (!state.text.content) return null
    return (
        <div
            className="text-left m-0"
            style={{
                ...ROUNDED,
                fontSize: sizePx,
                fontWeight: 600,
                maxWidth: `${state.text.maxWidth}%`,
                lineHeight: 1.3,
                color,
                marginTop: 40,
            }}
            // nosemgrep: typescript.react.security.audit.react-dangerouslysetinnerhtml.react-dangerouslysetinnerhtml - moderator-only tool, content from URL state controlled by moderator
            dangerouslySetInnerHTML={{ __html: state.text.content }}
        />
    )
}

export function themeBgStyle(state: GeneratorState): React.CSSProperties {
    return getThemeStyle(state.theme)
}
