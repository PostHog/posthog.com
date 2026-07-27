import React, { useMemo, useState } from 'react'
import CloudinaryImage from 'components/CloudinaryImage'
import Link from 'components/Link'
import Input from 'components/OSForm/input'
import { ToggleGroup } from 'components/RadixUI/ToggleGroup'
import mcpToolsData from '../../../../data/mcp-tools.json'
import { LabeledList } from '../helpers'
import type { SectionComponentProps } from '../types'

const firstLine = (s: string) => s.split('\n')[0]

/** Opens PostHog AI pre-filled (and auto-submitted) with the prompt. */
const maxPromptUrl = (prompt: string) => `https://app.posthog.com/#panel=max:!${encodeURIComponent(prompt)}`

interface PromptGroup {
    title: string
    tool?: string
    prompts: string[]
}

interface McpTool {
    name: string
    summary: string
    description: string
}

const AskAnything = ({ id, productData }: SectionComponentProps) => {
    const ai = productData?.ai
    const groups: PromptGroup[] = ai?.groups ?? []
    const mcpFeatures: string[] = ai?.mcpFeatures ?? []
    const [tab, setTab] = useState<'prompts' | 'tools'>('prompts')
    const [query, setQuery] = useState('')

    const productTools: McpTool[] = useMemo(() => {
        if (!mcpFeatures.length) return []
        const featureSet = new Set(mcpFeatures)
        return (mcpToolsData.categories ?? [])
            .filter((c: any) => featureSet.has(c.feature))
            .flatMap((c: any) => (c.tools as McpTool[]) ?? [])
    }, [mcpFeatures])

    const filteredTools = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return productTools
        return productTools.filter(
            (t) =>
                t.name.toLowerCase().includes(q) ||
                t.summary.toLowerCase().includes(q) ||
                t.description.toLowerCase().includes(q)
        )
    }, [query, productTools])

    if (!groups.length) return null

    return (
        <section id={id} className="scroll-mt-20 not-prose">
            <h2 className="mb-3">AI prompts</h2>
            {ai?.intro && (
                <p className="text-base text-secondary mb-4">
                    {ai.intro} Works in{' '}
                    <Link to="/ai" state={{ newWindow: true }} className="font-semibold underline">
                        PostHog AI
                    </Link>{' '}
                    (in-app chat),{' '}
                    <Link to="/desktop" state={{ newWindow: true }} className="font-semibold underline">
                        PostHog Desktop
                    </Link>{' '}
                    (our AI code editor), and in your product editor (using the MCP). Already signed in? Click a prompt
                    to try it.
                </p>
            )}
            <ToggleGroup
                title="View"
                hideTitle
                value={tab}
                onValueChange={(value) => {
                    if (value === 'prompts' || value === 'tools') setTab(value)
                }}
                options={[
                    { label: 'Example prompts', value: 'prompts', default: true },
                    { label: 'Tools', value: 'tools' },
                ]}
                className="mb-4 max-w-sm"
            />
            <div className="@container bg-primary rounded shadow-2xl p-4 @2xl/reader-content:p-8 @4xl/reader-content:p-10">
                <div className="flex-1 min-w-0 w-full">
                    {tab === 'prompts' && (
                        <>
                            {ai?.image && (
                                <aside className="w-36 mx-auto mb-4 @lg:ml-4 @lg:mr-0 @lg:float-right @lg:w-28 @xl:w-40 @2xl:w-48 @6xl:w-56 @xl:ml-8 transition-all">
                                    <CloudinaryImage
                                        src={ai.image}
                                        alt={ai.imageAlt || 'Ask PostHog anything'}
                                        className="w-full"
                                    />
                                </aside>
                            )}
                            <div className="space-y-6">
                                {groups.map((g) => (
                                    <div key={g.title}>
                                        <h3 className="text-base mb-3 flex flex-wrap items-baseline gap-x-2 border-b border-primary pb-1">
                                            <span>{g.title}</span>
                                            {g.tool && (
                                                <span className="text-xs font-mono font-normal text-secondary">
                                                    {g.tool}
                                                </span>
                                            )}
                                        </h3>
                                        <ul className="list-none pl-0 m-0 space-y-1 text-sm text-secondary italic leading-relaxed">
                                            {g.prompts.map((p) => (
                                                <li key={p}>
                                                    <Link
                                                        to={maxPromptUrl(p)}
                                                        externalNoIcon
                                                        className="text-secondary hover:text-primary underline-offset-2 hover:underline"
                                                    >
                                                        &ldquo;{p}&rdquo;
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {tab === 'tools' && (
                        <>
                            <div className="mb-4">
                                <Input
                                    label="Search tools"
                                    name="ask-anything-tool-search"
                                    showLabel={false}
                                    direction="column"
                                    placeholder="Search..."
                                    value={query}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                                    showClearButton
                                    onClear={() => setQuery('')}
                                />
                            </div>
                            <div className="@container">
                                {filteredTools.length === 0 ? (
                                    <p className="text-sm text-secondary italic m-0">No tools match your search.</p>
                                ) : (
                                    <LabeledList
                                        items={filteredTools.map((t) => ({
                                            label: <p className="text-xs font-mono font-normal">{t.name}</p>,
                                            description: (
                                                <>
                                                    <strong className="block text-primary mb-1">{t.summary}</strong>
                                                    {firstLine(t.description)}
                                                </>
                                            ),
                                        }))}
                                    />
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}

export default AskAnything
