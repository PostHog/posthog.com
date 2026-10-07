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

// One renderer is shared, so Takumi cards render one at a time.
export const ogRenderLimit = pLimit(1)

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

const ROLE_FONT_SIZE = 72
const ROLE_MAX_WIDTH = 730

// Shrink a long title so it stays on one line at the same width as a short one.
export async function fitRoleFontSize(renderer: Renderer, role: string): Promise<number> {
    const { fromJsx } = createRequire(require.resolve('takumi-js'))('@takumi-rs/helpers/jsx')
    const { node } = await fromJsx({
        type: 'div',
        props: {
            style: {
                display: 'flex',
                fontFamily: 'RoundHog',
                fontSize: ROLE_FONT_SIZE,
                fontWeight: 800,
                whiteSpace: 'nowrap',
            },
            children: role,
        },
    })
    const measured = await renderer.measure(node)
    if (measured.width <= ROLE_MAX_WIDTH) return ROLE_FONT_SIZE
    return Math.floor((ROLE_FONT_SIZE * ROLE_MAX_WIDTH) / measured.width)
}

export async function renderOgJpeg(renderer: Renderer, element: ReactElement, images?: ImageSource[]): Promise<Buffer> {
    const { render } = await import('takumi-js')
    const bytes = await render(element, {
        renderer,
        width: OG_WIDTH,
        height: OG_HEIGHT,
        format: 'jpeg',
        quality: 100,
        images,
    })
    return Buffer.from(bytes)
}

export function writeOgJpeg(dir: string, slug: string, bytes: Buffer) {
    const imagePath = path.join(dir, `${slug.replace(/\//g, '')}.jpeg`)
    fs.writeFileSync(imagePath, bytes)
    console.log(`Created OG image: ${path.basename(imagePath)}`)
}
