import React, { useEffect, useState } from 'react'
import PersonCard from './PersonCard'
import qs from 'qs'
import dayjs from 'dayjs'

const Skeleton = () => <div className="w-full h-32 animate-pulse bg-accent dark:bg-accent-dark rounded-md mt-2" />

export default function Anniversaries() {
    const [loading, setLoading] = useState(true)
    const [teamMembers, setTeamMembers] = useState([])

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
                },
            },
            { encodeValuesOnly: true }
        )
        fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/profiles?${query}`)
            .then((res) => res.json())
            .then(({ data }) => {
                const teamMembers = data.filter((teamMember) => {
                    const {
                        attributes: { startDate },
                    } = teamMember
                    const date = dayjs(startDate)
                    const startMonth = date.month()
                    const currentMonth = dayjs().month()
                    const years = dayjs().diff(startDate, 'year')
                    teamMember.years = years
                    return date.isBefore(dayjs().subtract(364, 'days')) && startMonth === currentMonth
                })
                setTeamMembers(teamMembers)
                setLoading(false)
            })
    }, [])

    return loading ? (
        <Skeleton />
    ) : (
        <ul className="list-none grid gap-3 mt-2">
            {teamMembers.map(({ id, years, attributes: { firstName, lastName, companyRole, avatar } }) => {
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
                                <img src={image} alt={name} className="w-full h-full object-fill" />
                            </div>
                        }
                    />
                )
            })}
        </ul>
    )
}
