import React, { useEffect, useState } from 'react'
import PersonCard from './PersonCard'
import qs from 'qs'
import dayjs from 'dayjs'

const Skeleton = () => <div className="w-full h-32 animate-pulse bg-accent rounded-md mt-2" />

export default function Newbies() {
    const [loading, setLoading] = useState(true)
    const [newbies, setNewbies] = useState([])

    useEffect(() => {
        const query = qs.stringify(
            {
                populate: {
                    avatar: true,
                },
                filters: {
                    teams: {
                        id: {
                            $notNull: true,
                        },
                    },
                    startDate: {
                        $gte: dayjs().subtract(2, 'weeks').toISOString(),
                    },
                },
            },
            { encodeValuesOnly: true }
        )
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?${query}`)
            .then((res) => res.json())
            .then(({ data }) => {
                setNewbies(data)
                setLoading(false)
            })
    }, [])

    return loading ? (
        <Skeleton />
    ) : (
        <ul className="list-none grid gap-3 mt-2">
            {newbies.map(({ id, attributes: { firstName, lastName, companyRole, avatar, color } }) => {
                const image = avatar?.data?.attributes?.formats?.thumbnail?.url
                const name = [firstName, lastName].filter(Boolean).join(' ')
                return (
                    <PersonCard
                        key={id}
                        url={`/community/profiles/${id}`}
                        name={name}
                        stat={companyRole}
                        image={
                            <div
                                className={`w-9 rounded-full aspect-square overflow-hidden ${
                                    color ? `bg-${color}` : 'bg-salmon'
                                }`}
                            >
                                <img src={image} alt={name} className="w-full h-full size-9 object-fill" />
                            </div>
                        }
                    />
                )
            })}
        </ul>
    )
}
