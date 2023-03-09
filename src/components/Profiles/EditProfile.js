import React, { useState } from 'react'
import { Form, Field, Formik } from 'formik'
import Button from 'components/CommunityQuestions/Button'
import Icons, { Markdown } from 'components/Icons'
import * as Yup from 'yup'
import TextareaAutosize from 'react-textarea-autosize'

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
                minRows={6}
                as={TextareaAutosize}
                type="text"
                name="biography"
                placeholder="280 characters or less..."
                className="py-2 px-4 text-lg rounded-md w-full dark:text-primary border-gray-accent-light border mb-2"
            />
        ),
        className: 'col-span-2',
    },
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
}

const ValidationSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required'),
    website: Yup.string().url('Invalid URL').nullable(),
    github: Yup.string().url('Invalid URL').nullable(),
    linkedin: Yup.string().url('Invalid URL').nullable(),
    twitter: Yup.string().url('Invalid URL').nullable(),
    biography: Yup.string().max(3000, 'Please limit your bio to 3,000 characters, you wordsmith!').nullable(),
})

export default function EditProfile({ profile, onSubmit }) {
    if (!profile) return null
    const [loading, setLoading] = useState(false)
    const { first_name, last_name, website, github, linkedin, twitter, biography, id } = profile

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        const profile = await fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${id}?organizationId=${process.env.GATSBY_SQUEAK_ORG_ID}`,
            {
                method: 'PATCH',
                body: JSON.stringify(values),
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        ).then((res) => res.json())
        setSubmitting(false)
        onSubmit && onSubmit(profile)
    }

    return (
        <Formik
            initialValues={{ first_name, last_name, website, github, linkedin, twitter, biography }}
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, isValid, values, errors, setFieldValue, submitForm }) => {
                return (
                    <Form className="m-0">
                        <h2>Update profile</h2>
                        <p>
                            Tip: Be sure to use full URLs when adding links to your website, GitHub, LinkedIn and
                            Twitter (start with https)
                        </p>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-4 m-0">
                            {Object.keys(values).map((key) => {
                                const error = errors[key]
                                const field = fields[key]
                                const label = field?.label || capitalizeFirstLetter(key.replaceAll('_', ' '))
                                return (
                                    <div className={field?.className ?? ''} key={key}>
                                        <label htmlFor={key}>{label}</label>
                                        {field?.component || (
                                            <Field
                                                className="py-2 px-4 text-lg rounded-md w-full dark:text-primary border-gray-accent-light border m-0"
                                                type={field?.type || 'text'}
                                                name={key}
                                                placeholder={label}
                                            />
                                        )}
                                        {error && (
                                            <span className="text-red font-semibold inline-block my-1">{error}</span>
                                        )}
                                    </div>
                                )
                            })}
                        </div>

                        <p className=" text-sm flex items-center space-x-2">
                            <Markdown />
                            <span>Markdown is allowed - even encouraged!</span>
                        </p>

                        <Button loading={isSubmitting} disabled={isSubmitting || !isValid} type="submit">
                            Update
                        </Button>
                    </Form>
                )
            }}
        </Formik>
    )
}
