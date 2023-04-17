import React, { useEffect, useRef, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import { useUser } from 'hooks/useUser'
import { navigate } from 'gatsby'

type ResetPasswordProps = {
    setMessage: (message: any) => void
    setParentView?: (view: string | null) => void
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ setMessage, setParentView }) => {
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState<null | string>(null)
    const { login } = useUser()

    const handleSubmit = async (values: any) => {
        if (!code) return
        setLoading(true)
        const body = {
            code,
            password: values.password,
            passwordConfirmation: values.password,
        }
        const { error, user } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/auth/reset-password`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
            },
        }).then((res) => res.json())

        if (error) {
            setMessage(error?.message)
            setLoading(false)
        } else {
            await login({
                email: user.email,
                password: values.password,
            })
            navigate('/community')
        }
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window?.location?.search)
            const code = params.get('code')
            if (!code) {
                setMessage('Invalid password reset token')
            } else {
                setCode(code)
            }
        }
    }, [])

    return (
        <div>
            <Formik
                validateOnMount
                initialValues={{
                    password: '',
                }}
                validate={(values) => {
                    const errors: any = {}
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
                            <label htmlFor="password">New password</label>
                            <Field
                                disabled={!code}
                                required
                                id="password"
                                name="password"
                                type="password"
                                placeholder="New password"
                            />
                            <button disabled={!code} style={loading || !isValid ? { opacity: '.5' } : {}} type="submit">
                                Reset password
                            </button>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

export default ResetPassword
