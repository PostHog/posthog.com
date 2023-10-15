import React from 'react'
import { CallToAction } from '../../CallToAction'

interface CustomerCardProps {
    logo: string
    outcome: string
    quote: string
    link: string
}

export const CustomerCard = ({ logo, outcome, quote, link }: CustomerCardProps): JSX.Element => {
    return (
        <li className=" bg-accent dark:bg-accent-dark p-4 rounded">
            <div>{logo}</div>
            <p className="text-lg font-semibold m-0 leading-tight mb-1">{outcome}</p>
            <p className="text-sm">
                <span className="bg-highlight p-0.5">"{quote}"</span>
            </p>
            <CallToAction href={link} type="secondary" size="sm">
                Read the story
            </CallToAction>
        </li>
    )
}
