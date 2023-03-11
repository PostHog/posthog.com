import { Field, Form, Formik } from 'formik'
import getGravatar from 'gravatar'
import React from 'react'
import { useUser } from '../../hooks/useUser'
import { post } from '../../lib/api'

type SignUpProps = {
    setMessage: (message: any) => void
    handleMessageSubmit: (message: any) => Promise<void> | void
    formValues: any
    organizationId: string
    apiHost: string
    buttonText: string
    onSignUp?: (values: any) => void
}

const SignUp: React.FC<SignUpProps> = ({
    setMessage,
    handleMessageSubmit,
    formValues,
    organizationId,
    apiHost,
    buttonText,
    onSignUp,
}) => {
    const { setUser } = useUser()
    const handleSubmit = async (values: any) => {
        const gravatar = getGravatar.url(values.email)
        const avatar = await fetch(`https:${gravatar}?d=404`).then((res) => (res.ok && `https:${gravatar}`) || '')

        const { error, data } =
            (await post(apiHost, '/api/register', {
                email: values.email,
                password: values.password,
                firstName: values.first_name,
                lastName: values.last_name,
                avatar,
                organizationId,
            })) || {}

        await handleMessageSubmit(formValues || { email: values.email })

        onSignUp &&
            onSignUp({
                email: values.email,
                firstName: values.first_name,
                lastName: values.last_name,
            })
        setUser({ id: data.userId })

        if (error) {
            // @ts-ignore
            setMessage(error.message)
        }
    }
    return (
        <Formik
            validateOnMount
            initialValues={{
                email: '',
                password: '',
                first_name: '',
                last_name: '',
            }}
            validate={(values) => {
                const errors: any = {}
                if (!values.first_name) {
                    errors.first_name = 'Required'
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
                                <label htmlFor="first_name">First name</label>
                                <Field
                                    required
                                    id="first_name"
                                    name="first_name"
                                    type="text"
                                    placeholder="First name..."
                                />
                            </span>
                            <span>
                                <label htmlFor="last_name">Last name</label>
                                <Field id="last_name" name="last_name" type="text" placeholder="Last name..." />
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
