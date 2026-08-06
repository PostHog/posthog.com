import React from 'react'
import { CallToAction } from 'components/CallToAction'
import { Logo } from '@posthog/brand/logo'
import { SQUEAK_HOST } from 'lib/strapi'

interface PostHogButtonProps {
    label?: string
    className?: string
}

// Kicks off the PostHog OAuth flow with a full-page redirect to Strapi, which
// builds the PKCE state and forwards the browser to oauth.posthog.com.
const PostHogButton: React.FC<PostHogButtonProps> = ({ label = 'Sign in with PostHog', className = '' }) => {
    const handleClick = () => {
        window.location.href = `${SQUEAK_HOST}/api/connect/posthog`
    }

    return (
        <CallToAction type="secondary" size="sm" width="full" className={className} onClick={handleClick}>
            <span className="flex items-center justify-center gap-2">
                <Logo layout="logomark" className="h-4 w-auto" />
                {label}
            </span>
        </CallToAction>
    )
}

export default PostHogButton
