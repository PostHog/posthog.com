import React, { useRef, useState } from 'react'
import Input from 'components/OSForm/input'
import OSButton from 'components/OSButton'
import usePostHog from '../../hooks/usePostHog'
import useProduct from '../../hooks/useProduct'
import usePrimeEarlyAccessFeatures from '../../hooks/usePrimeEarlyAccessFeatures'
import { useApp } from '../../context/App'
import Link from 'components/Link'
import { IconDiscord } from 'components/OSIcons/Icons'

// PostHog Code's concept-stage Early Access Feature flag. Its EAF is named
// "PostHog Code" but the flag key is `twig`.
const POSTHOG_CODE_FLAG_KEY = 'twig'

interface WaitlistFormProps {
    autoFocus?: boolean
    confetti?: boolean
    productHandle?: string
    productName?: string
    surveyId?: string
    /** Feature flag key of the concept-stage Early Access Feature this waitlist belongs to. */
    flagKey?: string
    showTitle?: boolean
    buttonLabel?: string
    showDiscord?: boolean
}

export function WaitlistForm({
    autoFocus = false,
    confetti = true,
    productHandle = 'posthog_code',
    productName = 'PostHog Code',
    surveyId,
    flagKey,
    showTitle = true,
    buttonLabel = 'Get updates',
    showDiscord = true,
}: WaitlistFormProps) {
    const posthog = usePostHog()
    const selectedProduct = useProduct({ handle: productHandle })
    const { setConfetti } = useApp()
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Only default the PostHog Code flag when we're actually collecting for PostHog Code —
    // callers with their own productHandle (e.g. Replay Vision) must pass flagKey explicitly.
    const effectiveFlagKey = flagKey ?? (productHandle === 'posthog_code' ? POSTHOG_CODE_FLAG_KEY : undefined)

    // Load the EAF list before submit so the enrollment event carries $early_access_feature_name —
    // the Customer.io waitlist flow's trigger requires it.
    usePrimeEarlyAccessFeatures(effectiveFlagKey)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return
        if (surveyId) {
            posthog?.capture('survey sent', {
                $survey_id: surveyId,
                $survey_response: email,
            })
        }
        posthog?.capture('subscribe_to_product_updates', { email, selectedProduct })
        if (effectiveFlagKey) {
            // Mirror the in-app coming-soon waitlist: fire $feature_enrollment_update with
            // $feature_enrollment_stage 'concept' and set $feature_enrollment/<flag> on the person.
            posthog?.updateEarlyAccessFeatureEnrollment?.(effectiveFlagKey, true, 'concept')
        }
        // Set email on the person so downstream flows triggered by the enrollment event can reach them.
        posthog?.setPersonProperties?.({ email })
        if (confetti) {
            setConfetti(true)
        }
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <p className="text-sm mt-0 mb-4 border border-green rounded-md p-3 bg-green/10">
                <strong>You&apos;re on the list!</strong>
                <br />
                We&apos;ll let you know when <span className="inline-block">{productName}</span> is ready.
                {showDiscord && (
                    <>
                        <br />
                        <br />
                        <Link
                            className="group flex items-center gap-1 text-sm font-medium"
                            to="https://discord.com/invite/E9xV2WnR98"
                            externalNoIcon
                        >
                            <IconDiscord className="size-6 text-secondary group-hover:text-primary" />
                            <span className="group-hover:underline">Join our Discord</span>
                        </Link>
                    </>
                )}
            </p>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            {showTitle && <h3 className="text-lg font-bold mb-2 !mt-0">Join the waitlist</h3>}
            <Input
                ref={inputRef}
                autoFocus={autoFocus}
                label="Email"
                type="email"
                size="md"
                direction="column"
                showLabel={false}
                placeholder="Email address"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
            />
            <OSButton variant="primary" size="md" width="full" onClick={handleSubmit}>
                {buttonLabel}
            </OSButton>
        </form>
    )
}
