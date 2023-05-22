import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'
import fetch from 'node-fetch'

const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    const { formID } = req.query
    if (!formID) return res.status(500).send('Missing form ID')

    try {
        const form = await fetch(`https://api.hubapi.com/forms/v2/forms/${formID}`, {
            headers: {
                Authorization: `Bearer ${process.env.HUBSPOT_FORM_ACCESS_TOKEN}`,
            },
        }).then((res) => res.json())
        return res.status(200).send(form)
    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

export default handler
