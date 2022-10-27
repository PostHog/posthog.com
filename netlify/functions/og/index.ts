import fs from 'fs'
import { Handler } from '@netlify/functions'
import satori from 'satori'

const handler: Handler = async (event, context) => {
    // console.log(fs.readdirSync('./netlify/functions/og/'))
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

    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'image/svg+xml',
        },
        body: svg,
    }
}

export { handler }
