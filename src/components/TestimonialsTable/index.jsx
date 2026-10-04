import Link from 'components/Link'
import React from 'react'
import testimonials from '@data/products-testimonials.json'

export default function TestimonialsTable() {
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
                {testimonials.map(({ author, featuresUsed, quote }, index) => {
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
