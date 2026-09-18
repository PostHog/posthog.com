import React from 'react'
import { IconChevronRight, IconDocument } from '@posthog/icons'
import * as RadioGroup from '@radix-ui/react-radio-group'

export default function SkillsColumnRow({
    name,
    isFolder,
    icon,
    value,
    wrapLabel = false,
    reserveIconSpace = false,
}: {
    name: string
    isFolder: boolean
    icon?: React.ReactNode
    value: string
    wrapLabel?: boolean
    /** When true, rows without icons still get a leading gap so labels align with icon rows */
    reserveIconSpace?: boolean
}) {
    const leading =
        icon ??
        (reserveIconSpace && isFolder ? (
            <span className="size-4 flex-shrink-0" aria-hidden />
        ) : !isFolder ? (
            <IconDocument className="size-4 text-secondary flex-shrink-0 mt-0.5" />
        ) : null)

    const hasLeading = Boolean(leading)

    return (
        <RadioGroup.Item
            value={value}
            className={`group relative flex w-full select-none text-left rounded-sm px-2 py-1.5 text-sm outline-none data-[state=checked]:bg-accent hover:bg-accent/50 ${
                wrapLabel ? 'items-start gap-2' : 'items-center justify-between'
            }`}
        >
            <div
                className={`flex min-w-0 flex-1 text-left ${hasLeading ? 'gap-2' : ''} ${
                    wrapLabel ? 'items-start' : 'items-center'
                }`}
            >
                {leading}
                <span
                    className={wrapLabel ? 'break-words leading-snug min-w-0 flex-1 text-left' : 'truncate text-left'}
                >
                    {name}
                </span>
            </div>
            {isFolder && (
                <IconChevronRight className="size-4 text-secondary opacity-50 group-data-[state=checked]:opacity-100 flex-shrink-0 ml-1" />
            )}
        </RadioGroup.Item>
    )
}
