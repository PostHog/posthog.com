import fs from 'fs'
import { Handler } from '@netlify/functions'
import satori from 'satori'
import { Resvg, initWasm } from '@resvg/resvg-wasm'

const handler: Handler = async (event, context) => {
    await initWasm(fs.readFileSync('./netlify/functions/og/index_bg.wasm'))

    const font = fs.readFileSync('./netlify/functions/og/MatterSQVF.otf')

    const svg = await satori(
        {
            type: 'div',
            props: {
                children: 'hello, world',
                style: { color: 'red' },
            },
        },
        {
            width: 500,
            height: 500,
            fonts: [
                {
                    name: 'MatterVF',
                    data: font,
                    weight: 400,
                    style: 'normal',
                },
            ],
        }
    )

    const resvg = new Resvg(svg)
    const pngData = resvg.render()
    const pngBuffer = pngData.asPng()

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/png',
        },
        isBase64Encoded: true,
        body: Buffer.from(pngBuffer).toString('base64'),
    }
}

export { handler }
