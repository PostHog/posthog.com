import React from 'react'
import { IconArrowLeft } from '@posthog/icons'
import { SkillsMobileNavProps } from './types'

export default function SkillsMobileNav({ title, onBack }: SkillsMobileNavProps) {
    return (
        <div
            data-scheme="secondary"
            className="flex flex-shrink-0 items-center gap-1 border-b border-primary px-1 py-1.5 bg-primary"
        >
            <button
                type="button"
                aria-label="Back"
                onClick={onBack}
                className="inline-flex p-1.5 rounded-sm text-secondary hover:text-primary hover:bg-accent"
            >
                <IconArrowLeft className="size-4" />
            </button>
            <span className="text-sm font-semibold truncate min-w-0">{title}</span>
        </div>
    )
}
