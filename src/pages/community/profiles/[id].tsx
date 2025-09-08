import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { PageProps } from 'gatsby'
import SEO from 'components/seo'
import { GitHub, LinkedIn, Twitter } from 'components/Icons'
import Link from 'components/Link'
import Markdown from 'components/Squeak/components/Markdown'
import { Questions } from 'components/Squeak'
import { useUser } from 'hooks/useUser'
import useSWR from 'swr'
import { ProfileData, StrapiRecord } from 'lib/strapi'
import getAvatarURL from '../../../components/Squeak/util/getAvatar'
import qs from 'qs'
import usePostHog from 'hooks/usePostHog'
import useTopicsNav from '../../../navs/useTopicsNav'
import { usePosts } from 'components/Edition/hooks/usePosts'
import PostsTable from 'components/Edition/PostsTable'
import { SortDropdown } from 'components/Edition/Views/Default'
import { sortOptions } from 'components/Edition/Posts'
import NotFoundPage from 'components/NotFoundPage'
import ScrollArea from 'components/RadixUI/ScrollArea'
import Stickers from 'components/Stickers/Index'
import Tooltip from 'components/RadixUI/Tooltip'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import OSTabs from 'components/OSTabs'
import { TeamMember } from 'components/People'
import {
    IconThumbsUpFilled,
    IconThumbsDownFilled,
    IconArrowUpRight,
    IconSpinner,
    IconUpload,
    IconX,
    IconCheck,
} from '@posthog/icons'
import { CallToAction } from 'components/CallToAction'
import { Fieldset } from 'components/OSFieldset'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import RichText from 'components/Squeak/components/RichText'
import transformValues from 'components/Squeak/util/transformValues'
import { profileBackgrounds } from '../../../data/profileBackgrounds'
import { Select } from 'components/RadixUI/Select'
import OSInput from 'components/OSForm/input'
import { useToast } from '../../../context/Toast'

dayjs.extend(relativeTime)

const WebsiteIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
            />
        </svg>
    )
}

const stripUrlPrefix = (url: string) => {
    return url.replace(/^https?:\/\/(www\.)?/, '')
}

const BackgroundImageField = ({
    setFieldValue,
    values,
}: {
    setFieldValue: (field: string, value: any) => void
    values: any
}) => {
    const currentBg = values.backgroundImage
    return (
        <Block title="Fun things">
            <label className="text-sm font-bold">Choose a background for your profile</label>
            <div className="grid grid-cols-2 gap-2 mt-2">
                {profileBackgrounds.map((bg) => {
                    const isSelected = currentBg?.id === bg.id
                    return (
                        <button
                            key={bg.id}
                            type="button"
                            onClick={() =>
                                setFieldValue('backgroundImage', {
                                    id: bg.id,
                                    url: bg.url,
                                    backgroundSize: bg.backgroundSize,
                                    backgroundRepeat: bg.backgroundRepeat,
                                    backgroundPosition: bg.backgroundPosition,
                                })
                            }
                            className={`relative overflow-hidden rounded-md border-2 ${
                                isSelected ? 'border-red dark:border-yellow' : 'border-input'
                            } transition-all hover:scale-105`}
                        >
                            <div
                                className="aspect-video w-full"
                                style={{
                                    backgroundImage: `url(${bg.url})`,
                                    backgroundSize: bg.backgroundSize || 'auto',
                                    backgroundRepeat: bg.backgroundRepeat || 'no-repeat',
                                    backgroundPosition: bg.backgroundPosition || 'center',
                                }}
                            />
                            <span className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-1">
                                {bg.name}
                            </span>
                        </button>
                    )
                })}

                <button
                    type="button"
                    onClick={() => setFieldValue('backgroundImage', null)}
                    className={`relative overflow-hidden rounded-md border-2 ${
                        !currentBg ? 'border-red dark:border-yellow' : 'border-input'
                    } transition-all hover:scale-105 aspect-video`}
                >
                    <span className="text-sm font-bold">No background</span>
                </button>
            </div>
        </Block>
    )
}

const Links = ({
    profile,
    isEditing,
    setFieldValue,
    formValues,
    errors,
}: {
    profile: ProfileData
    isEditing: boolean
    setFieldValue: (field: string, value: string) => void
    formValues: any
    errors: any
}) => {
    return (
        <ul className={`flex m-0 p-0 list-none ${isEditing ? 'flex-col space-y-3' : 'space-x-3'}`}>
            {isEditing ? (
                <li>
                    <Input
                        error={errors.github}
                        label="GitHub"
                        name="github"
                        value={formValues.github}
                        onChange={(e) => setFieldValue('github', e.target.value)}
                    />
                </li>
            ) : (
                profile.github && (
                    <li>
                        <Tooltip
                            delay={0}
                            trigger={
                                <Link to={profile.github} externalNoIcon>
                                    <GitHub className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity" />
                                </Link>
                            }
                        >
                            {stripUrlPrefix(profile.github)}
                        </Tooltip>
                    </li>
                )
            )}
            {isEditing ? (
                <li>
                    <Input
                        error={errors.twitter}
                        label="X"
                        name="twitter"
                        value={formValues.twitter}
                        onChange={(e) => setFieldValue('twitter', e.target.value)}
                    />
                </li>
            ) : (
                profile.twitter && (
                    <li>
                        <Tooltip
                            delay={0}
                            trigger={
                                <Link to={profile.twitter} externalNoIcon>
                                    <Twitter className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity" />
                                </Link>
                            }
                        >
                            {stripUrlPrefix(profile.twitter)}
                        </Tooltip>
                    </li>
                )
            )}
            {isEditing ? (
                <li>
                    <Input
                        error={errors.linkedin}
                        label="LinkedIn"
                        name="linkedin"
                        value={formValues.linkedin}
                        onChange={(e) => setFieldValue('linkedin', e.target.value)}
                    />
                </li>
            ) : (
                profile.linkedin && (
                    <li>
                        <Tooltip
                            delay={0}
                            trigger={
                                <Link to={profile.linkedin} externalNoIcon>
                                    <LinkedIn className="w-6 h-6 opacity-80 hover:opacity-100 transition-opacity" />
                                </Link>
                            }
                        >
                            {stripUrlPrefix(profile.linkedin)}
                        </Tooltip>
                    </li>
                )
            )}
            {isEditing ? (
                <li>
                    <Input
                        error={errors.website}
                        label="Website"
                        name="website"
                        value={formValues.website}
                        onChange={(e) => setFieldValue('website', e.target.value)}
                    />
                </li>
            ) : (
                profile.website && (
                    <li>
                        <Tooltip
                            delay={0}
                            trigger={
                                <Link to={profile.website} externalNoIcon>
                                    <WebsiteIcon />
                                </Link>
                            }
                        >
                            {stripUrlPrefix(profile.website)}
                        </Tooltip>
                    </li>
                )
            )}
        </ul>
    )
}

const Input = ({ label, name, value, onChange, error }) => {
    return (
        <OSInput
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={label}
            direction="column"
            error={error}
            touched={!!error}
            showLabel={true}
        />
    )
}

const AvatarBlock = ({
    profile,
    isEditing,
    name,
    setFieldValue,
    values,
    errors,
}: {
    profile: ProfileData
    isEditing: boolean
    name: string
    setFieldValue: (field: string, value: string) => void
    values: any
    errors: any
}) => {
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
        <div className="relative flex flex-col items-center mb-4 bg-primary rounded-md overflow-hidden border border-primary">
            {isEditing && (
                <div className="absolute right-0 top-0 flex items-center">
                    <div className="relative p-2 border-l border-b border-primary rounded-bl-md bg-primary overflow-hidden">
                        <IconUpload className="size-5" />
                        <input
                            ref={inputRef}
                            onChange={handleChange}
                            accept=".jpg, .png, .gif, .jpeg"
                            className="opacity-0 absolute w-full h-full top-0 left-0 cursor-pointer z-10"
                            name="avatar"
                            type="file"
                        />
                    </div>
                    {imageURL && (
                        <button
                            onClick={() => setFieldValue('avatar', null)}
                            className="p-2 border-l border-b border-primary bg-primary"
                        >
                            <IconX className="size-5" />
                        </button>
                    )}
                </div>
            )}
            <Avatar className="w-full border-b border-primary" src={imageURL} color={profile.color} />
            {isEditing ? (
                <div className="p-3 w-full space-y-3">
                    <Input
                        label="First name"
                        name="firstName"
                        value={values.firstName}
                        onChange={(e) => setFieldValue('firstName', e.target.value)}
                        error={errors.firstName}
                    />
                    <Input
                        label="Last name"
                        name="lastName"
                        value={values.lastName}
                        onChange={(e) => setFieldValue('lastName', e.target.value)}
                        error={errors.lastName}
                    />
                    <div>
                        <label className="text-[15px]">Favorite color</label>
                        <ul className="list-none m-0 p-0 flex space-x-1 mt-1">
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
                                            className={`size-5 rounded-full bg-${color} border-[1.5px] ${
                                                active ? 'border-black dark:border-white' : 'border-transparent'
                                            }`}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-2 my-2">
                    <h2 className="uppercase">{name}</h2>
                    {profile.country && (
                        <Tooltip trigger={<Stickers country={profile.country} className="w-6 h-6" />} delay={0}>
                            {profile.location || profile.country}
                        </Tooltip>
                    )}
                </div>
            )}
            {!isEditing && profile.companyRole && (
                <p className="text-secondary text-sm m-0 mb-2 -mt-2">{profile.companyRole}</p>
            )}
        </div>
    )
}

const Details = ({ profile, isEditing, setFieldValue, values, errors, isTeamMember }) => {
    return (
        <div className="text-sm space-y-3">
            {!isEditing && (
                <p className="flex justify-between m-0">
                    {isTeamMember ? (
                        <>
                            <span className="font-semibold">Joined PostHog</span>
                            <span>{dayjs(profile.startDate).fromNow()}</span>
                        </>
                    ) : (
                        <>
                            <span className="font-semibold">Community member since</span>
                            <span>{dayjs(profile.createdAt).format('MMMM D, YYYY')}</span>
                        </>
                    )}
                </p>
            )}
            {isEditing ? (
                <div>
                    <label className="text-[15px]">Pineapple on pizza</label>
                    <ToggleGroup
                        title="Pineapple on pizza"
                        hideTitle={true}
                        options={[
                            {
                                label: 'Yes',
                                value: 'yes',
                            },
                            {
                                label: 'No',
                                value: 'no',
                            },
                        ]}
                        value={values.pineappleOnPizza === null ? undefined : values.pineappleOnPizza ? 'yes' : 'no'}
                        onValueChange={(value) => setFieldValue('pineappleOnPizza', value === 'yes' ? true : false)}
                    />
                </div>
            ) : (
                profile.pineappleOnPizza !== null && (
                    <p className="flex justify-between m-0">
                        <span className="font-semibold">Pineapple on pizza:</span>
                        <span>
                            {profile.pineappleOnPizza ? (
                                <IconThumbsUpFilled className="size-4 text-green" />
                            ) : (
                                <IconThumbsDownFilled className="size-4 text-red" />
                            )}
                        </span>
                    </p>
                )
            )}
            {isEditing ? (
                <Input
                    label="Location"
                    name="location"
                    value={values.location}
                    onChange={(e) => setFieldValue('location', e.target.value)}
                    error={errors.location}
                />
            ) : (
                profile.location && (
                    <p className="flex justify-between m-0">
                        <span className="font-semibold">Location:</span>
                        <span>{profile.location}</span>
                    </p>
                )
            )}
            {isEditing ? (
                <Input
                    label="Pronouns"
                    name="pronouns"
                    value={values.pronouns}
                    onChange={(e) => setFieldValue('pronouns', e.target.value)}
                    error={errors.pronouns}
                />
            ) : (
                profile.pronouns && (
                    <p className="flex justify-between m-0">
                        <span className="font-semibold">Pronouns:</span>
                        <span>{profile.pronouns}</span>
                    </p>
                )
            )}
        </div>
    )
}

function convertCentimetersToInches(centimeters: number): number {
    return centimeters / 2.54
}

const ModeratorFields = ({ setFieldValue, values, errors }) => {
    const [heightUnit, setHeightUnit] = useState('in')
    const [height, setHeight] = useState(values.height)

    useEffect(() => {
        setFieldValue('height', heightUnit === 'cm' ? convertCentimetersToInches(height) : height)
    }, [heightUnit])

    return (
        <div className="space-y-3">
            <Input
                label="Role"
                name="companyRole"
                value={values.companyRole}
                onChange={(e) => setFieldValue('companyRole', e.target.value)}
                error={errors.companyRole}
            />
            <Input
                label="Country (2-char code)"
                name="country"
                value={values.country}
                onChange={(e) => setFieldValue('country', e.target.value)}
                error={errors.country}
            />
            <div>
                <label className="text-[15px]">Height</label>
                <div className="flex items-center space-x-1">
                    <input
                        className="bg-transparent text-primary border border-input rounded px-3 py-1.5 text-[15px] placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-orange/50"
                        type="number"
                        name="height"
                        value={height}
                        onChange={(e) => {
                            const value = Number(e.target.value)
                            setHeight(value)
                            setFieldValue('height', heightUnit === 'cm' ? convertCentimetersToInches(value) : value)
                        }}
                    />
                    <ToggleGroup
                        title="Height unit"
                        hideTitle
                        options={[
                            { label: 'in', value: 'in' },
                            { label: 'cm', value: 'cm' },
                        ]}
                        value={heightUnit}
                        onValueChange={(value) => setHeightUnit(value)}
                    />
                </div>
            </div>
            <div>
                <label className="text-[15px]">Show comments</label>
                <p className="text-xs text-secondary m-0 mb-2">
                    Let visitors comment on your profile. You'll get comment notifications via email.
                </p>
                <ToggleGroup
                    title="Show comments"
                    hideTitle
                    options={[
                        { label: 'Yes', value: 'yes' },
                        { label: 'No', value: 'no' },
                    ]}
                    value={values.amaEnabled === null ? undefined : values.amaEnabled ? 'yes' : 'no'}
                    onValueChange={(value) => setFieldValue('amaEnabled', value === 'yes' ? true : false)}
                />
            </div>
        </div>
    )
}

const ProfileSkeleton = () => {
    return (
        <div data-scheme="secondary" className="h-full bg-primary">
            <ScrollArea>
                <div data-scheme="primary" className="mx-auto max-w-screen-xl px-5 @container">
                    <div className="flex flex-col @2xl:flex-row gap-6 p-6">
                        {/* Left sidebar skeleton */}
                        <div className="@2xl:max-w-xs w-full flex-shrink-0">
                            {/* Avatar section skeleton */}
                            <div className="flex flex-col items-center mb-6 bg-primary rounded-md overflow-hidden border border-primary">
                                <div className="w-full aspect-square bg-accent animate-pulse border-b border-primary" />
                                <div className="flex items-center space-x-2 my-2">
                                    <div className="h-6 w-32 bg-accent animate-pulse rounded" />
                                </div>
                                <div className="h-4 w-24 bg-accent animate-pulse rounded mb-2" />
                            </div>

                            {/* Details block skeleton */}
                            <Fieldset data-scheme="secondary" className="bg-primary mb-6" legend="Details">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <div className="h-4 w-24 bg-accent animate-pulse rounded" />
                                        <div className="h-4 w-16 bg-accent animate-pulse rounded" />
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="h-4 w-20 bg-accent animate-pulse rounded" />
                                        <div className="h-4 w-12 bg-accent animate-pulse rounded" />
                                    </div>
                                    <div className="flex justify-between">
                                        <div className="h-4 w-16 bg-accent animate-pulse rounded" />
                                        <div className="h-4 w-20 bg-accent animate-pulse rounded" />
                                    </div>
                                </div>
                            </Fieldset>

                            {/* Links block skeleton */}
                            <Fieldset data-scheme="secondary" className="bg-primary mb-6" legend="Links">
                                <div className="flex space-x-3">
                                    <div className="w-6 h-6 bg-accent animate-pulse rounded" />
                                    <div className="w-6 h-6 bg-accent animate-pulse rounded" />
                                    <div className="w-6 h-6 bg-accent animate-pulse rounded" />
                                </div>
                            </Fieldset>

                            {/* Achievements block skeleton */}
                            <Fieldset data-scheme="secondary" className="bg-primary mb-6" legend="Achievements">
                                <div className="grid grid-cols-7 gap-2">
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <div key={i} className="aspect-square bg-accent animate-pulse rounded" />
                                    ))}
                                </div>
                            </Fieldset>
                        </div>

                        {/* Right content skeleton */}
                        <div className="flex-grow @container">
                            {/* Tabs skeleton */}
                            <div className="bg-primary rounded-md border border-primary mb-6">
                                <div className="p-6 space-y-4">
                                    <div className="h-4 w-full bg-accent animate-pulse rounded" />
                                    <div className="h-4 w-3/4 bg-accent animate-pulse rounded" />
                                    <div className="h-4 w-1/2 bg-accent animate-pulse rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

const Avatar = (props: { className?: string; src?: string; color?: string }) => {
    return (
        <div className={`overflow-hidden aspect-square bg-${props.color} ${props.className}`}>
            {props.src ? (
                <img className="w-full object-fill" alt="" src={props.src} />
            ) : (
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                        fill="#BFBFBC"
                    />
                    <path
                        d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                        fill="#BFBFBC"
                    />
                </svg>
            )}
        </div>
    )
}

const LikedPosts = ({ profileID }) => {
    const posts = usePosts({
        params: {
            filters: {
                likes: {
                    id: {
                        $eq: profileID,
                    },
                },
            },
        },
    })

    return (
        <ul className="list-none m-0 p-0">
            <PostsTable {...posts} />
        </ul>
    )
}

const Block = ({ title, children, url }) => {
    return (
        <Fieldset
            data-scheme="secondary"
            className="bg-primary"
            legend={
                url ? (
                    <Link className="font-semibold group" to={url} state={{ newWindow: true }}>
                        {title}
                        <IconArrowUpRight className="size-4 -mt-px inline-block text-muted group-hover:text-secondary" />
                    </Link>
                ) : (
                    title
                )
            }
        >
            <div>{children}</div>
        </Fieldset>
    )
}

const BodyEditor = ({ values, setFieldValue, bodyKey, initialValue }) => {
    return (
        <div className="bg-white dark:bg-accent-dark rounded-md border border-primary overflow-hidden">
            <RichText values={values} initialValue={initialValue} setFieldValue={setFieldValue} bodyKey={bodyKey} />
        </div>
    )
}

const ProfileTabs = ({ profile, firstName, id, isEditing, values, errors, setFieldValue }) => {
    const { user, isModerator } = useUser()
    const [sort, setSort] = useState(sortOptions[0].label)
    const [hasPosts, setHasPosts] = useState(false)
    const posts = usePosts({
        params: {
            sort: sortOptions.find((option) => option.label === sort)?.sort,
            filters: {
                authors: {
                    id: {
                        $eq: id,
                    },
                },
            },
        },
    })

    useEffect(() => {
        if (!hasPosts && posts.posts.length > 0) {
            setHasPosts(true)
        }
    }, [posts])

    const tabs = [
        {
            value: 'bio',
            label: 'Bio',
            content: isEditing ? (
                <BodyEditor
                    values={values}
                    setFieldValue={setFieldValue}
                    bodyKey="biography"
                    initialValue={profile.biography}
                />
            ) : (
                <Markdown className="">{profile.biography || `${firstName} hasn't written a bio yet`}</Markdown>
            ),
        },
        ...((isModerator && isEditing) || profile.readme
            ? [
                  {
                      value: 'readme',
                      label: 'README',
                      content: isEditing ? (
                          <BodyEditor
                              values={values}
                              setFieldValue={setFieldValue}
                              bodyKey="readme"
                              initialValue={profile.readme}
                          />
                      ) : (
                          <Markdown className="prose dark:prose-invert prose-sm">{profile.readme}</Markdown>
                      ),
                  },
              ]
            : []),
        {
            value: 'discussions',
            label: 'Discussions',
            content: (
                <>
                    <Questions
                        profileId={id}
                        disclaimer={false}
                        showForm={false}
                        noQuestionsMessage={
                            <p className="prose dark:prose-invert prose-sm max-w-full text-primary m-0">
                                {firstName} hasn't participated in any discussions yet
                            </p>
                        }
                    />
                </>
            ),
        },
        ...(hasPosts
            ? [
                  {
                      value: 'posts',
                      label: 'Posts',
                      content: (
                          <>
                              <div className="flex justify-between items-center mb-4">
                                  <h4 className="text-lg font-bold m-0">All posts</h4>
                                  <Select
                                      groups={[
                                          {
                                              items: sortOptions.map((option) => ({
                                                  label: option.label,
                                                  value: option.label,
                                              })),
                                              label: 'Sort by',
                                          },
                                      ]}
                                      value={sort}
                                      onValueChange={(value) => setSort(value)}
                                  />
                              </div>
                              <PostsTable {...posts} />
                          </>
                      ),
                  },
              ]
            : []),
        ...(user?.profile?.id === id
            ? [
                  {
                      value: 'likes',
                      label: 'Liked posts',
                      content: (
                          <>
                              <h4 className="text-lg font-bold mb-4">Your liked posts</h4>
                              <LikedPosts profileID={id} />
                          </>
                      ),
                  },
              ]
            : []),
    ]

    return <OSTabs tabs={tabs} defaultValue={tabs[0].value} className="h-auto" triggerDataScheme="primary" />
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

export default function ProfilePage({ params }: PageProps) {
    const id = parseInt(params.id || params['*'])
    const posthog = usePostHog()
    const nav = useTopicsNav()
    const { addToast } = useToast()
    const { user, getJwt } = useUser()
    const [isEditing, setIsEditing] = useState(false)

    const isCurrentUser = user?.profile?.id === id
    const isModerator = user?.role?.type === 'moderator'

    const profileQuery = qs.stringify(
        {
            populate: {
                avatar: true,
                role: {
                    select: ['type'],
                },
                achievements: {
                    ...(!isCurrentUser
                        ? {
                              filters: {
                                  hidden: {
                                      $ne: true,
                                  },
                              },
                          }
                        : null),
                    populate: {
                        achievement: {
                            populate: {
                                image: true,
                                icon: true,
                            },
                        },
                    },
                },
                teams: {
                    populate: {
                        leadProfiles: true,
                        profiles: {
                            populate: ['avatar', 'teams', 'pronouns'],
                        },
                        crest: true,
                    },
                },
                ...(isModerator
                    ? {
                          user: true,
                      }
                    : null),
            },
        },
        {
            encodeValuesOnly: true,
        }
    )

    const { data, error, isLoading, mutate } = useSWR<StrapiRecord<ProfileData>>(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${id}?${profileQuery}`,
        async (url) => {
            const jwt = user && (await getJwt())
            const res = await fetch(
                url,
                jwt
                    ? {
                          headers: {
                              Authorization: `Bearer ${jwt}`,
                          },
                      }
                    : undefined
            )
            const { data } = await res.json()
            return data
        }
    )

    if (error) {
        posthog?.capture('squeak error', {
            source: 'ProfilePage',
            error: JSON.stringify(error),
        })
    }

    const handleBlock = async (blockUser: boolean) => {
        if (blockUser) {
            if (confirm('Are you sure you want to block this user and remove all of their posts and replies?')) {
                try {
                    const jwt = await getJwt()
                    await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profile/block/${profile.id}`, {
                        method: 'PUT',
                        headers: {
                            Authorization: `Bearer ${jwt}`,
                        },
                    })
                } catch (err) {
                    console.error(err)
                }
            } else {
                return
            }
        } else {
            try {
                const jwt = await getJwt()
                await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profile/unblock/${profile.id}`, {
                    method: 'PUT',
                    headers: {
                        Authorization: `Bearer ${jwt}`,
                    },
                })
            } catch (err) {
                console.error(err)
            }
        }
        window.location.reload()
    }

    const { attributes: profile } = data || {}
    const { firstName, lastName } = profile || {}

    const name = [firstName, lastName].filter(Boolean).join(' ')
    const isTeamMember = profile?.teams?.data?.length > 0
    const team = profile?.teams?.data[0]

    // Create a map of team names to crest data for quick lookup
    const teamCrestMap = team?.attributes?.crest?.data
        ? {
              [team.attributes.name]: team.attributes.crest.data.attributes.url,
          }
        : {}

    const { submitForm, isSubmitting, setFieldValue, values, resetForm, errors } = useFormik({
        validationSchema: ValidationSchema,
        enableReinitialize: true,
        initialValues: {
            website: profile?.website,
            twitter: profile?.twitter,
            linkedin: profile?.linkedin,
            github: profile?.github,
            avatar: getAvatarURL(profile),
            firstName: profile?.firstName,
            lastName: profile?.lastName,
            location: profile?.location,
            country: profile?.country,
            pronouns: profile?.pronouns,
            pineappleOnPizza: profile?.pineappleOnPizza,
            biography: profile?.biography,
            images: [],
            readme: profile?.readme,
            height: profile?.height,
            color: profile?.color,
            backgroundImage: profile?.backgroundImage,
            companyRole: profile?.companyRole,
            amaEnabled: profile?.amaEnabled,
        },
        onSubmit: async ({ avatar, images, ...values }) => {
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

                const { body: biography } =
                    values.biography && images.length > 0
                        ? await transformValues({ body: values.biography, images }, id, JWT)
                        : {}

                const { body: readme } =
                    values.readme && images.length > 0
                        ? await transformValues({ body: values.readme, images }, id, JWT)
                        : {}

                const body = {
                    data: {
                        ...values,
                        ...((image && typeof image !== 'string') || image === null
                            ? { avatar: image?.id ?? null }
                            : {}),
                        ...(biography ? { biography } : {}),
                        ...(readme ? { readme } : {}),
                    },
                }

                const { data } = await fetch(
                    `${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${id}?populate=avatar`,
                    {
                        method: 'PUT',
                        body: JSON.stringify(body),
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${JWT}`,
                        },
                    }
                ).then((res) => res.json())

                if (data) {
                    await mutate()

                    // Show success toast
                    addToast({
                        description: (
                            <>
                                <IconCheck className="text-green size-4 inline-block mr-1" />
                                Profile saved successfully
                            </>
                        ),
                        duration: 3000,
                    })
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
                setIsEditing(false)
            }
        },
    })

    if (!profile && isLoading) {
        return <ProfileSkeleton />
    } else if (!profile && !isLoading) {
        // if profile wasn't found after loading, show 404 page
        return <NotFoundPage />
    }

    return (
        <div data-scheme="secondary" className="h-full bg-primary text-primary">
            <SEO title={`${name}'s profile - PostHog`} />
            <ScrollArea>
                <div
                    data-scheme="primary"
                    className="mx-auto max-w-screen-xl px-5 @container"
                    style={
                        values.backgroundImage
                            ? {
                                  backgroundImage: `url(${values.backgroundImage.url})`,
                                  backgroundSize: values.backgroundImage.backgroundSize || 'auto',
                                  backgroundRepeat: values.backgroundImage.backgroundRepeat || 'no-repeat',
                                  backgroundPosition: values.backgroundImage.backgroundPosition || 'center',
                              }
                            : undefined
                    }
                >
                    <div className="flex flex-col @2xl:flex-row gap-6 p-6">
                        <div className="@2xl:max-w-xs w-full flex-shrink-0">
                            <AvatarBlock
                                profile={profile}
                                isEditing={isEditing}
                                name={name}
                                setFieldValue={setFieldValue}
                                values={values}
                                errors={errors}
                            />

                            {(isEditing ||
                                profile.pineappleOnPizza !== null ||
                                profile.pronouns ||
                                profile.location) && (
                                <Block title="Details">
                                    <Details
                                        profile={profile}
                                        isEditing={isEditing}
                                        setFieldValue={setFieldValue}
                                        values={values}
                                        errors={errors}
                                        isTeamMember={isTeamMember}
                                    />
                                </Block>
                            )}

                            {(isEditing ||
                                profile.github ||
                                profile.twitter ||
                                profile.linkedin ||
                                profile.website) && (
                                <Block title="Links">
                                    <Links
                                        errors={errors}
                                        setFieldValue={setFieldValue}
                                        formValues={values}
                                        profile={profile}
                                        isEditing={isEditing}
                                    />
                                </Block>
                            )}

                            {profile.achievements?.length > 0 && (
                                <Block title="Achievements">
                                    <ul className="grid grid-cols-7 gap-2 m-0 p-0 list-none">
                                        {profile.achievements.map(({ achievement, hidden, id }) => (
                                            <li key={id} className="flex justify-center">
                                                <Achievement
                                                    {...achievement.data.attributes}
                                                    id={id}
                                                    hidden={hidden}
                                                    profile={profile}
                                                    mutate={mutate}
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </Block>
                            )}
                            {isEditing && <BackgroundImageField setFieldValue={setFieldValue} values={values} />}
                            {isModerator && isEditing && (
                                <Block title="Special employee things">
                                    <ModeratorFields setFieldValue={setFieldValue} values={values} errors={errors} />
                                </Block>
                            )}
                            {isEditing ? (
                                <div className="space-y-2 mb-4">
                                    <CallToAction
                                        size="sm"
                                        type="primary"
                                        width="full"
                                        onClick={submitForm}
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <IconSpinner className="size-5 animate-spin mx-auto" />
                                        ) : (
                                            'Update profile'
                                        )}
                                    </CallToAction>
                                    <CallToAction
                                        size="sm"
                                        type="secondary"
                                        width="full"
                                        onClick={() => {
                                            setIsEditing(false)
                                            resetForm()
                                        }}
                                    >
                                        Cancel
                                    </CallToAction>
                                </div>
                            ) : (
                                (user?.profile?.id === data?.id ||
                                    (user?.role?.type === 'moderator' && user?.webmaster)) && (
                                    <div className="mb-4">
                                        <CallToAction
                                            size="sm"
                                            onClick={() => {
                                                setIsEditing(true)
                                            }}
                                            type="secondary"
                                            width="full"
                                        >
                                            Edit profile
                                        </CallToAction>
                                    </div>
                                )
                            )}
                            {isModerator && (
                                <Block title="Moderator tools">
                                    <div className="space-y-2">
                                        <CallToAction
                                            to={`${process.env.GATSBY_SQUEAK_API_HOST}/admin/content-manager/collection-types/plugin::users-permissions.user/${profile.user?.data.id}`}
                                            size="sm"
                                            type="secondary"
                                            width="full"
                                        >
                                            View in Strapi
                                        </CallToAction>
                                        <CallToAction
                                            size="sm"
                                            type="primary"
                                            onClick={() => handleBlock(!profile.user?.data.attributes.blocked)}
                                            width="full"
                                        >
                                            {profile.user?.data.attributes.blocked ? 'Unblock User' : 'Block User'}
                                        </CallToAction>
                                    </div>
                                </Block>
                            )}
                        </div>

                        <div className="flex-grow @container">
                            <ProfileTabs
                                profile={profile}
                                firstName={firstName}
                                id={id}
                                isEditing={isEditing}
                                values={values}
                                errors={errors}
                                setFieldValue={setFieldValue}
                            />
                            <div className="mt-6">
                                {profile.teams?.data?.length > 0 &&
                                    profile.teams.data[0].attributes.profiles?.data?.length > 0 && (
                                        <Block
                                            title={`${team.attributes.name} Team`}
                                            url={`/teams/${team.attributes.slug}`}
                                        >
                                            <div className="grid grid-cols-2 gap-3 @lg:grid-cols-3 @3xl:grid-cols-4 pt-8">
                                                {team.attributes.profiles.data
                                                    .filter((teammate) => teammate.id !== data?.id)
                                                    .map((teammate) => {
                                                        return (
                                                            <Link
                                                                key={teammate.id}
                                                                to={`/community/profiles/${teammate.id}`}
                                                                state={{ newWindow: true }}
                                                            >
                                                                <TeamMember
                                                                    avatar={{
                                                                        url:
                                                                            teammate.attributes.avatar?.data?.attributes
                                                                                ?.url ||
                                                                            teammate.attributes.avatar?.url,
                                                                    }}
                                                                    firstName={teammate.attributes.firstName}
                                                                    lastName={teammate.attributes.lastName}
                                                                    companyRole={teammate.attributes.companyRole}
                                                                    country={teammate.attributes.country}
                                                                    location={teammate.attributes.location}
                                                                    squeakId={teammate.id}
                                                                    color={teammate.attributes.color || 'yellow'}
                                                                    biography={teammate.attributes.biography || ''}
                                                                    teamCrestMap={teamCrestMap}
                                                                    pineappleOnPizza={
                                                                        teammate.attributes.pineappleOnPizza
                                                                    }
                                                                    startDate={teammate.attributes.startDate}
                                                                    isTeamLead={team.attributes?.leadProfiles?.data?.some(
                                                                        ({ id: leadID }) => leadID === teammate.id
                                                                    )}
                                                                />
                                                            </Link>
                                                        )
                                                    })}
                                            </div>
                                        </Block>
                                    )}
                            </div>
                            {profile.amaEnabled && (
                                <div className="mt-6">
                                    <Block title="Comments">
                                        <Questions
                                            initialView={'question-form'}
                                            slug={window?.location?.pathname}
                                            profileId={undefined}
                                            showForm
                                            disclaimer={false}
                                            autoFocus={false}
                                        />
                                    </Block>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </div>
    )
}

const Achievement = ({ title, description, image, icon, id, mutate, profile, ...other }) => {
    const { user, getJwt } = useUser()
    const [hidden, setHidden] = useState(other.hidden)
    const [opacity, setOpacity] = useState(hidden ? 0.6 : 1)
    const isCurrentUser = user?.profile?.id === profile.id
    const handleClick = async (hidden: boolean) => {
        if (isCurrentUser) {
            setHidden(hidden)
            try {
                const jwt = await getJwt()
                const body = {
                    data: {
                        achievements: [
                            ...profile.achievements
                                .filter((achievement) => achievement.id !== id)
                                .map(({ id, hidden }) => ({ id, hidden })),
                            {
                                id,
                                hidden,
                            },
                        ],
                    },
                }
                await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles/${user.profile.id}?populate=avatar`, {
                    method: 'PUT',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                })
                await mutate()
            } catch (err) {
                console.error(err)
            }
        }
    }

    useEffect(() => {
        setOpacity(hidden ? 0.6 : 1)
    }, [hidden])

    const ImageContainer = isCurrentUser ? 'button' : 'span'

    return (
        <Tooltip
            delay={0}
            side="bottom"
            trigger={
                <ImageContainer
                    onClick={isCurrentUser ? () => handleClick(!hidden) : undefined}
                    onMouseEnter={isCurrentUser ? () => setOpacity(0.8) : undefined}
                    onMouseOut={isCurrentUser ? () => setOpacity(hidden ? 0.6 : 1) : undefined}
                    style={{ opacity }}
                    className={`relative transition-opacity`}
                >
                    <img className="w-full" src={icon?.data?.attributes?.url} />
                </ImageContainer>
            }
        >
            <div className="max-w-[250px] text-left">
                <div className="mb-4 -mx-2 -mt-2">
                    <img src={image?.data?.attributes?.url} />
                </div>
                <h4 className="text-lg m-0">{title}</h4>
                <p className="m-0 mt-1 text-sm mb-2">{description}</p>
            </div>
        </Tooltip>
    )
}
