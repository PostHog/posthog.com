import RoadmapForm, { socialDefaults, Status } from 'components/RoadmapForm'
import { useUser } from 'hooks/useUser'
import React, { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import qs from 'qs'
import ScrollArea from 'components/RadixUI/ScrollArea'
import ProgressBar from 'components/ProgressBar'
import { useWindow } from '../../context/Window'
import { useApp } from '../../context/App'
import { useToast } from '../../context/Toast'

interface Team {
    data?: {
        id: number
        attributes: Record<string, unknown>
    }[]
}

interface Topic {
    data?: {
        id: number
        attributes: Record<string, unknown>
    }
}

interface Image {
    data?: {
        id: number
        attributes: {
            url: string
        }
    }
}

interface Profile {
    data?: {
        id: number
        attributes: Record<string, unknown>
    }[]
}

interface RoadmapData {
    id: number
    attributes: {
        status: Status
        title: string
        description: string
        topic: Topic
        teams: Team
        image: Image
        betaAvailable: boolean
        milestone: boolean
        category: string
        githubUrls: string[]
        dateCompleted: string
        socialSharing: string
        profiles: Profile
    }
}

export default function RoadmapWindow({
    id,
    status,
    onSubmit,
}: {
    id?: number
    status?: Status
    onSubmit?: () => void
}): JSX.Element {
    const { addToast } = useToast()
    const { user, getJwt } = useUser()
    const [initialValues, setInitialValues] = useState<Record<string, unknown> | null>(null)
    const { closeWindow } = useApp()
    const { appWindow } = useWindow()

    const fetchRoadmapItem = async () => {
        if (!id) return

        const query = qs.stringify({
            populate: ['topic', 'teams', 'image', 'category', 'profiles.avatar', 'profiles.teams'],
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
                    socialSharing,
                    profiles,
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

    useEffect(() => {
        if (id && user?.role?.type !== 'moderator') return
        fetchRoadmapItem()
    }, [user, id])

    return (
        <ScrollArea>
            <div className="p-4">
                {(initialValues && id) || !id ? (
                    <RoadmapForm
                        status={status || 'in-progress'}
                        hideStatusSelector={false}
                        initialValues={initialValues}
                        buttonText={id ? 'Update' : 'Create'}
                        id={id}
                        onSubmit={() => {
                            closeWindow(appWindow)
                            addToast({
                                description: id ? 'Roadmap updated successfully' : 'Roadmap created successfully',
                            })
                            onSubmit?.()
                        }}
                    />
                ) : (
                    <ProgressBar title="roadmap" />
                )}
            </div>
        </ScrollArea>
    )
}
