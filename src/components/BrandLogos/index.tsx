import React, { useRef } from 'react'
import { Logo } from '@posthog/brand/logo'
import type { LogoProps } from '@posthog/brand/logo'

// Renders the PostHog logo lockups live from the @posthog/brand library (the single source of
// truth for the mark) and lets people download each one as SVG or PNG — serialized straight
// from the rendered <Logo>, so nothing is pre-baked into static files that can drift.

interface Lockup {
    slug: string
    name: string
    logo: LogoProps
    /** Preview background — logos ship transparent, shown here on a solid color. */
    background: string
    /** Preview width in px (height follows the lockup's aspect ratio). */
    previewWidth: number
    /** Center the unmodified mark on a transparent square canvas. */
    square?: boolean
}

const LOCKUPS: Lockup[] = [
    {
        slug: 'posthog-logo',
        name: 'Standard logo',
        logo: { layout: 'landscape', variant: 'gradient' },
        background: '#EEEFE9',
        previewWidth: 180,
    },
    {
        slug: 'posthog-logo-white',
        name: 'Light logo',
        logo: { layout: 'landscape', variant: 'mono', color: '#fff' },
        background: '#111',
        previewWidth: 180,
    },
    {
        slug: 'posthog-logo-4-color',
        name: 'Print (4-color)',
        logo: { layout: 'landscape', variant: 'print' },
        background: '#EEEFE9',
        previewWidth: 180,
    },
    {
        slug: 'posthog-logo-black',
        name: 'Dark logo',
        logo: { layout: 'landscape', variant: 'mono', color: '#111' },
        background: '#EEEFE9',
        previewWidth: 180,
    },
    {
        slug: 'posthog-logomark',
        name: 'Logomark',
        logo: { layout: 'logomark', variant: 'gradient' },
        background: '#EEEFE9',
        previewWidth: 64,
    },
    {
        slug: 'posthog-logomark-white',
        name: 'Light logomark',
        logo: { layout: 'logomark', variant: 'mono', color: '#fff' },
        background: '#111',
        previewWidth: 64,
    },
    {
        slug: 'posthog-logomark-square',
        name: 'Square logomark',
        logo: { layout: 'logomark', variant: 'gradient' },
        background: '#EEEFE9',
        previewWidth: 64,
        square: true,
    },
    {
        slug: 'posthog-logomark-square-white',
        name: 'Light square logomark',
        logo: { layout: 'logomark', variant: 'mono', color: '#fff' },
        background: '#111',
        previewWidth: 64,
        square: true,
    },
    {
        slug: 'posthog-logo-stacked',
        name: 'Logo (stacked)',
        logo: { layout: 'stacked', variant: 'gradient' },
        background: '#EEEFE9',
        previewWidth: 110,
    },
    {
        slug: 'posthog-logo-stacked-white',
        name: 'Light logo (stacked)',
        logo: { layout: 'stacked', variant: 'mono', color: '#fff' },
        background: '#111',
        previewWidth: 110,
    },
]

const PX_PER_UNIT = 6 // rasterized pixels per viewBox unit at 1x (@2x doubles it)
const PAD_FRACTION = 0.18 // transparent margin, as a fraction of the shorter viewBox side
const SQUARE_PADDING = 4 // 52-unit-wide logomark centered on the same 60 × 60 canvas as /brand

/** Serialize a rendered <Logo> to a standalone SVG string, optionally with padding. */
function serializeSvg(source: SVGSVGElement, padded: boolean, square = false): string {
    const svg = source.cloneNode(true) as SVGSVGElement
    // mono lockups draw with `currentColor` + an inline `color`; bake it into an explicit
    // fill so the downloaded file renders correctly on its own.
    const color = svg.style.color
    if (color) {
        svg.innerHTML = svg.innerHTML.replaceAll('currentColor', color)
    }
    svg.removeAttribute('style')
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    const vb = source.viewBox.baseVal
    let { x, y, width, height } = vb
    if (square) {
        const size = Math.max(width, height) + SQUARE_PADDING * 2
        x -= (size - width) / 2
        y -= (size - height) / 2
        width = size
        height = size
    }
    if (padded) {
        const pad = Math.min(width, height) * PAD_FRACTION
        x -= pad
        y -= pad
        width += pad * 2
        height += pad * 2
    }
    svg.setAttribute('viewBox', `${x} ${y} ${width} ${height}`)
    svg.setAttribute('width', String(Math.round(width)))
    svg.setAttribute('height', String(Math.round(height)))
    return new XMLSerializer().serializeToString(svg)
}

function triggerDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
}

function downloadSvg(source: SVGSVGElement, slug: string, padded: boolean, square = false): void {
    const svg = serializeSvg(source, padded, square)
    triggerDownload(new Blob([svg], { type: 'image/svg+xml' }), `${slug}${padded ? '-padded' : ''}.svg`)
}

async function downloadPng(
    source: SVGSVGElement,
    slug: string,
    scale: number,
    padded: boolean,
    square = false
): Promise<void> {
    const svg = serializeSvg(source, padded, square)
    const match = svg.match(/viewBox="([\d.-]+) ([\d.-]+) ([\d.-]+) ([\d.-]+)"/)
    if (!match) return
    const width = Number(match[3])
    const height = Number(match[4])
    const targetW = Math.round(width * PX_PER_UNIT * scale)
    const targetH = Math.round(height * PX_PER_UNIT * scale)

    const image = new Image()
    image.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
    await new Promise<void>((resolve, reject) => {
        image.onload = () => resolve()
        image.onerror = () => reject(new Error('Failed to render logo'))
    })

    const canvas = document.createElement('canvas')
    canvas.width = targetW
    canvas.height = targetH
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.drawImage(image, 0, 0, targetW, targetH)

    await new Promise<void>((resolve) =>
        canvas.toBlob((blob) => {
            if (blob) triggerDownload(blob, `${slug}${padded ? '-padded' : ''}${scale > 1 ? '@2x' : ''}.png`)
            resolve()
        }, 'image/png')
    )
}

function DownloadLink({ label, onClick }: { label: string; onClick: () => void }): JSX.Element {
    return (
        <button
            type="button"
            onClick={onClick}
            className="text-red dark:text-yellow font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer text-[15px]"
        >
            {label}
        </button>
    )
}

function LockupCard({ lockup }: { lockup: Lockup }): JSX.Element {
    const ref = useRef<SVGSVGElement>(null)
    const withRef = (fn: (svg: SVGSVGElement) => void) => () => {
        if (ref.current) fn(ref.current)
    }

    return (
        <div className="border border-primary/20 dark:border-primary-dark/20 rounded p-4 flex flex-col gap-3">
            <div
                className="flex items-center justify-center rounded p-4 min-h-[96px]"
                style={{ background: lockup.background }}
            >
                <div
                    className={
                        lockup.square
                            ? 'border border-dashed flex items-center justify-center'
                            : 'flex items-center justify-center'
                    }
                    style={
                        lockup.square
                            ? {
                                  width: lockup.previewWidth,
                                  height: lockup.previewWidth,
                                  borderColor: lockup.background === '#111' ? '#ffffff33' : '#11111133',
                              }
                            : undefined
                    }
                >
                    <Logo
                        {...lockup.logo}
                        ref={ref}
                        size={lockup.square ? (lockup.previewWidth * 52) / 60 : lockup.previewWidth}
                        title="PostHog logo"
                    />
                </div>
            </div>
            <div>
                <p className="font-semibold m-0">{lockup.name}</p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                    <DownloadLink
                        label="SVG"
                        onClick={withRef((s) => downloadSvg(s, lockup.slug, false, lockup.square))}
                    />
                    <DownloadLink
                        label="PNG"
                        onClick={withRef((s) => downloadPng(s, lockup.slug, 1, false, lockup.square))}
                    />
                    <DownloadLink
                        label="PNG @2x"
                        onClick={withRef((s) => downloadPng(s, lockup.slug, 2, false, lockup.square))}
                    />
                    <DownloadLink
                        label="PNG (padded)"
                        onClick={withRef((s) => downloadPng(s, lockup.slug, 1, true, lockup.square))}
                    />
                    <DownloadLink
                        label="PNG (padded) @2x"
                        onClick={withRef((s) => downloadPng(s, lockup.slug, 2, true, lockup.square))}
                    />
                </div>
            </div>
        </div>
    )
}

export function BrandLogos(): JSX.Element {
    return (
        <div className="@container">
            <div className="grid grid-cols-1 @md:grid-cols-2 gap-4 my-4 not-prose">
                {LOCKUPS.map((lockup) => (
                    <LockupCard key={lockup.slug} lockup={lockup} />
                ))}
            </div>
        </div>
    )
}

export default BrandLogos
