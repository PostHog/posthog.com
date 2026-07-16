import React from 'react'
import OSButton from 'components/OSButton'
import usePostHogInstance from '../../hooks/usePostHogInstance'

/**
 * An OSButton that swaps its destination when the user is authenticated
 * to the PostHog app (has the `ph_current_instance` cookie).
 *
 * Usage in MDX:
 *   <AuthAwareOSButton variant="primary" to="https://app.posthog.com/signup" authenticatedTo="/docs/foo">
 *     Get started
 *   </AuthAwareOSButton>
 */
export default function AuthAwareOSButton({
    authenticatedTo,
    to,
    external,
    children,
    ...props
}: {
    authenticatedTo: string
    to: string
    external?: boolean
    children: React.ReactNode
    [key: string]: any
}) {
    const posthogInstance = usePostHogInstance()
    const isAuthenticated = !!posthogInstance

    return (
        <OSButton
            asLink
            to={isAuthenticated ? authenticatedTo : to}
            external={isAuthenticated ? false : external}
            {...props}
        >
            {children}
        </OSButton>
    )
}
