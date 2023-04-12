import { InlineCode } from 'components/InlineCode'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

export const TutorialTags = () => {
    const { data } = useStaticQuery(query)

    return (
        <ul className="list-none m-0 p-0 mt-1">
            {data.tags?.map((item) => {
                return (
                    <li key={item.fieldValue}>
                        <InlineCode>{item.fieldValue}</InlineCode>
                    </li>
                )
            })}
        </ul>
    )
}

const query = graphql`
    {
        data: allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { fields: { slug: { regex: "/^/tutorials/" } }, frontmatter: { date: { ne: null } } }
        ) {
            tags: group(field: frontmatter___tags) {
                fieldValue
            }
        }
    }
`
