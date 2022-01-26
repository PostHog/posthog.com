import React from 'react'
import { Form, Field } from 'formik'
import Button from './Button'

export default function SubmitEmail({ isValid, loading }) {
    return (
        <>
            <h4 className="text-[20px] m-0">Get your answer by email</h4>
            <p>No need to constantly refresh this page for updates!</p>
            <Form className="grid m-0">
                <Field
                    className="bg-gray-accent-light py-2 px-4 text-base rounded-md w-full dark:text-primary"
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                <Button loading={loading} disabled={!isValid} type="submit">
                    Send email updates
                </Button>
            </Form>
            <p className="text-[14px] opacity-50 text-center m-0">
                We’ll only email you when an answer is posted. We don’t share emails, and if you use Gravatar, we’ll
                include your photo next to your question.
            </p>
        </>
    )
}
