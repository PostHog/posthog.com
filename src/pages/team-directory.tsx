import React, { useMemo, useRef, useState } from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import OSTable from 'components/OSTable'
import OSButton from 'components/OSButton'
import { useTeamMembers, TeamMember } from 'hooks/useTeamMembers'
import { IconSpinner, IconPencil, IconDownload } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'

const columns = [
    { name: '#', width: 'auto', align: 'center' as const },
    { name: '', width: '36px', align: 'center' as const },
    { name: 'First name', width: 'minmax(100px,1fr)', align: 'left' as const },
    { name: 'Last name', width: 'minmax(100px,1fr)', align: 'left' as const },
    { name: 'Role', width: 'minmax(180px,1fr)', align: 'left' as const },
    { name: 'Location', width: 'minmax(150px,1fr)', align: 'left' as const },
    { name: 'Country', width: 'minmax(80px,auto)', align: 'left' as const },
    { name: 'Teams', width: 'minmax(200px,1fr)', align: 'left' as const },
    { name: 'Team lead', width: 'minmax(100px,auto)', align: 'left' as const },
    { name: 'Pineapple?', width: 'auto', align: 'center' as const },
    { name: 'Start date', width: 'minmax(120px,auto)', align: 'left' as const },
]

function EditableLocationCell({ value, onSave }: { value: string | null; onSave: (newValue: string) => void }) {
    const [editValue, setEditValue] = useState(value || '')
    const inputRef = useRef<HTMLInputElement>(null)

    const handleSave = () => {
        const trimmed = editValue.trim()
        if (trimmed !== (value || '')) {
            onSave(trimmed)
        }
    }

    return (
        <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    e.currentTarget.blur()
                } else if (e.key === 'Escape') {
                    setEditValue(value || '')
                    e.currentTarget.blur()
                }
            }}
            className="w-full bg-transparent border border-primary rounded px-1 py-0.5 text-sm text-primary outline-none focus:border-yellow"
        />
    )
}

function memberToRow(
    member: TeamMember,
    index: number,
    isEditing: boolean,
    updateLocation: (id: number, location: string) => void
) {
    return {
        key: String(member.id),
        cells: [
            { content: index + 1 },
            {
                content: member.avatarUrl ? (
                    <img src={member.avatarUrl} alt="" className="size-6 object-contain" />
                ) : null,
                className: `!p-1 ${member.color ? `bg-${member.color}` : ''}`,
            },
            { content: member.firstName || '—', className: 'text-sm' },
            { content: member.lastName || '—', className: 'text-sm' },
            { content: member.companyRole || '—', className: 'text-sm' },
            {
                content: isEditing ? (
                    <EditableLocationCell value={member.location} onSave={(val) => updateLocation(member.id, val)} />
                ) : (
                    member.location || '—'
                ),
                className: 'text-sm',
            },
            { content: member.country || '—', className: 'text-sm' },
            { content: member.teams.map((t) => `${t} Team`).join(', ') || '—', className: 'text-sm' },
            { content: member.leadsTeams.map((t) => `${t} Team`).join(', ') || '—', className: 'text-sm' },
            { content: member.pineappleOnPizza === true ? 'Yes' : member.pineappleOnPizza === false ? 'No' : '—' },
            { content: member.startDate || '—', className: 'text-sm' },
        ],
    }
}

export default function Team(): JSX.Element {
    const { teamMembers, loading, updateLocation } = useTeamMembers()
    const [filteredMembers, setFilteredMembers] = useState<TeamMember[] | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    const allTeamNames = useMemo(() => Array.from(new Set(teamMembers.flatMap((m) => m.teams))).sort(), [teamMembers])

    const allCountries = useMemo(
        () => Array.from(new Set(teamMembers.map((m) => m.country).filter(Boolean) as string[])).sort(),
        [teamMembers]
    )

    const displayMembers = filteredMembers ?? teamMembers

    const handleDownloadCSV = () => {
        const headers = [
            'First name',
            'Last name',
            'Role',
            'Location',
            'Country',
            'Teams',
            'Team lead',
            'Pineapple?',
            'Start date',
            'Avatar URL',
            'Color',
        ]
        const escape = (val: string) => (val.includes(',') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val)
        const rows = displayMembers.map((m) => [
            m.firstName || '',
            m.lastName || '',
            m.companyRole || '',
            m.location || '',
            m.country || '',
            m.teams.map((t) => `${t} Team`).join(', '),
            m.leadsTeams.map((t) => `${t} Team`).join(', '),
            m.pineappleOnPizza === true ? 'Yes' : m.pineappleOnPizza === false ? 'No' : '',
            m.startDate || '',
            m.avatarUrl || '',
            m.color || '',
        ])
        const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n')
        const blob = new Blob([csv], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'team-directory.csv'
        a.click()
        URL.revokeObjectURL(url)
    }

    return (
        <>
            <SEO title="Team directory – PostHog" description="" />
            <Editor
                showFilters
                maxWidth="100%"
                title="team-directory"
                type="mdx"
                slug="/team-directory"
                bookmark={{
                    title: 'Team',
                    description: 'Internal team directory',
                }}
                extraMenuOptions={
                    <>
                        <Tooltip
                            trigger={<OSButton size="md" icon={<IconDownload />} onClick={handleDownloadCSV} />}
                            delay={0}
                        >
                            Download CSV
                        </Tooltip>
                        <OSButton
                            size="md"
                            active={isEditing}
                            icon={<IconPencil />}
                            onClick={() => setIsEditing(!isEditing)}
                        />
                    </>
                }
                availableFilters={[
                    {
                        label: 'team',
                        options: [
                            { label: 'Any', value: null },
                            ...allTeamNames.map((name) => ({ label: name, value: name })),
                        ],
                        filter: (obj: TeamMember, value: string) => obj.teams.includes(value),
                        operator: 'includes',
                    },
                    {
                        label: 'country',
                        options: [{ label: 'Any', value: null }, ...allCountries.map((c) => ({ label: c, value: c }))],
                        filter: (obj: TeamMember, value: string) => obj.country === value,
                        operator: 'equals',
                    },
                    {
                        label: 'pineapple on pizza',
                        options: [
                            { label: 'Any', value: null },
                            { label: 'TRUE', value: true },
                            { label: 'FALSE', value: false },
                        ],
                        filter: (obj: TeamMember, value: boolean) => obj.pineappleOnPizza === value,
                        operator: 'equals',
                    },
                    {
                        label: 'leads team',
                        options: [
                            { label: 'Any', value: null },
                            { label: 'TRUE', value: true },
                            { label: 'FALSE', value: false },
                        ],
                        filter: (obj: TeamMember, value: boolean) =>
                            value ? obj.leadsTeams.length > 0 : obj.leadsTeams.length === 0,
                        operator: 'equals',
                    },
                ]}
                dataToFilter={teamMembers}
                onFilterChange={(data: TeamMember[]) => setFilteredMembers(data)}
            >
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <IconSpinner className="size-8 animate-spin opacity-50" />
                    </div>
                ) : teamMembers.length === 0 ? (
                    <p className="text-muted">No team members found. Make sure you're logged in as a moderator.</p>
                ) : (
                    <>
                        <p className="!mt-0 mb-2 text-sm text-muted">
                            {displayMembers.length} team member{displayMembers.length !== 1 ? 's' : ''}
                            {' · '}
                            Data is loaded at build time. Edits save to Strapi but won't appear here until the next
                            build.
                        </p>
                        <OSTable
                            columns={columns}
                            size="sm"
                            rows={displayMembers.map((member, index) =>
                                memberToRow(member, index, isEditing, updateLocation)
                            )}
                        />
                    </>
                )}
            </Editor>
        </>
    )
}
