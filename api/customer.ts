import type { VercelRequest, VercelResponse } from '@vercel/node'

const handler = async (req: VercelRequest, res: VercelResponse) => {
    try {
        const domain = req.query.domain
        if (!domain) {
            return res.status(400).json({ error: 'Domain is required' })
        }
        const data = await fetch(`${process.env.PUBLIC_SQUEAK_API_HOST}/api/customers/${domain}`, {
            headers: { Authorization: `Bearer ${process.env.SQUEAK_CUSTOMERS_API_KEY}` },
        }).then((res) => res.json())
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to fetch customer data' })
    }
}

export default handler
