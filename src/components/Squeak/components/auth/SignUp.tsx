import React from 'react'
import { Field, Form, Formik } from 'formik'
import { User, useUser } from 'hooks/useUser'

type SignUpProps = {
    buttonText?: string
    onSubmit?: (user: User | null) => void
    setMessage?: React.Dispatch<React.SetStateAction<string | null>>
}

export const SignUp: React.FC<SignUpProps> = ({ buttonText = 'Sign up', onSubmit, setMessage }) => {
    const { signUp } = useUser()

    const handleSubmit = async (values: any) => {
        const user = await signUp(values)

        if (!user) {
            setMessage?.('There was an error signing up. Please try again.')
        } else if ('error' in user) {
            setMessage?.(user.error)
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
                firstName: '',
                lastName: '',
            }}
            validate={(values) => {
                const errors: any = {}
                if (!values.firstName) {
                    errors.firstName = 'Required'
                }
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
                    <Form>
                        <div className="squeak-authentication-form-name">
                            <span>
                                <label htmlFor="firstName">First name</label>
                                <Field
                                    onBlur={(e) => e.preventDefault()}
                                    required
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="First name..."
                                />
                            </span>
                            <span>
                                <label htmlFor="lastName">Last name</label>
                                <Field
                                    onBlur={(e) => e.preventDefault()}
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Last name..."
                                />
                            </span>
                        </div>
                        <label htmlFor="email">Email address</label>
                        <Field
                            required
                            onBlur={(e) => e.preventDefault()}
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Email address..."
                        />
                        <label htmlFor="password">Password</label>
                        <Field
                            required
                            onBlur={(e) => e.preventDefault()}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password..."
                        />
                        <button style={isSubmitting || !isValid ? { opacity: '.5' } : {}} type="submit">
                            {buttonText}
                        </button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SignUp
