import React from 'react'
import { CallToAction } from '../../CallToAction'
import { layoutLogic } from 'logic/layoutLogic'
import { useValues } from 'kea'

interface CustomerCardProps {
    outcome: string
    quote: string
    customer: {
        fields: {
            slug: string
        }
        frontmatter: {
            logo: {
                publicURL: string
            }
            logoDark: {
                publicURL: string
            }
        }
    }
}

export const CustomerCard = ({ outcome, quote, customer }: CustomerCardProps): JSX.Element => {
    const { websiteTheme } = useValues(layoutLogic)
    const darkMode = websiteTheme === 'dark'

    return (
        <li className=" bg-accent dark:bg-accent-dark p-6 rounded">
            <img
                className="mb-4 max-h-8 max-w-[200px]"
                src={customer.frontmatter[darkMode ? 'logoDark' : 'logo'].publicURL}
            />
            <p className="text-lg font-semibold m-0 leading-tight mb-1">{outcome}</p>
            <p className="text-sm">
                <span className="bg-highlight p-0.5">"{quote}"</span>
            </p>
            <CallToAction to={customer.fields.slug} type="secondary" size="sm">
                Read the story
            </CallToAction>
        </li>
    )
}
