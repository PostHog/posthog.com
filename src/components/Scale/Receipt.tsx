import React, { useEffect, useRef, useState } from 'react'
import { Card } from 'components/UI/Card'
import { Emphasis } from 'components/UI/Emphasis'
import { SNAPSHOT_DAY, formatCount, lines, rowsReadSeries } from './data'
import type { LineKey } from './data'
import Odometer from './Odometer'
import './receipt.css'

const SECONDS_PER_DAY = 86400

export const PANEL_ID = 'scale-panel'

export const tabId = (key: LineKey): string => `scale-tab-${key}`

const KEY_STEPS: Record<string, number | 'first' | 'last'> = {
    ArrowDown: 1,
    ArrowRight: 1,
    ArrowUp: -1,
    ArrowLeft: -1,
    Home: 'first',
    End: 'last',
}

const rule = 'border-t border-dashed border-[rgb(var(--text-primary)/0.4)]'

const happenedPerSecond = lines.reduce((sum, line) => sum + line.yesterday, 0) / SECONDS_PER_DAY

function happenedToday(): number {
    const now = new Date()
    const midnight = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    return ((now.getTime() - midnight) / 1000) * happenedPerSecond
}

function Barcode({ values }: { values: number[] }): JSX.Element {
    const max = Math.max(...values)
    return (
        <div className="flex h-11 items-stretch gap-[3px]" aria-hidden>
            {values.map((value, index) => (
                <div key={index} className="flex flex-1 flex-col justify-end bg-[rgb(var(--text-primary)/0.12)]">
                    <div className="bg-brand-blue" style={{ height: `${(value / max) * 100}%` }} />
                </div>
            ))}
        </div>
    )
}

export default function Receipt({
    selected,
    rotating,
    rotateSeconds,
    onSelect,
    onAdvance,
    className = '',
}: {
    selected: LineKey
    rotating: boolean
    rotateSeconds: number
    onSelect: (key: LineKey) => void
    onAdvance: () => void
    className?: string
}): JSX.Element {
    const rows = useRef<Partial<Record<LineKey, HTMLButtonElement | null>>>({})

    const moveWithKeys = (event: React.KeyboardEvent) => {
        const step = KEY_STEPS[event.key]
        if (step === undefined) {
            return
        }
        event.preventDefault()
        const current = lines.findIndex((line) => line.key === selected)
        const target =
            step === 'first' ? 0 : step === 'last' ? lines.length - 1 : (current + step + lines.length) % lines.length
        const key = lines[target].key
        onSelect(key)
        rows.current[key]?.focus()
    }
    const [highlight, setHighlight] = useState<{ top: number; height: number } | null>(null)

    useEffect(() => {
        const row = rows.current[selected]
        if (row) {
            setHighlight({ top: row.offsetTop, height: row.offsetHeight })
        }
    }, [selected])

    return (
        <div className={`scale-receipt w-full max-w-sm ${className}`}>
            <Card.Root
                appearance="solid"
                className="scale-receipt-paper gap-3 px-8 font-code text-sm dark:bg-white dark:[background-image:none]"
            >
                <div className={rule} />
                <div className="text-center">
                    <div className="font-sans text-3xl font-semibold text-secondary">PostHog Cloud</div>
                    <div className="text-13 text-secondary">US + EU · open 24 hours</div>
                    <div className="text-13 text-secondary">{SNAPSHOT_DAY}</div>
                </div>
                <div className={rule} />
                <div
                    role="tablist"
                    aria-label="Yesterday on PostHog Cloud"
                    aria-orientation="vertical"
                    onKeyDown={moveWithKeys}
                    className="relative -mx-3 flex flex-col gap-1"
                >
                    {highlight && (
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 top-0 rounded bg-[rgb(var(--text-primary)/0.08)] transition-[transform,height] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
                            style={{ transform: `translateY(${highlight.top}px)`, height: highlight.height }}
                        />
                    )}
                    {lines.map((line) => {
                        const active = line.key === selected
                        return (
                            <button
                                key={line.key}
                                type="button"
                                role="tab"
                                id={tabId(line.key)}
                                aria-selected={active}
                                aria-controls={PANEL_ID}
                                tabIndex={active ? 0 : -1}
                                ref={(element) => {
                                    rows.current[line.key] = element
                                }}
                                onClick={() => onSelect(line.key)}
                                className={`relative isolate flex flex-col overflow-hidden rounded px-3 py-1.5 text-left transition-colors ${
                                    active ? '' : 'hover:bg-[rgb(var(--text-primary)/0.04)]'
                                }`}
                            >
                                <span className="flex w-full items-baseline gap-2">
                                    <span className="min-w-0 flex-1 truncate uppercase">{line.item}</span>
                                    <span className="shrink-0 font-bold tabular-nums">
                                        {formatCount(line.yesterday)}
                                    </span>
                                </span>
                                <span className="truncate text-13 text-secondary">{line.note}</span>
                                {active && rotating && (
                                    <span
                                        key={line.key}
                                        aria-hidden
                                        className="scale-receipt-progress absolute inset-0 -z-10 bg-[rgb(var(--text-primary)/0.06)]"
                                        style={{ animationDuration: `${rotateSeconds}s` }}
                                        onAnimationEnd={onAdvance}
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>
                <div className={rule} />
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between gap-2">
                        <span className="font-bold">TOTAL</span>
                        <Emphasis className="text-lg font-bold dark:bg-brand-blue/15 dark:text-[color:color-mix(in_srgb,theme(colors.brand.blue.darker)_76%,black)]">
                            <Odometer read={happenedToday} rate={happenedPerSecond} />
                        </Emphasis>
                    </div>
                    <span className="self-end text-13 text-secondary">so far today, estimated</span>
                </div>
                <div className={rule} />
                <Barcode values={rowsReadSeries} />
                <div className="text-center text-13 text-secondary">30 days of rows read, as a barcode</div>
                <div className="scale-receipt-scrawl -rotate-3 text-center text-3xl leading-none text-primary">
                    Thank you for your data
                </div>
            </Card.Root>
        </div>
    )
}
