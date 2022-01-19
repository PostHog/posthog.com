import { useLocation } from '@reach/router'
import { Formik } from 'formik'
import { useValues } from 'kea'
import React, { useState } from 'react'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import AskQuestion from './AskQuestion'
import Avatar from './Avatar'
import QuestionSubmitted from './QuestionSubmitted'

export default function AskAQuestion() {
    const location = useLocation()
    const { posthog } = useValues(posthogAnalyticsLogic)
    const [timestamp, setTimestamp] = useState(null)
    const [emailSubmitted, setEmailSubmitted] = useState(false)
    return (
        <div className="mt-10">
            <h4>Ask a question</h4>
            <div className="flex items-start space-x-4">
                <Avatar />
                <div className="w-full max-w-[405px]">
                    <Formik
                        isInitialValid={false}
                        initialValues={{ name: '', question: '', email: '', 'mary-chain': '' }}
                        validate={(values) => {
                            const errors = {}
                            if (!values.name) {
                                errors.name = 'Required'
                            }
                            if (!values.question) {
                                errors.question = 'Required'
                            }
                            if (timestamp && !values.email) {
                                errors.email = 'Required'
                            }
                            return errors
                        }}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            if (values['mary-chain']) return
                            setSubmitting(true)
                            const body = JSON.stringify({ ...values, slug: location.pathname, timestamp })
                            fetch('/.netlify/functions/ask-a-question', { method: 'POST', body })
                                .then((res) => res.json())
                                .then((data) => {
                                    if (values.email) {
                                        setEmailSubmitted(true)
                                    } else {
                                        setTimestamp(data.timestamp)
                                        resetForm({ values })
                                        posthog.capture('Question asked')
                                    }
                                    setSubmitting(false)
                                })
                        }}
                    >
                        {({ isSubmitting, isValid, values }) => {
                            return !timestamp ? (
                                <AskQuestion loading={isSubmitting} isValid={isValid} />
                            ) : (
                                <QuestionSubmitted
                                    loading={isSubmitting}
                                    values={values}
                                    emailSubmitted={emailSubmitted}
                                    isValid={isValid}
                                />
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    )
}
