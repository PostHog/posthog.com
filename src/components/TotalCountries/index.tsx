import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

export const TotalCountries: React.FC = (props) => {
    const { countries } = useStaticQuery<{ countries: { group: { totalCount: number }[] } }>(query)

    return <span {...props}>{countries.group.length}</span>
}

const query = graphql`
    query {
        countries: allMdx(filter: { fields: { slug: { regex: "/^/team/" } } }) {
            group(field: frontmatter___country) {
                totalCount
            }
        }
    }
`

export default TotalCountries
