import { useLocation } from '@reach/router'
import { Auth } from '@supabase/ui'
import { Formik } from 'formik'
import { useValues } from 'kea'
import { supabase } from 'lib/supabase'
import React, { useEffect, useState } from 'react'
import { posthogAnalyticsLogic } from '../../logic/posthogAnalyticsLogic'
import AskQuestion from './AskQuestion'
import Avatar from './Avatar'
import QuestionSubmitted from './QuestionSubmitted'

export default function AskAQuestion() {
    const location = useLocation()
    const { posthog } = useValues(posthogAnalyticsLogic)
    const [timestamp, setTimestamp] = useState(null)
    const [emailSubmitted, setEmailSubmitted] = useState(false)
    const [userValues, setUserValues] = useState({})
    const { user } = Auth.useUser()
    const [loading, setLoading] = useState(true)

    const setUser = async () => {
        if (user) {
            const { data, error } = await supabase
                .from('profiles')
                .select('first_name, last_name')
                .eq('id', user.id)
                .single()
            setUserValues({ email: user.email, firstName: data?.first_name, lastName: data?.last_name })
        } else {
            setUserValues({})
        }
        setLoading(false)
    }
    useEffect(() => {
        setUser()
    }, [user])
    return (
        !loading && (
            <div className="mt-10">
                <h4>Ask a question</h4>
                <div className="flex items-start space-x-4">
                    <Avatar />
                    <div className="w-full max-w-[405px]">
                        <Formik
                            isInitialValid={false}
                            initialValues={{
                                firstName: userValues?.firstName || '',
                                lastName: userValues?.lastName || '',
                                question: '',
                                email: user?.email || '',
                                'mary-chain': '',
                            }}
                            validate={(values) => {
                                const errors = {}
                                if (!values.firstName) {
                                    errors.firstName = 'Required'
                                }
                                if (!values.lastName) {
                                    errors.lastName = 'Required'
                                }
                                if (!values.subject) {
                                    errors.subject = 'Required'
                                }
                                if (!values.question) {
                                    errors.question = 'Required'
                                }
                                if (!values.email) {
                                    errors.email = 'Required'
                                }
                                return errors
                            }}
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                if (values['mary-chain']) return
                                setSubmitting(true)
                                if (user && (!userValues.firstName || !userValues.lastName)) {
                                    const { data, error } = await supabase.from('profiles').upsert({
                                        id: user.id,
                                        first_name: values.firstName,
                                        last_name: values.lastName,
                                    })
                                }
                                const body = JSON.stringify({
                                    ...values,
                                    slug: location.pathname,
                                    timestamp,
                                })
                                fetch('/.netlify/functions/ask-a-question', { method: 'POST', body })
                                    .then((res) => res.json())
                                    .then((data) => {
                                        posthog.capture('Question asked')
                                        setTimestamp(data.timestamp)
                                        setEmailSubmitted(true)
                                        setSubmitting(false)
                                    })
                            }}
                        >
                            {({ isSubmitting, isValid, values, setFieldValue, submitForm }) => {
                                return !timestamp ? (
                                    <AskQuestion
                                        userValues={userValues}
                                        submitForm={submitForm}
                                        setFieldValue={setFieldValue}
                                        loading={isSubmitting}
                                        isValid={isValid}
                                    />
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
    )
}
