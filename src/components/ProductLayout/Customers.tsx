import ContentViewer from 'components/ContentViewer'
import React from 'react'

interface IProps {
    customers: {
        body: string
        frontmatter: {
            title: string
            logo: {
                publicURL: string
            }
        }
    }[]
}

export default function Customers({ customers }: IProps) {
    return (
        <ContentViewer
            title="Customer stories"
            content={customers.map((customer) => ({
                body: customer.body,
                title: customer.frontmatter.title,
                image: customer.frontmatter.logo.publicURL,
            }))}
        />
    )
}
