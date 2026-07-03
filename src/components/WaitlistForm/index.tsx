import React from 'react'
import usePostHog from '../../hooks/usePostHog'
import useProduct from '../../hooks/useProduct'
import SurveySignup from 'components/SurveySignup'

// The "PostHog Code waitlist" survey — the same list the /roadmap card and the in-app
// feature previews collect into, so every PostHog Code sign-up lands in one place.
const POSTHOG_CODE_SURVEY_ID = '019f28e8-1d35-0000-8d35-dbb342060f06'
const POSTHOG_CODE_SURVEY_QUESTION_ID = 'ccffb103-2c9a-4bd3-bede-0ddfbf3288b9'

interface WaitlistFormProps {
    autoFocus?: boolean
    confetti?: boolean
    productHandle?: string
    productName?: string
    surveyId?: string
    surveyQuestionId?: string
    showTitle?: boolean
    buttonLabel?: string
    showDiscord?: boolean
}

export function WaitlistForm({
    autoFocus = false,
    confetti = true,
    productHandle = 'posthog_code',
    productName = 'PostHog Code',
    surveyId = POSTHOG_CODE_SURVEY_ID,
    surveyQuestionId,
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

    // Keep the product-updates analytics event alongside the survey response.
    const handleSuccess = (email: string) => {
        posthog?.capture('subscribe_to_product_updates', { email, selectedProduct })
    }

    return (
        <SurveySignup
            surveyId={surveyId}
            surveyQuestionId={effectiveQuestionId}
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
