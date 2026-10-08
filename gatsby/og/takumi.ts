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

const ROLE_FONT_SIZE = 120
// Keep in sync with the title width and line height in src/templates/OG/job.tsx.
const ROLE_COLUMN_WIDTH = 720
const ROLE_LINE_HEIGHT = 0.94
const ROLE_MAX_LINES = 2

// Largest size that wraps to at most two lines in the title column.
export async function fitRoleFontSize(renderer: Renderer, role: string): Promise<number> {
    const { fromJsx } = createRequire(require.resolve('takumi-js'))('@takumi-rs/helpers/jsx')
    const lineCount = async (fontSize: number) => {
        const { node } = await fromJsx({
            type: 'div',
            props: {
                style: {
                    display: 'flex',
                    width: ROLE_COLUMN_WIDTH,
                    fontFamily: 'RoundHog',
                    fontSize,
                    fontWeight: 800,
                    lineHeight: `${Math.round(fontSize * ROLE_LINE_HEIGHT)}px`,
                },
                children: role,
            },
        })
        const measured = await renderer.measure(node)
        const lineHeight = Math.round(fontSize * ROLE_LINE_HEIGHT)
        return Math.round(measured.height / lineHeight)
    }

    let low = 48
    let high = ROLE_FONT_SIZE
    let best = low
    while (low <= high) {
        const mid = Math.floor((low + high) / 2)
        if ((await lineCount(mid)) <= ROLE_MAX_LINES) {
            best = mid
            low = mid + 1
        } else {
            high = mid - 1
        }
    }
    return best
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
