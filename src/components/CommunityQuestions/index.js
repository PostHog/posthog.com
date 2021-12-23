import React, { useState } from 'react'
import { Formik } from 'formik'
import { useLocation } from '@reach/router'
import AskQuestion from './AskQuestion'
import Avatar from './Avatar'
import QuestionSubmitted from './QuestionSubmitted'

export default function CommunityQuestions() {
    const location = useLocation()
    const [timestamp, setTimestamp] = useState(null)
    const [emailSubmitted, setEmailSubmitted] = useState(false)

    return (
        <>
            <h4>Ask a question</h4>
            <div className="flex items-start space-x-4">
                <Avatar />
                <div className="w-full max-w-[405px]">
                    <Formik
                        isInitialValid={false}
                        initialValues={{ name: '', question: '', email: '' }}
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
                            setSubmitting(true)
                            const body = JSON.stringify({ ...values, url: location.href, timestamp })
                            fetch('/.netlify/functions/ask-a-question', { method: 'POST', body })
                                .then((res) => res.json())
                                .then((data) => {
                                    if (values.email) {
                                        setEmailSubmitted(true)
                                    } else {
                                        setTimestamp(data.timestamp)
                                        resetForm({ values })
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
        </>
    )
}
