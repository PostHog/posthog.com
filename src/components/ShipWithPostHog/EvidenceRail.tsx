import React, { useMemo, useState } from 'react'
import { IconChevronDown, IconSearch } from '@posthog/icons'
import EvidenceCard from './EvidenceCard'
import { EVIDENCE_SOURCE_META, type EvidenceItem } from './inboxData'

/**
 * The detail view's evidence rail, and the redesign's biggest structural change: evidence
 * moved out of a panel on the right into a column of its own on the left, headed by a
 * search box.
 *
 * The search is real. It matches each finding's title, its source label, and its code
 * paths – the three fields that are plain strings. `body` is deliberately excluded: it's
 * a `ReactNode` so authored prose can carry `<strong>` and `<Code>`, and there's no
 * reliable way to read text back out of one without rendering it.
 */
export default function EvidenceRail({ evidence }: { evidence: EvidenceItem[] }): JSX.Element {
    const [query, setQuery] = useState('')
    const [open, setOpen] = useState(true)

    const matches = useMemo(() => {
        const needle = query.trim().toLowerCase()
        if (!needle) return evidence
        return evidence.filter((item) =>
            [item.title, EVIDENCE_SOURCE_META[item.source].label, ...(item.codePaths ?? [])]
                .join(' ')
                .toLowerCase()
                .includes(needle)
        )
    }, [evidence, query])

    return (
        <div className="flex flex-col gap-2">
            {/* Search doubles as the rail's header, as it does in the app */}
            <div className="flex items-center gap-1.5 rounded-md border border-primary bg-primary px-2.5 py-1.5">
                <IconSearch className="size-4 shrink-0 text-secondary" />
                <input
                    type="search"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Evidence"
                    aria-label="Search evidence"
                    className="min-w-0 flex-1 border-0 bg-transparent p-0 text-sm text-primary placeholder:font-semibold placeholder:text-primary focus:outline-none"
                />
                <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    aria-expanded={open}
                    aria-label={open ? 'Hide evidence' : 'Show evidence'}
                    className="shrink-0 text-secondary transition-colors hover:text-primary"
                >
                    <IconChevronDown className={`size-4 transition-transform ${open ? '' : '-rotate-90'}`} />
                </button>
            </div>

            {open && (
                <div className="flex flex-col gap-2">
                    {matches.length ? (
                        matches.map((item) => <EvidenceCard key={item.id} item={item} />)
                    ) : (
                        <p className="m-0 rounded-md border border-primary bg-primary px-2.5 py-3 text-center text-xs text-secondary">
                            No finding mentions “{query.trim()}”.
                        </p>
                    )}
                </div>
            )}
        </div>
    )
}
