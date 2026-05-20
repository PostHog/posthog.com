import React, { useMemo } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as RadioGroup from '@radix-ui/react-radio-group'
import SkillsColumnRow from './SkillsColumnRow'
import SkillsColumnShell from './SkillsColumnShell'

export default function SkillsFinderColumn<T extends { id: string; name: string }>({
    items,
    selectedId,
    onSelect,
    getIcon,
    isFolder = () => true,
    wrapLabels = false,
    widthClassName,
    header,
}: {
    items: T[]
    selectedId: string | null
    onSelect: (item: T) => void
    getIcon?: (item: T) => React.ReactNode
    isFolder?: (item: T) => boolean
    wrapLabels?: boolean
    widthClassName?: string
    header?: React.ReactNode
}) {
    const reserveIconSpace = useMemo(
        () => items.some((item) => Boolean(getIcon?.(item)) || !isFolder(item)),
        [items, getIcon, isFolder]
    )

    return (
        <SkillsColumnShell widthClassName={widthClassName}>
            {header}
            <ScrollArea.Root className="flex-1 min-h-0 overflow-hidden">
                <ScrollArea.Viewport className="h-full w-full p-1">
                    <RadioGroup.Root
                        value={selectedId ?? ''}
                        onValueChange={(value) => {
                            const item = items.find((i) => i.id === value)
                            if (item) onSelect(item)
                        }}
                        className="flex flex-col gap-px text-left w-full"
                    >
                        {items.map((item) => (
                            <SkillsColumnRow
                                key={item.id}
                                name={item.name}
                                value={item.id}
                                isFolder={isFolder(item)}
                                icon={getIcon?.(item)}
                                wrapLabel={wrapLabels}
                                reserveIconSpace={reserveIconSpace}
                            />
                        ))}
                    </RadioGroup.Root>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar
                    className="flex select-none touch-none p-0.5 data-[orientation=vertical]:w-2"
                    orientation="vertical"
                >
                    <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-border dark:bg-border-dark" />
                </ScrollArea.Scrollbar>
            </ScrollArea.Root>
        </SkillsColumnShell>
    )
}
