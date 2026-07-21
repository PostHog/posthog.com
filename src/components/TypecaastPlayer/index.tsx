import React from 'react'
import { Typecaast, type TypecaastConfig, type TypecaastProps } from '@typecaast/react'
import { useInView } from 'react-intersection-observer'
import { useApp } from '../../context/App'

export interface TypecaastPlayerProps extends Omit<TypecaastProps, 'config' | 'theme' | 'className'> {
    /** The exported `typecaast.json` script to play. */
    config: TypecaastConfig
    /** Tailwind height utility for the player box (e.g. `h-96`). Defaults to `h-96`. */
    height?: string
    /** Extra classes on the player element, merged after the base `overflow-hidden rounded` (e.g. `border border-primary`). */
    className?: string
    /** Extra classes on the outer `flex {height}` sizing container. */
    containerClassName?: string
    /** Override the theme; defaults to the site's light/dark setting. */
    theme?: TypecaastProps['theme']
    /**
     * Hold playback at the first frame until the player is scrolled into view. Defaults to
     * true so an embed never plays out of sight. Set false to play immediately on mount.
     */
    playWhenInView?: boolean
    /** Visible fraction that counts as "in view" (default 0.99 ≈ fully). */
    inViewThreshold?: number
}

/**
 * Thin wrapper around `@typecaast/react` for embedding Typecaast scripts across posthog.com.
 *
 * Centralizes the boilerplate every embed on a page otherwise repeats:
 * - derives `theme` from the site's light/dark setting (no per-call `useApp`/`isDark`)
 * - renders a `flex {height}` sizing box around the standard `overflow-hidden rounded` player
 * - defaults `autoplay` and `isolate` on — `isolate` mounts the widget in a shadow root so the
 *   page's global `.prose`/Tailwind styles can't leak in and distort it
 *
 * Call sites pass the `config` (script) and a `height`. Every other `@typecaast/react` prop
 * (`loop`, `paused`, `rate`, `onEnded`, `ref`, …) is forwarded, so per-instance tuning — e.g.
 * `paused` to halt off-screen players when many are mounted — stays available.
 *
 * SSR-safe: Typecaast renders a correctly-sized box on the server and hydrates its visuals in,
 * so no client-only guard is needed (the package's `'use client'` banner is a benign,
 * webpack-ignored directive under Gatsby).
 */
export default function TypecaastPlayer({
    config,
    height = 'h-96',
    className = '',
    containerClassName = '',
    autoplay = true,
    isolate = true,
    theme,
    playWhenInView = true,
    inViewThreshold = 0.99,
    paused,
    ...rest
}: TypecaastPlayerProps): JSX.Element {
    const { siteSettings } = useApp()
    const resolvedTheme = theme ?? (siteSettings.theme === 'dark' ? 'dark' : 'light')

    const { ref: containerRef, inView } = useInView({ threshold: inViewThreshold, triggerOnce: true })
    const isPaused = (playWhenInView && !inView) || !!paused

    return (
        <div ref={containerRef} className={`flex ${height} ${containerClassName}`.trim()}>
            <Typecaast
                config={config}
                autoplay={autoplay}
                isolate={isolate}
                theme={resolvedTheme}
                paused={isPaused}
                className={`overflow-hidden rounded ${className}`.trim()}
                {...rest}
            />
        </div>
    )
}
