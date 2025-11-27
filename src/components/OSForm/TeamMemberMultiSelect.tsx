import React from 'react'
import { IconX } from '@posthog/icons'
import { Accordion } from 'components/RadixUI/Accordion'
import { Checkbox } from 'components/RadixUI/Checkbox'
import Tooltip from 'components/RadixUI/Tooltip'

export interface TeamContext {
    id: string
    name: string
    miniCrest?: string
}

export interface SelectedMember {
    squeakId: string
    firstName: string
    lastName: string
    avatar?: { url: string }
    color?: string
    teams: string[] // Team names for tooltip
    teamContext?: TeamContext // The team from which this member was selected
}

export interface TeamProfile {
    id: string
    attributes: {
        squeakId: string
        firstName: string
        lastName: string
        companyRole?: string
        avatar?: { data: { attributes: { url: string } } }
        color?: string
    }
}

export interface Team {
    id: string
    name: string
    slug: string
    miniCrest?: { data: { attributes: { url: string } } }
    profiles: {
        data: TeamProfile[]
    }
}

interface TeamMemberMultiSelectProps {
    label: string
    description?: string
    placeholder?: string
    teams: Team[]
    value: SelectedMember[]
    onChange: (selected: SelectedMember[]) => void
    onBlur?: () => void
    touched?: boolean
    error?: string
}

export function TeamMemberMultiSelect({
    label,
    description,
    placeholder,
    teams,
    value,
    onChange,
    onBlur,
    touched,
    error,
}: TeamMemberMultiSelectProps) {
    const [query, setQuery] = React.useState<string>('')
    const [focused, setFocused] = React.useState<boolean>(false)
    const [accordionValue, setAccordionValue] = React.useState<string[]>([])
    const listRef = React.useRef<HTMLDivElement | null>(null)

    // Build a map of all unique members across teams
    const allMembersMap = React.useMemo(() => {
        const map = new Map<string, { profile: TeamProfile; teamNames: string[] }>()

        teams.forEach((team) => {
            team.profiles.data.forEach((profile) => {
                const squeakId = profile.attributes.squeakId
                if (map.has(squeakId)) {
                    map.get(squeakId)!.teamNames.push(team.name)
                } else {
                    map.set(squeakId, { profile, teamNames: [team.name] })
                }
            })
        })

        return map
    }, [teams])

    // Get set of selected squeakIds for quick lookup
    const selectedIds = React.useMemo(() => {
        return new Set(value.map((m) => m.squeakId))
    }, [value])

    // Filter teams and members based on search query
    const filteredTeams = React.useMemo(() => {
        if (!query.trim()) return teams

        const searchLower = query.toLowerCase()

        return teams
            .map((team) => {
                const teamNameMatches = team.name.toLowerCase().includes(searchLower)

                const matchingProfiles = team.profiles.data.filter((profile) => {
                    const firstName = profile.attributes.firstName?.toLowerCase() || ''
                    const lastName = profile.attributes.lastName?.toLowerCase() || ''
                    const fullName = `${firstName} ${lastName}`.trim()

                    return (
                        firstName.includes(searchLower) ||
                        lastName.includes(searchLower) ||
                        fullName.includes(searchLower)
                    )
                })

                // Include team if name matches OR has matching members
                if (teamNameMatches || matchingProfiles.length > 0) {
                    return {
                        ...team,
                        profiles: {
                            data: teamNameMatches ? team.profiles.data : matchingProfiles,
                        },
                    }
                }

                return null
            })
            .filter(Boolean) as Team[]
    }, [teams, query])

    // Auto-expand teams with matching members when searching
    React.useEffect(() => {
        if (query.trim()) {
            setAccordionValue(filteredTeams.map((t) => t.id))
        } else {
            setAccordionValue([])
        }
    }, [query, filteredTeams])

    const toggleMember = (profile: TeamProfile, teamNames: string[], currentTeam?: Team) => {
        const squeakId = profile.attributes.squeakId
        const isSelected = selectedIds.has(squeakId)

        if (isSelected) {
            // Remove
            onChange(value.filter((m) => m.squeakId !== squeakId))
        } else {
            // Add
            const newMember: SelectedMember = {
                squeakId,
                firstName: profile.attributes.firstName,
                lastName: profile.attributes.lastName,
                avatar: profile.attributes.avatar?.data?.attributes
                    ? { url: profile.attributes.avatar.data.attributes.url }
                    : undefined,
                color: profile.attributes.color,
                teams: teamNames,
                teamContext: currentTeam
                    ? {
                          id: currentTeam.id,
                          name: currentTeam.name,
                          miniCrest: currentTeam.miniCrest?.data?.attributes?.url,
                      }
                    : undefined,
            }
            onChange([...value, newMember])
        }
    }

    const toggleAllMembers = (checked: boolean) => {
        if (checked) {
            // Select all unique members
            const allMembers: SelectedMember[] = Array.from(allMembersMap.entries()).map(
                ([squeakId, { profile, teamNames }]) => ({
                    squeakId,
                    firstName: profile.attributes.firstName,
                    lastName: profile.attributes.lastName,
                    avatar: profile.attributes.avatar?.data?.attributes
                        ? { url: profile.attributes.avatar.data.attributes.url }
                        : undefined,
                    color: profile.attributes.color,
                    teams: teamNames,
                })
            )
            onChange(allMembers)
        } else {
            // Deselect all
            onChange([])
        }
    }

    const toggleTeamMembers = (team: Team, checked: boolean) => {
        const teamMemberIds = team.profiles.data.map((p) => p.attributes.squeakId)

        if (checked) {
            // Add all team members (avoiding duplicates)
            const newMembers = team.profiles.data
                .filter((profile) => !selectedIds.has(profile.attributes.squeakId))
                .map((profile) => {
                    const memberData = allMembersMap.get(profile.attributes.squeakId)!
                    return {
                        squeakId: profile.attributes.squeakId,
                        firstName: profile.attributes.firstName,
                        lastName: profile.attributes.lastName,
                        avatar: profile.attributes.avatar?.data?.attributes
                            ? { url: profile.attributes.avatar.data.attributes.url }
                            : undefined,
                        color: profile.attributes.color,
                        teams: memberData.teamNames,
                        teamContext: {
                            id: team.id,
                            name: team.name,
                            miniCrest: team.miniCrest?.data?.attributes?.url,
                        },
                    }
                })
            onChange([...value, ...newMembers])
        } else {
            // Remove all team members
            onChange(value.filter((m) => !teamMemberIds.includes(m.squeakId)))
        }
    }

    const removeMember = (squeakId: string) => {
        onChange(value.filter((m) => m.squeakId !== squeakId))
    }

    const getTeamSelectionState = (team: Team): 'all' | 'some' | 'none' => {
        const teamMemberIds = team.profiles.data.map((p) => p.attributes.squeakId)
        const selectedCount = teamMemberIds.filter((id) => selectedIds.has(id)).length

        if (selectedCount === 0) return 'none'
        if (selectedCount === teamMemberIds.length) return 'all'
        return 'some'
    }

    const allMembersSelected = selectedIds.size === allMembersMap.size && allMembersMap.size > 0

    return (
        <div className="flex flex-col space-y-1">
            <div className="w-full">
                <label className="text-[15px]">
                    <span>
                        {label}
                        <span className="text-red dark:text-yellow ml-0.5">*</span>
                    </span>
                </label>
                {description && <p className="text-sm text-secondary m-0 mt-0.5">{description}</p>}
            </div>
            <div
                className={`bg-primary border rounded ring-0 px-2.5 py-2 ${
                    touched && error ? 'border-red dark:border-yellow' : 'border-primary'
                }`}
                onMouseDown={(e) => {
                    if ((e.target as HTMLElement).tagName !== 'INPUT') {
                        e.preventDefault()
                    }
                }}
            >
                <div className="flex flex-wrap gap-1">
                    {value.map((member) => {
                        const displayName = `${member.firstName} ${member.lastName}`.trim()
                        return (
                            <Tooltip
                                key={member.squeakId}
                                trigger={
                                    <span className="inline-flex items-center gap-1.5 px-1 py-0.5 rounded-full border border-primary text-xs bg-accent h-[28px]">
                                        <img
                                            src={member.avatar?.url}
                                            alt=""
                                            className={`size-5 rounded-full border border-primary object-cover bg-${
                                                member.color || 'accent'
                                            }`}
                                        />
                                        <span>{displayName}</span>
                                        <button
                                            type="button"
                                            aria-label={`Remove ${displayName}`}
                                            onClick={() => removeMember(member.squeakId)}
                                            className="text-secondary hover:text-primary size-3"
                                        >
                                            <IconX />
                                        </button>
                                    </span>
                                }
                                side="top"
                            >
                                <>{`${displayName} (${member.teams.join(', ')})`}</>
                            </Tooltip>
                        )
                    })}
                    <input
                        className="flex-1 min-w-[8rem] bg-transparent outline-none border-0 ring-0 focus:ring-0 text-[15px] px-0 py-0.5"
                        placeholder={placeholder || label}
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => {
                            setTimeout(() => setFocused(false), 200)
                            onBlur?.()
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') {
                                e.preventDefault()
                                setFocused(false)
                                setQuery('')
                            } else if (e.key === 'Backspace' && !query && value.length > 0) {
                                removeMember(value[value.length - 1].squeakId)
                            }
                        }}
                    />
                </div>
                {focused && (
                    <div ref={listRef} className="mt-2 max-h-96 overflow-auto rounded border border-primary bg-primary">
                        {/* All members checkbox */}
                        <div className="flex items-center gap-2 px-3 py-2 border-b border-primary hover:bg-accent">
                            <Checkbox
                                id="all-members"
                                checked={allMembersSelected}
                                onCheckedChange={toggleAllMembers}
                            />
                            <label htmlFor="all-members" className="text-sm font-semibold cursor-pointer flex-1">
                                All members
                            </label>
                            <span className="text-xs text-secondary">
                                {selectedIds.size}/{allMembersMap.size}
                            </span>
                        </div>

                        {/* Team accordion */}
                        {filteredTeams.length > 0 ? (
                            <Accordion
                                type="multiple"
                                value={accordionValue}
                                onValueChange={setAccordionValue}
                                items={filteredTeams.map((team) => {
                                    const selectionState = getTeamSelectionState(team)
                                    const selectedCount = team.profiles.data.filter((p) =>
                                        selectedIds.has(p.attributes.squeakId)
                                    ).length

                                    return {
                                        value: team.id,
                                        trigger: (
                                            <div className="flex items-center gap-2 flex-1">
                                                <Checkbox
                                                    id={`team-${team.id}`}
                                                    checked={selectionState === 'all'}
                                                    onCheckedChange={(checked) => {
                                                        toggleTeamMembers(team, checked as boolean)
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                />
                                                {team.miniCrest?.data?.attributes?.url && (
                                                    <img
                                                        src={team.miniCrest.data.attributes.url}
                                                        alt=""
                                                        className="size-5 shrink-0"
                                                    />
                                                )}
                                                <span className="font-semibold">{team.name}</span>
                                                <span className="ml-auto text-xs text-secondary">
                                                    {selectedCount}/{team.profiles.data.length}
                                                </span>
                                            </div>
                                        ),
                                        content: (
                                            <div className="space-y-2">
                                                {team.profiles.data.map((profile) => {
                                                    const memberData = allMembersMap.get(profile.attributes.squeakId)!
                                                    const isSelected = selectedIds.has(profile.attributes.squeakId)
                                                    const displayName =
                                                        `${profile.attributes.firstName} ${profile.attributes.lastName}`.trim()
                                                    const avatarUrl = profile.attributes.avatar?.data?.attributes?.url

                                                    return (
                                                        <div
                                                            key={profile.attributes.squeakId}
                                                            className="flex items-center gap-2 hover:bg-accent rounded px-2 py-1"
                                                        >
                                                            <Checkbox
                                                                id={`member-${profile.attributes.squeakId}`}
                                                                checked={isSelected}
                                                                onCheckedChange={() =>
                                                                    toggleMember(profile, memberData.teamNames, team)
                                                                }
                                                            />
                                                            <img
                                                                src={avatarUrl}
                                                                alt=""
                                                                className={`size-8 rounded-full border border-primary object-cover bg-${
                                                                    profile.attributes.color || 'accent'
                                                                }`}
                                                            />
                                                            <label
                                                                htmlFor={`member-${profile.attributes.squeakId}`}
                                                                className="flex-1 cursor-pointer text-sm font-medium"
                                                            >
                                                                {displayName}
                                                            </label>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        ),
                                    }
                                })}
                                skin={false}
                                className="border-0"
                            />
                        ) : (
                            <div className="text-center py-8 text-secondary">
                                <p className="text-sm">No teams or members found matching "{query}"</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {touched && error && <p className="text-sm text-red dark:text-yellow m-0 mt-1">{error}</p>}
        </div>
    )
}
