import { IconPencil, IconHide, IconDownload } from '@posthog/icons'
import Link from 'components/Link'
import RoadmapForm, { Status } from 'components/RoadmapForm'
import Tooltip from 'components/Tooltip'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import qs from 'qs'

export const RoadmapSuccess = ({
    id,
    description = 'Roadmap item will be appear on next build',
}: {
    id: number
    description?: string
}) => {
    return (
        <div className="py-3 px-4 my-6 bg-green/10 rounded-md border border-green ">
            <h4 className="!m-0">Success!</h4>
            <p className="!m-0">{description}</p>
            <Link
                external
                to={`${process.env.GATSBY_SQUEAK_API_HOST}/admin/content-manager/collection-types/api::roadmap.roadmap/${id}`}
                className="mt-2 text-sm"
            >
                View in Strapi
            </Link>
        </div>
    )
}

const ActionButton = ({ onClick, children, roundButton }) => {
    return (
        <button
            className={`group z-10 font-bold p-2 rounded-full border ${
                roundButton
                    ? ' bg-white dark:bg-dark border-light dark:border-dark'
                    : '-mt-2 opacity-50 hover:bg-white hover:dark:bg-dark border-transparent hover:border-light hover:dark:border-dark'
            } leading-none hover:scale-[1.02] hover:-translate-y-px active:translate-y-px active:scale-[.98]`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default function UpdateWrapper({
    id,
    children,
    status,
    formClassName = '',
    editButtonClassName = '',
    roundButton,
    onSubmit,
    showSuccessMessage = false,
    ...other
}: {
    id: number
    children?: JSX.Element
    status: Status
    formClassName?: string
    editButtonClassName?: string
    roundButton?: boolean
    onSubmit?: (roadmap?: any) => void
    showSuccessMessage?: boolean
    editing?: boolean
}) {
    const { user, getJwt } = useUser()
    const [editing, setEditing] = useState(other.editing ?? false)
    const [initialValues, setInitialValues] = useState<any>(null)
    const [success, setSuccess] = useState(false)
    const [subscribers, setSubscribers] = useState([])

    const handleUnpublish = async () => {
        const confirmed = window.confirm(
            'Unpublishing this roadmap item will remove it from the roadmap and it will need to be republished via Strapi. No data will be lost. Are you sure you want to unpublish?'
        )
        if (confirmed) {
            await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmaps/${id}`, {
                body: JSON.stringify({
                    data: {
                        publishedAt: null,
                    },
                }),
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                    Authorization: `Bearer ${await getJwt()}`,
                },
            }).then((res) => res.json())
            setSuccess(true)
            onSubmit?.()
        }
    }

    const fetchRoadmapItem = async () => {
        const query = qs.stringify({
            populate: ['topic', 'teams', 'image', 'category', 'subscribers.user'],
        })
        const jwt = await getJwt()
        const {
            data: {
                attributes: {
                    title,
                    description,
                    topic,
                    teams,
                    image,
                    betaAvailable,
                    milestone,
                    category,
                    githubUrls,
                    dateCompleted,
                    subscribers,
                },
            },
        } = await fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/roadmaps/${id}?${query}`,
            jwt
                ? {
                      headers: {
                          Authorization: `Bearer ${jwt}`,
                      },
                  }
                : undefined
        ).then((res) => res.json())
        setSubscribers(subscribers?.data)
        setInitialValues({
            title,
            body: description,
            images: [],
            topic: topic?.data || undefined,
            team: teams?.data?.[0] || undefined,
            featuredImage: image?.data ? { file: null, objectURL: image.data.attributes.url } : undefined,
            betaAvailable,
            milestone,
            category: category || undefined,
            githubUrls: githubUrls?.length > 0 ? githubUrls : [''],
            dateCompleted: dateCompleted || dayjs().format('YYYY-MM-DD'),
        })
    }

    const handleExport = async () => {
        const csv = `First name,Last name,Email\n${subscribers
            .map(({ attributes: { user, firstName, lastName } }) => {
                return `${firstName},${lastName},${user?.data?.attributes?.email}`
            })
            .join('\n')}`
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${initialValues.title} subscribers.csv`
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(url)
    }

    useEffect(() => {
        if (user?.role?.type !== 'moderator') return
        fetchRoadmapItem()
    }, [user])

    return editing ? (
        <div className={formClassName}>
            <RoadmapForm
                status={status}
                hideStatusSelector={false}
                initialValues={initialValues}
                buttonText="Update"
                id={id}
                onSubmit={(roadmap) => {
                    fetchRoadmapItem()
                    setSuccess(true)
                    setEditing(false)
                    onSubmit?.(roadmap)
                }}
            />
        </div>
    ) : (
        (showSuccessMessage || children) && (
            <>
                {showSuccessMessage && success && (
                    <RoadmapSuccess description="Roadmap will update on next build" id={id} />
                )}
                {children && (
                    <div className="relative">
                        {user?.role?.type === 'moderator' && initialValues && (
                            <div className={`${editButtonClassName} flex space-x-1`}>
                                <ActionButton onClick={handleExport} roundButton={roundButton}>
                                    <Tooltip content={`Export ${subscribers.length} subscribers`} placement="top">
                                        <IconDownload
                                            className={`w-5 h-5 inline-block ${
                                                roundButton ? 'opacity-50 group-hover:opacity-100' : ''
                                            }}`}
                                        />
                                    </Tooltip>
                                </ActionButton>
                                <ActionButton onClick={() => setEditing(true)} roundButton={roundButton}>
                                    <Tooltip content="Edit" placement="top">
                                        <IconPencil
                                            className={`w-5 h-5 inline-block ${
                                                roundButton ? 'opacity-50 group-hover:opacity-100' : ''
                                            }}`}
                                        />
                                    </Tooltip>
                                </ActionButton>
                                <ActionButton onClick={() => handleUnpublish()} roundButton={roundButton}>
                                    <Tooltip content="Unpublish" placement="top">
                                        <span className="relative">
                                            <IconHide
                                                className={`w-5 h-5 inline-block ${
                                                    roundButton ? 'opacity-50 group-hover:opacity-100' : ''
                                                }}`}
                                            />
                                        </span>
                                    </Tooltip>
                                </ActionButton>
                            </div>
                        )}
                        <span>{children}</span>
                    </div>
                )}
            </>
        )
    )
}
