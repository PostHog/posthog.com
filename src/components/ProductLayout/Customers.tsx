import ContentViewer from 'components/ContentViewer'
import React from 'react'

interface IProps {
    customers: {
        body: string
        frontmatter: {
            customer: string
            title: string
            logo: {
                publicURL: string
            }
        }
    }[]
    initialCustomer?: string
}

export default function Customers({ customers, initialCustomer }: IProps) {
    const initialIndex = customers.findIndex((customer) => customer.frontmatter.customer === initialCustomer)
    return (
        <ContentViewer
            initialIndex={initialIndex >= 0 ? initialIndex : 0}
            title="Customer stories"
            content={customers.map((customer) => ({
                body: customer.body,
                title: customer.frontmatter.title,
                image: customer.frontmatter.logo.publicURL,
            }))}
        />
    )
}
