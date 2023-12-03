import React, { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { inputClasses, labelClasses } from '../Authentication'
import Button from '../Button'

type ForgotPasswordProps = {
    apiHost: string
    setMessage: (message: any) => void
    setParentView?: (view: string) => void
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setMessage, setParentView, apiHost }) => {
    const [loading, setLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)

    const handleSubmit = async (values: any) => {
        setLoading(true)

        const body = {
            email: values.email,
        }

        const { error } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/auth/forgot-password`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
            },
        }).then((res) => res.json())

        if (error) {
            setMessage(error?.message)
        } else {
            setEmailSent(true)
        }

        setLoading(false)
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
                    <Form className="m-0">
                        <label className={labelClasses} htmlFor="email">
                            Email address
                        </label>
                        <Field
                            className={inputClasses}
                            required
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email address..."
                        />
                        {emailSent ? (
                            <div>
                                <p className="pb-4 m-0 text-sm">Check your email for password reset instructions</p>
                            </div>
                        ) : (
                            <Button width="full" className="mb-4" loading={loading} disabled={loading || !isValid}>
                                Send password reset instructions
                            </Button>
                        )}
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ForgotPassword
