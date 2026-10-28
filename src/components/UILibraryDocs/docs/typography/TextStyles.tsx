import React from 'react'
import { Text } from 'components/UI/Typography'

export default function TextStyles(): JSX.Element {
    return (
        <div className="flex max-w-[65ch] flex-col gap-3">
            <Text size="lg">Lead text introduces a page or a section in one or two sentences.</Text>
            <Text>
                Body text is the default for reading. Keep lines under 65 characters wide, so they stay easy to follow
                in wide windows.
            </Text>
            <Text size="sm" color="secondary">
                Small text suits dense UI, such as settings rows and table cells.
            </Text>
            <Text size="caption" color="secondary">
                Captions hold metadata and help text: Updated 3 minutes ago.
            </Text>
            <Text weight="semibold">Semibold marks a short phrase that must stand out in UI.</Text>
            <Text weight="normal">Regular (400) is only for long text on a solid surface.</Text>
        </div>
    )
}
