import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { CallToAction } from 'components/CallToAction'
import { useApp } from '../../../../context/App'
import { useWindow } from '../../../../context/Window'
import { useUser } from '../../../../hooks/useUser'
import Wizard from 'components/Wizard'

import SecurityHog from '../../../../images/security-hog.png'
import { IconSpinner } from '@posthog/icons'
import Input from 'components/OSForm/input'
import PostHogButton from './PostHogButton'
import { isPostHogEmail } from 'lib/employee'

const errorMessages: Record<string, string> = {
    'Email or Username are already taken': 'An account with this email already exists',
}

const RegisterForm: React.FC = () => {
    const { signUp } = useUser()
    const { setWindowTitle, closeWindow, openSignIn } = useApp()
    const { appWindow } = useWindow()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { handleSubmit, submitForm, touched, errors, getFieldProps, isSubmitting } = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: any = {}
            if (!values.firstName) {
                errors.firstName = 'Required'
            }
            if (!values.lastName) {
                errors.lastName = 'Required'
            }
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            } else if (isPostHogEmail(values.email)) {
                errors.email = 'Your employee account is created automatically. Sign in with PostHog instead.'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 6) {
                errors.password = 'Password must be at least 6 characters'
            }
            return errors
        },
        onSubmit: async (values) => {
            setErrorMessage('')
            const user = await signUp({
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                password: values.password,
            })

            if (!user) {
                setErrorMessage('There was an error creating your account. Please try again.')
            } else if ('error' in user) {
                setErrorMessage(errorMessages[user?.error] || user?.error)
            } else {
                if (appWindow) {
                    closeWindow(appWindow)
                }
            }
        },
    })

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Register for PostHog.com')
        }
    }, [])

    return (
        <div className="size-full">
            <Wizard
                rightNavigation={
                    <div className="flex items-center space-x-2">
                        {errorMessage && <p className="text-red text-sm m-0 font-bold">{errorMessage}</p>}

                        <CallToAction
                            disabled={isSubmitting}
                            type="primary"
                            size="sm"
                            onClick={submitForm}
                            className="flex-shrink-0"
                        >
                            {isSubmitting ? <IconSpinner className="size-4 animate-spin my-0.5" /> : 'Register'}
                        </CallToAction>
                    </div>
                }
            >
                <div className="bg-accent flex gap-6 px-8 py-6 flex-1 pt-10">
                    <div className="max-w-20">
                        <img src={SecurityHog} className="w-20" />
                    </div>
                    <div data-scheme="primary" className="flex-1">
                        <h3 className="text-base font-semibold leading-tight mb-4">Create your PostHog.com account</h3>
                        <PostHogButton label="Sign up with PostHog" className="mb-2" />
                        <div className="flex items-center gap-2 text-xs text-muted my-2">
                            <span className="flex-1 border-t border-border" />
                            or
                            <span className="flex-1 border-t border-border" />
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-2 mb-4">
                            <Input
                                label="First name"
                                type="text"
                                size="sm"
                                direction="row"
                                touched={!!touched.firstName}
                                error={errors.firstName}
                                {...getFieldProps('firstName')}
                            />
                            <Input
                                label="Last name"
                                type="text"
                                size="sm"
                                direction="row"
                                touched={!!touched.lastName}
                                error={errors.lastName}
                                {...getFieldProps('lastName')}
                            />
                            <Input
                                label="Email"
                                type="email"
                                size="sm"
                                direction="row"
                                touched={!!touched.email}
                                error={errors.email}
                                {...getFieldProps('email')}
                            />
                            <Input
                                label="Password"
                                type="password"
                                size="sm"
                                direction="row"
                                touched={!!touched.password}
                                error={errors.password}
                                {...getFieldProps('password')}
                            />
                            <button type="submit" className="hidden" />
                        </form>
                        <div className="text-sm">
                            Already have an account?{' '}
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

export default RegisterForm
