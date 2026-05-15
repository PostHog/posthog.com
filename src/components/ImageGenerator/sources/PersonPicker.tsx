import React, { useMemo, useState } from 'react'
import type { GeneratorState } from '../types'
import { profileAvatarUrl, searchProfiles, useSqueakProfiles } from '../hooks/useSqueakProfiles'

type Props = {
    state: GeneratorState
    onChange: (next: GeneratorState) => void
}

export default function PersonPicker({ state, onChange }: Props) {
    const profiles = useSqueakProfiles()
    const [query, setQuery] = useState('')
    const results = useMemo(() => searchProfiles(profiles, query), [profiles, query])

    const select = (squeakId: number, firstName: string, lastName: string, role?: string, avatarUrl?: string) => {
        onChange({
            ...state,
            image: {
                ...state.image,
                source: 'person',
                personId: String(squeakId),
                personName: `${firstName} ${lastName}`.trim(),
                personRole: role,
                personAvatarUrl: avatarUrl,
            },
        })
    }

    return (
        <div className="space-y-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search teammates…"
                className="w-full bg-accent border border-primary rounded px-2 py-1 text-sm"
            />
            <div className="max-h-72 overflow-y-auto">
                {results.map((p) => {
                    const isActive = state.image.personId === String(p.squeakId)
                    const thumb = profileAvatarUrl(p, 'thumb')
                    const fullAvatar = profileAvatarUrl(p, 'full')
                    return (
                        <button
                            key={p.squeakId}
                            type="button"
                            onClick={() => select(p.squeakId, p.firstName, p.lastName, p.companyRole, fullAvatar)}
                            className={`w-full flex items-center gap-2 px-1.5 py-1 rounded text-left leading-tight ${
                                isActive ? 'bg-accent' : 'hover:bg-accent/50'
                            }`}
                        >
                            {thumb ? (
                                <img src={thumb} alt="" className="size-6 rounded-full object-cover m-0" />
                            ) : (
                                <div className="size-6 rounded-full bg-yellow" />
                            )}
                            <div className="min-w-0">
                                <div className="text-xs font-semibold truncate">
                                    {p.firstName} {p.lastName}
                                </div>
                                {p.companyRole && (
                                    <div className="text-[11px] text-secondary truncate">{p.companyRole}</div>
                                )}
                            </div>
                        </button>
                    )
                })}
                {results.length === 0 && <p className="text-xs text-secondary p-1">No teammates match "{query}"</p>}
            </div>
        </div>
    )
}
