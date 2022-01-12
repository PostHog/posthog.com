import Link from 'components/Link'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

export default function TestimonialsTable() {
    const { testimonials } = useStaticQuery(query)
    return (
        <table>
            <thead>
                <tr>
                    <th>Tag(s)</th>
                    <th>Author</th>
                    <th>Quote</th>
                </tr>
            </thead>
            <tbody>
                {testimonials.nodes.map(({ author, featuresUsed, quote }, index) => {
                    const { name, role, company } = author
                    return (
                        <tr key={index}>
                            <td>{featuresUsed.join(', ')}</td>
                            <td>
                                <strong>{name}</strong>
                                <br />
                                {role + ', '}{' '}
                                {company.url ? <Link href={company.url}>{company.name}</Link> : company.name}
                            </td>
                            <td>{`"${quote}"`}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

const query = graphql`
    {
        testimonials: allTestimonialsJson {
            nodes {
                featuresUsed
                quote
                author {
                    name
                    role
                    company {
                        name
                        url
                    }
                }
            }
        }
    }
`
