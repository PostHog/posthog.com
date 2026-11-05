import React, { useMemo, useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import OSTable from 'components/OSTable'
import Link from 'components/Link'
import { Select } from 'components/RadixUI/Select'

interface ScopeAction {
    action: 'read' | 'write'
    scope: string
    oauth: boolean
    warning: string | null
}

interface ScopeObject {
    scopeObject: string
    name: string
    description: string
    group: string
    groupOrder: number
    docsUrl: string | null
    organizationWide: boolean
    actions: ScopeAction[]
    writeRequires: { scope: string; reason: string } | null
}

type AccessFilter = 'all' | 'oauth' | 'keys-only'

const ACCESS_FILTERS: { value: AccessFilter; label: string }[] = [
    { value: 'all', label: 'All scopes' },
    { value: 'oauth', label: 'OAuth apps can request' },
    { value: 'keys-only', label: 'Granted only by PostHog' },
]

const matchesAccess = (scopeObject: ScopeObject, access: AccessFilter): boolean => {
    if (access === 'oauth') {
        return scopeObject.actions.some((action) => action.oauth)
    }
    if (access === 'keys-only') {
        return scopeObject.actions.some((action) => !action.oauth)
    }
    return true
}

const matchesSearch = (scopeObject: ScopeObject, search: string): boolean => {
    const tokens = search.toLowerCase().trim().split(/\s+/).filter(Boolean)
    const haystack = [
        scopeObject.scopeObject,
        scopeObject.name,
        scopeObject.description,
        ...scopeObject.actions.map((action) => action.scope),
    ]
        .join(' ')
        .toLowerCase()
    return tokens.every((token) => haystack.includes(token))
}

const ScopeCell = ({ action }: { action: ScopeAction | undefined }) =>
    action ? <code className="text-sm whitespace-nowrap">{action.scope}</code> : <span className="text-muted">-</span>

const Notes = ({ scopeObject }: { scopeObject: ScopeObject }) => {
    const notes = [
        ...scopeObject.actions.flatMap((action) => (action.warning ? [`${action.scope}: ${action.warning}`] : [])),
        ...scopeObject.actions.flatMap((action) =>
            action.oauth ? [] : [`${action.scope} is granted only by PostHog, so OAuth apps can't request it.`]
        ),
        ...(scopeObject.organizationWide
            ? ["Applies to the whole organization, so keys limited to some projects can't have it."]
            : []),
        ...(scopeObject.writeRequires ? [scopeObject.writeRequires.reason] : []),
    ]
    if (notes.length === 0) {
        return null
    }
    return (
        <ul className="m-0 pl-4 text-sm space-y-1">
            {notes.map((note) => (
                <li key={note}>{note}</li>
            ))}
        </ul>
    )
}

const columns = [
    { name: 'Scope', width: 'minmax(180px, 1fr)', align: 'left' as const },
    { name: 'What it covers', width: 'minmax(260px, 2fr)', align: 'left' as const },
    { name: 'Read', width: 'auto', align: 'left' as const },
    { name: 'Write', width: 'auto', align: 'left' as const },
    { name: 'Notes', width: 'minmax(200px, 1.5fr)', align: 'left' as const },
]

const toRow = (scopeObject: ScopeObject) => {
    const read = scopeObject.actions.find((action) => action.action === 'read')
    const write = scopeObject.actions.find((action) => action.action === 'write')
    return {
        key: scopeObject.scopeObject,
        cells: [
            {
                content: (
                    <div id={scopeObject.scopeObject} className="scroll-mt-24">
                        <div className="font-semibold">{scopeObject.name}</div>
                        <code className="text-xs">{scopeObject.scopeObject}</code>
                    </div>
                ),
            },
            {
                content: (
                    <div className="text-sm">
                        {scopeObject.description}{' '}
                        {scopeObject.docsUrl && (
                            <Link to={scopeObject.docsUrl.replace('https://posthog.com', '')}>Docs</Link>
                        )}
                    </div>
                ),
            },
            { content: <ScopeCell action={read} /> },
            { content: <ScopeCell action={write} /> },
            { content: <Notes scopeObject={scopeObject} /> },
        ],
    }
}

export default function ScopeReference(): JSX.Element {
    const { allPostHogScopeObject } = useStaticQuery(graphql`
        query ScopeReference {
            allPostHogScopeObject(sort: { fields: [groupOrder, scopeObject], order: [ASC, ASC] }) {
                nodes {
                    scopeObject
                    name
                    description
                    group
                    groupOrder
                    docsUrl
                    organizationWide
                    actions {
                        action
                        scope
                        oauth
                        warning
                    }
                    writeRequires {
                        scope
                        reason
                    }
                }
            }
        }
    `)
    const scopeObjects: ScopeObject[] = allPostHogScopeObject.nodes
    const groups = useMemo(() => [...new Set(scopeObjects.map((scopeObject) => scopeObject.group))], [scopeObjects])

    const [search, setSearch] = useState('')
    const [group, setGroup] = useState<string | null>(null)
    const [access, setAccess] = useState<AccessFilter>('all')

    if (scopeObjects.length === 0) {
        return (
            <p>
                The scope list couldn't load when this page was built. See <code>scopes_supported</code> in the{' '}
                <Link to="https://oauth.posthog.com/.well-known/oauth-authorization-server">
                    authorization server metadata
                </Link>{' '}
                for the scopes OAuth apps can request.
            </p>
        )
    }

    const visible = scopeObjects.filter(
        (scopeObject) =>
            (!group || scopeObject.group === group) &&
            matchesAccess(scopeObject, access) &&
            matchesSearch(scopeObject, search)
    )
    const visibleGroups = groups.filter((label) => visible.some((scopeObject) => scopeObject.group === label))

    return (
        <>
            <div className="flex flex-wrap gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Search scopes..."
                    aria-label="Search scopes"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="px-3 py-1.5 border border-primary rounded bg-primary text-primary placeholder:text-muted flex-1 min-w-[200px]"
                />
                <Select
                    groups={[
                        {
                            label: null,
                            items: [
                                { value: 'all', label: 'All product areas' },
                                ...groups.map((label) => ({ value: label, label })),
                            ],
                        },
                    ]}
                    placeholder="Product area"
                    ariaLabel="Filter by product area"
                    value={group || 'all'}
                    onValueChange={(value) => setGroup(value === 'all' ? null : value)}
                    dataScheme="primary"
                />
                <Select
                    groups={[{ label: null, items: ACCESS_FILTERS }]}
                    placeholder="Access"
                    ariaLabel="Filter by who can grant the scope"
                    value={access}
                    onValueChange={(value) => setAccess(value as AccessFilter)}
                    dataScheme="primary"
                />
            </div>

            {visibleGroups.length === 0 ? (
                <p>No scopes match these filters.</p>
            ) : (
                visibleGroups.map((label) => (
                    <div key={label} className="mb-8">
                        <h3>{label}</h3>
                        <OSTable
                            columns={columns}
                            rows={visible.filter((scopeObject) => scopeObject.group === label).map(toRow)}
                            editable={false}
                            rowAlignment="top"
                        />
                    </div>
                ))
            )}
        </>
    )
}
