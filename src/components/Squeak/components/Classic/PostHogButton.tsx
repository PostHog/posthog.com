import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { Logo } from '@posthog/brand/logo'
import { startPostHogOAuth } from 'lib/posthogOAuth'

interface PostHogButtonProps {
    label?: string
    className?: string
}

// Kicks off the PostHog OAuth flow with a full-page redirect to Strapi, which
// builds the PKCE state and forwards the browser to oauth.posthog.com.
const PostHogButton: React.FC<PostHogButtonProps> = ({ label = 'Sign in with PostHog', className = '' }) => {
    const handleClick = () => startPostHogOAuth()

    return (
        <CallToAction type="secondary" size="sm" width="full" className={className} onClick={handleClick}>
            <span className="flex items-center justify-center gap-2">
                <Logo layout="logomark" className="h-4 w-auto dark:hidden" />
                <Logo layout="logomark" variant="mono" color="white" className="hidden h-4 w-auto dark:block" />
                {label}
            </span>
        </CallToAction>
    )
}

export default PostHogButton
