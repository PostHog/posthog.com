import React, { useState } from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import OSButton from 'components/OSButton'
import { OSInput, OSTextarea } from 'components/OSForm'
import { internalToolsNav } from '../../navs/internalTools'
import { useUser } from 'hooks/useUser'
import { ComparisonTable } from 'components/HogWatch/ComparisonTable'
import { exportToCSV } from 'lib/hogwatch/csv'
import type { ChannelResult } from 'lib/hogwatch/types'

async function evaluateChannels(
    channels: string[],
    defaultRate: number,
    rateOverrides?: Record<string, number>
): Promise<ChannelResult[] | null> {
    if (channels.length === 0) return null

    const res = await fetch('/api/hogwatch-evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            channels,
            defaultRate,
            rateOverrides: rateOverrides && Object.keys(rateOverrides).length ? rateOverrides : undefined,
        }),
    })
    if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || res.statusText)
    }
    const data = await res.json()
    return data.results
}

export default function HogWatchPage() {
    const { user, isModerator } = useUser()
    const [channelInput, setChannelInput] = useState('')
    const [defaultRate, setDefaultRate] = useState(500)
    const [rateOverrides, setRateOverrides] = useState<Record<string, number>>({})
    const [results, setResults] = useState<ChannelResult[] | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError(null)
        setLoading(true)
        try {
            const channels = channelInput
                .split(/[\n,]+/)
                .map((s) => s.trim())
                .filter(Boolean)
            const data = await evaluateChannels(channels, Number(defaultRate) || 500, rateOverrides)
            setResults(data ?? null)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    function handleExportCSV() {
        if (!results?.length) return
        exportToCSV(results)
    }

    if (!user || !isModerator) {
        return (
            <>
                <SEO title="HogWatch 3000 - PostHog" description="Internal CPM evaluation for YouTube channels" />
                <ReaderView
                    title="HogWatch 3000"
                    leftSidebar={<TreeMenu items={internalToolsNav} />}
                    description="Internal tool for YouTube channel CPM evaluation"
                    showQuestions={false}
                >
                    <div className="@container text-primary">
                        <div className="bg-accent p-4 rounded border border-primary mt-4">
                            <p className="mt-0 font-semibold">Access denied</p>
                            <p className="mb-0 text-muted">
                                This page is only available to logged-in moderators. Log in with your community account
                                to continue.
                            </p>
                        </div>
                    </div>
                </ReaderView>
            </>
        )
    }

    return (
        <>
            <SEO title="HogWatch 3000 - PostHog" description="Internal CPM evaluation for YouTube channels" />
            <ReaderView
                title="HogWatch 3000"
                leftSidebar={<TreeMenu items={internalToolsNav} />}
                description="A fast CPM sniff test for YouTube creators. Internal tool."
                showQuestions={false}
            >
                <div className="@container text-primary">
                    <div className="space-y-8">
                        <section>
                            <div className="bg-accent p-4 rounded border border-primary mt-4">
                                <p className="mt-0">
                                    A fast CPM sniff test for YouTube creators. Public data, finite API.
                                </p>
                            </div>
                        </section>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <section className="space-y-3">
                                <OSTextarea
                                    label="Channels"
                                    direction="column"
                                    width="full"
                                    rows={5}
                                    description="URLs or @handles, one per line or comma-separated"
                                    placeholder={'@MrBeast\nhttps://youtube.com/@AnotherChannel\nUC...'}
                                    value={channelInput}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                        setChannelInput(e.target.value)
                                    }
                                />
                            </section>

                            <section className="space-y-2 border-t border-primary pt-6">
                                <OSInput
                                    label="Default rate ($ per video)"
                                    type="number"
                                    size="md"
                                    width="fit"
                                    direction="column"
                                    value={defaultRate}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setDefaultRate(Number(e.target.value) || 500)
                                    }
                                    description="Override per channel in the table after you run the evaluation."
                                    min={1}
                                    step={1}
                                />
                            </section>

                            {error && (
                                <div className="rounded border border-primary bg-accent px-4 py-3 text-sm text-red">
                                    {error}
                                </div>
                            )}

                            <div className="flex flex-wrap items-center gap-3 border-t border-primary pt-6">
                                <OSButton type="submit" size="md" variant="primary" disabled={loading}>
                                    {loading ? 'Evaluating…' : 'Evaluate channels'}
                                </OSButton>
                                {results?.length ? (
                                    <OSButton type="button" size="md" variant="secondary" onClick={handleExportCSV}>
                                        Export CSV
                                    </OSButton>
                                ) : null}
                            </div>
                        </form>

                        {results?.length ? (
                            <div className="mt-10">
                                <ComparisonTable
                                    results={results}
                                    defaultRate={defaultRate}
                                    rateOverrides={rateOverrides}
                                    onRateOverride={(channelId, rate) => {
                                        setRateOverrides((prev) => ({ ...prev, [channelId]: rate }))
                                    }}
                                    onReRun={async (overrides) => {
                                        setError(null)
                                        setLoading(true)
                                        try {
                                            const channels = channelInput
                                                .split(/[\n,]+/)
                                                .map((s) => s.trim())
                                                .filter(Boolean)
                                            const data = await evaluateChannels(
                                                channels,
                                                Number(defaultRate) || 500,
                                                overrides
                                            )
                                            setResults(data ?? null)
                                        } finally {
                                            setLoading(false)
                                        }
                                    }}
                                />
                            </div>
                        ) : null}
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
