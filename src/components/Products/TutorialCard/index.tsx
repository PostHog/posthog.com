import React from 'react'
import { CallToAction } from '../../CallToAction'
import { layoutLogic } from 'logic/layoutLogic'
import { useValues } from 'kea'

interface TutorialCardProps {
    title: string
    description: string
    url: string
}

export const TutorialCard = ({ title, description, url }: TutorialCardProps): JSX.Element => {
    const { websiteTheme } = useValues(layoutLogic)
    const darkMode = websiteTheme === 'dark'

    return (
        <li className="bg-accent dark:bg-accent-dark p-6 rounded flex flex-col items-start">
            <p className="text-lg font-bold m-0 leading-tight mb-1">{title}</p>
            <p className="text-sm flex-1">{description}</p>
            <CallToAction to={url} type="secondary" size="sm">
                Read more
            </CallToAction>
        </li>
    )
}
