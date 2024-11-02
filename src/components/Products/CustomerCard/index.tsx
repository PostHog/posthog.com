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
        <li className="border-t @sm:border-t-0 @6xl:first:border-t first:border-t-0 border-light dark:border-dark pt-4 @sm:pt-0 @6xl:pt-4 first:pt-0">
            <img
                className="mb-4 max-h-8 max-w-[200px] w-full object-contain object-left"
                src={customer.frontmatter[darkMode ? 'logoDark' : 'logo'].publicURL}
            />
            <p className="text-lg font-semibold m-0 leading-tight mb-1">{outcome}</p>
            <p className="text-sm mb-2">
                <span className="bg-highlight p-0.5">"{quote}"</span>
            </p>
            <CallToAction to={customer.fields.slug} type="secondary" size="sm">
                Read the story
            </CallToAction>
        </li>
    )
}
