import ImageDrop from 'components/ImageDrop'
import transformValues from 'components/Squeak/util/transformValues'
import uploadImage from 'components/Squeak/util/uploadImage'
import TeamSelect from 'components/TeamSelect'
import { Select as TopicSelect } from 'components/Squeak/components/QuestionForm'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Select from 'components/Select'
import RichText from 'components/Squeak/components/RichText'
import { CallToAction } from 'components/CallToAction'
import Spinner from 'components/Spinner'
import { IconChevronDown, IconPlus, IconX } from '@posthog/icons'
import * as Yup from 'yup'
import Toggle from 'components/Toggle'
import qs from 'qs'
import { AnimatePresence, motion } from 'framer-motion'
import menu from '../../navs'
import * as Icons from '@posthog/icons'
import { toJpeg } from 'html-to-image'
import { graphql, useStaticQuery } from 'gatsby'
import { capitalizeFirstLetter } from '../../utils'
import { topicIcons } from 'components/Questions/TopicsTable'

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
            <input className="w-full p-0 px-4 border-0 bg-transparent outline-none" {...other} />
        </label>
    )
}

const ProfileSelect = ({ value, onChange }: { value: any; onChange: (value: any) => void }) => {
    const [profiles, setProfiles] = useState<any[]>([])
    useEffect(() => {
        const query = qs.stringify({
            populate: ['avatar', 'teams'],
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
            search
            placeholder="Author"
            options={[...profiles]
                .sort((a, b) => {
                    const nameA = [a.attributes.firstName, a.attributes.lastName].filter(Boolean).join(' ')
                    const nameB = [b.attributes.firstName, b.attributes.lastName].filter(Boolean).join(' ')
                    return nameA.localeCompare(nameB)
                })
                .map((profile) => {
                    const name = [profile.attributes.firstName, profile.attributes.lastName].filter(Boolean).join(' ')
                    return {
                        label: name,
                        value: profile,
                    }
                })}
            value={(profiles.includes(value) ? value : profiles.find((profile) => profile.id === value?.id)) || {}}
            onChange={onChange}
        />
    )
}

const getMenuItemFromTopicLabel = (label) => {
    let menuItem
    for (const item of menu) {
        menuItem = item.children?.find((item) => item.name === label)
        if (menuItem) {
            break
        }
    }
    return menuItem
}

const RangeSlider = ({
    value,
    onChange,
    label,
    min = 20,
    max = 100,
    className = '',
}: {
    value: string
    onChange: (e: any) => void
    label?: string
    min?: number
    max?: number
    className?: string
}) => {
    return (
        <div className={`mt-2 ${className}`}>
            {label && <label className="block font-semibold">{label}</label>}
            <input
                className="w-full accent-red dark:accent-yellow"
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

const HogSelector = ({ value, onChange }) => {
    const {
        allCloudinaryImage: { nodes: allHogs },
    } = useStaticQuery(graphql`
        {
            allCloudinaryImage(filter: { folder: { eq: "hogs" } }) {
                nodes {
                    secure_url
                    public_id
                }
            }
        }
    `)
    const [hogs, setHogs] = useState(allHogs)
    const [searchValue, setSearchValue] = useState('')

    useEffect(() => {
        const filteredHogs = allHogs.filter((hog) => {
            const label = capitalizeFirstLetter(hog.public_id.replace('hogs/', '').replaceAll('_', ' '))
            return label?.toLowerCase().includes(searchValue.toLowerCase())
        })
        setHogs(filteredHogs)
    }, [searchValue])

    return (
        <div className="py-2">
            <input
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full bg-white rounded-md border border-border dark:border-dark mb-2 p-2 text-primary"
                placeholder="Search..."
            />
            <ul className="list-none !-mb-4 p-0 grid grid-cols-4 gap-1 max-h-[400px] overflow-auto">
                {hogs.map(({ secure_url, public_id }) => {
                    const selected = value === secure_url
                    const label = capitalizeFirstLetter(public_id.replace('hogs/', '').replaceAll('_', ' '))

                    return (
                        <li key={public_id}>
                            <button
                                type="button"
                                className={`rounded-md p-2 click border-border dark:border-dark ${
                                    selected ? 'border-2 bg-border/50 dark:bg-border-dark/50' : ' hover:border-2'
                                }`}
                                onClick={() => onChange(secure_url)}
                            >
                                <div className="aspect-square w-full relative">
                                    <img className="object-contain size-full" src={secure_url} />
                                </div>
                                <p className="!m-0 text-center !text-sm font-semibold">{label}</p>
                            </button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const SocialSharing = ({ values, setFieldValue }) => {
    const [downloaded, setDownloaded] = useState(false)
    const [downloadDisabled, setDownloadDisabled] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)
    const [open, setOpen] = useState(false)
    const menuItem = useMemo(
        () => getMenuItemFromTopicLabel(values?.topic?.attributes?.label),
        [values?.topic?.attributes?.label]
    )
    const TopicIcon = Icons[menuItem?.icon] || topicIcons[values?.topic?.attributes?.label?.toLowerCase()]
    const color = menuItem?.color || 'red'
    const imageURL = values?.featuredImage?.objectURL
    const socialValues = values?.social
    const teamName = values.author?.attributes?.teams?.data?.[0]?.attributes?.name

    const downloadImage = async () => {
        if (containerRef.current) {
            setDownloadDisabled(true)
            const dataURL = await toJpeg(containerRef.current, {
                quality: 1,
                canvasWidth: 1200,
                canvasHeight: 1200,
            })
            const link = document.createElement('a')
            link.download = `${socialValues.title}.jpeg`
            link.href = dataURL
            link.click()
            link.remove()
            setDownloaded(true)
            setTimeout(() => {
                setDownloaded(false)
                setDownloadDisabled(false)
            }, 3000)
        }
    }

    const [showHogSelector, setShowHogSelector] = useState(false)

    useEffect(() => {
        if (!socialValues.title && values.title) {
            setFieldValue('social.title', values.title)
        }
    }, [])

    return (
        <div className="p-4 border-t col-span-2">
            <button
                type="button"
                className="text-sm opacity-60 w-full flex justify-between items-center"
                onClick={() => setOpen(!open)}
            >
                <span>Social sharing</span>
                <IconChevronDown className={`size-7 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="divide-y divide-border dark:divide-border-dark mt-4">
                            <Input
                                label="Short title (supports HTML)"
                                placeholder="Short title (supports HTML)"
                                value={socialValues.title}
                                onChange={(e) => setFieldValue('social.title', e.target.value)}
                                className="-mx-4 -mb-1"
                            />
                            <div className="text-xs py-2">
                                Use <code className="text-xs">&lt;span class="text-red"&gt;</code> to emphasize
                                important parts and <code className="text-xs">&lt;br /&gt;</code> for a line break
                            </div>
                            <div className="py-4">
                                <label className="text-sm opacity-60 block">Title options</label>
                                <div className="flex w-full justify-evenly space-x-8">
                                    <RangeSlider
                                        value={socialValues.titleSize}
                                        onChange={(e) => setFieldValue('social.titleSize', e.target.value)}
                                        className="w-full"
                                        label="Size"
                                    />
                                    <RangeSlider
                                        value={socialValues.titleSpacing}
                                        onChange={(e) => setFieldValue('social.titleSpacing', e.target.value)}
                                        className="w-full"
                                        label="Spacing"
                                        max={50}
                                        min={0}
                                    />
                                </div>
                            </div>
                            <div className="py-4">
                                <label className="text-sm opacity-60 block">Image customization</label>
                                <div className="flex w-full justify-evenly space-x-8">
                                    <RangeSlider
                                        value={socialValues.imageSize}
                                        onChange={(e) => setFieldValue('social.imageSize', e.target.value)}
                                        label="Size"
                                        className="w-full"
                                    />
                                    <RangeSlider
                                        value={socialValues.rotation}
                                        onChange={(e) => setFieldValue('social.rotation', e.target.value)}
                                        label="Rotation"
                                        min={-180}
                                        max={180}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div>
                                <AnimatePresence>
                                    {open && (
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: 'auto' }}
                                            exit={{ height: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="py-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setShowHogSelector(!showHogSelector)}
                                                    className="text-[15px] font-semibold text-red dark:text-yellow transition-opacity flex items-center justify-between w-full"
                                                >
                                                    <span>{showHogSelector ? 'Hide' : 'Show'} hog selector</span>
                                                    <span>
                                                        {showHogSelector ? (
                                                            <Icons.IconMinus className="size-5" />
                                                        ) : (
                                                            <IconPlus className="size-5" />
                                                        )}
                                                    </span>
                                                </button>
                                                {showHogSelector && (
                                                    <HogSelector
                                                        value={socialValues.hog}
                                                        onChange={(value) => setFieldValue('social.hog', value)}
                                                    />
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="mb-2 flex justify-between items-center border-t border-border dark:border-dark pt-4">
                            <label className="text-sm opacity-60">Preview</label>
                            {downloaded ? (
                                <Icons.IconCheck className="size-4 text-green" />
                            ) : (
                                <button
                                    type="button"
                                    className="text-sm text-red dark:text-yellow font-bold disabled:opacity-50"
                                    onClick={downloadImage}
                                    disabled={downloadDisabled}
                                >
                                    Download image
                                </button>
                            )}
                        </div>
                        <div className="w-full flex justify-center">
                            <div
                                ref={containerRef}
                                className={`size-[572px] aspect-square p-4 bg-${color} text-primary flex-shrink-0 relative`}
                            >
                                <div className="bg-light size-full rounded-xl px-8 relative overflow-hidden flex flex-col">
                                    <div className="flex justify-center gap-2 items-end py-4 border-b border-border">
                                        <div>{TopicIcon && <TopicIcon className={`size-6 text-${color}`} />}</div>
                                        <h3 className="text-xl !m-0 font-bold">
                                            {menuItem?.name || values?.topic?.attributes?.label}
                                        </h3>
                                    </div>
                                    <div className="relative flex-grow">
                                        <h2
                                            style={{
                                                fontSize: `${socialValues.titleSize}px`,
                                                margin: `${socialValues.titleSpacing}px 0`,
                                            }}
                                            className="text-center leading-none"
                                            dangerouslySetInnerHTML={{ __html: socialValues.title }}
                                        />
                                        {imageURL && (
                                            <div
                                                style={{
                                                    width: `${socialValues.imageSize}%`,
                                                }}
                                                className="absolute left-1/2 -translate-x-1/2"
                                            >
                                                <img
                                                    style={{ transform: `rotate(${socialValues.rotation}deg)` }}
                                                    className="w-full shadow-xl"
                                                    src={imageURL}
                                                />
                                            </div>
                                        )}
                                        {values?.author && (
                                            <div className="absolute bottom-0 -right-4 flex space-x-2 pb-2 items-center">
                                                <div className="bg-white p-1 border border-border inline-block rounded-full">
                                                    <img
                                                        className="size-16 bg-yellow rounded-full"
                                                        src={values.author.attributes?.avatar?.data?.attributes?.url}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="!m-0 font-semibold !leading-none opacity-70 !text-sm">
                                                        Built by
                                                    </p>
                                                    <p className="!m-0 font-bold text-lg !leading-none !mt-1.5">
                                                        {values.author.attributes?.firstName}{' '}
                                                        {values.author.attributes?.lastName}
                                                    </p>
                                                    <p className="!m-0 font-semibold opacity-70 !text-sm !leading-none !mt-1">
                                                        {teamName
                                                            ? `${teamName} Team`
                                                            : values.author.attributes?.companyRole}
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {socialValues.hog && (
                                    <img src={socialValues.hog} className="absolute -left-11 -bottom-6 max-w-[250px]" />
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export const socialDefaults = {
    title: '',
    titleSize: '35',
    titleSpacing: '20',
    imageSize: '100',
    rotation: '0',
    hog: undefined,
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
            social: socialDefaults,
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
            social,
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
                        socialSharing: JSON.stringify(social),
                        ...(author?.id ? { profiles: { connect: [author.id] } } : null),
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
                                    tooltip='Adds roadmap item to the "We ship weirdly fast" section on the homepage'
                                />
                            </div>
                        )}
                    </div>
                )}
                <SocialSharing values={values} setFieldValue={setFieldValue} />
            </div>
            <CallToAction disabled={loading} onClick={handleSubmit} className="mt-2 w-full">
                {loading ? <Spinner className="text-white mx-auto !w-6 !h-6" /> : buttonText}
            </CallToAction>
        </form>
    )
}
