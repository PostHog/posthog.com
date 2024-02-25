import ImageDrop from 'components/ImageDrop'
import transformValues from 'components/Squeak/util/transformValues'
import uploadImage from 'components/Squeak/util/uploadImage'
import TeamSelect from 'components/TeamSelect'
import { Select as TopicSelect } from 'components/Squeak/components/QuestionForm'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { useUser } from 'hooks/useUser'
import React, { useState } from 'react'
import Select from 'components/Select'
import RichText from 'components/Squeak/components/RichText'
import Slider from 'components/Slider'
import { CallToAction } from 'components/CallToAction'
import Spinner from 'components/Spinner'
import { IconPlus, IconX } from '@posthog/icons'
import * as Yup from 'yup'

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
        <div className="py-2 border-t border-border dark:border-dark px-2">
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
        team: Yup.number().required('Please select a team'),
        category: Yup.string().when([], {
            is: () => status === 'complete',
            then: Yup.string().required('Please select a type'),
            otherwise: Yup.string().notRequired(),
        }),
    })

const statusLabels = {
    'in-progress': 'In progress',
    complete: 'Complete',
    'under-consideration': 'Under consideration',
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
                                  dateCompleted: new Date(),
                              }
                            : status === 'in-progress'
                            ? {
                                  projectedCompletion: dayjs().add(1, 'year'),
                              }
                            : null),
                        ...(uploadedFeaturedImage
                            ? {
                                  image: uploadedFeaturedImage?.id,
                              }
                            : null),
                        teams: {
                            connect: [team],
                        },
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
        <form onSubmit={handleSubmit} className="m-0">
            <div className="bg-white dark:bg-accent-dark rounded-md border border-border dark:border-dark overflow-hidden">
                {status === 'complete' && (
                    <div className="border-b border-border dark:border-dark">
                        <ImageDrop
                            image={values.featuredImage}
                            onDrop={(image) => setFieldValue('featuredImage', image)}
                            onRemove={() => setFieldValue('featuredImage', undefined)}
                        />
                    </div>
                )}
                {!hideStatusSelector && (
                    <div className="border-b border-border dark:border-dark">
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
                )}
                <div className="border-b border-border dark:border-dark">
                    <TeamSelect value={values.team} onChange={(teamID) => setFieldValue('team', teamID)} />
                </div>
                {status === 'complete' && (
                    <TopicSelect label="Topic" value={values.topic} setFieldValue={setFieldValue} />
                )}
                {status === 'complete' && (
                    <div className="border-b border-border dark:border-dark">
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
                <input
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="w-full px-4 py-2 border-b border-border dark:border-dark bg-transparent"
                />
                <RichText
                    initialValue={initialValues.body}
                    setFieldValue={setFieldValue}
                    values={values}
                    maxLength={524288}
                />
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
                    <div className="py-2 border-t border-border dark:border-dark px-2">
                        <Slider className="space-x-1">
                            {status === 'in-progress' && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFieldValue('betaAvailable', !values.betaAvailable)
                                    }}
                                    className={`rounded-md p-2 border whitespace-nowrap text-sm bg-border/10 transition-colors ${
                                        values.betaAvailable
                                            ? 'font-bold border-black/90 dark:border-white/90'
                                            : 'hover:border-black/50 border-border dark:border-dark dark:hover:border-white/40'
                                    }`}
                                >
                                    Beta available
                                </button>
                            )}
                            {status === 'complete' && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setFieldValue('milestone', !values.milestone)
                                    }}
                                    className={`rounded-md p-2 border whitespace-nowrap text-sm bg-border/10 transition-colors ${
                                        values.milestone
                                            ? 'font-bold border-black/90 dark:border-white/90'
                                            : 'hover:border-black/50 border-border dark:border-dark dark:hover:border-white/40'
                                    }`}
                                >
                                    Show on homepage
                                </button>
                            )}
                        </Slider>
                    </div>
                )}
            </div>
            <CallToAction disabled={loading} onClick={handleSubmit} className="mt-2 w-full">
                {loading ? <Spinner className="text-white mx-auto !w-6 !h-6" /> : buttonText}
            </CallToAction>
        </form>
    )
}
