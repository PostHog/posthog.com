import type { GatsbyFunctionRequest, GatsbyFunctionResponse } from 'gatsby'

export default function handler(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
    res.json({ status: 'ok', time: new Date().toISOString() })
}
