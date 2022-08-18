import { GatsbyFunctionResponse, GatsbyFunctionRequest } from 'gatsby'

export default function topLevel(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
    res.json(req.cookies)
}
