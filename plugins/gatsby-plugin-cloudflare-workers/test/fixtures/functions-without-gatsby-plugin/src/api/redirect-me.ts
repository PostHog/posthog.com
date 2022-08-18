import { GatsbyFunctionResponse, GatsbyFunctionRequest } from 'gatsby'

export default function topLevel(req: GatsbyFunctionRequest, res: GatsbyFunctionResponse) {
    res.redirect(`/`)
}
