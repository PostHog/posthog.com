import React from 'react'
import { Field, Form, Formik } from 'formik'
import { User, useUser } from 'hooks/useUser'
import { inputClasses, labelClasses } from '../Authentication'
import Button from '../Button'

type SignInProps = {
    buttonText?: string
    onSubmit?: (user: User | null) => void
    setMessage?: React.Dispatch<React.SetStateAction<string | null>>
}

const errorMessages: Record<string, string> = {
    'Invalid identifier or password': 'Invalid email or password',
}

export const SignIn: React.FC<SignInProps> = ({ buttonText = 'Login', onSubmit, setMessage }) => {
    const { login } = useUser()

    const handleSubmit = async (values: any) => {
        const user = await login({
            email: values.email,
            password: values.password,
        })

        if (!user) {
            setMessage && setMessage('There was an error signing in. Please try again.')
        } else if ('error' in user) {
            setMessage?.(errorMessages[user?.error] || user?.error)
        } else {
            await onSubmit?.(user)
        }
    }

    return (
        <Formik
            validateOnMount
            initialValues={{
                email: '',
                password: '',
            }}
            validate={(values) => {
                const errors: any = {}
                if (!values.email) {
                    errors.email = 'Required'
                }
                if (!values.password) {
                    errors.password = 'Required'
                }
                return errors
            }}
            onSubmit={handleSubmit}
        >
            {({ isValid, isSubmitting }) => {
                return (
                    <Form className="m-0">
                        <label className={labelClasses} htmlFor="email">
                            Email address
                        </label>
                        <Field
                            className={inputClasses}
                            onBlur={(e) => e.preventDefault()}
                            required
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email address..."
                        />
                        <label className={labelClasses} htmlFor="password">
                            Password
                        </label>
                        <Field
                            className={inputClasses}
                            onBlur={(e) => e.preventDefault()}
                            required
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password..."
                        />
                        <Button loading={isSubmitting} disabled={isSubmitting || !isValid} type="submit" width="full">
                            {buttonText}
                        </Button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SignIn
