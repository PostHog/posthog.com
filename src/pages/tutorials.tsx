import { graphql } from 'gatsby'
import Tutorials from 'components/Tutorials'

export default Tutorials

export const pageQuery = graphql`
    query TutorialsQuery {
        tutorials: allMdx(
            filter: { fields: { slug: { regex: "/^/tutorials/" } } }
            limit: 1000
            sort: { fields: frontmatter___date, order: DESC }
        ) {
            nodes {
                ...TutorialsFragment
            }
            categories: group(field: frontmatter___topics) {
                fieldValue
            }
            contributors: group(field: frontmatter___authorData___name) {
                fieldValue
            }
        }
    }
`
