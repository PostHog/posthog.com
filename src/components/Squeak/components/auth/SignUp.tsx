import React from 'react'
import { Field, Form, Formik } from 'formik'
import { User, useUser } from 'hooks/useUser'
import { inputClasses, labelClasses } from '../Authentication'
import Button from '../Button'

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
                    <Form className="m-0">
                        <span>
                            <label className={labelClasses} htmlFor="firstName">
                                First name
                            </label>
                            <Field
                                className={inputClasses}
                                onBlur={(e) => e.preventDefault()}
                                required
                                id="firstName"
                                name="firstName"
                                type="text"
                                placeholder="First name..."
                            />
                        </span>
                        <span>
                            <label className={labelClasses} htmlFor="lastName">
                                Last name
                            </label>
                            <Field
                                className={inputClasses}
                                onBlur={(e) => e.preventDefault()}
                                id="lastName"
                                name="lastName"
                                type="text"
                                placeholder="Last name..."
                            />
                        </span>
                        <label className={labelClasses} htmlFor="email">
                            Email address
                        </label>
                        <Field
                            className={inputClasses}
                            required
                            onBlur={(e) => e.preventDefault()}
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
                            required
                            onBlur={(e) => e.preventDefault()}
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Password..."
                        />
                        <Button width="full" disabled={isSubmitting || !isValid} type="submit">
                            {buttonText}
                        </Button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SignUp
