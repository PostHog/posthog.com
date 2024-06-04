import React, { useState, useEffect, useRef, ChangeEvent, ChangeEventHandler } from 'react'
import { Field, useFormik } from 'formik'
import * as Yup from 'yup'
import TextareaAutosize from 'react-textarea-autosize'
import { useUser } from 'hooks/useUser'
import usePostHog from 'hooks/usePostHog'
import { Avatar as DefaultAvatar } from 'components/Community/Sidebar'
import Layout from 'components/Layout'
import { communityMenu } from '../../../navs'

function convertCentimetersToInches(centimeters: number): number {
    return centimeters / 2.54
}

const UnitButton = ({ unit, onClick, active, className = '' }) => {
    return (
        <button
            type="button"
            className={`w-12 text-sm ${active ? 'bg-gray-accent-light/50' : ''} ${className}`}
            onClick={onClick}
        >
            {unit}
        </button>
    )
}

const HeightField = ({ values, setFieldValue }) => {
    const [unit, setUnit] = useState('in')
    const [height, setHeight] = useState(values.height)

    return (
        <div className="flex border-gray-accent-light border rounded-md overflow-hidden">
            <input
                onChange={(e) => {
                    const value = Number(e.target.value)
                    setHeight(value)
                    setFieldValue('height', unit === 'cm' ? convertCentimetersToInches(value) : value)
                }}
                value={height}
                className="py-2 px-4 text-base w-full dark:text-primary  m-0 flex-grow border-none"
                type="number"
                name="height"
                placeholder="Height"
            />
            <div className="flex-shrink-0 flex">
                <UnitButton
                    active={unit === 'in'}
                    unit="in"
                    onClick={() => setUnit('in')}
                    className="border-x border-gray-accent-light"
                />
                <UnitButton active={unit === 'cm'} unit="cm" onClick={() => setUnit('cm')} />
            </div>
        </div>
    )
}

const ToggleButton = ({ onClick, active, label }) => {
    return (
        <button onClick={onClick} className={`py-2 z-10 ${active ? 'font-bold text-white' : 'opacity-60'}`}>
            {label}
        </button>
    )
}

const Toggle = ({ name, label, checked, onChange, options }) => {
    return (
        <div>
            <label htmlFor={name} className="font-bold">
                <span>{label}</span>
                <div className="grid grid-cols-2 rounded-md bg-accent dark:bg-accent-dark relative text-center overflow-hidden mt-1 text-base border border-border dark:border-dark">
                    <span className={`bg-red w-1/2 h-full absolute ${checked ? 'left-0' : 'right-0'}`} />
                    <ToggleButton onClick={() => onChange(true)} active={checked} label={options[0]} />
                    <ToggleButton onClick={() => onChange(false)} active={!checked} label={options[1]} />
                </div>
            </label>
        </div>
    )
}

const formSections = [
    {
        title: 'Who are you?',
        fields: {
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
            location: {
                label: 'Location',
            },
            pineappleOnPizza: {
                component: ({ values, setFieldValue }) => {
                    return (
                        <Toggle
                            name="pineappleOnPizza"
                            label="Does pineapple belong on pizza?"
                            checked={values.pineappleOnPizza}
                            onChange={(checked) => setFieldValue('pineappleOnPizza', checked)}
                            options={['Yes', 'No']}
                        />
                    )
                },
            },
            pronouns: {
                component: ({ values, setFieldValue }) => {
                    const [enabled, setEnabled] = useState(!!values.pronouns)
                    return enabled ? (
                        <Input name="pronouns" placeholder="Pronouns" type="text" label="Pronouns" />
                    ) : (
                        <button className="text-red font-bold" onClick={() => setEnabled(true)}>
                            Add pronouns
                        </button>
                    )
                },
            },
        },
    },
    {
        title: 'About you',
        fields: {
            biography: {
                component: () => (
                    <>
                        <div className="flex justify-between items-center">
                            <label className="font-bold">Bio</label>
                            <p className="m-0 opacity-60 text-sm">Supports Markdown</p>
                        </div>
                        <TextareaAutosize
                            minRows={6}
                            rows={6}
                            name="biography"
                            placeholder="280 characters or less..."
                            className="py-2 px-4 text-base rounded-md w-full bg-accent dark:bg-accent-dark mt-1 border border-border dark:border-dark"
                        />
                    </>
                ),
                className: 'w-full',
            },
        },
    },
]

const fields = {
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
        label: 'Country (2-char code)',
        modOnly: true,
    },
    height: {
        modOnly: true,
        component: HeightField,
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
                className="py-2 px-4 text-base rounded-md w-full dark:text-primary border-gray-accent-light border mb-2"
            />
        ),
        className: 'w-full',
    },
    amaEnabled: {
        hideLabel: true,
        component: ({ values, setFieldValue }) => {
            return (
                <div className="flex space-x-2 mb-6">
                    <Toggle
                        label="Ask me anything"
                        checked={values.amaEnabled}
                        onChange={() => setFieldValue('amaEnabled', !values.amaEnabled)}
                        tooltip="Allows community members to ask you questions directly on your profile page"
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
    const [imageURL, setImageURL] = useState(values?.avatar?.url)

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

        setImageURL(values.avatar?.url)
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

const Input = ({ type, name, placeholder, label }) => {
    return (
        <label className="font-bold">
            <span>{label}</span>
            <input
                className="py-2 px-4 text-base rounded-md w-full dark:text-primary m-0 mt-1 bg-accent dark:bg-accent-dark border border-border dark:border-dark"
                type={type || 'text'}
                name={name}
                placeholder={placeholder}
            />
        </label>
    )
}

export default function EditProfile({ onSubmit }) {
    const { user, fetchUser, isLoading, getJwt } = useUser()
    const posthog = usePostHog()

    if (!user) return null

    // TODO: Need to grab these from `attributes`
    const { id } = user?.profile || {}

    // TODO: Move this logic into the useUser hook
    const handleSubmit = async ({ avatar, ...values }, { setSubmitting }) => {
        setSubmitting(true)

        try {
            posthog?.capture('squeak profile update start', {
                profileId: id,
                ...values,
            })

            const JWT = await getJwt()
            const newAvatar = avatar instanceof File
            let image
            if (avatar && newAvatar) {
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
                    ...(newAvatar ? { avatar: image?.id ?? null } : {}),
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

    const { values, setFieldValue } = useFormik({
        onSubmit: handleSubmit,
        initialValues: formSections.reduce((acc, section) => {
            Object.keys(section.fields).forEach((key) => {
                acc[key] = user?.profile[key]
            })
            return acc
        }, {}),
    })

    return (
        <Layout parent={communityMenu}>
            <section className="max-w-4xl mx-auto py-12 space-y-6">
                {formSections.map((section, index) => {
                    return (
                        <div key={index}>
                            <h2>{section.title}</h2>
                            <div className="flex flex-wrap items-center">
                                {Object.keys(section.fields).map((key) => {
                                    const field = section.fields[key]
                                    return (
                                        <div key={key} className={`${field.className ?? 'w-1/2'} p-2`}>
                                            {(field.component && field.component({ values, setFieldValue })) || (
                                                <Input
                                                    type={field.type}
                                                    name={key}
                                                    placeholder={field.placeholder}
                                                    label={field.label}
                                                />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </section>
        </Layout>
    )
}
