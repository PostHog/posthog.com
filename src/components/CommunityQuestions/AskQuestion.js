import { Auth } from '@supabase/ui'
import { Field, Form } from 'formik'
import React from 'react'
import Button from './Button'

export default function AskQuestion({ isValid, loading, userValues }) {
    const { user } = Auth.useUser()

    return (
        <Form>
            {!userValues.firstName && (
                <Field
                    className="bg-gray-accent-light dark:bg-gray-accent-dark py-2 px-4 text-base rounded-md w-full"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                />
            )}
            {!userValues.lastName && (
                <Field
                    className="bg-gray-accent-light dark:bg-gray-accent-dark py-2 px-4 text-base rounded-md mt-2 w-full"
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                />
            )}
            {!userValues.email && (
                <Field
                    className="bg-gray-accent-light dark:bg-gray-accent-dark py-2 px-4 text-base rounded-md mt-2 w-full"
                    type="email"
                    name="email"
                    placeholder="Email"
                />
            )}
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
