import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import { CallToAction } from 'components/CallToAction'
import { useApp } from '../../../../context/App'
import { useWindow } from '../../../../context/Window'
import { User, useUser } from '../../../../hooks/useUser'
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
                    className={`rounded-md border p-1 ${touched && error ? '!border-red' : '!border-primary'}`}
                    type={type}
                    id={props.name}
                    placeholder={label}
                    {...props}
                />
            </div>
        </div>
    )
}

const errorMessages: Record<string, string> = {
    'Invalid identifier or password': 'Invalid email or password',
}

interface SignInFormProps {
    onSuccess?: (user: User) => void
}

const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
    const { login } = useUser()
    const { setWindowTitle, closeWindow, openRegister, openForgotPassword } = useApp()
    const { appWindow } = useWindow()
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const { handleSubmit, submitForm, touched, errors, getFieldProps, isSubmitting } = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: (values) => {
            const errors: any = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            }
            return errors
        },
        onSubmit: async (values) => {
            setErrorMessage('')
            const user = await login({
                email: values.email,
                password: values.password,
            })
            if (!user) {
                setErrorMessage('There was an error signing in. Please try again.')
            } else if ('error' in user) {
                setErrorMessage(errorMessages[user?.error] || user?.error)
            } else {
                onSuccess?.(user)
                if (appWindow) {
                    closeWindow(appWindow)
                }
            }
        },
    })

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Welcome to PostHog.com')
        }
    }, [])

    return (
        <div className="size-full">
            <Wizard
                leftNavigation={
                    <button className="text-sm text-red dark:text-yellow font-semibold" onClick={openForgotPassword}>
                        Forgot password?
                    </button>
                }
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
                            {isSubmitting ? <IconSpinner className="size-4 animate-spin my-0.5" /> : 'Login'}
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
                            Enter your email and password to log on to PostHog.com
                        </h3>
                        <form onSubmit={handleSubmit} className="space-y-2 mb-4">
                            <Input
                                label="Email"
                                type="email"
                                touched={!!touched.email}
                                error={errors.email}
                                {...getFieldProps('email')}
                            />
                            <Input
                                label="Password"
                                type="password"
                                touched={!!touched.password}
                                error={errors.password}
                                {...getFieldProps('password')}
                            />
                            <button type="submit" className="hidden" />
                        </form>
                        <div className="text-sm">
                            No account yet?{' '}
                            <button className="text-red dark:text-yellow font-semibold" onClick={openRegister}>
                                Register here
                            </button>
                        </div>
                    </div>
                </div>
            </Wizard>
        </div>
    )
}

export default SignInForm
