import React from 'react'
import usePostHog from '../../hooks/usePostHog'
import useProduct from '../../hooks/useProduct'
import SurveySignup from 'components/SurveySignup'

// PostHog Desktop's concept-stage Early Access Feature flag. Its EAF is named
// "PostHog Desktop" but the flag key is `twig`.
const POSTHOG_CODE_FLAG_KEY = 'twig'

interface WaitlistFormProps {
    autoFocus?: boolean
    confetti?: boolean
    productHandle?: string
    productName?: string
    surveyId?: string
    surveyQuestionId?: string
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
    productName = 'PostHog Desktop',
    surveyId,
    flagKey,
    showTitle = true,
    buttonLabel = 'Get updates',
    showDiscord = true,
}: WaitlistFormProps) {
    const posthog = usePostHog()
    const selectedProduct = useProduct({ handle: productHandle })
    // Only apply the PostHog Code question id when we're actually using its survey —
    // callers that pass their own surveyId (e.g. Replay Vision) have different questions.
    const effectiveQuestionId =
        surveyQuestionId ?? (surveyId === POSTHOG_CODE_SURVEY_ID ? POSTHOG_CODE_SURVEY_QUESTION_ID : undefined)
    // Same guard for the enrollment flag: only default to PostHog Code's flag when we're
    // actually collecting for PostHog Code.
    const effectiveFlagKey = flagKey ?? (surveyId === POSTHOG_CODE_SURVEY_ID ? POSTHOG_CODE_FLAG_KEY : undefined)

    // Only default the PostHog Desktop flag when we're actually collecting for PostHog Desktop —
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
    }

    return (
        <SurveySignup
            surveyId={surveyId}
            surveyQuestionId={effectiveQuestionId}
            flagKey={effectiveFlagKey}
            productName={productName}
            title={showTitle ? 'Join the waitlist' : undefined}
            buttonLabel={buttonLabel}
            autoFocus={autoFocus}
            confetti={confetti}
            showDiscord={showDiscord}
            successMessage={
                <>
                    We&apos;ll let you know when <span className="inline-block">{productName}</span> is ready.
                </>
            }
            onSuccess={handleSuccess}
        />
    )
}
