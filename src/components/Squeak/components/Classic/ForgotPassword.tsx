import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { CallToAction } from 'components/CallToAction'
import { useApp } from '../../../../context/App'
import { useWindow } from '../../../../context/Window'
import Wizard from 'components/Wizard'

import SecurityHog from '../../../../images/security-hog.png'
import { IconSpinner } from '@posthog/icons'

const Input = ({
    label,
    type = 'text',
    touched,
    error,
    ...props
}: {
    label: string
    type?: string
    touched: boolean
    error?: string
    [key: string]: any
}) => {
    return (
        <div className="flex items-center space-x-2">
            <label htmlFor={props.name} className="w-[90px] font-semibold text-sm">
                {label}
            </label>
            <div>
                <input
                    className={`rounded-md border p-1 ${touched && error ? '!border-red' : '!border-border'}`}
                    type={type}
                    id={props.name}
                    placeholder={label}
                    {...props}
                />
            </div>
        </div>
    )
}

const ForgotPasswordForm: React.FC = () => {
    const { setWindowTitle, openSignIn } = useApp()
    const { appWindow } = useWindow()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [emailSent, setEmailSent] = useState(false)

    const { handleSubmit, submitForm, touched, errors, getFieldProps, isSubmitting } = useFormik({
        initialValues: {
            email: '',
        },
        validate: (values) => {
            const errors: any = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: async (values) => {
            setErrorMessage('')

            try {
                const body = {
                    email: values.email,
                }

                const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/auth/forgot-password`, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'content-type': 'application/json',
                    },
                })

                const { error } = await response.json()

                if (error) {
                    setErrorMessage(
                        error?.message || 'There was an error sending the password reset email. Please try again.'
                    )
                } else {
                    setEmailSent(true)
                }
            } catch (err) {
                setErrorMessage('There was an error sending the password reset email. Please try again.')
            }
        },
    })

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Reset your password')
        }
    }, [])

    return (
        <div className="size-full">
            <Wizard
                rightNavigation={
                    <div className="flex items-center space-x-2">
                        {errorMessage && <p className="text-red text-sm m-0 font-bold">{errorMessage}</p>}

                        {!emailSent && (
                            <CallToAction
                                disabled={isSubmitting}
                                type="primary"
                                size="sm"
                                onClick={submitForm}
                                className="flex-shrink-0"
                            >
                                {isSubmitting ? (
                                    <IconSpinner className="size-4 animate-spin my-0.5" />
                                ) : (
                                    'Send reset email'
                                )}
                            </CallToAction>
                        )}
                    </div>
                }
            >
                <div className="bg-accent flex gap-6 px-8 py-6 flex-1">
                    <div className="max-w-20">
                        <img src={SecurityHog} className="w-20" />
                    </div>
                    <div data-scheme="primary" className="flex-1">
                        <h3 className="text-base font-semibold leading-tight mb-4">
                            {emailSent ? 'Check your email' : 'Forgot your password?'}
                        </h3>
                        {emailSent ? (
                            <p className="text-sm m-0 mb-4">
                                We've sent you a reset link! Check your email (and spam folder, just in case).
                            </p>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-2 mb-4">
                                <Input
                                    label="Email"
                                    type="email"
                                    touched={!!touched.email}
                                    error={errors.email}
                                    {...getFieldProps('email')}
                                />
                                <button type="submit" className="hidden" />
                            </form>
                        )}
                        <div className="text-sm">
                            Remember your password?{' '}
                            <button className="text-red dark:text-yellow font-semibold" onClick={openSignIn}>
                                Sign in here
                            </button>
                        </div>
                    </div>
                </div>
            </Wizard>
        </div>
    )
}

export default ForgotPasswordForm
