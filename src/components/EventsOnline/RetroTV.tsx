import React, { useEffect, useRef } from 'react'
import EventGraphic, { type EventGraphicProps } from 'components/EventGraphic'
import { extractVideoId } from 'components/TapePlayer/utils'
import type { Event } from '../../pages/events'

// Low-res noise scaled up with pixelated rendering looks more like real CRT static, and is cheap to draw
const STATIC_WIDTH = 96
const STATIC_HEIGHT = 72
const STATIC_FPS = 18

const TVStatic = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas?.getContext('2d')
        if (!canvas || !ctx) return
        const image = ctx.createImageData(STATIC_WIDTH, STATIC_HEIGHT)
        const draw = () => {
            for (let i = 0; i < image.data.length; i += 4) {
                const v = Math.random() * 255
                image.data[i] = image.data[i + 1] = image.data[i + 2] = v
                image.data[i + 3] = 255
            }
            ctx.putImageData(image, 0, 0)
        }
        draw()
        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return

        let frame = 0
        let last = 0
        const loop = (t: number) => {
            if (t - last > 1000 / STATIC_FPS) {
                draw()
                last = t
            }
            frame = requestAnimationFrame(loop)
        }
        frame = requestAnimationFrame(loop)
        return () => cancelAnimationFrame(frame)
    }, [])

    return (
        <canvas
            ref={canvasRef}
            width={STATIC_WIDTH}
            height={STATIC_HEIGHT}
            className="absolute inset-0 w-full h-full opacity-80"
            style={{ imageRendering: 'pixelated' }}
        />
    )
}

export const LiveBadge = ({ className = '' }: { className?: string }) => (
    <span
        className={`inline-flex items-center gap-1 rounded-sm bg-red px-1.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white leading-none ${className}`}
    >
        <span className="relative flex size-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
            <span className="relative inline-flex size-1.5 rounded-full bg-white" />
        </span>
        Live
    </span>
)

type RetroTVProps = {
    /** Event whose artwork shows on screen. Static plays when there is none. */
    event?: Event | null
    graphicProps?: EventGraphicProps
    /** YouTube URL to play. Takes priority over the event artwork. */
    videoUrl?: string | null
    live?: boolean
    size?: 'sm' | 'lg'
    /** Shown over the static when nothing is tuned in */
    emptyMessage?: string
    onClick?: () => void
    className?: string
}

export default function RetroTV({
    event,
    graphicProps,
    videoUrl,
    live,
    size = 'lg',
    emptyMessage,
    onClick,
    className = '',
}: RetroTVProps): JSX.Element {
    const isLarge = size === 'lg'
    const photo = event?.photos?.[0]?.url

    const screen = videoUrl ? (
        <iframe
            key={videoUrl}
            src={`https://www.youtube-nocookie.com/embed/${extractVideoId(videoUrl)}?autoplay=1&rel=0`}
            title={event?.name || 'Recording'}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
        />
    ) : event ? (
        photo ? (
            <img src={photo} alt={event.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : graphicProps ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
                {/* The graphic is square and sizes from its width: 3/4 of a 4:3 screen fills it top to bottom */}
                <EventGraphic {...graphicProps} className="w-3/4" />
            </div>
        ) : null
    ) : (
        <>
            <TVStatic />
            {emptyMessage && (
                <div className="absolute inset-0 flex items-center justify-center p-4">
                    <span className="bg-black/70 px-2 py-1 font-code text-xs uppercase tracking-widest text-white text-center">
                        {emptyMessage}
                    </span>
                </div>
            )}
        </>
    )

    const Wrapper = onClick ? 'button' : 'div'

    return (
        <Wrapper
            onClick={onClick}
            className={`group relative block w-full text-left ${isLarge ? 'pt-10' : 'pt-6'} ${
                onClick ? 'cursor-pointer transition-transform hover:-rotate-1 hover:scale-[1.03]' : ''
            } ${className}`}
            aria-label={onClick ? 'Open the online events room' : undefined}
        >
            {/* Cabinet */}
            <div
                className={`relative flex bg-brown shadow-xl ${
                    isLarge ? 'gap-3 rounded-[1.75rem] p-4' : 'gap-1.5 rounded-xl p-2'
                }`}
            >
                {/* Rabbit-ear antennas */}
                <div className="absolute left-1/2 bottom-full h-0 w-0" aria-hidden>
                    <span
                        className={`absolute bottom-0 left-0 origin-bottom -rotate-[28deg] bg-light-11 w-[3px] rounded-full ${
                            isLarge ? 'h-12' : 'h-7'
                        }`}
                    />
                    <span
                        className={`absolute bottom-0 left-0 origin-bottom rotate-[28deg] bg-light-11 w-[3px] rounded-full ${
                            isLarge ? 'h-12' : 'h-7'
                        }`}
                    />
                    <span className="absolute -bottom-1 -left-2 h-3 w-5 rounded-t-full bg-light-12" />
                </div>
                {/* Screen */}
                <div className={`flex-1 bg-black ${isLarge ? 'rounded-[1.25rem] p-2' : 'rounded-lg p-1'}`}>
                    <div
                        className={`relative aspect-[4/3] overflow-hidden bg-black ${
                            isLarge ? 'rounded-[1rem]' : 'rounded-md'
                        }`}
                    >
                        {screen}
                        {/* Scanlines + curved-glass vignette. Pointer events pass through to the video. */}
                        <div
                            className="pointer-events-none absolute inset-0"
                            style={{
                                background:
                                    'repeating-linear-gradient(to bottom, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px), radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)',
                            }}
                        />
                        {live && <LiveBadge className="absolute top-2 left-2" />}
                    </div>
                </div>

                {/* Control panel: two dials and a speaker grille */}
                <div
                    className={`flex flex-col items-center justify-between ${isLarge ? 'w-14 py-2' : 'w-5 py-1'}`}
                    aria-hidden
                >
                    <div className={`flex flex-col ${isLarge ? 'gap-3' : 'gap-1.5'}`}>
                        {[0, 1].map((i) => (
                            <span
                                key={i}
                                className={`relative block rounded-full bg-light-9 border-2 border-light-12 ${
                                    isLarge ? 'size-9' : 'size-3.5 border'
                                }`}
                            >
                                <span
                                    className={`absolute left-1/2 top-0.5 -translate-x-1/2 bg-light-12 rounded-full ${
                                        isLarge ? 'h-3 w-1' : 'h-1 w-px'
                                    } ${i === 0 ? 'rotate-[30deg]' : '-rotate-[20deg]'}`}
                                />
                            </span>
                        ))}
                    </div>
                    {isLarge && (
                        <div className="flex w-full flex-col gap-1">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <span key={i} className="block h-0.5 w-full rounded bg-black/50" />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Feet */}
            <div className={`flex justify-between ${isLarge ? 'px-10' : 'px-4'}`} aria-hidden>
                <span className={`block bg-light-12 rounded-b ${isLarge ? 'h-3 w-6' : 'h-1.5 w-3'}`} />
                <span className={`block bg-light-12 rounded-b ${isLarge ? 'h-3 w-6' : 'h-1.5 w-3'}`} />
            </div>
        </Wrapper>
    )
}
