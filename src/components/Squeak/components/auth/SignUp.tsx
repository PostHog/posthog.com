import { Field, Form, Formik } from 'formik'
import { useUser } from 'hooks/useUser'
import React from 'react'

type SignUpProps = {
    buttonText?: string
    onSubmit?: (user: any) => void
    setMessage?: React.Dispatch<React.SetStateAction<string | null>>
}

export const SignUp: React.FC<SignUpProps> = ({ buttonText = 'Sign up', onSubmit, setMessage }) => {
    const { signUp } = useUser()

    const handleSubmit = async (values: any) => {
        const user = await signUp(values)

        if (user?.error) {
            setMessage?.(user?.error)
        } else {
            onSubmit?.(user)
        }

        onSubmit?.(user)
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
                                    required
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="First name..."
                                />
                            </span>
                            <span>
                                <label htmlFor="lastName">Last name</label>
                                <Field id="lastName" name="lastName" type="text" placeholder="Last name..." />
                            </span>
                        </div>
                        <label htmlFor="email">Email address</label>
                        <Field required id="email" name="email" type="email" placeholder="Email address..." />
                        <label htmlFor="password">Password</label>
                        <Field required id="password" name="password" type="password" placeholder="Password..." />
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
