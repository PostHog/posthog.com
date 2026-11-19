import React from 'react'
import type { CSSProperties, HTMLAttributes } from 'react'
import { useTextAnimation } from '../textEffects'
import { cn } from '../../../utils'
import './styles.css'

export type GradientPalette = 'sunset' | 'citrus' | 'fresh' | 'ocean' | 'dusk'
export type GradientTextProps = HTMLAttributes<HTMLSpanElement> & {
    palette?: GradientPalette
    animate?: boolean
    duration?: number
}

const palettes: Record<GradientPalette, string> = {
    sunset: '[--gradient-a:theme(colors.brand.coral.DEFAULT)] [--gradient-b:theme(colors.brand.tangerine.DEFAULT)] [--gradient-c:theme(colors.brand.yellow.DEFAULT)]',
    citrus: '[--gradient-a:theme(colors.brand.tangerine.DEFAULT)] [--gradient-b:theme(colors.brand.yellow.DEFAULT)] [--gradient-c:theme(colors.brand.lemon.DEFAULT)]',
    fresh: '[--gradient-a:theme(colors.brand.lime.DEFAULT)] [--gradient-b:theme(colors.brand.green.DEFAULT)] [--gradient-c:theme(colors.brand.teal.DEFAULT)]',
    ocean: '[--gradient-a:theme(colors.brand.corn-blue.DEFAULT)] [--gradient-b:theme(colors.brand.blue.DEFAULT)] [--gradient-c:theme(colors.brand.cobalt.DEFAULT)]',
    dusk: '[--gradient-a:theme(colors.brand.violet.DEFAULT)] [--gradient-b:theme(colors.brand.purple.DEFAULT)] [--gradient-c:theme(colors.brand.coral.DEFAULT)]',
}

export function GradientText({
    palette = 'sunset',
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
