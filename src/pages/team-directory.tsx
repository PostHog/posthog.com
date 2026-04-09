import React, { useCallback, useMemo, useRef, useState } from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import OSTable from 'components/OSTable'
import OSButton from 'components/OSButton'
import { useTeamMembers, TeamMember } from 'hooks/useTeamMembers'
import { IconSpinner, IconPencil, IconDownload } from '@posthog/icons'
import Tooltip from 'components/RadixUI/Tooltip'
import { useUser } from 'hooks/useUser'

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
    { name: 'T-shirt fit', width: 'minmax(82px,auto)', align: 'left' as const },
    { name: 'T-shirt size', width: 'minmax(92px,auto)', align: 'left' as const },
    { name: 'T-shirt info', width: 'minmax(120px,auto)', align: 'left' as const },
    { name: 'Start date', width: 'minmax(120px,auto)', align: 'left' as const },
]

// Also defined in src/pages/community/profiles/[id].tsx — update both if changed
const unisexSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL']
const femaleSizes = ['S', 'M', 'L', 'XL', '2XL', '3XL']
const allSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']

const baseInputClass =
    'w-full bg-transparent border rounded px-1 py-0.5 text-sm text-primary outline-none focus:border-yellow transition-colors duration-300'

function useSaveFlash() {
    const [saved, setSaved] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>()

    const flash = useCallback(() => {
        setSaved(true)
        clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setSaved(false), 1500)
    }, [])

    const borderClass = saved ? 'border-green' : 'border-primary'

    return { flash, borderClass }
}

function EditableTShirtFitCell({
    member,
    updateProfile,
}: {
    member: TeamMember
    updateProfile: (id: number, updates: Partial<TeamMember>) => Promise<boolean>
}) {
    const { flash, borderClass } = useSaveFlash()

    return (
        <select
            className={`${baseInputClass} ${borderClass} cursor-pointer`}
            value={member.tShirtFit || ''}
            onChange={async (e) => {
                const fit = e.target.value || null
                const newSizes = fit === 'female' ? femaleSizes : unisexSizes
                const size = member.tShirtSize && newSizes.includes(member.tShirtSize) ? member.tShirtSize : null
                const ok = await updateProfile(member.id, { tShirtFit: fit, tShirtSize: size })
                if (ok) flash()
            }}
        >
            <option value="">—</option>
            <option value="unisex">Unisex</option>
            <option value="female">Female</option>
        </select>
    )
}

function EditableTShirtSizeCell({
    member,
    updateProfile,
}: {
    member: TeamMember
    updateProfile: (id: number, updates: Partial<TeamMember>) => Promise<boolean>
}) {
    const sizes = member.tShirtFit === 'female' ? femaleSizes : member.tShirtFit === 'unisex' ? unisexSizes : allSizes
    const { flash, borderClass } = useSaveFlash()

    return (
        <select
            className={`${baseInputClass} ${borderClass} cursor-pointer`}
            value={member.tShirtSize || ''}
            onChange={async (e) => {
                const ok = await updateProfile(member.id, { tShirtSize: e.target.value || null })
                if (ok) flash()
            }}
        >
            <option value="">—</option>
            {sizes.map((s) => (
                <option key={s} value={s}>
                    {s}
                </option>
            ))}
        </select>
    )
}

function EditableTextCell({ value, onSave }: { value: string | null; onSave: (newValue: string) => Promise<boolean> }) {
    const [editValue, setEditValue] = useState(value || '')
    const { flash, borderClass } = useSaveFlash()

    const handleSave = async () => {
        const trimmed = editValue.trim()
        if (trimmed !== (value || '')) {
            const ok = await onSave(trimmed)
            if (ok) flash()
        }
    }

    return (
        <input
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
            className={`${baseInputClass} ${borderClass}`}
        />
    )
}

function memberToRow(
    member: TeamMember,
    index: number,
    isEditing: boolean,
    updateProfile: (id: number, updates: Partial<TeamMember>) => Promise<boolean>
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
                    <EditableTextCell
                        value={member.location}
                        onSave={async (val) => updateProfile(member.id, { location: val })}
                    />
                ) : (
                    member.location || '—'
                ),
                className: 'text-sm',
            },
            { content: member.country || '—', className: 'text-sm' },
            { content: member.teams.map((t) => `${t} Team`).join(', ') || '—', className: 'text-sm' },
            { content: member.leadsTeams.map((t) => `${t} Team`).join(', ') || '—', className: 'text-sm' },
            { content: member.pineappleOnPizza === true ? 'Yes' : member.pineappleOnPizza === false ? 'No' : '—' },
            {
                content: isEditing ? (
                    <EditableTShirtFitCell member={member} updateProfile={updateProfile} />
                ) : (
                    member.tShirtFit || '—'
                ),
                className: 'text-sm',
            },
            {
                content: isEditing ? (
                    <EditableTShirtSizeCell member={member} updateProfile={updateProfile} />
                ) : (
                    member.tShirtSize || '—'
                ),
                className: 'text-sm',
            },
            {
                content: isEditing ? (
                    <EditableTextCell
                        value={member.tShirtAdditionalInfo}
                        onSave={async (val) => updateProfile(member.id, { tShirtAdditionalInfo: val })}
                    />
                ) : (
                    member.tShirtAdditionalInfo || '—'
                ),
                className: 'text-sm',
            },
            { content: member.startDate || '—', className: 'text-sm' },
        ],
    }
}

export default function Team(): JSX.Element {
    const { isModerator } = useUser()
    const { teamMembers, futureJoiners, loading, updateProfile } = useTeamMembers()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [activeFilters, setActiveFilters] = useState<Record<
        string,
        { value: any; filter: (obj: any, value: any) => boolean }
    > | null>(null)
    const [isEditing, setIsEditing] = useState(false)

    const allTeamNames = useMemo(() => Array.from(new Set(teamMembers.flatMap((m) => m.teams))).sort(), [teamMembers])

    const allCountries = useMemo(
        () => Array.from(new Set(teamMembers.map((m) => m.country).filter(Boolean) as string[])).sort(),
        [teamMembers]
    )

    const sizeCounts = useMemo(() => {
        const all = [...teamMembers, ...futureJoiners]
        const unisex: Record<string, number> = {}
        const female: Record<string, number> = {}
        for (const m of all) {
            if (m.tShirtFit === 'unisex' && m.tShirtSize) {
                unisex[m.tShirtSize] = (unisex[m.tShirtSize] || 0) + 1
            } else if (m.tShirtFit === 'female' && m.tShirtSize) {
                female[m.tShirtSize] = (female[m.tShirtSize] || 0) + 1
            }
        }
        return { unisex, female }
    }, [teamMembers, futureJoiners])

    const applyFilters = (data: TeamMember[]) => {
        if (!activeFilters) return data
        return data.filter((obj) =>
            Object.values(activeFilters).every(({ value, filter }) => value === null || filter(obj, value))
        )
    }
    const displayMembers = applyFilters(teamMembers)
    const displayFutureJoiners = applyFilters(futureJoiners)

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
            'T-shirt fit',
            'T-shirt size',
            'T-shirt info',
            'Start date',
            'Avatar URL',
            'Color',
        ]
        const escape = (val: string) => (val.includes(',') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val)
        const rows = [...displayMembers, ...displayFutureJoiners].map((m) => [
            m.firstName || '',
            m.lastName || '',
            m.companyRole || '',
            m.location || '',
            m.country || '',
            m.teams.map((t) => `${t} Team`).join(', '),
            m.leadsTeams.map((t) => `${t} Team`).join(', '),
            m.pineappleOnPizza === true ? 'Yes' : m.pineappleOnPizza === false ? 'No' : '',
            m.tShirtFit || '',
            m.tShirtSize || '',
            m.tShirtAdditionalInfo || '',
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
                    isModerator ? (
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
                    ) : null
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
                    {
                        label: 't-shirt fit',
                        options: [
                            { label: 'Any', value: null },
                            { label: 'Unisex', value: 'unisex' },
                            { label: 'Female', value: 'female' },
                        ],
                        filter: (obj: TeamMember, value: string) => obj.tShirtFit === value,
                        operator: 'equals',
                    },
                    {
                        label: 't-shirt size',
                        options: [{ label: 'Any', value: null }, ...allSizes.map((s) => ({ label: s, value: s }))],
                        filter: (obj: TeamMember, value: string) => obj.tShirtSize === value,
                        operator: 'equals',
                    },
                ]}
                handleFilterChange={(filters) => setActiveFilters(filters as typeof activeFilters)}
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
                                memberToRow(member, index, isEditing, updateProfile)
                            )}
                        />
                        {displayFutureJoiners.length > 0 && (
                            <>
                                <h3 className="mt-6 mb-2 text-base font-semibold">Future joiners</h3>
                                <p className="!mt-0 mb-2 text-sm text-muted">
                                    {displayFutureJoiners.length} upcoming joiner
                                    {displayFutureJoiners.length !== 1 ? 's' : ''} with a start date in the future
                                </p>
                                <OSTable
                                    columns={columns}
                                    size="sm"
                                    rows={displayFutureJoiners.map((member, index) =>
                                        memberToRow(member, index, isEditing, updateProfile)
                                    )}
                                />
                            </>
                        )}
                        <div className="flex flex-wrap gap-8 mt-6">
                            {unisexSizes.some((s) => sizeCounts.unisex[s]) && (
                                <div>
                                    <h3 className="mb-2 text-base font-semibold">Unisex</h3>
                                    <OSTable
                                        columns={[
                                            { name: 'Size', width: '80px', align: 'left' as const },
                                            { name: 'Count', width: '80px', align: 'right' as const },
                                        ]}
                                        size="sm"
                                        rows={[
                                            ...unisexSizes
                                                .filter((s) => sizeCounts.unisex[s])
                                                .map((s) => ({
                                                    key: s,
                                                    cells: [
                                                        { content: s, className: 'text-sm font-medium' },
                                                        { content: sizeCounts.unisex[s], className: 'text-sm' },
                                                    ],
                                                })),
                                            {
                                                key: 'total',
                                                cells: [
                                                    { content: 'Total', className: 'text-sm font-bold' },
                                                    {
                                                        content: Object.values(sizeCounts.unisex).reduce(
                                                            (a, b) => a + b,
                                                            0
                                                        ),
                                                        className: 'text-sm font-bold',
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
                                </div>
                            )}
                            {femaleSizes.some((s) => sizeCounts.female[s]) && (
                                <div>
                                    <h3 className="mb-2 text-base font-semibold">Women's</h3>
                                    <OSTable
                                        columns={[
                                            { name: 'Size', width: '80px', align: 'left' as const },
                                            { name: 'Count', width: '80px', align: 'right' as const },
                                        ]}
                                        size="sm"
                                        rows={[
                                            ...femaleSizes
                                                .filter((s) => sizeCounts.female[s])
                                                .map((s) => ({
                                                    key: s,
                                                    cells: [
                                                        { content: s, className: 'text-sm font-medium' },
                                                        { content: sizeCounts.female[s], className: 'text-sm' },
                                                    ],
                                                })),
                                            {
                                                key: 'total',
                                                cells: [
                                                    { content: 'Total', className: 'text-sm font-bold' },
                                                    {
                                                        content: Object.values(sizeCounts.female).reduce(
                                                            (a, b) => a + b,
                                                            0
                                                        ),
                                                        className: 'text-sm font-bold',
                                                    },
                                                ],
                                            },
                                        ]}
                                    />
                                </div>
                            )}
                        </div>
                    </>
                )}
            </Editor>
        </>
    )
}
