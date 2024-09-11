import { IconEllipsis } from '@posthog/icons'
import Link from 'components/Link'
import RoadmapForm, { socialDefaults, Status } from 'components/RoadmapForm'
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

const ActionButton = ({ onClick, children, roundButton = false }) => {
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

const Menu = ({ subscriberCount, setEditing, handleUnpublish, handleExport }) => {
    return (
        <ul className="list-none m-0 p-0 -my-3 -mx-4">
            <li className="border-b-half border-border dark:border-dark">
                <button
                    onClick={handleExport}
                    className="text-left p-3 hover:bg-accent dark:hover:bg-accent-dark w-full"
                >
                    <p className="m-0 text-sm font-semibold">Export subscriber list ({subscriberCount})</p>
                    <p className="m-0 text-xs opacity-60">People who subscribed for updates</p>
                </button>
            </li>
            <li className="border-b-half border-border dark:border-dark">
                <button
                    onClick={() => setEditing(true)}
                    className="text-left p-3 hover:bg-accent dark:hover:bg-accent-dark w-full"
                >
                    <p className="m-0 text-sm font-semibold">Edit</p>
                </button>
            </li>
            <li>
                <button
                    onClick={handleUnpublish}
                    className="text-left p-3 hover:bg-accent dark:hover:bg-accent-dark w-full"
                >
                    <p className="m-0 text-sm font-semibold">Unpublish</p>
                </button>
            </li>
        </ul>
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
    const [menuOpen, setMenuOpen] = useState(false)
    const [likes, setLikes] = useState([])

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
            populate: [
                'topic',
                'teams',
                'image',
                'category',
                'subscribers.user',
                'likes.user',
                'profiles.avatar',
                'profiles.teams',
            ],
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
                    socialSharing,
                    profiles,
                    likes,
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
        setLikes(likes?.data)
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
            social: { ...socialDefaults, ...(socialSharing ? JSON.parse(socialSharing) : {}) },
            author: profiles?.data?.[0] || undefined,
        })
    }

    const handleExport = async () => {
        const csv = `First name,Last name,Email,Type\n${subscribers
            .map(({ attributes: { user, firstName, lastName } }) => {
                return `${firstName},${lastName},${user?.data?.attributes?.email},Subscriber`
            })
            .join('\n')}
${likes
    .map(({ attributes: { user, firstName, lastName } }) => {
        return `${firstName},${lastName},${user?.data?.attributes?.email},Voter`
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
                                <Tooltip
                                    content={() => (
                                        <Menu
                                            subscriberCount={subscribers.length + likes.length}
                                            setEditing={setEditing}
                                            handleUnpublish={handleUnpublish}
                                            handleExport={handleExport}
                                        />
                                    )}
                                    placement="right"
                                    open={menuOpen}
                                    controlled
                                >
                                    <span className="relative">
                                        <ActionButton onClick={() => setMenuOpen(!menuOpen)}>
                                            <IconEllipsis className="size-5 rotate-90" />
                                        </ActionButton>
                                    </span>
                                </Tooltip>
                            </div>
                        )}
                        <span>{children}</span>
                    </div>
                )}
            </>
        )
    )
}
