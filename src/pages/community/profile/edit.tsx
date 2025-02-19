import React, { useState, useEffect, useRef, ChangeEventHandler } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import TextareaAutosize from 'react-textarea-autosize'
import { useUser } from 'hooks/useUser'
import usePostHog from 'hooks/usePostHog'
import { Avatar as DefaultAvatar } from 'components/Community/Sidebar'
import Layout from 'components/Layout'
import { communityMenu } from '../../../navs'
import Link from 'components/Link'
import Switch from 'components/Toggle'
import { CallToAction } from 'components/CallToAction'
import { useToast } from 'hooks/toast'
import { navigate } from 'gatsby'
import SEO from 'components/seo'
import { flattenStrapiResponse } from '../../../utils'

function convertCentimetersToInches(centimeters: number): number {
    return centimeters / 2.54
}

const HeightField = ({ values, setFieldValue }) => {
    const [unit, setUnit] = useState('in')
    const [height, setHeight] = useState(values.height)

    return (
        <div className="max-w-[170px]">
            <div className="flex space-x-2 items-end">
                <Input
                    onChange={(e) => {
                        const value = Number(e.target.value)
                        setHeight(value)
                        setFieldValue('height', unit === 'cm' ? convertCentimetersToInches(value) : value)
                    }}
                    value={height}
                    type="number"
                    name="height"
                    placeholder="Height"
                    label="Height"
                />
                <div className="flex-grow flex-shrink-0 w-[85px]">
                    <Toggle
                        checked={unit === 'in'}
                        onChange={(checked) => setUnit(checked ? 'in' : 'cm')}
                        options={['in', 'cm']}
                    />
                </div>
            </div>
        </div>
    )
}

const ToggleButton = ({ onClick, active, label }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`py-2 z-10 ${active ? 'font-bold text-white' : 'opacity-60'}`}
        >
            {label}
        </button>
    )
}

const Toggle = ({ name, label, checked, onChange, options }) => {
    return (
        <div>
            {label && (
                <label htmlFor={name} className="font-bold">
                    <span>{label}</span>
                </label>
            )}
            <div className="grid grid-cols-2 rounded-md bg-accent dark:bg-accent-dark relative text-center overflow-hidden mt-1 text-base border border-border dark:border-dark">
                <span
                    className={`bg-red dark:bg-yellow w-1/2 h-full absolute transition-all left-0 ${
                        checked ? '' : 'translate-x-full'
                    }`}
                />
                <ToggleButton onClick={() => onChange(true)} active={checked} label={options[0]} />
                <ToggleButton onClick={() => onChange(false)} active={!checked} label={options[1]} />
            </div>
        </div>
    )
}

function Avatar({ values, setFieldValue }) {
    const inputRef = useRef<HTMLInputElement>(null)
    const [imageURL, setImageURL] = useState(values?.avatar?.url)
    const favoriteColor = values.color

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
        <div
            className={`relative w-full aspect-square rounded-full flex justify-center items-center border-[1.5px] ${
                favoriteColor
                    ? imageURL
                        ? `bg-${favoriteColor} border-gray-accent-light dark:border-gray-accent-dark`
                        : `border-${favoriteColor} dark:border-${favoriteColor}`
                    : `border-gray-accent-light dark:border-gray-accent-dark`
            }  text-black/50 dark:text-white/50 overflow-hidden group -mb-2`}
        >
            {imageURL ? (
                <img className="w-full absolute inset-0 object-cover" src={imageURL} />
            ) : (
                <DefaultAvatar className="size-full absolute bottom-0" />
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

const Input = ({ type, name, placeholder, label, value, onChange, error, className = '' }) => {
    return (
        <div>
            <label className="font-bold block">{label}</label>
            <input
                className={`py-2 px-4 text-base rounded-md w-full m-0 mt-1 bg-accent dark:bg-accent-dark border ${
                    error ? 'border-red' : 'border-border dark:border-dark'
                } ${className}`}
                type={type || 'text'}
                name={name}
                placeholder={placeholder || label}
                value={value}
                onChange={onChange}
            />
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
                className: 'w-full sm:w-1/2',
            },
            pineappleOnPizza: {
                className: 'w-full sm:w-1/2',
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
                className: 'w-full sm:w-1/2',
                component: ({ values, setFieldValue }) => {
                    const [enabled, setEnabled] = useState(!!values.pronouns)
                    return enabled ? (
                        <Input
                            name="pronouns"
                            placeholder="Pronouns"
                            type="text"
                            label="Pronouns"
                            onChange={(e) => setFieldValue('pronouns', e.target.value)}
                            value={values['pronouns']}
                        />
                    ) : (
                        <button
                            className="text-red dark:text-yellow font-bold text-sm"
                            onClick={() => setEnabled(true)}
                        >
                            Add pronouns
                        </button>
                    )
                },
            },
            color: {
                label: 'Favorite color',
                className: 'w-full',
                component: ({ values, setFieldValue }) => {
                    return (
                        <>
                            <label className="font-bold">Pick your favorite color</label>
                            <ul className="list-none m-0 p-0 mt-2 flex space-x-1">
                                {[
                                    'lime-green',
                                    'blue',
                                    'orange',
                                    'teal',
                                    'purple',
                                    'seagreen',
                                    'salmon',
                                    'yellow',
                                    'red',
                                    'green',
                                    'lilac',
                                    'sky-blue',
                                ].map((color) => {
                                    const active = values.color === color
                                    return (
                                        <li key={color} onClick={() => setFieldValue('color', color)}>
                                            <button
                                                type="button"
                                                className={`w-6 h-6 rounded-full bg-${color} border-[1.5px] ${
                                                    active ? 'border-black dark:border-white' : 'border-transparent'
                                                }`}
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        </>
                    )
                },
            },
        },
    },
    {
        title: 'About you',
        fields: {
            biography: {
                component: ({ values, setFieldValue, error }) => (
                    <>
                        <div className="flex justify-between items-center">
                            <label className="font-bold">Bio</label>
                            <p className="m-0 opacity-60 text-sm">Supports Markdown</p>
                        </div>
                        <TextareaAutosize
                            value={values.biography}
                            onChange={(e) => setFieldValue('biography', e.target.value)}
                            minRows={6}
                            rows={6}
                            name="biography"
                            placeholder="Write something interesting but don't try to use us for our SEO, we're on to you..."
                            className={`py-2 px-4 text-base rounded-md w-full bg-accent dark:bg-accent-dark mt-1 border ${
                                error ? 'border-red' : 'border-border dark:border-dark'
                            }`}
                        />
                    </>
                ),
                className: 'w-full',
            },
        },
    },
    {
        title: 'Links',
        fields: {
            website: {
                label: 'Website',
                placeholder: 'https://',
                type: 'url',
            },
            github: {
                label: 'GitHub',
                placeholder: 'https://github.com',
                type: 'url',
            },
            linkedin: {
                label: 'LinkedIn',
                placeholder: 'https://linkedin.com',
                type: 'url',
            },
            twitter: {
                label: 'X',
                placeholder: 'https://x.com',
                type: 'url',
            },
        },
    },
    {
        modOnly: true,
        title: 'Special moderator things!',
        subtitle: 'We use these fields for different things.',
        fields: {
            companyRole: {
                label: 'Role',
                placeholder: 'Software engineer',
                className: 'w-full',
            },
            country: {
                className: 'w-full',
                component: ({ values, setFieldValue }) => {
                    return (
                        <div className="grid sm:flex justify-between">
                            <Input
                                label="Country code (2 digit ISO)"
                                name="country"
                                onChange={(e) => setFieldValue('country', e.target.value)}
                                placeholder="US"
                                type="text"
                                value={values['country']}
                                className="max-w-[72px]"
                            />
                            <Link
                                to="https://countrycode.org/"
                                externalNoIcon
                                className="font-bold text-sm sm:mt-0 mt-1"
                            >
                                Look up your country code
                            </Link>
                        </div>
                    )
                },
            },
            height: {
                label: 'Height',
                className: 'w-full',
                component: HeightField,
            },
            amaEnabled: {
                className: 'w-full',
                component: ({ values, setFieldValue }) => {
                    return (
                        <div className="flex space-x-2 space-between w-full">
                            <div className="flex-grow">
                                <p className="font-bold m-0">Show an AMA</p>
                                <p className="m-0">
                                    Let visitors ask you questions. You'll get question notifications via email.
                                </p>
                            </div>
                            <Switch
                                checked={values.amaEnabled}
                                onChange={() => setFieldValue('amaEnabled', !values.amaEnabled)}
                            />
                        </div>
                    )
                },
            },
        },
    },
    {
        modOnly: true,
        title: 'README',
        fields: {
            readme: {
                component: ({ values, setFieldValue, error }) => (
                    <>
                        <div className="flex justify-between items-center">
                            <label className="font-bold">How can we best work with you?</label>
                            <p className="m-0 opacity-60 text-sm">Supports Markdown</p>
                        </div>
                        <TextareaAutosize
                            value={values.readme}
                            onChange={(e) => setFieldValue('readme', e.target.value)}
                            minRows={6}
                            rows={6}
                            name="readme"
                            placeholder="I typically work best when..."
                            className={`py-2 px-4 text-base rounded-md w-full bg-accent dark:bg-accent-dark mt-1 border ${
                                error ? 'border-red' : 'border-border dark:border-dark'
                            }`}
                        />
                    </>
                ),
                className: 'w-full',
            },
        },
    },
]

const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('Required'),
    lastName: Yup.string().required('Required'),
    website: Yup.string().url('Invalid URL').nullable(),
    github: Yup.string().url('Invalid URL').nullable(),
    linkedin: Yup.string().url('Invalid URL').nullable(),
    twitter: Yup.string().url('Invalid URL').nullable(),
    biography: Yup.string().max(3000, 'Please limit your bio to 3,000 characters, you wordsmith!').nullable(),
})

function EditProfile({ profile, mutate }) {
    const { addToast } = useToast()
    const { getJwt, user } = useUser()
    const posthog = usePostHog()

    const onSubmit = async ({ avatar, ...values }, { setSubmitting }) => {
        const id = profile?.id
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
                    ...(newAvatar || avatar === null ? { avatar: image?.id ?? null } : {}),
                },
            }

            const { data } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${id}`, {
                method: 'PUT',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${JWT}`,
                },
            }).then((res) => res.json())

            if (data) {
                await mutate()
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
            addToast({ message: 'Profile updated!' })
        }
    }

    const { values, setFieldValue, handleChange, submitForm, handleSubmit, isSubmitting, errors } = useFormik({
        validationSchema: ValidationSchema,
        onSubmit,
        initialValues: formSections.reduce((acc, section) => {
            Object.keys(section.fields).forEach((key) => {
                acc[key] = profile[key]
            })
            return acc
        }, {}),
    })

    return (
        <Layout parent={communityMenu}>
            <SEO noindex title="Edit Profile - PostHog" />
            <section className="max-w-2xl mx-auto py-12 px-4">
                <form className="m-0 space-y-6" onSubmit={handleSubmit}>
                    {formSections.map((section, index) => {
                        if (section.modOnly && user?.role?.type !== 'moderator') return null
                        return (
                            <div key={index}>
                                <h2>{section.title}</h2>
                                {section.subtitle && <p className="opacity-70 -mt-4 mb-4">{section.subtitle}</p>}
                                <div className="flex flex-wrap items-center">
                                    {Object.keys(section.fields).map((key) => {
                                        const field = section.fields[key]
                                        const error = errors[key]
                                        return (
                                            <div key={key} className={`${field.className ?? 'w-1/2'} p-2 relative`}>
                                                {(field.component &&
                                                    field.component({ values, setFieldValue, error })) || (
                                                    <Input
                                                        type={field.type}
                                                        name={key}
                                                        placeholder={field.placeholder}
                                                        label={field.label}
                                                        value={values[key]}
                                                        onChange={handleChange}
                                                        error={!!error}
                                                    />
                                                )}
                                                {error && (
                                                    <p className="absolute text-red bottom-1.5 text-xs m-0 translate-y-full left-2 font-bold">
                                                        {error}
                                                    </p>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                    <CallToAction onClick={submitForm} className="mt-6" disabled={isSubmitting}>
                        Update
                    </CallToAction>
                </form>
            </section>
        </Layout>
    )
}

export default function EditProfilePage({ location }) {
    const [ready, setReady] = useState(false)
    const [profile, setProfile] = useState<any>()
    const { fetchUser } = useUser()

    const getProfile = async () => {
        const user = await fetchUser()
        let editProfile
        if (user) {
            if (location?.state?.profileID && user?.role?.type === 'moderator' && user?.webmaster) {
                const profile = await fetch(
                    `${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${location?.state?.profileID}?populate=*`
                ).then((res) => res.json())
                editProfile = flattenStrapiResponse(profile)
            } else {
                editProfile = user.profile
            }
            setProfile(editProfile)
            setReady(true)
        } else {
            navigate('/community')
        }
    }

    useEffect(() => {
        getProfile()
    }, [])

    return ready ? <EditProfile profile={profile} mutate={getProfile} /> : null
}
