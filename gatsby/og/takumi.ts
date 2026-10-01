import fs from 'fs'
import path from 'path'
import type { ReactElement } from 'react'
import type { ImageSource, Renderer } from 'takumi-js/node'

export const OG_WIDTH = 1200
export const OG_HEIGHT = 630

export async function createTakumiRenderer(font: Buffer): Promise<Renderer> {
    const { Renderer } = await import('takumi-js/node')
    const renderer = new Renderer()
    await renderer.registerFont({
        name: 'MatterVF',
        data: font,
    })
    return renderer
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
