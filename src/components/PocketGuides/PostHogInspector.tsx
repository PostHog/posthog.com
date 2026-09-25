import React from 'react'
import { Logo } from '@posthog/brand/logo'

const BORDER = 'border-[#d3d0c8]'

/** The PostHog side of Twig interactions, styled like a light developer inspector. */
export default function PostHogInspector({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <section
            aria-label="PostHog inspector"
            className={`min-w-0 overflow-hidden rounded border ${BORDER} bg-[#fffdfa] font-rounded text-[#292724] shadow-sm`}
        >
            <div className={`flex items-center gap-2 border-b ${BORDER} bg-[#f6f3ed] px-3 py-2 text-sm font-semibold`}>
                <span aria-hidden="true" className="flex shrink-0 items-center">
                    <Logo layout="logomark" size={20} />
                </span>
                PostHog inspector
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

function ElementTree({ value }: { value: string }): JSX.Element {
    const match = value.match(/^<(\w+)\s+([^=]+)="([^"]+)">([^<]+)<\/(\w+)>$/)

    return (
        <div className="min-w-0 py-2 font-code text-xs leading-6">
            <div className="flex min-w-0 border-l-[3px] border-orange bg-[#fff0dc] px-3 text-[#292724]">
                <span aria-hidden="true" className="mr-4 select-none text-[#878177]">
                    1
                </span>
                <samp className="min-w-0 whitespace-pre-wrap break-all">
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
        <div className="min-w-0 py-2 font-code text-xs leading-6">
            <details open className="min-w-0 px-3">
                <summary className="cursor-pointer select-none text-[#5f5a52]">capture payload</summary>
                <div className="ml-[5px] border-l border-[#dedad2] pl-4">
                    <div className="break-all">
                        <span className="text-[#77529a]">event</span>:{' '}
                        <span className="text-[#9a4b1c]">"{payload.event}"</span>
                    </div>
                    {payload.timestamp && (
                        <div className="break-all">
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
                                    <div key={key} className="break-all">
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
