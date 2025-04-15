import { graphql } from 'gatsby'

export const query = graphql`
    query ($id: String!) {
        topic: squeakTopic(id: { eq: $id }) {
            id
            squeakId
            label
        }
    }
`
