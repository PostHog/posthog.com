import React from 'react'
import ScrollArea from 'components/RadixUI/ScrollArea'
import CategoryGrid, { tagOptions } from 'components/BlogLanding/CategoryGrid'

// Re-exported for backwards compatibility (e.g. templates/Hub/Tag.tsx imports it from here).
export { tagOptions }

export default function Hub({ folder, sidebar, title }: { folder: string; sidebar?: React.ReactNode; title: string }) {
    return (
        <div data-scheme="secondary" className="p-4 bg-primary text-primary h-full">
            <div className="flex gap-8 h-full">
                <section className="flex-1">
                    <ScrollArea>
                        <h2 className="mb-4">{title}</h2>
                        <CategoryGrid folder={folder} />
                    </ScrollArea>
                </section>

                {sidebar && (
                    <aside className="max-w-xs text-sm">
                        <ScrollArea>{sidebar}</ScrollArea>
                    </aside>
                )}
            </div>
        </div>
    )
}
