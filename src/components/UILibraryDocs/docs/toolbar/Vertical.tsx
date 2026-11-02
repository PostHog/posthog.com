import React from 'react'
import { IconCopy, IconDownload, IconPencil, IconTrash } from '@posthog/icons'
import { Toolbar } from 'components/UI/Toolbar'

export default function VerticalToolbar(): JSX.Element {
    return (
        <div className="flex items-start gap-4">
            <Toolbar.Root orientation="vertical" aria-label="Insight actions">
                <Toolbar.Button aria-label="Edit">
                    <IconPencil className="size-4" />
                </Toolbar.Button>
                <Toolbar.Button aria-label="Duplicate">
                    <IconCopy className="size-4" />
                </Toolbar.Button>
                <Toolbar.Button aria-label="Export">
                    <IconDownload className="size-4" />
                </Toolbar.Button>
                <Toolbar.Separator />
                <Toolbar.Button aria-label="Delete" disabled>
                    <IconTrash className="size-4" />
                </Toolbar.Button>
            </Toolbar.Root>
            <div className="flex h-36 min-w-0 flex-1 items-center justify-center rounded-md border border-dashed border-[rgb(var(--text-primary)/0.2)] text-caption text-secondary">
                Insight canvas
            </div>
        </div>
    )
}
