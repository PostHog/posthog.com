import React, { useState } from 'react'
import SelfDrivingStory from 'components/SelfDrivingStory'
import { INBOX_ITEMS, REPORT_ITEMS, originMeta, type InboxItem } from './inboxData'

/*
 * Only items that actually have a walkthrough. Steps are optional on InboxItem, so
 * adding a report to the inbox can never leave a selector button here that opens nothing.
 *
 * Both arrays, because a product's story doesn't depend on whether its report reached a
 * pull request: APM and Feature flags are genuine `requires_human_input` reports and live
 * in `REPORT_ITEMS`, but they narrate their product as well as any merged one does.
 */
const WALKTHROUGHS: InboxItem[] = [...INBOX_ITEMS, ...REPORT_ITEMS].filter((item) => item.steps?.length)

/**
 * Selector label. The source alone isn't unique – several of these were found by Replay
 * Vision and two came in through Conversations – so by default the commit scope
 * disambiguates, reading as "Conversations · integrations". Items whose walkthrough is
 * about the product rather than the one PR override it; see `walkthroughLabel`.
 */
const selectorLabel = (item: InboxItem): string =>
    item.walkthroughLabel ?? `${originMeta(item).primary} · ${item.scope}`

/**
 * "How signals get to your Inbox" – the section below the inbox. Each merged pull
 * request gets its own Scout → Signal → Investigate → PR → Merge walkthrough, and a
 * selector switches between them. Read-only: reviewing happens up in the inbox itself.
 */
export default function SignalsToInbox(): JSX.Element | null {
    const [selectedId, setSelectedId] = useState(WALKTHROUGHS[0]?.id)
    if (!WALKTHROUGHS.length) return null

    const selected = WALKTHROUGHS.find((i) => i.id === selectedId) ?? WALKTHROUGHS[0]

    return (
        <section className="@container">
            <div className="mx-auto mb-6 max-w-3xl text-center">
                <h2 className="text-2xl font-bold @md:text-3xl">How signals get to your Inbox</h2>
                <p className="mt-3 text-secondary @2xl:text-lg">
                    Every one of these took the same four steps – something gets caught, an agent investigates, it opens
                    the pull request, and someone merges it. Pick one to see how it played out.
                </p>
            </div>

            {/* Signal selector */}
            <div className="mb-5 flex flex-wrap justify-center gap-2">
                {WALKTHROUGHS.map((item) => {
                    const origin = originMeta(item)
                    const Icon = origin.Icon
                    const isActive = item.id === selected.id
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
                            <Icon className={`size-4 shrink-0 ${origin.color}`} />
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
                <SelfDrivingStory key={selected.id} steps={selected.steps ?? []} />
            </div>
        </section>
    )
}
