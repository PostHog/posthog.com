import React from 'react'
import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '../../../utils'
import type { Tone } from '../styles'
import './styles.css'

export type AnnotationProps = HTMLAttributes<HTMLDivElement> & {
    note: ReactNode
    side?: 'top' | 'bottom' | 'left' | 'right'
    shape?: 'curved' | 'loop' | 'straight'
    tone?: Tone
    drawIn?: boolean
    narrow?: 'stack' | 'hide'
}

const paths = {
    curved: 'M50 0 C50 23 82 28 76 52 C70 77 50 73 50 100',
    loop: 'M50 0 C50 20 80 18 80 43 C80 71 18 64 28 38 C37 17 68 49 57 70 Q50 83 50 100',
    straight: 'M50 0 Q48 50 50 100',
}
const annotationColors: Record<Tone, string> = {
    neutral: 'text-secondary',
    brand: 'text-[color:color-mix(in_srgb,theme(colors.red)_95%,black)] dark:text-red',
    info: 'text-[color:color-mix(in_srgb,theme(colors.blue)_95%,black)] dark:text-blue',
    success: 'text-[color:color-mix(in_srgb,theme(colors.green)_85%,black)] dark:text-green',
    warning:
        'text-[color:color-mix(in_srgb,color-mix(in_srgb,theme(colors.red)_70%,theme(colors.yellow))_88%,black)] dark:text-yellow',
    error: 'text-[color:color-mix(in_srgb,theme(colors.salmon)_90%,black)] dark:text-salmon',
}
const layouts = {
    top: 'flex-col',
    bottom: 'flex-col-reverse',
    left: '@md/annotation:flex-row',
    right: '@md/annotation:flex-row-reverse',
}
const rotations = {
    top: '',
    bottom: 'rotate-180',
    left: '@md/annotation:-rotate-90',
    right: '@md/annotation:rotate-90',
}

export const Annotation = React.forwardRef<HTMLDivElement, AnnotationProps>(function Annotation(
    {
        note,
        side = 'top',
        shape = 'curved',
        tone = 'neutral',
        drawIn = false,
        narrow = 'stack',
        children,
        className,
        ...props
    },
    ref
) {
    return (
        <div ref={ref} {...props} className={cn('@container/annotation min-w-0', className)}>
            <div className={cn('flex min-w-0 flex-col items-center gap-0', layouts[side])}>
                <div
                    className={cn(
                        'max-w-full shrink-0',
                        side === 'left' && '@md/annotation:max-w-32 @md/annotation:text-right',
                        side === 'right' && '@md/annotation:max-w-32 @md/annotation:text-left',
                        'text-center',
                        narrow === 'hide' && 'hidden @md/annotation:flex',
                        annotationColors[tone]
                    )}
                >
                    <div className="max-w-[18ch] font-squeak text-xl font-bold leading-none [overflow-wrap:anywhere]">
                        {note}
                    </div>
                </div>
                <svg
                    aria-hidden
                    focusable="false"
                    viewBox="0 0 100 100"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn(
                        'block size-16 max-w-full shrink-0 overflow-visible',
                        rotations[side],
                        narrow === 'hide' && 'hidden @md/annotation:block',
                        annotationColors[tone]
                    )}
                >
                    <g className={drawIn ? 'ui-annotation-draw' : undefined}>
                        <path d={paths[shape]} pathLength="1" />
                        <path d="M39 87 L50 100 L61 86" pathLength="1" />
                    </g>
                </svg>
                <div
                    className={cn(
                        'w-full min-w-0 max-w-full',
                        (side === 'left' || side === 'right') && '@md/annotation:w-auto @md/annotation:flex-1'
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    )
})
