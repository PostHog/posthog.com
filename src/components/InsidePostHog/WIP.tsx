import React, { useEffect, useState } from 'react'
import qs from 'qs'
import Link from 'components/Link'
import slugify from 'slugify'
import { InProgress } from 'components/Roadmap/InProgress'
import { CallToAction } from 'components/CallToAction'

const Skeleton = () => <div className="w-full h-96 animate-pulse bg-accent dark:bg-accent-dark rounded-md" />

const getRecentUpdate = async () => {
    const { data } = await fetch(
        `${process.env.GATSBY_SQUEAK_API_HOST}/api/team-updates?${qs.stringify(
            {
                pagination: {
                    start: 0,
                    limit: 1,
                },
                populate: ['question.id', 'roadmap.id', 'team.id', 'question.profile.avatar'],
                sort: ['createdAt:desc'],
                filters: {
                    roadmap: {
                        id: {
                            $notNull: true,
                        },
                    },
                },
            },
            { encodeValuesOnly: true }
        )}`
    ).then((res) => res.json())
    return data
}

export default function WIP() {
    const [recentUpdate, setRecentUpdate] = useState()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getRecentUpdate().then((recentUpdate) => setRecentUpdate(recentUpdate?.[0]))
    }, [])

    useEffect(() => {
        if (recentUpdate) {
            setLoading(false)
        }
    }, [recentUpdate])

    const team = recentUpdate?.attributes?.team?.data?.attributes
    const profile = recentUpdate?.attributes?.question?.data?.attributes?.profile?.data
    const name = [profile?.attributes?.firstName, profile?.attributes?.lastName].filter(Boolean).join(' ')
    const avatarURL = profile?.attributes?.avatar?.data?.attributes?.formats?.thumbnail?.url
    const roadmap = recentUpdate?.attributes?.roadmap?.data

    return loading ? (
        <Skeleton />
    ) : (
        <div>
            <h3 className="m-0">WIP</h3>
            <p className="m-0 opacity-60">Updates on things we're working on right now</p>
            <div className="flex space-x-2 items-start mt-4">
                <div className="w-9 rounded-full overflow-hidden bg-salmon flex-shrink-0">
                    <img src={avatarURL} alt={name} className="w-full h-full" />
                </div>
                <div>
                    <p className="m-0 text-sm">
                        <Link to={`/community/profiles/${profile?.id}`} className="font-bold">
                            {name}
                        </Link>{' '}
                        <span className="opacity-50">posted on behalf of</span>{' '}
                        <Link
                            className="font-bold"
                            to={`/teams/${slugify(team?.name.toLowerCase().replace('ops', ''), {
                                remove: /and/,
                            })}`}
                        >
                            {team?.name}
                        </Link>
                    </p>
                    <div>
                        <ul className="list-none m-0 p-0 mt-4">
                            <InProgress squeakId={roadmap?.id} {...roadmap?.attributes} />
                        </ul>
                    </div>
                </div>
            </div>
            <CallToAction to="/wip" type="secondary" size="md" width="[calc(100%_+_3px)]" className="mt-4">
                More WIP
            </CallToAction>
        </div>
    )
}
