import { Listbox } from '@headlessui/react'
import { IconChevronDown, IconSearch } from '@posthog/icons'
import Link from 'components/Link'
import { useUser } from 'hooks/useUser'
import { capitalize } from 'instantsearch.js/es/lib/utils'
import React, { useEffect, useState } from 'react'

const priorities = ['low', 'normal', 'high', 'urgent']

const PriorityDropdown = ({ priority, ticketID, setTicket }) => {
    const { getJwt } = useUser()
    const handleChange = async (priority: string) => {
        const { ticket } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/zendesk/${ticketID}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${await getJwt()}`, 'content-type': 'application/json' },
            body: JSON.stringify({ priority }),
        }).then((res) => res.json())
        setTicket(ticket)
        return null
    }
    return (
        <div className="relative">
            <Listbox value={priority} onChange={handleChange}>
                <Listbox.Button className="text-sm flex items-center font-bold">
                    <span>{priority ? capitalize(priority) : 'None'}</span>
                    <span>
                        <IconChevronDown className="w-5" />
                    </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 whitespace-nowrap right-0 list-none p-0 m-0 mt-1 rounded-md bg-white text-black text-sm font-semibold divide-y divide-border cursor-pointer border border-border">
                    {priorities.map((priority) => {
                        return (
                            <Listbox.Option key={priority} className="px-2 py-1 text-sm" value={priority}>
                                {capitalize(priority)}
                            </Listbox.Option>
                        )
                    })}
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

const GroupDropdown = ({ groupID, ticketID, setTicket, disabled }) => {
    const { getJwt } = useUser()
    const [groups, setGroups] = useState([])
    const handleChange = async (groupID: number) => {
        const { ticket } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/zendesk/${ticketID}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${await getJwt()}`, 'content-type': 'application/json' },
            body: JSON.stringify({ group_id: groupID }),
        }).then((res) => res.json())
        setTicket(ticket)
        return null
    }

    const getGroups = async () => {
        const { groups } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/zendesk/groups`, {
            headers: { Authorization: `Bearer ${await getJwt()}` },
        }).then((res) => res.json())
        return groups
    }

    useEffect(() => {
        getGroups().then((groups) => setGroups(groups))
    }, [])

    return groups?.length > 0 ? (
        <div className="relative">
            <Listbox disabled={disabled} value={groupID} onChange={handleChange}>
                <Listbox.Button>
                    {({ disabled }) => {
                        return (
                            <div
                                className={`text-sm flex items-center font-bold ${
                                    disabled ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                <span>{groups.find((group) => group.id === groupID)?.name}</span>
                                <span>
                                    <IconChevronDown className="w-5" />
                                </span>
                            </div>
                        )
                    }}
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 whitespace-nowrap right-0 list-none p-0 m-0 mt-1 rounded-md bg-white text-black text-sm font-semibold divide-y divide-border cursor-pointer border border-border">
                    {groups.map(({ id, name }) => {
                        return (
                            <Listbox.Option key={id} className="px-2 py-1 text-sm" value={id}>
                                {name}
                            </Listbox.Option>
                        )
                    })}
                </Listbox.Options>
            </Listbox>
        </div>
    ) : null
}

const StatusDropdown = ({ status, ticketID, setTicket }) => {
    const { getJwt } = useUser()
    const handleChange = async (status: string) => {
        const { ticket } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/zendesk/${ticketID}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${await getJwt()}`, 'content-type': 'application/json' },
            body: JSON.stringify({ status }),
        }).then((res) => res.json())
        setTicket(ticket)
        return null
    }
    return (
        <div className="relative">
            <Listbox value={status} onChange={handleChange}>
                <Listbox.Button className="text-sm flex items-center font-bold">
                    <span>{capitalize(status)}</span>
                    <span>
                        <IconChevronDown className="w-5" />
                    </span>
                </Listbox.Button>
                <Listbox.Options className="absolute z-10 whitespace-nowrap right-0 list-none p-0 m-0 mt-1 rounded-md bg-white text-black text-sm font-semibold divide-y divide-border cursor-pointer border border-border">
                    <Listbox.Option className="px-2 py-1 text-sm" value={'open'}>
                        Open
                    </Listbox.Option>
                    <Listbox.Option className="px-2 py-1 text-sm" value={'solved'}>
                        Solved
                    </Listbox.Option>
                </Listbox.Options>
            </Listbox>
        </div>
    )
}

const Ticket = ({ status, id, group_id, setTicket, priority }) => {
    return (
        <div className="grid gap-y-1">
            <div className="flex items-center space-x-2 justify-between leading-none">
                <p className="m-0 text-sm font-semibold">ID</p>
                <Link
                    externalNoIcon
                    to={`https://${process.env.GATSBY_ZENDESK_SUBDOMAIN}.zendesk.com/agent/tickets/${id}`}
                >
                    {id}
                </Link>
            </div>
            <div className="flex items-center space-x-2 justify-between leading-none">
                <p className="m-0 text-sm font-semibold">Status</p>
                <StatusDropdown status={status} ticketID={id} setTicket={setTicket} />
            </div>
            <div className="flex items-center space-x-2 justify-between leading-none">
                <p className="m-0 text-sm font-semibold">Priority</p>
                <PriorityDropdown ticketID={id} priority={priority} setTicket={setTicket} />
            </div>
            <div className="flex items-center space-x-2 justify-between leading-none">
                <p className="m-0 text-sm font-semibold">Group</p>
                <GroupDropdown disabled={status === 'solved'} ticketID={id} groupID={group_id} setTicket={setTicket} />
            </div>
        </div>
    )
}

export default function ZendeskTicket({ question, questionID }) {
    const { getJwt } = useUser()
    const [loading, setLoading] = useState(true)
    const [ticket, setTicket] = useState(null)

    const linkTicket = async () => {
        const { zendeskTicketID } = await fetch(
            `${process.env.GATSBY_SQUEAK_API_HOST}/api/questions/${questionID}/zendesk/link`,
            {
                method: 'POST',
                headers: { Authorization: `Bearer ${await getJwt()}` },
            }
        ).then((res) => res.json())
        return zendeskTicketID
    }

    const getTicket = async (id) => {
        const { ticket } = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/zendesk/${id}`, {
            headers: { Authorization: `Bearer ${await getJwt()}` },
        }).then((res) => res.json())
        return ticket
    }

    useEffect(() => {
        const handleQuestionChange = async () => {
            let ticketID = question.attributes.zendeskTicketID
            if (!ticketID) {
                ticketID = await linkTicket()
                return
            }
            const ticket = await getTicket(ticketID)
            setTicket(ticket)
            setLoading(false)
        }
        handleQuestionChange()
    }, [question])

    return !loading && ticket ? (
        <div className="pt-4">
            <div className="flex items-center space-x-1 mb-2">
                <h4 className="text-xs flex space-x-1 text-primary dark:text-primary-dark opacity-70 p-0 m-0 font-semibold uppercase">
                    <span>Zendesk</span>
                    {question.attributes.autoLinkedToZendesk && <span className="text-xs">(Autolinked)</span>}
                </h4>
                <Link
                    to={`https://${
                        process.env.GATSBY_ZENDESK_SUBDOMAIN
                    }.zendesk.com/agent/search/1?copy&type=ticket&q=${encodeURIComponent(
                        question?.attributes?.subject
                    )}`}
                    externalNoIcon
                    className="font-bold text-sm"
                >
                    <IconSearch className="w-4 text-black dark:text-white opacity-60 hover:opacity:100 transition-opacity" />
                </Link>
            </div>

            <Ticket {...ticket} setTicket={setTicket} />
        </div>
    ) : null
}
