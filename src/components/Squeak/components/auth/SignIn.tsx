import React from 'react'
import { Field, Form, Formik } from 'formik'
import { useUser } from 'hooks/useUser'

type SignInProps = {
    setMessage: any
    handleMessageSubmit: (message: any) => Promise<void> | void
    formValues: any
    apiHost: string
    buttonText: string
    organizationId: string
}

const SignIn: React.FC<SignInProps> = ({ setMessage, handleMessageSubmit, formValues, buttonText }) => {
    const { isLoading, login } = useUser()

    const handleSubmit = async (values: any) => {
        let user = await login({
            email: values.email,
            password: values.password,
        })

        if (!user) {
            setMessage('Incorrect email/password. Please try again.')
        } else {
            await handleMessageSubmit(formValues || { email: values.email })
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
                        <Field required id="email" name="email" type="email" placeholder="Email address..." />
                        <label htmlFor="password">Password</label>
                        <Field required id="password" name="password" type="password" placeholder="Password..." />
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
