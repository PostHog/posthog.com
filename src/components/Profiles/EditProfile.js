import React, { useEffect, useState } from 'react'
import { Form, Field, Formik } from 'formik'
import Button from 'components/CommunityQuestions/Button'
import Icons, { Markdown } from 'components/Icons'
import * as Yup from 'yup'
import TextareaAutosize from 'react-textarea-autosize'
import { Avatar as DefaultAvatar } from '../../pages/community'

const fields = {
    avatar: {
        label: 'Avatar',
        component: Avatar,
        hideLabel: true,
        className: 'flex-grow flex items-end',
    },
    first_name: {
        type: 'fname',
        label: 'First name',
        className: 'w-[calc(50%-40px)] grid items-end',
    },
    last_name: {
        type: 'lname',
        label: 'Last name',
        className: 'w-[calc(50%-40px)] grid items-end',
    },
    github: {
        label: 'GitHub',
    },
    linkedin: {
        label: 'LinkedIn',
    },
    biography: {
        component: () => (
            <Field
                minRows={6}
                rows={6}
                as={TextareaAutosize}
                type="text"
                name="biography"
                placeholder="280 characters or less..."
                className="py-2 px-4 text-lg rounded-md w-full dark:text-primary border-gray-accent-light border mb-2"
            />
        ),
        className: 'w-full',
    },
}

function Avatar({ values, setFieldValue }) {
    const [imageURL, setImageURL] = useState(values?.avatar)

    const handleChange = (e) => {
        const file = e.currentTarget.files[0]
        setFieldValue('avatar', file)
        const reader = new FileReader()
        reader.onloadend = () => {
            reader?.result && setImageURL(reader.result)
        }

        reader.readAsDataURL(file)
    }

    return (
        <div className="relative w-full aspect-square rounded-full flex justify-center items-center border border-gray-accent-light dark:border-gray-accent-dark text-black/50 dark:text-white/50 overflow-hidden">
            {imageURL ? (
                <img className="w-full h-full absolute inset-0 object-cover" src={imageURL} />
            ) : (
                <DefaultAvatar className="w-[60px] h-[60px] absolute bottom-0" />
            )}
            <input
                onChange={handleChange}
                accept=".jpg, .png, .gif, .jpeg"
                className="opacity-0 absolute w-full h-full inset-0 cursor-pointer"
                name="avatar"
                type="file"
            />
        </div>
    )
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
    const { first_name, last_name, website, github, linkedin, twitter, biography, id, avatar } = profile

    const handleSubmit = async ({ avatar, ...values }, { setSubmitting, resetForm }) => {
        setSubmitting(true)
        let image = null
        if (typeof avatar === 'object') {
            const formData = new FormData()
            formData.append('image', avatar)
            const uploadedImage = await fetch(
                `${process.env.GATSBY_SQUEAK_API_HOST}/api/image?organizationId=${process.env.GATSBY_SQUEAK_ORG_ID}`,
                {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                }
            ).then((res) => res.json())
            image = uploadedImage
        }
        const profile = await fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${id}?organizationId=${process.env.GATSBY_SQUEAK_ORG_ID}`,
            {
                method: 'PATCH',
                body: JSON.stringify({ ...values, image }),
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
            initialValues={{ avatar, first_name, last_name, website, github, linkedin, twitter, biography }}
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, isValid, values, errors, setFieldValue, submitForm }) => {
                return (
                    <Form className="m-0">
                        <h2>Update profile</h2>
                        <p className="border border-dashed border-gray-accent-light dark:border-gray-accent-dark p-4 rounded-md">
                            <strong>Tip:</strong> Be sure to use full URLs when adding links to your website, GitHub,
                            LinkedIn and Twitter (start with https)
                        </p>
                        <div className="flex flex-wrap m-0">
                            {Object.keys(values).map((key) => {
                                const error = errors[key]
                                const field = fields[key]
                                const label = field?.label || capitalizeFirstLetter(key.replaceAll('_', ' '))
                                return (
                                    <div className={`${field?.className ?? 'w-1/2'} p-2`} key={key}>
                                        {!field?.hideLabel && <label htmlFor={key}>{label}</label>}
                                        {(field?.component && field.component({ values, setFieldValue })) || (
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
