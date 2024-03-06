import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import Link from 'components/Link'
import qs from 'qs'
import { useUser } from 'hooks/useUser'
import { Close, Plus } from 'components/Icons'
import { Combobox } from '@headlessui/react'
import { Skeleton } from 'components/Questions/QuestionsTable'
import { CallToAction } from 'components/CallToAction'

const teamQuery = (name: string) =>
    qs.stringify(
        {
            filters: {
                name: {
                    $eqi: name,
                },
            },
            populate: ['profiles.avatar', 'profiles.leadTeams.name'],
        },
        { encodeValuesOnly: true }
    )

const userQuery = qs.stringify(
    {
        filters: {
            role: {
                type: {
                    $eqi: 'moderator',
                },
            },
        },
        fields: ['profile'],
        populate: 'profile.avatar',
    },
    { encodeValuesOnly: true }
)

const TeamMemberSelect = ({ handleChange, setShowMods }) => {
    const { getJwt } = useUser()
    const [moderators, setModerators] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        getJwt().then((jwt) =>
            fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/users?${userQuery}`, {
                headers: { Authorization: `Bearer ${jwt}` },
            })
                .then((res) => res.json())
                .then((data) => setModerators(data))
        )
    }, [])

    const filteredMods =
        query === ''
            ? moderators
            : moderators.filter((mod) => {
                const name = [mod?.profile?.firstName, mod?.profile?.lastName].filter(Boolean).join(' ')
                return name?.toLowerCase().includes(query.toLowerCase())
            })

    return (
        <div className="relative w-full mt-4">
            <Combobox onChange={handleChange}>
                <div className="rounded-md bg-accent dark:bg-accent-dark border border-border dark:border-dark w-full flex justify-between items-center overflow-hidden relative">
                    <Combobox.Input
                        autoFocus
                        placeholder="Type to search"
                        className="bg-accent dark:bg-accent-dark border-0 flex-grow py-2 px-4"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={() => setShowMods(false)} className="absolute -right-2 w-8 outline-none">
                        <Close className="w-3 h-3" />
                    </button>
                </div>

                <Combobox.Options className="list-none m-0 p-0 mt-1 max-h-80 overflow-auto divide-y divide-border dark:divide-border-dark rounded-md border border-border dark:border-dark absolute w-full z-50">
                    {filteredMods.map((mod) => {
                        const name = [mod?.profile?.firstName, mod?.profile?.lastName].filter(Boolean).join(' ')
                        return (
                            <Combobox.Option key={mod.id} value={mod} className="!m-0">
                                {({ active }) => (
                                    <div
                                        className={`bg-accent dark:bg-accent-dark p-3 py-2 text-base flex space-x-3 items-center cursor-pointer border-border dark:border-dark ${active ? 'bg-border dark:bg-border-dark' : ''
                                            }`}
                                    >
                                        <img
                                            className="rounded-full w-[32px] h-[32px] bg-border dark:bg-border-dark border border-border dark:border-dark"
                                            src={mod?.profile?.avatar?.url}
                                        />
                                        <span>{name}</span>
                                    </div>
                                )}
                            </Combobox.Option>
                        )
                    })}
                </Combobox.Options>
            </Combobox>
        </div>
    )
}

export const AddTeamMember = ({ handleChange }) => {
    const [showMods, setShowMods] = useState(false)

    return showMods ? (
        <TeamMemberSelect
            setShowMods={setShowMods}
            handleChange={(mod) => {
                handleChange(mod)
                setShowMods(false)
            }}
        />
    ) : (
        <CallToAction onClick={() => setShowMods(true)} type="secondary" size="sm" className="mt-4">Add team member</CallToAction>
    )
}

export default function TeamMembers({ team: teamName }: { team: string }) {
    const { isModerator, getJwt } = useUser()
    const [team, setTeam] = useState()
    const [loading, setLoading] = useState(true)

    const fetchTeamMembers = () => {
        return fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams?${teamQuery(teamName)}`)
            .then((res) => res.json())
            .then(({ data }) => {
                setTeam(data?.[0] ?? [])
            })
    }

    const addTeamMember = async (teamMember) => {
        const jwt = await getJwt()
        const body = JSON.stringify({
            data: {
                profiles: {
                    connect: [teamMember?.profile?.id],
                },
            },
        })
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams/${team?.id}`, {
            method: 'PUT',
            body,
            headers: {
                Authorization: `Bearer ${jwt}`,
                'content-type': 'application/json',
            },
        })
        fetchTeamMembers()
    }

    const removeTeamMember = async (teamMember) => {
        const jwt = await getJwt()
        const body = JSON.stringify({
            data: {
                profiles: {
                    disconnect: [teamMember?.id],
                },
            },
        })
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams/${team?.id}`, {
            method: 'PUT',
            body,
            headers: {
                Authorization: `Bearer ${jwt}`,
                'content-type': 'application/json',
            },
        })
        fetchTeamMembers()
    }

    const handleTeamLead = async (id, remove) => {
        const jwt = await getJwt()
        const body = JSON.stringify({
            data: {
                leadProfiles: { ...(remove ? { disconnect: [id] } : { connect: [id] }) },
            },
        })
        await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/teams/${team?.id}`, {
            method: 'PUT',
            body,
            headers: {
                Authorization: `Bearer ${jwt}`,
                'content-type': 'application/json',
            },
        })
        fetchTeamMembers()
    }

    useEffect(() => {
        fetchTeamMembers().then(() => setLoading(false))
    }, [])

    const teamMembers = team?.attributes?.profiles?.data?.sort(
        (a, b) =>
            b?.attributes?.leadTeams?.data?.filter(({ attributes: { name } }) => name === teamName).length -
            a?.attributes?.leadTeams?.data?.filter(({ attributes: { name } }) => name === teamName).length
    )

    return (
        <section className="@container">
            <h4>Team members</h4>
            <ul className="list-none m-0 p-0 grid gap-6 grid-cols-1 @lg:grid-cols-2">
                {loading ? (
                    <li>
                        <Skeleton />
                    </li>
                ) : (
                    teamMembers?.length > 0 &&
                    teamMembers.map((member) => {
                        const { firstName, lastName, avatar, companyRole, leadTeams, country } =
                            member?.attributes ?? {}
                        const name = [firstName, lastName].filter(Boolean).join(' ')
                        return (
                            <li
                                className="bg-accent dark:bg-accent-dark border border-light dark:border-dark rounded min-h-28 relative hover:-translate-y-0.5 active:translate-y-0 hover:transition-all hover:border-b-[4px] active:border-b-1 active:top-[2px] group"
                                key={name}
                            >
                                <Link
                                    className="flex justify-between h-full relative text-primary dark:text-primary-dark hover:text-primary dark:hover:text-primary-dark"
                                    to={`/community/profiles/${member.id}`}
                                >
                                    <div className="flex flex-col justify-between px-3 pt-4 pb-3 w-full mr-24 @lg:mr-28">
                                        <div>
                                            <h3 className="!m-0 text-base leading-tight">{name}</h3>
                                            <p className="text-primary/50 !m-0 !text-sm dark:text-primary-dark/50">
                                                {companyRole}
                                            </p>
                                        </div>

                                        <span className="flex items-center gap-2 mt-1">
                                            {country && (
                                                <span className="!leading-none text-2xl">
                                                    {country === 'world' ? (
                                                        '🌎'
                                                    ) : (
                                                        <ReactCountryFlag svg countryCode={country} />
                                                    )}
                                                </span>
                                            )}
                                            {leadTeams?.data?.some(({ attributes: { name } }) => name === teamName) ? (
                                                <button
                                                    onClick={(e) => {
                                                        if (isModerator) {
                                                            e.preventDefault()
                                                            handleTeamLead(member.id, true)
                                                        }
                                                    }}
                                                    className="inline-block border-2 border-red/50 rounded-sm text-[12px] px-2 py-1 !leading-none font-semibold text-red bg-white dark:bg-transparent"
                                                >
                                                    Team lead
                                                </button>
                                            ) : (
                                                isModerator && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            handleTeamLead(member.id, false)
                                                        }}
                                                        className="group-hover:visible inline-block border-2 border-primary/10 dark:border-primary-dark/10 border-dashed rounded-sm text-[12px] px-2 py-1 !leading-none font-semibold text-primary/40 dark:text-primary-dark/40 invisible"
                                                    >
                                                        Team lead?
                                                    </button>
                                                )
                                            )}
                                        </span>
                                    </div>

                                    <figure className="m-0 -mt-8 p-0 absolute right-0 bottom-0">
                                        <img
                                            src={avatar?.data?.attributes?.url}
                                            className="w-[150px] @lg:max-h-28 @lg:w-auto"
                                        />
                                    </figure>
                                </Link>
                                {isModerator && (
                                    <button
                                        className="p-1 hidden group-hover:flex rounded-full justify-center items-center bg-accent dark:bg-accent-dark border border-border dark:border-dark absolute -top-3 -right-3"
                                        onClick={(e) => removeTeamMember(member)}
                                    >
                                        <Close className="w-3 h-3" />
                                    </button>
                                )}
                            </li>
                        )
                    })
                )}
            </ul>
            {isModerator && <AddTeamMember handleChange={addTeamMember} />}
        </section>
    )
}
