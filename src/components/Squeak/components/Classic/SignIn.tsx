import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { CallToAction } from 'components/CallToAction'
import { useApp } from '../../../../context/App'
import { useWindow } from '../../../../context/Window'
import { useUser } from '../../../../hooks/useUser'
import Wizard from 'components/Wizard'

const Input = ({ label, name, type = 'text' }: { label: string; name: string; type?: string }) => {
    return (
        <div className="flex items-center">
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
            rightNavigation={
                <CallToAction type="primary" size="sm" onClick={submitForm}>
                    Login
                </CallToAction>
            }
        >
            <div data-scheme="primary" className="p-4 bg-primary my-6">
                <h3 className="text-base font-semibold">Type your email and password to log on to PostHog.com</h3>
                <form onSubmit={handleSubmit} className="space-y-2">
                    <Input label="Email" name="email" type="email" />
                    <Input label="Password" name="password" type="password" />
                </form>
            </div>
        </Wizard>
    )
}

export default SignInForm
