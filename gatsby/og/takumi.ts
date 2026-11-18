import fs from 'fs'
import path from 'path'
import { createRequire } from 'module'
import pLimit from 'p-limit'
import type { ReactElement } from 'react'
import type { ImageSource, Renderer } from 'takumi-js/node'

const require = createRequire(__filename)

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

// Same weight scale as src/components/Layout/Fonts.css: SemiBold is 700, Bold is 800.
// 600 is also SemiBold so a request for 600 does not fall back to Regular.
const roundHogFaces = [
    { file: 'RoundHog.woff2', weight: 400 },
    { file: 'RoundHog-Medium.woff2', weight: 500 },
    { file: 'RoundHog-SemiBold.woff2', weight: 600 },
    { file: 'RoundHog-SemiBold.woff2', weight: 700 },
    { file: 'RoundHog-Bold.woff2', weight: 800 },
]

export async function createTakumiRenderer(): Promise<Renderer> {
    const { Renderer } = await import('takumi-js/node')
    const renderer = new Renderer()
    for (const face of roundHogFaces) {
        await renderer.registerFont({
            name: 'RoundHog',
            data: fs.readFileSync(require.resolve(`@posthog/brand/fonts/${face.file}`)),
            weight: face.weight,
        })
    }
    return renderer
}

export const ogRenderLimit = pLimit(8)

const imageFetchCache = new Map()

// Matter is a variable font. Register the weights the cards ask for.
export async function registerMatterFont(renderer: Renderer, data: Buffer) {
    for (const weight of [400, 600, 700]) {
        await renderer.registerFont({
            name: 'MatterVF',
            data,
            weight,
        })
    }
}

const ROLE_FONT_SIZE = 108
// Keep in sync with the title width and line height in src/templates/OG/job.tsx.
const ROLE_COLUMN_WIDTH = 720
const ROLE_LINE_HEIGHT = 0.94
const ROLE_MAX_LINES = 2

type TitleFit = {
    max: number
    min?: number
    width: number
    lineHeight: number
    maxLines: number
}

// Largest font size in [min, max] that wraps to at most maxLines.
// Words do not scale evenly, so this measures real wraps instead of dividing the width.
// Returns null when even `min` does not fit.
export async function fitTitleFontSize(renderer: Renderer, text: string, fit: TitleFit): Promise<number | null> {
    const { fromJsx } = createRequire(require.resolve('takumi-js'))('@takumi-rs/helpers/jsx')
    const min = fit.min ?? 48
    const lines = async (fontSize: number) => {
        const { node } = await fromJsx({
            type: 'div',
            props: {
                style: {
                    display: 'flex',
                    width: fit.width,
                    fontFamily: 'RoundHog',
                    fontSize,
                    fontWeight: 800,
                    lineHeight: `${Math.round(fontSize * fit.lineHeight)}px`,
                },
                children: text,
            },
        })
        const measured = await renderer.measure(node)
        return Math.round(measured.height / Math.round(fontSize * fit.lineHeight))
    }

    let low = min
    let high = fit.max
    let best: number | null = null
    while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        if ((await lines(mid)) <= fit.maxLines) {
            best = mid
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return best
}

export async function fitRoleFontSize(renderer: Renderer, role: string) {
    return (
        (await fitTitleFontSize(renderer, role, {
            max: ROLE_FONT_SIZE,
            width: ROLE_COLUMN_WIDTH,
            lineHeight: ROLE_LINE_HEIGHT,
            maxLines: ROLE_MAX_LINES,
        })) ?? 48
    )
}

export async function renderOgJpeg(renderer: Renderer, element: ReactElement, images?: ImageSource[]): Promise<Buffer> {
    const { render } = await import('takumi-js')
    const bytes = await render(element, {
        renderer,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        format: 'jpeg',
        quality: 100,
        images: {
            sources: images,
            fetchCache: imageFetchCache,
        },
    })
    return Buffer.from(bytes)
}

export function writeOgJpeg(dir: string, slug: string, bytes: Buffer) {
    const imagePath = path.join(dir, `${slug.replace(/\//g, '')}.jpeg`)
    fs.writeFileSync(imagePath, bytes)
    console.log(`Created OG image: ${path.basename(imagePath)}`)
}
