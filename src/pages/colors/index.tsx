import React from 'react'
import SEO from 'components/seo'
import ReaderView from 'components/ReaderView'
import { TreeMenu } from 'components/TreeMenu'
import resolveConfig from 'tailwindcss/resolveConfig'
import { internalToolsNav } from '../../navs/internalTools'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindConfig = require('../../../tailwind.config.js')

const colorNames = [
    'blue',
    'yellow',
    'teal',
    'purple',
    'coral',
    'tangerine',
    'lime',
    'green',
    'violet',
    'cobalt',
    'salmon',
]

const fullConfig = resolveConfig(tailwindConfig as any)
const themeColors = (fullConfig.theme as any).colors as Record<string, string>

function hexToHsl(hex: string): { h: number; s: number; l: number } {
    let cleaned = hex.replace('#', '')
    if (cleaned.length === 3) {
        cleaned = cleaned
            .split('')
            .map((c) => c + c)
            .join('')
    }
    const r = parseInt(cleaned.slice(0, 2), 16) / 255
    const g = parseInt(cleaned.slice(2, 4), 16) / 255
    const b = parseInt(cleaned.slice(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    const delta = max - min
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (delta !== 0) {
        s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min)
        switch (max) {
            case r:
                h = ((g - b) / delta + (g < b ? 6 : 0)) * 60
                break
            case g:
                h = ((b - r) / delta + 2) * 60
                break
            case b:
                h = ((r - g) / delta + 4) * 60
                break
        }
    }

    return {
        h: Math.round(h),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    }
}

export default function Colors(): JSX.Element {
    return (
        <>
            <SEO
                title="Colors and gradients - Internal"
                description="Preview of new colors and their paired top-to-bottom gradients."
                image={`/images/og/default.png`}
            />
            <ReaderView
                title="Colors and gradients"
                leftSidebar={<TreeMenu items={internalToolsNav} />}
                showQuestions={false}
            >
                <div className="@container text-primary">
                    <p className="mt-0 mb-6">
                        Each color is shown as a solid swatch above its paired linear gradient. Gradients run top to
                        bottom and end at the same color converted to HSL with lightness reduced by 10. Source hex
                        values come from <code>tailwind.config.js</code>.
                    </p>
                    <div className="grid grid-cols-1 @md:grid-cols-2 @2xl:grid-cols-3 gap-6">
                        {colorNames.map((name) => {
                            const hex = themeColors[name]
                            if (!hex) {
                                return (
                                    <div key={name} className="text-sm font-mono text-red">
                                        {name}: not found in tailwind config
                                    </div>
                                )
                            }
                            const { h, s, l } = hexToHsl(hex)
                            const bottomL = Math.max(l - 10, 0)
                            const gradient = `linear-gradient(to bottom, hsl(${h}, ${s}%, ${l}%), hsl(${h}, ${s}%, ${bottomL}%))`
                            return (
                                <section key={name}>
                                    <div className="flex overflow-hidden rounded-md border border-primary">
                                        <div className="aspect-square flex-1" style={{ backgroundColor: hex }} />
                                        <div
                                            className="aspect-square flex-1 border-l border-primary"
                                            style={{ background: gradient }}
                                        />
                                    </div>
                                    <div className="mt-2 flex items-baseline justify-between text-sm font-mono">
                                        <span className="capitalize text-primary">{name}</span>
                                        <span className="text-secondary">{hex.toUpperCase()}</span>
                                    </div>
                                </section>
                            )
                        })}
                    </div>
                </div>
            </ReaderView>
        </>
    )
}
