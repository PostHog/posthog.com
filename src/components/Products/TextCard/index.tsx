import React from 'react'
import { CallToAction } from '../../CallToAction'
import { layoutLogic } from 'logic/layoutLogic'
import { useValues } from 'kea'

interface TextCardProps {
    title: string
    description: string
    url?: string
}

export const TextCard = ({ title, description, url }: TextCardProps): JSX.Element => {
    const { websiteTheme } = useValues(layoutLogic)
    const darkMode = websiteTheme === 'dark'

    return (
        <li className="bg-accent dark:bg-accent-dark p-6 rounded flex flex-col items-start">
            <p className="text-lg font-bold m-0 leading-tight mb-1">{title}</p>
            <p className="text-sm flex-1 mb-0" dangerouslySetInnerHTML={{ __html: description }} />
            {url && (
                <CallToAction to={url} type="secondary" size="sm" className="mt-2">
                    Learn more
                </CallToAction>
            )}
        </li>
    )
}
