import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    try {
        const domain = req.query.domain
        if (typeof domain !== 'string' || !/^[a-z0-9-]+(\.[a-z0-9-]+)*$/i.test(domain)) {
            return res.status(400).json({ error: 'A valid domain is required' })
        }
        const data = await fetch(`${process.env.GATSBY_SQUEAK_API_HOST}/api/customers/${domain}`, {
            headers: { Authorization: `Bearer ${process.env.GATSBY_SQUEAK_CUSTOMERS_API_KEY}` },
        }).then((res) => res.json())
        return res.status(200).json(data)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Failed to fetch customer data' })
    }
}

export default handler
