import React from 'react'
import { Logo as BrandLogo, type LogoProps as BrandLogoProps } from '@posthog/brand/logo'

export type LogoProps = Omit<BrandLogoProps, 'color' | 'layout'> & {
    /** @deprecated Use `layout="logomark"` from `@posthog/brand/logo` in new code. */
    wordmark?: boolean
    /** @deprecated Use `layout="stacked"` from `@posthog/brand/logo` in new code. */
    stacked?: boolean
    /** Supports the website's legacy semantic `primary` color in addition to CSS colors. */
    color?: string
}

const resolveColor = (color: string): string => {
    if (color === 'primary') return 'currentColor'
    if (color === 'white') return '#FAFAFA'
    if (color === 'black') return '#111'
    return color
}

/**
 * Compatibility adapter for the canonical logo from `@posthog/brand`.
 *
 * Existing call sites size the logo by height, so the adapter preserves the old automatic-width
 * behavior. New code that does not need the legacy props should import from `@posthog/brand/logo`.
 */
export default function Logo({
    variant = 'gradient',
    color = 'black',
    wordmark = true,
    stacked = false,
    className = '',
    width = 'auto',
    title = 'PostHog logo',
    ...svgProps
}: LogoProps): JSX.Element {
    const layout = wordmark ? (stacked ? 'stacked' : 'landscape') : 'logomark'
    const usesSemanticColor = variant === 'mono' && color === 'primary'

    return (
        <BrandLogo
            {...svgProps}
            variant={variant}
            layout={layout}
            color={variant === 'mono' ? resolveColor(color) : undefined}
            className={[usesSemanticColor ? 'text-primary' : '', className].filter(Boolean).join(' ')}
            width={width}
            title={title}
        />
    )
}
