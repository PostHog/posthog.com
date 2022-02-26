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

export default function AskAQuestion({ buttonText, subject = true, onSubmit }) {
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
                .select('first_name, last_name, avatar')
                .eq('id', user.id)
                .single()
            setUserValues({
                email: user.email,
                firstName: data?.first_name,
                lastName: data?.last_name,
                avatar: data?.avatar,
            })
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
            <div className="flex items-start space-x-4">
                <Avatar image={userValues.avatar} />
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
                            if (subject && !values.subject) {
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
                            const body = {
                                ...values,
                                slug: location.pathname,
                                timestamp,
                                userID: user?.id,
                            }
                            onSubmit &&
                                onSubmit(body).then(async (data) => {
                                    const { avatar, timestamp } = data
                                    if (user) {
                                        const { data, error } = await supabase.from('profiles').upsert({
                                            id: user.id,
                                            first_name: values.firstName,
                                            last_name: values.lastName,
                                            avatar: avatar,
                                            email: values.email,
                                        })
                                    }

                                    posthog.capture('Question asked')
                                    setTimestamp(timestamp)
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
                                    buttonText={buttonText}
                                    subject={subject}
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
        )
    )
}
