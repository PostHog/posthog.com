import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

const handler = async (_: GatsbyFunctionRequest, res: GatsbyFunctionResponse): Promise<void> => {
    res.setHeader('Content-Type', 'text/plain')

    return res.status(200).send('tiktok-developers-site-verification=O7CetRa9odzht3niNrsvitejVAuvQwcW')
}

export default handler
