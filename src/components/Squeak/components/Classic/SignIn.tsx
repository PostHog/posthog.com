import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { CallToAction } from 'components/CallToAction'
import { useApp } from '../../../../context/App'
import { useWindow } from '../../../../context/Window'
import { useUser } from '../../../../hooks/useUser'
import Wizard from 'components/Wizard'
import Link from 'components/Link'

import SecurityHog from '../../../../images/security-hog.png'

const Input = ({ label, name, type = 'text' }: { label: string; name: string; type?: string }) => {
    return (
        <div className="flex items-center space-x-2">
            <label htmlFor={name} className="w-[90px] font-semibold text-sm">
                {label}
            </label>
            <input className="rounded-md border !border-border p-1" type={type} id={name} name={name} />
        </div>
    )
}

const SignInForm: React.FC = () => {
    const { login } = useUser()
    const { setWindowTitle } = useApp()
    const { appWindow } = useWindow()
    const { handleSubmit, submitForm } = useFormik({
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
            await login({
                email: values.email,
                password: values.password,
            })
        },
    })

    useEffect(() => {
        if (appWindow) {
            setWindowTitle(appWindow, 'Welcome to PostHog.com')
        }
    }, [])

    return (
        <Wizard
            leftNavigation={<div className="text-sm">Forgot password?</div>}
            rightNavigation={
                <CallToAction type="primary" size="sm" onClick={submitForm}>
                    Login
                </CallToAction>
            }
        >
            <div className="bg-accent flex gap-6 px-8 py-6">
                <div className="max-w-20">
                    <img src={SecurityHog} className="w-20" />
                </div>
                <div data-scheme="primary" className="flex-1">
                    <h3 className="text-base font-semibold leading-tight">
                        Enter your email and password to log on to PostHog.com
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
                        <Input label="Email" name="email" type="email" />
                        <Input label="Password" name="password" type="password" />
                    </form>

                    <div className="text-sm">
                        No account yet?{' '}
                        <Link to="/signup" state={{ newWindow: true }}>
                            Register today
                        </Link>
                    </div>
                </div>
            </div>
        </Wizard>
    )
}

export default SignInForm
