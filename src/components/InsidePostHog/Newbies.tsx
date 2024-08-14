import React, { useEffect, useState } from 'react'
import PersonCard from './PersonCard'
import qs from 'qs'
import dayjs from 'dayjs'

const Skeleton = () => <div className="w-full h-32 animate-pulse bg-accent dark:bg-accent-dark rounded-md mt-2" />

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
                        $gte: dayjs().subtract(1, 'month').toISOString(),
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
        <ul className="list-none grid gap-3 mt-2 [&>*:nth-child(2)>div:first-child]:bg-blue [&>*:nth-child(3)>div:first-child]:bg-yellow [&>*:nth-child(4)>div:first-child]:bg-teal">
            {newbies.map(({ id, attributes: { firstName, lastName, companyRole, avatar } }) => {
                const image = avatar?.data?.attributes?.formats?.thumbnail?.url
                const name = [firstName, lastName].filter(Boolean).join(' ')
                return (
                    <PersonCard
                        key={id}
                        url={`/community/profiles/${id}`}
                        name={name}
                        stat={companyRole}
                        image={
                            <div className="w-9 rounded-full aspect-square overflow-hidden bg-salmon">
                                <img src={image} alt={name} className="w-full h-full" />
                            </div>
                        }
                    />
                )
            })}
        </ul>
    )
}
