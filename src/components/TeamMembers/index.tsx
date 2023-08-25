import React, { useEffect, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { ContributorImage } from 'components/PostLayout/Contributors'
import Link from 'components/Link'
import qs from 'qs'
import { useUser } from 'hooks/useUser'
import { Close, Plus } from 'components/Icons'
import { Combobox } from '@headlessui/react'
import { Skeleton } from 'components/Questions/QuestionsTable'

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
        <div className="relative w-full my-1">
            <Combobox onChange={handleChange}>
                <div className="rounded-md bg-accent dark:bg-accent-dark border border-border dark:border-dark w-full flex justify-between items-center overflow-hidden">
                    <Combobox.Input
                        autoFocus
                        placeholder="Type to search"
                        className="bg-accent dark:bg-accent-dark flex-shrink-0 border-0 flex-grow !py-2 !px-4"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button
                        onClick={() => setShowMods(false)}
                        className="flex items-center justify-center w-8 outline-none"
                    >
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
                                        className={`bg-accent dark:bg-accent-dark p-3 py-2 text-base flex space-x-3 items-center cursor-pointer border-border dark:border-dark ${
                                            active ? 'bg-border dark:bg-border-dark' : ''
                                        }`}
                                    >
                                        <img
                                            className="rounded-full w-[32px] h-[32px] bg-border dark:bg-border-dark"
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

const AddTeamMember = ({ handleChange }) => {
    const [showMods, setShowMods] = useState(false)

    return showMods ? (
        <li className="!m-0 flex items-center">
            <TeamMemberSelect
                setShowMods={setShowMods}
                handleChange={(mod) => {
                    handleChange(mod)
                    setShowMods(false)
                }}
            />
        </li>
    ) : (
        <li className="!m-0 !text-inherit flex space-x-4 items-center py-3 relative active:top-[1px] active:scale-[.99] transition-transform px-4 hover:bg-accent dark:hover:bg-accent-dark rounded h-full group">
            <button onClick={() => setShowMods(true)} className="flex items-center space-x-2 w-full">
                <span className=" w-[32px] h-[32px] flex justify-center items-center p-1 rounded-full bg-accent dark:bg-accent-dark border group-hover:border-border dark:group-hover:border-dark border-transparent transition-colors">
                    <Plus className="w-full h-full" />
                </span>
                <span className="font-semibold">Add team member</span>
            </button>
        </li>
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
        <>
            <h4>Team members</h4>
            <ul className="list-none m-0 p-0 grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
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
                            <li className="!m-0 group relative" key={name}>
                                <Link
                                    className="!text-inherit flex space-x-4 items-center py-3 relative active:top-[1px] active:scale-[.99] transition-all px-4 hover:bg-accent dark:hover:bg-accent-dark rounded h-full"
                                    to={`/community/profiles/${member.id}`}
                                >
                                    <figure className="mb-0">
                                        <ContributorImage image={avatar?.data?.attributes?.url} />
                                    </figure>
                                    <div>
                                        <span className="flex items-center md:flex-row space-x-2">
                                            <p className="!text-lg !font-bold !m-0 !leading-none">{name}</p>
                                            {country && (
                                                <span className="!leading-none">
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
                                                    className="inline-block border-2 border-red/50 rounded-sm text-[12px] px-2 py-1 !leading-none font-semibold text-red bg-white"
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
                                                        className="group-hover:visible inline-block border-2 border-white/40 rounded-sm text-[12px] px-2 py-1 !leading-none font-semibold text-white/40 invisible"
                                                    >
                                                        Team lead
                                                    </button>
                                                )
                                            )}
                                        </span>
                                        <p className="!text-sm !mb-0 opacity-50 !leading-none !mt-1">{companyRole}</p>
                                    </div>
                                </Link>
                                {isModerator && (
                                    <button
                                        className="p-1 hidden group-hover:flex rounded-full justify-center items-center bg-accent dark:bg-accent-dark border border-border dark:border-dark absolute -top-1 -right-1"
                                        onClick={(e) => removeTeamMember(member)}
                                    >
                                        <Close className="w-2 h-2" />
                                    </button>
                                )}
                            </li>
                        )
                    })
                )}
                {isModerator && <AddTeamMember handleChange={addTeamMember} />}
            </ul>
        </>
    )
}
