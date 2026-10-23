import React from 'react'
import { cn } from '../../../utils'

export type SkeletonProps = React.HTMLAttributes<HTMLDivElement> & {
    shape?: 'text' | 'rect' | 'circle'
    width?: number | string
    height?: number | string
    lines?: number
    loading?: boolean
}

const shimmer =
    'bg-[rgb(var(--text-primary)/0.08)] bg-[linear-gradient(90deg,transparent,rgb(var(--text-primary)/0.06),transparent)] bg-[length:200%_100%] animate-[shimmer_2s_linear_infinite] motion-reduce:animate-none'

const blockShapes = { rect: 'h-8 rounded-md', circle: 'size-8 shrink-0 rounded-full' }

const lastLineWidth = '60%'

function TextLine({ width, height }: { width?: number | string; height?: number | string }): JSX.Element {
    return (
        <div className="flex h-[1lh] items-center" style={{ height }}>
            <div className={cn('h-[0.8em] w-full rounded-[4px]', shimmer)} style={{ width }} />
        </div>
    )
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(function Skeleton(
    { shape = 'text', width, height, lines = 1, loading = true, children, className, style, ...props },
    ref
) {
    const placeholder =
        shape === 'text' ? (
            <div aria-hidden="true" className={cn('flex flex-col', className)} style={{ width, ...style }}>
                {Array.from({ length: Math.max(1, lines) }, (_, index) => (
                    <TextLine
                        key={index}
                        height={height}
                        width={lines > 1 && index === lines - 1 ? lastLineWidth : undefined}
                    />
                ))}
            </div>
        ) : (
            <div
                aria-hidden="true"
                className={cn(blockShapes[shape], shimmer, className)}
                style={{ width, height, ...style }}
            />
        )

    return children !== undefined ? (
        <div {...props} ref={ref} aria-busy={loading}>
            {loading ? placeholder : children}
        </div>
    ) : (
        React.cloneElement(placeholder, { ...props, ref, 'aria-hidden': true })
    )
})
