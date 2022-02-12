import { Field, Form } from 'formik'
import React from 'react'
import Button from './Button'

export default function AskQuestion({ isValid, loading }) {
    return (
        <Form>
            <Field
                className="bg-gray-accent-light dark:bg-gray-accent-dark py-2 px-4 text-base rounded-md w-full"
                type="text"
                name="name"
                placeholder="Full name"
            />
            <Field
                className="bg-gray-accent-light dark:bg-gray-accent-dark py-2 px-4 text-base rounded-md mt-2 w-full"
                type="email"
                name="email"
                placeholder="Email"
            />
            <Field
                className="bg-gray-accent-light dark:bg-gray-accent-dark py-2 px-4 text-base rounded-md mt-2 w-full"
                type="text"
                name="question"
                as="textarea"
                placeholder="Type your question..."
            />
            <Field className="mary-chain" type="text" placeholder="Ignore if human" name="mary-chain" />
            <Button loading={loading} type="submit" disabled={!isValid}>
                Submit
            </Button>
        </Form>
    )
}
