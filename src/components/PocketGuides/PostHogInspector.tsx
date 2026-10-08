import React from 'react'

const BORDER = 'border-[#d3d0c8]'

export const COMPACT_INSPECTOR_CLASSES =
    '[&_.whitespace-pre]:whitespace-pre-wrap [&_.whitespace-pre]:break-words [&_summary]:!bg-transparent'

/** The PostHog side of Twig interactions, styled like a light developer inspector. */
export default function PostHogInspector({
    children,
    className = '',
}: {
    children: React.ReactNode
    className?: string
}): JSX.Element {
    return (
        <section
            aria-label="Inspector"
            className={`min-w-0 overflow-hidden rounded border ${BORDER} bg-[#fffdfa] font-rounded text-[#292724] shadow-sm [&_details]:!m-0 [&_details]:!rounded-none [&_details]:!border-0 [&_details]:!bg-transparent [&_details]:!pb-0 ${className}`}
        >
            <div className={`flex items-center gap-2 border-b ${BORDER} bg-[#f6f3ed] px-3 py-2 text-sm font-semibold`}>
                Inspector
            </div>
            <div aria-live="polite" className="min-w-0 text-sm">
                {children}
            </div>
        </section>
    )
}

export function InspectorCode({ label, value, meta }: { label: string; value: string; meta?: string }): JSX.Element {
    const isElement = label === 'Clicked element'

    return (
        <div className={`min-w-0 border-b ${BORDER}`}>
            <div className={`flex items-center gap-2 border-b ${BORDER} bg-[#faf8f3] px-3 text-xs`}>
                <span className="border-b-2 border-orange py-2 font-semibold text-[#292724]">
                    {isElement ? 'Elements' : 'Event data'}
                </span>
                <span
                    className={`ml-auto font-code text-[10px] ${
                        meta
                            ? `rounded border ${BORDER} bg-[#fffdfa] px-2 py-0.5 font-semibold text-[#292724]`
                            : 'text-[#716c63]'
                    }`}
                >
                    {meta ?? (isElement ? 'selected node' : 'selected properties')}
                </span>
            </div>
            {isElement ? <ElementTree value={value} /> : <EventTree value={value} />}
        </div>
    )
}

export function InspectorJavaScript({
    lines,
    highlightedLine,
    meta,
}: {
    lines: string[]
    highlightedLine: number
    meta?: string
}): JSX.Element {
    return (
        <div className={`min-w-0 border-b ${BORDER}`}>
            <div className={`flex items-center gap-2 border-b ${BORDER} bg-[#faf8f3] px-3 text-xs`}>
                <span className="border-b-2 border-orange py-2 font-semibold text-[#292724]">SDK call</span>
                {meta && (
                    <span
                        className={`ml-auto rounded border ${BORDER} bg-[#fffdfa] px-2 py-0.5 font-code text-[10px] font-semibold text-[#292724]`}
                    >
                        {meta}
                    </span>
                )}
            </div>
            <div className="px-3 py-2">
                <div className="flex items-center gap-2 rounded bg-[#e4e5df] px-3 py-2 font-code text-xs font-semibold text-[#5f5a52]">
                    <svg aria-hidden="true" className="size-3 shrink-0" viewBox="0 0 12 12">
                        <path d="m2 4 4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    browser tracking code
                </div>
                <div className="ml-[5px] mt-2 border-l border-[#dedad2] pl-4">
                    <pre className="!m-0 overflow-x-auto !rounded-none !border-0 !bg-transparent !p-0 font-code text-[11px] leading-5">
                        <code className="!rounded-none !border-0 !bg-transparent !p-0 !shadow-none">
                            {lines.map((line, index) => (
                                <span
                                    key={`${index}-${line}`}
                                    className={`block min-h-5 whitespace-pre pr-2 ${
                                        index === highlightedLine ? 'font-semibold' : ''
                                    }`}
                                >
                                    {index === highlightedLine ? (
                                        <mark className="bg-[#fff0dc] px-1 text-inherit">{line}</mark>
                                    ) : (
                                        line
                                    )}
                                </span>
                            ))}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    )
}

export function InspectorDetails({
    tab,
    title,
    meta,
    rows,
}: {
    tab: string
    title: string
    meta?: string
    rows: Array<{ label: string; value: string }>
}): JSX.Element {
    return (
        <div className={`min-w-0 border-b ${BORDER}`}>
            <div className={`flex items-center gap-2 border-b ${BORDER} bg-[#faf8f3] px-3 text-xs`}>
                <span className="border-b-2 border-orange py-2 font-semibold text-[#292724]">{tab}</span>
                {meta && (
                    <span
                        className={`ml-auto rounded border ${BORDER} bg-[#fffdfa] px-2 py-0.5 font-code text-[10px] font-semibold text-[#292724]`}
                    >
                        {meta}
                    </span>
                )}
            </div>
            <div className="min-w-0 overflow-x-auto py-2 font-code text-xs leading-6">
                <details open className="min-w-0 px-3">
                    <summary className="cursor-pointer select-none text-[#5f5a52]">{title}</summary>
                    <div className="ml-[5px] border-l border-[#dedad2] pl-4">
                        {rows.map(({ label, value }) => (
                            <div key={`${label}-${value}`} className="whitespace-pre">
                                <span className="text-[#77529a]">{label}</span>:{' '}
                                <span className="text-[#9a4b1c]">{JSON.stringify(value)}</span>
                            </div>
                        ))}
                    </div>
                </details>
            </div>
        </div>
    )
}

function ElementTree({ value }: { value: string }): JSX.Element {
    const match = value.match(/^<(\w+)\s+([^=]+)="([^"]+)">([^<]+)<\/(\w+)>$/)

    return (
        <div className="min-w-0 overflow-x-auto py-2 font-code text-xs leading-6">
            <div className="flex min-w-0 border-l-[3px] border-orange bg-[#fff0dc] px-3 text-[#292724]">
                <span aria-hidden="true" className="mr-4 select-none text-[#878177]">
                    1
                </span>
                <samp className="min-w-0 whitespace-pre">
                    {match ? (
                        <>
                            &lt;<span className="text-[#135e91]">{match[1]}</span>{' '}
                            <span className="text-[#77529a]">{match[2]}</span>=
                            <span className="text-[#9a4b1c]">"{match[3]}"</span>&gt;{match[4]}&lt;/
                            <span className="text-[#135e91]">{match[5]}</span>&gt;
                        </>
                    ) : (
                        value
                    )}
                </samp>
            </div>
        </div>
    )
}

function EventTree({ value }: { value: string }): JSX.Element {
    const payload = JSON.parse(value) as {
        event: string
        timestamp?: string
        properties: Record<string, string | number | boolean>
    }
    const properties = Object.entries(payload.properties)

    return (
        <div className="min-w-0 overflow-x-auto py-2 font-code text-xs leading-6">
            <details open className="min-w-0 px-3">
                <summary className="cursor-pointer select-none text-[#5f5a52]">capture payload</summary>
                <div className="ml-[5px] border-l border-[#dedad2] pl-4">
                    <div className="whitespace-pre">
                        <span className="text-[#77529a]">event</span>:{' '}
                        <span className="text-[#9a4b1c]">"{payload.event}"</span>
                    </div>
                    {payload.timestamp && (
                        <div className="whitespace-pre">
                            <span className="text-[#77529a]">timestamp</span>:{' '}
                            <span className="text-[#9a4b1c]">"{payload.timestamp}"</span>
                        </div>
                    )}
                    <details open>
                        <summary className="cursor-pointer select-none text-[#77529a]">
                            properties <span className="text-[#716c63]">{'{' + properties.length + '}'}</span>
                        </summary>
                        <div className="ml-[5px] border-l border-[#dedad2] pl-4">
                            {properties.length ? (
                                properties.map(([key, propertyValue]) => (
                                    <div key={key} className="whitespace-pre">
                                        <span className="text-[#77529a]">{key}</span>:{' '}
                                        <span className="text-[#9a4b1c]">{JSON.stringify(propertyValue)}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-[#716c63]">No properties</div>
                            )}
                        </div>
                    </details>
                </div>
            </details>
        </div>
    )
}

export function InspectorStatus({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex items-start gap-2 bg-[#faf8f3] px-3 py-2 text-xs leading-relaxed text-[#5f5a52]">
            <span aria-hidden="true" className="mt-[5px] size-1.5 shrink-0 rounded-full bg-orange" />
            <span>{children}</span>
        </div>
    )
}
