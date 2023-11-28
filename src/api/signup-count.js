/* eslint-disable @typescript-eslint/no-var-requires */
import fetch from 'node-fetch'

const handler = async (_req, res) => {
    const data = await fetch(`https://app.posthog.com/shared/gQMqaRP0ZH0V3P3XXrSDnNcqDGoe7Q.json`).then((res) =>
        res.json()
    )

    const count = data?.insight?.result?.[0]?.aggregated_value

    return res.status(200).json(count)
}

export default handler
