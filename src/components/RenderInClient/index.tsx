import usePostHog from '../../hooks/usePostHog'
import { useEffect, useState } from 'react'

/**
 * RenderInClient gives us a way to skip server-side rendering for specific parts of the app.
 * It resolves issues with "rehydration" when the React component tree doesn't match up with
 * the server-side rendered DOM.
 *
 * This should be used any time we use a feature flag, but may have other uses as well.
 */

export const RenderInClient = ({
    placeholder = null,
    waitForFlags = true,
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

    // check after 5 seconds to see if we have flags yet. if not, likely blocked by
    // adblocker or some other issue. Render the component, which should show the
    // default variant.
    useEffect(() => {
        setTimeout(() => {
            if (!hasFlags) {
                setFlagsUnavailable(true)
            }
        }, 5000)
    }, [])

    if (!hasMounted || (waitForFlags && !hasFlags && !flagsUnavailable)) {
        return placeholder
    }

    return render()
}
