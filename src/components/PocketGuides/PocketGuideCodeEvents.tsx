import React from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import { IconCopy } from '@posthog/icons'
import { useAppSettings } from '../../context/App'
import { darkTheme, lightTheme } from 'components/CodeBlock/theme'

type EventRow = {
    clicked: string
    recorded: string
    mismatch?: boolean
}

type PocketGuideCodeEventsProps = {
    code: string
    language: Language
    eventName: string
    recordedLabel: string
    events: EventRow[]
}

const languageLabels: Partial<Record<Language, string>> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    jsx: 'JSX',
    tsx: 'TSX',
    python: 'Python',
    bash: 'Bash',
    json: 'JSON',
}

export default function PocketGuideCodeEvents({
    code,
    language,
    eventName,
    recordedLabel,
    events,
}: PocketGuideCodeEventsProps): JSX.Element {
    const { siteSettings } = useAppSettings()
    const [copied, setCopied] = React.useState(false)
    const languageLabel = languageLabels[language] || language.charAt(0).toUpperCase() + language.slice(1)

    const copyCode = async (): Promise<void> => {
        await navigator.clipboard.writeText(code)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1500)
    }

    return (
        <div className="@container not-prose my-4">
            <div className="grid overflow-hidden rounded border border-primary bg-primary text-primary @2xl:grid-cols-2">
                <section className="min-w-0" aria-label={`${languageLabel} tracking code`}>
                    <div className="flex h-14 items-center justify-between gap-2 border-b border-primary bg-accent px-3 py-2 dark:bg-accent-dark">
                        <span className="text-sm font-bold">{languageLabel}</span>
                        <button
                            type="button"
                            onClick={copyCode}
                            aria-label={copied ? 'Copied code' : 'Copy code'}
                            className="flex items-center gap-1 rounded px-1.5 py-1 text-xs text-secondary hover:bg-primary hover:text-primary"
                        >
                            <IconCopy className="size-3.5" aria-hidden="true" />
                            {copied ? 'Copied' : 'Copy'}
                        </button>
                    </div>
                    <Highlight
                        {...defaultProps}
                        code={code}
                        language={language}
                        theme={siteSettings.theme === 'dark' ? darkTheme : lightTheme}
                    >
                        {({ tokens, getLineProps, getTokenProps }) => (
                            <pre className="m-0 whitespace-pre-wrap break-words p-4 font-code text-sm leading-relaxed">
                                {tokens.map((line, index) => {
                                    const { key, ...lineProps } = getLineProps({ line })
                                    return (
                                        <div key={key ?? index} {...lineProps}>
                                            {line.map((token, tokenIndex) => {
                                                const { key, ...tokenProps } = getTokenProps({ token })
                                                return <span key={key ?? tokenIndex} {...tokenProps} />
                                            })}
                                        </div>
                                    )
                                })}
                            </pre>
                        )}
                    </Highlight>
                </section>

                <section
                    className="min-w-0 border-t border-primary @2xl:border-l @2xl:border-t-0"
                    aria-label="Simulated events"
                >
                    <div className="flex h-14 flex-col justify-center border-b border-primary bg-accent px-3 py-2 dark:bg-accent-dark">
                        <span className="text-sm font-bold">Simulated events</span>
                        <span className="font-code text-xs text-secondary">{eventName}</span>
                    </div>
                    <table className="w-full border-collapse text-left text-xs">
                        <caption className="sr-only">
                            Example events produced by the {languageLabel} tracking code
                        </caption>
                        <thead>
                            <tr className="text-secondary">
                                <th scope="col" className="w-2/5 px-3 py-2 font-semibold">
                                    Clicked filter
                                </th>
                                <th scope="col" className="px-3 py-2 font-semibold">
                                    {recordedLabel}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map(({ clicked, recorded, mismatch }) => (
                                <tr
                                    key={clicked}
                                    className={`border-t border-primary ${mismatch ? 'bg-[#FF474D]/10' : ''}`}
                                >
                                    <td className="px-3 py-2">{clicked}</td>
                                    <td className="px-3 py-2">
                                        <span className="font-code">{recorded}</span>
                                        {mismatch && (
                                            <span className="ml-2 font-semibold text-[#F00008] dark:text-[#FF474D]">
                                                Mismatch
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    )
}
