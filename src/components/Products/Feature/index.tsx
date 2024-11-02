import React from 'react'
import { StaticImage } from 'gatsby-plugin-image'

interface FeatureProps {
    title: string
    description: string
    image: any
    background?: boolean
    border?: boolean
    fade?: boolean
}

export const Feature = ({ title, description, image, background, border, fade }: FeatureProps): JSX.Element => {
    return (
        <li className="">
            <div
                className={`mb-2 w-full ${background || (border && 'rounded overflow-hidden')} ${
                    background && 'bg-accent dark:bg-accent-dark'
                } ${border && 'border border-light dark:border-dark'} ${
                    fade &&
                    'relative after:absolute after:w-full after:h-24 after:bottom-0 after:left-0 after:bg-gradient-to-b after:from-transparent dark:after:via-dark/80 dark:after:to-dark after:via-light/80 after:to-light after:z-10'
                }`}
            >
                {image}
            </div>
            <h4 className="mb-0.5 leading-tight text-lg">{title}</h4>
            <p className="text-[15px] text-primary/75 dark:text-primary-dark/75" dangerouslySetInnerHTML={{ __html: description }} />
        </li>
    )
}
