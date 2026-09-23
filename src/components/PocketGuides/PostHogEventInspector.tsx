import React from 'react'

type PostHogEventInspectorProps = {
    clicked: string
    recorded?: string
    mismatch?: boolean
    eventOnly?: boolean
}

export default function PostHogEventInspector({
    clicked,
    recorded,
    mismatch = false,
    eventOnly = false,
}: PostHogEventInspectorProps): JSX.Element {
    return (
        <details
            open
            className="font-rounded overflow-hidden rounded border border-[#bfc8c1] bg-[#f8faf8] text-[#202225] shadow-sm dark:border-[#45484d] dark:bg-[#202225] dark:text-[#f5f5f4]"
        >
            <summary className="cursor-pointer border-b border-[#bfc8c1] bg-[#e8ede9] px-3 py-2 text-xs font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange dark:border-[#45484d] dark:bg-[#2d3035]">
                <span className="ml-1 text-[#202225] dark:text-[#f7a500]">PostHog event inspector</span>
            </summary>
            <div className="p-3 text-sm">
                <span className="font-code text-xs text-[#202225] dark:text-[#f7a500]">stay_filter_selected</span>
                <dl className="mt-3 grid gap-3 @md:grid-cols-2">
                    {!eventOnly && (
                        <div>
                            <dt className="text-xs text-[#59615c] dark:text-[#b9babd]">Clicked on Twig</dt>
                            <dd className="mt-0.5 font-semibold">{clicked}</dd>
                        </div>
                    )}
                    <div>
                        <dt className="text-xs text-[#59615c] dark:text-[#b9babd]">
                            {eventOnly ? 'destination_type property' : 'Recorded destination_type'}
                        </dt>
                        <dd className="mt-0.5 font-code">{eventOnly ? 'Not included' : recorded}</dd>
                    </div>
                </dl>
                <p
                    className={`!mt-3 !mb-0 text-xs font-semibold ${
                        eventOnly
                            ? '!text-[#202225] dark:!text-[#f7a500]'
                            : mismatch
                            ? '!text-[#F00008] dark:!text-[#FF474D]'
                            : '!text-[#35B14E] dark:!text-[#B8EAC2]'
                    }`}
                >
                    {eventOnly
                        ? 'Event received. This event does not include the destination type.'
                        : mismatch
                        ? 'Mismatch: the property describes a different filter.'
                        : 'Match: the property describes the selected filter.'}
                </p>
            </div>
        </details>
    )
}
