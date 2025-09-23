import { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(req: VercelRequest, res: VercelResponse) {
    console.log('JFBW: Vercel API tiktok/ endpoint hit:', req.url)

    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Cache-Control', 'no-cache')

    // this is a public verification token for the tiktok developers verification
    return res.status(200).send('tiktok-developers-site-verification=O7CetRa9odzht3niNrsvitejVAuvQwcW')
}
