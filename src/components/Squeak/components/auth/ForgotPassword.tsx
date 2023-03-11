import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useOrg } from '../../hooks/useOrg'
import { post } from '../../lib/api'

type ForgotPasswordProps = {
    apiHost: string
    setMessage: (message: any) => void
    setParentView?: (view: string) => void
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setMessage, setParentView, apiHost }) => {
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const { organizationId } = useOrg()

    const handleSubmit = async (values: any) => {
        setLoading(true)
        const { error } =
            (await post(apiHost, '/api/password/forgot', {
                email: values.email,
                redirect: window.location.href,
                organizationId,
            })) || {}

        if (error) {
            // @ts-ignore
            setMessage(error.message)
        } else {
            setEmailSent(true)
        }

        setLoading(false)
    }

    const handleReturnToPost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setParentView?.('question-form')
    }

    return (
        <Formik
            validateOnMount
            initialValues={{
                email: '',
            }}
            validate={(values) => {
                const errors: any = {}
                if (!values.email) {
                    errors.email = 'Required'
                }
                return errors
            }}
            onSubmit={handleSubmit}
        >
            {({ isValid }) => {
                return (
                    <Form>
                        <label htmlFor="email">Email address</label>
                        <Field required id="email" name="email" type="email" placeholder="Email address..." />
                        {emailSent ? (
                            <div>
                                <p>Check your email for password reset instructions</p>
                                <p>
                                    <button onClick={handleReturnToPost} className="squeak-return-to-post">
                                        Click here
                                    </button>{' '}
                                    to return to your post
                                </p>
                            </div>
                        ) : (
                            <button style={loading || !isValid ? { opacity: '.5' } : {}} type="submit">
                                Send password reset instructions
                            </button>
                        )}
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ForgotPassword
