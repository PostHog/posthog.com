import React from 'react'

export type GlowColor =
    | 'yellow'
    | 'blue'
    | 'red'
    | 'green'
    | 'purple'
    | 'orange'
    | 'teal'
    | 'seagreen'
    | 'black'
    | 'white'
export type GlowSize = 'sm' | 'md' | 'lg' | 'xl'
export type GlowIntensity = 'gentle' | 'soft' | 'medium' | 'strong'
export type GlowRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface GlowProps {
    color: GlowColor
    size?: GlowSize
    intensity?: GlowIntensity
    rounded?: GlowRounded
    as?: keyof JSX.IntrinsicElements
    className?: string
    glowClassName?: string
    /**
     * When true, the glow starts hidden and fades in/out on hover of the wrapper.
     * Uses a named Tailwind group (`group/glow`) so it doesn't collide with other groups.
     */
    hover?: boolean
    children: React.ReactNode
}

const colorMap: Record<GlowColor, string> = {
    yellow: 'bg-yellow',
    blue: 'bg-blue',
    red: 'bg-red',
    green: 'bg-green',
    purple: 'bg-purple',
    orange: 'bg-orange',
    teal: 'bg-teal',
    seagreen: 'bg-seagreen',
    black: 'bg-black',
    white: 'bg-white',
}

const sizeMap: Record<GlowSize, string> = {
    sm: '-inset-3',
    md: '-inset-6',
    lg: '-inset-10',
    xl: '-inset-16',
}

const blurMap: Record<GlowIntensity, string> = {
    gentle: 'blur-2xl',
    soft: 'blur-2xl',
    medium: 'blur-3xl',
    strong: 'blur-3xl',
}

const opacityMap: Record<GlowIntensity, string> = {
    gentle: 'opacity-10',
    soft: 'opacity-25',
    medium: 'opacity-40',
    strong: 'opacity-60',
}

const hoverOpacityMap: Record<GlowIntensity, string> = {
    gentle: 'group-hover/glow:opacity-10',
    soft: 'group-hover/glow:opacity-25',
    medium: 'group-hover/glow:opacity-40',
    strong: 'group-hover/glow:opacity-60',
}

const roundedMap: Record<GlowRounded, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
}

const Glow = ({
    color,
    size = 'md',
    intensity = 'medium',
    rounded = 'lg',
    as = 'div',
    className,
    glowClassName,
    hover = false,
    children,
}: GlowProps) => {
    const Wrapper = as as any
    const wrapperClass = `relative ${hover ? 'group/glow' : ''} ${className ?? ''}`
    const opacityClass = hover
        ? `opacity-0 ${hoverOpacityMap[intensity]} transition-opacity duration-700 ease-out`
        : opacityMap[intensity]

    return (
        <Wrapper className={wrapperClass}>
            <div
                aria-hidden
                className={`pointer-events-none absolute z-1 ${sizeMap[size]} ${colorMap[color]} ${
                    blurMap[intensity]
                } ${opacityClass} ${roundedMap[rounded]} ${glowClassName ?? ''}`}
            />
            <div className="relative z-2 w-full h-full">{children}</div>
        </Wrapper>
    )
}

export default Glow
