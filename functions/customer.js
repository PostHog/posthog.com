/* eslint-disable @typescript-eslint/no-var-requires */
const fetch = require('node-fetch')

exports.handler = async (e) => {
    const { queryStringParameters } = e
    const companyName = queryStringParameters.name
    let data = {}
    if (companyName) {
        const clearbitData = await fetch(`https://company.clearbit.com/v1/domains/find?name=${companyName}`, {
            headers: { Authorization: `Basic ${process.env.CLEARBIT_API_KEY}` },
        }).then((res) => res.json())
        const { name, logo } = clearbitData
        data = {
            name,
            logo,
        }
    }
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}
