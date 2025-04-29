import React from 'react'
import { layoutLogic } from 'logic/layoutLogic'
import { useValues } from 'kea'

interface TestimonialProps {
    quote: string
    author: {
        name: string
        role: string
        company: string
    }
    logo?: {
        publicURL: string
    }
    logoDark?: {
        publicURL: string
    }
}

export const Testimonial = ({ quote, author, logo, logoDark }: TestimonialProps): JSX.Element => {
    const { websiteTheme } = useValues(layoutLogic)
    const darkMode = websiteTheme === 'dark'

    return (
        <li className="bg-accent dark:bg-accent-dark p-6 rounded w-full max-w-[1361px] mx-auto">
            {logo && (
                <img
                    className="mb-4 max-h-8 max-w-[200px] w-full object-contain object-left"
                    src={darkMode && logoDark ? logoDark.publicURL : logo.publicURL}
                    alt={`${author.company} logo`}
                />
            )}
            <p className="text-lg font-semibold m-0 leading-tight mb-1">{author.name}</p>
            <p className="text-sm">
                <span className="bg-highlight p-0.5">"{quote}"</span>
            </p>
            <p className="text-sm opacity-75 m-0 mt-2">
                {author.role} at {author.company}
            </p>
        </li>
    )
}
