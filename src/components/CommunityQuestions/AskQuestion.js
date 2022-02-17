import { Field } from 'formik'
import React from 'react'
import Button from './Button'
import RichText from './RichText'

export default function AskQuestion({ isValid, loading, setFieldValue, submitForm }) {
    return (
        <>
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
            <Field className="mary-chain" type="text" placeholder="Ignore if human" name="mary-chain" />
            <RichText setFieldValue={setFieldValue} />
            <Button onClick={() => submitForm()} loading={loading} type="submit" disabled={!isValid}>
                Submit
            </Button>
        </>
    )
}
