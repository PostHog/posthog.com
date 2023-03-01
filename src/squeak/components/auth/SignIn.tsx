import { Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { post } from '../../lib/api'

type SignInProps = {
    setMessage: any
    handleMessageSubmit: (message: any) => Promise<void> | void
    formValues: any
    apiHost: string
    buttonText: string
    organizationId: string
}

const SignIn: React.FC<SignInProps> = ({
    setMessage,
    handleMessageSubmit,
    formValues,
    apiHost,
    buttonText,
    organizationId,
}) => {
    const [loading, setLoading] = useState(false)
    const { setUser } = useUser()

    const handleSubmit = async (values: any) => {
        setLoading(true)
        const { data, error } =
            (await post(apiHost, '/api/login', {
                email: values.email,
                password: values.password,
                organizationId,
            })) || {}

        if (error) {
            setMessage('Incorrect email/password. Please try again.')
            setLoading(false)
        } else {
            setUser({ id: data.id })
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
                        <button style={loading || !isValid ? { opacity: '.5' } : {}} type="submit">
                            {buttonText}
                        </button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default SignIn
