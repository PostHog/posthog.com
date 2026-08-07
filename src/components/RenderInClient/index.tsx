import React, { useEffect, useState } from 'react'
import usePostHog from '../../hooks/usePostHog'

/**
 * RenderInClient gives us a way to skip server-side rendering for specific parts of the app.
 * It resolves issues with "rehydration" when the React component tree doesn't match up with
 * the server-side rendered DOM.
 *
 * This should be used any time we use a feature flag, but may have other uses as well.
 */

const DEFAULT_FLAG_TIMEOUT_MS = 5000

/**
 * `display: contents` keeps the wrapper from generating a box of its own, so the placeholder's
 * children stay direct participants in whatever flex/grid parent the caller put us in — wrapping
 * in a plain `<div>` would break layout for the inline callers (SignupCTA, Job/Apply, Handbook).
 *
 * `visibility` is an inherited property, so `hidden` cascades into the placeholder's subtree
 * even though the wrapper itself draws nothing. We use `visibility` rather than `display: none`
 * or `opacity` deliberately: the placeholder still takes up its normal space (so there's no layout
 * shift when the real render swaps in), but it isn't painted, isn't focusable, and is dropped from
 * the accessibility tree.
 */
const HIDDEN_PLACEHOLDER_STYLE: React.CSSProperties = {
    display: 'contents',
    visibility: 'hidden',
}

/**
 * If scripting is disabled the placeholder is never swapped out and never revealed, which would
 * leave the page permanently invisible. Anything parsing the raw HTML without applying CSS (most
 * non-rendering crawlers) is unaffected either way, but this covers the ones that do apply it.
 *
 * Note this does *not* cover a JS bundle that starts loading and then fails — `<noscript>` only
 * applies when scripting is off, so a chunk load error on a page using `hidePlaceholder` still
 * leaves it hidden.
 */
const NOSCRIPT_REVEAL = `<style>[data-render-in-client-placeholder]{visibility:visible!important}</style>`

export const RenderInClient = ({
    placeholder = null,
    waitForFlags = true,
    hidePlaceholder = false,
    flagTimeoutMs = DEFAULT_FLAG_TIMEOUT_MS,
    render,
}: {
    /**
     * A component to show initially, which will later be replaced by the
     * child when mounted in the client. Best for when you want to avoid layout shifts and
     * you can approximately match the final component shape with some placeholder
     */
    placeholder?: JSX.Element | null
    render: () => JSX.Element
    waitForFlags?: boolean
    /**
     * Render the placeholder into the DOM but keep it invisible until flags resolve (or
     * `flagTimeoutMs` elapses), instead of showing it and then swapping.
     *
     * The point is to trade a visible flash of the placeholder for a blank space of the same
     * shape. Crawlers that read the HTML without applying CSS still get the full placeholder
     * markup, which is why this hides rather than omits.
     *
     * Two costs worth knowing before you reach for this, both of which scale with how long flags
     * take to arrive:
     *
     * - Hidden content is never painted, so the placeholder can't be an LCP candidate. LCP for
     *   the wrapped region becomes gated on the flags round trip.
     * - When flags never arrive at all — an ad blocker, most commonly — the region stays blank
     *   for the full `flagTimeoutMs` before the fallback renders. Tune the timeout accordingly.
     *
     * Has no effect when `placeholder` is null.
     */
    hidePlaceholder?: boolean
    /**
     * How long to wait for flags before giving up and rendering anyway. Defaults to 5s.
     */
    flagTimeoutMs?: number
}): JSX.Element | null => {
    if (process.env.WAIT_FOR_FLAGS === '0') {
        waitForFlags = false
    }
    const posthog = usePostHog()
    const [hasMounted, setHasMounted] = useState(false)
    const [hasFlags, setHasFlags] = useState(false)
    const [flagsUnavailable, setFlagsUnavailable] = useState(false)

    useEffect(() => {
        setHasMounted(true)
        posthog?.onFeatureFlags(() => {
            setHasFlags(true)
        })
    }, [posthog])

    // check after the timeout to see if we have flags yet. if not, likely blocked by
    // adblocker or some other issue. Render the component, which should show the
    // default variant.
    useEffect(() => {
        const timeout = setTimeout(() => {
            setFlagsUnavailable(true)
        }, flagTimeoutMs)
        return () => clearTimeout(timeout)
    }, [flagTimeoutMs])

    if (!hasMounted || (waitForFlags && !hasFlags && !flagsUnavailable)) {
        if (!hidePlaceholder || placeholder === null) {
            return placeholder
        }

        // This branch renders identically on the server and on the first client render, so the
        // wrapper is present in the SSR HTML and hydration still matches.
        return (
            <>
                <noscript dangerouslySetInnerHTML={{ __html: NOSCRIPT_REVEAL }} />
                <div data-render-in-client-placeholder style={HIDDEN_PLACEHOLDER_STYLE}>
                    {placeholder}
                </div>
            </>
        )
    }

    return render()
}
