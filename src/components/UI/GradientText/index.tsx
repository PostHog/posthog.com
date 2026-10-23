import React from 'react'
import type { CSSProperties, HTMLAttributes } from 'react'
import { useTextAnimation } from '../textEffects'
import { cn } from '../../../utils'
import './styles.css'

export type GradientPalette = 'brand' | 'spectrum' | 'cool'
export type GradientTextProps = HTMLAttributes<HTMLSpanElement> & {
    palette?: GradientPalette
    animate?: boolean
    duration?: number
}

const palettes: Record<GradientPalette, string> = {
    brand: '[--gradient-a:theme(colors.red)] [--gradient-b:theme(colors.yellow)] [--gradient-c:theme(colors.orange)] dark:[--gradient-a:theme(colors.red-2)] dark:[--gradient-b:theme(colors.light-yellow)]',
    spectrum:
        '[--gradient-a:theme(colors.yellow)] [--gradient-b:theme(colors.green)] [--gradient-c:theme(colors.blue)] dark:[--gradient-b:theme(colors.lime-green)] dark:[--gradient-c:theme(colors.light-blue)]',
    cool: '[--gradient-a:theme(colors.blue)] [--gradient-b:theme(colors.purple)] [--gradient-c:theme(colors.teal)] dark:[--gradient-a:theme(colors.light-blue)] dark:[--gradient-b:theme(colors.lilac)]',
}

export function GradientText({
    palette = 'brand',
    animate = true,
    duration = 12,
    className,
    style,
    ...props
}: GradientTextProps): JSX.Element {
    const { ref, active } = useTextAnimation(animate)
    return (
        <span
            ref={ref}
            {...props}
            data-active={active || undefined}
            data-animate={animate || undefined}
            className={cn('ui-gradient-text inline', palettes[palette], className)}
            style={{ '--gradient-duration': `${Math.max(1, duration)}s`, ...style } as CSSProperties}
        />
    )
}
