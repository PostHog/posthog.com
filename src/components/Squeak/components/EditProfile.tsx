import React, { useState, useEffect, useRef, ChangeEvent, ChangeEventHandler } from 'react'
import { Form, Field, Formik, FormikHandlers } from 'formik'
import Button from 'components/CommunityQuestions/Button'
import { Markdown } from 'components/Icons'
import * as Yup from 'yup'
import TextareaAutosize from 'react-textarea-autosize'
import { useUser } from 'hooks/useUser'
import getAvatarURL from '../util/getAvatar'
import usePostHog from 'hooks/usePostHog'
import { Avatar as DefaultAvatar } from 'components/Community/Sidebar'
import Toggle from 'components/Toggle'
import { IconInfo } from '@posthog/icons'
import Tooltip from 'components/Tooltip'

const fields = {
    avatar: {
        label: 'Avatar',
        component: Avatar,
        hideLabel: true,
        className: 'flex-grow flex items-end',
    },
    firstName: {
        type: 'fname',
        label: 'First name',
        className: 'w-[calc(50%-40px)] grid items-end',
    },
    lastName: {
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
    location: {
        modOnly: true,
    },
    country: {
        modOnly: true,
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
    amaEnabled: {
        hideLabel: true,
        component: ({ values, setFieldValue }) => {
            return (
                <div className="flex space-x-2 mb-6">
                    <label className="flex space-x-1 items-center">
                        <Tooltip
                            tooltipClassName="max-w-[200px]"
                            content="Allows community members to ask you questions directly on your profile page"
                        >
                            <span className="relative">
                                <IconInfo className="w-4 h-4" />
                            </span>
                        </Tooltip>
                        <span>Ask me anything</span>
                    </label>
                    <Toggle
                        checked={values.amaEnabled}
                        onChange={() => setFieldValue('amaEnabled', !values.amaEnabled)}
                    />
                </div>
            )
        },
    },
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    website: Yup.string().url('Invalid URL').nullable(),
    github: Yup.string().url('Invalid URL').nullable(),
    linkedin: Yup.string().url('Invalid URL').nullable(),
    twitter: Yup.string().url('Invalid URL').nullable(),
    biography: Yup.string().max(3000, 'Please limit your bio to 3,000 characters, you wordsmith!').nullable(),
    country: Yup.string().nullable(),
    location: Yup.string().nullable(),
})

type EditProfileProps = {
    onSubmit?: (() => void) | (() => Promise<void>)
}

function Avatar({ values, setFieldValue }) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [imageURL, setImageURL] = useState(values?.avatar)

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files[0]
        setFieldValue('avatar', file)
        const reader = new FileReader()
        reader.onloadend = () => {
            reader?.result && setImageURL(reader.result)
        }

        reader.readAsDataURL(file)
    }

    useEffect(() => {
        if (!values.avatar && inputRef?.current) {
            inputRef.current.value = null
        }

        setImageURL(values.avatar)
    }, [values.avatar])

    return (
        <div className="relative w-full aspect-square rounded-full flex justify-center items-center border border-gray-accent-light dark:border-gray-accent-dark text-black/50 dark:text-white/50 overflow-hidden group">
            {imageURL ? (
                <img className="w-full absolute inset-0 object-cover" src={imageURL} />
            ) : (
                <DefaultAvatar className="w-[60px] h-[60px] absolute bottom-0" />
            )}
            <div
                className={`grid ${
                    imageURL ? 'grid-cols-2' : 'grid-cols-1'
                } items-center w-full h-full z-10 bg-white/90 dark:bg-black/80 divide divide-x divide-dashed divide-gray-accent-light opacity-0 group-hover:opacity-100 transition-opacity`}
            >
                {imageURL && (
                    <button
                        onClick={(e) => {
                            e.preventDefault()
                            setFieldValue('avatar', null)
                        }}
                        className="w-full h-full flex items-center justify-center text-4xl group"
                    >
                        &#215;
                    </button>
                )}
                <div className="relative w-full h-full flex items-center justify-center group">
                    <span className="text-3xl">&#8593;</span>
                    <input
                        ref={inputRef}
                        onChange={handleChange}
                        accept=".jpg, .png, .gif, .jpeg"
                        className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer"
                        name="avatar"
                        type="file"
                    />
                </div>
            </div>
        </div>
    )
}

export const EditProfile: React.FC<EditProfileProps> = ({ onSubmit }) => {
    const { user, fetchUser, isLoading, getJwt } = useUser()
    const posthog = usePostHog()

    if (!user) return null

    // TODO: Need to grab these from `attributes`
    const {
        firstName,
        lastName,
        website,
        github,
        linkedin,
        twitter,
        biography,
        id,
        location,
        country,
        pronouns,
        amaEnabled,
    } = user?.profile || {}

    const avatar = getAvatarURL(user?.profile)

    // TODO: Move this logic into the useUser hook
    const handleSubmit = async ({ avatar, ...values }, { setSubmitting }) => {
        setSubmitting(true)

        try {
            posthog?.capture('squeak profile update start', {
                profileId: id,
                ...values,
            })

            const JWT = await getJwt()
            let image = avatar

            if (avatar && typeof avatar === 'object') {
                const formData = new FormData()
                formData.append('files', avatar)

                const uploadedImage = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/upload`, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${JWT}`,
                    },
                }).then((res) => res.json())

                if (uploadedImage?.length > 0) {
                    image = uploadedImage[0]
                }
            }

            const body = {
                data: {
                    ...values,
                    ...((image && typeof image !== 'string') || image === null ? { avatar: image?.id ?? null } : {}),
                },
            }

            const { data } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${id}?populate=avatar`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JWT}`,
                },
            }).then((res) => res.json())

            if (data) {
                await fetchUser(JWT)
                onSubmit?.()
            }

            posthog?.capture('squeak profile update', {
                profileId: id,
                ...values,
            })
        } catch (error) {
            posthog?.capture('squeak error', {
                source: 'EditProfile.handleSubmit',
                error: JSON.stringify(error),
                profileId: id,
                ...values,
            })

            throw error
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <Formik
            initialValues={{
                avatar,
                firstName,
                lastName,
                website,
                github,
                linkedin,
                twitter,
                location,
                country,
                pronouns,
                biography,
                amaEnabled,
            }}
            validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting, isValid, values, errors, setFieldValue }) => {
                return (
                    <Form className="m-0">
                        <h2>Update profile</h2>
                        <p className=" dark:border-gray-accent-dark p-4 rounded-md mb-4">
                            <strong>Tip:</strong> Be sure to use full URLs when adding links to your website, GitHub,
                            LinkedIn and Twitter (start with https)
                        </p>
                        <div className="flex flex-wrap m-0">
                            {Object.keys(values).map((key) => {
                                const error = errors[key]
                                const field = fields[key]
                                const label = field?.label || capitalizeFirstLetter(key.replaceAll('_', ' '))
                                if (field?.modOnly && user?.role?.type !== 'moderator') return null
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

                        <p className=" text-sm flex items-center space-x-2 mb-4">
                            <Markdown />
                            <span>Markdown is allowed - even encouraged!</span>
                        </p>

                        <Button loading={isLoading} disabled={isSubmitting || !isValid} type="submit">
                            Update
                        </Button>
                    </Form>
                )
            }}
        </Formik>
    )
}
