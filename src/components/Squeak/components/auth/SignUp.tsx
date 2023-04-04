import { Field, Form, Formik } from 'formik'
import { useUser } from 'hooks/useUser'
import React from 'react'

type SignUpProps = {
    handleMessageSubmit: (message: any) => Promise<void> | void
    formValues: any
    buttonText?: string
    onSuccess?: (values: any) => void
}

export const SignUp: React.FC<SignUpProps> = ({
    handleMessageSubmit,
    formValues,
    buttonText = 'Sign up',
    onSuccess,
}) => {
    const { signUp } = useUser()

    const handleSubmit = async (values: any) => {
        await signUp(values)
        await handleMessageSubmit(formValues || { email: values.email })

        onSuccess?.({
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
        })
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
