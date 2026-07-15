import React, { useMemo } from 'react'

import { Select } from 'components/RadixUI/Select'
import type { GrantRepository } from '../../lib/wizard/types'

/** Repository dropdown, grouped by GitHub org/user (the part before the slash). */
export default function RepoPicker({
    repositories,
    value,
    onChange,
    disabled,
}: {
    repositories: GrantRepository[]
    value?: string
    onChange: (fullName: string) => void
    disabled?: boolean
}): JSX.Element {
    const groups = useMemo(() => {
        const byOwner = new Map<string, { value: string; label: string }[]>()
        for (const repo of repositories) {
            const [owner, ...rest] = repo.full_name.split('/')
            const items = byOwner.get(owner) ?? []
            items.push({ value: repo.full_name, label: rest.join('/') || repo.full_name })
            byOwner.set(owner, items)
        }
        return Array.from(byOwner, ([label, items]) => ({ label, items }))
    }, [repositories])

    return (
        <Select
            groups={groups}
            value={value}
            onValueChange={onChange}
            placeholder="Select a repository…"
            ariaLabel="Repository"
            disabled={disabled}
            className="min-w-64"
        />
    )
}
