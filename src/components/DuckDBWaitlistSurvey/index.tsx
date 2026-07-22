import React, { useState } from 'react'
import usePostHog from '../../hooks/usePostHog'
import OSButton from 'components/OSButton'
import SurveySignup from 'components/SurveySignup'

// "DuckDB managed warehouse waitlist" — linked to the managed-duckdb-data-warehouse
// feature flag, so this page, the /roadmap card, and the in-app feature previews all
// collect into the same survey.
const SURVEY_ID = '019b05b2-973f-0000-8f68-f8326c077146'
const SURVEY_QUESTION_ID = '3f087a80-6c74-49b4-a615-588f50fa34d3'
const FLAG_KEY = 'managed-duckdb-data-warehouse'

export default function DuckDBWaitlistSurvey(): JSX.Element {
    const [showForm, setShowForm] = useState(false)
    const posthog = usePostHog()

    // Preserve the existing person-property flag used by downstream follow-up.
    const handleSuccess = () => {
        posthog?.setPersonProperties({ duckdb_waitlist: true })
    }

    if (!showForm) {
        return (
            <OSButton onClick={() => setShowForm(true)} variant="primary" size="md">
                Join the waitlist
            </OSButton>
        )
    }

    return (
        <div
            data-scheme="secondary"
            className="@container bg-primary dark:bg-dark border border-primary rounded-md p-4"
        >
            <SurveySignup
                surveyId={SURVEY_ID}
                surveyQuestionId={SURVEY_QUESTION_ID}
                flagKey={FLAG_KEY}
                productName="Managed warehouse"
                buttonLabel="Submit"
                autoFocus
                confetti={false}
                successMessage="Thanks! You're on the waitlist. We'll be in touch soon."
                onSuccess={handleSuccess}
            />
        </div>
    )
}
