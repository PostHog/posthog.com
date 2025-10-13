import { graphql } from 'gatsby'

export default function Topic() {
    return null
}

export const query = graphql`
    query ($id: String!) {
        topic: squeakTopic(id: { eq: $id }) {
            id
            squeakId
            label
        }
    }
`
