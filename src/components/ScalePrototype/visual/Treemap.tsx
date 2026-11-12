import React, { useEffect, useRef, useState } from 'react'
import { IconChevronLeft } from '@posthog/icons'
import { IconButton } from 'components/UI/Button'
import { compareProducts, formatRatio, formatShort, uptime } from '../data'
import type { CompareKey, CompareProduct, Usage } from '../data'
import { formatUptime } from '../parts'

export type Rect = { product: CompareProduct; x: number; y: number; w: number; h: number }
type Placed<T> = { item: T; x: number; y: number; w: number; h: number }

const GAP = 3
const MIN_MARK = 6
const HEADER = 56
const BORDER = 2
const MOTION =
    'transition-[left,top,width,height,opacity] duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-reduce:transition-none'

function split<T extends { weight: number }>(
    list: T[],
    x: number,
    y: number,
    w: number,
    h: number,
    out: Placed<T>[]
): void {
    if (list.length === 1) {
        out.push({ item: list[0], x, y, w, h })
        return
    }
    const total = list.reduce((sum, item) => sum + item.weight, 0)
    let before = 0
    let cut = 0
    while (cut < list.length - 1 && before + list[cut].weight / 2 < total / 2) {
        before += list[cut].weight
        cut++
    }
    cut = Math.max(1, cut)
    const first = list.slice(0, cut)
    const share = first.reduce((sum, item) => sum + item.weight, 0) / total
    if (w >= h) {
        split(first, x, y, w * share, h, out)
        split(list.slice(cut), x + w * share, y, w * (1 - share), h, out)
    } else {
        split(first, x, y, w, h * share, out)
        split(list.slice(cut), x, y + h * share, w, h * (1 - share), out)
    }
}

export function layoutBoxes(width: number, height: number): Rect[] {
    const out: Placed<{ product: CompareProduct; weight: number }>[] = []
    split(
        compareProducts.map((product) => ({ product, weight: Math.sqrt(product.perDay) })),
        0,
        0,
        width,
        height,
        out
    )
    return out.map(({ item, ...rect }) => ({ product: item.product, ...rect }))
}

function layoutParts(
    product: CompareProduct,
    width: number,
    height: number
): Placed<{ name: string; weight: number }>[] {
    const out: Placed<{ name: string; weight: number }>[] = []
    split(
        product.parts.map(([name, weight]) => ({ name, weight })),
        0,
        0,
        width,
        height,
        out
    )
    return out
}

export function uptimeFor(product: CompareProduct): number {
    return Math.min(
        ...uptime.filter((row) => product.uptimeRows.includes(row.component)).flatMap((row) => [row.us, row.eu])
    )
}

export function markSize(share: number, w: number, h: number): { w: number; h: number; magnified: number } {
    const area = Math.min(1, share) * w * h
    const side = Math.sqrt(area)
    const trueW = side > h ? area / h : Math.min(side, w)
    const trueH = area / trueW
    const shownW = Math.max(MIN_MARK, trueW)
    const shownH = Math.max(MIN_MARK, trueH)
    return { w: shownW, h: shownH, magnified: Math.round((shownW * shownH) / area) }
}

function Magnified({ times }: { times: number }): JSX.Element | null {
    return times > 1 ? <span className="opacity-60"> (drawn ×{formatShort(times)})</span> : null
}

export default function Treemap({ usage }: { usage: Usage }): JSX.Element {
    const root = useRef<HTMLDivElement>(null)
    const [width, setWidth] = useState(0)
    const [focus, setFocus] = useState<CompareKey | null>(null)

    useEffect(() => {
        const element = root.current
        if (!element) {
            return
        }
        const observer = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width))
        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    const height = Math.round(width < 520 ? width * 1.1 : Math.min(520, Math.max(320, width * 0.48)))
    const rects = width ? layoutBoxes(width, height) : []

    return (
        <div ref={root} className="relative w-full" style={{ height }}>
            {rects.map((rect) => {
                const { product } = rect
                const focused = focus === product.key
                const hidden = focus !== null && !focused
                const box = focused ? { x: 0, y: 0, w: width, h: height } : rect
                const w = box.w - GAP * 2
                const h = box.h - GAP * 2
                const own = usage[product.key] ?? 0
                const parts = focused && product.parts.length > 0
                const mapW = w - BORDER * 2
                const mapH = h - BORDER * 2 - (parts ? HEADER : 0)
                const you = own ? markSize(own / product.perDay, mapW, mapH) : null
                const up = uptimeFor(product)
                const down = up < 100 ? markSize(1 - up / 100, mapW, mapH) : null
                const roomy = focused || (w >= 72 && h >= 44)
                return (
                    <div
                        key={product.key}
                        className={`absolute overflow-hidden border-2 border-black bg-white text-black ${MOTION}`}
                        style={{
                            left: box.x + GAP,
                            top: box.y + GAP,
                            width: w,
                            height: h,
                            opacity: hidden ? 0 : 1,
                            pointerEvents: hidden ? 'none' : undefined,
                            zIndex: focused ? 1 : 0,
                        }}
                    >
                        {parts &&
                            layoutParts(product, mapW, mapH).map((part) => {
                                const left = Math.round(part.x)
                                const top = Math.round(part.y)
                                const partW = Math.round(part.x + part.w) - left
                                const partH = Math.round(part.y + part.h) - top
                                return (
                                    <div
                                        key={part.item.name}
                                        className={`absolute overflow-hidden border-t-2 border-black p-1.5 font-code text-13 leading-tight ${
                                            left > 0 ? 'border-l-2' : ''
                                        }`}
                                        style={{ left, top: HEADER + top, width: partW, height: partH }}
                                        title={`${part.item.name}: ${formatShort(part.item.weight)}`}
                                    >
                                        {partW >= 64 && partH >= 36 && (
                                            <>
                                                <div className="truncate font-bold">{part.item.name}</div>
                                                <div className="opacity-60">{formatShort(part.item.weight)}</div>
                                            </>
                                        )}
                                    </div>
                                )
                            })}
                        {down && (
                            <div
                                className={`absolute right-0 top-0 bg-[rgb(0_0_0/0.3)] ${MOTION}`}
                                style={{ width: down.w, height: down.h }}
                            />
                        )}
                        {you && (
                            <div
                                className={`absolute bottom-0 left-0 bg-orange ${MOTION}`}
                                style={{ width: you.w, height: you.h }}
                            />
                        )}
                        {roomy && (
                            <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-2">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="min-w-0">
                                        <div
                                            className={`truncate font-bold leading-tight ${
                                                focused ? 'text-2xl' : 'text-15'
                                            }`}
                                        >
                                            {product.name}
                                        </div>
                                        <div className="font-code text-13 opacity-60">
                                            {formatShort(product.perDay)}
                                        </div>
                                    </div>
                                    {(focused || w >= 150) && (
                                        <div className="shrink-0 font-code text-13 opacity-60">
                                            {formatUptime(up)}
                                            {down && <Magnified times={down.magnified} />}
                                        </div>
                                    )}
                                </div>
                                {you && (focused || w >= 150) && (
                                    <div
                                        className="font-code text-13"
                                        style={{ paddingLeft: you.w + 4, paddingBottom: Math.max(0, you.h - 22) / 2 }}
                                    >
                                        <span className="font-bold">You</span> {formatShort(own)}
                                        <span className="opacity-60"> · 1 of {formatRatio(product.perDay / own)}</span>
                                        <Magnified times={you.magnified} />
                                    </div>
                                )}
                            </div>
                        )}
                        {focused ? (
                            <>
                                <IconButton
                                    size="sm"
                                    className="absolute bottom-2 right-2"
                                    aria-label="Back to all products"
                                    icon={<IconChevronLeft />}
                                    onClick={() => setFocus(null)}
                                />
                            </>
                        ) : (
                            <button
                                type="button"
                                className="absolute inset-0 cursor-zoom-in"
                                aria-label={`Zoom in on ${product.name}`}
                                title={`${product.name}: ${formatShort(product.perDay)}`}
                                onClick={() => setFocus(product.key)}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}
