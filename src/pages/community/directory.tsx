import React, { useCallback, useMemo, useState } from 'react'
import SEO from 'components/seo'
import Editor from 'components/Editor'
import OSTable from 'components/OSTable'
import Link from 'components/Link'
import { IconChevronDown, IconDownload, IconSpinner } from '@posthog/icons'
import { useUser } from 'hooks/useUser'
import { useCommunityProfiles, CommunityProfilesFilters, fetchAllCommunityProfiles } from 'hooks/useCommunityProfiles'
import getLevel, { LEVELS } from 'components/Squeak/util/getLevel'
import LevelBadge from 'components/Squeak/components/LevelBadge'
import { TreeMenu } from 'components/TreeMenu'
import { internalToolsNav } from '../../navs/internalTools'
import ReaderView from 'components/ReaderView'
import OSButton from 'components/OSButton'
import { useApp } from '../../context/App'
import { Select } from 'components/RadixUI/Select'
import Tooltip from 'components/RadixUI/Tooltip'
import dayjs from 'dayjs'

type SortField = 'firstName' | 'user.email' | 'createdAt' | 'reputation'
type SortDir = 'asc' | 'desc'

const SORTABLE_COLUMNS: { label: string; field: SortField; width: string; defaultDir: SortDir }[] = [
    { label: 'Name', field: 'firstName', width: 'minmax(160px,1.2fr)', defaultDir: 'asc' },
    { label: 'Email', field: 'user.email', width: 'minmax(180px,1.4fr)', defaultDir: 'asc' },
    { label: 'Joined', field: 'createdAt', width: 'minmax(140px,1fr)', defaultDir: 'desc' },
    { label: 'Reputation', field: 'reputation', width: 'minmax(140px,auto)', defaultDir: 'desc' },
]

function SortableHeader({
    label,
    field,
    sortField,
    sortDir,
    onSort,
}: {
    label: string
    field: SortField
    sortField: SortField
    sortDir: SortDir
    onSort: (field: SortField) => void
}) {
    const isSorted = sortField === field
    return (
        <button
            type="button"
            onClick={() => onSort(field)}
            className="inline-flex items-center gap-0 font-bold text-sm text-primary select-none"
        >
            {label}
            <IconChevronDown
                className={`size-5 transition-transform ${isSorted && sortDir === 'asc' ? 'rotate-180' : ''} ${
                    isSorted ? 'opacity-100' : 'opacity-40'
                }`}
            />
        </button>
    )
}

function AccessDenied({ user }: { user: unknown }) {
    const { openSignIn } = useApp()

    return (
        <>
            <SEO title="Community directory – PostHog" description="Moderator community profile directory" />
            <ReaderView
                title="Community directory"
                leftSidebar={<TreeMenu items={internalToolsNav} />}
                showQuestions={false}
            >
                <div className="@container text-primary">
                    <div className="bg-accent p-4 rounded border border-primary mt-4">
                        <p className="mt-0 font-semibold">Access denied</p>
                        <p className="mb-4 text-muted">
                            {user
                                ? 'This page is only available to logged-in moderators.'
                                : 'Sign in to the community with a moderator account to continue.'}
                        </p>
                        {!user && (
                            <OSButton variant="primary" size="md" onClick={() => openSignIn()}>
                                Sign in to the community
                            </OSButton>
                        )}
                    </div>
                </div>
            </ReaderView>
        </>
    )
}

function downloadProfilesCSV(profiles: Awaited<ReturnType<typeof fetchAllCommunityProfiles>>) {
    const headers = ['First name', 'Last name', 'Email', 'Joined', 'Reputation', 'Level', 'Profile URL']
    const escape = (val: string) => (val.includes(',') || val.includes('"') ? `"${val.replace(/"/g, '""')}"` : val)
    const rows = profiles.map((profile) => [
        profile.firstName || '',
        profile.lastName || '',
        profile.email || '',
        profile.createdAt ? dayjs(profile.createdAt).format('YYYY-MM-DD') : '',
        profile.reputation != null ? String(profile.reputation) : '',
        getLevel(profile.reputation ?? undefined)?.label || '',
        `https://posthog.com/community/profiles/${profile.id}`,
    ])
    const csv = [headers, ...rows].map((row) => row.map(escape).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'community-directory.csv'
    a.click()
    URL.revokeObjectURL(url)
}

export default function CommunityDirectory(): JSX.Element {
    const { user, isModerator, isValidating: userValidating, getJwt } = useUser()
    const [search, setSearch] = useState('')
    const [minReputation, setMinReputation] = useState<number | null>(10)
    const [teamMember, setTeamMember] = useState<'any' | 'yes' | 'no'>('no')
    const [sortField, setSortField] = useState<SortField>('reputation')
    const [sortDir, setSortDir] = useState<SortDir>('desc')
    const [exporting, setExporting] = useState(false)

    const handleSort = useCallback(
        (field: SortField) => {
            if (field === sortField) {
                setSortDir((dir) => (dir === 'asc' ? 'desc' : 'asc'))
                return
            }
            const column = SORTABLE_COLUMNS.find((col) => col.field === field)
            setSortField(field)
            setSortDir(column?.defaultDir ?? 'asc')
        },
        [sortField]
    )

    const columns = useMemo(
        () => [
            { name: '#', width: 'auto', align: 'center' as const },
            { name: '', width: '36px', align: 'center' as const },
            ...SORTABLE_COLUMNS.map((col) => ({
                name: (
                    <SortableHeader
                        label={col.label}
                        field={col.field}
                        sortField={sortField}
                        sortDir={sortDir}
                        onSort={handleSort}
                    />
                ),
                width: col.width,
                align: 'left' as const,
            })),
        ],
        [sortField, sortDir, handleSort]
    )

    const filters: CommunityProfilesFilters = useMemo(
        () => ({
            minReputation,
            search,
            teamMember,
            sort: `${sortField}:${sortDir}`,
        }),
        [minReputation, search, teamMember, sortField, sortDir]
    )

    const {
        profiles,
        isLoading,
        isValidating,
        error,
        total,
        currentPage,
        totalPages,
        pageSize,
        nextPage,
        prevPage,
        goToPage,
        hasNextPage,
        hasPrevPage,
    } = useCommunityProfiles({
        filters,
        enabled: !!isModerator,
    })

    const handleDownloadCSV = useCallback(async () => {
        if (exporting || total === 0) return
        setExporting(true)
        try {
            const allProfiles = await fetchAllCommunityProfiles(filters, getJwt)
            downloadProfilesCSV(allProfiles)
        } catch (err) {
            console.error(err)
        } finally {
            setExporting(false)
        }
    }, [exporting, total, filters, getJwt])

    if (userValidating) {
        return (
            <>
                <SEO title="Community directory – PostHog" description="Moderator community profile directory" />
                <Editor title="Community directory" slug="/community/directory" maxWidth="100%">
                    <div className="flex items-center justify-center py-12">
                        <IconSpinner className="size-8 animate-spin opacity-50" />
                    </div>
                </Editor>
            </>
        )
    }

    if (!user || !isModerator) {
        return <AccessDenied user={user} />
    }

    const reputationOptions = [
        { label: 'Any', value: 'any' },
        ...LEVELS.map(({ threshold, label }) => ({
            label: `${label}+ (${threshold})`,
            value: String(threshold),
        })),
    ]

    return (
        <>
            <SEO title="Community directory – PostHog" description="Moderator community profile directory" />
            <Editor
                maxWidth="100%"
                title="Community directory"
                slug="/community/directory"
                bookmark={{
                    title: 'Community directory',
                    description: 'Browse community profiles by reputation',
                }}
                onSearchChange={setSearch}
            >
                {error ? (
                    <p className="text-red">Failed to load profiles. Try refreshing.</p>
                ) : isLoading && profiles.length === 0 ? (
                    <div className="flex items-center justify-center py-12">
                        <IconSpinner className="size-8 animate-spin opacity-50" />
                    </div>
                ) : (
                    <>
                        <div className="!mt-0 mb-2 flex flex-wrap items-end justify-between gap-2">
                            <p className="m-0 text-sm text-muted">
                                {total.toLocaleString()} profile{total !== 1 ? 's' : ''} match
                                {isValidating ? ' · updating…' : ''}
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                                <Select
                                    prefix="Min reputation"
                                    value={minReputation == null ? 'any' : String(minReputation)}
                                    groups={[{ label: '', items: reputationOptions }]}
                                    onValueChange={(value) => {
                                        if (value === 'any') {
                                            setMinReputation(null)
                                            return
                                        }
                                        const parsed = Number(value)
                                        setMinReputation(Number.isFinite(parsed) ? parsed : null)
                                    }}
                                />
                                <Select
                                    prefix="Team member"
                                    value={teamMember}
                                    groups={[
                                        {
                                            label: '',
                                            items: [
                                                { label: 'Any', value: 'any' },
                                                { label: 'Yes', value: 'yes' },
                                                { label: 'No', value: 'no' },
                                            ],
                                        },
                                    ]}
                                    onValueChange={(value) => {
                                        if (value === 'yes' || value === 'no' || value === 'any') {
                                            setTeamMember(value)
                                        }
                                    }}
                                />
                                <Tooltip
                                    trigger={
                                        <OSButton
                                            size="md"
                                            icon={
                                                exporting ? <IconSpinner className="animate-spin" /> : <IconDownload />
                                            }
                                            onClick={handleDownloadCSV}
                                            disabled={exporting || total === 0}
                                        />
                                    }
                                    delay={0}
                                >
                                    {exporting ? 'Exporting…' : 'Download CSV'}
                                </Tooltip>
                            </div>
                        </div>
                        <OSTable
                            columns={columns}
                            size="sm"
                            width="full"
                            loading={isValidating && profiles.length === 0}
                            pagination={
                                totalPages > 1
                                    ? {
                                          totalPages,
                                          currentPage,
                                          nextPage,
                                          prevPage,
                                          goToPage,
                                          hasNextPage,
                                          hasPrevPage,
                                      }
                                    : undefined
                            }
                            rows={profiles.map((profile, index) => {
                                const name = [profile.firstName, profile.lastName].filter(Boolean).join(' ') || '—'
                                const rowNumber = currentPage * pageSize + index + 1
                                return {
                                    key: String(profile.id),
                                    cells: [
                                        { content: rowNumber },
                                        {
                                            content: profile.avatarUrl ? (
                                                <img src={profile.avatarUrl} alt="" className="size-6 object-contain" />
                                            ) : null,
                                            className: `!p-1 ${profile.color ? `bg-${profile.color}` : ''}`,
                                        },
                                        {
                                            content: (
                                                <Link
                                                    to={`/community/profiles/${profile.id}`}
                                                    state={{ newWindow: true }}
                                                    className="font-semibold"
                                                >
                                                    {name}
                                                </Link>
                                            ),
                                            className: 'text-sm',
                                        },
                                        {
                                            content: profile.email ? (
                                                <a href={`mailto:${profile.email}`} className="text-sm">
                                                    {profile.email}
                                                </a>
                                            ) : (
                                                '—'
                                            ),
                                            className: 'text-sm',
                                        },
                                        {
                                            content: profile.createdAt
                                                ? dayjs(profile.createdAt).format('MMM D, YYYY')
                                                : '—',
                                            className: 'text-sm',
                                        },
                                        {
                                            content:
                                                profile.reputation != null ? (
                                                    <LevelBadge points={profile.reputation} tooltip={false} />
                                                ) : (
                                                    '—'
                                                ),
                                        },
                                    ],
                                }
                            })}
                        />
                        {profiles.length === 0 && <p className="text-muted mt-4">No profiles match these filters.</p>}
                    </>
                )}
            </Editor>
        </>
    )
}
