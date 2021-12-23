import React from 'react'
import { Form, Field } from 'formik'
import Button from './Button'

export default function AskQuestion({ isValid, loading }) {
    return (
        <Form>
            <Field
                className="bg-gray-accent-light py-2 px-4 text-base rounded-md w-full"
                type="text"
                name="name"
                placeholder="Full name"
            />
            <Field
                className="bg-gray-accent-light py-2 px-4 text-base rounded-md mt-2 w-full"
                type="text"
                name="question"
                as="textarea"
                placeholder="Type your question..."
            />
            <Button loading={loading} type="submit" disabled={!isValid}>
                Submit
            </Button>
        </Form>
    )
}
