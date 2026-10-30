import { useState, useEffect } from 'react'

export function getPostHogInstanceCookie(): string | undefined {
    return document.cookie
        .split('; ')
        ?.filter((row) => row.startsWith('ph_current_instance='))
        ?.map((c) => c.split('=')?.[1])?.[0]
}

/**
 * Returns the user's PostHog app instance URL if they're authenticated to app.posthog.com
 * (i.e. the `ph_current_instance` cookie is set), or undefined if not.
 *
 * This is the same cookie check used by the main nav to show
 * "Open PostHog" vs "Get started free".
 */
export default function usePostHogInstance(): string | undefined {
    const [instance, setInstance] = useState<string>()

    useEffect(() => {
        const instanceCookie = getPostHogInstanceCookie()
        if (instanceCookie) {
            setInstance(instanceCookie)
        }
    }, [])

    return instance
}
