import Tutorials from 'components/Tutorials'

export default Tutorials

export const pageQuery = graphql`
    query($activeFilter: String) {
        tutorials: allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: {
                fields: { slug: { regex: "/^/tutorials/" } }
                frontmatter: { authorData: { elemMatch: { name: { eq: $activeFilter } } } }
            }
        ) {
            nodes {
                ...TutorialsFragment
            }
        }
    }
`
