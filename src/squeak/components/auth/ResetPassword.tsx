import { Field, Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { post } from '../../lib/api'

type ResetPasswordProps = {
    setMessage: (message: any) => void
    setParentView?: (view: string | null) => void
    apiHost: string
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ setMessage, setParentView, apiHost }) => {
    const [loading, setLoading] = useState(false)
    const resetPassword = useRef<HTMLDivElement>(null)

    const handleSubmit = async (values: any) => {
        setLoading(true)
        const { error } =
            (await post(apiHost, '/api/password/reset', {
                password: values.password,
            })) || {}

        if (error) {
            // @ts-ignore
            setMessage(error.message)
        } else {
            setParentView?.(null)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (resetPassword?.current) {
            resetPassword.current.scrollIntoView()
        }
    }, [resetPassword])

    return (
        <div ref={resetPassword}>
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
                            <Field required id="password" name="password" type="password" placeholder="New password" />
                            <button style={loading || !isValid ? { opacity: '.5' } : {}} type="submit">
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
