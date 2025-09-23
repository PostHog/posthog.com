import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse): Promise<void> => {
    console.log('JFBW: TikTok verification endpoint hit:', req.url, req.path)

    res.setHeader('Content-Type', 'text/plain')
    res.setHeader('Cache-Control', 'no-cache')

    // this is a public verification token for the tiktok developers verification
    return res.status(200).send('tiktok-developers-site-verification=O7CetRa9odzht3niNrsvitejVAuvQwcW')
}

export default handler
