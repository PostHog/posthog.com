import ImageDrop from 'components/ImageDrop'
import transformValues from 'components/Squeak/util/transformValues'
import uploadImage from 'components/Squeak/util/uploadImage'
import TeamSelect from 'components/TeamSelect'
import { Select as TopicSelect } from 'components/Squeak/components/QuestionForm'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import Select from 'components/Select'
import RichText from 'components/Squeak/components/RichText'
import Slider from 'components/Slider'
import { CallToAction } from 'components/CallToAction'
import Spinner from 'components/Spinner'
import { IconPlus, IconX } from '@posthog/icons'
import * as Yup from 'yup'
import Toggle from 'components/Toggle'
import qs from 'qs'

const GitHubURLs = ({
    urls,
    onChange,
    multiple = true,
    placeholder = 'https://github.com/PostHog/posthog/pull/1',
}: {
    urls: string[]
    onChange: (urls: string[]) => void
    multiple?: boolean
    placeholder?: string
}) => {
    return (
        <div className="p-4 border-t border-border dark:border-dark col-span-2">
            <label className="text-sm opacity-60 block mb-2">GitHub URLs</label>
            <ul className="list-none m-0 p-0 grid gap-y-2">
                {urls.map((url, index) => {
                    return (
                        <li key={index} className="flex space-x-1">
                            <input
                                placeholder={placeholder}
                                className="px-2 py-1.5 border border-border dark:border-dark rounded-md flex-grow bg-transparent"
                                onChange={(e) => {
                                    const value = e.target.value
                                    const newURLs = [...urls]
                                    newURLs[index] = value
                                    onChange?.(newURLs)
                                }}
                                value={url}
                            />
                            {multiple &&
                                (index === urls.length - 1 ? (
                                    <button
                                        type="button"
                                        onClick={() => onChange?.([...urls, ''])}
                                        className="w-10 p-1 border border-border dark:border-dark hover:border-black dark:hover:border-white/60 transition-colors rounded-md text-black/90 dark:text-border flex justify-center items-center"
                                    >
                                        <IconPlus className="w-5 h-5" />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => onChange?.(urls.filter((_, urlIndex) => urlIndex !== index))}
                                        className="w-10 p-1 border border-red/50 hover:border-red transition-colors rounded-md text-black/90 flex justify-center items-center"
                                    >
                                        <IconX className="w-5 h-5 text-red" />
                                    </button>
                                ))}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export type Status = 'in-progress' | 'complete' | 'under-consideration'

const ValidationSchema = (status?: Status) =>
    Yup.object().shape({
        title: Yup.string().required('Please enter a title'),
        body: Yup.string().required('Please enter a description'),
        topic: Yup.object().when([], {
            is: () => status === 'complete',
            then: Yup.object().required('Please select a topic'),
            otherwise: Yup.object().notRequired(),
        }),
        team: Yup.object().required('Please select a team'),
        category: Yup.string().when([], {
            is: () => status === 'complete',
            then: Yup.string().required('Please select a type'),
            otherwise: Yup.string().notRequired(),
        }),
    })

const statusLabels = {
    'in-progress': 'In progress (WIP)',
    complete: 'Complete (Changelog)',
    'under-consideration': 'Under consideration (Roadmap)',
}

const Input = ({
    label,
    className = '',
    ...other
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) => {
    return (
        <label className={`py-2 block ${className}`} htmlFor={other.id}>
            {other.value && <div className="text-sm opacity-60 -mb-0.5 px-4">{label}</div>}
            <input className="w-full p-0 px-4 border-0 bg-transparent" {...other} />
        </label>
    )
}

const ProfileSelect = ({ value, onChange }: { value: any; onChange: (value: any) => void }) => {
    const [profiles, setProfiles] = useState<any[]>([])
    useEffect(() => {
        const query = qs.stringify({
            pagination: {
                limit: 100,
            },
            filters: {
                teams: {
                    id: {
                        $notNull: true,
                    },
                },
            },
        })
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?${query}`)
            .then((res) => res.json())
            .then(({ data }) => {
                setProfiles(data)
            })
    }, [])

    return (
        <Select
            placeholder="Author"
            options={profiles.map((profile) => {
                const name = [profile.attributes.firstName, profile.attributes.lastName].filter(Boolean).join(' ')
                return {
                    label: name,
                    value: profile,
                }
            })}
            value={value}
            onChange={onChange}
        />
    )
}

export default function RoadmapForm({
    onSubmit,
    hideStatusSelector = true,
    buttonText = 'Publish',
    id,
    ...other
}: {
    status?: Status
    onSubmit?: (roadmap: any) => void
    initialValues?: any
    hideStatusSelector?: boolean
    buttonText?: string
    id?: number
}): JSX.Element {
    const [status, setStatus] = useState(other.status)
    const [loading, setLoading] = useState(false)
    const { getJwt, user } = useUser()
    const { handleSubmit, handleChange, values, setFieldValue, initialValues } = useFormik({
        enableReinitialize: true,
        validateOnMount: false,
        validationSchema: ValidationSchema(status),
        initialValues: other.initialValues ?? {
            title: '',
            body: '',
            images: [],
            topic: undefined,
            team: undefined,
            featuredImage: undefined,
            betaAvailable: false,
            milestone: false,
            category: undefined,
            githubUrls: [''],
            dateCompleted: dayjs().format('YYYY-MM-DD'),
            author: undefined,
        },
        onSubmit: async ({
            title,
            body,
            images,
            topic,
            team,
            featuredImage,
            betaAvailable,
            milestone,
            githubUrls,
            category,
            dateCompleted,
            author,
        }) => {
            setLoading(true)
            try {
                const jwt = await getJwt()
                const profileID = user?.profile?.id
                if (!profileID || !jwt) return
                const transformedValues = await transformValues({ body, images: images ?? [] }, profileID, jwt)
                const uploadedFeaturedImage =
                    featuredImage?.file &&
                    (await uploadImage(featuredImage?.file, jwt, {
                        field: 'images',
                        id: profileID,
                        type: 'api::profile.profile',
                    }))
                const data = JSON.stringify({
                    data: {
                        title,
                        description: transformedValues?.body,
                        ...(topic?.id
                            ? {
                                  topic: {
                                      connect: [topic.id],
                                  },
                              }
                            : null),
                        ...(status === 'complete'
                            ? {
                                  complete: true,
                                  dateCompleted,
                              }
                            : status === 'in-progress'
                            ? {
                                  complete: false,
                                  projectedCompletion: dayjs().add(1, 'year'),
                              }
                            : {
                                  complete: false,
                                  dateCompleted: null,
                                  projectedCompletion: null,
                              }),
                        ...(uploadedFeaturedImage
                            ? {
                                  image: uploadedFeaturedImage?.id,
                              }
                            : null),
                        teams: [team.id],
                        betaAvailable,
                        milestone,
                        githubUrls: githubUrls.filter((url) => !!url),
                        category,
                    },
                })
                const { data: roadmap } = await fetch(
                    `${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmaps/${id ?? ''}`,
                    {
                        body: data,
                        method: id ? 'PUT' : 'POST',
                        headers: {
                            'content-type': 'application/json',
                            Authorization: `Bearer ${await getJwt()}`,
                        },
                    }
                ).then((res) => res.json())
                setLoading(false)
                onSubmit?.(roadmap)
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        },
    })

    return (
        <form onSubmit={handleSubmit} className="mt-2 mb-6 border-b border-light dark:border-dark pb-8">
            <div className="bg-white dark:bg-accent-dark rounded-md border border-border dark:border-dark overflow-hidden grid grid-cols-2 [&>*]:border-border [&>*]:dark:border-dark">
                {status === 'complete' && (
                    <div className="col-span-2">
                        <ImageDrop
                            image={values.featuredImage}
                            onDrop={(image) => setFieldValue('featuredImage', image)}
                            onRemove={() => setFieldValue('featuredImage', undefined)}
                        />
                    </div>
                )}
                <div className="border-r border-b">
                    <Select
                        placeholder="Status"
                        options={Object.keys(statusLabels).map((key) => ({
                            label: statusLabels[key],
                            value: key,
                        }))}
                        onChange={(status) => setStatus(status)}
                        value={status}
                    />
                </div>
                {status === 'complete' && (
                    <Input
                        label="Date"
                        name="dateCompleted"
                        value={values.dateCompleted}
                        onChange={handleChange}
                        placeholder="Date"
                        type="date"
                        className="border-b"
                    />
                )}
                <div className="border-r border-b">
                    <TeamSelect value={values.team} onChange={(team) => setFieldValue('team', team)} />
                </div>
                <div className={status === 'complete' ? 'border-b' : 'col-span-2'}>
                    <ProfileSelect value={values.author} onChange={(profile) => setFieldValue('author', profile)} />
                </div>
                {status === 'complete' && (
                    <div className="border-r">
                        <TopicSelect
                            label="Product or feature"
                            value={values.topic}
                            setFieldValue={setFieldValue}
                            className="!border-0"
                        />
                    </div>
                )}
                {status === 'complete' && (
                    <div>
                        <Select
                            placeholder="Type"
                            options={[
                                { value: 'Major new feature' },
                                { value: 'New feature' },
                                { value: 'Company news' },
                                { value: 'Something cool happened' },
                                { value: 'Beta' },
                                { value: 'Improvement' },
                            ]}
                            onChange={(type) => setFieldValue('category', type)}
                            value={values.category}
                        />
                    </div>
                )}
                <Input
                    label="Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="Title"
                    id="title"
                    className="col-span-2 border-y"
                />
                <div className="col-span-2">
                    <RichText
                        initialValue={initialValues.body}
                        setFieldValue={setFieldValue}
                        values={values}
                        maxLength={524288}
                        label="Details"
                    />
                </div>
                {(status === 'in-progress' || status === 'under-consideration') && (
                    <GitHubURLs
                        urls={values.githubUrls}
                        onChange={(githubUrls) => setFieldValue('githubUrls', githubUrls)}
                        multiple={status === 'in-progress'}
                        placeholder={`https://github.com/PostHog/posthog/${
                            status === 'under-consideration' ? 'issues' : 'pull'
                        }/1`}
                    />
                )}
                {status !== 'under-consideration' && (
                    <div className="p-4 border-t col-span-2">
                        <label className="text-sm opacity-60 block mb-2">Options</label>
                        {status === 'in-progress' && (
                            <Toggle
                                checked={values.betaAvailable}
                                onChange={(checked) => setFieldValue('betaAvailable', checked)}
                                label="Beta available"
                            />
                        )}
                        {status === 'complete' && (
                            <div>
                                <Toggle
                                    checked={values.milestone}
                                    onChange={(checked) => setFieldValue('milestone', checked)}
                                    label="Show on homepage"
                                    tooltip='Adds roadmap item to "We ship weirdly fast" section on homepage'
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>
            <CallToAction disabled={loading} onClick={handleSubmit} className="mt-2 w-full">
                {loading ? <Spinner className="text-white mx-auto !w-6 !h-6" /> : buttonText}
            </CallToAction>
        </form>
    )
}
