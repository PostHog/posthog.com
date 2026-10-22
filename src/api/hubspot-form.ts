import { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

const handler = async (req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) => {
    const { formID } = req.query
    if (typeof formID !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(formID)) {
        return res.status(400).send('Invalid form ID')
    }

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
