import React from 'react'

import WizardCommand from 'components/WizardCommand'
import usePostHog from '../../hooks/usePostHog'

/**
 * The universal escape hatch: manual signup + local wizard run. Region-aware like SignupLink
 * (the literal posthog.com/signup URL rewrites to /pricing, so we always link the cloud signup).
 * Never render this on the degraded panel — there the account already exists and "sign up"
 * would be wrong advice.
 */
export default function ManualFallback({ prominent = false }: { prominent?: boolean }): JSX.Element {
    const posthog = usePostHog()
    const region = posthog?.isFeatureEnabled && posthog?.isFeatureEnabled('direct-to-eu-cloud') ? 'eu' : 'app'

    return (
        <div className={`${prominent ? 'mt-4' : 'mt-4 pt-4 border-t border-border'} text-sm`}>
            <p className={`mb-2 ${prominent ? 'font-semibold' : 'opacity-70'}`}>
                Prefer to do it yourself?{' '}
                <a href={`https://${region}.posthog.com/signup`} className="font-semibold underline hover:opacity-75">
                    Sign up manually
                </a>{' '}
                and run the wizard locally:
            </p>
            <WizardCommand slim />
        </div>
    )
}
