import React, { useEffect, useState } from 'react'
import Input from 'components/OSForm/input'
import OSButton from 'components/OSButton'
import Link from 'components/Link'
import { IconCheckCircle } from '@posthog/icons'
import { IconDiscord } from 'components/OSIcons/Icons'
import { useApp } from '../../context/App'
import usePostHog from '../../hooks/usePostHog'
import usePrimeEarlyAccessFeatures from '../../hooks/usePrimeEarlyAccessFeatures'

interface SurveySignupProps {
    /** PostHog Survey id to record the response against. If omitted, no survey event fires. */
    surveyId?: string
    /** Question id for ID-based responses (`$survey_response_{id}`). Falls back to legacy `$survey_response`. */
    surveyQuestionId?: string
    /**
     * Feature flag key of the concept-stage Early Access Feature this waitlist belongs to.
     * When set, a successful submit also fires `$feature_enrollment_update` with
     * `$feature_enrollment_stage: 'concept'` (mirroring the in-app coming-soon waitlist) and
     * sets the `$feature_enrollment/<flagKey>` + `email` person properties.
     */
    flagKey?: string
    /** Used in success/placeholder copy. */
    productName?: string
    /** Optional heading rendered above the form (hidden in the success state). */
    title?: React.ReactNode
    buttonLabel?: string
    successTitle?: string
    successMessage?: React.ReactNode
    autoFocus?: boolean
    confetti?: boolean
    showDiscord?: boolean
    /** Fired after a successful submit (e.g. to capture an extra analytics event). */
    onSuccess?: (email: string) => void
    className?: string
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

/**
 * A no-login email form that records a sign-up as a PostHog Survey response
 * (`survey sent`). This is the single waitlist mechanism on the site — used by the
 * /roadmap Coming Soon cards, the /code waitlist, and the managed-warehouse waitlist —
 * so every sign-up lands in one place: the survey's responses. When `flagKey` is set it
 * also fires `$feature_enrollment_update` (stage `concept`), matching the in-app waitlist.
 */
export function SurveySignup({
    surveyId,
    surveyQuestionId,
    flagKey,
    productName,
    title,
    buttonLabel = 'Notify me at launch',
    successTitle = "You're on the list!",
    successMessage,
    autoFocus = false,
    confetti = true,
    showDiscord = false,
    onSuccess,
    className = '',
}: SurveySignupProps): JSX.Element {
    const posthog = usePostHog()
    const { setConfetti } = useApp()
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')

    // Load the EAF list before submit so the enrollment event carries $early_access_feature_name —
    // the Customer.io waitlist flow's trigger requires it.
    usePrimeEarlyAccessFeatures(flagKey)

    // Remember sign-ups locally so returning visitors see their "on the list" state
    // instead of being asked again. Best-effort — localStorage can be unavailable.
    useEffect(() => {
        try {
            if (surveyId && window.localStorage?.getItem(`ph-waitlist-${surveyId}`)) {
                setSubmitted(true)
            }
        } catch {
            // Ignore storage access errors (private mode, blocked storage)
        }
    }, [surveyId])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        if (!EMAIL_RE.test(email)) {
            setError('Please enter a valid email address')
            return
        }
        if (surveyId) {
            const props: Record<string, any> = { $survey_id: surveyId, $survey_response: email }
            if (surveyQuestionId) {
                props[`$survey_response_${surveyQuestionId}`] = email
            }
            posthog?.capture('survey sent', props)
            try {
                window.localStorage?.setItem(`ph-waitlist-${surveyId}`, '1')
            } catch {
                // Ignore storage access errors
            }
        }
        if (flagKey) {
            // Mirror the in-app coming-soon waitlist: fire $feature_enrollment_update with
            // $feature_enrollment_stage 'concept' and set $feature_enrollment/<flag> on the person.
            // Optional call — the snippet stub may not expose this method before array.js loads.
            posthog?.updateEarlyAccessFeatureEnrollment?.(flagKey, true, 'concept')
        }
        // Set email on the person so downstream flows triggered by the enrollment event can
        // reach them. This creates a person profile for otherwise-anonymous visitors.
        posthog?.setPersonProperties?.({ email })
        if (confetti) {
            setConfetti(true)
        }
        setSubmitted(true)
        onSuccess?.(email)
    }

    if (submitted) {
        return (
            <div className={`@container ${className}`}>
                <div className="text-sm mt-0 mb-0 border border-green rounded-md p-3 bg-green/10 flex items-center gap-3">
                    <div className="flex flex-col gap-1 flex-1">
                        <span className="flex items-center gap-1 font-bold">
                            <IconCheckCircle className="size-4 text-green" /> {successTitle}
                        </span>
                        <span>{successMessage ?? `We'll email you the moment ${productName ?? 'it'} is ready.`}</span>
                        {showDiscord && (
                            <Link
                                className="group flex items-center gap-1 text-sm font-medium mt-2"
                                to="https://discord.com/invite/E9xV2WnR98"
                                externalNoIcon
                            >
                                <IconDiscord className="size-6 text-secondary group-hover:text-primary" />
                                <span className="group-hover:underline">Join our Discord</span>
                            </Link>
                        )}
                    </div>
                    <img
                        src="https://res.cloudinary.com/dmukukwp6/image/upload/hoggie_mail_48daf2f4b4.png"
                        alt="A hedgehog holding a letter"
                        className="max-h-14 shrink-0"
                    />
                </div>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className={`@container space-y-2 ${className}`}>
            {title && <h3 className="text-lg font-bold mb-2 !mt-0">{title}</h3>}
            <Input
                label="Email"
                type="email"
                size="md"
                direction="column"
                showLabel={false}
                placeholder="Email address"
                value={email}
                autoFocus={autoFocus}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                required
                touched={!!error}
                error={error}
            />
            <OSButton type="submit" variant="primary" size="md" width="full">
                {buttonLabel}
            </OSButton>
        </form>
    )
}

export default SurveySignup
