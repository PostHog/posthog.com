import React, { useLayoutEffect, useRef } from 'react'
import Wallpapers from 'components/Desktop/Wallpapers'

const BLUR_RADIUS_PX = 64
const EDGE_PADDING_PX = BLUR_RADIUS_PX * 3
const MIRROR_OFFSETS = [-1, 0, 1]

interface FrostedBackdropProps {
    className?: string
    dataScheme?: string
    tintClassName: string
}

const MirroredWallpaperTile = ({ column, row }: { column: number; row: number }) => (
    <div
        className="absolute w-screen h-dvh"
        style={{
            left: `calc(${EDGE_PADDING_PX}px + ${column} * 100vw)`,
            top: `calc(${EDGE_PADDING_PX}px + ${row} * 100dvh)`,
            transform: `scale(${column ? -1 : 1}, ${row ? -1 : 1})`,
        }}
    >
        <Wallpapers />
    </div>
)

export default function FrostedBackdrop({ className = 'inset-0', dataScheme, tintClassName }: FrostedBackdropProps) {
    const frameRef = useRef<HTMLDivElement>(null)
    const blurredWallpaperRef = useRef<HTMLDivElement>(null)

    useLayoutEffect(() => {
        const frame = frameRef.current
        const blurredWallpaper = blurredWallpaperRef.current
        if (!frame || !blurredWallpaper) return

        const alignToViewport = () => {
            const { left, top } = frame.getBoundingClientRect()
            blurredWallpaper.style.left = `${-left - EDGE_PADDING_PX}px`
            blurredWallpaper.style.top = `${-top - EDGE_PADDING_PX}px`
        }

        alignToViewport()
        const resizeObserver = new ResizeObserver(alignToViewport)
        resizeObserver.observe(frame)
        window.addEventListener('resize', alignToViewport)
        document.addEventListener('animationend', alignToViewport, true)
        document.addEventListener('transitionend', alignToViewport, true)
        return () => {
            resizeObserver.disconnect()
            window.removeEventListener('resize', alignToViewport)
            document.removeEventListener('animationend', alignToViewport, true)
            document.removeEventListener('transitionend', alignToViewport, true)
        }
    }, [])

    return (
        <div
            ref={frameRef}
            aria-hidden
            data-scheme={dataScheme}
            className={`absolute overflow-hidden rounded-[inherit] pointer-events-none print:hidden ${className}`}
        >
            <div
                ref={blurredWallpaperRef}
                className="absolute overflow-hidden blur-3xl reduce-transparency:hidden"
                style={{
                    width: `calc(100vw + ${EDGE_PADDING_PX * 2}px)`,
                    height: `calc(100dvh + ${EDGE_PADDING_PX * 2}px)`,
                }}
            >
                {MIRROR_OFFSETS.flatMap((column) =>
                    MIRROR_OFFSETS.map((row) => (
                        <MirroredWallpaperTile key={`${column}:${row}`} column={column} row={row} />
                    ))
                )}
            </div>
            <div className={`absolute inset-0 ${tintClassName}`} />
        </div>
    )
}
