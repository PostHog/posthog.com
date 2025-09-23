import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

const handler = async (_: GatsbyFunctionRequest, res: GatsbyFunctionResponse): Promise<void> => {
    res.setHeader('Content-Type', 'text/plain')

    // this is a public verification token for the tiktok developers verification
    return res.status(200).send('tiktok-developers-site-verification=O7CetRa9odzht3niNrsvitejVAuvQwcW')
}

export default handler
