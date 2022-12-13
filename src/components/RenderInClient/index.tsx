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
    children,
}: {
    /**
     * A component to show initially, which will later be replaced by the
     * child when mounted in the client. Best for when you want to avoid layout shifts and
     * you can approximately match the final component shape with some placeholder
     */
    placeholder?: JSX.Element | null
    children: JSX.Element
}): JSX.Element | null => {
    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    if (!hasMounted) {
        return placeholder
    }

    return children
}
