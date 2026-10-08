import React, { useEffect, useId, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import { SQUEAK_HOST } from 'lib/strapi'
import {
    StickerCoffee,
    StickerPizza,
    StickerPineapple,
    StickerPalmTree,
    StickerLaptop,
    StickerRobot,
    StickerTerminal,
    StickerCloud,
} from 'components/Stickers/Stickers'

const artwork = {
    coffee: StickerCoffee,
    pizza: StickerPizza,
    pineapple: StickerPineapple,
    'palm-tree': StickerPalmTree,
    laptop: StickerLaptop,
    robot: StickerRobot,
    terminal: StickerTerminal,
    cloud: StickerCloud,
}

export type Sticker = {
    id: number
    name: string
    description?: string | null
    slug: string
    artwork: keyof typeof artwork | null
    imageUrl: string | null
    size: number
    holographic?: boolean
    collection: {
        id: number
        name: string
        slug: string
        description?: string
        coverUrl: string | null
        position: number
    } | null
    unlocked?: boolean
    requiredAchievement?: { id: number; title: string } | null
}

export function StickerArtwork({
    sticker,
    className,
    style,
    finish = true,
}: {
    sticker: Sticker
    className?: string
    style?: React.CSSProperties
    finish?: boolean
}) {
    if (finish && sticker.holographic)
        return <HolographicArtwork sticker={sticker} className={className} style={style} />
    const Artwork = sticker.artwork ? artwork[sticker.artwork] : null
    if (sticker.imageUrl)
        return (
            <img
                src={new URL(sticker.imageUrl, SQUEAK_HOST).href}
                alt=""
                draggable={false}
                className={`object-contain ${className || ''}`}
                style={style}
            />
        )
    return Artwork ? (
        <Artwork aria-hidden="true" className={className} style={style} />
    ) : (
        <span aria-hidden="true" className={className} style={style} />
    )
}

const foilTexture = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
    <defs><linearGradient id="foil" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="#9656ff"/><stop offset=".16" stop-color="#45a6ff"/>
        <stop offset=".32" stop-color="#45f4b9"/><stop offset=".46" stop-color="#f9ee70"/>
        <stop offset=".5" stop-color="#ffffff"/><stop offset=".54" stop-color="#ffc979"/>
        <stop offset=".68" stop-color="#ff7199"/><stop offset=".84" stop-color="#cb6bff"/>
        <stop offset="1" stop-color="#6ad8ff"/>
    </linearGradient></defs><path fill="url(#foil)" d="M0 0h256v256H0z"/>
    ${Array.from({ length: 1800 }, (_, i) => {
        const x = ((i * 137.508) % 256).toFixed(2)
        const y = ((i * i * 23.17) % 256).toFixed(2)
        return i % 41 === 0
            ? `<path transform="translate(${x} ${y})" d="M0 -2.2L.5 -.5L2.2 0L.5 .5L0 2.2L-.5 .5L-2.2 0L-.5 -.5Z" fill="white"/>`
            : `<circle cx="${x}" cy="${y}" r="${i % 3 === 0 ? '.6' : '.3'}" fill="white" opacity="${
                  i % 2 ? '.85' : '.4'
              }"/>`
    }).join('')}
</svg>`)}`

function HolographicArtwork({
    sticker,
    className,
    style,
}: {
    sticker: Sticker
    className?: string
    style?: React.CSSProperties
}) {
    const id = `sticker-foil-${useId().replace(/:/g, '')}`
    const reflection = useRef<SVGFEImageElement>(null)
    const reducedMotion = useReducedMotion()

    useEffect(() => {
        if (reducedMotion) return
        let frame = 0
        const move = (event: PointerEvent) => {
            window.cancelAnimationFrame(frame)
            frame = window.requestAnimationFrame(() => {
                reflection.current?.setAttribute('x', `${-0.5 + (event.clientX / window.innerWidth - 0.5) * 0.9}`)
                reflection.current?.setAttribute('y', `${-0.5 + (event.clientY / window.innerHeight - 0.5) * 0.9}`)
            })
        }
        window.addEventListener('pointermove', move, { passive: true })
        return () => {
            window.cancelAnimationFrame(frame)
            window.removeEventListener('pointermove', move)
        }
    }, [reducedMotion])

    return (
        <>
            <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden="true" focusable="false">
                <defs>
                    <filter
                        id={id}
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        primitiveUnits="objectBoundingBox"
                        colorInterpolationFilters="sRGB"
                    >
                        <feImage
                            ref={reflection}
                            href={foilTexture}
                            x="-0.5"
                            y="-0.5"
                            width="2"
                            height="2"
                            preserveAspectRatio="none"
                            result="foil"
                        />
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .106 .358 .036 .30 0"
                            result="reflectivity"
                        />
                        <feComposite in="foil" in2="reflectivity" operator="in" />
                        <feComposite in2="SourceGraphic" operator="over" />
                        <feComposite in2="SourceAlpha" operator="in" />
                    </filter>
                </defs>
            </svg>
            <StickerArtwork
                sticker={sticker}
                finish={false}
                className={className}
                style={{ ...style, filter: `url(#${id}) ${style?.filter || ''}` }}
            />
        </>
    )
}
