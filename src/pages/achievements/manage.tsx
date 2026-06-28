import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'components/Link'
import SEO from 'components/seo'
import ScrollArea from 'components/RadixUI/ScrollArea'
import OSButton from 'components/OSButton'
import { OSInput, OSTextarea, OSSelect } from 'components/OSForm'
import { Fieldset } from 'components/OSFieldset'
import { useUser } from 'hooks/useUser'
import { useToast } from '../../context/Toast'
import CloudinaryImage from 'components/CloudinaryImage'
import uploadImage from 'components/Squeak/util/uploadImage'
import qs from 'qs'
import {
    IconUpload,
    IconPlus,
    IconSpinner,
    IconPencil,
    IconBadge,
    IconPeople,
    IconLock,
    IconWarning,
} from '@posthog/icons'

type CloudinaryURL = `https://res.cloudinary.com/${string}`

interface Achievement {
    id: number
    attributes: {
        title: string
        description: string
        points: number
        publishedAt: string | null
        icon?: {
            data?: {
                id: number
                attributes: { url: CloudinaryURL }
            }
        }
        achievement_group?: {
            data?: {
                id: number
                attributes: { Title: string }
            }
        }
    }
}

interface AchievementGroup {
    id: number
    attributes: {
        Title: string
        description: string
        tiered: boolean
    }
}

interface AssignResult {
    email: string
    status: 'success' | 'error'
    reason?: string
    profileId?: number
    name?: string
    avatar?: string
}

type Tab = 'create' | 'assign'

const SQUEAK_API = process.env.GATSBY_SQUEAK_API_HOST

async function fetchAchievements(jwt: string): Promise<Achievement[]> {
    const query = qs.stringify({
        populate: ['icon', 'achievement_group'],
        publicationState: 'preview',
        pagination: { pageSize: 100 },
    })
    const res = await fetch(`${SQUEAK_API}/api/achievements?${query}`, {
        headers: { Authorization: `Bearer ${jwt}` },
    })
    if (!res.ok) throw new Error('Failed to fetch achievements')
    const data = await res.json()
    return data.data ?? []
}

async function fetchAchievementGroups(jwt: string): Promise<AchievementGroup[]> {
    const query = qs.stringify({
        pagination: { pageSize: 100 },
    })
    const res = await fetch(`${SQUEAK_API}/api/achievement-groups?${query}`, {
        headers: { Authorization: `Bearer ${jwt}` },
    })
    if (!res.ok) throw new Error('Failed to fetch achievement groups')
    const data = await res.json()
    return data.data ?? []
}

function IconPreview({ src }: { src: string }) {
    if (src.startsWith('https://res.cloudinary.com')) {
        return <CloudinaryImage width={48} height={48} src={src as CloudinaryURL} />
    }
    return <img src={src} width={48} height={48} alt="Icon preview" className="rounded" />
}

function AchievementForm({
    jwt,
    achievements,
    groups,
    onSaved,
}: {
    jwt: string
    achievements: Achievement[]
    groups: AchievementGroup[]
    onSaved: () => void
}) {
    const [selectedId, setSelectedId] = useState<number | 'new'>('new')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [points, setPoints] = useState<number | ''>(0)
    const [groupId, setGroupId] = useState<number | ''>('')
    const [iconPreview, setIconPreview] = useState<string | null>(null)
    const [iconFile, setIconFile] = useState<File | null>(null)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const { addToast } = useToast()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const resetForm = useCallback(() => {
        setTitle('')
        setDescription('')
        setPoints(0)
        setGroupId('')
        setIconPreview(null)
        setIconFile(null)
        setError(null)
    }, [])

    useEffect(() => {
        if (selectedId === 'new') {
            resetForm()
            return
        }
        const achievement = achievements.find((a) => a.id === selectedId)
        if (!achievement) return
        const attrs = achievement.attributes
        setTitle(attrs.title ?? '')
        setDescription(attrs.description ?? '')
        setPoints(attrs.points ?? 0)
        setGroupId(attrs.achievement_group?.data?.id ?? '')
        setIconPreview(attrs.icon?.data?.attributes?.url ?? null)
        setIconFile(null)
        setError(null)
    }, [selectedId, achievements, resetForm])

    function handleIconChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0]
        if (!file) return
        setIconFile(file)
        setIconPreview(URL.createObjectURL(file))
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)

        if (!title.trim()) {
            setError('Title is required')
            return
        }

        if (!description.trim()) {
            setError('Description is required')
            return
        }

        const isUpdate = selectedId !== 'new'
        if (!isUpdate && !iconFile && !iconPreview) {
            setError('Icon is required')
            return
        }

        setSaving(true)
        try {
            let iconId: number | undefined
            if (iconFile) {
                const uploaded = await uploadImage(iconFile, jwt)
                iconId = uploaded?.id
            }

            const payload: Record<string, unknown> = {
                title: title.trim(),
                description: description.trim(),
                points: Number(points) || 0,
                publishedAt: new Date().toISOString(),
            }
            if (groupId) {
                payload.achievement_group = groupId
            } else {
                payload.achievement_group = null
            }
            if (iconId) {
                payload.icon = iconId
            }

            const isUpdate = selectedId !== 'new'
            const url = isUpdate ? `${SQUEAK_API}/api/achievements/${selectedId}` : `${SQUEAK_API}/api/achievements`
            const res = await fetch(url, {
                method: isUpdate ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({ data: payload }),
            })

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}))
                throw new Error(errData?.error?.message || `Failed to ${isUpdate ? 'update' : 'create'} achievement`)
            }

            addToast({ description: isUpdate ? 'Achievement updated' : 'Achievement created' })
            onSaved()

            if (!isUpdate) {
                resetForm()
                setSelectedId('new')
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setSaving(false)
        }
    }

    const isUpdate = selectedId !== 'new'

    const selectOptions = [
        { label: 'Create new achievement', value: 'new' },
        ...achievements.map((a) => ({
            label: a.attributes.title,
            value: a.id,
            icon: a.attributes.icon?.data?.attributes?.url ? (
                <CloudinaryImage width={20} height={20} src={a.attributes.icon.data.attributes.url} />
            ) : undefined,
        })),
    ]

    const groupOptions = [
        { label: 'None (standalone)', value: '' },
        ...groups.map((g) => ({
            label: g.attributes.Title,
            value: g.id,
        })),
    ]

    return (
        <div className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-5">
                <OSSelect
                    label="Achievement"
                    description={`${achievements.length} achievement${achievements.length === 1 ? '' : 's'} available`}
                    options={selectOptions}
                    value={selectedId}
                    onChange={(val: number | 'new') => setSelectedId(val)}
                    direction="column"
                    searchable
                    searchPlaceholder="Search achievements..."
                />

                <Fieldset legend="Details">
                    <div className="space-y-4 pt-1">
                        <OSInput
                            label="Title"
                            direction="column"
                            width="full"
                            value={title}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                            placeholder="e.g. First question"
                            required
                        />

                        <OSTextarea
                            labelClassName="font-normal"
                            label="Description"
                            direction="column"
                            width="full"
                            rows={3}
                            value={description}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                            placeholder="How is this achievement earned?"
                            required
                        />

                        <div className="flex gap-4 @md:flex-row flex-col">
                            <div className="@md:w-40">
                                <OSInput
                                    label="Points"
                                    type="number"
                                    direction="column"
                                    width="full"
                                    value={String(points)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setPoints(e.target.value ? Number(e.target.value) : '')
                                    }
                                    min={0}
                                    max={5}
                                />
                            </div>

                            <div className="flex-1">
                                <OSSelect
                                    label="Achievement group"
                                    options={groupOptions}
                                    value={groupId}
                                    onChange={(val: number | '') => setGroupId(val)}
                                    direction="column"
                                    searchable={false}
                                />
                            </div>
                        </div>
                    </div>
                </Fieldset>

                <Fieldset legend="Appearance">
                    <div className="space-y-3 pt-1">
                        <div className="flex items-center gap-4">
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                className="shrink-0 size-16 rounded-md border-2 border-dashed border-primary hover:border-secondary cursor-pointer flex items-center justify-center transition-colors overflow-hidden"
                            >
                                {iconPreview ? (
                                    <IconPreview src={iconPreview} />
                                ) : (
                                    <IconUpload className="size-5 text-secondary" />
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold m-0">Achievement icon</p>
                                <p className="text-xs text-secondary m-0 mb-2">Square image, at least 64x64px</p>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleIconChange}
                                />
                                <OSButton
                                    type="button"
                                    size="sm"
                                    variant="secondary"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {iconPreview ? 'Replace icon' : 'Upload icon'}
                                </OSButton>
                            </div>
                        </div>
                    </div>
                </Fieldset>

                {error && (
                    <div className="flex items-center gap-2 rounded-md px-4 py-3 text-sm border border-red/30 bg-red/5 text-red">
                        <IconWarning className="size-4 shrink-0" />
                        {error}
                    </div>
                )}

                <OSButton type="submit" size="md" variant="primary" disabled={saving} width="full">
                    {saving ? (
                        <>
                            <IconSpinner className="size-4 mr-1 animate-spin" />
                            Saving...
                        </>
                    ) : isUpdate ? (
                        <>
                            <IconPencil className="size-4 mr-1" />
                            Update achievement
                        </>
                    ) : (
                        <>
                            <IconPlus className="size-4 mr-1" />
                            Create achievement
                        </>
                    )}
                </OSButton>
            </form>
        </div>
    )
}

function BulkAssignForm({ jwt, achievements }: { jwt: string; achievements: Achievement[] }) {
    const [selectedAchievementId, setSelectedAchievementId] = useState<number | ''>('')
    const [emailInput, setEmailInput] = useState('')
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [results, setResults] = useState<AssignResult[] | null>(null)

    const emailCount = useMemo(() => {
        if (!emailInput.trim()) return 0
        return new Set(
            emailInput
                .split(/[\n,]+/)
                .map((s) => s.trim().toLowerCase())
                .filter(Boolean)
        ).size
    }, [emailInput])

    const achievementOptions = achievements.map((a) => ({
        label: a.attributes.title,
        value: a.id,
        description: `${a.attributes.points ?? 0} points`,
        icon: a.attributes.icon?.data?.attributes?.url ? (
            <CloudinaryImage width={20} height={20} src={a.attributes.icon.data.attributes.url} />
        ) : undefined,
    }))

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setResults(null)

        if (!selectedAchievementId) {
            setError('Select an achievement to assign')
            return
        }

        const emails = emailInput
            .split(/[\n,]+/)
            .map((s) => s.trim().toLowerCase())
            .filter(Boolean)

        if (emails.length === 0) {
            setError('Enter at least one email address')
            return
        }

        const uniqueEmails = Array.from(new Set(emails))

        setSubmitting(true)
        try {
            const res = await fetch(`${SQUEAK_API}/api/achievements/bulk-assign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify({
                    data: {
                        achievementId: selectedAchievementId,
                        emails: uniqueEmails,
                    },
                }),
            })

            if (!res.ok) {
                const errData = await res.json().catch(() => ({}))
                throw new Error(errData?.error?.message || `Request failed (${res.status})`)
            }

            const data = await res.json()
            setResults(data.results ?? [])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setSubmitting(false)
        }
    }

    const successCount = results?.filter((r) => r.status === 'success').length ?? 0
    const errorCount = results?.filter((r) => r.status === 'error').length ?? 0

    return (
        <div className="space-y-5">
            <form onSubmit={handleSubmit} className="space-y-5">
                <Fieldset legend="Achievement">
                    <div className="space-y-3 pt-1">
                        <OSSelect
                            label="Achievement"
                            showLabel={false}
                            options={achievementOptions}
                            value={selectedAchievementId}
                            onChange={(val: number) => setSelectedAchievementId(val)}
                            direction="column"
                            placeholder="Select an achievement..."
                            searchable
                            searchPlaceholder="Search achievements..."
                        />
                    </div>
                </Fieldset>

                <Fieldset legend="Recipients">
                    <div className="space-y-2 pt-1">
                        <OSTextarea
                            label="Email addresses"
                            showLabel={false}
                            direction="column"
                            width="full"
                            rows={6}
                            placeholder={'alice@example.com\nbob@example.com\ncharlie@example.com'}
                            value={emailInput}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setEmailInput(e.target.value)}
                        />
                        {emailCount > 0 && (
                            <p className="text-xs text-secondary m-0">
                                <span className="font-bold text-primary">{emailCount}</span> unique email
                                {emailCount === 1 ? '' : 's'} - one per line or comma-separated
                            </p>
                        )}
                        {emailCount === 0 && (
                            <p className="text-xs text-secondary m-0">
                                Paste email addresses, one per line or comma-separated
                            </p>
                        )}
                    </div>
                </Fieldset>

                {error && (
                    <div className="flex items-center gap-2 rounded-md px-4 py-3 text-sm border border-red/30 bg-red/5 text-red">
                        <IconWarning className="size-4 shrink-0" />
                        {error}
                    </div>
                )}

                <OSButton type="submit" size="md" variant="primary" disabled={submitting} width="full">
                    {submitting ? (
                        <>
                            <IconSpinner className="size-4 mr-1 animate-spin" />
                            Assigning to {emailCount} member{emailCount === 1 ? '' : 's'}...
                        </>
                    ) : (
                        <>
                            <IconBadge className="size-4 mr-1" />
                            Assign achievement
                            {emailCount > 0 && ` to ${emailCount} member${emailCount === 1 ? '' : 's'}`}
                        </>
                    )}
                </OSButton>
            </form>

            {results && (
                <div className="space-y-4">
                    {successCount > 0 && (
                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-green">{successCount} assigned</span>
                            <div className="rounded-md border border-primary overflow-hidden">
                                {results
                                    .filter((r) => r.status === 'success')
                                    .map((r, i, arr) => {
                                        const content = (
                                            <>
                                                {r.avatar ? (
                                                    <img
                                                        src={r.avatar}
                                                        alt=""
                                                        className="shrink-0 size-6 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <svg
                                                        className="shrink-0 size-6 bg-accent rounded-full"
                                                        fill="none"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 40 40"
                                                    >
                                                        <path d="M0 0h40v40H0z" />
                                                        <path
                                                            fillRule="evenodd"
                                                            clipRule="evenodd"
                                                            d="M21.19 6.57c-5.384-.696-9.938 3.89-9.93 10.343.013.1.026.229.042.378.045.443.11 1.067.262 1.67.883 3.445 2.781 6.077 6.305 7.132 3.117.938 5.86.04 8.14-2.242 3.008-3.016 3.805-8.039 1.891-12.047-1.36-2.844-3.484-4.82-6.71-5.234ZM2.5 40c-.64-1.852 1.119-6.454 2.947-7.61 2.48-1.563 5.076-2.942 7.671-4.32.48-.255.96-.51 1.438-.766.313-.164.899.008 1.29.188 2.827 1.242 5.624 1.25 8.468.03.492-.21 1.242-.241 1.695-.015 2.688 1.367 5.352 2.774 7.961 4.281 2.352 1.36 4.35 6.056 3.53 8.212h-35Z"
                                                            fill="#fff"
                                                        />
                                                    </svg>
                                                )}
                                                <div className="flex-1 min-w-0">
                                                    {r.name ? (
                                                        <span className="text-[13px] font-medium truncate block">
                                                            {r.name}
                                                        </span>
                                                    ) : (
                                                        <span className="text-[13px] truncate block">{r.email}</span>
                                                    )}
                                                    {r.name && (
                                                        <span className="text-xs text-secondary truncate block">
                                                            {r.email}
                                                        </span>
                                                    )}
                                                </div>
                                            </>
                                        )

                                        const className = `flex items-center gap-3 px-3 py-2.5 ${
                                            i !== arr.length - 1 ? 'border-b border-primary' : ''
                                        }`

                                        return r.profileId ? (
                                            <Link
                                                key={r.email}
                                                to={`/community/profiles/${r.profileId}`}
                                                className={`${className} hover:bg-accent/50 transition-colors !text-primary no-underline`}
                                                state={{
                                                    newWindow: true,
                                                }}
                                            >
                                                {content}
                                            </Link>
                                        ) : (
                                            <div key={r.email} className={className}>
                                                {content}
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    )}

                    {errorCount > 0 && (
                        <div className="space-y-2">
                            <span className="text-xs font-semibold text-red">{errorCount} failed</span>
                            <div className="rounded-md border border-red/20 overflow-hidden">
                                {results
                                    .filter((r) => r.status === 'error')
                                    .map((r, i, arr) => (
                                        <div
                                            key={r.email}
                                            className={`flex items-center gap-3 px-3 py-2.5 bg-red/[0.03] ${
                                                i !== arr.length - 1 ? 'border-b border-red/10' : ''
                                            }`}
                                        >
                                            <div className="flex-1 min-w-0">
                                                <span className="text-[13px] truncate block">{r.email}</span>
                                            </div>
                                            {r.reason && <span className="text-xs text-red shrink-0">{r.reason}</span>}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default function AchievementManager() {
    const { user, isModerator, getJwt } = useUser()
    const [activeTab, setActiveTab] = useState<Tab>('create')
    const [achievements, setAchievements] = useState<Achievement[]>([])
    const [groups, setGroups] = useState<AchievementGroup[]>([])
    const [loading, setLoading] = useState(true)
    const [jwt, setJwt] = useState<string | null>(null)

    const loadData = useCallback(async () => {
        const token = await getJwt()
        if (!token) return
        setJwt(token)
        setLoading(true)
        try {
            const [achievementData, groupData] = await Promise.all([
                fetchAchievements(token),
                fetchAchievementGroups(token),
            ])
            setAchievements(achievementData)
            setGroups(groupData)
        } catch {
            // User will see empty selects
        } finally {
            setLoading(false)
        }
    }, [getJwt])

    useEffect(() => {
        if (isModerator) {
            loadData()
        }
    }, [isModerator, loadData])

    if (!user || !isModerator) {
        return (
            <div data-scheme="secondary" className="h-full bg-primary text-primary">
                <SEO title="Achievement Manager - PostHog" />
                <div className="flex items-center justify-center h-full p-4">
                    <div className="p-4 rounded border border-primary w-full">
                        <div className="flex items-center gap-3">
                            <div className="bg-red/15 rounded-lg p-2">
                                <IconLock className="size-5 text-red" />
                            </div>
                            <div>
                                <p className="mt-0 mb-0 font-bold text-sm">Access denied</p>
                                <p className="mb-0 text-xs text-secondary">
                                    Log in with a moderator account to manage achievements
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div data-scheme="secondary" className="h-full bg-primary text-primary">
            <SEO title="Achievement Manager - PostHog" />
            <ScrollArea>
                <div className="p-4">
                    <>
                        <div className="flex gap-1 mb-5 bg-accent p-1 rounded border border-primary">
                            {(
                                [
                                    { key: 'create' as Tab, label: 'Create / edit', icon: IconPencil },
                                    { key: 'assign' as Tab, label: 'Bulk assign', icon: IconPeople },
                                ] as const
                            ).map(({ key, label, icon: Icon }) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setActiveTab(key)}
                                    className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-all ${
                                        activeTab === key
                                            ? 'bg-primary text-primary shadow-sm'
                                            : 'text-secondary hover:text-primary'
                                    }`}
                                >
                                    <Icon className="size-4" />
                                    {label}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'create' && jwt && achievements.length > 0 && groups.length > 0 && (
                            <AchievementForm jwt={jwt} achievements={achievements} groups={groups} onSaved={loadData} />
                        )}

                        {activeTab === 'assign' && jwt && achievements.length > 0 && (
                            <BulkAssignForm jwt={jwt} achievements={achievements} />
                        )}
                    </>
                </div>
            </ScrollArea>
        </div>
    )
}
