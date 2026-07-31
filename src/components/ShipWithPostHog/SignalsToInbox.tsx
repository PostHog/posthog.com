import React, { useState } from 'react'
import SelfDrivingStory from 'components/SelfDrivingStory'
import { INBOX_ITEMS, originMeta, SOURCE_META, type InboxItem } from './inboxData'

// Label for the source selector: the product name for signal sources, or
// "<category> scout" for scout-authored reports (e.g. "APM scout").
const selectorLabel = (item: InboxItem): string =>
    item.origin.kind === 'scout' ? `${item.origin.scout} scout` : SOURCE_META[item.origin.product].label

/**
 * "How different signals get to your Inbox" – the section below the inbox. Each of
 * the six signals gets its own Scout → Signal → Investigate → PR → Merge walkthrough;
 * a selector switches between them. Read-only (no merge button here – merging happens
 * up in the inbox itself).
 */
export default function SignalsToInbox(): JSX.Element {
    // Lead with session replay – the fully built-out walkthrough.
    const defaultId = INBOX_ITEMS.find((i) => i.id === 'session-replay')?.id ?? INBOX_ITEMS[0].id
    const [selectedId, setSelectedId] = useState(defaultId)
    const selected = INBOX_ITEMS.find((i) => i.id === selectedId) ?? INBOX_ITEMS[0]

    return (
        <section className="@container">
            <div className="mx-auto mb-6 max-w-3xl text-center">
                <h2 className="text-2xl font-bold @md:text-3xl">How different signals get to your Inbox</h2>
                <p className="mt-3 text-secondary @2xl:text-lg">
                    Every signal takes the same five steps to a pull request – something watches, something gets caught,
                    an agent investigates, opens the PR, and you merge. Pick a signal to see how it plays out.
                </p>
            </div>

            {/* Signal selector */}
            <div className="mb-5 flex flex-wrap justify-center gap-2">
                {INBOX_ITEMS.map((item) => {
                    const origin = originMeta(item)
                    const Icon = origin.Icon
                    const isActive = item.id === selectedId
                    return (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setSelectedId(item.id)}
                            aria-pressed={isActive}
                            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-semibold transition-colors ${
                                isActive
                                    ? 'border-secondary bg-accent text-primary'
                                    : 'border-primary bg-primary text-secondary hover:border-secondary hover:text-primary'
                            }`}
                        >
                            <Icon className={`size-4 ${origin.color}`} />
                            {selectorLabel(item)}
                        </button>
                    )
                })}
            </div>

            {/* Walkthrough for the selected signal */}
            <div className="mx-auto max-w-4xl">
                {selected.intro && (
                    <p className="mb-5 text-center text-base text-secondary @2xl:text-lg">{selected.intro}</p>
                )}
                <SelfDrivingStory key={selected.id} steps={selected.steps} />
            </div>
        </section>
    )
}
