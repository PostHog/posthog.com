import ContentViewer from 'components/ContentViewer'
import { useValues } from 'kea'
import { layoutLogic } from 'logic/layoutLogic'
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
            logoDark: {
                publicURL: string
            }
        }
    }[]
    initialCustomer?: string
}

export default function Customers({ customers, initialCustomer }: IProps) {
    const { websiteTheme } = useValues(layoutLogic)
    const initialIndex = customers.findIndex((customer) => customer.frontmatter.customer === initialCustomer)
    return (
        <ContentViewer
            initialIndex={initialIndex >= 0 ? initialIndex : 0}
            title="Customer stories"
            content={customers.map(({ frontmatter: { logo, logoDark, title }, body }) => {
                const logoToShow = websiteTheme === 'dark' ? logoDark || logo : logo
                return {
                    body: body,
                    title: title,
                    image: logoToShow?.publicURL,
                }
            })}
        />
    )
}
