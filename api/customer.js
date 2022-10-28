/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')

const handler = async (req, res) => {
    const companyName = req.query.name
    let data = {}
    if (companyName) {
        const clearbitData = await fetch(`https://company.clearbit.com/v1/domains/find?name=${companyName}`, {
            headers: { Authorization: `Bearer ${process.env.CLEARBIT_API_KEY}` },
        }).then((res) => res.json())
        const { name, logo } = clearbitData
        data = {
            name,
            logo,
        }
    }
    return res.status(200).json(data)
}

export default handler
