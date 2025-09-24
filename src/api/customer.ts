import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    const domain = req.query.domain
    let data = {}
    if (domain) {
        const clearbitData = await fetch(`https://company.clearbit.com/v2/companies/find?domain=${domain}`, {
            headers: { Authorization: `Bearer ${process.env.CLEARBIT_API_KEY}` },
        }).then((res) => res.json())
        data = {
            ...clearbitData,
        }
    }
    return res.status(200).json(data)
}

export default handler
