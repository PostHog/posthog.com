import React, { useState } from 'react'
import { Form, Field, Formik } from 'formik'
import Button from 'components/CommunityQuestions/Button'

const fields = {
    first_name: {
        type: 'fname',
        label: 'First name',
    },
    last_name: {
        type: 'lname',
        label: 'Last name',
    },
    github: {
        label: 'GitHub',
    },
    linkedin: {
        label: 'LinkedIn',
    },
    biography: {
        component: (
            <Field
                as="textarea"
                type="text"
                name="biography"
                placeholder="Biography"
                className="py-2 px-4 text-lg rounded-md w-full dark:text-primary border-gray-accent-light border mb-2"
            />
        ),
        className: 'col-span-2',
    },
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

export default function EditProfile({ profile, onSubmit }) {
    if (!profile) return null
    const [loading, setLoading] = useState(false)
    const { first_name, last_name, website, github, linkedin, twitter, biography, id } = profile

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        const profile = await fetch(`http://localhost:3000/api/profiles/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(values),
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }).then((res) => res.json())
        setSubmitting(false)
        onSubmit && onSubmit(profile)
    }

    return (
        <Formik
            initialValues={{ first_name, last_name, website, github, linkedin, twitter, biography }}
            validate={(values) => {
                const errors = {}
                if (!values.first_name) {
                    errors.first_name = 'Required'
                }
                if (!values.last_name) {
                    errors.last_name = 'Required'
                }
                return errors
            }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, isValid, values, setFieldValue, submitForm }) => {
                return (
                    <Form className="m-0">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4 m-0">
                            {Object.keys(values).map((key) => {
                                const field = fields[key]
                                const label = field?.label || capitalizeFirstLetter(key.replaceAll('_', ' '))
                                return (
                                    <div className={field?.className ?? ''} key={key}>
                                        <label htmlFor={key}>{label}</label>
                                        {field?.component || (
                                            <Field
                                                className="py-2 px-4 text-lg rounded-md w-full dark:text-primary border-gray-accent-light border"
                                                type={field?.type || 'text'}
                                                name={key}
                                                placeholder={label}
                                            />
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        <Button loading={isSubmitting} disabled={isSubmitting || !isValid} type="submit">
                            Update
                        </Button>
                    </Form>
                )
            }}
        </Formik>
    )
}
