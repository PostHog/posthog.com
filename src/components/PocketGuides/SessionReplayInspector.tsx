import React from 'react'

import PostHogInspector from './PostHogInspector'

export type SessionReplayInspectorEvent = {
    timeMs: number
    kind: string
    title: string
    properties: Array<{ label: string; value: string }>
}

export default function SessionReplayInspector({
    events,
    activeIndex,
}: {
    events: SessionReplayInspectorEvent[]
    activeIndex: number
}): JSX.Element {
    const clickCount = events.filter((event) => event.kind === 'Click').length
    const pageCount = events.filter((event) => event.kind === 'Pageview').length

    return (
        <PostHogInspector>
            <div className="border-b border-[#d3d0c8] bg-[#faf8f3] px-3 text-xs font-semibold">
                <span className="inline-block border-b-2 border-orange py-2">Events</span>
            </div>

            <div className="session-replay-inspector-summary flex flex-wrap gap-x-3 gap-y-1 border-b border-[#d3d0c8] px-3 py-2 text-[11px] font-medium text-[#716c63]">
                <span>{clickCount} clicks</span>
                <span>{pageCount} pages</span>
            </div>

            <ol className="m-0 flex-1 list-none divide-y divide-[#e8e4dc] p-0">
                {events.map((item, index) => (
                    <li
                        key={`${item.timeMs}-${item.title}`}
                        aria-current={activeIndex === index ? 'true' : undefined}
                        className={`m-0 grid grid-cols-[2.2rem_minmax(0,1fr)] gap-1.5 px-2.5 py-2.5 ${
                            activeIndex === index ? 'bg-orange/10' : ''
                        }`}
                    >
                        <time className="pt-0.5 font-code text-[10px] text-[#716c63]">
                            {Math.floor(item.timeMs / 60000)}:
                            {String(Math.floor((item.timeMs % 60000) / 1000)).padStart(2, '0')}
                        </time>
                        <div className="min-w-0">
                            <div className="flex min-w-0 items-start gap-2">
                                <span
                                    aria-hidden="true"
                                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                                        activeIndex === index ? 'bg-orange' : 'bg-[#a9a49b]'
                                    }`}
                                />
                                <div className="min-w-0">
                                    <strong className="block truncate text-xs leading-4">{item.title}</strong>
                                    <span className="block text-[10px] leading-4 text-[#716c63]">{item.kind}</span>
                                </div>
                            </div>
                        </div>
                        {activeIndex === index && (
                            <dl className="col-span-2 mt-1 grid gap-1 border-l border-[#d3d0c8] pl-2 font-code text-[10px] leading-4">
                                {item.properties.map(({ label, value }) => (
                                    <div key={label} className="flex min-w-0 gap-1.5">
                                        <dt className="shrink-0 text-[#7650a5]">{label}</dt>
                                        <dd className="m-0 break-all">{value}</dd>
                                    </div>
                                ))}
                            </dl>
                        )}
                    </li>
                ))}
            </ol>
        </PostHogInspector>
    )
}
