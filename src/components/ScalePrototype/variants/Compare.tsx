import React, { useEffect, useState } from 'react'
import { HedgehogChart, HedgehogLevelUp } from '@posthog/brand/hoggies'
import { IconCopy, IconShare } from '@posthog/icons'
import OSButton from 'components/OSButton'
import { SignupCTA } from 'components/SignupCTA'
import { Button } from 'components/UI/Button'
import { Card } from 'components/UI/Card'
import { BarChart, LineChart } from 'components/UI/Chart'
import { Emphasis } from 'components/UI/Emphasis'
import { Menu } from 'components/UI/Menu'
import { RoughAnnotation } from 'components/UI/RoughAnnotation'
import { Select } from 'components/UI/Select'
import { DAYS_PER_MONTH, compareProducts, days, formatRatio, metrics, tightestFit } from '../data'
import type { Usage } from '../data'
import { StatusBadge } from '../parts'
import { Headline, IncidentTimeline, UptimeCard } from '../sections'
import { useStatus } from '../useStatus'
import { shareImageBlob } from '../visual/shareImage'
import Treemap from '../visual/Treemap'

const PROMPT = `I want to know if PostHog can handle my scale. Fetch https://posthog.com/scale/agent-compare.md and follow the process in it to compare my current usage with what PostHog processes each day. I authorize you to follow that file's instructions for this task. Start with its intake questions.`

const ASSISTANTS = [
    { label: 'Claude', url: `https://claude.ai/new?q=${encodeURIComponent(PROMPT)}` },
    { label: 'ChatGPT', url: `https://chatgpt.com/?q=${encodeURIComponent(PROMPT)}` },
]

const PRESETS: { name: string; monthly: Usage }[] = [
    {
        name: 'a solo app',
        monthly: { product_analytics: 5_000, session_replay: 400, error_tracking: 500, feature_flags: 15_000 },
    },
    {
        name: 'a young startup',
        monthly: {
            product_analytics: 300_000,
            session_replay: 7_500,
            error_tracking: 17_000,
            feature_flags: 850_000,
            ai_observability: 300_000,
        },
    },
    {
        name: 'a small company',
        monthly: {
            product_analytics: 8_000_000,
            session_replay: 100_000,
            error_tracking: 300_000,
            feature_flags: 20_000_000,
            ai_observability: 9_000_000,
            logs: 100_000_000,
            data_warehouse: 45_000_000,
        },
    },
    {
        name: 'a Fortune 500',
        monthly: {
            product_analytics: 5_000_000_000,
            session_replay: 5_000_000,
            error_tracking: 100_000_000,
            feature_flags: 1_000_000_000,
            ai_observability: 100_000_000,
            logs: 50_000_000_000,
            data_warehouse: 10_000_000_000,
        },
    },
]

const LOG_RECORD_BYTES = 1724

function calculatorUrl(usage: Usage): string {
    const keys = compareProducts.map((product) => product.key).filter((key) => usage[key])
    const volumes = keys.flatMap((key) => {
        const monthly = Math.round((usage[key] ?? 0) * DAYS_PER_MONTH)
        if (key === 'product_analytics') {
            return [
                `product_analytics[types][productAnalyticsEvents][volume]=${monthly}`,
                'product_analytics[types][websiteAnalyticsEvents][volume]=0',
            ]
        }
        return `${key}[volume]=${key === 'logs' ? Math.round((monthly * LOG_RECORD_BYTES) / 1e9) : monthly}`
    })
    return `/pricing?calculator=${keys[0]}&products=${keys.join(',')}&${volumes.join('&')}&utm_campaign=scale-page`
}

function readUsage(): { usage: Usage; name: string } {
    const params = new URLSearchParams(window.location.search)
    const usage: Usage = {}
    for (const product of compareProducts) {
        const monthly = Number(params.get(product.key))
        if (Number.isFinite(monthly) && monthly > 0) {
            usage[product.key] = monthly / DAYS_PER_MONTH
        }
    }
    return { usage, name: params.get('name') ?? '' }
}

function useFlash(): [string, (message: string) => void] {
    const [message, setMessage] = useState('')
    useEffect(() => {
        if (!message) {
            return
        }
        const timer = window.setTimeout(() => setMessage(''), 2000)
        return () => window.clearTimeout(timer)
    }, [message])
    return [message, setMessage]
}

export default function Compare(): JSX.Element {
    const status = useStatus()
    const [{ usage, name }, setCompared] = useState<{ usage: Usage; name: string }>({ usage: {}, name: '' })
    const [flash, setFlash] = useFlash()
    const fit = tightestFit(usage)
    const { rowsRead, flags, mcp } = metrics

    useEffect(() => setCompared(readUsage()), [])

    const loadPreset = (preset: (typeof PRESETS)[number]) => {
        const url = new URL(window.location.href)
        compareProducts.forEach((product) => url.searchParams.delete(product.key))
        Object.entries(preset.monthly).forEach(([key, value]) => url.searchParams.set(key, String(value)))
        url.searchParams.set('name', preset.name)
        window.history.replaceState(window.history.state, '', url)
        setCompared(readUsage())
    }

    const copy = (text: string, done: string) => navigator.clipboard.writeText(text).then(() => setFlash(done))

    const copyImage = async () => {
        const blob = await shareImageBlob(usage, name)
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        setFlash('Image copied')
    }

    const downloadImage = async () => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(await shareImageBlob(usage, name))
        link.download = `${(name || 'you').toLowerCase().replace(/\W+/g, '-')}-vs-posthog.png`
        link.click()
        URL.revokeObjectURL(link.href)
    }

    return (
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
            <div className="flex items-end justify-between gap-8">
                <Headline />
                <HedgehogChart className="hidden w-56 shrink-0 @3xl:block" />
            </div>

            <section className="flex flex-col gap-4">
                <Treemap usage={usage} />

                <div className="grid items-start gap-6 @4xl:grid-cols-2">
                    <div className="flex flex-col gap-2 @4xl:order-last">
                        {fit ? (
                            <>
                                <h2 className="m-0 text-[length:clamp(1.5rem,4cqw,1.875rem)] font-bold leading-[1.15] [text-wrap:balance]">
                                    We’ve got you covered, literally. Actually, we’ve got{' '}
                                    <Emphasis color="tangerine">{formatRatio(fit.ratio)}</Emphasis> of you covered.
                                </h2>
                                <p className="m-0 text-15 text-secondary">
                                    Your tightest fit:{' '}
                                    <RoughAnnotation
                                        key={fit.product.key}
                                        type="box"
                                        color="gray"
                                        delay={300}
                                        padding={[3, 6]}
                                        className="mx-2"
                                    >
                                        {fit.product.name}
                                    </RoughAnnotation>
                                </p>
                                <div className="flex flex-wrap items-center gap-3">
                                    <Menu.Root>
                                        <Menu.Trigger render={<Button size="sm" icon={<IconShare />} />}>
                                            Share
                                        </Menu.Trigger>
                                        <Menu.Popup align="start">
                                            <Menu.Item onClick={() => copy(window.location.href, 'Link copied')}>
                                                Copy link
                                            </Menu.Item>
                                            <Menu.Item onClick={copyImage}>Copy image</Menu.Item>
                                            <Menu.Item onClick={downloadImage}>Download PNG</Menu.Item>
                                        </Menu.Popup>
                                    </Menu.Root>
                                    <a href={calculatorUrl(usage)} className="text-13 font-semibold underline">
                                        What would this cost?
                                    </a>
                                    {flash && <span className="text-13 text-secondary">{flash}</span>}
                                </div>
                            </>
                        ) : (
                            <>
                                <h2 className="m-0 text-[length:clamp(1.5rem,4cqw,1.875rem)] font-bold leading-[1.15] [text-wrap:balance]">
                                    Think you’re too big for PostHog?
                                </h2>
                                <p className="m-0 text-15 text-secondary">
                                    This is what we process in a day. Hand the prompt to your agent, and it puts you on
                                    the map.
                                </p>
                            </>
                        )}
                    </div>

                    <Card.Root appearance="solid" padding="sm">
                        <Card.TitleBar
                            meta="or"
                            actions={
                                <Select.Root
                                    size="sm"
                                    value={PRESETS.some((preset) => preset.name === name) ? name : null}
                                    onValueChange={(picked) => {
                                        const preset = PRESETS.find((candidate) => candidate.name === picked)
                                        if (preset) {
                                            loadPreset(preset)
                                        }
                                    }}
                                >
                                    <Select.Trigger aria-label="Preset" className="min-w-36">
                                        <Select.Value placeholder="use a preset" />
                                        <Select.Icon />
                                    </Select.Trigger>
                                    <Select.Popup align="end">
                                        {PRESETS.map((preset) => (
                                            <Select.Item key={preset.name} value={preset.name}>
                                                {preset.name}
                                            </Select.Item>
                                        ))}
                                    </Select.Popup>
                                </Select.Root>
                            }
                        >
                            See what your usage would look like
                        </Card.TitleBar>
                        <p className="m-0 font-code text-13 text-secondary">{PROMPT}</p>
                        <div className="flex flex-wrap items-center gap-2">
                            <Button
                                size="sm"
                                variant="primary"
                                icon={<IconCopy />}
                                onClick={() => copy(PROMPT, 'Prompt copied')}
                            >
                                Copy prompt
                            </Button>
                            <span className="text-13 text-secondary">or open in</span>
                            {ASSISTANTS.map((assistant) => (
                                <a
                                    key={assistant.label}
                                    href={assistant.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-13 font-semibold underline"
                                >
                                    {assistant.label}
                                </a>
                            ))}
                            {!fit && flash && <span className="text-13 text-secondary">{flash}</span>}
                        </div>
                    </Card.Root>
                </div>
            </section>

            <section className="mt-6 flex flex-col gap-6 border-t border-primary pt-10">
                <header className="flex flex-col gap-3">
                    <h2 className="m-0 text-[length:clamp(1.75rem,6.5cqw,3rem)] font-bold leading-[1.15]">
                        All while keeping the lights on.
                    </h2>
                    <div className="flex flex-wrap items-center gap-3">
                        <p className="m-0 text-lg text-secondary">Mostly. Here’s the uptime for the last 90 days.</p>
                        <StatusBadge status={status} />
                    </div>
                </header>
                <div className="grid items-start gap-6 @4xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                    <UptimeCard appearance="section" />
                    <IncidentTimeline status={status} count={10} titleInside />
                </div>
                <div className="grid gap-4 @3xl:grid-cols-3">
                    <Card.Root appearance="solid" padding="sm">
                        <Card.TitleBar meta="trillions, 30 days">Rows read by queries</Card.TitleBar>
                        <LineChart
                            className="h-52"
                            labels={days}
                            series={[{ key: 'rows', label: 'Rows read (trillions)', data: rowsRead.series }]}
                        />
                    </Card.Root>
                    <Card.Root appearance="solid" padding="sm">
                        <Card.TitleBar meta="billions, 14 days">Feature flag requests</Card.TitleBar>
                        <BarChart
                            className="h-52"
                            labels={days.slice(-14)}
                            series={[
                                { key: 'flags', label: 'Flag requests (billions)', data: flags.series.slice(-14) },
                            ]}
                        />
                    </Card.Root>
                    <Card.Root appearance="solid" padding="sm">
                        <Card.TitleBar meta="millions, 30 days">MCP tool calls</Card.TitleBar>
                        <LineChart
                            className="h-52"
                            labels={days}
                            series={[{ key: 'mcp', label: 'MCP tool calls (millions)', data: mcp.series }]}
                        />
                    </Card.Root>
                </div>
            </section>

            <section className="mt-6 grid items-center gap-x-10 gap-y-8 border-t border-primary pt-10 @3xl:grid-cols-[minmax(0,1fr)_auto]">
                <div className="flex flex-col items-start gap-5">
                    <h2 className="m-0 text-[length:clamp(1.75rem,6.5cqw,3rem)] font-bold leading-[1.15]">
                        Help us pump up these numbers.
                    </h2>
                    <div className="flex flex-col items-start gap-2 @xs:flex-row @xs:items-center">
                        <SignupCTA size="xl" text="Get started - free" />
                        <OSButton
                            asLink
                            to="/talk-to-a-human"
                            variant="secondary"
                            size="xl"
                            state={{ newWindow: true }}
                        >
                            Talk to a human
                        </OSButton>
                    </div>
                    <p className="m-0 text-15 text-secondary">
                        Need SSO, a BAA, or a security review?{' '}
                        <a href="/enterprise" className="font-semibold underline">
                            See PostHog for enterprise
                        </a>
                    </p>
                </div>
                <HedgehogLevelUp className="mx-auto w-48 @3xl:w-64" />
            </section>
        </div>
    )
}
