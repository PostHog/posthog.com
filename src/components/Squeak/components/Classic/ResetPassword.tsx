import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { CallToAction } from 'components/CallToAction'
import { useApp } from '../../../../context/App'
import { useWindow } from '../../../../context/Window'
import { useUser } from '../../../../hooks/useUser'
import Wizard from 'components/Wizard'
import { navigate } from 'gatsby'

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

const ResetPasswordForm: React.FC = () => {
    const { login } = useUser()
    const { setWindowTitle, closeWindow, openSignIn } = useApp()
    const { appWindow } = useWindow()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [code, setCode] = useState<string | null>(null)

    const { handleSubmit, submitForm, touched, errors, getFieldProps, isSubmitting } = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validate: (values) => {
            const errors: any = {}
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 6) {
                errors.password = 'Password must be at least 6 characters'
            }
            if (!values.confirmPassword) {
                errors.confirmPassword = 'Required'
            } else if (values.password !== values.confirmPassword) {
                errors.confirmPassword = 'Passwords must match'
            }
            return errors
        },
        onSubmit: async (values) => {
            if (!code) {
                setErrorMessage('Invalid password reset token')
                return
            }

            setErrorMessage('')

            try {
                const body = {
                    code,
                    password: values.password,
                    passwordConfirmation: values.password,
                }

                const response = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/auth/reset-password`, {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'content-type': 'application/json',
                    },
                })

                const { error, user } = await response.json()

                if (error) {
                    setErrorMessage(error?.message || 'There was an error resetting your password. Please try again.')
                } else {
                    // Log in the user with their new password
                    await login({
                        email: user.email,
                        password: values.password,
                    })

                    if (appWindow) {
                        closeWindow(appWindow)
                    }
                    navigate('/community')
                }
            } catch (err) {
                setErrorMessage('There was an error resetting your password. Please try again.')
            }
        },
    })

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Reset your password')
        }

        // Get the reset code from URL parameters
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window?.location?.search)
            const resetCode = params.get('code')
            if (resetCode) {
                setCode(resetCode)
            }
        }
    }, [])

    return (
        <div className="size-full">
            <Wizard
                rightNavigation={
                    <div className="flex items-center space-x-2">
                        {errorMessage && <p className="text-red text-sm m-0 font-bold">{errorMessage}</p>}

                        <CallToAction
                            disabled={isSubmitting || !code}
                            type="primary"
                            size="sm"
                            onClick={submitForm}
                            className="flex-shrink-0"
                        >
                            {isSubmitting ? <IconSpinner className="size-4 animate-spin my-0.5" /> : 'Reset password'}
                        </CallToAction>
                    </div>
                }
            >
                <div className="bg-accent flex gap-6 px-8 py-6 flex-1">
                    <div className="max-w-20">
                        <img src={SecurityHog} className="w-20" />
                    </div>
                    <div data-scheme="primary" className="flex-1">
                        <h3 className="text-base font-semibold leading-tight mb-4">
                            {code ? 'Enter your new password' : 'Invalid reset link'}
                        </h3>
                        {code && (
                            <form onSubmit={handleSubmit} className="space-y-2 mb-4">
                                <Input
                                    label="New password"
                                    type="password"
                                    touched={!!touched.password}
                                    error={errors.password}
                                    {...getFieldProps('password')}
                                />
                                <Input
                                    label="Confirm password"
                                    type="password"
                                    touched={!!touched.confirmPassword}
                                    error={errors.confirmPassword}
                                    {...getFieldProps('confirmPassword')}
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

export default ResetPasswordForm
