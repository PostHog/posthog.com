import React, { useRef, useState } from 'react'
import type { CSSProperties, HTMLAttributes, PointerEvent } from 'react'
import { cn } from '../../../utils'

export type CompareImage = { src: string; darkSrc?: string; alt: string }
export type CompareProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> & {
    before: CompareImage
    after: CompareImage
    beforeLabel?: string
    afterLabel?: string
    orientation?: 'horizontal' | 'vertical'
    defaultValue?: number
    value?: number
    onValueChange?: (value: number) => void
    label?: string
    aspectRatio?: string
}

const clamp = (value: number) => (Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 50)

const labelChip =
    'pointer-events-none absolute max-w-[calc(50%-1rem)] truncate rounded-full bg-white/90 px-2.5 py-1 text-xs font-semibold text-black shadow-[0_1px_3px_rgb(0_0_0/0.18)] dark:bg-black/75 dark:text-white'

function Image({ src, darkSrc, alt, layout }: CompareImage & { layout: 'flow' | 'fill' }) {
    const base =
        layout === 'flow'
            ? 'relative m-0 block h-auto w-full'
            : 'absolute inset-0 m-0 size-full object-cover object-left-top'
    return (
        <>
            <img src={src} alt={alt} draggable={false} loading="lazy" className={cn(base, darkSrc && 'dark:hidden')} />
            {darkSrc && (
                <img
                    src={darkSrc}
                    alt={alt}
                    draggable={false}
                    loading="lazy"
                    className={cn(base, 'hidden dark:block')}
                />
            )}
        </>
    )
}

export const Compare = React.forwardRef<HTMLDivElement, CompareProps>(function Compare(
    {
        before,
        after,
        beforeLabel = 'Before',
        afterLabel = 'After',
        orientation = 'horizontal',
        defaultValue = 50,
        value,
        onValueChange,
        label = 'Image comparison',
        aspectRatio,
        className,
        style,
        ...props
    },
    ref
) {
    const [position, setPosition] = useState(() => clamp(defaultValue))
    const [dragging, setDragging] = useState(false)
    const surface = useRef<HTMLDivElement>(null)
    const range = useRef<HTMLInputElement>(null)
    const current = clamp(value ?? position)
    const vertical = orientation === 'vertical'

    const update = (next: number) => {
        const bounded = clamp(next)
        setPosition(bounded)
        onValueChange?.(bounded)
    }

    const drag = (event: PointerEvent<HTMLDivElement>) => {
        const bounds = surface.current?.getBoundingClientRect()
        if (!bounds || !bounds.width || !bounds.height) return
        update(
            100 *
                (vertical ? (event.clientY - bounds.top) / bounds.height : (event.clientX - bounds.left) / bounds.width)
        )
    }

    const beforeClip = vertical
        ? 'inset(0 0 calc(100% - var(--compare-position)) 0)'
        : 'inset(0 calc(100% - var(--compare-position)) 0 0)'
    const afterClip = vertical ? 'inset(var(--compare-position) 0 0 0)' : 'inset(0 0 0 var(--compare-position))'

    return (
        <div ref={ref} {...props} className={cn('min-w-0', className)} style={style}>
            <div
                ref={surface}
                data-dragging={dragging || undefined}
                className={cn(
                    'group relative isolate touch-none select-none overflow-hidden rounded-md border border-[rgb(var(--text-primary)/0.12)] bg-[rgb(var(--text-primary)/0.035)]',
                    vertical ? 'cursor-row-resize' : 'cursor-col-resize'
                )}
                style={{ aspectRatio, '--compare-position': `${current}%` } as CSSProperties}
                onPointerDown={(event) => {
                    if (!event.isPrimary || event.button !== 0) return
                    event.currentTarget.setPointerCapture(event.pointerId)
                    range.current?.focus({ preventScroll: true })
                    setDragging(true)
                    drag(event)
                }}
                onPointerMove={(event) => {
                    if (event.currentTarget.hasPointerCapture(event.pointerId)) drag(event)
                }}
                onPointerUp={(event) => {
                    setDragging(false)
                    if (event.currentTarget.hasPointerCapture(event.pointerId))
                        event.currentTarget.releasePointerCapture(event.pointerId)
                }}
                onPointerCancel={() => setDragging(false)}
            >
                <div className={aspectRatio ? 'absolute inset-0' : 'relative'} style={{ clipPath: afterClip }}>
                    <Image {...after} layout={aspectRatio ? 'fill' : 'flow'} />
                    <span className={cn(labelChip, vertical ? 'bottom-3 left-3' : 'right-3 top-3')}>{afterLabel}</span>
                </div>
                <div className="absolute inset-0" style={{ clipPath: beforeClip }}>
                    <Image {...before} layout="fill" />
                    <span className={cn(labelChip, 'left-3 top-3')}>{beforeLabel}</span>
                </div>
                <input
                    ref={range}
                    type="range"
                    min={0}
                    max={100}
                    step={1}
                    value={current}
                    aria-label={label}
                    aria-orientation={orientation}
                    aria-valuetext={`${Math.round(current)}% ${beforeLabel}, ${Math.round(
                        100 - current
                    )}% ${afterLabel}`}
                    onChange={(event) => update(Number(event.target.value))}
                    className="peer sr-only"
                />
                <div
                    aria-hidden
                    className={cn(
                        'pointer-events-none absolute z-[1] bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.12),0_0_8px_rgb(0_0_0/0.25)]',
                        vertical
                            ? 'inset-x-0 top-[var(--compare-position)] h-0.5 -translate-y-1/2'
                            : 'inset-y-0 left-[var(--compare-position)] w-0.5 -translate-x-1/2'
                    )}
                />
                <span
                    aria-hidden
                    className={cn(
                        'pointer-events-none absolute z-[2] flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-px rounded-full border border-black/15 bg-white text-black shadow-[0_2px_8px_rgb(0_0_0/0.28)] transition-[transform,border-color] duration-150 ease-out group-hover:scale-105 group-data-[dragging]:scale-110 group-data-[dragging]:border-orange peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-orange motion-reduce:transition-none',
                        vertical
                            ? 'left-1/2 top-[var(--compare-position)] flex-col'
                            : 'left-[var(--compare-position)] top-1/2'
                    )}
                >
                    <svg viewBox="0 0 8 12" className={cn('h-3 w-2', vertical && 'rotate-90')} fill="currentColor">
                        <path d="M6.5 1 1.5 6l5 5z" />
                    </svg>
                    <svg viewBox="0 0 8 12" className={cn('h-3 w-2', vertical && 'rotate-90')} fill="currentColor">
                        <path d="M1.5 1l5 5-5 5z" />
                    </svg>
                </span>
            </div>
        </div>
    )
})
