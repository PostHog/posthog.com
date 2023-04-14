import React from 'react'
import { Field, Form, Formik } from 'formik'
import { User, useUser } from 'hooks/useUser'

type SignInProps = {
    buttonText?: string
    onSubmit?: (user: User | null) => void
    setMessage?: React.Dispatch<React.SetStateAction<string | null>>
}

const errorMessages: Record<string, string> = {
    'Invalid identifier or password': 'Invalid email or password',
}

export const SignIn: React.FC<SignInProps> = ({ buttonText = 'Login', onSubmit, setMessage }) => {
    const { isLoading, login } = useUser()

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
            onSubmit?.(user)
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
            {({ isValid }) => {
                return (
                    <Form>
                        <label htmlFor="email">Email address</label>
                        <Field
                            onBlur={(e) => e.preventDefault()}
                            required
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email address..."
                        />
                        <label htmlFor="password">Password</label>
                        <Field
                            onBlur={(e) => e.preventDefault()}
                            required
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password..."
                        />
                        <button style={isLoading || !isValid ? { opacity: '.5' } : {}} type="submit">
                            {buttonText}
                        </button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SignIn
